import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import CartDrawer from "./components/CartDrawer";

const cormorantGaramond = Cormorant_Garamond({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bloom & Co. | Floral Elegance",
  description: "Bespoke floral arrangements for your special moments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lora.className} bg-cream text-charcoal antialiased selection:bg-sage selection:text-white`}>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#FDFBF7',
              color: '#2F302D',
              border: '1px solid rgba(47, 48, 45, 0.1)',
              padding: '16px 24px',
              borderRadius: '100px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              fontSize: '14px',
              letterSpacing: '0.05em',
            },
          }}
        />
        <CartDrawer />
        {children}
      </body>
    </html>
  );
}