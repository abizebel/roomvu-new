'use client';

import { useCart } from '@/context/CartContext';
import { CartItem } from './CartItem';
import Link from 'next/link';

export function Cart() {
  const { state, dispatch } = useCart();

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <span className="text-gray-600">
          {state.items.reduce((total, item) => total + item.quantity, 0)} items
        </span>
      </div>
      
      <div className="space-y-4 mb-8">
        {state.items.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-blue-600">
            ${state.total.toFixed(2)}
          </span>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Cart
          </button>
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