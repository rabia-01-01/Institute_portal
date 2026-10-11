import { createContext, useContext, useState, ReactNode } from 'react';
import { useData, User } from './DataContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: RegisterData) => { success: boolean; error?: string };
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'faculty' | 'admin';
  phone?: string;
  studentId?: string;
  designation?: string;
  specialization?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('institute_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const { users, addUser } = useData();

  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (!foundUser) return { success: false, error: 'Invalid email or password' };
    if (!foundUser.approved) return { success: false, error: 'Your account is pending admin approval' };
    setUser(foundUser);
    localStorage.setItem('institute_current_user', JSON.stringify(foundUser));
    return { success: true };
  };

  const register = (data: RegisterData) => {
    if (users.some(u => u.email === data.email)) {
      return { success: false, error: 'Email already registered' };
    }
    addUser(data);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('institute_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
