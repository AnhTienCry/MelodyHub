import apiClient from './api';

interface ApiResponse<T = unknown> {
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
export const createItem = async (data: Record<string, unknown>): Promise<ApiResponse> => {
  const response = await apiClient.post('/api/items', data);
  return response.data;
};

// Admin track management (requires Authorization header via apiClient)
export const createAdminTrack = async (payload: FormData | Record<string, unknown>) => {
  const resp = await apiClient.post('/api/admin/tracks', payload);
  return resp.data;
};

export const updateAdminTrack = async (id: string, payload: FormData | Record<string, unknown>) => {
  const resp = await apiClient.put(`/api/admin/tracks/${id}`, payload);
  return resp.data;
};

export const deleteAdminTrack = async (id: string) => {
  const resp = await apiClient.delete(`/api/admin/tracks/${id}`);
  return resp.data;
};

// Add more API calls as needed

/**
 * Homepage Services - Specialized API services for homepage data
 */
export { categoryService } from './categoryService'
export { releaseService } from './releaseService'
export { recommendationService } from './recommendationService'

// Type exports for homepage services
export type {
  Category,
  NewRelease,
  SpotifyTrack,
  ArtistItem,
  Song
} from './types'
