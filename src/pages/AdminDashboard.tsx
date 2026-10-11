import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Users, BookOpen, Building2, Bell, Calendar, FileText, Shield, Plus, Check, X, Trash2, ArrowLeft, Settings, TrendingUp, Edit } from 'lucide-react';
import ProfileEdit from '../components/ProfileEdit';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { users, departments, courses, announcements, calendarEvents, resources,
    addDepartment, deleteDepartment, addCourse, deleteCourse,
    approveUser, deleteUser, updateUser, addAnnouncement, deleteAnnouncement,
    addCalendarEvent, deleteCalendarEvent, approveResource, deleteResource,
    enrollStudent, unenrollStudent, isStudentEnrolled, getStudentsInCourse } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'departments' | 'courses' | 'users' | 'students' | 'announcements' | 'calendar' | 'resources'>('overview');
  const [showForm, setShowForm] = useState('');
  const [deptForm, setDeptForm] = useState({ name: '', code: '', description: '' });
  const [courseForm, setCourseForm] = useState({ code: '', name: '', departmentId: '', batch: 2024, credits: 3, facultyId: '', description: '' });
  const [annForm, setAnnForm] = useState({ title: '', content: '', category: 'general' as const, priority: 'medium' as const });
  const [calForm, setCalForm] = useState({ title: '', date: '', endDate: '', type: 'event' as const, description: '' });
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string; name: string } | null>(null);
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  const handleAddDepartment = (e: React.FormEvent) => { e.preventDefault(); addDepartment(deptForm); setDeptForm({ name: '', code: '', description: '' }); setShowForm(''); };
  const handleAddCourse = (e: React.FormEvent) => { e.preventDefault(); addCourse(courseForm); setCourseForm({ code: '', name: '', departmentId: '', batch: 2024, credits: 3, facultyId: '', description: '' }); setShowForm(''); };
  const handleAddAnnouncement = (e: React.FormEvent) => { e.preventDefault(); addAnnouncement({ ...annForm, authorId: user!.id }); setAnnForm({ title: '', content: '', category: 'general', priority: 'medium' }); setShowForm(''); };
  const handleAddCalendarEvent = (e: React.FormEvent) => { e.preventDefault(); addCalendarEvent({ ...calForm, createdBy: user!.id }); setCalForm({ title: '', date: '', endDate: '', type: 'event', description: '' }); setShowForm(''); };

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;
    switch (deleteConfirm.type) {
      case 'user': deleteUser(deleteConfirm.id); break;
      case 'department': deleteDepartment(deleteConfirm.id); break;
      case 'course': deleteCourse(deleteConfirm.id); break;
      case 'announcement': deleteAnnouncement(deleteConfirm.id); break;
      case 'calendarEvent': deleteCalendarEvent(deleteConfirm.id); break;
      case 'resource': deleteResource(deleteConfirm.id); break;
    }
    setDeleteConfirm(null);
  };

  const pendingUsers = users.filter(u => !u.approved);
  const approvedStudents = users.filter(u => u.role === 'student' && u.approved);
  const approvedFaculty = users.filter(u => u.role === 'faculty' && u.approved);
  const pendingResources = resources.filter(r => !r.approved);

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
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-red-200 text-sm">Welcome back, {user?.name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowProfileEdit(true)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 transition-all flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
              <span className="px-4 py-2 bg-red-500/20 backdrop-blur-sm text-red-300 text-sm font-medium rounded-full border border-red-400/30">
                🔒 Administrator
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Setup Instructions */}
        {departments.length === 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Getting Started</h3>
                <p className="text-sm text-blue-700">
                  Welcome! To set up your institute, follow these steps:<br />
                  <strong>1.</strong> Add departments first (go to Departments tab)<br />
                  <strong>2.</strong> Approve faculty members and assign them to departments (go to Users tab)<br />
                  <strong>3.</strong> Add courses to departments (go to Courses tab)<br />
                  <strong>4.</strong> Enroll students in courses (go to Students tab)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-2 shadow-lg border border-gray-100 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'departments', label: 'Departments', icon: Building2 },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'announcements', label: 'Announcements', icon: Bell },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'resources', label: 'Resources', icon: FileText },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setShowForm(''); setSelectedStudent(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
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
                    <Users className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{users.length}</p>
                <p className="text-blue-100 text-sm font-medium">Total Users</p>
              </div>

              <div className="group bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <Building2 className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{departments.length}</p>
                <p className="text-teal-100 text-sm font-medium">Departments</p>
              </div>

              <div className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <BookOpen className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{courses.length}</p>
                <p className="text-purple-100 text-sm font-medium">Courses</p>
              </div>

              <div className="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <Shield className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{pendingUsers.length}</p>
                <p className="text-orange-100 text-sm font-medium">Pending Approvals</p>
              </div>
            </div>

            {/* Pending Approvals */}
            {pendingUsers.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Pending Approvals ({pendingUsers.length})
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {pendingUsers.map(u => (
                      <div key={u.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-white border border-orange-200 rounded-xl hover:shadow-md transition-all">
                        <div>
                          <p className="font-semibold text-gray-700">{u.name}</p>
                          <p className="text-xs text-gray-500">{u.email} • <span className="capitalize">{u.role}</span></p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => approveUser(u.id)} className="p-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700 transition-all">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirm({ type: 'user', id: u.id, name: u.name })} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pending Resources */}
            {pendingResources.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Pending Resources ({pendingResources.length})
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {pendingResources.map(r => (
                      <div key={r.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-white border border-amber-200 rounded-xl hover:shadow-md transition-all">
                        <div>
                          <p className="font-semibold text-gray-700">{r.title}</p>
                          <p className="text-xs text-gray-500 capitalize">{r.type.replace('_', ' ')} • {r.fileSize}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => approveResource(r.id)} className="p-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700 transition-all">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirm({ type: 'resource', id: r.id, name: r.title })} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowForm(showForm === 'dept' ? '' : 'dept')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                {showForm === 'dept' ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showForm === 'dept' ? 'Cancel' : 'Add Department'}
              </button>
            </div>

            {showForm === 'dept' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Add New Department</h3>
                </div>
                <form onSubmit={handleAddDepartment} className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input type="text" required value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Department name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Code</label>
                      <input type="text" required value={deptForm.code} onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g., CSE" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea value={deptForm.description} onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none resize-none" rows={3} placeholder="Department description" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl">
                    Add Department
                  </button>
                </form>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {departments.map(dept => (
                <div key={dept.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-teal-300 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    <button onClick={() => setDeleteConfirm({ type: 'department', id: dept.id, name: dept.name })} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <h4 className="text-xl font-bold text-[#1a2744] mb-2 group-hover:text-teal-600 transition-colors">{dept.name}</h4>
                  <p className="text-sm text-teal-600 font-semibold mb-2">{dept.code}</p>
                  <p className="text-sm text-gray-600">{dept.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowForm(showForm === 'course' ? '' : 'course')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                {showForm === 'course' ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showForm === 'course' ? 'Cancel' : 'Add Course'}
              </button>
            </div>

            {showForm === 'course' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Add New Course</h3>
                </div>
                <form onSubmit={handleAddCourse} className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Code</label>
                      <input type="text" required value={courseForm.code} onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., CS101" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input type="text" required value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Course name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                      <select required value={courseForm.departmentId} onChange={(e) => setCourseForm({ ...courseForm, departmentId: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                        <option value="">Select Department</option>
                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Batch</label>
                      <input type="number" required value={courseForm.batch} onChange={(e) => setCourseForm({ ...courseForm, batch: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Credits</label>
                      <input type="number" required value={courseForm.credits} onChange={(e) => setCourseForm({ ...courseForm, credits: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Faculty</label>
                      <select value={courseForm.facultyId} onChange={(e) => setCourseForm({ ...courseForm, facultyId: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                        <option value="">Assign Faculty</option>
                        {approvedFaculty.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows={3} placeholder="Course description" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl">
                    Add Course
                  </button>
                </form>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {courses.map(course => (
                <div key={course.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <button onClick={() => setDeleteConfirm({ type: 'course', id: course.id, name: course.name })} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">{course.code}</span>
                    <span className="text-xs text-gray-500">Batch {course.batch}</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#1a2744] mb-2 group-hover:text-blue-600 transition-colors">{course.name}</h4>
                  <p className="text-sm text-gray-600">{course.credits} credits</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">All Users ({users.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Role</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Department</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-700">{u.name}</td>
                      <td className="py-4 px-6 text-gray-500">{u.email}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 text-xs font-bold rounded-full capitalize bg-gray-100 text-gray-700">{u.role}</span>
                      </td>
                      <td className="py-4 px-6">
                        {u.department ? (
                          <span className="text-gray-700">{u.department}</span>
                        ) : (
                          <select value="" onChange={(e) => { if (e.target.value) updateUser(u.id, { department: e.target.value }); }}
                            className="px-3 py-1 text-xs border border-amber-300 bg-amber-50 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
                            <option value="">Assign Dept</option>
                            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                          </select>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${u.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {u.approved ? 'Active' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          {!u.approved && (
                            <button onClick={() => approveUser(u.id)} className="p-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700 transition-all">
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          {u.id !== user?.id && (
                            <button onClick={() => setDeleteConfirm({ type: 'user', id: u.id, name: u.name })} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Students ({approvedStudents.length})</h3>
              </div>
            </div>

            {selectedStudent ? (
              (() => {
                const student = users.find(u => u.id === selectedStudent);
                if (!student) return null;
                const studentCourses = courses.filter(c => isStudentEnrolled(student.id, c.id));
                return (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#1a2744]">{student.name}</h3>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-4">Enroll in Course</h4>
                      <div className="flex gap-3">
                        <select id={`enroll-${student.id}`} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none">
                          <option value="">Select course</option>
                          {courses.filter(c => !isStudentEnrolled(student.id, c.id)).map(c => (
                            <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
                          ))}
                        </select>
                        <button onClick={() => {
                          const sel = document.getElementById(`enroll-${student.id}`) as HTMLSelectElement;
                          if (sel.value) { enrollStudent(student.id, sel.value); sel.value = ''; }
                        }} className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl">
                          Enroll
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedStudents.map(student => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student.id)}
                    className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1 text-left"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-[#1a2744] group-hover:text-green-600 transition-colors">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                    <div className="text-sm text-teal-600 font-medium flex items-center gap-1">
                      View Details <ArrowLeft className="w-4 h-4 rotate-180" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowForm(showForm === 'ann' ? '' : 'ann')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                {showForm === 'ann' ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showForm === 'ann' ? 'Cancel' : 'New Announcement'}
              </button>
            </div>

            {showForm === 'ann' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Publish Announcement</h3>
                </div>
                <form onSubmit={handleAddAnnouncement} className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input type="text" required value={annForm.title} onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Announcement title" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <select value={annForm.category} onChange={(e) => setAnnForm({ ...annForm, category: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                        <option value="general">General</option>
                        <option value="exam">Exam</option>
                        <option value="event">Event</option>
                        <option value="holiday">Holiday</option>
                        <option value="academic">Academic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                      <select value={annForm.priority} onChange={(e) => setAnnForm({ ...annForm, priority: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                    <textarea required value={annForm.content} onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none" rows={4} placeholder="Announcement content" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl">
                    Publish Announcement
                  </button>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {announcements.map(ann => (
                <div key={ann.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-purple-300 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[#1a2744] mb-2 group-hover:text-purple-600 transition-colors">{ann.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{ann.content}</p>
                      <p className="text-xs text-gray-400">{new Date(ann.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => setDeleteConfirm({ type: 'announcement', id: ann.id, name: ann.title })} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowForm(showForm === 'cal' ? '' : 'cal')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                {showForm === 'cal' ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showForm === 'cal' ? 'Cancel' : 'Add Event'}
              </button>
            </div>

            {showForm === 'cal' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Add Calendar Event</h3>
                </div>
                <form onSubmit={handleAddCalendarEvent} className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                      <input type="text" required value={calForm.title} onChange={(e) => setCalForm({ ...calForm, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Event title" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                      <select value={calForm.type} onChange={(e) => setCalForm({ ...calForm, type: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white">
                        <option value="event">Event</option>
                        <option value="exam">Exam</option>
                        <option value="holiday">Holiday</option>
                        <option value="deadline">Deadline</option>
                        <option value="academic">Academic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                      <input type="date" required value={calForm.date} onChange={(e) => setCalForm({ ...calForm, date: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                      <input type="date" value={calForm.endDate} onChange={(e) => setCalForm({ ...calForm, endDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea value={calForm.description} onChange={(e) => setCalForm({ ...calForm, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none" rows={2} placeholder="Event description" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl">
                    Add Event
                  </button>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {calendarEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => (
                <div key={event.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-orange-300 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Calendar className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#1a2744] group-hover:text-orange-600 transition-colors">{event.title}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                    <button onClick={() => setDeleteConfirm({ type: 'calendarEvent', id: event.id, name: event.title })} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">All Resources ({resources.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Title</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map(r => (
                      <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-700">{r.title}</td>
                        <td className="py-4 px-6 text-gray-500 capitalize">{r.type.replace('_', ' ')}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${r.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {r.approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            {!r.approved && (
                              <button onClick={() => approveResource(r.id)} className="p-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700 transition-all">
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button onClick={() => setDeleteConfirm({ type: 'resource', id: r.id, name: r.title })} className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a2744]">Confirm Delete</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-700 mb-8">
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <ProfileEdit onClose={() => setShowProfileEdit(false)} />
      )}
    </div>
  );
}
