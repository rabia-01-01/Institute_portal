import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Bell } from 'lucide-react';

export default function Announcements() {
  const { announcements, getUserById } = useData();
  const [categoryFilter, setCategoryFilter] = useState('');
  const filtered = announcements.filter(a => !categoryFilter || a.category === categoryFilter);
  const categories = ['general', 'exam', 'event', 'holiday', 'academic'];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-r from-[#1a2744] to-[#0d4a4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Announcements</h1>
          <p className="text-gray-300">Latest news and notifications</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setCategoryFilter('')} className={`px-4 py-2 rounded-lg text-sm font-medium ${!categoryFilter ? 'bg-[#1a2744] text-white' : 'bg-gray-100 text-gray-600'}`}>All</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${categoryFilter === cat ? 'bg-[#1a2744] text-white' : 'bg-gray-100 text-gray-600'}`}>{cat}</button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{announcements.length === 0 ? 'No announcements yet.' : 'No announcements in this category.'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(ann => {
                const author = getUserById(ann.authorId);
                return (
                  <div key={ann.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${ann.priority === 'high' ? 'bg-red-50' : 'bg-teal-50'}`}>
                        <Bell className={`w-5 h-5 ${ann.priority === 'high' ? 'text-red-500' : 'text-teal-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#1a2744] mb-2">{ann.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{ann.content}</p>
                        <div className="flex items-center gap-4 flex-wrap text-xs text-gray-400">
                          <span className="px-2 py-0.5 bg-gray-100 rounded-full capitalize">{ann.category}</span>
                          <span>{new Date(ann.createdAt).toLocaleDateString()}</span>
                          {author && <span>by {author.name}</span>}
                        </div>
                      </div>
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
