import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Upload, FileText, Users, BookOpen, Plus, Check, X, ArrowLeft, Briefcase, TrendingUp } from 'lucide-react';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getCoursesByFaculty, getResourcesByFaculty, addResource, addCourse, addAnnouncement, courses, departments } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'students' | 'resources' | 'add-course' | 'add-announcement'>('overview');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({ title: '', courseId: '', type: 'pdf' as const, description: '', file: null as File | null });
  const [courseForm, setCourseForm] = useState({ code: '', name: '', batch: 2024, credits: 3, description: '' });
  const [courseSuccess, setCourseSuccess] = useState('');
  const [annForm, setAnnForm] = useState({ title: '', content: '', category: 'general' as const, priority: 'medium' as const });
  const [annSuccess, setAnnSuccess] = useState('');

  const myDepartment = user?.department || '';
  const departmentCourses = user && myDepartment ? courses.filter(c => {
    const dept = departments.find(d => d.id === c.departmentId);
    return dept?.name === myDepartment;
  }) : [];
  const assignedCourses = user ? getCoursesByFaculty(user.id) : [];
  const myCourses = user ? myDepartment ? [...new Map([...departmentCourses, ...assignedCourses].map(c => [c.id, c])).values()] : courses : [];
  const myResources = user ? getResourcesByFaculty(user.id) : [];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'video/mp4'];
      if (!allowedTypes.includes(file.type)) { setUploadError('Invalid file type.'); return; }
      if (file.size > 500 * 1024 * 1024) { setUploadError('File size exceeds 500MB.'); return; }
      setFormData({ ...formData, file });
      setUploadError('');
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.courseId || !formData.file || !user) { setUploadError('Please fill all fields.'); return; }
    const fileSizeMB = formData.file.size / (1024 * 1024);
    const fileSizeStr = fileSizeMB >= 1 ? `${fileSizeMB.toFixed(1)} MB` : `${(formData.file.size / 1024).toFixed(0)} KB`;
    addResource({ title: formData.title, type: formData.type, courseId: formData.courseId, uploadedBy: user.id, description: formData.description, fileName: formData.file.name, fileSize: fileSizeStr });
    setUploadSuccess(true);
    setFormData({ title: '', courseId: '', type: 'pdf', description: '', file: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const dept = departments.find(d => d.name === myDepartment);
    if (!dept) return;
    addCourse({ code: courseForm.code, name: courseForm.name, departmentId: dept.id, batch: courseForm.batch, credits: courseForm.credits, facultyId: user.id, description: courseForm.description });
    setCourseSuccess('Course added!');
    setCourseForm({ code: '', name: '', batch: 2024, credits: 3, description: '' });
    setTimeout(() => setCourseSuccess(''), 3000);
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    addAnnouncement({ title: annForm.title, content: annForm.content, category: annForm.category, priority: annForm.priority, authorId: user.id });
    setAnnSuccess('Announcement published!');
    setAnnForm({ title: '', content: '', category: 'general', priority: 'medium' });
    setTimeout(() => setAnnSuccess(''), 3000);
  };

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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
                    <p className="text-blue-200 text-sm">Welcome back, {user?.name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 text-sm font-medium rounded-full border border-blue-400/30">
                ✓ Faculty Member
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
            { id: 'upload', label: 'Upload', icon: Upload },
            { id: 'add-course', label: 'Add Course', icon: BookOpen },
            { id: 'add-announcement', label: 'Announcement', icon: Users },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'resources', label: 'My Resources', icon: FileText },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
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
                <p className="text-blue-100 text-sm font-medium">Courses</p>
              </div>

              <div className="group bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <FileText className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{myResources.length}</p>
                <p className="text-teal-100 text-sm font-medium">Resources</p>
              </div>

              <div className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <Users className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{myResources.filter(r => r.approved).length}</p>
                <p className="text-purple-100 text-sm font-medium">Approved</p>
              </div>

              <div className="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <Upload className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-4xl font-bold mb-1">{myResources.filter(r => !r.approved).length}</p>
                <p className="text-orange-100 text-sm font-medium">Pending</p>
              </div>
            </div>

            {/* Department Courses */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Department Courses ({myCourses.length})
                </h3>
              </div>
              <div className="p-6">
                {myCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No courses in your department yet</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {myCourses.map(course => (
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
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Resource
                </h3>
              </div>
              <div className="p-8">
                {uploadSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Resource uploaded successfully!
                  </div>
                )}
                {uploadError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {uploadError}
                  </div>
                )}
                <form onSubmit={handleUpload} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      placeholder="Enter resource title"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                      <select
                        required
                        value={formData.courseId}
                        onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                      >
                        <option value="">Select Course</option>
                        {myCourses.map(c => <option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                      >
                        <option value="pdf">PDF</option>
                        <option value="notes">Notes</option>
                        <option value="assignment">Assignment</option>
                        <option value="question_paper">Question Paper</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                      rows={4}
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">File</label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                        formData.file ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      {formData.file ? (
                        <p className="text-sm text-teal-700 font-medium">{formData.file.name}</p>
                      ) : (
                        <p className="text-sm text-gray-600">Click to select file</p>
                      )}
                      <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.docx,.mp4" onChange={handleFileSelect} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Upload Resource
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Add Course Tab */}
        {activeTab === 'add-course' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Add New Course
                </h3>
              </div>
              <div className="p-8">
                {courseSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    {courseSuccess}
                  </div>
                )}
                <form onSubmit={handleAddCourse} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Course Code</label>
                      <input
                        type="text"
                        required
                        value={courseForm.code}
                        onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g., CS101"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Batch</label>
                      <input
                        type="number"
                        required
                        value={courseForm.batch}
                        onChange={(e) => setCourseForm({ ...courseForm, batch: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name</label>
                    <input
                      type="text"
                      required
                      value={courseForm.name}
                      onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Enter course name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Credits</label>
                    <input
                      type="number"
                      required
                      value={courseForm.credits}
                      onChange={(e) => setCourseForm({ ...courseForm, credits: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      rows={4}
                      placeholder="Enter course description"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Create Course
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Add Announcement Tab */}
        {activeTab === 'add-announcement' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Publish Announcement
                </h3>
              </div>
              <div className="p-8">
                {annSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    {annSuccess}
                  </div>
                )}
                <form onSubmit={handleAddAnnouncement} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      required
                      value={annForm.title}
                      onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="Enter announcement title"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <select
                        value={annForm.category}
                        onChange={(e) => setAnnForm({ ...annForm, category: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                      >
                        <option value="general">General</option>
                        <option value="exam">Exam</option>
                        <option value="event">Event</option>
                        <option value="academic">Academic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                      <select
                        value={annForm.priority}
                        onChange={(e) => setAnnForm({ ...annForm, priority: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                    <textarea
                      required
                      value={annForm.content}
                      onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                      rows={6}
                      placeholder="Enter announcement content"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Publish Announcement
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">My Courses</h3>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {myCourses.map(course => (
                <div key={course.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">{course.code}</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#1a2744] mb-2 group-hover:text-green-600 transition-colors">{course.name}</h4>
                  <p className="text-sm text-gray-600">Batch {course.batch}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">My Resources ({myResources.length})</h3>
              </div>
            </div>
            {myResources.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No resources uploaded yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Title</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myResources.map(r => (
                      <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-700">{r.title}</td>
                        <td className="py-4 px-6 text-gray-500 capitalize">{r.type.replace('_', ' ')}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            r.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {r.approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
