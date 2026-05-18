"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, Calendar, Clock, Phone, AlertCircle, Check, X, ShieldCheck } from "lucide-react";

interface AppleStore {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  zipPrefix: string;
  features: string[];
  isOpen: boolean;
}

export default function AppleStoreLocator() {
  const [query, setQuery] = useState<string>("");
  const [selectedStore, setSelectedStore] = useState<AppleStore | null>(null);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const mockStores: AppleStore[] = [
    {
      id: "fifth-ave",
      name: "Apple Fifth Avenue",
      address: "767 Fifth Avenue, New York, NY 10022",
      phone: "(212) 336-1440",
      hours: "Open 24 hours a day, 365 days a year",
      zipPrefix: "10",
      features: ["Genius Bar Support", "Today at Apple Sessions", "In-Store Pickup", "Apple Trade-In"],
      isOpen: true
    },
    {
      id: "union-sq",
      name: "Apple Union Square",
      address: "300 Post Street, San Francisco, CA 94108",
      phone: "(415) 486-4800",
      hours: "Open 10:00 AM – 8:00 PM",
      zipPrefix: "94",
      features: ["Genius Bar Support", "Today at Apple Sessions", "Business Consultation", "Apple Trade-In"],
      isOpen: true
    },
    {
      id: "marina-bay",
      name: "Apple Marina Bay Sands",
      address: "2 Bayfront Avenue, B2-06, Singapore 018972",
      phone: "+65 6835 1800",
      hours: "Open 10:00 AM – 10:00 PM",
      zipPrefix: "01",
      features: ["Genius Bar Support", "Floating Glass Dome", "In-Store Pickup", "Today at Apple Sessions"],
      isOpen: true
    },
    {
      id: "regent-st",
      name: "Apple Regent Street",
      address: "235 Regent Street, London, W1B 2EL",
      phone: "+44 (0) 20 7153 9000",
      hours: "Open 10:00 AM – 9:00 PM",
      zipPrefix: "w1",
      features: ["Genius Bar Support", "Hearing Accessibility Loop", "In-Store Pickup", "Apple Trade-In"],
      isOpen: true
    }
  ];

  // Smart filtering of stores
  const filteredStores = mockStores.filter((store) => {
    const q = query.toLowerCase().trim();
    if (!q) return true; // Show all by default
    return (
      store.name.toLowerCase().includes(q) ||
      store.address.toLowerCase().includes(q) ||
      store.zipPrefix.toLowerCase().includes(q)
    );
  });

  const handleBookAppointment = (store: AppleStore) => {
    setSelectedStore(store);
    setBookingSuccess(false);
    setBookingDate("");
    setBookingTime("");
  };

  const submitAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    setBookingSuccess(true);
  };

  return (
    <section id="support" className="w-full bg-black py-24 border-t border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 mb-16"
        >
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xs uppercase tracking-widest text-zinc-450 font-bold font-display">Retail &amp; Support</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
            Genius Bar &amp; Apple Store Locator.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-zinc-300 text-sm md:text-base max-w-lg mx-auto font-normal">
            Need hardware repair, tech advice, or want to pick up a pre-order? Search our flagship service centers below.
          </motion.p>
        </motion.div>

        {/* Search Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-xl mx-auto mb-16 relative"
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search by city, ZIP code, or store name (e.g. 'New York', '94108')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
          />
        </motion.div>

        {/* Results grid */}
        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredStores.map((store, idx) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: idx * 0.12, ease: "easeOut" }}
                className="bg-zinc-950 border border-zinc-900/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 shadow-lg"
              >
                <div className="space-y-4">
                  {/* Status header */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-500 font-bold flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 fill-current" />
                      <span>Apple Retail Store</span>
                    </span>
                    <span className="text-[9px] font-extrabold uppercase bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded-sm">
                      Open Status
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight font-display">{store.name}</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">{store.address}</p>

                  <div className="space-y-2 border-y border-zinc-900/60 py-4 text-xs font-light text-zinc-500">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                      <span className="text-zinc-400 font-normal">{store.hours}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                      <span>{store.phone}</span>
                    </div>
                  </div>

                  {/* Feature Tags list */}
                  <div className="space-y-1.5 pt-2">
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Available Services</p>
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {store.features.map((feature) => (
                        <span
                          key={feature}
                          className="bg-zinc-900 border border-zinc-850 text-zinc-300 text-[9px] font-medium px-2.5 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                  <button 
                    onClick={() => alert(`Showing map directions to ${store.name}!`)}
                    className="text-xs text-zinc-400 hover:text-white font-semibold transition-colors"
                  >
                    Get Directions
                  </button>
                  <button
                    onClick={() => handleBookAppointment(store)}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4.5 py-2.5 rounded-full flex items-center space-x-1.5 transition-colors shadow-lg shadow-blue-600/10"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Genius Bar</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-12 space-y-4 border border-zinc-900 rounded-3xl bg-zinc-950/20">
            <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Flagship Stores Found</h3>
            <p className="text-xs text-zinc-400 font-light px-6 leading-relaxed">
              We couldn&apos;t find matching retail flagship locations for &ldquo;{query}&rdquo;. Try searching for &ldquo;New York&rdquo;, &ldquo;San Francisco&rdquo;, or zip prefix &ldquo;94&rdquo;.
            </p>
          </div>
        )}

      </div>

      {/* Genius Bar Reservation Booking Drawer Modal */}
      <AnimatePresence>
        {selectedStore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setSelectedStore(null)}
                className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-blue-500 uppercase tracking-widest font-extrabold">Genius Bar Reservation</span>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedStore.name}</h3>
                  <p className="text-[10px] text-zinc-500 font-light mt-1">{selectedStore.address}</p>
                </div>

                {!bookingSuccess ? (
                  <form onSubmit={submitAppointment} className="space-y-4">
                    
                    {/* Date select */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider block">1. Select Appointment Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Time slots */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider block">2. Pick an Available Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["10:15 AM", "11:30 AM", "1:00 PM", "2:45 PM", "4:15 PM", "5:30 PM"].map((time) => {
                          const isSelected = bookingTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setBookingTime(time)}
                              className={`py-2 px-2.5 rounded-lg border text-[10px] font-bold text-center transition-all duration-300 ${
                                isSelected
                                  ? "bg-blue-600 border-blue-500 text-white shadow-md"
                                  : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Troubleshooting checklist */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider block font-bold">3. Hardware Topic</label>
                      <select 
                        required 
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="iphone">iPhone Hardware Diagnostics & Battery</option>
                        <option value="ipad">iPad Screen & Graphics Assessment</option>
                        <option value="mac">Macbook Core Overheating Diagnostics</option>
                        <option value="software">iOS Backup & Cloud Synchronization</option>
                      </select>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!bookingDate || !bookingTime}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold py-3.5 rounded-full transition-colors pt-4 flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm Reservation</span>
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center space-y-6 py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500 flex items-center justify-center">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white">Genius Bar Confirmed!</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        We have registered your slot for <span className="font-bold text-white">{bookingDate}</span> at <span className="font-bold text-white">{bookingTime}</span> at <span className="font-bold text-white">{selectedStore.name}</span>.
                      </p>
                    </div>
                    <div className="w-full p-4 rounded-xl bg-zinc-950 text-[10px] text-zinc-500 border border-zinc-850 leading-relaxed">
                      Please arrive 5 minutes prior to your time. Bring your government-issued ID card and ensure your device backup is completed.
                    </div>
                    <button
                      onClick={() => setSelectedStore(null)}
                      className="w-full bg-white hover:bg-zinc-200 text-black text-xs font-bold py-3 rounded-full transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
