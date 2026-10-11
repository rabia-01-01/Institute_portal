import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Users, BookOpen, Building2, Bell, Calendar, FileText, Shield, Plus, Check, X, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
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

  const handleAddDepartment = (e: React.FormEvent) => { e.preventDefault(); addDepartment(deptForm); setDeptForm({ name: '', code: '', description: '' }); setShowForm(''); };
  const handleAddCourse = (e: React.FormEvent) => { e.preventDefault(); addCourse(courseForm); setCourseForm({ code: '', name: '', departmentId: '', batch: 2024, credits: 3, facultyId: '', description: '' }); setShowForm(''); };
  const handleAddAnnouncement = (e: React.FormEvent) => { e.preventDefault(); addAnnouncement({ ...annForm, authorId: user!.id }); setAnnForm({ title: '', content: '', category: 'general', priority: 'medium' }); setShowForm(''); };
  const handleAddCalendarEvent = (e: React.FormEvent) => { e.preventDefault(); addCalendarEvent({ ...calForm, createdBy: user!.id }); setCalForm({ title: '', date: '', endDate: '', type: 'event', description: '' }); setShowForm(''); };

  const pendingUsers = users.filter(u => !u.approved);
  const approvedStudents = users.filter(u => u.role === 'student' && u.approved);
  const approvedFaculty = users.filter(u => u.role === 'faculty' && u.approved);
  const pendingResources = resources.filter(r => !r.approved);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-[#1a2744]">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome, {user?.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 border border-gray-200 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'departments', label: 'Departments', icon: Building2 },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'announcements', label: 'Announcements', icon: Bell },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'resources', label: 'Resources', icon: FileText },
          ].map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id as any); setShowForm(''); setSelectedStudent(null); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${activeTab === tab.id ? 'bg-[#1a2744] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <tab.icon className="w-4 h-4" /><span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-200"><p className="text-2xl font-bold text-[#1a2744]">{users.length}</p><p className="text-xs text-gray-500">Users</p></div>
              <div className="bg-white rounded-xl p-5 border border-gray-200"><p className="text-2xl font-bold text-[#1a2744]">{departments.length}</p><p className="text-xs text-gray-500">Departments</p></div>
              <div className="bg-white rounded-xl p-5 border border-gray-200"><p className="text-2xl font-bold text-[#1a2744]">{courses.length}</p><p className="text-xs text-gray-500">Courses</p></div>
              <div className="bg-white rounded-xl p-5 border border-gray-200"><p className="text-2xl font-bold text-amber-600">{pendingUsers.length}</p><p className="text-xs text-gray-500">Pending</p></div>
            </div>
            {pendingUsers.length > 0 && (
              <div className="bg-white rounded-xl border border-amber-200 p-6">
                <h3 className="font-semibold text-[#1a2744] mb-4">Pending Approvals</h3>
                <div className="space-y-3">
                  {pendingUsers.map(u => (
                    <div key={u.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <div><p className="font-medium text-gray-700">{u.name}</p><p className="text-xs text-gray-500">{u.email} • {u.role}</p></div>
                      <div className="flex gap-2">
                        <button onClick={() => approveUser(u.id)} className="p-1.5 bg-green-100 hover:bg-green-200 rounded text-green-700"><Check className="w-4 h-4" /></button>
                        <button onClick={() => deleteUser(u.id)} className="p-1.5 bg-red-100 hover:bg-red-200 rounded text-red-700"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-4">
            <button onClick={() => setShowForm(showForm === 'dept' ? '' : 'dept')} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded-lg">
              {showForm === 'dept' ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}{showForm === 'dept' ? 'Cancel' : 'Add Department'}
            </button>
            {showForm === 'dept' && (
              <form onSubmit={handleAddDepartment} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Name" value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg" />
                  <input type="text" required placeholder="Code" value={deptForm.code} onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <textarea placeholder="Description" value={deptForm.description} onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" rows={3} />
                <button type="submit" className="px-6 py-2 bg-[#1a2744] text-white rounded-lg">Add</button>
              </form>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              {departments.map(dept => (
                <div key={dept.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between">
                    <div><h4 className="font-semibold text-[#1a2744]">{dept.name}</h4><p className="text-xs text-teal-600 font-medium">{dept.code}</p><p className="text-sm text-gray-500 mt-1">{dept.description}</p></div>
                    <button onClick={() => deleteDepartment(dept.id)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            <button onClick={() => setShowForm(showForm === 'course' ? '' : 'course')} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded-lg">
              {showForm === 'course' ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}{showForm === 'course' ? 'Cancel' : 'Add Course'}
            </button>
            {showForm === 'course' && (
              <form onSubmit={handleAddCourse} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Code" value={courseForm.code} onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg" />
                  <input type="text" required placeholder="Name" value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg" />
                  <select required value={courseForm.departmentId} onChange={(e) => setCourseForm({ ...courseForm, departmentId: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
                    <option value="">Select Department</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                  <input type="number" required placeholder="Batch" value={courseForm.batch} onChange={(e) => setCourseForm({ ...courseForm, batch: parseInt(e.target.value) })} className="px-4 py-2 border border-gray-300 rounded-lg" />
                  <input type="number" required placeholder="Credits" value={courseForm.credits} onChange={(e) => setCourseForm({ ...courseForm, credits: parseInt(e.target.value) })} className="px-4 py-2 border border-gray-300 rounded-lg" />
                  <select value={courseForm.facultyId} onChange={(e) => setCourseForm({ ...courseForm, facultyId: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
                    <option value="">Assign Faculty</option>
                    {approvedFaculty.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                  </select>
                </div>
                <textarea placeholder="Description" value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" rows={3} />
                <button type="submit" className="px-6 py-2 bg-[#1a2744] text-white rounded-lg">Add</button>
              </form>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              {courses.map(course => (
                <div key={course.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs font-bold rounded">{course.code}</span>
                    <button onClick={() => deleteCourse(course.id)} className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <h4 className="font-semibold text-[#1a2744]">{course.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">Batch {course.batch} • {course.credits} credits</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-700">{u.name}</td>
                    <td className="py-3 px-4 text-gray-500">{u.email}</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 text-xs rounded-full capitalize bg-gray-100 text-gray-600">{u.role}</span></td>
                    <td className="py-3 px-4">
                      {u.department ? <span className="text-gray-700">{u.department}</span> : (
                        <select value="" onChange={(e) => { if (e.target.value) updateUser(u.id, { department: e.target.value }); }} className="px-2 py-1 text-xs border border-amber-300 bg-amber-50 rounded">
                          <option value="">Assign Dept</option>
                          {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                      )}
                    </td>
                    <td className="py-3 px-4"><span className={`px-2 py-0.5 text-xs rounded-full ${u.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{u.approved ? 'Active' : 'Pending'}</span></td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {!u.approved && <button onClick={() => approveUser(u.id)} className="p-1 bg-green-100 hover:bg-green-200 rounded text-green-700"><Check className="w-3.5 h-3.5" /></button>}
                        {u.id !== user?.id && <button onClick={() => deleteUser(u.id)} className="p-1 bg-red-100 hover:bg-red-200 rounded text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#1a2744]">Students ({approvedStudents.length})</h3>
            {selectedStudent ? (
              (() => {
                const student = users.find(u => u.id === selectedStudent);
                if (!student) return null;
                const studentCourses = courses.filter(c => isStudentEnrolled(student.id, c.id));
                return (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#1a2744] to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">{student.name.charAt(0)}</div>
                        <div><h3 className="text-xl font-bold text-[#1a2744]">{student.name}</h3><p className="text-sm text-gray-500">{student.email}</p></div>
                      </div>
                      <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-3">Enroll in Course</h4>
                      <div className="flex gap-2">
                        <select id={`enroll-${student.id}`} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm">
                          <option value="">Select course</option>
                          {courses.filter(c => !isStudentEnrolled(student.id, c.id)).map(c => <option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}
                        </select>
                        <button onClick={() => { const sel = document.getElementById(`enroll-${student.id}`) as HTMLSelectElement; if (sel.value) { enrollStudent(student.id, sel.value); sel.value = ''; } }} className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded-lg">Enroll</button>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvedStudents.map(student => (
                  <button key={student.id} onClick={() => setSelectedStudent(student.id)} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow text-left">
                    <p className="font-semibold text-[#1a2744]">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.email}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-4">
            <button onClick={() => setShowForm(showForm === 'ann' ? '' : 'ann')} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded-lg">
              {showForm === 'ann' ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}{showForm === 'ann' ? 'Cancel' : 'New Announcement'}
            </button>
            {showForm === 'ann' && (
              <form onSubmit={handleAddAnnouncement} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <input type="text" required placeholder="Title" value={annForm.title} onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                <div className="grid md:grid-cols-2 gap-4">
                  <select value={annForm.category} onChange={(e) => setAnnForm({ ...annForm, category: e.target.value as any })} className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
                    <option value="general">General</option><option value="exam">Exam</option><option value="event">Event</option><option value="holiday">Holiday</option><option value="academic">Academic</option>
                  </select>
                  <select value={annForm.priority} onChange={(e) => setAnnForm({ ...annForm, priority: e.target.value as any })} className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
                    <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                  </select>
                </div>
                <textarea required placeholder="Content" value={annForm.content} onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" rows={4} />
                <button type="submit" className="px-6 py-2 bg-[#1a2744] text-white rounded-lg">Publish</button>
              </form>
            )}
            <div className="space-y-3">
              {announcements.map(ann => (
                <div key={ann.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-start justify-between">
                  <div><h4 className="font-semibold text-[#1a2744]">{ann.title}</h4><p className="text-sm text-gray-500 mt-1">{ann.content}</p><p className="text-xs text-gray-400 mt-2">{new Date(ann.createdAt).toLocaleDateString()}</p></div>
                  <button onClick={() => deleteAnnouncement(ann.id)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-4">
            <button onClick={() => setShowForm(showForm === 'cal' ? '' : 'cal')} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded-lg">
              {showForm === 'cal' ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}{showForm === 'cal' ? 'Cancel' : 'Add Event'}
            </button>
            {showForm === 'cal' && (
              <form onSubmit={handleAddCalendarEvent} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Title" value={calForm.title} onChange={(e) => setCalForm({ ...calForm, title: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg" />
                  <select value={calForm.type} onChange={(e) => setCalForm({ ...calForm, type: e.target.value as any })} className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
                    <option value="event">Event</option><option value="exam">Exam</option><option value="holiday">Holiday</option><option value="deadline">Deadline</option><option value="academic">Academic</option>
                  </select>
                  <input type="date" required value={calForm.date} onChange={(e) => setCalForm({ ...calForm, date: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg" />
                  <input type="date" value={calForm.endDate} onChange={(e) => setCalForm({ ...calForm, endDate: e.target.value })} className="px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <textarea placeholder="Description" value={calForm.description} onChange={(e) => setCalForm({ ...calForm, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none" rows={2} />
                <button type="submit" className="px-6 py-2 bg-[#1a2744] text-white rounded-lg">Add</button>
              </form>
            )}
            <div className="space-y-3">
              {calendarEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                  <div><p className="font-medium text-[#1a2744]">{event.title}</p><p className="text-xs text-gray-500">{event.date}</p></div>
                  <button onClick={() => deleteCalendarEvent(event.id)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-[#1a2744]">Resources ({resources.length})</h3>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map(r => (
                    <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-700">{r.title}</td>
                      <td className="py-3 px-4 text-gray-500 capitalize">{r.type.replace('_', ' ')}</td>
                      <td className="py-3 px-4"><span className={`px-2 py-0.5 text-xs rounded-full ${r.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{r.approved ? 'Approved' : 'Pending'}</span></td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          {!r.approved && <button onClick={() => approveResource(r.id)} className="p-1 bg-green-100 hover:bg-green-200 rounded text-green-700"><Check className="w-3.5 h-3.5" /></button>}
                          <button onClick={() => deleteResource(r.id)} className="p-1 bg-red-100 hover:bg-red-200 rounded text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
