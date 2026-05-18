"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Music, Play, Sparkles, Award, Trophy, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "@/components/iPhoneCustomizer";

interface ServiceInfo {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  price: string;
  accentColor: string;
  badge: string;
}

const serviceList: ServiceInfo[] = [
  {
    id: "tv",
    name: " tv+",
    tagline: "New Apple Originals every month.",
    desc: "Winner of 450+ awards, including the historic Best Picture Oscar for CODA. Stream exclusive thrillers, star-studded dramas, and family comedies in 4K HDR Dolby Vision.",
    price: "$9.99/mo after 7-day free trial",
    accentColor: "from-blue-600 to-sky-400",
    badge: "Best Picture Oscar Winner",
  },
  {
    id: "music",
    name: " music",
    tagline: "100 million songs. All in Spatial Audio.",
    desc: "Hear sound all around you with Dolby Atmos. Download your favorite tracks to listen offline, sing along with real-time lyrics, and explore handpicked radio stations.",
    price: "$10.99/mo after 1-month free trial",
    accentColor: "from-rose-600 to-pink-400",
    badge: "100M+ Songs in Spatial Audio",
  },
  {
    id: "arcade",
    name: " arcade",
    tagline: "200+ incredibly fun games. Zero ads.",
    desc: "Unlimited access to arcade classics, sports games, and indie puzzles. Play across your iPhone, iPad, Mac, and Apple TV without annoying microtransactions or ad blocks.",
    price: "$6.99/mo after 1-month free trial",
    accentColor: "from-emerald-600 to-teal-400",
    badge: "200+ Games, No In-App Buys",
  },
];

export default function EntertainmentPage() {
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
  const [activeTab, setActiveTab] = useState<string>("tv");
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [musicProgress, setMusicProgress] = useState<number>(34);

  const handleRemoveFromCart = (cartId: number) => {
    const updated = cart.filter((item) => item.cartId !== cartId);
    setCart(updated);
    localStorage.setItem("apple_cart", JSON.stringify(updated));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("apple_cart");
  };

  const selectedService = serviceList.find((s) => s.id === activeTab) || serviceList[0];

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-between">
      {/* Background Radial Glow */}
      <div className="absolute top-[15%] right-1/4 w-[450px] h-[450px] bg-pink-600/5 rounded-full blur-[160px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-[60%] left-1/4 w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[160px] animate-pulse-slow pointer-events-none" />

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

        {/* Services horizontal header row matching Screenshot 1 */}
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 py-4 border-b border-zinc-900 overflow-x-auto scrollbar-none select-none">
            {[
              { name: " One", desc: "Apple One" },
              { name: " tv+", desc: "Apple TV+" },
              { name: " music", desc: "Apple Music" },
              { name: " arcade", desc: "Apple Arcade" },
              { name: " fitness+", desc: "Apple Fitness+" },
              { name: " podcasts", desc: "Apple Podcasts" },
              { name: " books", desc: "Apple Books" },
            ].map((serv) => (
              <div key={serv.name} className="flex flex-col items-center space-y-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300">
                <span className="text-lg md:text-xl font-bold font-display text-white">{serv.name}</span>
                <span className="text-[9px] text-zinc-500 font-semibold tracking-wider uppercase">{serv.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Headline Section matching Screenshot 1 */}
        <div className="max-w-4xl mx-auto px-6 py-12 text-center select-none space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            Meet the A-list of <br />
            entertainment.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto"
          >
            Award-winning movies. Binge-worthy shows. Your favorite music mastered in Spatial Audio.
            And the most epic collection of mobile games. The best entertainment and experiences
            live here — only on Apple.
          </motion.p>

          {/* Bundle Banner matching Screenshot 1 bottom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-4 bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700 max-w-xl mx-auto rounded-2xl flex items-center justify-between gap-4 mt-8 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3 text-left">
              <div className="p-2 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-lg text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-150">Bundle four Apple services</h4>
                <p className="text-[10px] text-zinc-400">Get Apple Music, TV+, Arcade, and iCloud+ for less.</p>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-white text-black text-[11px] font-extrabold rounded-full hover:bg-zinc-200 active:scale-95 duration-200 transition-all flex items-center space-x-1 shrink-0">
              <span>Learn More</span>
            </button>
          </motion.div>
        </div>

        {/* Interactive Services Showroom Hub (Goal 3 centerpiece) */}
        <div className="py-16 border-t border-zinc-900 select-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto px-6 text-center space-y-4 mb-12"
          >
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white tracking-tight">
              Interactive Services Hub
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm">
              Click a service tab below to launch an active media player or dashboard simulation!
            </p>

            {/* Selector tabs */}
            <div className="flex justify-center space-x-3 pt-4">
              {serviceList.map((serv) => (
                <button
                  key={serv.id}
                  onClick={() => setActiveTab(serv.id)}
                  className={`px-5 py-2 rounded-full font-bold text-xs md:text-sm transition-all duration-300 border ${
                    activeTab === serv.id
                      ? "bg-white text-black border-white"
                      : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-750"
                  }`}
                >
                  {serv.name}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Descriptive info (5 columns) */}
            <div className="md:col-span-5 text-left space-y-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">
                Exclusive original content
              </span>
              <div className="space-y-2">
                <h3 className="font-display text-2xl md:text-4xl font-extrabold text-zinc-100">
                  {selectedService.name}
                </h3>
                <h4 className="text-zinc-350 text-sm md:text-base font-semibold">
                  {selectedService.tagline}
                </h4>
              </div>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                {selectedService.desc}
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-extrabold text-zinc-450 uppercase tracking-wider block">
                  Subscription rate
                </span>
                <span className="text-sm font-bold text-zinc-200 block mt-0.5">
                  {selectedService.price}
                </span>
              </div>
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold text-xs transition-all duration-300 shadow-lg shadow-blue-600/10 active:scale-95">
                Start Free Trial
              </button>
            </div>

            {/* Right Column: Simulated interactive deck (7 columns) */}
            <div className="md:col-span-7 w-full h-[320px] rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-between overflow-hidden shadow-2xl relative">
              <AnimatePresence mode="wait">
                {activeTab === "tv" && (
                  <motion.div
                    key="tv-deck"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-slate-900 to-black p-6 flex flex-col justify-between text-left"
                  >
                    {/* Simulated TV Show Deck */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-md border border-sky-400/20">
                         tv+ originals
                      </span>
                      <span className="text-[10px] text-zinc-400 font-semibold">CODA (Best Picture Winner)</span>
                    </div>

                    <div className="space-y-2">
                      <div className="w-fit p-1 bg-white/10 rounded-lg backdrop-blur-md border border-white/10">
                        <Award className="w-8 h-8 text-amber-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white font-display">CODA: Music & Family</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed max-w-sm">
                        As a CODA (Child of Deaf Adults), Ruby is the only hearing person in her home. When she discovers a passion for singing, she is torn.
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 pt-3">
                      <button className="p-3 bg-white text-black rounded-full hover:bg-zinc-200 duration-200 active:scale-90 transition-transform">
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-zinc-200 block">Watch Preview Trailer</span>
                        <span className="text-[9px] text-zinc-550 block">4K Dolby Vision • Atmos 5.1</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "music" && (
                  <motion.div
                    key="music-deck"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-rose-950/20 to-black p-6 flex flex-col justify-between text-left"
                  >
                    {/* Simulated Spatial Audio Music Player */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-md border border-rose-400/20">
                         music lossless
                      </span>
                      <span className="text-[10px] text-rose-400 font-semibold animate-pulse">● Spatial Audio</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Album Cover vector */}
                      <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 via-rose-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                        <Music className="w-10 h-10 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white font-display">Interstellar Suite</h4>
                        <p className="text-xs text-zinc-400">Hans Zimmer</p>
                        <span className="text-[9px] text-zinc-650 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider">
                          ALAC LOSSLESS 24-bit/192kHz
                        </span>
                      </div>
                    </div>

                    {/* Interactive music progress and play button */}
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <div className="w-full h-1 bg-zinc-850 rounded-full cursor-pointer relative" onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const percent = Math.floor(((e.clientX - rect.left) / rect.width) * 100);
                          setMusicProgress(percent);
                        }}>
                          <div className="h-full bg-rose-500 rounded-full transition-all duration-150" style={{ width: `${musicProgress}%` }} />
                        </div>
                        <div className="flex justify-between text-[9px] text-zinc-550 font-semibold">
                          <span>1:20</span>
                          <span>-3:40</span>
                        </div>
                      </div>

                      <div className="flex justify-center items-center space-x-6">
                        <button className="text-zinc-500 hover:text-zinc-300 font-bold text-sm" onClick={() => setMusicProgress((p) => Math.max(0, p - 10))}>⏮</button>
                        <button className="p-2.5 bg-rose-500 hover:bg-rose-400 text-white rounded-full duration-200 active:scale-90 transition-transform" onClick={() => setMusicPlaying(!musicPlaying)}>
                          {musicPlaying ? "⏸" : "▶"}
                        </button>
                        <button className="text-zinc-500 hover:text-zinc-300 font-bold text-sm" onClick={() => setMusicProgress((p) => Math.min(100, p + 10))}>⏭</button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "arcade" && (
                  <motion.div
                    key="arcade-deck"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-emerald-950/20 to-black p-6 flex flex-col justify-between text-left"
                  >
                    {/* Simulated Arcade Gaming deck */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-400/20">
                         arcade play
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5" /> High Score: 948,000
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-zinc-150">
                        <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg">
                          <Compass className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h4 className="text-base font-bold font-display">Oceanhorn 2: Knights</h4>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed max-w-sm">
                        Experience a spectacular 3D RPG action adventure with console-grade visuals, real-time sword fighting, and immersive exploration.
                      </p>
                    </div>

                    <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-zinc-550 block uppercase font-semibold">Active Gamers</span>
                        <span className="text-xs font-bold text-zinc-200 block">45,920 Online Now</span>
                      </div>
                      <button className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-[10px] rounded-full active:scale-95 duration-200 transition-transform">
                        Launch Game
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
