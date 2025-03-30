'use client';

import { useCart } from '@/context/CartContext';
import { CartItem } from './CartItem';
import Link from 'next/link';
import { useEffect } from 'react';

export function Cart() {
  const { state, dispatch, isLoading, error, setError } = useCart();

  useEffect(() => {
    // Clear any errors when component unmounts
    return () => setError(null);
  }, [setError]);

  if (isLoading && state.items.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to your cart!</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {state.items.reduce((total, item) => total + item.quantity, 0)} items
          </span>
          <button
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div className="space-y-4 mb-8">
        {state.items.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-sm text-gray-500">
              {state.items.length} {state.items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <span className="text-2xl font-bold text-blue-600">
            ${state.total.toFixed(2)}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center"
          >
            Continue Shopping
          </Link>
          <button
            className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => alert('Checkout functionality coming soon!')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 