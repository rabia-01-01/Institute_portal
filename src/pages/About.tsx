import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Award, Target, BookOpen, Users, Building2, GraduationCap, Trophy, Globe, Lightbulb, Heart, Shield, ArrowRight } from 'lucide-react';

export default function About() {
  const { departments, users, courses } = useData();
  const facultyCount = users.filter(u => u.role === 'faculty' && u.approved).length;
  const studentCount = users.filter(u => u.role === 'student' && u.approved).length;

  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-br from-[#1a2744] via-[#1e3a5f] to-[#0d4a4a] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-300 text-sm mb-6">
              <GraduationCap className="w-4 h-4" />
              Established 1985
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              About <span className="text-teal-400">ABC Institute</span> of Education
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              A premier institution dedicated to academic excellence, innovation, and holistic development.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/departments" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">
                Explore Departments <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors">
                View Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-50 rounded-xl mb-3">
                <Users className="w-7 h-7 text-teal-600" />
              </div>
              <div className="text-3xl font-bold text-[#1a2744]">{studentCount}+</div>
              <div className="text-sm text-gray-500 mt-1">Students</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-3">
                <GraduationCap className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-[#1a2744]">{facultyCount}+</div>
              <div className="text-sm text-gray-500 mt-1">Expert Faculty</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-50 rounded-xl mb-3">
                <BookOpen className="w-7 h-7 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-[#1a2744]">{courses.length}+</div>
              <div className="text-sm text-gray-500 mt-1">Courses</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-50 rounded-xl mb-3">
                <Building2 className="w-7 h-7 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-[#1a2744]">{departments.length}</div>
              <div className="text-sm text-gray-500 mt-1">Departments</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a2744] mb-3">Our Foundation</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2744] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide transformative education that empowers students with knowledge, skills, and values
                necessary to excel in their chosen fields and contribute meaningfully to society.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a2744] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be recognized as a premier institution of higher learning that sets benchmarks in academic
                excellence, research innovation, and holistic development on a global scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a2744] mb-3">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lightbulb, title: 'Innovation', desc: 'Embracing new ideas and technologies', color: 'bg-amber-50 text-amber-600' },
              { icon: Heart, title: 'Integrity', desc: 'Upholding the highest standards of honesty', color: 'bg-red-50 text-red-600' },
              { icon: Users, title: 'Collaboration', desc: 'Fostering teamwork and partnerships', color: 'bg-blue-50 text-blue-600' },
              { icon: Shield, title: 'Excellence', desc: 'Committing to quality in all endeavors', color: 'bg-teal-50 text-teal-600' },
            ].map((value, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${value.color}`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-[#1a2744] mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1a2744] mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join ABC Institute of Education and become part of a community dedicated to excellence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">
              Register Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#1a2744] text-[#1a2744] hover:bg-[#1a2744] hover:text-white font-semibold rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
