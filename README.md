# 🌸 Bloom & Co. | Premium Floral E-Commerce

A bespoke e-commerce web application designed for a premium floral boutique. This project focuses on delivering a seamless, elegant, and highly interactive user experience with fluid animations and efficient global state management.

## 📖 Overview
Bloom & Co. is a modern frontend showcase that simulates a high-end shopping experience. It features a dynamic product catalog, a fluid shopping cart drawer, and interactive product detail pages. The architecture highlights modern React patterns, prioritizing fast rendering and maintainable state management without prop-drilling.

## 📸 Sneak Peek


![Bloom & Co Home](./bloom1.png)
*Landing page with elegant typography and clean layout.*

![Bloom & Co Catalog](./bloom2.jpg)
*Product catalog showcasing premium floral arrangements.*

## 🚀 Tech Stack
* **Framework:** Next.js (App Router) & React
* **Styling:** Tailwind CSS
* **State Management:** Zustand (for global Cart state)
* **Animation Engine:** Framer Motion
* **Icons:** Lucide React

## ✨ Key Features
* **Global Cart State:** Implemented lightweight and fast state management using Zustand to handle adding, removing, and calculating cart totals across different components without unnecessary re-renders.
* **Fluid UI/UX:** Integrated Framer Motion for smooth page transitions, stagger effects, and an interactive slide-out cart drawer.
* **Dynamic Routing:** Utilized Next.js dynamic routes (`page.tsx` with params) for scalable product detail pages.
* **Responsive Design:** Fully adaptive layout ensuring an elegant experience across mobile, tablet, and desktop viewports.

## 💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/bloom-and-co.git](https://github.com/yourusername/bloom-and-co.git)
   cd bloom-and-co
   npm install
    # or
    yarn install
    npm run dev
    # or
    yarn dev