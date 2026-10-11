import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FileText, Search } from 'lucide-react';

export default function Resources() {
  const { resources, courses } = useData();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const approved = resources.filter(r => r.approved);
  const filtered = approved.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || r.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-r from-[#1a2744] to-[#0d4a4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Resource Library</h1>
          <p className="text-gray-300">Browse academic resources</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-8">
            <input type="text" placeholder="Search resources..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white">
              <option value="">All Types</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="notes">Notes</option>
              <option value="assignment">Assignment</option>
              <option value="question_paper">Question Paper</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{approved.length === 0 ? 'No resources available yet.' : 'No resources found.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(resource => {
                const course = courses.find(c => c.id === resource.courseId);
                return (
                  <div key={resource.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <FileText className="w-8 h-8 text-teal-600 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-[#1a2744] line-clamp-2">{resource.title}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{course?.code}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
                      <span>{resource.fileSize}</span>
                      <span className="capitalize">{resource.type.replace('_', ' ')}</span>
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
