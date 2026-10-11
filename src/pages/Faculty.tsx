import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Users, Search } from 'lucide-react';

export default function Faculty() {
  const { users, departments } = useData();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const faculty = users.filter(u => u.role === 'faculty' && u.approved);
  const filtered = faculty.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || (f.specialization || '').toLowerCase().includes(search.toLowerCase());
    const matchDept = !deptFilter || f.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-r from-[#1a2744] to-[#0d4a4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Faculty Directory</h1>
          <p className="text-gray-300">Meet our faculty members</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-8">
            <input type="text" placeholder="Search faculty..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white">
              <option value="">All Departments</option>
              {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{faculty.length === 0 ? 'No faculty members yet.' : 'No faculty found.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(member => (
                <div key={member.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#1a2744] to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1a2744]">{member.name}</h3>
                      <p className="text-sm text-teal-600 font-medium">{member.designation}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{member.department}</p>
                    </div>
                  </div>
                  {member.specialization && (
                    <p className="text-sm text-gray-600 mt-3"><span className="font-medium">Specialization:</span> {member.specialization}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
