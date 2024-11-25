


"use client";

import { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem";
import { FaSpinner } from "react-icons/fa"; 

type FoodItem = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  type: string;
  price: number;
  discount: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export default function BeveragesPage() {
  const [beveragesItems, setBeveragesItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeragesItems = async () => {
      try {
        const response = await fetch("https://loja-online-back.onrender.com/api/products/");
        if (!response.ok) {
          console.error("Erro ao buscar os itens de Bebidas");
          return;
        }

        const data = await response.json();
        console.log("Dados retornados pela API:", data);

      
        const items = Array.isArray(data) ? data : data.products || [];
        if (Array.isArray(items)) {
          const filteredItems = items.filter(item => item.category === "Bebidas");
          setBeveragesItems(filteredItems);
        } else {
          console.error("Formato de dados inválido recebido da API.");
        }
      } catch (error) {
        console.error("Erro de rede:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeragesItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-opacity-70 bg-gray-100">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-blue-600 text-5xl mb-4" />
          <p className="text-gray-700 font-medium text-lg">Carregando os produtos...</p>
        </div>
      </div>
    );
  }

  const renderItemsByName = (name: string) => {
    return beveragesItems.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
  };

  return (
    <div className="food-page max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Limpeza</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Refrigerantes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {renderItemsByName("Refrigerante").map(item => (
            <ProductItem key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4"> Bebidas alcolicas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {renderItemsByName("Vodka").map(item => (
            <ProductItem key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Energeticos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {renderItemsByName("Energetico").map(item => (
            <ProductItem key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
