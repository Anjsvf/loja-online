"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../components/ui/logo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Image from "next/image";

import {
  FaArrowLeft,
  FaArrowRight,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

import perecivel from "./images/pereciveis.png";
import alimentos from "./images/alimentos.png";
import limpeza from "./images/limpeza.png";
import bebidas from "./images/bebidas.png";
import frutas from "./images/frutas.png";
import higiene from "./images/higiene.png";
import pets from "./images/pet.png";
import bebes from "./images/bebe.png";
import suplementos from "./images/suplementos.png";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Handlers
  const handleCategoryClick = (category: string) => {
    router.push(`/${category.toLowerCase()}`);
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <nav className="bg-[#ece9e9] shadow p-4">
      {/* Navbar Container */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Logo size={100} />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <FaUser
            className="text-gray-600 cursor-pointer hover:text-blue-500"
            onClick={handleProfileClick}
          />
          <div className="flex items-center text-gray-600">
            <FaShoppingCart />
            <span className="ml-1">($0.00)</span>
          </div>
          <button className="bg-green-500 px-4 py-2 text-white rounded-lg">
            CHECKOUT
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Category Carousel */}
      <div className="relative mt-4">
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 8 },
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          className="category-carousel"
        >
          {[
            { src: perecivel, label: "Perecíveis", category: "perishable" },
            { src: alimentos, label: "Alimentos", category: "food" },
            { src: limpeza, label: "Limpeza", category: "cleaning" },
            { src: bebidas, label: "Bebidas", category: "beverages" },
            { src: frutas, label: "Frutas", category: "fruts" },
            { src: suplementos, label: "Suplementos", category: "supplements" },
            { src: higiene, label: "Higiene", category: "hygiene" },
            { src: pets, label: "Pets", category: "pets" },
            { src: bebes, label: "Bebês", category: "baby" },
          ].map(({ src, label, category }, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer flex flex-col items-center text-center"
            >
              <Image src={src} alt={label} width={48} height={48} />
              <span>{label}</span>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full cursor-pointer">
          <FaArrowLeft className="text-gray-600" />
        </div>
        <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full cursor-pointer">
          <FaArrowRight className="text-gray-600" />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col items-center mt-4 space-y-2 text-gray-600">
          <FaUser onClick={handleProfileClick} />
          <div className="flex items-center">
            <FaShoppingCart />
            <span className="ml-1">($0.00)</span>
          </div>
          <button className="bg-green-500 px-4 py-2 text-white rounded-lg">
            CHECKOUT
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
