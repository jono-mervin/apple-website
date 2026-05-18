"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import ProductTabs from "@/components/ProductTabs";
import CameraSimulator from "@/components/CameraSimulator";
import ProMotionSimulator from "@/components/ProMotionSimulator";
import IPhoneCustomizer, { CartItem } from "@/components/iPhoneCustomizer";
import AppleComparison from "@/components/AppleComparison";
import Footer from "@/components/Footer";
import { Shield, Sparkles, Smartphone, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function IphonePage() {
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
      <div className="absolute top-[25%] left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] animate-pulse-slow pointer-events-none" />

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
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="max-w-6xl mx-auto px-6 pt-32 pb-6 text-left select-none"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            iPhone 16 Pro. <span className="text-zinc-550">Hello, Apple Intelligence.</span>
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm mt-4 tracking-wide uppercase font-semibold">
            Sculpted in Grade 5 Titanium with premium thermal systems
          </p>
        </motion.div>

        {/* Specialized iPhone Features Showcase */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <Smartphone className="w-6 h-6 text-amber-500" />,
              title: "Camera Control",
              desc: "Tactile switch with dynamic force sensor for effortless lens zoom and aperture tweaks.",
            },
            {
              icon: <Shield className="w-6 h-6 text-zinc-400" />,
              title: "Grade 5 Titanium",
              desc: "Extremely strong titanium shell showing micro-blasted satin textures.",
            },
            {
              icon: <Eye className="w-6 h-6 text-blue-400" />,
              title: "48MP Fusion Camera",
              desc: "Zero shutter lag sensor supporting 4K 120fps Dolby Vision recording.",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-violet-400" />,
              title: "A18 Pro Processor",
              desc: "16-core Neural Engine designed explicitly to compute LLM tasks locally.",
            },
          ].map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, scale: 0.88, rotate: idx % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Embedded Camera Simulator Component */}
        <div className="py-12 border-t border-zinc-900">
          <CameraSimulator />
        </div>

        {/* Embedded ProMotion Simulator Component */}
        <div className="py-12 border-t border-zinc-900 bg-zinc-950/30">
          <ProMotionSimulator />
        </div>

        {/* Reused Product Tabs (iPhone default) */}
        <div className="py-12 border-t border-zinc-900 bg-zinc-950/20">
          <div className="max-w-6xl mx-auto px-6 mb-4 text-left">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">Ecosystem Gallery</h2>
            <p className="text-zinc-550 text-xs mt-1">See how iPhone 16 Pro works flawlessly with iPad Pro, MacBook Pro, and Watch Ultra 2.</p>
          </div>
          <ProductTabs defaultTab="iphone" />
        </div>

        {/* Purchase Configurator Suite */}
        <div className="py-12 border-t border-zinc-900 bg-zinc-950/20">
          <IPhoneCustomizer lockedProductType="iphone" onAddToCart={handleAddToCart} />
        </div>

        {/* Compare Sheet */}
        <div className="py-12 border-t border-zinc-900">
          <AppleComparison productType="iphone" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
