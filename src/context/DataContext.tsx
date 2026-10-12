import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'faculty' | 'admin';
  department?: string;
  phone?: string;
  studentId?: string;
  designation?: string;
  specialization?: string;
  officeHours?: string;
  approved: boolean;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  createdAt: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  batch: number;
  credits: number;
  facultyId?: string;
  description: string;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'exam' | 'event' | 'holiday' | 'academic';
  priority: 'low' | 'medium' | 'high';
  authorId: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  type: 'exam' | 'holiday' | 'event' | 'deadline' | 'academic';
  description: string;
  createdBy: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'assignment' | 'question_paper' | 'syllabus' | 'notes';
  courseId: string;
  uploadedBy: string;
  description: string;
  fileName: string;
  fileSize: string;
  approved: boolean;
  createdAt: string;
}

export interface CommunityMessage {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  sentBy: string;
  createdAt: string;
  read: boolean;
}

interface DataContextType {
  // Users
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'approved'>) => User;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  approveUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
  getStudents: () => User[];
  getFaculty: () => User[];
  getAdmins: () => User[];

  // Departments
  departments: Department[];
  addDepartment: (dept: Omit<Department, 'id' | 'createdAt'>) => Department;
  updateDepartment: (id: string, data: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
  getDepartmentById: (id: string) => Department | undefined;

  // Courses
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'createdAt'>) => Course;
  updateCourse: (id: string, data: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
  getCoursesByDepartment: (deptId: string) => Course[];
  getCoursesByFaculty: (facultyId: string) => Course[];
  getCoursesByStudent: (studentId: string) => Course[];

  // Enrollments
  enrollments: Enrollment[];
  enrollStudent: (studentId: string, courseId: string) => void;
  unenrollStudent: (studentId: string, courseId: string) => void;
  isStudentEnrolled: (studentId: string, courseId: string) => boolean;
  getStudentsInCourse: (courseId: string) => User[];

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (ann: Omit<Announcement, 'id' | 'createdAt'>) => Announcement;
  updateAnnouncement: (id: string, data: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  // Calendar Events
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => CalendarEvent;
  updateCalendarEvent: (id: string, data: Partial<CalendarEvent>) => void;
  deleteCalendarEvent: (id: string) => void;

  // Resources
  resources: Resource[];
  addResource: (resource: Omit<Resource, 'id' | 'createdAt' | 'approved'>) => Resource;
  approveResource: (id: string) => void;
  deleteResource: (id: string) => void;
  getResourcesByCourse: (courseId: string) => Resource[];
  getResourcesByFaculty: (facultyId: string) => Resource[];

  // Community Messages
  communityMessages: CommunityMessage[];
  addCommunityMessage: (message: Omit<CommunityMessage, 'id' | 'createdAt'>) => CommunityMessage;
  deleteCommunityMessage: (id: string) => void;

  // Notifications
  notifications: Notification[];
  sendNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => Notification;
  markNotificationAsRead: (id: string) => void;
  getUnreadNotifications: (userId: string) => Notification[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export function DataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useLocalStorage<User[]>('institute_users', []);
  const [departments, setDepartments] = useLocalStorage<Department[]>('institute_departments', []);
  const [courses, setCourses] = useLocalStorage<Course[]>('institute_courses', []);
  const [enrollments, setEnrollments] = useLocalStorage<Enrollment[]>('institute_enrollments', []);
  const [announcements, setAnnouncements] = useLocalStorage<Announcement[]>('institute_announcements', []);
  const [calendarEvents, setCalendarEvents] = useLocalStorage<CalendarEvent[]>('institute_calendar', []);
  const [resources, setResources] = useLocalStorage<Resource[]>('institute_resources', []);
  const [communityMessages, setCommunityMessages] = useLocalStorage<CommunityMessage[]>('institute_community_messages', []);
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('institute_notifications', []);

  // Users
  const addUser = (userData: Omit<User, 'id' | 'createdAt' | 'approved'>) => {
    const newUser: User = {
      ...userData,
      department: userData.department || '',
      id: generateId(),
      approved: userData.role === 'admin',
      createdAt: new Date().toISOString(),
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (id: string, data: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setEnrollments(prev => prev.filter(e => e.studentId !== id));
  };

  const approveUser = (id: string) => {
    updateUser(id, { approved: true });
  };

  const getUserById = (id: string) => users.find(u => u.id === id);
  const getStudents = () => users.filter(u => u.role === 'student');
  const getFaculty = () => users.filter(u => u.role === 'faculty');
  const getAdmins = () => users.filter(u => u.role === 'admin');

  // Departments
  const addDepartment = (deptData: Omit<Department, 'id' | 'createdAt'>) => {
    const newDept: Department = { ...deptData, id: generateId(), createdAt: new Date().toISOString() };
    setDepartments(prev => [...prev, newDept]);
    return newDept;
  };

  const updateDepartment = (id: string, data: Partial<Department>) => {
    setDepartments(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
  };

  const deleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(d => d.id !== id));
  };

  const getDepartmentById = (id: string) => departments.find(d => d.id === id);

  // Courses
  const addCourse = (courseData: Omit<Course, 'id' | 'createdAt'>) => {
    const newCourse: Course = { ...courseData, id: generateId(), createdAt: new Date().toISOString() };
    setCourses(prev => [...prev, newCourse]);
    return newCourse;
  };

  const updateCourse = (id: string, data: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setEnrollments(prev => prev.filter(e => e.courseId !== id));
  };

  const getCourseById = (id: string) => courses.find(c => c.id === id);
  const getCoursesByDepartment = (deptId: string) => courses.filter(c => c.departmentId === deptId);
  const getCoursesByFaculty = (facultyId: string) => courses.filter(c => c.facultyId === facultyId);
  const getCoursesByStudent = (studentId: string) => {
    const studentEnrollments = enrollments.filter(e => e.studentId === studentId);
    return courses.filter(c => studentEnrollments.some(e => e.courseId === c.id));
  };

  // Enrollments
  const enrollStudent = (studentId: string, courseId: string) => {
    if (!isStudentEnrolled(studentId, courseId)) {
      setEnrollments(prev => [...prev, {
        id: generateId(),
        studentId,
        courseId,
        enrolledAt: new Date().toISOString(),
      }]);
    }
  };

  const unenrollStudent = (studentId: string, courseId: string) => {
    setEnrollments(prev => prev.filter(e => !(e.studentId === studentId && e.courseId === courseId)));
  };

  const isStudentEnrolled = (studentId: string, courseId: string) => {
    return enrollments.some(e => e.studentId === studentId && e.courseId === courseId);
  };

  const getStudentsInCourse = (courseId: string) => {
    const courseEnrollments = enrollments.filter(e => e.courseId === courseId);
    return users.filter(u => courseEnrollments.some(e => e.studentId === u.id));
  };

  // Announcements
  const addAnnouncement = (annData: Omit<Announcement, 'id' | 'createdAt'>) => {
    const newAnn: Announcement = { ...annData, id: generateId(), createdAt: new Date().toISOString() };
    setAnnouncements(prev => [newAnn, ...prev]);
    return newAnn;
  };

  const updateAnnouncement = (id: string, data: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // Calendar Events
  const addCalendarEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = { ...eventData, id: generateId() };
    setCalendarEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  const updateCalendarEvent = (id: string, data: Partial<CalendarEvent>) => {
    setCalendarEvents(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents(prev => prev.filter(e => e.id !== id));
  };

  // Resources
  const addResource = (resourceData: Omit<Resource, 'id' | 'createdAt' | 'approved'>) => {
    const newResource: Resource = { ...resourceData, id: generateId(), approved: false, createdAt: new Date().toISOString() };
    setResources(prev => [newResource, ...prev]);
    return newResource;
  };

  const approveResource = (id: string) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const getResourcesByCourse = (courseId: string) => resources.filter(r => r.courseId === courseId);
  const getResourcesByFaculty = (facultyId: string) => resources.filter(r => r.uploadedBy === facultyId);

  // Community Messages
  const addCommunityMessage = (messageData: Omit<CommunityMessage, 'id' | 'createdAt'>) => {
    const newMessage: CommunityMessage = { ...messageData, id: generateId(), createdAt: new Date().toISOString() };
    setCommunityMessages(prev => [newMessage, ...prev]);
    return newMessage;
  };

  const deleteCommunityMessage = (id: string) => {
    setCommunityMessages(prev => prev.filter(m => m.id !== id));
  };

  // Notifications
  const sendNotification = (notificationData: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = { ...notificationData, id: generateId(), createdAt: new Date().toISOString(), read: false };
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getUnreadNotifications = (userId: string) => {
    return notifications.filter(n => !n.read);
  };
  
  const value: DataContextType = {
    users, addUser, updateUser, deleteUser, approveUser, getUserById, getStudents, getFaculty, getAdmins,
    departments, addDepartment, updateDepartment, deleteDepartment, getDepartmentById,
    courses, addCourse, updateCourse, deleteCourse, getCourseById, getCoursesByDepartment, getCoursesByFaculty, getCoursesByStudent,
    enrollments, enrollStudent, unenrollStudent, isStudentEnrolled, getStudentsInCourse,
    announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
    calendarEvents, addCalendarEvent, updateCalendarEvent, deleteCalendarEvent,
    resources, addResource, approveResource, deleteResource, getResourcesByCourse, getResourcesByFaculty,
    communityMessages, addCommunityMessage, deleteCommunityMessage,
    notifications, sendNotification, markNotificationAsRead, getUnreadNotifications,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
