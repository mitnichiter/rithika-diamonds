"use client";

import React, { useState } from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-primary text-secondary py-32 px-6 md:px-12 lg:px-24 selection:bg-accent selection:text-primary">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Newsletter (Asymmetrical) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32 items-end">
          <div className="lg:col-span-7">
            <h3 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 text-secondary">
              The World of <br />
              <span className="text-accent italic">Rithika</span>
            </h3>
            <p className="text-secondary/80 text-lg md:text-xl max-w-md font-light">
              Be the first to know about our latest high-jewellery collections, private gallery exhibitions, and exclusive bespoke styling consultations.
            </p>
          </div>
          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="relative group">
              <div className="flex items-center border-b border-secondary/30 pb-4 transition-colors duration-500 group-hover:border-accent">
                <input
                  type="email"
                  className="w-full bg-transparent text-secondary placeholder:text-secondary/50 focus:outline-none text-lg font-light"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="ml-4 text-secondary hover:text-accent transition-colors duration-300"
                  aria-label="Subscribe"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
              {subscribed && (
                <p className="absolute -bottom-8 left-0 text-accent text-sm font-light flex items-center gap-2 animate-fade-in">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Thank you! You have been successfully subscribed.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-32">
          {/* Brand Column */}
          <div className="lg:col-span-5 pr-0 lg:pr-16">
            <Link href="/" className="inline-block mb-8 group">
              <span className="font-serif text-3xl tracking-wide text-secondary group-hover:text-accent transition-colors duration-500">
                Rithika Diamonds
              </span>
            </Link>
            <p className="text-secondary/70 font-light leading-relaxed mb-10 max-w-sm">
              Crafting exclusive diamond masterpieces that merge high art with luxury craftsmanship since 2004. A legacy built on timeless elegance, unwavering trust, and uncompromising craftsmanship.
            </p>
            <div className="flex gap-6">
              {["Instagram", "Facebook", "Pinterest", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-secondary/60 hover:text-accent transition-colors duration-300 text-sm uppercase tracking-widest"
                  aria-label={social}
                >
                  {social.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xl mb-8 text-secondary">Collections</h4>
            <ul className="space-y-4">
              {[
                { name: "The Royal Solitaire", href: "/collections?name=solitaire" },
                { name: "Floral Dreamscapes", href: "/collections?name=floral" },
                { name: "Vintage Renaissance", href: "/collections?name=vintage" },
                { name: "Modern Minimalist", href: "/collections?name=modern" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-secondary/70 hover:text-accent transition-colors duration-300 font-light text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-serif text-xl mb-8 text-secondary">Services</h4>
            <ul className="space-y-4">
              {[
                { name: "Bespoke Custom Design", href: "/bespoke" },
                { name: "Private Styling Gallery", href: "/about" },
                { name: "Jewellery Care & Cleaning", href: "/contact" },
                { name: "Ring Sizing Guide", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-secondary/70 hover:text-accent transition-colors duration-300 font-light text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-serif text-xl mb-8 text-secondary">Boutique</h4>
            <ul className="space-y-6">
              <li className="text-secondary/70 font-light text-sm leading-relaxed">
                730 Fifth Avenue, 14th Floor<br />
                New York, NY 10019
              </li>
              <li>
                <a href="mailto:concierge@rithikadiamonds.com" className="text-secondary/70 hover:text-accent transition-colors duration-300 font-light text-sm">
                  concierge@rithikadiamonds.com
                </a>
              </li>
              <li>
                <button
                  onClick={() => window.open("https://wa.me/1234567890", "_blank")}
                  className="mt-4 inline-flex items-center gap-3 text-sm font-light text-secondary border border-secondary/30 px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-all duration-500"
                >
                  Chat with Concierge
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-secondary/10 text-xs font-light text-secondary/50">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Rithika Diamonds. All Rights Reserved.
          </div>
          <div className="flex gap-8">
            <Link href="/about" className="hover:text-accent transition-colors duration-300">Privacy Policy</Link>
            <Link href="/about" className="hover:text-accent transition-colors duration-300">Terms of Service</Link>
            <Link href="/contact" className="hover:text-accent transition-colors duration-300">Boutique Appointments</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
