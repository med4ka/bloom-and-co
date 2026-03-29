"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ShoppingBag, Menu, ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { products } from "./data/products";

export default function Home() {
  const { items, addItem, toggleCart } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);

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

  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col font-lora">
      
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`w-full px-8 md:px-16 grid grid-cols-3 items-center fixed top-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-4 md:py-6 bg-cream/80 backdrop-blur-md shadow-sm" : "py-8 md:py-10 bg-transparent"
        }`}
      >
        <div>
          <button className="md:hidden text-charcoal hover:text-sage transition-colors">
            <Menu className="w-8 h-8" />
          </button>
          <div className="hidden md:flex gap-10 text-base tracking-widest uppercase font-semibold text-charcoal/80">
            <Link href="/collection" className="hover:text-sage transition-colors">Shop</Link>
            <Link href="/collection" className="hover:text-sage transition-colors">Collections</Link>
            <button onClick={() => setShowStoryModal(true)} className="hover:text-sage transition-colors uppercase">Our Story</button>
          </div>
        </div>

        <div className="text-center">
          <h1 className="font-cormorant text-3xl md:text-5xl font-bold tracking-widest text-charcoal">
            BLOOM & CO.
          </h1>
        </div>

        <div className="flex justify-end">
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

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 md:pt-0 md:pb-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sand/50 rounded-full blur-3xl -z-10"></div>

        <div className="text-center max-w-4xl z-10 flex flex-col items-center">
          <motion.span 
            variants={fadeUp} initial="hidden" animate="visible"
            className="text-sage text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6 block"
          >
            Bespoke Floral Creations
          </motion.span>
          
          <motion.h2 
            variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
            className="font-cormorant text-6xl md:text-8xl text-charcoal leading-[1.1] mb-8"
          >
            Speak language <br className="hidden md:block"/> of the <i className="text-dustyRose font-light">flowers.</i>
          </motion.h2>
          
          <motion.p 
            variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}
            className="text-charcoal/70 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed"
          >
            Handcrafted bouquets for your most precious moments. Delivered with care, designed with passion.
          </motion.p>
          
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
            <button 
              onClick={scrollToCollection}
              className="group flex items-center gap-4 bg-charcoal text-white px-8 py-4 rounded-full hover:bg-sage transition-all duration-500 text-sm tracking-widest uppercase shadow-lg active:scale-95"
            >
              Explore Collection 
              <span className="bg-white/20 p-2 rounded-full group-hover:translate-x-2 transition-transform duration-300">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      <section id="collection" className="w-full px-6 md:px-16 py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <h3 className="font-cormorant text-4xl md:text-5xl text-charcoal mb-4 font-semibold">Our Signature</h3>
              <p className="text-charcoal/60 text-lg max-w-md font-light">
                Curated selections of our most beloved arrangements, crafted for eternal elegance.
              </p>
            </div>
            <Link href="/collection" className="text-sm tracking-widest uppercase font-medium text-charcoal hover:text-dustyRose transition-colors flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16"
          >
            {products.slice(0, 3).map((product) => (
              <motion.div key={product.id} variants={fadeUp} className="group cursor-pointer">
                
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
          </motion.div>
        </div>
      </section>

      <section className="w-full px-6 md:px-16 py-24 md:py-32 bg-sand/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex-1 w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1558350315-8aa00e8e4590?auto=format&fit=crop&q=100&w=1000" 
              alt="Florist arranging flowers" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex-1"
          >
            <span className="text-sage text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6 block">
              The Art of Gifting
            </span>
            <h3 className="font-cormorant text-4xl md:text-6xl text-charcoal mb-8 leading-tight font-semibold">
              Sourced globally, <br /> crafted locally.
            </h3>
            <p className="text-charcoal/70 text-lg font-light leading-relaxed mb-10 max-w-lg">
              Every arrangement tells a story. We partner with sustainable farms across the globe to bring you the freshest, most vibrant blooms. Our artisans carefully select and hand-tie each bouquet to ensure your sentiments are perfectly expressed.
            </p>
            <button 
              onClick={() => setShowStoryModal(true)}
              className="border-b border-charcoal pb-1 text-sm tracking-widest uppercase font-medium text-charcoal hover:text-dustyRose hover:border-dustyRose transition-colors"
            >
              Read Our Story
            </button>
          </motion.div>
        </div>
      </section>

      <footer className="w-full px-6 md:px-16 py-16 bg-charcoal text-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <h2 className="font-cormorant text-3xl font-bold tracking-widest mb-6">BLOOM & CO.</h2>
            <p className="text-cream/60 font-light max-w-sm leading-relaxed">
              Curating beauty through nature's finest elements. Elevate your everyday with our bespoke floral designs.
            </p>
          </div>
          <div>
            <h4 className="text-sm tracking-widest uppercase font-bold mb-6 text-sage">Shop</h4>
            <ul className="space-y-4 text-cream/70 font-light">
              <li><Link href="/collection" className="hover:text-white transition-colors">All Arrangements</Link></li>
              <li><Link href="/collection" className="hover:text-white transition-colors">Signature Collection</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Subscriptions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm tracking-widest uppercase font-bold mb-6 text-sage">Support</h4>
            <ul className="space-y-4 text-cream/70 font-light">
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/40 font-light">
          <p>&copy; {new Date().getFullYear()} Bloom & Co. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Pinterest</Link>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showStoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            onClick={() => setShowStoryModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream rounded-[40px] p-10 md:p-16 max-w-3xl w-full shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setShowStoryModal(false)}
                className="absolute top-8 right-8 p-3 hover:bg-sand rounded-full transition-colors text-charcoal/50 hover:text-charcoal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sage via-dustyRose to-sand"></div>

              <span className="text-sage text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Our Heritage</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-charcoal mb-8">The Bloom & Co. Journey</h2>
              
              <div className="space-y-6 text-charcoal/70 font-light leading-relaxed text-lg">
                <p>
                  Founded on the belief that emotions are best expressed through nature's artistry, Bloom & Co. started as a small atelier dedicated to the craft of floristry.
                </p>
                <p>
                  We don't just arrange flowers; we curate experiences. Our artisans travel globally to build relationships with sustainable farms, ensuring that every stem we use meets our exacting standards for beauty and longevity.
                </p>
                <p>
                  Whether it is a whisper of ivory or a bold statement of velvet dawn, our bespoke creations are designed to transform your most precious moments into eternal memories.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-charcoal/10 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-sand flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="Founder" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
                <div>
                  <p className="font-cormorant text-2xl font-bold italic text-charcoal">"Beauty in every petal."</p>
                  <span className="text-xs tracking-widest uppercase font-bold text-charcoal/40 block mt-1">— The Artisan Team</span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}