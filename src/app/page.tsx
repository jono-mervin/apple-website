"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import ProductTabs from "@/components/ProductTabs";
import IPhoneCustomizer, { CartItem } from "@/components/iPhoneCustomizer";
import CameraSimulator from "@/components/CameraSimulator";
import ProMotionSimulator from "@/components/ProMotionSimulator";
import AppleComparison from "@/components/AppleComparison";
import AppleStoreLocator from "@/components/AppleStoreLocator";
import Footer from "@/components/Footer";

export default function Home() {
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
    setCartOpenTrigger(true); // Signal navigation to automatically slide open the shopping cart
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Query all wrapped sections to trigger subtle fade-ins as they enter viewport
      const sections = document.querySelectorAll(".gsap-reveal-section");

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%", // Starts reveal when section hits lower 85% of viewport
              toggleActions: "play none none reverse", // plays animation when scrolled down, reverses on back-scroll
            },
          }
        );
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      {/* Ambient Cinematic Background Glow Orbs */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[90vw] h-[60vh] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,rgba(139,92,246,0.04)_50%,transparent_100%)] blur-[100px] pointer-events-none -z-20 animate-pulse-slow" />
      <div className="absolute top-[25%] right-[-10%] w-[60vw] h-[50vh] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,rgba(236,72,153,0.02)_60%,transparent_100%)] blur-[120px] pointer-events-none -z-20" />
      <div className="absolute top-[45%] left-[-10%] w-[50vw] h-[55vh] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,rgba(6,182,212,0.02)_50%,transparent_100%)] blur-[110px] pointer-events-none -z-20" />
      <div className="absolute top-[65%] right-[-5%] w-[55vw] h-[50vh] bg-[radial-gradient(circle_at_center,rgba(243,112,33,0.06)_0%,rgba(139,92,246,0.02)_60%,transparent_100%)] blur-[130px] pointer-events-none -z-20" />
      <div className="absolute top-[85%] left-[10%] w-[60vw] h-[45vh] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,rgba(139,92,246,0.03)_50%,transparent_100%)] blur-[100px] pointer-events-none -z-20" />

      {/* 1. Sticky Apple nav and interactive tilt visual reveal */}
      <Hero 
        cartItems={cart} 
        onRemoveCartItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        cartOpenTrigger={cartOpenTrigger}
        onResetCartTrigger={handleResetCartTrigger}
      />

      {/* 2. Product tabs ecosystem (iPad, AirPods, Apple Watch Ultra) */}
      <div className="gsap-reveal-section">
        <ProductTabs />
      </div>

      {/* 3. Real-time Titanium Finish Configurator and Dynamic Price Counter */}
      <div className="gsap-reveal-section">
        <IPhoneCustomizer onAddToCart={handleAddToCart} />
      </div>

      {/* 4. Real-time 48MP Focal Length Simulator & Night Mode toggle */}
      <div className="gsap-reveal-section">
        <CameraSimulator />
      </div>

      {/* 5. 120Hz ProMotion vs 60Hz split-screen scrolling comparator */}
      <div className="gsap-reveal-section">
        <ProMotionSimulator />
      </div>

      {/* 6. Apple-style model spec comparison sheet */}
      <div className="gsap-reveal-section">
        <AppleComparison />
      </div>

      {/* 7. Zipcode filterable Genius Bar booking locator */}
      <div className="gsap-reveal-section">
        <AppleStoreLocator />
      </div>

      {/* 8. Comprehensive sitemap footer with disclaimers and newsletter form */}
      <Footer />
    </div>
  );
}
