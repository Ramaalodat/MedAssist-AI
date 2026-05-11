'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: any }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, isAuthenticated: true, user: action.payload };
    case 'LOGIN_FAIL':
      return { ...state, isLoading: false, isAuthenticated: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthStore must be used within an AuthProvider');
  return context;
};
