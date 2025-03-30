'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

interface CartItemProps {
  product: Product & { quantity: number };
}

export function CartItem({ product }: CartItemProps) {
  const { dispatch } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity: newQuantity },
    });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
          sizes="96px"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
        <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleQuantityChange(product.quantity - 1)}
            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            -
          </button>
          <span className="w-8 text-center">{product.quantity}</span>
          <button
            onClick={() => handleQuantityChange(product.quantity + 1)}
            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            +
          </button>
          <button
            onClick={handleRemove}
            className="ml-4 text-red-600 hover:text-red-800 transition-colors"
          >
            Remove
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Subtotal: ${(product.price * product.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
} 