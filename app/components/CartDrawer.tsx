"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, clearCart } = useCartStore();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return acc + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    toggleCart();
    clearCart();
    setShowSuccessModal(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-cream/95 backdrop-blur-xl shadow-2xl z-[101] flex flex-col font-lora text-charcoal"
            >
              <div className="p-8 flex items-center justify-between border-b border-charcoal/5">
                <h2 className="font-cormorant text-3xl font-bold tracking-widest">Your Bag</h2>
                <button onClick={toggleCart} className="p-2 hover:bg-charcoal/5 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-charcoal/40 gap-4">
                    <ShoppingBag className="w-12 h-12" />
                    <p className="tracking-widest uppercase text-sm font-medium">Your bag is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-6">
                      <div className="w-24 h-32 bg-sand rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-cormorant text-xl font-bold">{item.name}</h4>
                          <p className="text-charcoal/50 text-sm">{item.price} × {item.quantity}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-dustyRose hover:text-red-700 flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-8 bg-white/50 border-t border-charcoal/5 space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-sm tracking-widest uppercase font-medium text-charcoal/60">Subtotal</span>
                    <span className="text-3xl font-light">${subtotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-charcoal text-white py-5 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-sage transition-colors shadow-lg active:scale-95"
                  >
                    Checkout Now
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-cream p-10 md:p-16 rounded-[40px] max-w-lg w-full text-center shadow-2xl border border-white/20 font-lora"
            >
              <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-8 text-sage">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-charcoal mb-4">Thank You.</h2>
              <p className="text-charcoal/70 text-lg font-light leading-relaxed mb-10">
                Your bespoke order has been received. Our artisans will begin preparing your blooms shortly.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-charcoal text-white px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-sage transition-all shadow-lg active:scale-95"
              >
                Continue Shopping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}