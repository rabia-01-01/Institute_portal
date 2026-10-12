import { Link } from 'react-router-dom';
import { Stethoscope, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a2744] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Sultanat e Italia Medica</div>
                <div className="text-xs text-emerald-300">Excellence in Medical Education</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premier institute for NEET, IMAT & medical exam preparation. Shaping future healthcare professionals since 1985.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { path: '/about', label: 'About Us' },
                { path: '/departments', label: 'Departments' },
                { path: '/courses', label: 'Medical Courses' },
                { path: '/faculty', label: 'Medical Faculty' },
                { path: '/announcements', label: 'Announcements' },
                { path: '/calendar', label: 'Academic Calendar' },
                { path: '/quizzes', label: 'Quizzes' },
                { path: '/community', label: 'Community' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-sm text-gray-400 hover:text-emerald-400">Student Portal</Link></li>
              <li><Link to="/login" className="text-sm text-gray-400 hover:text-emerald-400">Faculty Portal</Link></li>
              <li><Link to="/resources" className="text-sm text-gray-400 hover:text-emerald-400">Study Materials</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-emerald-400">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                <span className="text-sm text-gray-400">Medical Education Center, Healthcare District, Rome, Italy</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-sm text-gray-400">+39 06 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-sm text-gray-400">info@medico.sultanatitalia.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a3a5c] mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 Sultanat e Italia Medica. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Privacy Policy</span>
            <span className="text-xs text-gray-500">Terms of Use</span>
            <span className="text-xs text-gray-500">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
