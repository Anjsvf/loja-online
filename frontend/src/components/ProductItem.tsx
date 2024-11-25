"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    discount: number;
    imageUrl: string;
  };
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const [loading, setLoading] = useState(true);

  // Cálculo do preço com desconto
  const discountedPrice = product.price * (1 - product.discount / 100);

  // Construção da URL da imagem sem barras extras
  const imageUrl = `https://loja-online-back.onrender.com${product.imageUrl.startsWith('/') ? '' : '/'}${product.imageUrl}`;

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between h-full">
      {/* Spinner de carregamento */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-white">
          <FaSpinner className="animate-spin text-gray-500 text-2xl" />
        </div>
      )}

      {/* Imagem do produto */}
      <div className={`w-full h-48 relative ${loading ? "opacity-0" : "opacity-100"}`}>
        <Image
          src={imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="contain"
          className="rounded-md transition-opacity duration-300"
          unoptimized
          onLoadingComplete={() => setLoading(false)}
        />
      </div>

      {/* Desconto */}
      {product.discount > 0 && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow">
          {product.discount}% OFF
        </div>
      )}

      {/* Nome e preços */}
      <div className="mt-4 flex-grow">
        <div className="text-gray-800 text-sm font-semibold truncate">{product.name}</div>
        <div className="flex items-center space-x-2 mt-2">
          <span
            className={`text-gray-500 ${product.discount > 0 ? "line-through" : ""}`}
          >
            R$ {product.price.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-green-600 font-bold">
              R$ {discountedPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Botão de adicionar ao carrinho */}
      <button
        className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-400 mt-4"
        aria-label="Add to cart"
      >
        +
      </button>
    </div>
  );
};

export default ProductItem;
