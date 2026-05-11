'use client';
import { createContext, useContext, useReducer, ReactNode } from 'react';

interface AnalysisState {
  currentAnalysis: any | null;
  results: any | null;
  isAnalyzing: boolean;
  error: string | null;
}

type AnalysisAction = 
  | { type: 'START_ANALYSIS' }
  | { type: 'SET_RESULTS'; payload: any }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' };

const initialState: AnalysisState = {
  currentAnalysis: null,
  results: null,
  isAnalyzing: false,
  error: null,
};

const analysisReducer = (state: AnalysisState, action: AnalysisAction): AnalysisState => {
  switch (action.type) {
    case 'START_ANALYSIS':
      return { ...state, isAnalyzing: true, error: null };
    case 'SET_RESULTS':
      return { ...state, isAnalyzing: false, results: action.payload };
    case 'SET_ERROR':
      return { ...state, isAnalyzing: false, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const AnalysisContext = createContext<{
  state: AnalysisState;
  dispatch: React.Dispatch<AnalysisAction>;
} | undefined>(undefined);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(analysisReducer, initialState);
  return (
    <AnalysisContext.Provider value={{ state, dispatch }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysisStore = () => {
  const context = useContext(AnalysisContext);
  if (!context) throw new Error('useAnalysisStore must be used within an AnalysisProvider');
  return context;
};
