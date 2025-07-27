import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading?: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};




// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { User } from '../types';

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate checking for existing session
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     const mockUser: User = {
//       id: '1',
//       name: 'John Doe',
//       email,
//       avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
//       role: 'student',
//       joinedAt: new Date().toISOString(),
//     };
    
//     setUser(mockUser);
//     localStorage.setItem('user', JSON.stringify(mockUser));
//     setIsLoading(false);
//   };

//   const register = async (name: string, email: string, password: string) => {
//     setIsLoading(true);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     const mockUser: User = {
//       id: '1',
//       name,
//       email,
//       avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
//       role: 'student',
//       joinedAt: new Date().toISOString(),
//     };
    
//     setUser(mockUser);
//     localStorage.setItem('user', JSON.stringify(mockUser));
//     setIsLoading(false);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };