"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../components/ui/logo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Image from "next/image";
import {
  FaBars,
  FaTimes,
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

  const handleCategoryClick = (category: string) => {
    router.push(`/${category.toLowerCase()}`);
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      {/* Navbar Container */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Logo size={100} />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <FaUser
            className="text-white cursor-pointer hover:text-yellow-300 transition"
            onClick={handleProfileClick}
            aria-label="Go to profile"
          />
          <div className="flex items-center text-white">
            <FaShoppingCart />
            <span className="ml-1">($0.00)</span>
          </div>
          <button className="bg-yellow-500 px-4 py-2 text-white rounded-lg hover:bg-yellow-600 transition">
            CHECKOUT
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
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
            { src: frutas, label: "Frutas", category: "fruits" },
            { src: suplementos, label: "Suplementos", category: "supplements" },
            { src: higiene, label: "Higiene", category: "hygiene" },
            { src: pets, label: "Pets", category: "pets" },
            { src: bebes, label: "Bebês", category: "baby" },
          ].map(({ src, label, category }, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer flex flex-col items-center text-center text-white"
            >
              <Image src={src} alt={label} width={36} height={36} />
              <span className="text-sm mt-2">{label}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col items-center mt-4 space-y-2 text-white">
          <FaUser
            onClick={handleProfileClick}
            aria-label="Go to profile"
            size={20}
            className="cursor-pointer"
          />
          <div className="flex items-center">
            <FaShoppingCart size={20} />
            <span className="ml-1">($0.00)</span>
          </div>
          <button className="bg-yellow-500 px-4 py-2 text-white rounded-lg hover:bg-yellow-600 transition">
            CHECKOUT
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
