"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import IPhoneCustomizer, { CartItem } from "@/components/iPhoneCustomizer";
import Footer from "@/components/Footer";

export default function StorePage() {
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

  const handleAddToCart = (item: CartItem) => {
    const updated = [...cart, { ...item, cartId: Date.now() }];
    setCart(updated);
    localStorage.setItem("apple_cart", JSON.stringify(updated));
    setCartOpenTrigger(true); // Signal Hero to slide open the cart drawer
  };

  const handleRemoveFromCart = (cartId: number) => {
    const updated = cart.filter((item) => item.cartId !== cartId);
    setCart(updated);
    localStorage.setItem("apple_cart", JSON.stringify(updated));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("apple_cart");
  };

  const handleResetCartTrigger = () => {
    setCartOpenTrigger(false);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-between">
      {/* Background Radial Glow */}
      <div className="absolute top-[20%] left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[20%] right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

      <div>
        {/* Global sticky navigation in header-only mode */}
        <Hero
          navOnly={true}
          cartItems={cart}
          onRemoveCartItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          cartOpenTrigger={cartOpenTrigger}
          onResetCartTrigger={handleResetCartTrigger}
        />

        {/* Page Headline */}
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-6 text-left select-none">
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Store. <span className="text-zinc-550">The best way to buy the products you love.</span>
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm mt-4 tracking-wide uppercase font-semibold">
            Explore Casing Finishes, Accessories, & Apple Intelligence Pre-orders
          </p>
        </div>

        {/* Purchase Configurator Suite */}
        <div className="py-6">
          <IPhoneCustomizer onAddToCart={handleAddToCart} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
