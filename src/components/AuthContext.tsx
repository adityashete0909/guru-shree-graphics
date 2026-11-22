'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '@/types';
import { DataStore } from '@/lib/store';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password?: string) => { success: boolean; message: string; user?: User };
  adminLogin: (password: string) => { success: boolean; message: string; user?: User };
  register: (data: Omit<User, 'id' | 'role' | 'createdAt'>) => { success: boolean; message: string };
  logout: () => void;
  isAdmin: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => ({ success: false, message: '' }),
  adminLogin: () => ({ success: false, message: '' }),
  register: () => ({ success: false, message: '' }),
  logout: () => {},
  isAdmin: false,
  isCustomer: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = DataStore.getCurrentUser();
    if (current) {
      setUser(current);
    }
    setLoading(false);
  }, []);

  const login = (identifier: string, password?: string) => {
    const found = DataStore.findUser(identifier);
    if (!found) {
      return { success: false, message: 'User not found with this mobile or email.' };
    }
    if (found.role === 'admin') {
      return {
        success: false,
        message: 'Owner accounts must log in via the dedicated /admin/login portal.',
      };
    }
    if (found.password && password && found.password !== password) {
      return { success: false, message: 'Incorrect password.' };
    }

    setUser(found);
    DataStore.setCurrentUser(found);
    return { success: true, message: 'Login successful!', user: found };
  };

  const adminLogin = (password: string) => {
    const adminUser = DataStore.getUsers().find((u) => u.role === 'admin');
    if (!adminUser) {
      return { success: false, message: 'No admin account configured.' };
    }
    // Accept "admin" or matching password
    if (password === 'admin' || password === adminUser.password) {
      setUser(adminUser);
      DataStore.setCurrentUser(adminUser);
      return { success: true, message: 'Welcome to Guru Shree Graphics Admin Portal!', user: adminUser };
    }
    return { success: false, message: 'Invalid owner access password.' };
  };

  const register = (data: Omit<User, 'id' | 'role' | 'createdAt'>) => {
    const newUser: User = {
      ...data,
      id: `cust-${Date.now()}`,
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const res = DataStore.registerUser(newUser);
    if (res.success && res.user) {
      setUser(res.user);
      DataStore.setCurrentUser(res.user);
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    DataStore.setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        adminLogin,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        isCustomer: user?.role === 'customer',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
