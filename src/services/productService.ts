import { Product, ProductsResponse } from '@/types/product';

const BASE_URL = 'https://fakestoreapi.com';

export const productService = {
  async getProducts(limit: number = 10, skip: number = 0): Promise<ProductsResponse> {
    const response = await fetch(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return {
      products: data,
      total: 100, // Fake Store API has 100 total products
      skip,
      limit,
    };
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },
}; 