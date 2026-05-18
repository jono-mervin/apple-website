import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apple (United States) - iPhone 16 Pro & iPad Pro Showcase",
  description: "Experience the premium, fully interactive showcase of the iPhone 16 Pro, iPad Pro, AirPods Pro, and Apple Watch Ultra 2. Customize Titanium finishes, simulate high-end zoom lenses, test ProMotion 120Hz scrolling, and book a Genius Bar support consultation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col relative">
        {/* Monochromatic Film Grain Texture */}
        <div className="noise-overlay" />
        
        {/* Lenis Smooth Scroll Physics */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
