'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { productService } from '@/services/productService';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProduct(parseInt(params.id));
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-600 p-4">
        {error || 'Product not found'}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Products
        </button>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative h-[400px] w-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-600">{product.rating.rate}</span>
                <span className="text-gray-500 text-sm">
                  ({product.rating.count} reviews)
                </span>
              </div>
              
              <p className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
              
              <p className="text-gray-600">{product.description}</p>
              
              <div className="mt-4">
                <button
                  onClick={() => {
                    // TODO: Implement add to cart functionality
                    alert('Added to cart!');
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 