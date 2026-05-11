'use client';
import { createContext, useContext, useReducer, ReactNode } from 'react';

interface DashboardState {
  summary: any | null;
  recentActivity: any[];
  isLoading: boolean;
}

const initialState: DashboardState = {
  summary: null,
  recentActivity: [],
  isLoading: false,
};

const dashboardReducer = (state: DashboardState, action: any): DashboardState => {
  switch (action.type) {
    case 'SET_SUMMARY': return { ...state, summary: action.payload };
    case 'SET_ACTIVITY': return { ...state, recentActivity: action.payload };
    case 'SET_LOADING': return { ...state, isLoading: action.payload };
    default: return state;
  }
};

const DashboardContext = createContext<{ state: DashboardState; dispatch: React.Dispatch<any> } | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  return <DashboardContext.Provider value={{ state, dispatch }}>{children}</DashboardContext.Provider>;
};

export const useDashboardStore = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboardStore must be used within a DashboardProvider');
  return context;
};
