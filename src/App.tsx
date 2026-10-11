import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DataSavedIndicator from './components/DataSavedIndicator';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Courses from './pages/Courses';
import Faculty from './pages/Faculty';
import Announcements from './pages/Announcements';
import CalendarPage from './pages/CalendarPage';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

// Dashboards
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <DataSavedIndicator />
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:id" element={<DepartmentDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route path="/student/*" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/faculty-dashboard/*" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <DataProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </DataProvider>
    </HashRouter>
  );
}
