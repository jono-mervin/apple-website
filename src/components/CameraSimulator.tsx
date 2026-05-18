"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Moon, Sun, Minimize, ZoomIn } from "lucide-react";

export default function CameraSimulator() {
  const [zoom, setZoom] = useState<number>(1);
  const [nightMode, setNightMode] = useState<boolean>(true);

  // Quick zoom focal triggers
  const zoomPres = [0.5, 1, 2, 5];

  // Map the slider value directly to image CSS scale (base scale 1.2 for 1x)
  // Let 0.5x scale be 0.6, 1x be 1.2, 2x be 2.4, 5x be 6.0, 10x be 12.0
  const imageScale = zoom * 1.2;
  
  // Lens shift offset coordinates based on zoom to give physical depth parallax
  const xOffset = (zoom - 1) * -8;
  const yOffset = (zoom - 1) * -4;

  return (
    <section id="camera" className="w-full bg-black py-24 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 mb-16"
        >
          <motion.span initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xs uppercase tracking-widest text-blue-500 font-bold font-display">Camera System</motion.span>
          <motion.h2 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
            Pro Camera. Ultra Creative.
          </motion.h2>
          <motion.p initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-zinc-300 text-sm md:text-base max-w-lg mx-auto font-normal">
            With our massive 48MP sensor and neural processing, adjust zoom, switch lenses, and illuminate the dark in real-time below.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 1. Camera Viewfinder Simulator (iPhone Camera App UI) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex justify-center"
          >
            
            {/* Viewfinder Phone Frame Mockup */}
            <div className="w-[310px] sm:w-[350px] aspect-[9/18.5] rounded-[48px] bg-zinc-950 border-[6px] border-zinc-800 p-2 shadow-2xl relative flex flex-col justify-between overflow-hidden select-none">
              
              {/* Dynamic Island cutout */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[85px] h-[22px] bg-black rounded-full z-45" />

              {/* Viewfinder Screen Screen */}
              <div className="relative w-full h-[98%] rounded-[38px] bg-black overflow-hidden flex flex-col justify-between p-4 pt-10">
                
                {/* Camera Top Bar controls */}
                <div className="relative z-30 flex justify-between items-center text-[10px] text-white px-2 mb-2 font-medium">
                  {/* Night mode toggle widget button */}
                  <button
                    onClick={() => setNightMode(!nightMode)}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-full border transition-all duration-300 ${
                      nightMode
                        ? "bg-yellow-500/20 border-yellow-500 text-yellow-400 font-bold"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400"
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 fill-current" />
                    <span>Night Mode: {nightMode ? "ON" : "OFF"}</span>
                  </button>
                  
                  <div className="flex items-center space-x-1.5 text-zinc-400">
                    <span className="bg-zinc-900 px-2 py-0.5 rounded-sm">RAW MAX</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse" />
                  </div>
                </div>

                {/* Main Viewfinder Frame viewport container */}
                <div className="relative flex-grow rounded-[26px] bg-zinc-950 border border-zinc-900 overflow-hidden shadow-inner flex items-center justify-center">
                  
                  {/* Simulated Scene Graphic (CSS vector illustration + filter transitions) */}
                  <motion.div
                    animate={{
                      scale: imageScale,
                      x: xOffset,
                      y: yOffset,
                    }}
                    transition={{ type: "spring", stiffness: 90, damping: 20 }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
                  >
                    {/* Background night sky layer */}
                    <div className="absolute inset-0 bg-[#070b19]" />

                    {/* Vector Star field */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#070b19_90%)]" />
                    <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[10%] left-[20%] opacity-80" />
                    <div className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full top-[15%] left-[65%] opacity-50" />
                    <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[25%] left-[80%] opacity-90" />
                    <div className="absolute w-[1px] h-[1px] bg-white rounded-full top-[35%] left-[40%] opacity-40" />
                    <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[45%] left-[15%] opacity-70" />
                    <div className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full top-[50%] left-[70%] opacity-60" />

                    {/* Glowing Moon */}
                    <div className="absolute top-[20%] left-[45%] w-14 h-14 rounded-full bg-amber-100 shadow-[0_0_40px_rgba(253,230,138,0.3)] flex items-center justify-center" />
                    
                    {/* Futuristic Cyber City skyline silhouettes */}
                    <div className="absolute bottom-0 w-full h-[60%] flex items-end justify-between px-1">
                      {/* Skyscraper 1 */}
                      <div className="w-[18%] h-[80%] bg-zinc-900 border-t border-r border-zinc-800 flex flex-col justify-around p-1">
                        <div className="w-full h-1 bg-cyan-500/20" />
                        <div className="w-full h-1 bg-cyan-500/10" />
                        <div className="w-full h-1 bg-cyan-500/20" />
                        <div className="w-full h-1 bg-cyan-500/10" />
                      </div>
                      {/* Skyscraper 2 (Center glowing spire) */}
                      <div className="w-[24%] h-[95%] bg-zinc-950 border-t border-x border-zinc-850 flex flex-col items-center justify-between p-1 shadow-2xl relative">
                        <div className="w-[2px] h-12 bg-indigo-500 absolute -top-8 animate-pulse" />
                        <div className="w-full h-1.5 bg-violet-500/20" />
                        <div className="w-full h-1.5 bg-pink-500/20" />
                        <div className="w-full h-1.5 bg-violet-500/10" />
                        <div className="w-full h-1.5 bg-pink-500/20" />
                      </div>
                      {/* Skyscraper 3 */}
                      <div className="w-[20%] h-[70%] bg-zinc-900 border-t border-l border-zinc-800 flex flex-col justify-around p-1">
                        <div className="w-full h-1 bg-amber-500/20" />
                        <div className="w-full h-1 bg-amber-500/10" />
                        <div className="w-full h-1 bg-amber-500/20" />
                      </div>
                    </div>

                    {/* Forest/Mountain Silhouette in very front */}
                    <svg className="absolute bottom-0 w-full h-[35%] fill-current text-zinc-950" viewBox="0 0 100 35" preserveAspectRatio="none">
                      <path d="M0 35 L0 15 L20 25 L40 10 L60 22 L80 8 L100 18 L100 35 Z" />
                    </svg>

                    {/* Night Mode Interactive Overlays */}
                    {/* 1. Grainy Dark Noise filter (Toggled off) */}
                    <div 
                      className={`absolute inset-0 w-full h-full bg-[#030612]/70 backdrop-blur-[0.5px] transition-all duration-700 pointer-events-none mix-blend-overlay ${
                        nightMode ? "opacity-0" : "opacity-100"
                      }`} 
                    />
                    
                    {/* 2. Glow Highlights Boost filter (Toggled on) */}
                    <div 
                      className={`absolute inset-0 w-full h-full bg-gradient-to-t from-cyan-500/10 via-violet-500/10 to-amber-500/15 mix-blend-screen transition-all duration-700 pointer-events-none ${
                        nightMode ? "opacity-100" : "opacity-0"
                      }`} 
                    />
                  </motion.div>

                  {/* High Quality Camera viewfinder HUD overlay */}
                  <div className="absolute inset-4 pointer-events-none border border-white/5 flex flex-col justify-between">
                    <div className="flex justify-between w-full p-2">
                      <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-white/30" />
                      <div className="w-2.5 h-2.5 border-t-2 border-r-2 border-white/30" />
                    </div>
                    
                    {/* Viewfinder crosshairs grid */}
                    <div className="w-8 h-8 rounded-full border border-white/10 mx-auto flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
                    </div>

                    <div className="flex justify-between w-full p-2">
                      <div className="w-2.5 h-2.5 border-b-2 border-l-2 border-white/30" />
                      <div className="w-2.5 h-2.5 border-b-2 border-r-2 border-white/30" />
                    </div>
                  </div>

                  {/* Real-time slider zoom badge readout */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 text-[10px] text-yellow-400 font-bold z-20 shadow-md">
                    {zoom.toFixed(1)}x
                  </div>
                </div>

                {/* Viewfinder Bottom camera dials controls */}
                <div className="relative z-30 pt-4 pb-2 flex flex-col items-center space-y-4">
                  {/* Focal Length Selector Swatches (0.5x, 1x, 2x, 5x) */}
                  <div className="flex items-center space-x-2.5">
                    {zoomPres.map((preset) => {
                      const isSelected = zoom === preset;
                      return (
                        <button
                          key={preset}
                          onClick={() => setZoom(preset)}
                          className={`w-8 h-8 rounded-full text-[9px] font-bold border transition-all duration-300 flex items-center justify-center ${
                            isSelected
                              ? "bg-yellow-500 border-yellow-500 text-black shadow-lg scale-110"
                              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {preset}x
                        </button>
                      );
                    })}
                  </div>

                  {/* Focus dial indicator ticks */}
                  <div className="w-full flex justify-between items-center text-[7px] text-zinc-500 px-4">
                    <span>13mm</span>
                    <span>&bull;</span>
                    <span>24mm</span>
                    <span>&bull;</span>
                    <span>48mm</span>
                    <span>&bull;</span>
                    <span>120mm</span>
                  </div>

                </div>

              </div>
            </div>

          </motion.div>

          {/* 2. Interactive Simulator Sidebar (Slider dials and explanatory specifications) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col space-y-8"
          >
            
            {/* Quick explanation of camera technology */}
            <div className="space-y-4">
              <div className="p-2 w-fit rounded-lg bg-zinc-900/60 border border-zinc-800">
                <Camera className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Simulation Controls</h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                Use the custom zoom slider and Night Mode switch on the right to interact with the landscape viewfinder. Notice how details reveal themselves even in absolute shadows.
              </p>
            </div>

            {/* Slider control */}
            <div className="bg-zinc-900/40 border border-zinc-900/60 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-300">Focal Zoom Control</span>
                <span className="font-extrabold text-blue-500 font-display">{zoom.toFixed(1)}x</span>
              </div>
              <div className="flex items-center space-x-3">
                <Minimize className="w-4 h-4 text-zinc-500" />
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <ZoomIn className="w-4 h-4 text-zinc-500" />
              </div>
              <div className="flex justify-between items-center text-[9px] text-zinc-500">
                <span>0.5x (Ultra Wide)</span>
                <span>1.0x (Fusion)</span>
                <span>5.0x (Telephoto)</span>
                <span>10.0x (Digital)</span>
              </div>
            </div>

            {/* Night mode switch controls */}
            <div className="bg-zinc-900/40 border border-zinc-900/60 p-6 rounded-2xl flex items-center justify-between">
              <div className="space-y-1 pr-6">
                <p className="text-xs font-semibold text-zinc-200">Simulate Night Mode</p>
                <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                  Turn ON to trigger Apple&apos;s Photonic Engine neural algorithm. Noise is scrubbed, exposure is balanced, and colors ignite.
                </p>
              </div>

              {/* Toggler */}
              <button
                onClick={() => setNightMode(!nightMode)}
                className={`w-14 h-8 rounded-full transition-colors duration-300 p-1 relative flex items-center ${
                  nightMode ? "bg-yellow-500" : "bg-zinc-800"
                }`}
              >
                <motion.div
                  layout
                  className={`w-6 h-6 rounded-full bg-black flex items-center justify-center shadow-md`}
                  animate={{ x: nightMode ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {nightMode ? (
                    <Moon className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-zinc-500" />
                  )}
                </motion.div>
              </button>
            </div>

            {/* Micro specs grid explaining camera lenses */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40">
                <p className="text-[10px] text-zinc-500 uppercase font-light tracking-wide">Fusion Lens</p>
                <p className="text-xs font-bold text-zinc-300 mt-1">48MP, 24mm, f/1.78</p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40">
                <p className="text-[10px] text-zinc-500 uppercase font-light tracking-wide">Telephoto Lens</p>
                <p className="text-xs font-bold text-zinc-300 mt-1">12MP, 120mm, f/2.8</p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
