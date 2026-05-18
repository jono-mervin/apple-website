"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Play, Pause, RefreshCw } from "lucide-react";

export default function ProMotionSimulator() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [scrollSpeed, setScrollSpeed] = useState<number>(3); // 1 = slow, 5 = fast

  const mockEmails = [
    { sender: "Apple Intelligence", subject: "Your morning summary is ready", time: "9:41 AM" },
    { sender: "Genius Bar Support", subject: "Genius Bar Appointment Confirmed", time: "Yesterday" },
    { sender: "Apple Store Online", subject: "Your pre-order has shipped!", time: "Thursday" },
    { sender: "Craig Federighi", subject: "Check out this hair update", time: "May 12" },
    { sender: "App Store Developer", subject: "Your app build is approved", time: "May 10" },
    { sender: "WWDC 2026", subject: "Keynote presentation schedules inside", time: "May 08" },
  ];

  // Adjust css speed duration based on scrollSpeed slider
  const animationDuration = `${10 - scrollSpeed}s`;

  return (
    <section id="promotion" className="w-full bg-zinc-950 py-24 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 mb-16"
        >
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-xs uppercase tracking-widest text-blue-500 font-bold font-display">ProMotion Screen</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25, duration: 0.6 }} className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
            ProMotion. Speed Refined.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }} className="text-zinc-300 text-sm md:text-base max-w-lg mx-auto font-normal">
            Apple&apos;s 120Hz screen tech adjusts dynamically. Observe the dramatic smoothness upgrade side-by-side.
          </motion.p>
        </motion.div>

        {/* Global Controls Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-xl mx-auto mb-12 bg-zinc-900/40 border border-zinc-900 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-full flex items-center space-x-1.5 transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Motion</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Motion</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                setScrollSpeed(3);
                setIsPlaying(true);
              }}
              className="p-2 border border-zinc-800 rounded-full hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white transition-colors"
              title="Reset Speed"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speed slider */}
          <div className="flex items-center space-x-3 w-full sm:w-[220px]">
            <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Scroll Speed</span>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </motion.div>

        {/* Side-by-Side Screen Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch select-none">
          
          {/* Left panel: 60Hz Screen */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-black border border-zinc-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
          >
            
            {/* Header readouts */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Standard Display</span>
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-red-400 font-extrabold rounded-full shadow-inner font-display">
                60 Hz
              </span>
            </div>

            {/* Bouncing ball simulation canvas */}
            <div className="relative w-full h-[80px] bg-zinc-950 rounded-2xl border border-zinc-900 mb-6 flex items-center overflow-hidden">
              <div className="absolute left-6 text-[9px] text-zinc-500 font-medium">Bouncing Ball Frame-Jump:</div>
              {/* Ball animated choppy at 60hz */}
              {isPlaying && (
                <div 
                  style={{ animationDuration: "2s" }}
                  className="absolute w-5 h-5 rounded-full bg-zinc-500 scroll-60hz left-[70%]" 
                />
              )}
              {!isPlaying && <div className="absolute w-5 h-5 rounded-full bg-zinc-500 left-[70%] top-[30px]" />}
            </div>

            {/* Scrolling list container */}
            <div className="w-full h-[220px] bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden relative p-4 flex flex-col">
              
              {/* Inbox Header */}
              <div className="text-[10px] font-bold text-zinc-400 border-b border-zinc-900 pb-2 mb-2 flex justify-between uppercase tracking-wider">
                <span>Inbox</span>
                <span className="text-zinc-600">60 fps caps</span>
              </div>

              {/* Scrolling List Content */}
              <div className="flex-grow overflow-hidden relative">
                <div 
                  style={{
                    animationPlayState: isPlaying ? "running" : "paused",
                    animationDuration: animationDuration
                  }}
                  className="absolute w-full space-y-3.5 scroll-60hz"
                >
                  {mockEmails.concat(mockEmails).map((email, i) => (
                    <div key={i} className="p-3 bg-zinc-900/30 border border-zinc-900/60 rounded-xl space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-zinc-300">{email.sender}</span>
                        <span className="text-zinc-500">{email.time}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-light truncate">{email.subject}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[10px] text-zinc-500 font-light mt-6 leading-relaxed">
              Standard screens render 60 frames per second. Scrolling text has micro-jitter and motion blur, straining legibility at high speeds.
            </p>
          </motion.div>

          {/* Right panel: 120Hz ProMotion Screen */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="bg-black border border-zinc-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
          >
            
            {/* Header readouts */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">ProMotion Display</span>
              <span className="px-3 py-1 bg-blue-600/10 border border-blue-500 text-[10px] text-blue-400 font-extrabold rounded-full shadow-[0_0_20px_rgba(59,130,246,0.15)] font-display">
                120 Hz
              </span>
            </div>

            {/* Bouncing ball simulation canvas */}
            <div className="relative w-full h-[80px] bg-zinc-950 rounded-2xl border border-zinc-900 mb-6 flex items-center overflow-hidden">
              <div className="absolute left-6 text-[9px] text-zinc-500 font-medium">Bouncing Ball Smooth-Flow:</div>
              {/* Ball animated smooth at 120hz */}
              {isPlaying && (
                <div 
                  style={{ animationDuration: "2s" }}
                  className="absolute w-5 h-5 rounded-full bg-blue-500 scroll-120hz left-[70%] shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                />
              )}
              {!isPlaying && <div className="absolute w-5 h-5 rounded-full bg-blue-500 left-[70%] top-[30px]" />}
            </div>

            {/* Scrolling list container */}
            <div className="w-full h-[220px] bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden relative p-4 flex flex-col">
              
              {/* Inbox Header */}
              <div className="text-[10px] font-bold text-blue-400 border-b border-zinc-900 pb-2 mb-2 flex justify-between uppercase tracking-wider">
                <span>Inbox</span>
                <span className="text-blue-500/60">120 fps double</span>
              </div>

              {/* Scrolling List Content */}
              <div className="flex-grow overflow-hidden relative">
                <div 
                  style={{
                    animationPlayState: isPlaying ? "running" : "paused",
                    animationDuration: animationDuration
                  }}
                  className="absolute w-full space-y-3.5 scroll-120hz"
                >
                  {mockEmails.concat(mockEmails).map((email, i) => (
                    <div key={i} className="p-3 bg-zinc-900/60 border border-zinc-800/40 rounded-xl space-y-1 hover:border-zinc-700 transition-colors">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-zinc-100">{email.sender}</span>
                        <span className="text-zinc-500">{email.time}</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 font-light truncate">{email.subject}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[10px] text-zinc-500 font-light mt-6 leading-relaxed">
              ProMotion renders up to 120 frames per second. Text remains perfectly legible, motion trails vanish, and system animations feel incredibly fluid.
            </p>
          </motion.div>

        </div>

        {/* Dynamic technology callout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-16 bg-zinc-900/30 border border-zinc-900 p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl text-center sm:text-left">
            <h4 className="text-sm font-bold text-zinc-100 flex items-center justify-center sm:justify-start space-x-1.5">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Smart Variable Refresh Rate</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              ProMotion doesn&apos;t just run at 120Hz constantly. It dynamically ramps up when high-speed graphics are needed, and drops down to 10Hz when viewing static pages or books, preserving massive amounts of lithium battery life.
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="text-xs text-blue-500 font-bold bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
              10Hz &mdash; 120Hz Dynamic
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
