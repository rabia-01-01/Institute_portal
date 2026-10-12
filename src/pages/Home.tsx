import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { BookOpen, Users, Award, Building2, ArrowRight, Calendar, Bell, Stethoscope, Heart, Activity } from 'lucide-react';

export default function Home() {
  const { departments, announcements, users, courses } = useData();
  
  const stats = [
    { icon: Users, value: users.filter(u => u.role === 'student' && u.approved).length.toString(), label: 'Medical Students' },
    { icon: BookOpen, value: courses.length.toString(), label: 'Exam Programs' },
    { icon: Award, value: users.filter(u => u.role === 'faculty' && u.approved).length.toString(), label: 'Medical Faculty' },
    { icon: Building2, value: departments.length.toString(), label: 'Medical Subjects' },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#1a2744] via-[#1e3a5f] to-[#0d4a4a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>Welcome to Sultanat e Italia Medica</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Sultanat e Italia <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Medica</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Premier institute for NEET, IMAT & medical entrance exam preparation. 
              Expert faculty, comprehensive study materials, and proven success in shaping future doctors.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Stethoscope className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Register Now
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl transition-all">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-7 h-7 text-teal-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Medical Excellence
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-3">Medical Subjects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive preparation for NEET, IMAT, and medical entrance examinations</p>
          </div>
          {departments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No medical subjects added yet</p>
              <p className="text-gray-400 text-sm mt-2">Admin can add subjects from the dashboard</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.slice(0, 6).map(dept => (
                <Link 
                  key={dept.id} 
                  to={`/departments/${dept.id}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">{dept.code}</span>
                  </div>
                  <h3 className="font-bold text-lg text-[#1a2744] group-hover:text-emerald-600 transition-colors mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{dept.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-emerald-600 font-medium text-sm group-hover:text-emerald-700 transition-colors">View Details</span>
                    <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
          {departments.length > 6 && (
            <div className="text-center mt-8">
              <Link to="/departments" className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-xl transition-all">
                View All Subjects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2744] mb-2">Latest Announcements</h2>
              <p className="text-gray-600">Stay updated with institute news</p>
            </div>
            <Link to="/announcements" className="hidden md:inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {announcements.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No announcements yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-teal-200 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      ann.priority === 'high' ? 'bg-red-100 text-red-700' :
                      ann.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>{ann.category}</span>
                    <span className="text-xs text-gray-400">{new Date(ann.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-semibold text-[#1a2744] mb-2">{ann.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{ann.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#1a2744] to-[#0d4a4a] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/calendar" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
              <Calendar className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Exam Calendar</h3>
              <p className="text-gray-300 text-sm">NEET, IMAT & exam dates</p>
            </Link>
            <Link to="/courses" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
              <BookOpen className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Exam Programs</h3>
              <p className="text-gray-300 text-sm">NEET, IMAT preparation</p>
            </Link>
            <Link to="/faculty" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
              <Users className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Medical Faculty</h3>
              <p className="text-gray-300 text-sm">Expert doctors & professors</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
