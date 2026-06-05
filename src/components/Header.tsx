"use client";

import React, { useState } from "react";
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

  return (
    <header className="main-header">
      {/* Brand Logo */}
      <Link href="/" className="logo-container">
        <img src="/logo.png" alt="Rithika Diamonds Logo" width={56} height={56} style={{ objectFit: "contain", filter: "invert(13%) sepia(95%) saturate(3048%) hue-rotate(213deg) brightness(18%) contrast(97%)", marginLeft: "-12px", marginRight: "-12px", marginTop: "-12px", marginBottom: "-12px" }} />
        <span className="logo-text">Rithika Diamonds</span>
      </Link>

      {/* Main Desktop Navigation Menu */}
      <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`} style={mobileMenuOpen ? {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        backgroundColor: "var(--white)",
        borderBottom: "1px solid var(--border-gray)",
        padding: "20px",
        gap: "15px",
        zIndex: 999
      } : {}}>
        <Link href="/" className={`nav-item ${pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link href="/about" className={`nav-item ${pathname === "/about" ? "active" : ""}`}>
          About Us
        </Link>
        <Link href="/shop" className={`nav-item ${pathname?.startsWith("/shop") ? "active" : ""}`}>
          Shop
        </Link>
        <Link href="/collections" className={`nav-item ${pathname === "/collections" ? "active" : ""}`}>
          Collections
        </Link>
        <Link href="/bespoke" className={`nav-item ${pathname === "/bespoke" ? "active" : ""}`}>
          Bespoke Designer
        </Link>
        <Link href="/contact" className={`nav-item ${pathname === "/contact" ? "active" : ""}`}>
          Contact
        </Link>
      </nav>

      {/* Header Actions (Search, Profile, Wishlist, Cart) */}
      <div className="header-actions">
        {/* Search Action */}
        <div style={{ position: "relative" }}>
          <button className="action-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Toggle Search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          
          {searchOpen && (
            <form onSubmit={handleSearchSubmit} style={{
              position: "absolute",
              top: "100%",
              right: 0,
              backgroundColor: "var(--white)",
              border: "1px solid var(--border-gray)",
              borderRadius: "4px",
              padding: "8px",
              display: "flex",
              gap: "5px",
              zIndex: 1100,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              minWidth: "220px"
            }}>
              <input
                type="text"
                placeholder="Search jewellery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "3px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  width: "100%",
                  outline: "none"
                }}
                autoFocus
              />
              <button type="submit" style={{
                backgroundColor: "var(--accent-blue)",
                color: "var(--white)",
                border: "none",
                borderRadius: "3px",
                padding: "4px 10px",
                fontSize: "11px",
                cursor: "pointer"
              }}>
                Go
              </button>
            </form>
          )}
        </div>

        {/* Profile Dropdown */}
        <div style={{ position: "relative" }}>
          <button className="action-btn" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} aria-label="My Account">
            <i className="fa-regular fa-user"></i>
          </button>

          {profileDropdownOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: 0,
              backgroundColor: "var(--white)",
              border: "1px solid var(--border-gray)",
              borderRadius: "4px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              minWidth: "180px",
              zIndex: 1100,
              padding: "10px 0"
            }} onMouseLeave={() => setProfileDropdownOpen(false)}>
              <Link href="/orders" style={{
                display: "block",
                padding: "8px 20px",
                color: "var(--header-dark)",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 500
              }} onClick={() => setProfileDropdownOpen(false)}>
                <i className="fa-solid fa-box" style={{ width: "18px", marginRight: "8px" }}></i> My Orders
              </Link>
              <Link href="/address-book" style={{
                display: "block",
                padding: "8px 20px",
                color: "var(--header-dark)",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 500
              }} onClick={() => setProfileDropdownOpen(false)}>
                <i className="fa-solid fa-map-location-dot" style={{ width: "18px", marginRight: "8px" }}></i> Address Book
              </Link>
              <Link href="/notifications" style={{
                display: "block",
                padding: "8px 20px",
                color: "var(--header-dark)",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 500
              }} onClick={() => setProfileDropdownOpen(false)}>
                <i className="fa-solid fa-bell" style={{ width: "18px", marginRight: "8px" }}></i> Notifications
                {unreadNotificationsCount > 0 && (
                  <span style={{
                    marginLeft: "6px",
                    backgroundColor: "var(--accent-blue)",
                    color: "white",
                    fontSize: "9px",
                    padding: "1px 6px",
                    borderRadius: "10px"
                  }}>{unreadNotificationsCount}</span>
                )}
              </Link>
            </div>
          )}
        </div>

        {/* Wishlist */}
        <Link href="/wishlist" className="action-btn badge-btn" aria-label="My Wishlist">
          <i className="fa-regular fa-heart"></i>
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>

        {/* Cart */}
        <Link href="/cart" className="action-btn badge-btn" aria-label="My Cart">
          <i className="fa-solid fa-bag-shopping"></i>
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button className="action-btn menu-toggle-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu" style={{
          display: "none",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "22px",
          height: "16px",
          cursor: "pointer",
          padding: 0
        }}>
          <span style={{ transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none", width: "100%", height: "2px", backgroundColor: "var(--header-dark)", transition: "all 0.3s" }}></span>
          <span style={{ opacity: mobileMenuOpen ? 0 : 1, width: "100%", height: "2px", backgroundColor: "var(--header-dark)", transition: "all 0.3s" }}></span>
          <span style={{ transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none", width: "100%", height: "2px", backgroundColor: "var(--header-dark)", transition: "all 0.3s" }}></span>
        </button>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .menu-toggle-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
