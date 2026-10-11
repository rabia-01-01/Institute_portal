import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Building2, Search } from 'lucide-react';

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map(dept => {
                const deptCourses = courses.filter(c => c.departmentId === dept.id);
                const deptFaculty = users.filter(u => u.role === 'faculty' && u.department === dept.name && u.approved);
                return (
                  <div key={dept.id} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-bold text-[#1a2744] mb-2">{dept.name}</h2>
                    <p className="text-sm text-teal-600 font-medium mb-3">{dept.code}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{dept.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 pt-3 border-t border-gray-100">
                      <span>{deptCourses.length} Courses</span>
                      <span>{deptFaculty.length} Faculty</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
