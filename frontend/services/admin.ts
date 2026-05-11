import { api } from './api';

export const adminService = {
  getStats: async () => {
    return api.get('/admin/stats');
  },
  
  getSystemHealth: async () => {
    return api.get('/admin/health');
  },
  
  getRecentActivity: async () => {
    return api.get('/admin/activity');
  },
  
  getAIModelStatus: async () => {
    return api.get('/admin/models');
  },
  
  updateConfig: async (config: any) => {
    return api.put('/admin/config', config);
  }
};
