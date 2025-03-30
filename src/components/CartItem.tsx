"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { useState } from "react";

interface CartItemProps {
  product: Product & { quantity: number };
}

export function CartItem({ product }: CartItemProps) {
  const { dispatch, error } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    try {
      await dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: product.id, quantity: newQuantity },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm relative">
      {isUpdating && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}

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
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleQuantityChange(product.quantity - 1)}
            disabled={isUpdating || product.quantity <= 1}
            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="w-8 text-center">{product.quantity}</span>
          <button
            onClick={() => handleQuantityChange(product.quantity + 1)}
            disabled={isUpdating}
            className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="ml-4 text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Remove
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Subtotal: ${(product.price * product.quantity).toFixed(2)}
        </p>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
}
