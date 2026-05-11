'use client';
import { createContext, useContext, useReducer, ReactNode } from 'react';

interface UploadState {
  files: File[];
  isUploading: boolean;
  progress: number;
  error: string | null;
}

const initialState: UploadState = {
  files: [],
  isUploading: false,
  progress: 0,
  error: null,
};

const uploadReducer = (state: UploadState, action: any): UploadState => {
  switch (action.type) {
    case 'ADD_FILES': return { ...state, files: [...state.files, ...action.payload] };
    case 'REMOVE_FILE': return { ...state, files: state.files.filter((_, i) => i !== action.payload) };
    case 'SET_PROGRESS': return { ...state, progress: action.payload };
    case 'SET_UPLOADING': return { ...state, isUploading: action.payload };
    case 'RESET': return initialState;
    default: return state;
  }
};

const UploadContext = createContext<{ state: UploadState; dispatch: React.Dispatch<any> } | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(uploadReducer, initialState);
  return <UploadContext.Provider value={{ state, dispatch }}>{children}</UploadContext.Provider>;
};

export const useUploadStore = () => {
  const context = useContext(UploadContext);
  if (!context) throw new Error('useUploadStore must be used within an UploadProvider');
  return context;
};
