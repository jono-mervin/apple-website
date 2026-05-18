"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Tablet, Watch, Headphones, Zap, ShieldCheck, Cpu, Flame, Laptop } from "lucide-react";

interface ProductData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  specs: { label: string; value: string; icon: React.ReactNode }[];
  accentColor: string;
  visual: React.ReactNode;
}

interface ProductTabsProps {
  defaultTab?: string;
}

export default function ProductTabs({ defaultTab = "iphone" }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const products: ProductData[] = [
    {
      id: "iphone",
      name: "iPhone 16 Pro",
      tagline: "Built for Apple Intelligence.",
      description: "Designed with Grade 5 Titanium and the ground-breaking A18 Pro chip, the iPhone 16 Pro brings unmatched speed, pro camera features, and an extraordinary leap in battery life.",
      icon: <Smartphone className="w-4 h-4" />,
      accentColor: "from-amber-600/30 to-amber-700/10 border-amber-500/30 text-amber-500",
      specs: [
        { label: "Processor", value: "A18 Pro (3nm)", icon: <Cpu className="w-4 h-4 text-amber-500" /> },
        { label: "Camera Sensor", value: "48MP Fusion & Ultra Wide", icon: <Zap className="w-4 h-4 text-amber-500" /> },
        { label: "Material", value: "Grade 5 Titanium", icon: <ShieldCheck className="w-4 h-4 text-amber-500" /> },
      ],
      visual: (
        <div className="relative w-full h-[320px] flex items-center justify-center space-x-6 md:space-x-8">
          
          {/* LEFT: Physical Matte Titanium Back (Protruding lenses & side controls) */}
          <div className="w-[110px] h-[240px] md:w-[125px] md:h-[270px] rounded-[28px] bg-gradient-to-b from-zinc-800 to-zinc-950 border-[3.5px] border-zinc-700/80 shadow-[0_20px_45px_rgba(0,0,0,0.8)] relative flex flex-col justify-start p-3 hover:scale-[1.03] transition-transform duration-500 select-none">
            {/* Matte glass texture overlay */}
            <div className="absolute inset-0 bg-white/[0.015] rounded-[24px] pointer-events-none" />
            
            {/* Pro Camera bump matrix with shiny metallic edges */}
            <div className="w-[62px] h-[67px] md:w-[70px] md:h-[75px] rounded-[20px] bg-zinc-900/95 border border-zinc-800 p-2 shadow-[0_6px_14px_rgba(0,0,0,0.4)] flex flex-col justify-between relative">
              <div className="flex justify-between">
                {/* Main Pro Lens */}
                <div className="w-4.5 h-4.5 md:w-5.5 md:h-5.5 rounded-full bg-black border-[1.5px] border-zinc-800 flex items-center justify-center shadow-inner relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-blue-900/60" />
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/25 rounded-full blur-[0.5px]" />
                </div>
                {/* Ultra Wide Lens */}
                <div className="w-4.5 h-4.5 md:w-5.5 md:h-5.5 rounded-full bg-black border-[1.5px] border-zinc-800 flex items-center justify-center shadow-inner relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-blue-900/60" />
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/25 rounded-full blur-[0.5px]" />
                </div>
              </div>
              <div className="flex justify-between items-end">
                {/* Telephoto Pro Lens */}
                <div className="w-4.5 h-4.5 md:w-5.5 md:h-5.5 rounded-full bg-black border-[1.5px] border-zinc-800 flex items-center justify-center shadow-inner relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-blue-900/60" />
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/25 rounded-full blur-[0.5px]" />
                </div>
                {/* Flash & LiDAR Sensor */}
                <div className="flex flex-col space-y-1 mr-0.5 mb-0.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-250 shadow-sm border border-zinc-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 shadow-inner" />
                </div>
              </div>
            </div>

            {/* Apple Logo */}
            <div className="absolute top-[125px] left-1/2 -translate-x-1/2 opacity-35">
              <svg className="w-6 h-6 md:w-7 md:h-7 fill-current text-zinc-300" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.38-6.12-3.24-2.65-7.07-7.24-11.51-13.8-5.19-7.73-9.45-16.14-12.77-25.2-3.32-9.06-4.99-17.89-4.99-26.47 0-12.87 3.32-23.72 9.97-32.56 6.64-8.83 15.01-13.31 25.11-13.43 4.48-.07 9.53 1.27 15.17 4.02 5.64 2.75 9.7 4.12 12.19 4.12 2.11 0 6.09-1.28 11.95-3.85 5.86-2.57 10.98-3.76 15.36-3.57 12.42.53 22.18 5.08 29.28 13.63-9.97 6.08-14.86 14.16-14.68 24.23.19 8.1 3.12 14.82 8.79 20.17 5.68 5.35 12.44 8.29 20.3 8.81 1.77 5.56 3.65 11.12 5.64 16.68zm-21.84-110.05c0 6.35-2.28 12.41-6.84 18.17-4.56 5.76-10.13 9.68-16.71 11.77-.38-5.56 1.83-11.45 6.65-17.65 4.82-6.2 10.6-10.22 17.34-12.06.38.45.92 1.4 1.56 2.87.64 1.47 1 3.1 1 4.9z" />
              </svg>
            </div>

            {/* Protruding Side Buttons (Exactly as reference image) */}
            <div className="absolute top-[48px] -left-[2px] w-[2px] h-[14px] bg-zinc-600 rounded-r-sm" /> {/* Action Button */}
            <div className="absolute top-[70px] -left-[2px] w-[2px] h-[28px] bg-zinc-600 rounded-r-sm" /> {/* Volume Up */}
            <div className="absolute top-[106px] -left-[2px] w-[2px] h-[28px] bg-zinc-600 rounded-r-sm" /> {/* Volume Down */}
            <div className="absolute top-[135px] -right-[2px] w-[2px] h-[34px] bg-zinc-650 rounded-l-sm border border-zinc-700/50" /> {/* Camera Control sensor */}
          </div>

          {/* RIGHT: Curved Bezel Front Display (Dynamic wallpaper neon rings) */}
          <div className="w-[110px] h-[240px] md:w-[125px] md:h-[270px] rounded-[28px] bg-zinc-950 border-[3.5px] border-zinc-700 shadow-[0_20px_45px_rgba(0,0,0,0.8)] relative overflow-hidden p-[3px] hover:scale-[1.03] transition-transform duration-500 select-none">
            <div className="w-full h-full rounded-[24px] bg-black relative overflow-hidden flex flex-col justify-between">
              
              {/* Sweeping translucent glass curved reflection sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.07] to-white/0 pointer-events-none z-20" />
              
              {/* Layered concentric neon gradient screen rings */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-zinc-900 to-purple-950/80 z-0" />
              <div className="absolute top-[35px] left-1/2 -translate-x-1/2 w-[85px] h-[85px] rounded-full border border-purple-500/20 bg-purple-600/5 blur-[2.5px] z-1 animate-pulse-slow" />
              <div className="absolute top-[65px] left-1/2 -translate-x-1/2 w-[75px] h-[75px] rounded-full border border-blue-500/20 bg-blue-600/5 blur-[3px] z-1" />
              <div className="absolute bottom-[25px] left-1/2 -translate-x-1/2 w-[90px] h-[90px] rounded-full border border-indigo-500/10 blur-[4.5px] z-1" />

              {/* Dynamic Island Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[48px] h-[10px] bg-zinc-950 rounded-full border border-zinc-900 z-30 flex items-center justify-end px-1.5 shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
              </div>

              {/* Interface Content */}
              <div className="w-full text-center mt-7 space-y-0.5 z-10">
                <span className="text-[6.5px] text-zinc-400 font-bold tracking-wider uppercase font-display"> Intelligence</span>
                <h4 className="text-[9.5px] font-extrabold text-white leading-tight tracking-wide font-display">Hello, Apple</h4>
              </div>

              {/* Bottom Swipe Indicator bar */}
              <div className="w-10 h-[2.5px] bg-white/45 rounded-full mx-auto mb-1.5 z-10" />
            </div>
          </div>

          {/* Ambient Purple/Orange Glow */}
          <div className="absolute w-[240px] h-[240px] bg-gradient-to-tr from-purple-600/10 to-amber-500/5 blur-[90px] pointer-events-none rounded-full" />
        </div>
      )
    },
    {
      id: "ipad",
      name: "iPad Pro",
      tagline: "Thinpossible. M4 Unleashed.",
      description: "The thinnest Apple product ever. Featuring the revolutionary M4 chip, a breakthrough Ultra Retina XDR Tandem OLED display, and lightning-fast pro graphics rendering.",
      icon: <Tablet className="w-4 h-4" />,
      accentColor: "from-blue-600/30 to-blue-700/10 border-blue-500/30 text-blue-400",
      specs: [
        { label: "Processor", value: "Apple M4 Chip", icon: <Cpu className="w-4 h-4 text-blue-400" /> },
        { label: "Display", value: "Ultra Retina XDR OLED", icon: <Zap className="w-4 h-4 text-blue-400" /> },
        { label: "Thickness", value: "5.1 mm (World's Thinnest)", icon: <ShieldCheck className="w-4 h-4 text-blue-400" /> },
      ],
      visual: (
        <div className="relative w-full h-[320px] flex items-center justify-center">
          <div className="relative p-2 w-[240px] hover:scale-105 transition-transform duration-500 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ipad_pro.png" alt="iPad Pro" className="w-full h-auto object-contain drop-shadow-2xl animate-float" />
          </div>
          {/* Ambient Glow */}
          <div className="absolute w-[250px] h-[150px] bg-blue-500/10 blur-[80px] pointer-events-none rounded-full z-0" />
        </div>
      )
    },
    {
      id: "mac",
      name: "MacBook Pro",
      tagline: "A mind-blowing powerhouse.",
      description: "Supercharged by M4 Pro and M4 Max chips. MacBook Pro features extreme rendering speed, the longest battery life ever in a Mac, and an advanced Liquid Retina XDR screen.",
      icon: <Laptop className="w-4 h-4" />,
      accentColor: "from-sky-600/30 to-sky-700/10 border-sky-500/30 text-sky-400",
      specs: [
        { label: "Processor", value: "M4 Max (16-core CPU)", icon: <Cpu className="w-4 h-4 text-sky-400" /> },
        { label: "Graphics", value: "40-core GPU engine", icon: <Zap className="w-4 h-4 text-sky-400" /> },
        { label: "Battery life", value: "Up to 24 hours longevity", icon: <ShieldCheck className="w-4 h-4 text-sky-400" /> },
      ],
      visual: (
        <div className="relative w-full h-[320px] flex flex-col items-center justify-center">
          <div className="relative p-2 w-[320px] hover:scale-105 transition-transform duration-500 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/macbook_pro.png" alt="MacBook Pro" className="w-full h-auto object-contain drop-shadow-2xl animate-float" />
          </div>
          {/* Ambient Glow */}
          <div className="absolute w-[280px] h-[160px] bg-sky-500/10 blur-[80px] pointer-events-none rounded-full z-0" />
        </div>
      )
    },
    {
      id: "watch",
      name: "Apple Watch Ultra 2",
      tagline: "New Finish. Never Finished.",
      description: "Forged in aerospace grade titanium, featuring the brightest-ever Apple Always-On Retina display (3000 nits), dual-frequency high-precision GPS, and up to 72 hours of battery life.",
      icon: <Watch className="w-4 h-4" />,
      accentColor: "from-orange-600/30 to-orange-700/10 border-orange-500/30 text-orange-500",
      specs: [
        { label: "Display", value: "3000 nits Always-On XDR", icon: <Cpu className="w-4 h-4 text-orange-500" /> },
        { label: "GPS Accuracy", value: "Precision Dual-Frequency", icon: <Flame className="w-4 h-4 text-orange-500" /> },
        { label: "Battery", value: "Up to 72 hours (Low Power)", icon: <ShieldCheck className="w-4 h-4 text-orange-500" /> },
      ],
      visual: (
        <div className="relative w-full h-[320px] flex items-center justify-center">
          <div className="relative p-2 w-[200px] hover:scale-105 transition-transform duration-500 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/apple_watch.png" alt="Apple Watch" className="w-full h-auto object-contain drop-shadow-2xl animate-float" />
          </div>
          {/* Ambient Glow */}
          <div className="absolute w-[180px] h-[180px] bg-orange-500/10 blur-[80px] pointer-events-none rounded-full z-0" />
        </div>
      )
    },
    {
      id: "airpods",
      name: "AirPods Pro 2",
      tagline: "Hearing Health built in. Adaptive Audio.",
      description: "Re-engineered with the H2 chip. Experience 2x stronger Active Noise Cancellation, Adaptive Audio that tailors sound to your environment, and advanced Hearing Protection capabilities.",
      icon: <Headphones className="w-4 h-4" />,
      accentColor: "from-green-600/30 to-green-700/10 border-green-500/30 text-green-400",
      specs: [
        { label: "Processor", value: "Apple H2 Silicon", icon: <Cpu className="w-4 h-4 text-green-400" /> },
        { label: "Cancellation", value: "2x Active Noise Cancellation", icon: <Zap className="w-4 h-4 text-green-400" /> },
        { label: "Audio Profile", value: "Adaptive Transparency", icon: <ShieldCheck className="w-4 h-4 text-green-400" /> },
      ],
      visual: (
        <div className="relative w-full h-[320px] flex items-center justify-center">
          {/* AirPods case floating */}
          <div className="relative flex flex-col items-center animate-float">
            {/* Airpod Bud Left */}
            <div className="absolute -left-[45px] -top-[45px] w-[40px] h-[55px] rounded-[18px] bg-zinc-100 border border-zinc-200/40 shadow-lg rotate-[25deg] flex flex-col justify-start p-1.5">
              <div className="w-6 h-6 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                {/* Silicone tip */}
                <div className="w-4 h-4 rounded-full bg-zinc-200/70" />
              </div>
              <div className="w-3.5 h-[28px] bg-zinc-100 rounded-full border border-zinc-200/30 ml-auto mt-1" />
            </div>

            {/* Airpod Bud Right */}
            <div className="absolute -right-[45px] -top-[40px] w-[40px] h-[55px] rounded-[18px] bg-zinc-100 border border-zinc-200/40 shadow-lg -rotate-[25deg] flex flex-col justify-start p-1.5">
              <div className="w-6 h-6 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                {/* Silicone tip */}
                <div className="w-4 h-4 rounded-full bg-zinc-200/70" />
              </div>
              <div className="w-3.5 h-[28px] bg-zinc-100 rounded-full border border-zinc-200/30 mr-auto mt-1" />
            </div>

            {/* Case Body */}
            <div className="w-[125px] h-[95px] rounded-[34px] bg-gradient-to-tr from-zinc-100 to-zinc-55 border border-white shadow-[0_15px_40px_rgba(0,0,0,0.5)] p-1 flex flex-col justify-between relative overflow-hidden">
              <div className="w-full h-1 bg-zinc-300/40 mt-[26px]" /> {/* Lid crease */}
              <div className="w-2 h-2 rounded-full bg-zinc-300 mx-auto mb-6 shadow-inner" /> {/* Status LED */}
            </div>
          </div>
          {/* Ambient Glow */}
          <div className="absolute w-[200px] h-[200px] bg-green-500/10 blur-[80px] pointer-events-none rounded-full" />
        </div>
      )
    }
  ];

  const activeProduct = products.find((p) => p.id === activeTab) || products[0];

  return (
    <section id="product-tabs" className="w-full bg-black py-24 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 mb-16"
        >
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xs uppercase tracking-widest text-zinc-450 font-bold font-display">Explore The Ecosystem</motion.span>
          <motion.h2 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
            Designed to fit together.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-zinc-300 text-sm md:text-base max-w-lg mx-auto font-normal">
            Every Apple device features industry-leading performance, clean materials, and seamless communication.
          </motion.p>
        </motion.div>

        {/* Tab Swatches */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-16">
          {products.map((p) => {
            const isSelected = p.id === activeTab;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-medium border transition-all duration-300 ${
                  isSelected
                    ? "bg-zinc-100 border-white text-black shadow-lg shadow-white/5"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {p.icon}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents Panels */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full min-h-[420px] rounded-3xl bg-zinc-950/40 border border-zinc-900 p-8 md:p-12 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <span className="text-xs font-bold text-blue-500 tracking-wider uppercase font-display">Highlight</span>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">{activeProduct.name}</h3>
                <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent italic leading-snug font-display">
                  &ldquo;{activeProduct.tagline}&rdquo;
                </p>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
                  {activeProduct.description}
                </p>

                {/* Performance specs bullet cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {activeProduct.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="bg-zinc-900/60 border border-zinc-800/40 p-4 rounded-2xl flex flex-col space-y-2 hover:border-zinc-700 transition-colors"
                    >
                      <div className="p-1.5 w-fit rounded-lg bg-zinc-800/80">
                        {spec.icon}
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 font-light uppercase tracking-wider">{spec.label}</p>
                        <p className="text-xs font-bold text-zinc-200 mt-0.5">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center space-x-4 pt-6">
                  <button 
                    onClick={() => {
                      if (activeProduct.id === "iphone") {
                        const el = document.getElementById("customizer");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        // Dynamic anchors corresponding to showrooms
                        window.location.href = `/${activeProduct.id}`;
                      }
                    }}
                    className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-5 py-3 rounded-full transition-colors"
                  >
                    Buy Now
                  </button>
                  <button 
                    onClick={() => window.location.href = `/${activeProduct.id}`}
                    className="text-white hover:text-blue-400 text-xs font-medium flex items-center space-x-1 group transition-colors"
                  >
                    <span>Learn more</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </button>
                </div>
              </div>

              {/* Product CSS illustration */}
              <div className="lg:col-span-5 w-full flex items-center justify-center">
                {activeProduct.visual}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
