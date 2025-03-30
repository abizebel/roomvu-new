'use client';

import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick?.(product)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-xl font-bold text-blue-600 mt-2">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">★</span>
          <span className="text-gray-600 ml-1">{product.rating.rate}</span>
          <span className="text-gray-500 text-sm ml-2">
            ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </div>
  );
}; 