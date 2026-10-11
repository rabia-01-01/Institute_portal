import { useState } from 'react';
import { useData } from '../context/DataContext';
import { BookOpen, Search } from 'lucide-react';

export default function Courses() {
  const { courses, departments } = useData();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');

  const filtered = courses.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const matchDept = !deptFilter || c.departmentId === deptFilter;
    const matchBatch = !batchFilter || c.batch === parseInt(batchFilter);
    return matchSearch && matchDept && matchBatch;
  });

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-r from-[#1a2744] to-[#0d4a4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Courses</h1>
          <p className="text-gray-300">Browse our course catalog</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-8">
            <input type="text" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white">
              <option value="">All Departments</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <select value={batchFilter} onChange={(e) => setBatchFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white">
              <option value="">All Batches</option>
              {[2022, 2023, 2024, 2025].map(b => <option key={b} value={b}>Batch {b}</option>)}
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{courses.length === 0 ? 'No courses added yet.' : 'No courses found.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(course => {
                const dept = departments.find(d => d.id === course.departmentId);
                return (
                  <div key={course.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded">{course.code}</span>
                      <span className="text-xs text-gray-400">Batch {course.batch}</span>
                    </div>
                    <h3 className="font-semibold text-[#1a2744] mb-2">{course.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{course.description}</p>
                    <div className="pt-3 border-t border-gray-100 text-xs text-gray-400">
                      {dept?.name} • {course.credits} credits
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
