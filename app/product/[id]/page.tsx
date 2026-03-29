"use client";
import { use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Plus } from "lucide-react";
import { useRouter } from "next/navigation"; 
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { products } from "../../data/products";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter(); 
  const unwrappedParams = use(params);
  const product = products.find((p) => p.id === parseInt(unwrappedParams.id));
  
  const { items, addItem, toggleCart } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const playTing = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    audio.volume = 0.3; 
    audio.play().catch(() => {});
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream font-lora text-charcoal">
        <h1 className="font-cormorant text-4xl">Product not found.</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cream text-charcoal font-lora flex flex-col md:flex-row relative">
      
      <div className="absolute top-10 left-10 z-50">
        <button 
          onClick={() => router.back()} 
          className="p-4 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-lg group active:scale-95"
        >
          <ArrowLeft className="w-8 h-8 text-charcoal group-hover:text-sage transition-colors" />
        </button>
      </div>

      <div className="absolute top-10 right-10 z-50">
        <button 
          onClick={toggleCart}
          className="relative p-4 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-lg group active:scale-95"
        >
          <ShoppingBag className="w-7 h-7 text-charcoal group-hover:text-sage transition-colors" />
          <span className="absolute -top-1 -right-1 bg-dustyRose text-white text-[11px] w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-md">
            {totalItems}
          </span>
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-1/2 h-[70vh] md:h-screen relative"
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover brightness-[1.05]" 
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-20 bg-cream"
      >
        <div className="max-w-md w-full">
          <span className="inline-block px-3 py-1 bg-sand text-xs font-bold tracking-widest uppercase text-charcoal rounded-full mb-6">
            {product.tag}
          </span>
          <h1 className="font-cormorant text-5xl md:text-7xl font-bold mb-4 leading-tight">{product.name}</h1>
          <p className="text-3xl font-light text-charcoal/80 mb-8">{product.price}</p>
          
          <div className="w-full h-[1px] bg-charcoal/10 mb-8"></div>
          
          <p className="text-lg text-charcoal/70 font-light leading-relaxed mb-10">
            {product.description}
          </p>

          <button 
            onClick={() => {
              playTing();
              addItem(product);
              toast.success(`${product.name} added to your bag`, { icon: '' });
            }}
            className="w-full bg-charcoal text-white py-5 rounded-full flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase hover:bg-sage transition-all duration-300 shadow-lg active:scale-95"
          >
            <Plus className="w-5 h-5" /> Add to Cart
          </button>

          <div className="mt-12 space-y-6 text-sm font-light text-charcoal/60">
            <div className="flex justify-between border-b border-charcoal/10 pb-4">
              <span className="tracking-widest uppercase font-medium text-charcoal">Delivery</span>
              <span>Next day available</span>
            </div>
            <div className="flex justify-between border-b border-charcoal/10 pb-4">
              <span className="tracking-widest uppercase font-medium text-charcoal">Includes</span>
              <span>Vase & Care Guide</span>
            </div>
          </div>
        </div>
      </motion.div>

    </main>
  );
}