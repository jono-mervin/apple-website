"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import AppleComparison from "@/components/AppleComparison";
import Footer from "@/components/Footer";
import { Tv, Play, Smartphone, Volume2, ShieldCheck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "@/components/iPhoneCustomizer";

interface Show {
  title: string;
  genre: string;
  rating: string;
  desc: string;
  bgColor: string;
  imageAlt: string;
}

const showCatalog: Show[] = [
  {
    title: "Severance",
    genre: "Sci-Fi / Thriller",
    rating: "9.3/10 (IMDb)",
    desc: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.",
    bgColor: "from-sky-950 via-blue-900 to-black",
    imageAlt: "A clean fluorescent blue office with a single worker at a computer.",
  },
  {
    title: "Ted Lasso",
    genre: "Comedy / Drama",
    rating: "8.8/10 (IMDb)",
    desc: "Small-time American football coach Ted Lasso is hired to coach a professional soccer team in England, bringing optimism.",
    bgColor: "from-amber-950 via-yellow-900 to-black",
    imageAlt: "A happy soccer pitch scene with a positive yellow emblem.",
  },
  {
    title: "Foundation",
    genre: "Sci-Fi / Adventure",
    rating: "8.6/10 (IMDb)",
    desc: "Based on Isaac Asimov's award-winning novels, this epic chronicle follows a band of exiles to save humanity.",
    bgColor: "from-purple-950 via-violet-900 to-black",
    imageAlt: "A massive spiral galactic landscape with deep purple accents.",
  },
  {
    title: "The Morning Show",
    genre: "Drama",
    rating: "8.3/10 (IMDb)",
    desc: "An inside look at the lives of the people who help America wake up in the morning, exploring newsrooms.",
    bgColor: "from-rose-950 via-red-900 to-black",
    imageAlt: "A sleek media broadcast news studio with crimson glows.",
  },
];

export default function TvHomePage() {
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
  const [activeShowIndex, setActiveShowIndex] = useState<number>(0);
  const [simulateClickFeedback, setSimulateClickFeedback] = useState<string | null>(null);

  const handleRemoveFromCart = (cartId: number) => {
    const updated = cart.filter((item) => item.cartId !== cartId);
    setCart(updated);
    localStorage.setItem("apple_cart", JSON.stringify(updated));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("apple_cart");
  };

  // Remote key trigger simulation
  const handleRemoteClick = (action: string) => {
    setSimulateClickFeedback(action);
    setTimeout(() => setSimulateClickFeedback(null), 150);

    if (action === "DOWN" || action === "RIGHT") {
      setActiveShowIndex((prev) => (prev + 1) % showCatalog.length);
    } else if (action === "UP" || action === "LEFT") {
      setActiveShowIndex((prev) => (prev - 1 + showCatalog.length) % showCatalog.length);
    }
  };

  const currentShow = showCatalog[activeShowIndex];

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-between">
      {/* Background Radial Glow */}
      <div className="absolute top-[20%] left-1/4 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-[60%] right-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

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

        {/* Hero Section matching Screenshot 2 */}
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-16 flex flex-col md:flex-row items-center justify-between gap-12 select-none">
          <div className="space-y-6 max-w-xl text-left">
            <div className="flex items-center space-x-2 text-white font-semibold">
              <span className="text-2xl font-bold font-display flex items-center"> tv <span className="font-extrabold text-sky-400 ml-1">4K</span></span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              The Apple experience. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                Cinematic in every sense.
              </span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-medium tracking-wide">
              Starting at $129
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold text-sm transition-all duration-300 transform active:scale-95 shadow-lg shadow-blue-600/20">
                Buy Now
              </button>
              <a href="#remote-simulator" className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center space-x-1 hover:underline transition-all">
                <span>Try Simulator</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Premium generated Apple TV 4K Showcase image */}
          <div className="relative group w-full max-w-md md:max-w-lg aspect-[4/3] flex items-center justify-center">
            {/* Soft Ambient Casing Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-purple-500/20 blur-3xl opacity-60 rounded-[50px] group-hover:scale-105 transition-all duration-500 pointer-events-none -z-10" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative p-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/apple_tv.png"
                alt="Apple TV 4K and Siri Remote premium setup layout"
                className="w-full h-auto object-contain rounded-3xl drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] animate-float"
              />
              {/* Deep Dynamic shadow plate situated beneath device */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/90 rounded-full blur-md animate-shadow-breath pointer-events-none -z-10" />
            </motion.div>
          </div>
        </div>

        {/* Apple TV Specs Showcase Grid */}
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <Tv className="w-6 h-6 text-sky-400" />,
              title: "A15 Bionic Processor",
              desc: "Extreme fluid graphics rendering, instant apps hopping, and console-grade gameplay.",
            },
            {
              icon: <Volume2 className="w-6 h-6 text-purple-400" />,
              title: "Dolby Atmos 3D Audio",
              desc: "Generates space-filling surround soundscapes when synchronized with HomePod lines.",
            },
            {
              icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
              title: "iPhone Smart Casts",
              desc: "Color calibrate screens instantly using back TrueDepth lenses, or toggle private AirPods listening.",
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
              title: "Siri Voice Remote",
              desc: "Comes with circular glass touchpads, a dedicated Siri side-button, and USB-C port.",
            },
          ].map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
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

        {/* TV+ Siri Remote Interactive Simulator (Goal 2 centerpiece) */}
        <div id="remote-simulator" className="py-16 border-t border-zinc-900 bg-zinc-950/20 select-none">
          <div className="max-w-6xl mx-auto px-6 text-center space-y-4 mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
              Siri Remote Interactive Simulator
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm max-w-xl mx-auto">
              Click buttons on the physical Siri Remote on the right to navigate the virtual Apple TV+ display screen on the left!
            </p>
          </div>

          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Simulated TV Screen Display (7 columns) */}
            <div className="md:col-span-8 aspect-[16/9] w-full rounded-2xl border border-zinc-800 bg-black relative overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentShow.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 bg-gradient-to-t ${currentShow.bgColor} flex flex-col justify-between p-8 text-left`}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-350 flex items-center gap-1.5">
                      <Tv className="w-3.5 h-3.5 text-sky-400" /> Apple TV+ Original Show
                    </span>
                    <span className="text-[11px] font-semibold bg-white/15 px-2 py-0.5 rounded-full text-zinc-100">
                      {currentShow.rating}
                    </span>
                  </div>

                  {/* Mid Segment Copy */}
                  <div className="space-y-3">
                    <span className="text-xs text-sky-400 font-extrabold uppercase tracking-wider">
                      {currentShow.genre}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      {currentShow.title}
                    </h3>
                    <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-xl">
                      {currentShow.desc}
                    </p>
                  </div>

                  {/* Bottom Controls Indicator */}
                  <div className="flex items-center space-x-4 pt-4">
                    <button className="px-5 py-2 bg-white text-black font-extrabold text-xs rounded-full hover:bg-zinc-200 transition-colors flex items-center space-x-1.5 active:scale-95 duration-200">
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play Trailer</span>
                    </button>
                    <span className="text-zinc-500 text-[10px] uppercase font-semibold tracking-wider">
                      Press enter key to stream
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dynamic glass sitemap tabs indicator bottom right */}
              <div className="absolute top-6 right-6 flex flex-col space-y-1.5">
                {showCatalog.map((show, idx) => (
                  <div
                    key={show.title}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeShowIndex === idx ? "bg-white scale-125" : "bg-white/35"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Virtual physical Siri Remote (4 columns) */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 bg-zinc-900 border border-zinc-800 rounded-[36px] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col items-center space-y-6 relative">
                {/* Micro-textures on aluminum shell */}
                <div className="absolute inset-0 bg-white/2 rounded-[36px] pointer-events-none" />

                {/* Siri Clickpad (Top Ring) */}
                <div className="w-32 h-32 rounded-full bg-zinc-800 border-2 border-zinc-700 relative p-1.5 flex items-center justify-center shadow-inner">
                  {/* Outer navigation circle keys */}
                  <button
                    onClick={() => handleRemoteClick("UP")}
                    className={`absolute top-1.5 w-10 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-t-full transition-colors active:scale-95 ${
                      simulateClickFeedback === "UP" ? "bg-zinc-750 text-white" : ""
                    }`}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleRemoteClick("RIGHT")}
                    className={`absolute right-1.5 w-8 h-10 flex items-center justify-center text-zinc-400 hover:text-white rounded-r-full transition-colors active:scale-95 ${
                      simulateClickFeedback === "RIGHT" ? "bg-zinc-750 text-white" : ""
                    }`}
                  >
                    ▶
                  </button>
                  <button
                    onClick={() => handleRemoteClick("DOWN")}
                    className={`absolute bottom-1.5 w-10 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-b-full transition-colors active:scale-95 ${
                      simulateClickFeedback === "DOWN" ? "bg-zinc-750 text-white" : ""
                    }`}
                  >
                    ▼
                  </button>
                  <button
                    onClick={() => handleRemoteClick("LEFT")}
                    className={`absolute left-1.5 w-8 h-10 flex items-center justify-center text-zinc-400 hover:text-white rounded-l-full transition-colors active:scale-95 ${
                      simulateClickFeedback === "LEFT" ? "bg-zinc-750 text-white" : ""
                    }`}
                  >
                    ◀
                  </button>

                  {/* Inner Center Select Button */}
                  <button
                    onClick={() => handleRemoteClick("CENTER")}
                    className={`w-16 h-16 rounded-full bg-zinc-950 border border-zinc-700 hover:border-zinc-550 transition-colors flex items-center justify-center text-zinc-300 font-extrabold text-xs active:scale-90 ${
                      simulateClickFeedback === "CENTER" ? "bg-zinc-800 text-white" : ""
                    }`}
                  >
                    SELECT
                  </button>
                </div>

                {/* Back and TV/Home buttons grid */}
                <div className="grid grid-cols-2 gap-3.5 w-full">
                  <button
                    onClick={() => handleRemoteClick("BACK")}
                    className={`h-11 rounded-full bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-zinc-350 font-extrabold text-xs transition-colors flex items-center justify-center active:scale-95 ${
                      simulateClickFeedback === "BACK" ? "bg-zinc-700 text-white" : ""
                    }`}
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => handleRemoteClick("HOME")}
                    className={`h-11 rounded-full bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-zinc-350 transition-colors flex items-center justify-center active:scale-95 ${
                      simulateClickFeedback === "HOME" ? "bg-zinc-700 text-white" : ""
                    }`}
                  >
                    <Tv className="w-4 h-4 text-zinc-300" />
                  </button>
                </div>

                {/* Volume and Mute row */}
                <div className="grid grid-cols-2 gap-3.5 w-full">
                  <div className="h-16 rounded-full bg-zinc-850 border border-zinc-700 flex flex-col justify-between py-1.5 items-center">
                    <button
                      onClick={() => handleRemoteClick("VOL_UP")}
                      className={`text-zinc-400 hover:text-white font-extrabold active:scale-75 ${
                        simulateClickFeedback === "VOL_UP" ? "text-white" : ""
                      }`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoteClick("VOL_DOWN")}
                      className={`text-zinc-400 hover:text-white font-extrabold active:scale-75 ${
                        simulateClickFeedback === "VOL_DOWN" ? "text-white" : ""
                      }`}
                    >
                      -
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoteClick("MUTE")}
                    className={`h-16 rounded-full bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 transition-colors flex items-center justify-center active:scale-95 ${
                      simulateClickFeedback === "MUTE" ? "bg-zinc-700 text-white" : ""
                    }`}
                  >
                    <Volume2 className="w-4 h-4 text-zinc-300" />
                  </button>
                </div>

                {/* Micro logo details */}
                <div className="text-[9px] text-zinc-650 tracking-widest font-semibold uppercase mt-2">
                   siri remote
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compare Sheet */}
        <div className="py-12 border-t border-zinc-900">
          <AppleComparison />
        </div>
      </div>

      <Footer />
    </div>
  );
}
