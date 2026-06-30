"use client";

import React from 'react';
import { createContext } from 'react';


export default function AuthProvider({ children }) {
  const AuthContext = createContext(null);
  
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

