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
    <footer className="rd-footer-wrapper">
      {/* Newsletter Section */}
      <div className="rd-newsletter-section">
        <div className="rd-newsletter-content">
          <h3 className="rd-newsletter-title">Subscribe to the World of Rithika</h3>
          <p className="rd-newsletter-desc">
            Be the first to know about our latest high-jewellery collections, private gallery exhibitions, and exclusive bespoke styling consultations.
          </p>
          <form className="rd-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              className="rd-newsletter-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="rd-newsletter-submit" aria-label="Subscribe">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
          {subscribed && (
            <p style={{ color: "#60a5fa", fontSize: "12px", marginTop: "5px", fontWeight: 500 }}>
              <i className="fa-solid fa-circle-check" style={{ marginRight: "6px" }}></i>
              Thank you! You have been successfully subscribed to our newsletter.
            </p>
          )}
        </div>
      </div>

      {/* Main Footer columns */}
      <div className="rd-main-footer">
        {/* Brand Col */}
        <div className="rd-footer-col">
          <Link href="/" className="rd-footer-brand">
            <img src="/logo.png" alt="Rithika Diamonds Logo" width={56} height={56} style={{ objectFit: "contain", marginLeft: "-12px", marginRight: "-12px", marginTop: "-12px", marginBottom: "-12px" }} />
            <span className="rd-brand-name">Rithika Diamonds</span>
          </Link>
          <p className="rd-brand-desc">
            Crafting exclusive diamond masterpieces that merge high art with luxury craftsmanship since 2004.
          </p>
          <div className="rd-social-row">
            <a href="#" className="rd-social-icon" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="rd-social-icon" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="rd-social-icon" aria-label="Pinterest"><i className="fa-brands fa-pinterest-p"></i></a>
            <a href="#" className="rd-social-icon" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
          </div>
        </div>

        {/* Collections Col */}
        <div className="rd-footer-col">
          <h4 className="rd-col-title">Collections</h4>
          <ul className="rd-footer-links">
            <li><Link href="/collections?name=solitaire">The Royal Solitaire</Link></li>
            <li><Link href="/collections?name=floral">Floral Dreamscapes</Link></li>
            <li><Link href="/collections?name=vintage">Vintage Renaissance</Link></li>
            <li><Link href="/collections?name=modern">Modern Minimalist</Link></li>
          </ul>
        </div>

        {/* Support Col */}
        <div className="rd-footer-col">
          <h4 className="rd-col-title">Services</h4>
          <ul className="rd-footer-links">
            <li><Link href="/bespoke">Bespoke Custom Design</Link></li>
            <li><Link href="/about">Private Styling Gallery</Link></li>
            <li><Link href="/contact">Jewellery Care & Cleaning</Link></li>
            <li><Link href="/contact">Ring Sizing Guide</Link></li>
          </ul>
        </div>

        {/* Boutique Col */}
        <div className="rd-footer-col">
          <h4 className="rd-col-title">My Account</h4>
          <ul className="rd-footer-links">
            <li><Link href="/orders">Track My Order</Link></li>
            <li><Link href="/wishlist">My Wishlist</Link></li>
            <li><Link href="/address-book">Address Book</Link></li>
            <li><Link href="/notifications">Notifications</Link></li>
          </ul>
        </div>

        {/* Contact Info Col */}
        <div className="rd-footer-col">
          <h4 className="rd-col-title">Boutique</h4>
          <ul className="rd-contact-list">
            <li className="rd-contact-item">
              <i className="fa-solid fa-location-dot"></i>
              <span>730 Fifth Avenue, 14th Floor<br />New York, NY 10019</span>
            </li>
            <li className="rd-contact-item">
              <i className="fa-solid fa-envelope"></i>
              <span>concierge@rithikadiamonds.com</span>
            </li>
          </ul>
          <button className="rd-whatsapp-btn" onClick={() => window.open("https://wa.me/1234567890", "_blank")}>
            <i className="fa-brands fa-whatsapp"></i> Chat with Concierge
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="rd-footer-bottom">
        <div>&copy; {new Date().getFullYear()} Rithika Diamonds. All Rights Reserved.</div>
        <div className="rd-footer-bottom-left">
          <Link href="/about">Privacy Policy</Link>
          <Link href="/about">Terms of Service</Link>
          <Link href="/contact">Boutique Appointments</Link>
        </div>
      </div>
    </footer>
  );
};
