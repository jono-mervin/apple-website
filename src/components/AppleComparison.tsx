"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Cpu, Smartphone, Zap, Camera, Laptop, Tablet, Watch, Headphones, Volume2 } from "lucide-react";

interface CompareModel {
  name: string;
  badge: string;
  tagline: string;
  price: string;
  screenSize: string;
  material: string;
  chip: string;
  camera: string;
  battery: string;
  button: string;
}

interface AppleComparisonProps {
  productType?: "iphone" | "mac" | "ipad" | "watch" | "airpods";
}

export default function AppleComparison({ productType = "iphone" }: AppleComparisonProps) {
  
  // Custom specifications catalog tailored dynamically per product line
  const catalogData: Record<string, { title: string; desc: string; models: CompareModel[]; icon: React.ReactNode; displayLabel: string; materialLabel: string; chipLabel: string; cameraLabel: string; batteryLabel: string; controlLabel: string; legal: string }> = {
    iphone: {
      title: "Which iPhone is right for you?",
      desc: "Compare sizes, hardware configurations, materials, and price tags to select your perfect companion.",
      icon: <Smartphone className="w-4 h-4" />,
      displayLabel: "Display",
      materialLabel: "Chassis Material",
      chipLabel: "Processor",
      cameraLabel: "Camera setup",
      batteryLabel: "Battery Power",
      controlLabel: "Physical Controls",
      legal: "* Apple Intelligence is available on iPhone 16 models, iPhone 15 Pro, and iPhone 15 Pro Max, with Siri and device language set to US English, as a free update. Some features and additional languages will be coming over the course of the next year.",
      models: [
        {
          name: "iPhone 16",
          badge: "Standard Flagship",
          tagline: "A total powerhouse.",
          price: "$799",
          screenSize: "6.1-inch OLED (60Hz)",
          material: "Aerospace Aluminium",
          chip: "A18 Chip (5-core GPU)",
          camera: "48MP Dual Camera Matrix",
          battery: "Up to 22 hours video",
          button: "Silent Switch / Action button",
        },
        {
          name: "iPhone 16 Pro",
          badge: "Pro Flagship",
          tagline: "Built for Apple Intelligence.",
          price: "$999",
          screenSize: "6.3-inch ProMotion (120Hz)",
          material: "Grade 5 Titanium",
          chip: "A18 Pro Chip (6-core GPU)",
          camera: "48MP Triple-Lens Matrix",
          battery: "Up to 27 hours video",
          button: "Action Button & Camera Control",
        },
        {
          name: "iPhone 16 Pro Max",
          badge: "Pro Max Flagship",
          tagline: "Our ultimate flagship.",
          price: "$1199",
          screenSize: "6.9-inch ProMotion (120Hz)",
          material: "Grade 5 Titanium",
          chip: "A18 Pro Chip (6-core GPU)",
          camera: "48MP Triple-Lens Matrix",
          battery: "Up to 33 hours video",
          button: "Action Button & Camera Control",
        },
      ]
    },
    mac: {
      title: "Which Mac is right for you?",
      desc: "Compare screen sizes, chip configurations, memory limits, and connectivity to find your ultimate studio power.",
      icon: <Laptop className="w-4 h-4" />,
      displayLabel: "Retina Display",
      materialLabel: "Casing & Colors",
      chipLabel: "Processor Chip",
      cameraLabel: "FaceTime Camera",
      batteryLabel: "Endurance / Power",
      controlLabel: "Ports & Keys",
      legal: "* Apple Intelligence is available on all Mac models with M1 or newer chips. Fully optimized for neural networking computing frameworks.",
      models: [
        {
          name: "MacBook Air M3",
          badge: "Lightweight Pro",
          tagline: "Surprisingly thin. Powerfully quick.",
          price: "$999",
          screenSize: "13.6-inch Liquid Retina",
          material: "Anodized Recycled Aluminium",
          chip: "Apple M3 (10-core GPU)",
          camera: "1080p FaceTime HD",
          battery: "Up to 18 hours battery",
          button: "Force Touch / MagSafe 3 / Touch ID",
        },
        {
          name: "MacBook Pro M4",
          badge: "Performance Beast",
          tagline: "Unleash extreme speeds.",
          price: "$1599",
          screenSize: "14.2-inch Liquid Retina XDR",
          material: "Sleek Space Black Casing",
          chip: "Apple M4 Pro (16-core GPU)",
          camera: "12MP Center Stage desk view",
          battery: "Up to 24 hours battery",
          button: "Thunderbolt 4 / HDMI / SDXC",
        },
        {
          name: "MacBook Pro M4 Max",
          badge: "Ultimate Studio",
          tagline: "A absolute titan.",
          price: "$2499",
          screenSize: "16.2-inch Liquid Retina XDR",
          material: "Grade-A Structural Aluminium",
          chip: "Apple M4 Max (40-core GPU)",
          camera: "12MP Center Stage desk view",
          battery: "Up to 24 hours battery",
          button: "Thunderbolt 4 / HDMI / SDXC / Touch ID",
        },
      ]
    },
    ipad: {
      title: "Which iPad is right for you?",
      desc: "Compare displays, dimensions, processing speeds, and accessories to select your perfect canvas.",
      icon: <Tablet className="w-4 h-4" />,
      displayLabel: "Display Panel",
      materialLabel: "Thickness Metric",
      chipLabel: "Silicon Chip",
      cameraLabel: "Aperture Lens",
      batteryLabel: "Battery Lifespan",
      controlLabel: "Pencil Support",
      legal: "* Apple Intelligence is available on iPad Pro and iPad Air models with M1 or newer, as a free update.",
      models: [
        {
          name: "iPad (10th Gen)",
          badge: "Everyday Essential",
          tagline: "Colorfully capable.",
          price: "$349",
          screenSize: "10.9-inch Liquid Retina",
          material: "Lightweight 7.0mm Casing",
          chip: "A14 Bionic (4-core GPU)",
          camera: "12MP Landscape Wide",
          battery: "Up to 10 hours battery",
          button: "USB-C Apple Pencil support",
        },
        {
          name: "iPad Air (M2)",
          badge: "Vibrant Creative",
          tagline: "Fresh air for creators.",
          price: "$599",
          screenSize: "11-inch or 13-inch display",
          material: "Rigid 6.1mm Casing",
          chip: "Apple M2 (10-core GPU)",
          camera: "12MP Landscape Ultra Wide",
          battery: "Up to 10 hours creative work",
          button: "Apple Pencil Pro / Magic Keyboard",
        },
        {
          name: "iPad Pro (M4)",
          badge: "Professional Peak",
          tagline: "Unbelievably thin. Outrageously powerful.",
          price: "$999",
          screenSize: "11\" or 13\" Tandem OLED XDR",
          material: "Ultra-thin 5.1mm structure",
          chip: "Apple M4 (10-core GPU)",
          camera: "12MP Wide + LiDAR Scanner",
          battery: "Up to 10 hours elite editing",
          button: "Apple Pencil Pro / Squeeze Haptics",
        },
      ]
    },
    watch: {
      title: "Which Apple Watch is right for you?",
      desc: "Compare materials, case sizes, fitness specs, and battery lives to choose your perfect outdoor partner.",
      icon: <Watch className="w-4 h-4" />,
      displayLabel: "Case Display",
      materialLabel: "Build Material",
      chipLabel: "Processor Engine",
      cameraLabel: "Health Diagnostics",
      batteryLabel: "Battery Lifespan",
      controlLabel: "Crown & Sirens",
      legal: "* Blood Oxygen sensing features are available on Apple Watch Series 10 and Ultra 2 for users over 18.",
      models: [
        {
          name: "Apple Watch SE",
          badge: "Essential Tracker",
          tagline: "All the essentials. Easy on the pocket.",
          price: "$249",
          screenSize: "44mm or 40mm Retina OLED",
          material: "Recycled Aluminium Base",
          chip: "S8 SiP dual-core processor",
          camera: "Heart rate / Fall detection",
          battery: "Up to 18 hours battery",
          button: "Haptic Crown / Siri voice",
        },
        {
          name: "Apple Watch Series 10",
          badge: "Modern Standard",
          tagline: "Thinnest shell. Largest screen.",
          price: "$399",
          screenSize: "46mm or 42mm Wide-angle OLED",
          material: "Polished Aluminium / Titanium",
          chip: "S10 SiP with 4-core Neural",
          camera: "ECG / Sleep Apnea / Temp",
          battery: "Up to 18 hours (fast charge)",
          button: "Double Tap gesture support",
        },
        {
          name: "Apple Watch Ultra 2",
          badge: "Extreme Outdoor",
          tagline: "Rugged and capable. Built for athletes.",
          price: "$799",
          screenSize: "49mm Always-On (3000 nits)",
          material: "Aerospace Grade Titanium",
          chip: "S9 SiP with 4-core Neural",
          camera: "Dual Frequency GPS / Depth",
          battery: "Up to 36 hours (72h low power)",
          button: "Action Button / 86dB Alert Siren",
        },
      ]
    },
    airpods: {
      title: "Which AirPods are right for you?",
      desc: "Compare audio drivers, noise cancellation levels, fit profiles, and smart charging configurations.",
      icon: <Headphones className="w-4 h-4" />,
      displayLabel: "Acoustic Driver",
      materialLabel: "Fit Profile",
      chipLabel: "Headphone Chip",
      cameraLabel: "Noise Cancellation",
      batteryLabel: "Charging Speed",
      controlLabel: "Audio Control",
      legal: "* Spatial Audio requires compatible media sources. Battery lifespan depends on volume levels and environmental factors.",
      models: [
        {
          name: "AirPods 4",
          badge: "contoured universal",
          tagline: "Hear the difference.",
          price: "$129",
          screenSize: "Custom high-excursion Apple driver",
          material: "Contoured open-ear universal fit",
          chip: "H2 Acoustic Processor",
          camera: "Personalized Spatial Audio",
          battery: "Up to 30 hours with case",
          button: "Force Sensor / Siri Gestures",
        },
        {
          name: "AirPods Pro 2",
          badge: "ultimate active",
          tagline: "Re-engineered sound. Up to 2x ANC.",
          price: "$249",
          screenSize: "Low-distortion custom sound driver",
          material: "In-ear fit with 4 tip sizes",
          chip: "Advanced H2 Audio Processor",
          camera: "2x Active Noise Cancellation",
          battery: "Up to 30 hours (MagSafe Case)",
          button: "Touch swipe controls / Conversational",
        },
        {
          name: "AirPods Max",
          badge: "luxury head",
          tagline: "The ultimate listening experience.",
          price: "$549",
          screenSize: "Apple-designed dynamic transducer",
          material: "Knit-mesh canopy / Memory foam",
          chip: "Dual H1 Audio Processors",
          camera: "Pro-grade Active Noise Cancel",
          battery: "Up to 20 hours with Smart Case",
          button: "Digital Crown volume and playback",
        },
      ]
    }
  };

  const selectedData = catalogData[productType] || catalogData.iphone;

  const handleBuyScroll = () => {
    const el = document.getElementById("customizer");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="compare" className="w-full bg-black py-24 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 mb-20"
        >
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xs uppercase tracking-widest text-blue-500 font-bold font-display">Compare Models</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
            {selectedData.title}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-zinc-300 text-sm md:text-base max-w-lg mx-auto font-normal leading-relaxed">
            {selectedData.desc}
          </motion.p>
        </motion.div>

        {/* Comparison Grid Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {selectedData.models.map((model, idx) => {
            const isPro = model.name.toLowerCase().includes("pro") || model.name.toLowerCase().includes("max") || model.name.toLowerCase().includes("series 10");
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
                className={`flex flex-col justify-between rounded-3xl p-6 md:p-8 border transition-all duration-300 hover:scale-[1.02] ${
                  isPro 
                    ? "bg-zinc-950/60 border-blue-500/20 shadow-[0_15px_35px_rgba(59,130,246,0.05)] hover:border-blue-500/40" 
                    : "bg-zinc-950/20 border-zinc-900 hover:border-zinc-800"
                }`}
              >
                {/* Model Header */}
                <div className="space-y-3">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit block ${
                    isPro ? "bg-blue-600/10 text-blue-400 border border-blue-500/10" : "bg-zinc-900 text-zinc-400"
                  }`}>
                    {model.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight font-display">{model.name}</h3>
                  <p className="text-xs text-zinc-400 font-light italic">&ldquo;{model.tagline}&rdquo;</p>
                  
                  {/* Pricing tag */}
                  <div className="pt-2 flex items-baseline space-x-1.5">
                    <span className="text-xs text-zinc-450 font-semibold">From</span>
                    <span className="text-3xl font-extrabold text-zinc-100 font-display">{model.price}</span>
                  </div>
                </div>

                {/* Specs List Matrix */}
                <div className="my-10 space-y-6 text-xs border-t border-zinc-900/60 pt-6">
                  {/* Display */}
                  <div className="flex items-center space-x-3.5">
                    <div className="p-1.5 rounded-md bg-zinc-900 text-zinc-400">
                      {selectedData.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-light uppercase tracking-wider">{selectedData.displayLabel}</p>
                      <p className="text-zinc-200 font-medium mt-0.5">{model.screenSize}</p>
                    </div>
                  </div>

                  {/* Material */}
                  <div className="flex items-center space-x-3.5">
                    <div className="p-1.5 rounded-md bg-zinc-900 text-zinc-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-light uppercase tracking-wider">{selectedData.materialLabel}</p>
                      <p className="text-zinc-200 font-medium mt-0.5">{model.material}</p>
                    </div>
                  </div>

                  {/* Chip */}
                  <div className="flex items-center space-x-3.5">
                    <div className="p-1.5 rounded-md bg-zinc-900 text-zinc-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-light uppercase tracking-wider">{selectedData.chipLabel}</p>
                      <p className="text-zinc-200 font-medium mt-0.5">{model.chip}</p>
                    </div>
                  </div>

                  {/* Camera */}
                  <div className="flex items-center space-x-3.5">
                    <div className="p-1.5 rounded-md bg-zinc-900 text-zinc-400">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-light uppercase tracking-wider">{selectedData.cameraLabel}</p>
                      <p className="text-zinc-200 font-medium mt-0.5">{model.camera}</p>
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="flex items-center space-x-3.5">
                    <div className="p-1.5 rounded-md bg-zinc-900 text-zinc-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-light uppercase tracking-wider">{selectedData.batteryLabel}</p>
                      <p className="text-zinc-200 font-medium mt-0.5">{model.battery}</p>
                    </div>
                  </div>

                  {/* Controls / Button */}
                  <div className="flex items-center space-x-3.5">
                    <div className="p-1.5 rounded-md bg-zinc-900 text-zinc-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-light uppercase tracking-wider">{selectedData.controlLabel}</p>
                      <p className="text-zinc-200 font-medium mt-0.5">{model.button}</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <button
                  onClick={handleBuyScroll}
                  className={`w-full text-xs font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center space-x-2 ${
                    isPro 
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/10" 
                      : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
                  }`}
                >
                  <span>Select Configuration</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Global Compare legal notes */}
        <p className="text-[9px] text-zinc-650 font-light text-center leading-relaxed max-w-4xl mx-auto">
          {selectedData.legal}
        </p>

      </div>
    </section>
  );
}
