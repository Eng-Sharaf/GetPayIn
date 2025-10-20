import { apiClient } from './client';
import { ProductsResponse, CategoriesResponse } from '../types/api';

export const productsApi = {
  getAllProducts: async (): Promise<ProductsResponse> => {
    const { data } = await apiClient.get<ProductsResponse>('/products');
    return data;
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await apiClient.get<CategoriesResponse>('/products/categories');
    return data;
  },

  getProductsByCategory: async (category: string): Promise<ProductsResponse> => {
    const { data } = await apiClient.get<ProductsResponse>(`/products/category/${category}`);
    return data;
  },

  deleteProduct: async (id: number): Promise<{ isDeleted: boolean; id: number }> => {
    const { data } = await apiClient.delete<{ isDeleted: boolean; id: number }>(`/products/${id}`);
    return data;
  },
};
