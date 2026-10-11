import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Building2, Search, ArrowRight, Users, BookOpen } from 'lucide-react';

export default function Departments() {
  const { departments, courses, users } = useData();
  const [search, setSearch] = useState('');
  const filtered = departments.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-r from-[#1a2744] to-[#0d4a4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Departments</h1>
          <p className="text-gray-300">Browse our academic departments</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <input type="text" placeholder="Search departments..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{departments.length === 0 ? 'No departments added yet.' : 'No departments found.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(dept => {
                const deptCourses = courses.filter(c => c.departmentId === dept.id);
                const deptFaculty = users.filter(u => u.role === 'faculty' && u.department === dept.name && u.approved);
                return (
                  <Link 
                    key={dept.id} 
                    to={`/departments/${dept.id}`}
                    className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-teal-300 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">{dept.code}</span>
                    </div>
                    <h2 className="text-xl font-bold text-[#1a2744] mb-3 group-hover:text-teal-600 transition-colors">{dept.name}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">{dept.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100 mb-4">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-teal-500" />
                        <span className="font-medium">{deptCourses.length}</span>
                        <span>Courses</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-teal-500" />
                        <span className="font-medium">{deptFaculty.length}</span>
                        <span>Faculty</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-teal-600 font-medium text-sm group-hover:text-teal-700 transition-colors">View Details</span>
                      <ArrowRight className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
