import { api } from './api';

export const uploadService = {
  uploadScan: async (file: File, metadata: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getUploadStatus: async (jobId: string) => {
    return api.get(`/upload/status/${jobId}`);
  }
};
