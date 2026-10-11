import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { BookOpen, FileText, Bell, Calendar, Users } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { getCoursesByStudent, announcements, calendarEvents, resources } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'resources' | 'announcements' | 'calendar'>('overview');

  const myCourses = user ? getCoursesByStudent(user.id) : [];
  const myResources = resources.filter(r => r.approved && myCourses.some(c => c.id === r.courseId));
  const upcomingEvents = calendarEvents.filter(e => new Date(e.date) >= new Date()).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1a2744]">Student Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome, {user?.name}</p>
            </div>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">Student</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 border border-gray-200 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BookOpen },
            { id: 'courses', label: 'My Courses', icon: Users },
            { id: 'resources', label: 'Resources', icon: FileText },
            { id: 'announcements', label: 'News', icon: Bell },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${activeTab === tab.id ? 'bg-[#1a2744] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-2xl font-bold text-[#1a2744]">{myCourses.length}</p>
                <p className="text-xs text-gray-500">Enrolled Courses</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-2xl font-bold text-[#1a2744]">{myResources.length}</p>
                <p className="text-xs text-gray-500">Available Resources</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-2xl font-bold text-[#1a2744]">{announcements.length}</p>
                <p className="text-xs text-gray-500">Announcements</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-2xl font-bold text-[#1a2744]">{upcomingEvents.length}</p>
                <p className="text-xs text-gray-500">Upcoming Events</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <h3 className="font-semibold text-[#1a2744] mb-4">My Enrolled Courses ({myCourses.length})</h3>
            {myCourses.length === 0 ? (
              <p className="text-gray-500">Not enrolled in any courses yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {myCourses.map(course => (
                  <div key={course.id} className="bg-white border border-gray-200 rounded-xl p-6">
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded">{course.code}</span>
                    <h3 className="font-semibold text-[#1a2744] mt-2">{course.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Batch {course.batch} • {course.credits} credits</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <div>
            <h3 className="font-semibold text-[#1a2744] mb-4">Available Resources ({myResources.length})</h3>
            {myResources.length === 0 ? (
              <p className="text-gray-500">No resources available yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myResources.map(r => (
                  <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-5">
                    <FileText className="w-8 h-8 text-teal-600 mb-2" />
                    <h4 className="font-medium text-sm text-[#1a2744]">{r.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 capitalize">{r.type.replace('_', ' ')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div>
            <h3 className="font-semibold text-[#1a2744] mb-4">All Announcements ({announcements.length})</h3>
            <div className="space-y-3">
              {announcements.map(ann => (
                <div key={ann.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-[#1a2744]">{ann.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{ann.content}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(ann.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div>
            <h3 className="font-semibold text-[#1a2744] mb-4">Upcoming Events ({upcomingEvents.length})</h3>
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-[#1a2744]">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{event.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
