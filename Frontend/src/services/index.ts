import apiClient from './api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export const healthCheck = async (): Promise<ApiResponse> => {
  const response = await apiClient.get('/');
  return response.data;
};

// Example: Get all items
export const getItems = async (): Promise<ApiResponse> => {
  const response = await apiClient.get('/api/items');
  return response.data;
};

// Example: Create item
export const createItem = async (data: any): Promise<ApiResponse> => {
  const response = await apiClient.post('/api/items', data);
  return response.data;
};

// Add more API calls as needed
