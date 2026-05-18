"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import ProductTabs from "@/components/ProductTabs";
import AppleComparison from "@/components/AppleComparison";
import IPhoneCustomizer, { CartItem } from "@/components/iPhoneCustomizer";
import Footer from "@/components/Footer";
import { Tablet, PenTool, Sparkles, Sliders } from "lucide-react";
import { motion } from "framer-motion";

export default function IpadPage() {
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
      <div className="absolute top-[20%] left-1/3 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[160px] animate-pulse-slow pointer-events-none" />

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
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto px-6 pt-32 pb-6 text-left select-none"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            iPad Pro. <span className="text-zinc-550">Thinpossible.</span>
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm mt-4 tracking-wide uppercase font-semibold">
            Unbelievably thin 5.1mm structure with M4 processing speed
          </p>
        </motion.div>

        {/* Specialized iPad Features Showcase */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <Tablet className="w-6 h-6 text-violet-400" />,
              title: "Tandem OLED Display",
              desc: "Dual OLED panels combine to deliver 1000 nits sustained and 1600 nits peak HDR brightness.",
            },
            {
              icon: <Sliders className="w-6 h-6 text-pink-400" />,
              title: "5.1mm Thinness",
              desc: "Apple's thinnest product ever, without compromising strength or thermal efficiency.",
            },
            {
              icon: <PenTool className="w-6 h-6 text-blue-400" />,
              title: "Apple Pencil Pro",
              desc: "Squeeze haptics, barrel roll gyroscope, and precise hover tracking support.",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-amber-400" />,
              title: "AI Creativity",
              desc: "Real-time rendering in Final Cut Pro and automatic audio separation in Logic Pro.",
            },
          ].map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.13, duration: 0.65, ease: "easeOut" }}
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

        {/* Reused Product Tabs (iPad default) */}
        <div className="py-12 border-t border-zinc-900 bg-zinc-950/20">
          <div className="max-w-6xl mx-auto px-6 mb-4 text-left">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">Creative Studio Gallery</h2>
            <p className="text-zinc-500 text-xs mt-1">Witness iPad&apos;s ultra-premium build detail alongside the M4 MacBook Pro.</p>
          </div>
          <ProductTabs defaultTab="ipad" />
        </div>

        {/* Purchase Configurator Suite */}
        <div className="py-12 border-t border-zinc-900 bg-zinc-950/20">
          <IPhoneCustomizer lockedProductType="ipad" onAddToCart={handleAddToCart} />
        </div>

        {/* Compare Sheet */}
        <div className="py-12 border-t border-zinc-900">
          <AppleComparison productType="ipad" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
