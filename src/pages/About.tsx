import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Award, Target, BookOpen, Users, Building2, Stethoscope, Trophy, Globe, Lightbulb, Heart, Shield, ArrowRight } from 'lucide-react';

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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm mb-6">
              <Stethoscope className="w-4 h-4" />
              Established 1985
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              About <span className="text-emerald-400">Sultanat e Italia</span> Medica
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              Premier institute for NEET, IMAT & medical entrance exam preparation. We specialize in comprehensive coaching for aspiring medical professionals.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-emerald-400">NEET</div>
                <div className="text-sm text-gray-300">National Eligibility cum Entrance Test</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-emerald-400">IMAT</div>
                <div className="text-sm text-gray-300">International Medical Admission Test</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-emerald-400">MCAT</div>
                <div className="text-sm text-gray-300">Medical College Admission Test</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-emerald-400">UKCAT</div>
                <div className="text-sm text-gray-300">UK Clinical Aptitude Test</div>
              </div>
            </div>
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
                <Stethoscope className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-[#1a2744]">{facultyCount}+</div>
              <div className="text-sm text-gray-500 mt-1">Medical Faculty</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-50 rounded-xl mb-3">
                <BookOpen className="w-7 h-7 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-[#1a2744]">{courses.length}+</div>
              <div className="text-sm text-gray-500 mt-1">Exam Programs</div>
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

      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a2744] mb-3">Medical Entrance Exams We Prepare You For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive coaching for all major medical entrance examinations worldwide</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1a2744] mb-2">NEET (UG)</h3>
                  <p className="text-sm text-emerald-600 font-semibold">National Eligibility cum Entrance Test</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                India's premier medical entrance examination for admission to MBBS, BDS, AYUSH, and other medical courses across India.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">✓</span> Physics, Chemistry, Biology (Botany & Zoology)</li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">✓</span> 180 questions, 720 marks, 3 hours duration</li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">✓</span> Conducted by NTA (National Testing Agency)</li>
                <li className="flex items-start gap-2"><span className="text-emerald-600 mt-1">✓</span> For admission to 50,000+ MBBS seats in India</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1a2744] mb-2">IMAT</h3>
                  <p className="text-sm text-blue-600 font-semibold">International Medical Admission Test</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Entrance exam for international students seeking admission to English-taught medicine programs in Italy.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✓</span> Logic, General Knowledge, Biology, Chemistry, Physics</li>
                <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✓</span> 60 questions, 90 minutes duration</li>
                <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✓</span> For admission to Italian medical universities</li>
                <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✓</span> Recognized across European medical schools</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1a2744] mb-2">MCAT</h3>
                  <p className="text-sm text-purple-600 font-semibold">Medical College Admission Test</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Standardized examination for prospective medical students in the USA, Canada, and Australia.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-purple-600 mt-1">✓</span> Biological Sciences, Physical Sciences, Verbal Reasoning</li>
                <li className="flex items-start gap-2"><span className="text-purple-600 mt-1">✓</span> 230 questions, 6 hours 15 minutes duration</li>
                <li className="flex items-start gap-2"><span className="text-purple-600 mt-1">✓</span> Required for most North American medical schools</li>
                <li className="flex items-start gap-2"><span className="text-purple-600 mt-1">✓</span> Score range: 472-528</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1a2744] mb-2">Other Exams</h3>
                  <p className="text-sm text-amber-600 font-semibold">UCAT, BMAT, GAMSAT & More</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive preparation for various international medical entrance examinations.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-amber-600 mt-1">✓</span> UCAT (UK Clinical Aptitude Test)</li>
                <li className="flex items-start gap-2"><span className="text-amber-600 mt-1">✓</span> BMAT (BioMedical Admissions Test)</li>
                <li className="flex items-start gap-2"><span className="text-amber-600 mt-1">✓</span> GAMSAT (Graduate Medical School Admissions Test)</li>
                <li className="flex items-start gap-2"><span className="text-amber-600 mt-1">✓</span> KVPY, JEE (Medical), State-level exams</li>
              </ul>
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
