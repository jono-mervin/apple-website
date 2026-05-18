"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import AppleStoreLocator from "@/components/AppleStoreLocator";
import Footer from "@/components/Footer";
import { Laptop, Smartphone, Watch, Headphones, Tablet, Key, RefreshCw, CreditCard, ChevronRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "@/components/iPhoneCustomizer";

type SupportProduct = "iPhone" | "Mac" | "iPad" | "Watch" | "AirPods";
type SupportAction = "PASSWORD" | "SUBSCRIPTION" | "BILLING" | null;

export default function SupportPage() {
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

  // Interactive diagnostic states
  const [selectedProduct, setSelectedProduct] = useState<SupportProduct | null>(null);
  const [diagnosticRunning, setDiagnosticRunning] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);

  // Guided wizard action states
  const [activeAction, setActiveAction] = useState<SupportAction>(null);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardEmail, setWizardEmail] = useState<string>("");
  const [wizardFeedback, setWizardFeedback] = useState<string | null>(null);

  const handleRemoveFromCart = (cartId: number) => {
    const updated = cart.filter((item) => item.cartId !== cartId);
    setCart(updated);
    localStorage.setItem("apple_cart", JSON.stringify(updated));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("apple_cart");
  };

  // Run hardware diagnostic simulator
  const runDiagnostic = (product: SupportProduct) => {
    setSelectedProduct(product);
    setDiagnosticRunning(true);
    setDiagnosticResult(null);

    setTimeout(() => {
      setDiagnosticRunning(false);
      if (product === "iPhone") {
        setDiagnosticResult("Battery Health: 92% Capacity. Casing thermals nominal. 0 anomalies detected.");
      } else if (product === "Mac") {
        setDiagnosticResult("System Diagnostics: M4 memory bandwidth clean. NAND writes standard. 0 hardware errors.");
      } else if (product === "iPad") {
        setDiagnosticResult("Display Health: Tandem OLED luminosity standard (1000 nits). Touch grid fully operational.");
      } else if (product === "Watch") {
        setDiagnosticResult("Sensor Telemetry: Heart rate monitor, ECG electrode, and depth gauges functioning within spec.");
      } else if (product === "AirPods") {
        setDiagnosticResult("Acoustic Diagnostics: H2 chip ANC frequency wave match: 100%. Dynamic audio balance aligned.");
      }
    }, 1800);
  };

  // Handle wizard submission
  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wizardEmail) return;

    setWizardStep(2);
    setTimeout(() => {
      if (activeAction === "PASSWORD") {
        setWizardFeedback(`A secure password recovery ticket has been logged for ${wizardEmail}. Please check your recovery inbox.`);
      } else if (activeAction === "SUBSCRIPTION") {
        setWizardFeedback(`Subscription check logged successfully. Current active trials details dispatched to ${wizardEmail}.`);
      } else if (activeAction === "BILLING") {
        setWizardFeedback(`Secure billing update portal link transmitted successfully to registered address: ${wizardEmail}.`);
      }
      setWizardStep(3);
    }, 1500);
  };

  const closeWizard = () => {
    setActiveAction(null);
    setWizardStep(1);
    setWizardEmail("");
    setWizardFeedback(null);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-between">
      {/* Background Radial Glow */}
      <div className="absolute top-[20%] right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-[50%] left-1/4 w-[400px] h-[400px] bg-sky-600/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

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

        {/* Headline Section matching Screenshot 4 */}
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-6 text-center select-none space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.38-6.12-3.24-2.65-7.07-7.24-11.51-13.8-5.19-7.73-9.45-16.14-12.77-25.2-3.32-9.06-4.99-17.89-4.99-26.47 0-12.87 3.32-23.72 9.97-32.56 6.64-8.83 15.01-13.31 25.11-13.43 4.48-.07 9.53 1.27 15.17 4.02 5.64 2.75 9.7 4.12 12.19 4.12 2.11 0 6.09-1.28 11.95-3.85 5.86-2.57 10.98-3.76 15.36-3.57 12.42.53 22.18 5.08 29.28 13.63-9.97 6.08-14.86 14.16-14.68 24.23.19 8.1 3.12 14.82 8.79 20.17 5.68 5.35 12.44 8.29 20.3 8.81 1.77 5.56 3.65 11.12 5.64 16.68zm-21.84-110.05c0 6.35-2.28 12.41-6.84 18.17-4.56 5.76-10.13 9.68-16.71 11.77-.38-5.56 1.83-11.45 6.65-17.65 4.82-6.2 10.6-10.22 17.34-12.06.38.45.92 1.4 1.56 2.87.64 1.47 1 3.1 1 4.9z" />
              </svg>
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Apple Support. <br />
            <span className="text-zinc-400">Need help? Start here.</span>
          </h1>
        </div>

        {/* Product Grid selection row matching Screenshot 4 */}
        <div className="max-w-4xl mx-auto px-6 py-6 select-none">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 justify-center items-center">
            {[
              { id: "iPhone", icon: <Smartphone className="w-8 h-8" /> },
              { id: "Mac", icon: <Laptop className="w-8 h-8" /> },
              { id: "iPad", icon: <Tablet className="w-8 h-8" /> },
              { id: "Watch", icon: <Watch className="w-8 h-8" /> },
              { id: "AirPods", icon: <Headphones className="w-8 h-8" /> },
            ].map((prod) => (
              <button
                key={prod.id}
                onClick={() => runDiagnostic(prod.id as SupportProduct)}
                className={`py-6 px-4 bg-zinc-900/30 border border-zinc-850 hover:border-blue-500/50 hover:bg-zinc-900/50 rounded-2xl flex flex-col items-center space-y-3 cursor-pointer transition-all duration-300 transform active:scale-95 group ${
                  selectedProduct === prod.id ? "border-blue-500 bg-blue-950/10 shadow-lg shadow-blue-500/5" : ""
                }`}
              >
                <div className="text-zinc-400 group-hover:text-blue-400 transition-colors duration-300">
                  {prod.icon}
                </div>
                <span className="text-sm font-semibold tracking-wide text-zinc-300 group-hover:text-white transition-colors duration-300">
                  {prod.id}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Hardware diagnostic interactive display panel (Goal 4 extra element) */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-4xl mx-auto px-6 select-none"
            >
              <div className="p-6 bg-zinc-900/40 border border-zinc-850 rounded-2xl space-y-4 relative">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-xs font-bold text-zinc-500 hover:text-white transition-colors"
                >
                  Close Diagnostic
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                  <h4 className="text-sm font-extrabold uppercase tracking-widest text-zinc-400">
                    Interactive diagnostic terminal: {selectedProduct}
                  </h4>
                </div>

                {diagnosticRunning ? (
                  <div className="py-4 space-y-3 text-left">
                    <p className="text-xs text-zinc-400 animate-pulse font-mono">
                      $ run_diagnostic --device={selectedProduct} --verbose
                    </p>
                    <div className="w-full h-1 bg-zinc-850 rounded-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 h-full bg-blue-500 animate-loading-bar" style={{ width: "100%" }} />
                    </div>
                    <span className="text-[10px] text-zinc-550 block">Evaluating system logs, chip cores, and sensor matrices...</span>
                  </div>
                ) : (
                  <div className="py-2 text-left space-y-3">
                    <p className="text-xs font-mono text-emerald-400 bg-emerald-950/15 border border-emerald-900/30 p-3 rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{diagnosticResult}</span>
                    </p>
                    <button
                      onClick={() => runDiagnostic(selectedProduct)}
                      className="px-4 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Re-run Diagnostics</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Help Action Cards matching Screenshot 4 */}
        <div className="max-w-4xl mx-auto px-6 py-8 select-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "PASSWORD" as SupportAction,
                icon: <Key className="w-5 h-5 text-blue-400" />,
                title: "Reset Apple Account password",
                desc: "Regain access to your Apple account safely using registered security logs.",
              },
              {
                id: "SUBSCRIPTION" as SupportAction,
                icon: <RefreshCw className="w-5 h-5 text-emerald-400" />,
                title: "Change a subscription",
                desc: "Audit trial lengths, cancel renewals, or bundle services for discounts.",
              },
              {
                id: "BILLING" as SupportAction,
                icon: <CreditCard className="w-5 h-5 text-purple-400" />,
                title: "Billing and payments",
                desc: "Check payment logs, manage billing records, or update checkout profiles.",
              },
            ].map((action) => (
              <button
                key={action.title}
                onClick={() => {
                  setActiveAction(action.id);
                  setWizardStep(1);
                  setWizardFeedback(null);
                }}
                className="p-6 bg-zinc-900/20 border border-zinc-850 hover:border-zinc-700 rounded-2xl text-left space-y-4 hover:bg-zinc-900/40 transition-all duration-300 transform active:scale-98 group cursor-pointer"
              >
                <div className="p-3 bg-zinc-950/60 rounded-xl w-fit border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                  {action.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-zinc-150 font-display group-hover:text-white transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-zinc-450 text-[11px] leading-relaxed">
                    {action.desc}
                  </p>
                </div>
                <div className="flex items-center text-[10px] text-blue-400 font-extrabold uppercase tracking-wider group-hover:underline">
                  <span>Configure Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Guided Wizard interactive Modal (Goal 4 extra element) */}
        <AnimatePresence>
          {activeAction && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 select-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6 relative overflow-hidden"
              >
                {/* Background glow highlights */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />

                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-5 h-5 text-blue-400" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-350">
                      Apple Support Advisor
                    </span>
                  </div>
                  <button
                    onClick={closeWizard}
                    className="text-xs font-bold text-zinc-550 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                {wizardStep === 1 && (
                  <form onSubmit={handleWizardSubmit} className="space-y-4 text-left">
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white">
                        {activeAction === "PASSWORD"
                          ? "Recover Apple Account Password"
                          : activeAction === "SUBSCRIPTION"
                          ? "Audit Apple Subscriptions"
                          : "Configure Apple Billing"}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        Please provide your registered Apple ID or email address to launch the secure support wizard.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
                        Apple ID or Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={wizardEmail}
                        onChange={(e) => setWizardEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 focus:border-blue-500 focus:outline-none rounded-xl text-sm font-semibold transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs transition-colors"
                    >
                      Authenticate and Continue
                    </button>
                  </form>
                )}

                {wizardStep === 2 && (
                  <div className="py-8 space-y-4 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Securing Channel Encryption</h4>
                      <p className="text-[11px] text-zinc-400">Verifying customer tokens and dispatching security credentials...</p>
                    </div>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div className="space-y-6 text-left">
                    <div className="p-4 bg-emerald-950/10 border border-emerald-900/30 rounded-2xl flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-zinc-200">Task Logged Successfully</h4>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          {wizardFeedback}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={closeWizard}
                      className="w-full py-2.5 bg-white text-black rounded-xl font-extrabold text-xs transition-colors hover:bg-zinc-200"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Embedded Zip Store Locator Component (Goal 4 base) */}
        <div className="py-12 border-t border-zinc-900 bg-zinc-950/20">
          <AppleStoreLocator />
        </div>
      </div>

      <Footer />
    </div>
  );
}
