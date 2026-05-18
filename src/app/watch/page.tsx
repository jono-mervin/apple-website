"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import ProductTabs from "@/components/ProductTabs";
import AppleComparison from "@/components/AppleComparison";
import IPhoneCustomizer, { CartItem } from "@/components/iPhoneCustomizer";
import Footer from "@/components/Footer";
import { ShieldAlert, Compass, Clock, Waves } from "lucide-react";
import { motion } from "framer-motion";

export default function WatchPage() {
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
      <div className="absolute top-[20%] right-1/3 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto px-6 pt-32 pb-6 text-left select-none"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Apple Watch Ultra 2. <span className="text-zinc-550">Rugged and capable.</span>
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm mt-4 tracking-wide uppercase font-semibold">
            In a stunning Satin Black finish with custom outdoor bands
          </p>
        </motion.div>

        {/* Specialized Watch Features Showcase */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <Compass className="w-6 h-6 text-orange-500" />,
              title: "Adventure GPS",
              desc: "Dual-frequency GPS computes map coordinates inside deep alpine locations.",
            },
            {
              icon: <ShieldAlert className="w-6 h-6 text-yellow-500" />,
              title: "86dB Alert Siren",
              desc: "Instantly sound distress signals audible up to 600 feet away in emergencies.",
            },
            {
              icon: <Waves className="w-6 h-6 text-blue-400" />,
              title: "40m Scuba Diving",
              desc: "Comes with depth gauges, water temperature sensors, and Oceanic+ integration.",
            },
            {
              icon: <Clock className="w-6 h-6 text-emerald-400" />,
              title: "72-Hour Life",
              desc: "Unmatched battery endurance under customizable Low Power settings.",
            },
          ].map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.14, duration: 0.7, ease: "easeOut" }}
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

        {/* Reused Product Tabs (Watch default) */}
        <div className="py-12 border-t border-zinc-900 bg-zinc-950/20">
          <div className="max-w-6xl mx-auto px-6 mb-4 text-left">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">Outdoor Explorer Gallery</h2>
            <p className="text-zinc-500 text-xs mt-1">Check out Apple Watch Ultra alongside our other elite products.</p>
          </div>
          <ProductTabs defaultTab="watch" />
        </div>

        {/* Purchase Configurator Suite */}
        <div className="py-12 border-t border-zinc-900 bg-zinc-950/20">
          <IPhoneCustomizer lockedProductType="watch" onAddToCart={handleAddToCart} />
        </div>

        {/* Compare Sheet */}
        <div className="py-12 border-t border-zinc-900">
          <AppleComparison productType="watch" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
