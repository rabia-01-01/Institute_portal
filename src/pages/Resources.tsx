import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FileText, Video, BookOpen, ClipboardList, GraduationCap, Search } from 'lucide-react';

export default function Resources() {
  const { resources, courses } = useData();
  const [search, setSearch] = useState('');
  const approved = resources.filter(r => r.approved);

  const filtered = approved.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  // Categorize resources
  const pdfs = filtered.filter(r => r.type === 'pdf');
  const notes = filtered.filter(r => r.type === 'notes');
  const syllabus = filtered.filter(r => r.type === 'syllabus');
  const videos = filtered.filter(r => r.type === 'video');
  const pyqs = filtered.filter(r => r.type === 'question_paper');
  const assignments = filtered.filter(r => r.type === 'assignment');

  const ResourceCard = ({ resource }: { resource: any }) => {
    const course = courses.find(c => c.id === resource.courseId);
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-[#1a2744] line-clamp-2">{resource.title}</h4>
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
  };

  const VideoCard = ({ resource }: { resource: any }) => {
    const course = courses.find(c => c.id === resource.courseId);
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-[#1a2744] line-clamp-2">{resource.title}</h4>
            <p className="text-xs text-gray-400 mt-0.5">{course?.code}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{resource.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
          <span>{resource.fileSize}</span>
          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">Video</span>
        </div>
      </div>
    );
  };

  const Section = ({ title, icon: Icon, color, items }: any) => (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1a2744]">{title}</h2>
          <p className="text-sm text-gray-500">{items.length} {items.length === 1 ? 'resource' : 'resources'}</p>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <Icon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No {title.toLowerCase()} available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((resource: any) => 
            resource.type === 'video' ? (
              <VideoCard key={resource.id} resource={resource} />
            ) : (
              <ResourceCard key={resource.id} resource={resource} />
            )
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-r from-[#1a2744] to-[#0d4a4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Resource Library</h1>
          <p className="text-gray-300">Browse academic resources by category</p>
        </div>
      </section>
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" 
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {approved.length === 0 ? 'No resources available yet.' : 'No resources found matching your search.'}
              </p>
            </div>
          ) : (
            <>
              <Section 
                title="External PDFs" 
                icon={FileText} 
                color="from-red-500 to-red-600"
                items={pdfs} 
              />
              
              <Section 
                title="Class Notes" 
                icon={BookOpen} 
                color="from-blue-500 to-blue-600"
                items={notes} 
              />
              
              <Section 
                title="Syllabus" 
                icon={ClipboardList} 
                color="from-amber-500 to-amber-600"
                items={syllabus} 
              />
              
              <Section 
                title="Video Lectures" 
                icon={Video} 
                color="from-purple-500 to-purple-600"
                items={videos} 
              />
              
              <Section 
                title="Previous Year Questions (PYQs)" 
                icon={GraduationCap} 
                color="from-emerald-500 to-emerald-600"
                items={pyqs} 
              />
              
              <Section 
                title="Assignments & Question Papers" 
                icon={ClipboardList} 
                color="from-indigo-500 to-indigo-600"
                items={assignments} 
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
