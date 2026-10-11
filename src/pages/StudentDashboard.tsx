import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { BookOpen, FileText, Bell, Calendar, Users, ArrowLeft, GraduationCap, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getCoursesByStudent, announcements, calendarEvents, resources } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'resources' | 'announcements' | 'calendar'>('overview');

  const myCourses = user ? getCoursesByStudent(user.id) : [];
  const myResources = resources.filter(r => r.approved && myCourses.some(c => c.id === r.courseId));
  const upcomingEvents = calendarEvents.filter(e => new Date(e.date) >= new Date()).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header with Back Button */}
      <div className="bg-gradient-to-r from-[#1a2744] via-[#1e3a5f] to-[#0d4a4a] text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-300 border border-white/20"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Student Dashboard</h1>
                    <p className="text-teal-200 text-sm">Welcome back, {user?.name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-green-500/20 backdrop-blur-sm text-green-300 text-sm font-medium rounded-full border border-green-400/30">
                ✓ Active Student
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-2 shadow-lg border border-gray-100 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'courses', label: 'My Courses', icon: BookOpen },
            { id: 'resources', label: 'Resources', icon: FileText },
            { id: 'announcements', label: 'News', icon: Bell },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-teal-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{myCourses.length}</p>
                <p className="text-blue-100 text-sm font-medium">Enrolled Courses</p>
              </div>

              <div className="group bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <FileText className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{myResources.length}</p>
                <p className="text-teal-100 text-sm font-medium">Available Resources</p>
              </div>

              <div className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Bell className="w-6 h-6" />
                  </div>
                  <Bell className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{announcements.length}</p>
                <p className="text-purple-100 text-sm font-medium">Announcements</p>
              </div>

              <div className="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <Clock className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{upcomingEvents.length}</p>
                <p className="text-orange-100 text-sm font-medium">Upcoming Events</p>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* My Courses */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    My Courses
                  </h3>
                </div>
                <div className="p-6">
                  {myCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">Not enrolled in any courses yet</p>
                      <p className="text-gray-400 text-sm mt-2">Contact admin for enrollment</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {myCourses.slice(0, 5).map(course => (
                        <div key={course.id} className="group p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all duration-300">
                          <div className="flex items-start justify-between mb-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                              {course.code}
                            </span>
                            <span className="text-xs text-gray-500">Batch {course.batch}</span>
                          </div>
                          <h4 className="font-semibold text-[#1a2744] group-hover:text-blue-600 transition-colors">{course.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{course.credits} credits</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Announcements */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Recent Announcements
                  </h3>
                </div>
                <div className="p-6">
                  {announcements.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No announcements yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {announcements.slice(0, 4).map(ann => (
                        <div key={ann.id} className="group p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md hover:border-purple-300 transition-all duration-300">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              ann.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {ann.category}
                            </span>
                            <span className="text-xs text-gray-400">{new Date(ann.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h4 className="font-semibold text-[#1a2744] group-hover:text-purple-600 transition-colors">{ann.title}</h4>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">My Enrolled Courses ({myCourses.length})</h3>
              </div>
            </div>
            {myCourses.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Not enrolled in any courses yet</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {myCourses.map(course => (
                  <div key={course.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="w-7 h-7 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">{course.code}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1a2744] mb-2 group-hover:text-blue-600 transition-colors">{course.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">Batch {course.batch}</span>
                      <span className="text-sm font-semibold text-blue-600">{course.credits} Credits</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Available Resources ({myResources.length})</h3>
              </div>
            </div>
            {myResources.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No resources available yet</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myResources.map(r => (
                  <div key={r.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-teal-300 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-[#1a2744] mb-2 group-hover:text-teal-600 transition-colors">{r.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{r.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{r.fileSize}</span>
                      <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full capitalize">
                        {r.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">All Announcements ({announcements.length})</h3>
              </div>
            </div>
            <div className="space-y-4">
              {announcements.map(ann => (
                <div key={ann.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-purple-300 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                      <Bell className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          ann.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {ann.category}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(ann.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1a2744] mb-2 group-hover:text-purple-600 transition-colors">{ann.title}</h3>
                      <p className="text-gray-600">{ann.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Upcoming Events ({upcomingEvents.length})</h3>
              </div>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-orange-300 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1a2744] mb-2 group-hover:text-orange-600 transition-colors">{event.title}</h3>
                      <p className="text-gray-600 mb-3">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full capitalize">
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
