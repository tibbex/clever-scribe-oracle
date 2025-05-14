
import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("aura_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // For demo purposes, we're simulating authentication
    // In a real app, you would connect to a backend service
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple validation
    if (email.trim() === "" || password.trim() === "") {
      throw new Error("Please enter both email and password");
    }
    
    // Check if user exists in localStorage (for demo purposes)
    const users = JSON.parse(localStorage.getItem("aura_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email);
    
    if (!foundUser || foundUser.password !== password) {
      throw new Error("Invalid email or password");
    }
    
    // Remove password before storing in context
    const { password: _, ...userWithoutPassword } = foundUser;
    
    setUser(userWithoutPassword);
    localStorage.setItem("aura_user", JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple validation
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      throw new Error("Please fill out all fields");
    }
    
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("aura_users") || "[]");
    if (users.some((u: any) => u.email === email)) {
      throw new Error("Email already in use");
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };
    
    users.push(newUser);
    localStorage.setItem("aura_users", JSON.stringify(users));
    
    // Remove password before storing in context
    const { password: _, ...userWithoutPassword } = newUser;
    
    setUser(userWithoutPassword);
    localStorage.setItem("aura_user", JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aura_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
