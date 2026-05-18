"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, ChevronRight, Play, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CartItem } from "@/components/iPhoneCustomizer";

interface HeroProps {
  cartItems?: CartItem[];
  onRemoveCartItem?: (cartId: number) => void;
  onClearCart?: () => void;
  cartOpenTrigger?: boolean;
  onResetCartTrigger?: () => void;
  navOnly?: boolean;
}

const dropdownData: Record<string, {
  shopTitle: string;
  shopItems: { label: string; href: string }[];
  quickTitle: string;
  quickItems: { label: string; href: string; action?: string }[];
  specialTitle: string;
  specialItems: { label: string; href: string }[];
}> = {
  Store: {
    shopTitle: "Shop",
    shopItems: [
      { label: "Shop the Latest", href: "/store" },
      { label: "Mac", href: "/mac" },
      { label: "iPad", href: "/ipad" },
      { label: "iPhone", href: "/iphone" },
      { label: "Apple Watch", href: "/watch" },
      { label: "AirPods", href: "/airpods" },
      { label: "Accessories", href: "/store" }
    ],
    quickTitle: "Quick Links",
    quickItems: [
      { label: "Order Status", href: "#", action: "cart" },
      { label: "Find a Store", href: "/support" },
      { label: "Genius Bar", href: "/support" }
    ],
    specialTitle: "Shop Special Stores",
    specialItems: [
      { label: "Education", href: "/store" },
      { label: "Business", href: "/store" },
      { label: "Certified Refurbished", href: "/store" }
    ]
  },
  Mac: {
    shopTitle: "Explore Mac",
    shopItems: [
      { label: "MacBook Air", href: "/mac" },
      { label: "MacBook Pro", href: "/mac" },
      { label: "iMac", href: "/mac" },
      { label: "Mac mini", href: "/mac" },
      { label: "Mac Studio", href: "/mac" },
      { label: "Mac Pro", href: "/mac" }
    ],
    quickTitle: "Shop Mac",
    quickItems: [
      { label: "Shop Mac", href: "/store" },
      { label: "Mac Accessories", href: "/store" },
      { label: "Financing", href: "/store" }
    ],
    specialTitle: "More from Mac",
    specialItems: [
      { label: "Mac Support", href: "/support" },
      { label: "macOS Sequoia", href: "/support" },
      { label: "Apple Intelligence", href: "/iphone" }
    ]
  },
  iPad: {
    shopTitle: "Explore iPad",
    shopItems: [
      { label: "iPad Pro (M4)", href: "/ipad" },
      { label: "iPad Air", href: "/ipad" },
      { label: "iPad", href: "/ipad" },
      { label: "iPad mini", href: "/ipad" }
    ],
    quickTitle: "Shop iPad",
    quickItems: [
      { label: "Shop iPad", href: "/store" },
      { label: "iPad Accessories", href: "/store" },
      { label: "Apple Pencil", href: "/store" }
    ],
    specialTitle: "More from iPad",
    specialItems: [
      { label: "iPad Support", href: "/support" },
      { label: "iPadOS 18", href: "/support" },
      { label: "Creative Workflows", href: "/ipad" }
    ]
  },
  iPhone: {
    shopTitle: "Explore iPhone",
    shopItems: [
      { label: "iPhone 16 Pro", href: "/iphone" },
      { label: "iPhone 16", href: "/iphone" },
      { label: "iPhone 15 Pro", href: "/iphone" },
      { label: "iPhone 14", href: "/iphone" },
      { label: "iPhone SE", href: "/iphone" }
    ],
    quickTitle: "Shop iPhone",
    quickItems: [
      { label: "Shop iPhone", href: "/store" },
      { label: "iPhone Accessories", href: "/store" },
      { label: "Apple Trade In", href: "/store" }
    ],
    specialTitle: "More from iPhone",
    specialItems: [
      { label: "iPhone Support", href: "/support" },
      { label: "iOS 18 Features", href: "/support" },
      { label: "Apple Intelligence", href: "/iphone" }
    ]
  },
  Watch: {
    shopTitle: "Explore Watch",
    shopItems: [
      { label: "Apple Watch Ultra 2", href: "/watch" },
      { label: "Apple Watch Series 10", href: "/watch" },
      { label: "Apple Watch SE", href: "/watch" }
    ],
    quickTitle: "Shop Watch",
    quickItems: [
      { label: "Shop Apple Watch", href: "/store" },
      { label: "Watch Bands", href: "/store" },
      { label: "Watch Accessories", href: "/store" }
    ],
    specialTitle: "More from Watch",
    specialItems: [
      { label: "Apple Watch Support", href: "/support" },
      { label: "watchOS 11", href: "/support" },
      { label: "Apple Fitness+", href: "/support" }
    ]
  },
  AirPods: {
    shopTitle: "Explore AirPods",
    shopItems: [
      { label: "AirPods 4", href: "/airpods" },
      { label: "AirPods Pro 2", href: "/airpods" },
      { label: "AirPods Max", href: "/airpods" }
    ],
    quickTitle: "Shop AirPods",
    quickItems: [
      { label: "Shop AirPods", href: "/store" },
      { label: "AirPods Charging Cases", href: "/store" }
    ],
    specialTitle: "More from AirPods",
    specialItems: [
      { label: "AirPods Support", href: "/support" },
      { label: "Spatial Audio Hub", href: "/airpods" }
    ]
  },
  Support: {
    shopTitle: "Explore Support",
    shopItems: [
      { label: "Genius Bar Locator", href: "/support" },
      { label: "AppleCare+ Options", href: "/support" },
      { label: "Check Coverage Status", href: "/support" }
    ],
    quickTitle: "Help Topics",
    quickItems: [
      { label: "iPhone Help Center", href: "/support" },
      { label: "Mac Hardware Support", href: "/support" },
      { label: "Apple ID Help", href: "/support" }
    ],
    specialTitle: "Resources",
    specialItems: [
      { label: "Apple Communities", href: "/support" },
      { label: "Service & Repairs", href: "/support" },
      { label: "Contact Customer Support", href: "/support" }
    ]
  },
  "TV & Home": {
    shopTitle: "Explore TV & Home",
    shopItems: [
      { label: "Apple TV 4K", href: "/tv-home" },
      { label: "HomePod", href: "/tv-home" },
      { label: "HomePod mini", href: "/tv-home" },
      { label: "Siri Remote", href: "/tv-home" }
    ],
    quickTitle: "Shop TV & Home",
    quickItems: [
      { label: "Shop TV & Home", href: "/store" },
      { label: "TV & Home Accessories", href: "/store" }
    ],
    specialTitle: "More from TV & Home",
    specialItems: [
      { label: "Apple TV Support", href: "/support" },
      { label: "Apple TV App", href: "/tv-home" },
      { label: "Home App", href: "/tv-home" }
    ]
  },
  Entertainment: {
    shopTitle: "Explore Entertainment",
    shopItems: [
      { label: "Apple One", href: "/entertainment" },
      { label: "Apple TV+", href: "/entertainment" },
      { label: "Apple Music", href: "/entertainment" },
      { label: "Apple Arcade", href: "/entertainment" },
      { label: "Apple Fitness+", href: "/entertainment" },
      { label: "Apple Podcasts", href: "/entertainment" },
      { label: "Apple Books", href: "/entertainment" }
    ],
    quickTitle: "Shop Services",
    quickItems: [
      { label: "Gift Cards", href: "/store" },
      { label: "Bundle Services", href: "/entertainment" }
    ],
    specialTitle: "Support & Accounts",
    specialItems: [
      { label: "Manage Apple ID", href: "/support" },
      { label: "Entertainment Support", href: "/support" }
    ]
  }
};

export default function Hero({
  cartItems = [],
  onRemoveCartItem,
  onClearCart,
  cartOpenTrigger = false,
  onResetCartTrigger,
  navOnly = false,
}: HeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string>("Store");

  // Mouse hover coordinate tracking for subtle 3D tilt effect on the phone mockup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse positions into subtle degrees of rotation
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  const glowX = useTransform(mouseX, [-300, 300], ["30%", "70%"]);
  const glowY = useTransform(mouseY, [-300, 300], ["30%", "70%"]);

  const searchItems = [
    { title: "iPhone 16 Pro Configurator", section: "customizer", category: "Store" },
    { title: "Desert Titanium Finish", section: "customizer", category: "Design" },
    { title: "Natural Titanium Finish", section: "customizer", category: "Design" },
    { title: "White Titanium Finish", section: "customizer", category: "Design" },
    { title: "Black Titanium Finish", section: "customizer", category: "Design" },
    { title: "iPad Pro (M4) chip", section: "product-tabs", category: "Ecosystem" },
    { title: "Apple Watch Ultra 2 rugged", section: "product-tabs", category: "Ecosystem" },
    { title: "AirPods Pro 2 Active Noise Cancel", section: "product-tabs", category: "Ecosystem" },
    { title: "48MP Fusion Camera Viewfinder", section: "camera", category: "Camera" },
    { title: "Photographic Styles & Night Mode", section: "camera", category: "Camera" },
    { title: "120Hz ProMotion Scroll Simulator", section: "promotion", category: "Screen" },
    { title: "Compare Specifications Table", section: "compare", category: "Compare" },
    { title: "Genius Bar booking appointment", section: "support", category: "Support" },
    { title: "Flagship Retail Store Locator", section: "support", category: "Support" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cartOpenTrigger) {
      const timer = setTimeout(() => {
        setCartOpen(true);
      }, 0);
      if (onResetCartTrigger) onResetCartTrigger();
      return () => clearTimeout(timer);
    }
  }, [cartOpenTrigger, onResetCartTrigger]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Create a smooth ScrollTrigger timeline that moves the phone mockup left and fades text
      const phone = document.querySelector(".hero-phone-mockup");
      const textSection = document.querySelector(".hero-title-section");

      if (phone && textSection) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-trigger-container",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          }
        });

        tl.to(phone, {
          x: () => (window.innerWidth >= 768 ? "-22vw" : "0vw"),
          y: () => (window.innerWidth >= 768 ? "12vh" : "4vh"),
          scale: () => (window.innerWidth >= 768 ? 1.15 : 1.05),
          rotation: -8,
          ease: "power1.out",
        })
        .to(textSection, {
          opacity: 0,
          y: -60,
          scale: 0.95,
          ease: "power1.out",
        }, 0);
      }
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = parseFloat((subtotal * 0.0875).toFixed(2));
  const total = subtotal + tax;

  const desktopLinks = [
    { label: "Store", href: "/store" },
    { label: "Mac", href: "/mac" },
    { label: "iPad", href: "/ipad" },
    { label: "iPhone", href: "/iphone" },
    { label: "Watch", href: "/watch" },
    { label: "AirPods", href: "/airpods" },
    { label: "TV & Home", href: "/tv-home" },
    { label: "Entertainment", href: "/entertainment" },
    { label: "Accessories", href: "/store" },
    { label: "Support", href: "/support" }
  ];

  const activeDropdown = dropdownData[hoveredLink] || dropdownData["Store"];

  return (
    <section id="hero-trigger-container" className={`relative w-full bg-black flex flex-col justify-between overflow-hidden ${navOnly ? "h-fit min-h-0 py-0" : "min-h-screen"}`}>
      {/* Sticky Global Navigation with Hover Dropdown Container */}
      <nav
        onMouseLeave={() => setDropdownOpen(false)}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || dropdownOpen ? "glass-nav py-3" : "bg-black/0 py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <svg
              className="w-5 h-5 fill-current text-white hover:text-gray-300 transition-colors"
              viewBox="0 0 170 170"
            >
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.38-6.12-3.24-2.65-7.07-7.24-11.51-13.8-5.19-7.73-9.45-16.14-12.77-25.2-3.32-9.06-4.99-17.89-4.99-26.47 0-12.87 3.32-23.72 9.97-32.56 6.64-8.83 15.01-13.31 25.11-13.43 4.48-.07 9.53 1.27 15.17 4.02 5.64 2.75 9.7 4.12 12.19 4.12 2.11 0 6.09-1.28 11.95-3.85 5.86-2.57 10.98-3.76 15.36-3.57 12.42.53 22.18 5.08 29.28 13.63-9.97 6.08-14.86 14.16-14.68 24.23.19 8.1 3.12 14.82 8.79 20.17 5.68 5.35 12.44 8.29 20.3 8.81 1.77 5.56 3.65 11.12 5.64 16.68zm-21.84-110.05c0 6.35-2.28 12.41-6.84 18.17-4.56 5.76-10.13 9.68-16.71 11.77-.38-5.56 1.83-11.45 6.65-17.65 4.82-6.2 10.6-10.22 17.34-12.06.38.45.92 1.4 1.56 2.87.64 1.47 1 3.1 1 4.9z" />
            </svg>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-[11px] font-normal tracking-wide text-zinc-350 select-none">
            {desktopLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => {
                  setDropdownOpen(true);
                  setHoveredLink(link.label);
                }}
                className="hover:text-white cursor-pointer transition-colors duration-200"
                onClick={() => setDropdownOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search, Bag and Menu */}
          <div className="flex items-center space-x-6 text-zinc-400">
            <Search 
              className="w-4 h-4 hover:text-white cursor-pointer transition-colors" 
              onClick={() => setSearchOpen(true)}
            />
            <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="w-4 h-4 hover:text-white transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 border border-black text-[9px] font-extrabold text-white flex items-center justify-center rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                  {cartItems.length}
                </span>
              )}
            </div>
            <div className="md:hidden cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 hover:text-white" />}
            </div>
          </div>
        </div>

        {/* Mega Hover Dropdown Panel */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-full w-full bg-zinc-950/98 border-b border-zinc-900 overflow-hidden shadow-2xl z-40"
            >
              <div className="max-w-6xl mx-auto px-12 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 text-left select-none">
                
                {/* Column 1: Dynamic Shop */}
                <div className="md:col-span-6 space-y-4">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{activeDropdown.shopTitle}</p>
                  <div className="space-y-1">
                    {activeDropdown.shopItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="font-display text-[26px] font-semibold text-zinc-100 hover:text-white cursor-pointer transition-colors block leading-tight py-1.5"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 2: Dynamic Quick Links */}
                <div className="md:col-span-3 space-y-4">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{activeDropdown.quickTitle}</p>
                  <div className="space-y-3">
                    {activeDropdown.quickItems.map((item) => {
                      if (item.action === "cart") {
                        return (
                          <span
                            key={item.label}
                            onClick={() => {
                              setDropdownOpen(false);
                              setCartOpen(true);
                            }}
                            className="text-xs font-semibold text-zinc-300 hover:text-blue-450 cursor-pointer block transition-colors"
                          >
                            {item.label}
                          </span>
                        );
                      }
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setDropdownOpen(false)}
                          className="text-xs font-semibold text-zinc-300 hover:text-blue-450 cursor-pointer block transition-colors"
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Column 3: Dynamic Special Stores */}
                <div className="md:col-span-3 space-y-4">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{activeDropdown.specialTitle}</p>
                  <div className="space-y-3">
                    {activeDropdown.specialItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="text-xs font-semibold text-zinc-300 hover:text-blue-450 cursor-pointer block transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-black z-40 pt-20 px-10 flex flex-col space-y-6 text-xl text-gray-305 font-light"
          >
            {desktopLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-white cursor-pointer transition-colors border-b border-zinc-800 pb-3 block text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Main Hero Container */}
      {!navOnly && (
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="max-w-6xl mx-auto px-6 w-full flex-grow flex flex-col md:flex-row items-center justify-between pt-32 pb-20 md:py-0"
        >
        {/* Intro text */}
        <div className="hero-title-section text-center md:text-left space-y-6 select-none md:max-w-lg">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-widest text-blue-500 font-bold font-display"
          >
            Introducing
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-none bg-gradient-to-b from-white to-zinc-200 bg-clip-text text-transparent font-display"
          >
            iPhone 16 Pro
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-zinc-300 font-normal max-w-md mx-auto md:mx-0 leading-relaxed"
          >
            Built for Apple Intelligence. Stronger. Lighter. Titanium.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center md:justify-start space-x-4 pt-4"
          >
            <button
              onClick={() => scrollToSection("customizer")}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-3 rounded-full flex items-center group transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
            >
              Pre-order
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection("camera")}
              className="border border-zinc-700 hover:border-zinc-500 bg-zinc-950/40 hover:bg-zinc-900/50 text-white text-sm font-medium px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 backdrop-blur-md"
            >
              <Play className="w-3.5 h-3.5 fill-current text-blue-500" />
              <span>Camera Demo</span>
            </button>
          </motion.div>
        </div>

        {/* 3D-like Mockup Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX, rotateY, perspective: 1200, transformStyle: "preserve-3d" }}
          className="hero-phone-mockup mt-16 md:mt-0 relative w-[280px] h-[570px] md:w-[320px] md:h-[650px] z-10 cursor-grab active:cursor-grabbing group mx-auto md:mx-0"
        >
          {/* Floating breathing animation container wrapper */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            
            {/* ONE TRULY 3D PHONE MODEL: LAYERS IN PERSPECTIVE */}
            
            {/* LAYER 1: Ambient Shadow & Glow Plate (translateZ(-40px)) */}
            <div 
              style={{ transform: "translateZ(-40px)", filter: "blur(8px)" }}
              className="absolute inset-2 rounded-[50px] bg-black/80 pointer-events-none -z-10"
            />
            
            {/* LAYER 2: Rear Plate/Inner Chassis (translateZ(-15px)) */}
            <div 
              style={{ transform: "translateZ(-15px)" }}
              className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-zinc-800 to-zinc-950 border-[2px] border-zinc-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-none"
            />

            {/* LAYER 3: Main Outer Bezel/Chassis Rim & Physical Buttons (translateZ(0px)) */}
            <div 
              style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
              className="absolute inset-0 rounded-[50px] bg-zinc-900 border-[6px] border-zinc-700 shadow-2xl flex flex-col justify-between p-[5px] transform-gpu"
            >
              {/* Protruding Side Buttons styled in 3D space */}
              <div 
                style={{ transform: "translateZ(4px) rotateY(-90deg)", transformOrigin: "left" }} 
                className="absolute top-[75px] -left-[3px] w-[3px] h-[18px] bg-zinc-600 rounded-r-sm shadow-md" 
              /> {/* Action Button */}
              <div 
                style={{ transform: "translateZ(4px) rotateY(-90deg)", transformOrigin: "left" }} 
                className="absolute top-[110px] -left-[3px] w-[3px] h-[36px] bg-zinc-600 rounded-r-sm shadow-md" 
              /> {/* Volume Up */}
              <div 
                style={{ transform: "translateZ(4px) rotateY(-90deg)", transformOrigin: "left" }} 
                className="absolute top-[160px] -left-[3px] w-[3px] h-[36px] bg-zinc-600 rounded-r-sm shadow-md" 
              /> {/* Volume Down */}
              <div 
                style={{ transform: "translateZ(4px) rotateY(90deg)", transformOrigin: "right" }} 
                className="absolute top-[135px] -right-[3px] w-[3px] h-[48px] bg-zinc-650 rounded-l-sm shadow-md border border-zinc-700/50" 
              /> {/* Power / Camera Control */}

              {/* LAYER 4: OLED Display Screen Glass Panel (translateZ(20px)) */}
              <div 
                style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
                className="relative w-full h-full rounded-[42px] bg-black overflow-hidden flex flex-col justify-between p-6 transform-gpu"
              >
                {/* Concentric Neon Glow Screen Wallpaper */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-zinc-900 to-purple-950/80 z-0 pointer-events-none" />
                <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[160px] h-[160px] rounded-full border border-purple-500/20 bg-purple-600/5 blur-[4px] z-1 animate-pulse-slow pointer-events-none" />
                <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-[130px] h-[130px] rounded-full border border-blue-500/20 bg-blue-600/5 blur-[5px] z-1 pointer-events-none" />
                
                {/* Ambient dynamic cursor interactive tracking glow inside screen */}
                <motion.div 
                  style={{
                    background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(41,151,255,0.45) 0%, rgba(139,92,246,0.25) 50%, rgba(0,0,0,0) 100%)`
                  }}
                  className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen pointer-events-none"
                />

                {/* LAYER 5: Floating Dynamic Island Notch & Siri Emblem (translateZ(35px)) */}
                <div 
                  style={{ transform: "translateZ(35px)" }}
                  className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-black rounded-full border border-zinc-900/30 flex items-center justify-between px-2.5 z-30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] transform-gpu"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 flex items-center justify-center">
                    <div className="w-1.2 h-1.2 rounded-full bg-blue-900/40" />
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                </div>

                {/* Status Bar */}
                <div 
                  style={{ transform: "translateZ(30px)" }}
                  className="flex justify-between items-center text-[10px] text-zinc-400 font-semibold px-2 z-10 transform-gpu"
                >
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-zinc-400 rounded-sm" />
                    <span className="w-3.5 h-2 bg-zinc-400 rounded-sm" />
                  </div>
                </div>

                {/* Siri Intelligence core emblem ring */}
                <div 
                  style={{ transform: "translateZ(30px)" }}
                  className="w-full h-full flex flex-col justify-center items-center text-center space-y-4 pt-10 z-10 transform-gpu"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center shadow-[0_0_30px_rgba(41,151,255,0.2)]"
                  >
                    <div className="w-16 h-16 rounded-full border border-violet-500/30 bg-gradient-to-tr from-cyan-400/20 via-pink-500/10 to-indigo-500/30 blur-[3px]" />
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold tracking-wider text-zinc-100 uppercase font-display">Hello, Apple Intelligence</h3>
                    <p className="text-[11px] text-zinc-400 max-w-[200px] leading-relaxed mx-auto font-normal">Ready to craft your custom notification digests in seconds.</p>
                  </div>
                </div>

                {/* Swipe line */}
                <div 
                  style={{ transform: "translateZ(30px)" }}
                  className="w-28 h-[3.5px] bg-white/40 rounded-full mx-auto z-10 transform-gpu" 
                />
              </div>

              {/* LAYER 6: Specular Screen Glare Sheet (translateZ(45px)) */}
              <motion.div
                style={{ transform: "translateZ(45px)", skewX: 12 }}
                animate={{ x: ["-180%", "180%"] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none z-40 transform-gpu"
              />
            </div>
            
            {/* Deep Dynamic shadow plate situated beneath phone */}
            <div className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-[240px] h-[20px] bg-black/95 rounded-full animate-shadow-breath pointer-events-none -z-10 blur-[2px]" />
          </motion.div>

          {/* Glowing Shadow Border */}
          <div className="absolute inset-0 rounded-[50px] bg-gradient-to-tr from-blue-500/15 to-violet-500/15 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none -z-10" />
        </motion.div>
      </div>
      )}

      {/* Floating specifications strip */}
      {!navOnly && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full border-t border-zinc-900 bg-zinc-950/40 backdrop-blur-md py-6 select-none z-10"
        >
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="space-y-1">
              <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-semibold">Processor</p>
              <p className="text-lg md:text-2xl font-extrabold text-zinc-100 font-display">A18 Pro Chip</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }} className="space-y-1">
              <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-semibold">Camera Sensor</p>
              <p className="text-lg md:text-2xl font-extrabold text-zinc-100 font-display">48MP Quad-Pixel</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className="space-y-1">
              <p className="text-zinc-450 text-[10px] uppercase tracking-widest font-semibold">Screen</p>
              <p className="text-lg md:text-2xl font-extrabold text-zinc-100 font-display">ProMotion 120Hz</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }} className="space-y-1">
              <p className="text-zinc-450 text-[10px] uppercase tracking-widest font-semibold">Casing</p>
              <p className="text-lg md:text-2xl font-extrabold text-zinc-100 font-display">Grade 5 Titanium</p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Search Overlay Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] flex flex-col pt-24 px-6 md:px-24"
          >
            {/* Close button */}
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-900"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto w-full space-y-8">
              <div className="relative border-b border-zinc-800 pb-4">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search apple.com..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-transparent text-xl text-white placeholder-zinc-500 focus:outline-none font-display font-medium"
                />
              </div>

              {/* Filter results */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Quick Links & Suggestions</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchItems
                    .filter((item) =>
                      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <div
                        key={item.title}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                          scrollToSection(item.section);
                        }}
                        className="p-4 bg-zinc-900/40 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 rounded-xl cursor-pointer flex flex-col justify-between space-y-2 transition-all duration-300 group"
                      >
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-sm w-fit bg-zinc-800 text-zinc-400 group-hover:bg-blue-600/10 group-hover:text-blue-400 transition-colors">
                          {item.category}
                        </span>
                        <p className="text-xs text-zinc-300 font-semibold group-hover:text-white transition-colors">{item.title}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer (Shopping Bag) */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex justify-end"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-zinc-950 border-l border-zinc-850 h-full p-8 flex flex-col justify-between relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar */}
              <div className="flex justify-between items-center border-b border-zinc-900 pb-5">
                <h3 className="text-lg font-bold font-display text-white flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-blue-500" />
                  <span>Bag ({cartItems.length})</span>
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-900 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable list */}
              <div className="flex-grow overflow-y-auto py-6 space-y-4 custom-scrollbar">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div
                      key={item.cartId || index}
                      className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl flex flex-col justify-between space-y-3 relative group overflow-hidden"
                    >
                      {/* Left finish color tag indicator */}
                      <div 
                        style={{ backgroundColor: item.hex }} 
                        className="absolute top-0 left-0 w-1 h-full opacity-65" 
                      />
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-extrabold text-white font-display">{item.name}</h4>
                          <p className="text-[10px] text-zinc-450 mt-1">
                            {item.colorName} &bull; {item.capacity}
                          </p>
                        </div>
                        <span className="text-xs font-extrabold text-zinc-100 font-display">${item.price}</span>
                      </div>

                      <div className="flex justify-between items-center text-[10px] pt-1">
                        <span className="text-zinc-500 italic">24x Mo. Financing ({item.monthly}/mo.)</span>
                        <button
                          onClick={() => {
                            if (onRemoveCartItem && item.cartId !== undefined) {
                              onRemoveCartItem(item.cartId);
                            }
                          }}
                          className="text-red-500 hover:text-red-400 hover:underline cursor-pointer transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-850">
                      <ShoppingBag className="w-6 h-6 text-zinc-650" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-zinc-300">Your Bag is empty.</p>
                      <p className="text-xs text-zinc-500">Add an iPhone 16 Pro to pre-order and review details.</p>
                    </div>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        scrollToSection("customizer");
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors mt-2"
                    >
                      Shop iPhone 16 Pro
                    </button>
                  </div>
                )}
              </div>

              {/* Pricing section and Checkout */}
              {cartItems.length > 0 && (
                <div className="border-t border-zinc-900 pt-6 space-y-5">
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span className="text-white">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Shipping</span>
                      <span className="text-green-400 font-medium">Free Express</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Estimated Tax (8.75%)</span>
                      <span className="text-white">${tax}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-zinc-900">
                      <span className="text-zinc-200">Total Price</span>
                      <span className="text-white font-display font-extrabold text-base">${total}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutSuccess(true)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-4 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
                  >
                    <span>Proceed to Checkout</span>
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Success Full Screen Modal */}
      <AnimatePresence>
        {checkoutSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[70] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-8 shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 rounded-t-3xl" />
              
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500 flex items-center justify-center shadow-lg shadow-green-500/10">
                  <Check className="w-8 h-8 text-green-500" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-white font-display">Pre-order Booked!</h3>
                  <p className="text-xs text-zinc-300 font-normal">
                    Thank you for shopping at the Apple Store. Your pre-order receipt and delivery credentials are confirmed.
                  </p>
                </div>

                <div className="w-full bg-zinc-950/80 border border-zinc-850 p-5 rounded-2xl space-y-3.5 text-xs text-left">
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-500">Shipping Mode</span>
                    <span className="font-bold text-green-400">Express Delivery</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-500">Estimated Delivery</span>
                    <span className="font-bold text-white">Friday, May 22 (Pre-Launch)</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-550">Total Charged</span>
                    <span className="font-bold text-white font-display">${total}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-sm font-bold text-zinc-350">Status</span>
                    <span className="text-xs font-bold bg-blue-600/10 border border-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-sm">Preparing Shipment</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCheckoutSuccess(false);
                    setCartOpen(false);
                    if (onClearCart) onClearCart();
                  }}
                  className="w-full bg-white hover:bg-zinc-200 text-black text-xs font-bold py-3.5 rounded-full transition-colors"
                >
                  Explore Apple Ecosystem
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
