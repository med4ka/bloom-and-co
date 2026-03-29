"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ShoppingBag, ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { products } from "../data/products";

export default function Collection() {
  const router = useRouter();
  const { items, addItem, toggleCart } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const playTing = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <main className="min-h-screen bg-cream font-lora text-charcoal flex flex-col pt-32 px-6 md:px-16">
      
      {/* NAVBAR FLEXBOX (ANTI NUMPUK) */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`w-full px-8 md:px-16 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-4 md:py-6 bg-cream/95 backdrop-blur-md shadow-sm" : "py-8 md:py-10 bg-cream/80 backdrop-blur-sm"
        }`}
      >
        {/* KIRI: flex-1 biar makan ruang rata */}
        <div className="flex-1 flex justify-start">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-charcoal/80 hover:text-sage transition-colors uppercase tracking-widest text-sm font-semibold"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
        </div>

        {/* TENGAH: flex-1 dan text-center */}
        <div className="flex-1 flex justify-center text-center">
          <Link href="/">
            <h1 className="font-cormorant text-3xl md:text-5xl font-bold tracking-widest text-charcoal whitespace-nowrap">
              BLOOM & CO.
            </h1>
          </Link>
        </div>

        {/* KANAN: flex-1 biar seimbang sama kiri */}
        <div className="flex-1 flex justify-end">
          <button 
            onClick={toggleCart} 
            className="relative group text-charcoal hover:text-sage transition-colors"
          >
            <ShoppingBag className="w-6 h-6 md:w-8 md:h-8" />
            <span className="absolute -top-2 -right-2 bg-dustyRose text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
              {totalItems}
            </span>
          </button>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto w-full mb-16 mt-8">
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-sage text-sm font-bold tracking-[0.3em] uppercase mb-4 block"
        >
          The Archives
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-cormorant text-5xl md:text-7xl font-bold mb-6"
        >
          Full Collection
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-charcoal/60 text-lg font-light max-w-xl"
        >
          Explore our complete range of bespoke floral arrangements, crafted for every emotion and occasion.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16 pb-32">
        {products.map((product, index) => (
          <motion.div 
            key={product.id} 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-sand block">
                <span className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-charcoal shadow-sm">
                  {product.tag}
                </span>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    playTing();
                    addItem(product);
                    toast(`${product.name} added to your bag`, { icon: null });
                  }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-white text-charcoal px-6 py-3 rounded-full flex items-center gap-2 text-sm font-bold tracking-widest uppercase shadow-xl hover:bg-charcoal hover:text-white"
                >
                  <Plus className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </Link>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-cormorant text-2xl text-charcoal mb-1 font-semibold">{product.name}</h4>
                <p className="text-charcoal/50 text-sm tracking-widest uppercase font-medium">Fresh Cut</p>
              </div>
              <span className="text-xl text-charcoal font-light">{product.price}</span>
            </div>
          </motion.div>
        ))}
      </div>

    </main>
  );
}