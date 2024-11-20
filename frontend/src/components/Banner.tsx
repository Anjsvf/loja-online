"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Slide {
  id: number;
  message: string;
  color: string;
  imageUrl: string;
}

const Banner: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Busca de slides na API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get("https://loja-online-back.onrender.com/slides");
        setSlides(response.data);
      } catch (error) {
        console.error("Erro ao buscar os slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Controle automático dos slides
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [slides]);

  // Exibição durante o carregamento
  if (loading) {
    return <div className="text-center py-8 text-gray-600">Carregando...</div>;
  }

  // Caso não haja slides disponíveis
  if (slides.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum slide disponível no momento.
      </div>
    );
  }

  const { imageUrl, message } = slides[currentSlide];

  return (
    <div
      className="relative text-white text-center h-64 md:h-96 flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "contain", // Ajusta para conter toda a imagem no fundo
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-50 p-4 rounded-lg">
        <h2 className="text-2xl font-bold">Anúncios</h2>
        <p className="mt-4 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default Banner;
