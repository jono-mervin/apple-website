"use client";

import React, { useState } from "react";
import { Check, Mail, Send, Globe } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const columns = [
    {
      title: "Shop and Learn",
      links: ["Store", "Mac", "iPad", "iPhone", "Watch", "AirPods", "TV & Home", "AirTag", "Gift Cards"]
    },
    {
      title: "Apple Wallet",
      links: ["Wallet", "Apple Card", "Apple Pay", "Apple Cash"]
    },
    {
      title: "Account",
      links: ["Manage Your Apple ID", "Apple Store Account", "iCloud.com"]
    },
    {
      title: "Entertainment",
      links: ["Apple One", "Apple TV+", "Apple Music", "Apple Arcade", "Apple Fitness+", "Apple Podcasts", "Apple Books", "App Store"]
    },
    {
      title: "Apple Store",
      links: ["Find a Store", "Genius Bar", "Today at Apple", "Apple Camp", "Apple Store App", "Certified Refurbished", "Financing", "Apple Trade In", "Order Status", "Shopping Help"]
    },
    {
      title: "Apple Values",
      links: ["Accessibility", "Education", "Environment", "Inclusion and Diversity", "Privacy", "Racial Equity and Justice", "Supplier Responsibility"]
    }
  ];

  return (
    <footer className="w-full bg-[#161617] border-t border-zinc-800 py-16 text-[11px] text-[#86868b] select-none">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Apple Intelligence & Environmental disclaimers */}
        <div className="space-y-4 border-b border-zinc-800 pb-8 leading-relaxed font-light">
          <p>
            1. Apple Intelligence will be available in beta on all iPhone 16 models, iPhone 15 Pro, and iPhone 15 Pro Max with Siri and device language set to U.S. English, as an iOS 18 update. English (Australia, Canada, Ireland, New Zealand, South Africa, UK) support coming December 2026. Some features and support for additional languages, such as Chinese, English (India, Singapore), French, German, Italian, Japanese, Portuguese, Spanish, Vietnamese, and others, will be coming over the course of the next year.
          </p>
          <p>
            2. iPad Pro thickness of 5.1 mm refers to the 13-inch model. The 11-inch model thickness is 5.3 mm. M4 performance parameters compared to previous generation iPad Pro devices.
          </p>
          <p>
            3. Apple Card is issued by Goldman Sachs Bank USA, Salt Lake City Branch. Available for qualifying applicants in the United States. subject to credit approval.
          </p>
        </div>

        {/* Interactive Newsletter Signup row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-800 pb-8">
          <div className="space-y-1.5 max-w-md">
            <h4 className="text-xs font-bold text-zinc-200 flex items-center space-x-1.5 font-display">
              <Mail className="w-4 h-4 text-blue-500" />
              <span>Subscribe to Apple Store News</span>
            </h4>
            <p className="font-normal text-zinc-400 leading-relaxed">
              Get official announcements, keynotes invitations, local Genius sessions, and exclusive product pre-order updates.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px]">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center space-x-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your Apple ID email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow md:w-[240px] bg-zinc-900 border border-zinc-850 px-3.5 py-2.5 rounded-lg text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-zinc-100 hover:bg-white text-black p-2.5 rounded-lg flex items-center justify-center transition-colors"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5 fill-current" />
                </button>
              </form>
            ) : (
              <div className="flex items-center space-x-2.5 bg-green-500/10 border border-green-500/20 text-green-400 py-2.5 px-4 rounded-lg">
                <Check className="w-4 h-4" />
                <span className="font-bold text-xs">Subscription Confirmed! Welcome.</span>
              </div>
            )}
          </div>
        </div>

        {/* Multi-Column Sitemap Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {columns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-zinc-200 font-bold tracking-wide text-xs font-display">{col.title}</h4>
              <ul className="space-y-2.5 font-normal">
                {col.links.map((link) => (
                  <li key={link}>
                    <span 
                      onClick={() => {
                        if (link === "iPhone" || link === "Store") {
                          const el = document.getElementById("customizer");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        } else if (link === "Genius Bar" || link === "Find a Store") {
                          const el = document.getElementById("support");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        } else {
                          alert(`Mock Apple sitemap link: ${link}`);
                        }
                      }}
                      className="hover:text-white hover:underline cursor-pointer transition-all"
                    >
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright area */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-zinc-600">
          <div className="space-y-2">
            <p>
              More ways to shop: <span className="text-blue-500 underline cursor-pointer hover:text-blue-400">Find an Apple Store</span> or <span className="text-blue-500 underline cursor-pointer hover:text-blue-400">other retailer</span> near you. Or call 1-800-MY-APPLE.
            </p>
            <p>
              Copyright &copy; 2026 Apple Inc. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-zinc-500">
            <div className="flex items-center space-x-1.5 hover:text-zinc-300 cursor-pointer transition-colors">
              <Globe className="w-3.5 h-3.5 text-zinc-600" />
              <span>United States</span>
            </div>
            <div className="hidden md:block text-zinc-800">|</div>
            <div className="flex flex-wrap gap-2.5">
              {["Privacy Policy", "Terms of Use", "Sales and Refunds", "Legal", "Site Map"].map((policy) => (
                <span key={policy} className="hover:text-zinc-300 cursor-pointer transition-colors hover:underline">
                  {policy}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
