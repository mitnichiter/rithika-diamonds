"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, wishlist, notifications } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "Bespoke Designer", path: "/bespoke" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Fluid Island Nav */}
      <header 
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 rounded-full backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled 
            ? "bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20 py-3 px-6" 
            : "bg-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white/10 py-4 px-8"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full bg-[#EBE3DC]/30 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Rithika Diamonds Logo" 
                className="w-14 h-14 object-contain"
                style={{ filter: "invert(13%) sepia(95%) saturate(3048%) hue-rotate(213deg) brightness(18%) contrast(97%)" }} 
              />
            </div>
            <span className="font-serif text-xl font-semibold tracking-wide text-[#122742]">
              Rithika Diamonds
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.path === "/" ? pathname === "/" : pathname?.startsWith(link.path);
              return (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  className={`relative text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isActive ? "text-[#C9A680]" : "text-[#122742] hover:text-[#C9A680]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C9A680]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className="text-[#122742] hover:text-[#C9A680] transition-colors duration-300"
                aria-label="Toggle Search"
              >
                <i className="fa-regular fa-magnifying-glass text-lg"></i>
              </button>
              
              {searchOpen && (
                <div className="absolute top-full right-0 mt-4 w-64 bg-white/95 backdrop-blur-xl border border-[#EBE3DC] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-2 z-50 animate-fade-in">
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search masterpieces..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-sm px-3 py-2 text-[#122742] placeholder:text-[#122742]/40"
                      autoFocus
                    />
                    <button 
                      type="submit" 
                      className="w-8 h-8 rounded-full bg-[#122742] text-white flex items-center justify-center hover:bg-[#C9A680] transition-colors duration-300"
                    >
                      <i className="fa-regular fa-arrow-right text-xs"></i>
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} 
                className="text-[#122742] hover:text-[#C9A680] transition-colors duration-300"
                aria-label="My Account"
              >
                <i className="fa-regular fa-user text-lg"></i>
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute top-full right-0 mt-4 w-48 bg-white/95 backdrop-blur-xl border border-[#EBE3DC] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <Link href="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#122742] hover:bg-[#EBE3DC]/30 transition-colors" onClick={() => setProfileDropdownOpen(false)}>
                    <i className="fa-regular fa-box w-4 text-center"></i> My Orders
                  </Link>
                  <Link href="/address-book" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#122742] hover:bg-[#EBE3DC]/30 transition-colors" onClick={() => setProfileDropdownOpen(false)}>
                    <i className="fa-regular fa-map-location-dot w-4 text-center"></i> Address Book
                  </Link>
                  <Link href="/notifications" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#122742] hover:bg-[#EBE3DC]/30 transition-colors" onClick={() => setProfileDropdownOpen(false)}>
                    <div className="relative">
                      <i className="fa-regular fa-bell w-4 text-center"></i>
                      {unreadNotificationsCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#C9A680] rounded-full"></span>
                      )}
                    </div>
                    Notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative text-[#122742] hover:text-[#C9A680] transition-colors duration-300 hidden sm:block" aria-label="My Wishlist">
              <i className="fa-regular fa-heart text-lg"></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#C9A680] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative text-[#122742] hover:text-[#C9A680] transition-colors duration-300" aria-label="My Cart">
              <i className="fa-regular fa-bag-shopping text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#C9A680] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden relative w-6 h-5 flex flex-col justify-between items-center z-[60]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`w-full h-[1.5px] bg-[#122742] rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileMenuOpen ? "rotate-45 translate-y-[9px] bg-white" : ""}`}></span>
              <span className={`w-full h-[1.5px] bg-[#122742] rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileMenuOpen ? "opacity-0 translate-x-4" : ""}`}></span>
              <span className={`w-full h-[1.5px] bg-[#122742] rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileMenuOpen ? "-rotate-45 -translate-y-[9px] bg-white" : ""}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay with Staggered Mask Reveal */}
      <div 
        className={`fixed inset-0 z-[55] bg-[#122742]/95 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col justify-center px-8 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link, index) => {
            const isActive = link.path === "/" ? pathname === "/" : pathname?.startsWith(link.path);
            return (
              <div key={link.name} className="overflow-hidden">
                <Link 
                  href={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-3xl font-serif tracking-wide transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  } ${isActive ? "text-[#C9A680]" : "text-white hover:text-[#C9A680]"}`}
                  style={{ transitionDelay: `${mobileMenuOpen ? 100 + index * 50 : 0}ms` }}
                >
                  {link.name}
                </Link>
              </div>
            );
          })}
        </nav>
        
        <div className="overflow-hidden mt-12">
          <div 
            className={`flex items-center gap-6 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: `${mobileMenuOpen ? 100 + navLinks.length * 50 : 0}ms` }}
          >
            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white text-sm uppercase tracking-widest">Account</Link>
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white text-sm uppercase tracking-widest">Wishlist</Link>
          </div>
        </div>
      </div>
    </>
  );
};
