import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "@/lib/api";

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  login: (email: string, password?: string, otp?: string) => Promise<any>;
  signup: (details: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  setUser: () => {},
  login: async () => {},
  signup: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        setLoading(false);
        return;
    }
    try {
      // Assuming a /profile or /me endpoint to verify token
      const res = await api.get('/auth/me'); // We should add this to the backend
      setUser(res.data.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const login = async (email: string, password?: string, otp?: string) => {
    const res = await api.post('/auth/login', { email, password, otp });
    const { token, data } = res.data;
    localStorage.setItem('token', token);
    setUser(data.user);
    return res.data;
  };

  const signup = async (details: any) => {
    const res = await api.post('/auth/signup', details);
    const { token, data } = res.data;
    localStorage.setItem('token', token);
    setUser(data.user);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, setUser, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
