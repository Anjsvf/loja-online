# Fullstack Supermarket Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)


---

## Introduction

The **Fullstack Supermarket Application** is a modern web platform designed for managing supermarket operations. It features an advanced **Next.js** frontend and a robust **Node.js** backend. The app supports dynamic product management, user authentication, optimized image handling, and a responsive design. The backend integrates **PostgreSQL** and **Prisma**, while the frontend uses **TypeScript** and **Tailwind CSS**, ensuring scalability and maintainability.

---

## Features

- **Dynamic Product Management**: CRUD for categories, subcategories, and products.
- **User Authentication**: Role-based login with JWT.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Image Optimization**: Sharp converts images to WebP for faster loading.
- **Shopping Cart & Checkout**: Intuitive user experience for order processing.
- **Search & Filter**: Easily find products based on categories or keywords.
- **Scalable Backend Architecture**: Prisma ORM with PostgreSQL ensures efficient database interactions.

---

## Tech Stack

### Frontend
- **Next.js**: Server-rendered React applications.
- **React**: Component-based UI library.
- **TypeScript**: Adds type safety for maintainable code.
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.
- **Swiper.js**: Modern library for product carousels.

### Backend
- **Node.js**: Scalable server-side platform.
- **Express**: Backend framework for RESTful APIs.
- **TypeScript**: Ensures robust type checking.
- **Prisma**: ORM for seamless database management.
- **Multer**: File upload handling for images.
- **Sharp**: Converts images to WebP for faster performance.
- **PostgreSQL**: Relational database.

# Database connection
- **DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>**

Authentication
- **JWT_SECRET=your_jwt_secret_key**

Server configuration
- **PORT=5000**

---

## Installation

### Clone the repository
```bash
git clone https://github.com/Anjsvf/loja-online
