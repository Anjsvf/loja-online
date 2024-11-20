"use client";

import React, { useEffect, useState, useCallback } from "react";
import ProductItem from "../components/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { FaSearch } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
  userId: number;
  imageUrl: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = useCallback(async () => {
    const fakeLoadingInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 20, 100));
    }, 500);

    try {
      const response = await fetch("https://loja-online-back.onrender.com/api/products/");
      if (!response.ok) throw new Error("Erro ao buscar produtos.");
      const data = await response.json();
      const shuffledProducts = data.sort(() => Math.random() - 0.5);
      setProducts(shuffledProducts);
      setFilteredProducts(shuffledProducts);
    } catch (error) {
      console.error(error);
    } finally {
      clearInterval(fakeLoadingInterval);
      setLoading(false);
      setProgress(100);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const results = term
      ? products.filter((product) =>
          product.name.toLowerCase().includes(term)
        )
      : products;

    setFilteredProducts(results);
  };

  const groupByCategory = (items: Product[]) =>
    items.reduce((acc: Record<string, Product[]>, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});

  const groupedProducts = groupByCategory(filteredProducts);

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="relative w-full sm:w-64 mb-4">
        <input
          type="text"
          placeholder="O que você está procurando?"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="relative w-3/4 h-6 bg-gray-300 rounded-full overflow-hidden shadow-lg">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-gray-600 font-semibold">{progress}% carregado</span>
        </div>
      ) : (
        <div>
          {/* Grouped Products */}
          {Object.keys(groupedProducts).map((category) => (
            <div key={category}>
              <h2 className="text-lg font-semibold mt-6 mb-4">{category}</h2>
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {groupedProducts[category].map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductItem product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500">
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
