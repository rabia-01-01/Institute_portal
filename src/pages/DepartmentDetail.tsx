import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Building2, BookOpen, Users, Mail, GraduationCap } from 'lucide-react';

export default function DepartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const { departments, courses, users } = useData();

  const department = departments.find(d => d.id === id);
  const deptCourses = courses.filter(c => c.departmentId === id);
  const deptFaculty = users.filter(u => u.role === 'faculty' && u.department === department?.name && u.approved);

  if (!department) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Department Not Found</h2>
          <Link to="/departments" className="text-teal-600 hover:text-teal-700 font-medium">
            ← Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a2744] to-[#0d4a4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/departments" className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Departments
          </Link>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{department.name}</h1>
                <span className="px-4 py-1.5 bg-teal-500/20 backdrop-blur text-teal-300 text-sm font-bold rounded-full border border-teal-400/30">
                  {department.code}
                </span>
              </div>
              <p className="text-gray-300 text-lg">{department.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-8 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
                <BookOpen className="w-6 h-6 text-teal-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">{deptCourses.length}</p>
                <p className="text-sm text-gray-300">Courses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
                <Users className="w-6 h-6 text-teal-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">{deptFaculty.length}</p>
                <p className="text-sm text-gray-300">Faculty Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Courses Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Available Courses
                  </h2>
                </div>
                <div className="p-6">
                  {deptCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No courses available yet</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {deptCourses.map(course => (
                        <div 
                          key={course.id} 
                          className="group border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-teal-300 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">
                              {course.code}
                            </span>
                            <span className="text-xs text-gray-500">Batch {course.batch}</span>
                          </div>
                          <h3 className="font-semibold text-[#1a2744] mb-2 group-hover:text-teal-600 transition-colors">
                            {course.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{course.description}</p>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-500">{course.credits} Credits</span>
                            {course.facultyId && (
                              <span className="text-xs text-teal-600 font-medium">
                                {users.find(u => u.id === course.facultyId)?.name}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Faculty Column */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
                <div className="bg-gradient-to-r from-[#1a2744] to-[#2a3a5c] px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Faculty Members
                  </h2>
                </div>
                <div className="p-6">
                  {deptFaculty.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No faculty members yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {deptFaculty.map(faculty => (
                        <div 
                          key={faculty.id}
                          className="group border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-teal-300 transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                              {faculty.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-[#1a2744] group-hover:text-teal-600 transition-colors">
                                {faculty.name}
                              </h3>
                              <p className="text-sm text-teal-600 font-medium mb-1">{faculty.designation}</p>
                              {faculty.specialization && (
                                <p className="text-xs text-gray-500 mb-2">{faculty.specialization}</p>
                              )}
                              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{faculty.email}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
