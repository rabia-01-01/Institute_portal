import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Upload, FileText, Users, BookOpen, Plus, Check, X } from 'lucide-react';

export default function FacultyDashboard() {
  const { user } = useAuth();
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-[#1a2744]">Faculty Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome, {user?.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 border border-gray-200 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BookOpen },
            { id: 'upload', label: 'Upload', icon: Upload },
            { id: 'add-course', label: 'Add Course', icon: BookOpen },
            { id: 'add-announcement', label: 'Announcement', icon: Users },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'resources', label: 'My Resources', icon: FileText },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${activeTab === tab.id ? 'bg-[#1a2744] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <p className="text-2xl font-bold text-[#1a2744]">{myCourses.length}</p>
              <p className="text-xs text-gray-500">Courses</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <p className="text-2xl font-bold text-[#1a2744]">{myResources.length}</p>
              <p className="text-xs text-gray-500">Resources</p>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-[#1a2744] mb-6">Upload Resource</h3>
            {uploadSuccess && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">✓ Uploaded!</div>}
            {uploadError && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{uploadError}</div>}
            <form onSubmit={handleUpload} className="space-y-5">
              <input type="text" required placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
              <select required value={formData.courseId} onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white">
                <option value="">Select Course</option>
                {myCourses.map(c => <option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
              </select>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white">
                <option value="pdf">PDF</option><option value="notes">Notes</option><option value="assignment">Assignment</option>
                <option value="question_paper">Question Paper</option><option value="video">Video</option>
              </select>
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none" rows={3} />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-teal-400"
                onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                {formData.file ? <p className="text-sm text-teal-700">{formData.file.name}</p> : <p className="text-sm text-gray-600">Click to select file</p>}
                <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.docx,.mp4" onChange={handleFileSelect} />
              </div>
              <button type="submit" className="w-full py-2.5 bg-[#1a2744] text-white font-medium rounded-lg">Upload</button>
            </form>
          </div>
        )}

        {activeTab === 'add-course' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-[#1a2744] mb-6">Add Course</h3>
            {courseSuccess && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">✓ {courseSuccess}</div>}
            <form onSubmit={handleAddCourse} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required placeholder="Code" value={courseForm.code} onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg" />
                <input type="number" required placeholder="Batch" value={courseForm.batch} onChange={(e) => setCourseForm({ ...courseForm, batch: parseInt(e.target.value) })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg" />
              </div>
              <input type="text" required placeholder="Name" value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
              <input type="number" required placeholder="Credits" value={courseForm.credits} onChange={(e) => setCourseForm({ ...courseForm, credits: parseInt(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
              <textarea placeholder="Description" value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none" rows={3} />
              <button type="submit" className="w-full py-2.5 bg-[#1a2744] text-white font-medium rounded-lg">Create Course</button>
            </form>
          </div>
        )}

        {activeTab === 'add-announcement' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-[#1a2744] mb-6">Publish Announcement</h3>
            {annSuccess && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">✓ {annSuccess}</div>}
            <form onSubmit={handleAddAnnouncement} className="space-y-5">
              <input type="text" required placeholder="Title" value={annForm.title} onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <select value={annForm.category} onChange={(e) => setAnnForm({ ...annForm, category: e.target.value as any })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white">
                  <option value="general">General</option><option value="exam">Exam</option><option value="event">Event</option><option value="academic">Academic</option>
                </select>
                <select value={annForm.priority} onChange={(e) => setAnnForm({ ...annForm, priority: e.target.value as any })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white">
                  <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                </select>
              </div>
              <textarea required placeholder="Content" value={annForm.content} onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none" rows={6} />
              <button type="submit" className="w-full py-2.5 bg-[#1a2744] text-white font-medium rounded-lg">Publish</button>
            </form>
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <h3 className="font-semibold text-[#1a2744] mb-4">My Courses</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {myCourses.map(course => (
                <div key={course.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-bold rounded">{course.code}</span>
                  <h4 className="font-semibold text-[#1a2744] mt-2">{course.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">Batch {course.batch}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div>
            <h3 className="font-semibold text-[#1a2744] mb-4">My Resources ({myResources.length})</h3>
            {myResources.length === 0 ? <p className="text-gray-500">No resources uploaded yet.</p> : (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myResources.map(r => (
                      <tr key={r.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-700">{r.title}</td>
                        <td className="py-3 px-4 text-gray-500 capitalize">{r.type.replace('_', ' ')}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${r.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
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
