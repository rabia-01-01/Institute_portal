import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { BookOpen, Users, Award, Building2, ArrowRight, Calendar, Bell, GraduationCap } from 'lucide-react';

export default function Home() {
  const { departments, announcements, users, courses } = useData();
  
  const stats = [
    { icon: Users, value: users.filter(u => u.role === 'student' && u.approved).length.toString(), label: 'Students' },
    { icon: BookOpen, value: courses.length.toString(), label: 'Courses' },
    { icon: Award, value: users.filter(u => u.role === 'faculty' && u.approved).length.toString(), label: 'Faculty' },
    { icon: Building2, value: departments.length.toString(), label: 'Departments' },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#1a2744] via-[#1e3a5f] to-[#0d4a4a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              ABC Institute <span className="text-teal-400">of Education</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              A comprehensive academic resource management portal for students, faculty, and administrators.
              Register to access courses, resources, and announcements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">
                <GraduationCap className="w-5 h-5" /> Register Now
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[#1a2744]">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a2744] mb-3">Our Departments</h2>
            <p className="text-gray-600">Browse our academic departments and programs</p>
          </div>
          {departments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No departments added yet. Admin can add departments from the dashboard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map(dept => (
                <div key={dept.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-teal-200 group">
                  <h3 className="font-semibold text-[#1a2744] group-hover:text-teal-600 transition-colors mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{dept.description}</p>
                  <div className="text-xs text-teal-600 font-medium flex items-center gap-1">
                    View Details <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
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
              <Calendar className="w-10 h-10 text-teal-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Academic Calendar</h3>
              <p className="text-gray-300 text-sm">View important dates</p>
            </Link>
            <Link to="/courses" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
              <BookOpen className="w-10 h-10 text-teal-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Courses</h3>
              <p className="text-gray-300 text-sm">Browse available courses</p>
            </Link>
            <Link to="/faculty" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-colors">
              <Users className="w-10 h-10 text-teal-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Faculty</h3>
              <p className="text-gray-300 text-sm">Meet our faculty</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
