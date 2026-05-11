import { api } from './api';

export const analysisService = {
  getAnalysisResults: async (id: string) => {
    return api.get(`/analysis/results/${id}`);
  },
  
  getSeverityMetrics: async (id: string) => {
    return api.get(`/analysis/severity/${id}`);
  },
  
  generateReport: async (id: string) => {
    return api.post(`/analysis/report/${id}`, {});
  }
};
