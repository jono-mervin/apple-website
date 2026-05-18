"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, Shield, ShoppingCart, Laptop, Smartphone, Watch, Headphones } from "lucide-react";

export interface CartItem {
  cartId?: number;
  name: string;
  colorName: string;
  capacity: string;
  price: number;
  monthly: string;
  hex: string;
}

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  bgGradient: string;
  phoneColor: string;
}

interface StorageOption {
  id: string;
  capacity: string;
  priceAdd: number;
}

type ProductType = "iphone" | "ipad" | "watch" | "airpods" | "mac";

interface ProductData {
  id: ProductType;
  label: string;
  tagline: string;
  description: string;
  basePricePro: number;
  basePriceMax: number;
  proLabel: string;
  maxLabel: string;
  proDesc: string;
  maxDesc: string;
  colors: ColorOption[];
  storages: StorageOption[];
}

interface IPhoneCustomizerProps {
  onAddToCart?: (item: CartItem) => void;
  lockedProductType?: ProductType;
}

export default function IPhoneCustomizer({ onAddToCart, lockedProductType }: IPhoneCustomizerProps) {
  const [productType, setProductType] = useState<ProductType>(lockedProductType || "iphone");
  const [model, setModel] = useState<"pro" | "max">("pro");
  const [color, setColor] = useState(() => {
    if (lockedProductType === "mac") return "space-black";
    if (lockedProductType === "ipad") return "space-black";
    if (lockedProductType === "watch") return "alpine-indigo";
    if (lockedProductType === "airpods") return "white";
    return "desert";
  });
  const [storage, setStorage] = useState(() => {
    if (lockedProductType === "mac") return "16gb";
    if (lockedProductType === "ipad") return "256";
    if (lockedProductType === "watch") return "gps-cell";
    if (lockedProductType === "airpods") return "standard-engrave";
    return "128";
  });
  const [preordered, setPreordered] = useState(false);

  React.useEffect(() => {
    if (lockedProductType) {
      setProductType(lockedProductType);
      if (lockedProductType === "mac") {
        setColor("space-black");
        setStorage("16gb");
      } else if (lockedProductType === "ipad") {
        setColor("space-black");
        setStorage("256");
      } else if (lockedProductType === "watch") {
        setColor("alpine-indigo");
        setStorage("gps-cell");
      } else if (lockedProductType === "airpods") {
        setColor("white");
        setStorage("standard-engrave");
      } else if (lockedProductType === "iphone") {
        setColor("desert");
        setStorage("128");
      }
    }
  }, [lockedProductType]);

  const products: ProductData[] = [
    {
      id: "iphone",
      label: "iPhone 16 Pro",
      tagline: "Customize & Purchase",
      description: "Choose your size, select your favorite Titanium finish, pick your storage limit, and get ready for pure performance.",
      basePricePro: 999,
      basePriceMax: 1199,
      proLabel: "iPhone 16 Pro",
      maxLabel: "iPhone 16 Pro Max",
      proDesc: "6.3-inch display • Super Retina XDR",
      maxDesc: "6.9-inch display • Largest Screen Yet",
      colors: [
        { id: "desert", name: "Desert Titanium", hex: "#c2b09c", bgGradient: "radial-gradient(circle, rgba(194,176,156,0.2) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#c2b09c]" },
        { id: "natural", name: "Natural Titanium", hex: "#9a9590", bgGradient: "radial-gradient(circle, rgba(154,149,144,0.2) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#9a9590]" },
        { id: "white", name: "White Titanium", hex: "#e3e1dc", bgGradient: "radial-gradient(circle, rgba(227,225,220,0.2) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#e3e1dc]" },
        { id: "black", name: "Black Titanium", hex: "#3c3d3f", bgGradient: "radial-gradient(circle, rgba(60,61,63,0.25) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#3c3d3f]" }
      ],
      storages: [
        { id: "128", capacity: "128 GB", priceAdd: 0 },
        { id: "256", capacity: "256 GB", priceAdd: 100 },
        { id: "512", capacity: "512 GB", priceAdd: 300 },
        { id: "1000", capacity: "1 TB", priceAdd: 500 }
      ]
    },
    {
      id: "mac",
      label: "MacBook Pro",
      tagline: "Unleash Pure Performance.",
      description: "Select your screen size, coordinate anodized space-black finishes, configure unified memory, and pick your storage capacity.",
      basePricePro: 1599,
      basePriceMax: 1999,
      proLabel: "14-inch MacBook Pro",
      maxLabel: "16-inch MacBook Pro",
      proDesc: "Liquid Retina XDR • Up to 24 hr battery",
      maxDesc: "Liquid Retina XDR • Extreme M4 Max speeds",
      colors: [
        { id: "space-black", name: "Space Black", hex: "#1c1d21", bgGradient: "radial-gradient(circle, rgba(28,29,33,0.3) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#1c1d21]" },
        { id: "silver", name: "Silver", hex: "#e3e4e6", bgGradient: "radial-gradient(circle, rgba(227,228,230,0.2) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#e3e4e6]" }
      ],
      storages: [
        { id: "16gb", capacity: "16 GB Unified Memory", priceAdd: 0 },
        { id: "24gb", capacity: "24 GB Unified Memory", priceAdd: 200 },
        { id: "32gb", capacity: "32 GB Unified Memory", priceAdd: 400 },
        { id: "48gb", capacity: "48 GB Unified Memory", priceAdd: 600 }
      ]
    },
    {
      id: "ipad",
      label: "iPad Pro (M4)",
      tagline: "Extreme Thinness. Incredible Power.",
      description: "Select your screen size, matte glass color finish, and massive storage capacity to supercharge your creative workflow.",
      basePricePro: 999,
      basePriceMax: 1299,
      proLabel: "11-inch iPad Pro",
      maxLabel: "13-inch iPad Pro",
      proDesc: "Ultra Retina XDR • Only 5.3 mm thin",
      maxDesc: "Ultra Retina XDR • Ultra-thin 5.1 mm",
      colors: [
        { id: "space-black", name: "Space Black", hex: "#1c1d21", bgGradient: "radial-gradient(circle, rgba(28,29,33,0.3) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#1c1d21]" },
        { id: "silver", name: "Silver Titanium", hex: "#e3e4e6", bgGradient: "radial-gradient(circle, rgba(227,228,230,0.2) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#e3e4e6]" }
      ],
      storages: [
        { id: "256", capacity: "256 GB", priceAdd: 0 },
        { id: "512", capacity: "512 GB", priceAdd: 200 },
        { id: "1000", capacity: "1 TB", priceAdd: 600 },
        { id: "2000", capacity: "2 TB", priceAdd: 1000 }
      ]
    },
    {
      id: "watch",
      label: "Apple Watch Ultra 2",
      tagline: "Built for the Extremes.",
      description: "Customize your strap and casing color options for standard GPS + Cellular 49mm aerospace grade titanium case.",
      basePricePro: 799,
      basePriceMax: 799,
      proLabel: "49mm Casing (Standard)",
      maxLabel: "49mm GPS + Cellular",
      proDesc: "Aerospace Titanium • Action Button",
      maxDesc: "GPS + Cellular • 3000 nits Screen",
      colors: [
        { id: "alpine-indigo", name: "Alpine Loop Indigo", hex: "#3a4863", bgGradient: "radial-gradient(circle, rgba(58,72,99,0.3) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#3a4863]" },
        { id: "trail-green", name: "Trail Loop Olive", hex: "#4f5e55", bgGradient: "radial-gradient(circle, rgba(79,94,85,0.3) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#4f5e55]" },
        { id: "ocean-orange", name: "Ocean Band Orange", hex: "#f37021", bgGradient: "radial-gradient(circle, rgba(243,112,33,0.2) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#f37021]" },
        { id: "ocean-black", name: "Ocean Band Black", hex: "#282828", bgGradient: "radial-gradient(circle, rgba(40,40,40,0.3) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#282828]" }
      ],
      storages: [
        { id: "gps-cell", capacity: "GPS + Cellular", priceAdd: 0 }
      ]
    },
    {
      id: "airpods",
      label: "AirPods Pro 2",
      tagline: "Re-engineered Sound.",
      description: "Order high-fidelity spatial audio AirPods Pro 2 with custom dynamic engraving support.",
      basePricePro: 249,
      basePriceMax: 249,
      proLabel: "Standard MagSafe Case",
      maxLabel: "USB-C MagSafe Case",
      proDesc: "Active Noise Cancelation • H2 Chip",
      maxDesc: "Dynamic Spatial Audio • USB-C Charging",
      colors: [
        { id: "white", name: "Apple White", hex: "#f5f5f7", bgGradient: "radial-gradient(circle, rgba(245,245,247,0.2) 0%, rgba(0,0,0,0) 80%)", phoneColor: "bg-[#f5f5f7]" }
      ],
      storages: [
        { id: "standard-engrave", capacity: "No Engraving", priceAdd: 0 },
        { id: "custom-engrave", capacity: " Engraved Case", priceAdd: 0 }
      ]
    }
  ];

  const activeProduct = products.find((p) => p.id === productType) || products[0];

  const activeColor = activeProduct.colors.find((c) => c.id === color) || activeProduct.colors[0];

  // Calculate dynamic pricing
  const basePrice = model === "pro" ? activeProduct.basePricePro : activeProduct.basePriceMax;
  const storageAdd = activeProduct.storages.find((s) => s.id === storage)?.priceAdd || 0;
  const totalPrice = basePrice + storageAdd;
  const monthlyPrice = (totalPrice / 24).toFixed(2);

  const selectedStorageLabel = activeProduct.storages.find((s) => s.id === storage)?.capacity || activeProduct.storages[0].capacity;

  return (
    <section id="customizer" className="w-full bg-zinc-950 py-24 border-t border-zinc-900 relative overflow-hidden">
      {/* Cinematic Radial Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[70vh] bg-gradient-radial from-blue-600/10 via-purple-600/3 to-transparent blur-[140px] pointer-events-none -z-25" />
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[110px] pointer-events-none -z-25" />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-violet-600/5 blur-[130px] pointer-events-none -z-25" />

      {/* Dynamic light halo matched to chosen device color */}
      <div 
        style={{ 
          background: `radial-gradient(circle at center, ${activeColor.hex}18 0%, ${activeColor.hex}03 50%, transparent 100%)` 
        }} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] pointer-events-none transition-all duration-750 blur-[90px] -z-10" 
      />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Step 0: Global Switch Board */}
        {!lockedProductType && (
          <div className="flex justify-center items-center space-x-3 mb-10">
            {[
              { id: "iphone", icon: Smartphone, label: "iPhone" },
              { id: "mac", icon: Laptop, label: "Mac" },
              { id: "ipad", icon: Laptop, label: "iPad" },
              { id: "watch", icon: Watch, label: "Watch" },
              { id: "airpods", icon: Headphones, label: "AirPods" }
            ].map((prod) => {
              const Icon = prod.icon;
              return (
                <button
                  key={prod.id}
                  onClick={() => {
                    const targetProduct = products.find((p) => p.id === prod.id) || products[0];
                    setProductType(prod.id as ProductType);
                    setModel("pro");
                    setColor(targetProduct.colors[0].id);
                    setStorage(targetProduct.storages[0].id);
                  }}
                  className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full border transition-all duration-300 ${
                    productType === prod.id
                      ? "bg-white border-white text-black shadow-lg shadow-white/5"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-450 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{prod.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 mb-16"
        >
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xs uppercase tracking-widest text-blue-500 font-bold font-display">{activeProduct.tagline}</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
            Configure your {activeProduct.label}.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-zinc-300 text-sm md:text-base max-w-lg mx-auto font-normal leading-relaxed">
            {activeProduct.description}
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* Dynamic Graphic Visual Render Viewport */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            
            {productType === "iphone" && (
              <div 
                className="relative w-[280px] h-[560px] flex items-center justify-center select-none perspective-[1500px]"
                style={{ perspective: "1500px" }}
              >
                <motion.div
                  className="w-full h-full relative"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: 360 }}
                  transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                >
                  {/* Depth Edge Stack (Creates the 3D metal frame) */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={`edge-${i}`}
                      className={`absolute inset-0 rounded-[48px] border-4 border-black/20 ${activeColor.phoneColor} transition-colors duration-500 opacity-80`}
                      style={{ 
                        transform: `translateZ(${10 - i}px)`,
                        boxShadow: i === 10 ? '0 0 30px rgba(0,0,0,0.6)' : 'none'
                      }}
                    />
                  ))}

                  {/* Side Buttons */}
                  <div className={`absolute top-[120px] w-[20px] h-[25px] ${activeColor.phoneColor} brightness-95 border border-black/20 rounded-[2px] transition-colors duration-500`} style={{ left: '-10px', transform: 'rotateY(-90deg)' }} />
                  <div className={`absolute top-[165px] w-[20px] h-[45px] ${activeColor.phoneColor} brightness-95 border border-black/20 rounded-[2px] transition-colors duration-500`} style={{ left: '-10px', transform: 'rotateY(-90deg)' }} />
                  <div className={`absolute top-[225px] w-[20px] h-[45px] ${activeColor.phoneColor} brightness-95 border border-black/20 rounded-[2px] transition-colors duration-500`} style={{ left: '-10px', transform: 'rotateY(-90deg)' }} />
                  <div className={`absolute top-[170px] w-[20px] h-[65px] ${activeColor.phoneColor} brightness-95 border border-black/20 rounded-[2px] transition-colors duration-500`} style={{ right: '-10px', transform: 'rotateY(90deg)' }} />

                  {/* Front Face (Screen) */}
                  <div 
                    className="absolute inset-0 rounded-[48px] border-[12px] border-black bg-black overflow-hidden flex flex-col items-center"
                    style={{ transform: "translateZ(11px)", backfaceVisibility: "hidden" }}
                  >
                    {/* Screen Wallpaper (Custom Sand/Titanium Mesh) */}
                    <div className="absolute inset-0 bg-[#0d0d0d] overflow-hidden">
                      <div className="absolute -top-[10%] -right-[20%] w-[120%] h-[120%] bg-[#b8a798] rounded-full blur-[80px] opacity-80"></div>
                      <div className="absolute top-[20%] -left-[40%] w-[120%] h-[120%] bg-[#000000] rounded-full blur-[90px]"></div>
                      <div className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-[#cfc2b6] rounded-full blur-[70px] opacity-60"></div>
                      <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
                    </div>
                    
                    {/* Dynamic Island */}
                    <div className="w-[85px] h-[28px] bg-black rounded-full mt-2 relative z-10 shadow-md flex items-center justify-end px-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800/80 mr-1.5 flex items-center justify-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60 blur-[1px]"></div>
                      </div>
                    </div>
                    
                    {/* Lock Screen Info */}
                    <div className="mt-6 flex flex-col items-center z-10 font-sans tracking-tight">
                      <span className="text-white/90 text-xs font-semibold">Friday, April 5</span>
                      <span className="text-white text-[70px] font-medium leading-none mt-1 -ml-1">2:06</span>
                    </div>
                    
                    {/* Home Bar */}
                    <div className="absolute bottom-2.5 w-[90px] h-[4px] bg-white rounded-full z-10"></div>
                  </div>

                  {/* Back Face */}
                  <div 
                    className={`absolute inset-0 rounded-[48px] flex flex-col justify-start p-4 ${activeColor.phoneColor} transition-colors duration-500`}
                    style={{ transform: "rotateY(180deg) translateZ(11px)", backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-white/[0.04] rounded-[48px] pointer-events-none" />

                    {/* Dual Camera Module (Vertical layout mimicking base models) */}
                    <div 
                      className="absolute top-5 left-5 w-[80px] h-[150px] rounded-[35px] bg-black/15 border border-white/10 backdrop-blur-md p-3 flex flex-col items-center justify-between shadow-2xl"
                      style={{ transform: "translateZ(4px)" }}
                    >
                      <div className="w-[54px] h-[54px] rounded-full bg-zinc-900 border-[3px] border-zinc-800/80 flex items-center justify-center shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                        <div className="w-6 h-6 rounded-full bg-zinc-950 border border-blue-900/40 flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-400/40 rounded-full blur-[1px]"></div>
                        </div>
                      </div>
                      <div className="w-[54px] h-[54px] rounded-full bg-zinc-900 border-[3px] border-zinc-800/80 flex items-center justify-center shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                        <div className="w-6 h-6 rounded-full bg-zinc-950 border border-blue-900/40 flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-400/40 rounded-full blur-[1px]"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Flash & Mic next to bump */}
                    <div className="absolute top-[85px] left-[115px] flex flex-col space-y-4 items-center" style={{ transform: "translateZ(3px)" }}>
                        <div className="w-4 h-4 rounded-full bg-amber-100/90 shadow-[0_0_12px_rgba(255,255,255,0.7)] border border-white/40"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-black shadow-inner"></div>
                    </div>

                    {/* Reflective Apple Logo */}
                    <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%) translateZ(2px)" }}>
                      <svg className="w-[48px] h-[48px] fill-current text-white/30 hover:text-white/50 transition-colors" viewBox="0 0 170 170">
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.38-6.12-3.24-2.65-7.07-7.24-11.51-13.8-5.19-7.73-9.45-16.14-12.77-25.2-3.32-9.06-4.99-17.89-4.99-26.47 0-12.87 3.32-23.72 9.97-32.56 6.64-8.83 15.01-13.31 25.11-13.43 4.48-.07 9.53 1.27 15.17 4.02 5.64 2.75 9.7 4.12 12.19 4.12 2.11 0 6.09-1.28 11.95-3.85 5.86-2.57 10.98-3.76 15.36-3.57 12.42.53 22.18 5.08 29.28 13.63-9.97 6.08-14.86 14.16-14.68 24.23.19 8.1 3.12 14.82 8.79 20.17 5.68 5.35 12.44 8.29 20.3 8.81 1.77 5.56 3.65 11.12 5.64 16.68zm-21.84-110.05c0 6.35-2.28 12.41-6.84 18.17-4.56 5.76-10.13 9.68-16.71 11.77-.38-5.56 1.83-11.45 6.65-17.65 4.82-6.2 10.6-10.22 17.34-12.06.38.45.92 1.4 1.56 2.87.64 1.47 1 3.1 1 4.9z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {productType === "mac" && (
              <div className="relative w-[340px] h-[520px] md:w-[440px] md:h-[580px] flex items-center justify-center select-none perspective-[2000px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 blur-[100px] pointer-events-none z-0" />
                <motion.div
                  key={color}
                  initial={{ opacity: 0.8, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-[360px] md:w-[480px] z-10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/macbook_pro.png" alt="MacBook Pro" className="w-full h-auto object-contain drop-shadow-2xl animate-float" />
                </motion.div>
              </div>
            )}

            {productType === "ipad" && (
              <div className="relative w-[300px] h-[520px] md:w-[340px] md:h-[580px] flex flex-col items-center justify-center select-none">
                <motion.div
                  key={color}
                  initial={{ opacity: 0.8, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-[280px] z-10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/ipad_pro.png" alt="iPad Pro" className="w-full h-auto object-contain drop-shadow-2xl animate-float" />
                </motion.div>
                <div className="absolute bottom-6 flex flex-col items-center space-y-1">
                  <span className="text-[10px] text-blue-500 font-extrabold uppercase tracking-widest font-display">Extreme Thinness</span>
                  <span className="text-xs text-zinc-300">Just 5.1mm - Thinnest Apple Product Ever</span>
                </div>
              </div>
            )}

            {productType === "watch" && (
              <div className="relative w-[260px] h-[520px] md:w-[290px] md:h-[580px] flex items-center justify-center select-none">
                <motion.div
                  key={color}
                  initial={{ opacity: 0.8, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-[240px] z-10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/apple_watch.png" alt="Apple Watch" className="w-full h-auto object-contain drop-shadow-2xl animate-float" />
                </motion.div>
              </div>
            )}

            {productType === "airpods" && (
              <div className="relative w-[260px] h-[520px] md:w-[290px] md:h-[580px] flex items-center justify-center select-none">
                <motion.div
                  key={storage}
                  initial={{ opacity: 0.8, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative w-[190px] h-[190px] rounded-[50px] bg-zinc-100 border-[6px] border-zinc-200 shadow-[0_20px_50px_rgba(255,255,255,0.05)] flex flex-col justify-between p-6"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  <div className="absolute top-[50px] left-0 w-full h-1 bg-zinc-300" />
                  
                  <div className="absolute bottom-[35px] left-1/2 -translate-x-1/2 text-center">
                    {storage === "custom-engrave" ? (
                      <span className="text-[10px] font-bold font-display text-zinc-400 bg-zinc-200/50 border border-zinc-300/40 px-3 py-1 rounded-full uppercase tracking-wider"> Apple</span>
                    ) : (
                      <span className="text-[9px] font-semibold text-zinc-350 italic">Clean Case Finish</span>
                    )}
                  </div>

                  <div className="absolute right-[4px] top-1/2 -translate-y-1/2 w-[8px] h-[24px] rounded-r-md bg-zinc-300 border-l border-zinc-400" />
                </motion.div>
              </div>
            )}

            {/* Finish label tag */}
            <div className="mt-6 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur-md">
              <p className="text-xs text-zinc-300 font-medium tracking-wide">{activeColor.name}</p>
            </div>
          </div>

          {/* Configurator Controls Area */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            
            {/* 1. Size/Model Selection */}
            {activeProduct.basePricePro !== activeProduct.basePriceMax && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Step 1: Choose Your Casing Size</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setModel("pro")}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 ${
                      model === "pro"
                        ? "bg-zinc-900 border-white text-white shadow-lg"
                        : "bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex justify-between w-full items-center">
                      <span className="font-bold text-sm">{activeProduct.proLabel}</span>
                      {model === "pro" && <Check className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="mt-3 text-xs font-light text-zinc-450">{activeProduct.proDesc}</div>
                    <div className="mt-4 text-xs font-bold">From ${activeProduct.basePricePro}</div>
                  </button>

                  <button
                    onClick={() => setModel("max")}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 ${
                      model === "max"
                        ? "bg-zinc-900 border-white text-white shadow-lg"
                        : "bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex justify-between w-full items-center">
                      <span className="font-bold text-sm">{activeProduct.maxLabel}</span>
                      {model === "max" && <Check className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="mt-3 text-xs font-light text-zinc-450">{activeProduct.maxDesc}</div>
                    <div className="mt-4 text-xs font-bold">From ${activeProduct.basePriceMax}</div>
                  </button>
                </div>
              </div>
            )}

            {/* 2. Color Selection */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                {productType === "watch" ? "Step 2: Pick Strap Design" : "Step 2: Pick Casing Finish"}
              </p>
              <div className="flex items-center space-x-4">
                {activeProduct.colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setColor(c.id)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 relative flex items-center justify-center ${
                      color === c.id 
                        ? "border-blue-500 scale-110 shadow-lg shadow-blue-500/20" 
                        : "border-transparent hover:border-zinc-500"
                    }`}
                  >
                    {color === c.id && <Check className="w-4 h-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Storage Option Selection */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                {productType === "mac" ? "Step 3: Configure Unified Memory" : productType === "airpods" ? "Step 3: Personalize Engraving" : "Step 3: Select Capacity"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {activeProduct.storages.map((s) => {
                  const isLocked = productType === "iphone" && model === "max" && s.id === "128";
                  return (
                    <button
                      key={s.id}
                      disabled={isLocked}
                      onClick={() => setStorage(s.id)}
                      className={`p-4 rounded-xl border text-center transition-all duration-300 relative ${
                        isLocked
                          ? "opacity-30 cursor-not-allowed border-zinc-900 text-zinc-600 bg-zinc-950/20"
                          : storage === s.id
                          ? "bg-zinc-900 border-white text-white shadow-md"
                          : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800"
                      }`}
                    >
                      <span className="block text-xs font-bold">{s.capacity}</span>
                      {s.priceAdd > 0 ? (
                        <span className="block text-[10px] text-zinc-450 mt-1">+${s.priceAdd}</span>
                      ) : (
                        <span className="block text-[10px] text-green-400 mt-1">Included</span>
                      )}
                      {isLocked && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-[9px] font-bold text-zinc-500 uppercase rounded-xl tracking-wider">Locked</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Pricing Box */}
            <div className="border-t border-zinc-900 pt-6 space-y-6">
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-display">Total Retail Pricing</span>
                <div className="flex items-baseline space-x-2">
                  <h3 className="text-3xl font-extrabold text-white font-display">${totalPrice}</h3>
                  <span className="text-xs text-zinc-300 font-normal">or ${monthlyPrice}/mo. for 24 mo.*</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] text-zinc-400 pt-1">
                  <Info className="w-3 h-3 text-blue-500" />
                  <span className="font-medium">0% APR financing available with Apple Card.</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onAddToCart) {
                    onAddToCart({
                      name: activeProduct.label + (activeProduct.basePricePro !== activeProduct.basePriceMax ? (model === "pro" ? ` (${activeProduct.proLabel})` : ` (${activeProduct.maxLabel})`) : ""),
                      colorName: activeColor.name,
                      capacity: selectedStorageLabel,
                      price: totalPrice,
                      monthly: monthlyPrice,
                      hex: activeColor.hex,
                    });
                  } else {
                    setPreordered(true);
                  }
                }}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-8 py-4 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/35"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Pre-order Now</span>
              </button>
            </div>

            {/* Apple Warranty Badge */}
            <div className="flex items-center space-x-3 bg-zinc-900/40 border border-zinc-900 p-4 rounded-2xl">
              <Shield className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-200">AppleCare+ Eligible</p>
                <p className="text-[10px] text-zinc-500">Get unlimited repairs for accidental damage protection and expert Apple support.</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Pre-order Success Drawer Panel */}
      <AnimatePresence>
        {preordered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-8 shadow-2xl relative"
            >
              {/* Receipt decoration lines */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 rounded-t-3xl" />
              
              <div className="flex flex-col items-center text-center space-y-6">
                
                {/* Success Icon */}
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500 flex items-center justify-center shadow-lg shadow-green-500/10">
                  <Check className="w-8 h-8 text-green-500" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-white font-display">Pre-ordered Successfully!</h3>
                  <p className="text-xs text-zinc-300 font-normal">Your configuration is locked. We&apos;ve sent your order receipt to your Apple ID email.</p>
                </div>

                {/* Receipt Grid details */}
                <div className="w-full bg-zinc-950/80 border border-zinc-850 p-5 rounded-2xl space-y-3.5 text-xs text-left">
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-500">Product selected</span>
                    <span className="font-bold text-white uppercase">{activeProduct.label}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-500">Finish/Strap</span>
                    <span className="font-bold text-white">{activeColor.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-500">Choice details</span>
                    <span className="font-bold text-white">{selectedStorageLabel}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-500">Financing choice</span>
                    <span className="font-bold text-blue-400">24x Mo. Installments</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-sm font-bold text-zinc-350">Total Price</span>
                    <span className="text-sm font-extrabold text-white font-display">${totalPrice} (${monthlyPrice}/mo.)</span>
                  </div>
                </div>

                {/* Sub-actions */}
                <div className="w-full flex flex-col space-y-2">
                  <button
                    onClick={() => setPreordered(false)}
                    className="w-full bg-white hover:bg-zinc-200 text-black text-xs font-bold py-3.5 rounded-full transition-colors"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      setPreordered(false);
                      const el = document.getElementById("support");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full text-zinc-400 hover:text-white text-xs font-semibold py-2 transition-colors"
                  >
                    Find nearby store pickup options &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
