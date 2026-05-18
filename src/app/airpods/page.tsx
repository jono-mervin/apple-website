"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import ProductTabs from "@/components/ProductTabs";
import AppleComparison from "@/components/AppleComparison";
import IPhoneCustomizer, { CartItem } from "@/components/iPhoneCustomizer";
import Footer from "@/components/Footer";
import { Headphones, Volume2, Sparkles, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function AirPodsPage() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("apple_cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });
  const [cartOpenTrigger, setCartOpenTrigger] = useState<boolean>(false);

  const handleRemoveFromCart = (cartId: number) => {
    const updated = cart.filter((item) => item.cartId !== cartId);
    setCart(updated);
    localStorage.setItem("apple_cart", JSON.stringify(updated));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("apple_cart");
  };

  const handleAddToCart = (item: CartItem) => {
    const updated = [...cart, { ...item, cartId: Date.now() }];
    setCart(updated);
    localStorage.setItem("apple_cart", JSON.stringify(updated));
    setCartOpenTrigger(true); // Signal Hero to slide open the cart drawer
  };

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-between">
      {/* Background Radial Glow */}
      <div className="absolute top-[20%] left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

      <div>
        {/* Global sticky navigation */}
        <Hero
          navOnly={true}
          cartItems={cart}
          onRemoveCartItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          cartOpenTrigger={cartOpenTrigger}
          onResetCartTrigger={() => setCartOpenTrigger(false)}
        />

        {/* Page Headline */}
        <motion.div
          initial={{ opacity: 0, rotateX: 12, y: 30 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 800 }}
          className="max-w-6xl mx-auto px-6 pt-32 pb-6 text-left select-none"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            AirPods Pro 2. <span className="text-zinc-550">Iconic. Supercharged.</span>
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm mt-4 tracking-wide uppercase font-semibold">
            Supercharged by H2 processing for up to 2x more Active Noise Cancellation
          </p>
        </motion.div>

        {/* Specialized AirPods Features Showcase */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <Volume2 className="w-6 h-6 text-blue-400" />,
              title: "Up to 2x Active Noise Cancellation",
              desc: "Computes wave vectors 48,000 times per second to neutralize incoming ambient noise.",
            },
            {
              icon: <Headphones className="w-6 h-6 text-purple-400" />,
              title: "Spatial Audio",
              desc: "Personalized audio profile syncs with TrueDepth cameras to adapt to your ear geometry.",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-pink-400" />,
              title: "Adaptive Audio",
              desc: "Dynamically blends Transparency mode and ANC to match your current auditory surroundings.",
            },
            {
              icon: <Shield className="w-6 h-6 text-zinc-400" />,
              title: "Engraved Case",
              desc: "Comes with a Speaker loop lanyard and USB-C MagSafe charging case with custom engravings.",
            },
          ].map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.11, duration: 0.7, ease: "easeOut" }}
              className="p-6 bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700 rounded-2xl space-y-4 hover:bg-zinc-900/50 transition-all duration-300"
            >
              <div className="p-3 bg-zinc-950/60 rounded-xl w-fit border border-zinc-800">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-zinc-100 font-display">{feat.title}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Reused Product Tabs (AirPods default) */}
        <div className="py-12 border-t border-zinc-900 bg-zinc-950/20">
          <div className="max-w-6xl mx-auto px-6 mb-4 text-left">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">Acoustic Studio Gallery</h2>
            <p className="text-zinc-500 text-xs mt-1">See AirPods Pro illustrated alongside M4 iPad Pro creative devices.</p>
          </div>
          <ProductTabs defaultTab="airpods" />
        </div>

        {/* Purchase Configurator Suite */}
        <div className="py-12 border-t border-zinc-900 bg-zinc-950/20">
          <IPhoneCustomizer lockedProductType="airpods" onAddToCart={handleAddToCart} />
        </div>

        {/* Compare Sheet */}
        <div className="py-12 border-t border-zinc-900">
          <AppleComparison productType="airpods" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
