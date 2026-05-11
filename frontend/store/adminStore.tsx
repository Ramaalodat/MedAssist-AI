'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AdminState {
  stats: any | null;
  systemHealth: any | null;
  recentActivity: any[];
  isLoading: boolean;
}

type AdminAction = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_STATS_SUCCESS'; payload: any }
  | { type: 'FETCH_HEALTH_SUCCESS'; payload: any }
  | { type: 'FETCH_ACTIVITY_SUCCESS'; payload: any[] }
  | { type: 'FETCH_FAIL' };

const initialState: AdminState = {
  stats: null,
  systemHealth: null,
  recentActivity: [],
  isLoading: false,
};

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true };
    case 'FETCH_STATS_SUCCESS':
      return { ...state, isLoading: false, stats: action.payload };
    case 'FETCH_HEALTH_SUCCESS':
      return { ...state, isLoading: false, systemHealth: action.payload };
    case 'FETCH_ACTIVITY_SUCCESS':
      return { ...state, isLoading: false, recentActivity: action.payload };
    case 'FETCH_FAIL':
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const AdminContext = createContext<{
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
} | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminStore = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdminStore must be used within an AdminProvider');
  return context;
};
