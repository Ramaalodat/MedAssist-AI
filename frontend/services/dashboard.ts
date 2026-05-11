import { api } from './api';

export const dashboardService = {
  getSummary: async () => {
    return api.get('/dashboard/summary');
  },
  getRecentAnalyses: async () => {
    return api.get('/dashboard/recent');
  }
};

export const historyService = {
  getHistory: async (filters: any) => {
    const query = new URLSearchParams(filters).toString();
    return api.get(`/history?${query}`);
  },
  getPatientHistory: async (patientId: string) => {
    return api.get(`/history/patient/${patientId}`);
  }
};
