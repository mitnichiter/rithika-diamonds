"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp, Product } from "@/context/AppContext";

export default function Home() {
  const { products, addToCart, toggleWishlist, isInWishlist } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  // Take the first 4 products for featured section
  const featuredProducts = products.slice(0, 4);

  const handleQuickAdd = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      metal: "18K White Gold", // default
      size: "7", // default ring size
      quantity: 1
    });
  };

  return (
    <>
      <main>
        {/* ==========================================
             3. HERO SECTION
             ========================================== */}
        <section className="hero-section">
          <div className="hero-left">
            <div className="hero-content">
              <div className="hero-logo-mark">
                <img src="/logo.png" alt="Rithika Diamonds Logo" className="hero-logo-svg" width={96} height={96} style={{ objectFit: "contain", marginLeft: "-18px", marginRight: "-18px", marginTop: "-18px", marginBottom: "-18px" }} />
                <div className="hero-brand-name">Rithika Diamonds</div>
              </div>

              <h1 className="hero-title">Crafting Exclusive<br /><span>Diamond Masterpieces</span></h1>

              <div className="hero-separator">
                <span className="line"></span>
                <span className="diamond-icon">◆</span>
                <span className="line"></span>
              </div>

              <p className="hero-description">
                Custom-made diamond jewellery crafted with precision, passion and perfection.
              </p>

              <div className="hero-buttons">
                <Link href="/shop" className="btn btn-outline">SHOP DIAMONDS <i className="fa-solid fa-arrow-right-long"></i></Link>
                <Link href="/bespoke" className="btn btn-filled" style={{ backgroundColor: "var(--accent-blue)", color: "white", borderColor: "var(--accent-blue)" }}>CUSTOMIZE YOUR DESIGN <i className="fa-solid fa-arrow-right-long"></i></Link>
              </div>
            </div>
          </div>

          <div className="hero-right"></div>

          <div className="slider-dots">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx} 
                className={`dot ${activeSlide === idx ? "active" : ""}`}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  ...(activeSlide === idx ? { backgroundColor: "var(--accent-blue)" } : {}),
                  border: "none",
                  padding: 0,
                  display: "block"
                }}
              ></button>
            ))}
          </div>
        </section>

        {/* ==========================================
             4. TRUST BADGES BANNER
             ========================================== */}
        <section className="trust-banner">
          <div className="trust-card">
            <div className="trust-icon" style={{ color: "var(--accent-blue)" }}>
              <i className="fa-regular fa-gem"></i>
            </div>
            <div className="trust-info">
              <span className="trust-title">100% Certified Diamonds</span>
              <span className="trust-subtitle">Authenticity Guaranteed</span>
            </div>
          </div>
          
          <div className="trust-card">
            <div className="trust-icon" style={{ color: "var(--accent-blue)" }}>
              <i className="fa-solid fa-industry"></i>
            </div>
            <div className="trust-info">
              <span className="trust-title">In-house Manufacturing</span>
              <span className="trust-subtitle">Precision & Quality</span>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon" style={{ color: "var(--accent-blue)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div className="trust-info">
              <span className="trust-title">Custom Made Jewellery</span>
              <span className="trust-subtitle">Made Just For You</span>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon" style={{ color: "var(--accent-blue)" }}>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div className="trust-info">
              <span className="trust-title">Secure Payments</span>
              <span className="trust-subtitle">Safe & Encrypted</span>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon" style={{ color: "var(--accent-blue)" }}>
              <i className="fa-solid fa-rotate-left"></i>
            </div>
            <div className="trust-info">
              <span className="trust-title">Easy Returns</span>
              <span className="trust-subtitle">Hassle Free Returns</span>
            </div>
          </div>
        </section>

        {/* ==========================================
             5. SHOP BY CATEGORY SECTION
             ========================================== */}
        <section className="category-section">
          <div className="category-header">
            <h2>Shop By Category</h2>
            <div className="separator">
              <span className="separator-line"></span>
              <span className="diamond-bullet" style={{ color: "var(--accent-blue)" }}>◆</span>
              <span className="separator-line"></span>
            </div>
          </div>

          <div className="categories-grid">
            <article className="category-card">
              <div className="card-media-wrapper">
                <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80" alt="Diamond Rings" className="category-img" />
                <div className="category-icon-circle" style={{ backgroundColor: "var(--accent-blue)" }}>
                  <i className="fa-solid fa-ring"></i>
                </div>
              </div>
              <div className="category-info">
                <h3 className="category-name">Diamond Rings</h3>
                <Link href="/shop?category=Rings" className="category-link">Shop Now <i className="fa-solid fa-arrow-right-long"></i></Link>
              </div>
            </article>

            <article className="category-card">
              <div className="card-media-wrapper">
                <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80" alt="Diamond Pendants" className="category-img" />
                <div className="category-icon-circle" style={{ backgroundColor: "var(--accent-blue)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4,4 Q12,18 20,4" />
                    <circle cx="12" cy="13" r="3" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <div className="category-info">
                <h3 className="category-name">Diamond Pendants</h3>
                <Link href="/shop?category=Pendants" className="category-link">Shop Now <i className="fa-solid fa-arrow-right-long"></i></Link>
              </div>
            </article>

            <article className="category-card">
              <div className="card-media-wrapper">
                <img src="https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=500&q=80" alt="Diamond Earrings" className="category-img" />
                <div className="category-icon-circle" style={{ backgroundColor: "var(--accent-blue)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="8" cy="8" r="2" fill="currentColor"/>
                    <path d="M8,10 L8,16 L6,18 M8,16 L10,18" />
                    <circle cx="16" cy="8" r="2" fill="currentColor"/>
                    <path d="M16,10 L16,16 L14,18 M16,16 L18,18" />
                  </svg>
                </div>
              </div>
              <div className="category-info">
                <h3 className="category-name">Diamond Earrings</h3>
                <Link href="/shop?category=Earrings" className="category-link">Shop Now <i className="fa-solid fa-arrow-right-long"></i></Link>
              </div>
            </article>

            <article className="category-card">
              <div className="card-media-wrapper">
                <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80" alt="Diamond Bracelets" className="category-img" />
                <div className="category-icon-circle" style={{ backgroundColor: "var(--accent-blue)" }}>
                  <i className="fa-solid fa-crown"></i>
                </div>
              </div>
              <div className="category-info">
                <h3 className="category-name">Diamond Bracelets</h3>
                <Link href="/shop?category=Bracelets" className="category-link">Shop Now <i className="fa-solid fa-arrow-right-long"></i></Link>
              </div>
            </article>

            <article className="category-card">
              <div className="card-media-wrapper">
                <img src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=80" alt="Custom Jewellery" className="category-img" />
                <div className="category-icon-circle" style={{ backgroundColor: "var(--accent-blue)" }}>
                  <i className="fa-solid fa-pen-fancy"></i>
                </div>
              </div>
              <div className="category-info">
                <h3 className="category-name">Custom Jewellery</h3>
                <Link href="/bespoke" className="category-link">Shop Now <i className="fa-solid fa-arrow-right-long"></i></Link>
              </div>
            </article>
          </div>
        </section>

        {/* ==========================================
             6. FEATURED DIAMONDS GRID SECTION
             ========================================== */}
        <section className="featured-diamonds-section">
          <div className="fd-container">
            <div className="fd-header">
              <h2 className="fd-title">Featured Diamonds</h2>
              <p className="fd-subtitle">Handpicked brilliance, crafted for you.</p>
            </div>

            <div className="fd-grid">
              {featuredProducts.map((product) => {
                const wishlisted = isInWishlist(product.id);
                return (
                  <article className="fd-card" key={product.id}>
                    <div className="fd-image-container">
                      <button 
                        className="fd-wishlist-btn" 
                        onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })}
                        aria-label="Add to Wishlist"
                        style={wishlisted ? { color: "#ef4444", backgroundColor: "rgba(255,255,255,0.9)" } : {}}
                      >
                        <i className={wishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                      </button>
                      <img src={product.image} alt={product.name} className="fd-image" />
                    </div>
                    <div className="fd-details">
                      <div className="fd-product-info">
                        <Link href={`/product/${product.id}`} className="fd-name" style={{ textDecoration: "none" }}>
                          {product.name}
                        </Link>
                        <span className="fd-price">${product.price.toLocaleString()}</span>
                      </div>
                      <div className="fd-actions">
                        <button className="fd-add-cart-btn" style={{ backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" }} onClick={() => handleQuickAdd(product)}>Add to Cart</button>
                        <button className="fd-bag-btn" aria-label="Quick Add" onClick={() => handleQuickAdd(product)}>
                          <i className="fa-solid fa-bag-shopping"></i>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
             7. CUSTOM MADE STEP PROCESS SECTION
             ========================================== */}
        <section className="custom-design-section">
          <div className="custom-design-container">
            <div className="custom-design-intro">
              <span className="intro-tag" style={{ color: "var(--accent-light)" }}>Custom Made, Just For You</span>
              <h2 className="intro-title">Design Your Own<br />Diamond Jewellery</h2>
              <div className="intro-underline"></div>
              <p className="intro-description">
                From your imagination to a masterpiece.<br />We make your dream jewellery come to life.
              </p>
              <Link href="/bespoke" className="intro-btn">
                Start Custom Design 
                <svg className="btn-arrow" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "8px" }}>
                  <path d="M10 1L15 6L10 11M15 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="custom-design-steps-wrapper">
              <div className="step-item">
                <div className="step-icon-wrap">
                  <svg className="step-svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    <circle cx="9" cy="12" r="1" fill="var(--accent-light)" />
                    <circle cx="13" cy="12" r="1" fill="var(--accent-light)" />
                    <circle cx="17" cy="12" r="1" fill="var(--accent-light)" />
                  </svg>
                </div>
                <div className="step-number" style={{ border: "1px solid var(--accent-light)", color: "white" }}>1</div>
                <h3 className="step-title">Share Your Idea</h3>
                <p className="step-desc">Tell us what you have in mind.</p>
              </div>

              <div className="step-connector">
                <div className="connector-line"></div>
              </div>

              <div className="step-item">
                <div className="step-icon-wrap">
                  <svg className="step-svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="14" r="6" stroke="var(--accent-light)" strokeWidth="1.2" />
                    <circle cx="12" cy="14" r="8.5" stroke="var(--accent-light)" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.3" />
                    <path d="M12 8 L9 5 L15 5 Z" stroke="var(--accent-light)" strokeWidth="1" strokeLinejoin="round" />
                    <path d="M9 5 L10 2 L14 2 L15 5 Z" stroke="var(--accent-light)" strokeWidth="1" strokeLinejoin="round" />
                    <line x1="10" y1="2" x2="12" y2="5" stroke="var(--accent-light)" strokeWidth="0.8" />
                    <line x1="14" y1="2" x2="12" y2="5" stroke="var(--accent-light)" strokeWidth="0.8" />
                  </svg>
                </div>
                <div className="step-number">2</div>
                <h3 className="step-title">Design & Approve</h3>
                <p className="step-desc">Our experts create & finalize the design.</p>
              </div>

              <div className="step-connector">
                <div className="connector-line"></div>
              </div>

              <div className="step-item">
                <div className="step-icon-wrap">
                  <svg className="step-svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9 L6 3 L18 3 L22 9 Z" />
                    <path d="M2 9 L12 21 L22 9 Z" />
                    <line x1="6" y1="3" x2="12" y2="9" />
                    <line x1="18" y1="3" x2="12" y2="9" />
                    <line x1="12" y1="3" x2="12" y2="21" />
                    <line x1="6" y1="3" x2="2" y2="9" />
                    <line x1="18" y1="3" x2="22" y2="9" />
                    <line x1="2" y1="9" x2="12" y2="9" />
                    <line x1="22" y1="9" x2="12" y2="9" />
                    <line x1="6" y1="9" x2="12" y2="21" />
                    <line x1="18" y1="9" x2="12" y2="21" />
                  </svg>
                </div>
                <div className="step-number">3</div>
                <h3 className="step-title">Expert Crafting</h3>
                <p className="step-desc">Precision manufacturing by our artisans.</p>
              </div>

              <div className="step-connector">
                <div className="connector-line"></div>
              </div>

              <div className="step-item">
                <div className="step-icon-wrap">
                  <svg className="step-svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="10" width="16" height="11" rx="1" />
                    <rect x="3" y="7" width="18" height="3" rx="0.5" />
                    <line x1="12" y1="7" x2="12" y2="21" />
                  </svg>
                </div>
                <div className="step-number">4</div>
                <h3 className="step-title">Delivery</h3>
                <p className="step-desc">Your masterpiece, delivered to you.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Home page isolated styling */
        .hero-section {
          position: relative;
          background-color: var(--primary-navy);
          display: flex;
          min-height: 600px;
          height: calc(100vh - 120px);
          max-height: 780px;
          overflow: hidden;
        }

        .hero-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 80px;
          position: relative;
          z-index: 2;
        }

        .hero-content {
          max-width: 540px;
          width: 100%;
          text-align: center;
          color: var(--white);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-logo-mark {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .hero-logo-svg {
          color: var(--white);
          filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.15));
        }

        .hero-brand-name {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: 44px;
          font-weight: 300;
          line-height: 1.25;
          letter-spacing: 0.5px;
          margin-bottom: 22px;
        }

        .hero-title span {
          font-weight: 600;
          letter-spacing: 1px;
        }

        .hero-separator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          width: 100%;
          margin-bottom: 28px;
        }

        .hero-separator .line {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.35), transparent);
          width: 100px;
        }

        .hero-separator .diamond-icon {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.65);
          display: inline-block;
        }

        .hero-description {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.8);
          max-width: 440px;
          margin-bottom: 45px;
          letter-spacing: 0.5px;
        }

        .hero-buttons {
          display: flex;
          gap: 18px;
          width: 100%;
          justify-content: center;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 15px 30px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 4px;
          transition: var(--transition);
        }

        .btn i {
          font-size: 11px;
          transition: transform 0.25s ease;
        }

        .btn:hover i {
          transform: translateX(4px);
        }

        .btn-outline {
          border: 1px solid rgba(255, 255, 255, 0.55);
          color: var(--white);
          background: transparent;
        }

        .btn-outline:hover {
          background-color: var(--white);
          color: var(--primary-navy);
          border-color: var(--white);
        }

        .btn-filled {
          background-color: var(--white);
          color: var(--primary-navy);
          border: 1px solid var(--white);
        }

        .btn-filled:hover {
          background-color: transparent;
          color: var(--white);
          border-color: rgba(255, 255, 255, 0.55);
        }

        .hero-right {
          flex: 1.1;
          background: linear-gradient(to right, var(--primary-navy) 0%, rgba(2, 11, 22, 0.45) 30%, transparent 100%),
                      url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80') no-repeat center center / cover;
          position: relative;
          z-index: 1;
        }

        .slider-dots {
          position: absolute;
          bottom: 30px;
          left: 25%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 5;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          transition: var(--transition);
        }

        .dot.active {
          background-color: var(--accent-blue);
          transform: scale(1.35);
        }

        /* TRUST BADGES BANNER */
        .trust-banner {
          background-color: var(--light-blue-gray);
          border-top: 1px solid var(--border-gray);
          border-bottom: 1px solid var(--border-gray);
          padding: 30px 60px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }

        .trust-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-right: 20px;
          border-right: 1px solid var(--border-gray);
        }

        .trust-card:last-child {
          border-right: none;
          padding-right: 0;
        }

        .trust-icon {
          font-size: 28px;
          color: var(--header-dark);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trust-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .trust-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--header-dark);
          letter-spacing: 0.3px;
        }

        .trust-subtitle {
          font-size: 11px;
          color: var(--text-gray);
          font-weight: 400;
        }

        /* SHOP BY CATEGORY */
        .category-section {
          padding: 80px 60px;
          background-color: var(--white);
        }

        .category-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .category-header h2 {
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 500;
          letter-spacing: 2px;
          color: var(--header-dark);
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .category-header .separator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .category-header .separator-line {
          height: 1px;
          width: 60px;
          background: linear-gradient(to right, transparent, var(--text-gray), transparent);
        }

        .category-header .diamond-bullet {
          font-size: 8px;
          color: var(--header-dark);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .category-card {
          background-color: var(--white);
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--border-gray);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 30px rgba(2, 16, 36, 0.08);
          border-color: #cbd5e1;
        }

        .card-media-wrapper {
          position: relative;
          height: 310px;
          overflow: visible;
        }

        .category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .category-card:hover .category-img {
          transform: scale(1.05);
        }

        .category-icon-circle {
          position: absolute;
          bottom: -22px;
          left: 50%;
          transform: translateX(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(2, 16, 36, 0.25);
          z-index: 10;
          transition: var(--transition);
        }

        .category-card:hover .category-icon-circle {
          transform: translateX(-50%) scale(1.1);
        }

        .category-info {
          padding: 35px 15px 25px 15px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          background-color: var(--white);
        }

        .category-name {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 1px;
          color: var(--header-dark);
          text-transform: uppercase;
        }

        .category-link {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-gray);
          text-decoration: none;
          letter-spacing: 0.5px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition);
        }

        .category-link:hover {
          color: var(--header-dark);
        }

        .category-link i {
          font-size: 10px;
          transition: transform 0.2s ease;
        }

        .category-link:hover i {
          transform: translateX(3px);
        }

        /* FEATURED DIAMONDS GRID */
        .featured-diamonds-section {
          background-color: #fcfcfd;
          padding: 80px 60px;
          border-top: 1px solid var(--border-gray);
          border-bottom: 1px solid var(--border-gray);
        }

        .fd-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .fd-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .fd-title {
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 500;
          letter-spacing: 2px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .fd-subtitle {
          font-size: 13px;
          color: var(--text-gray);
          font-weight: 400;
          letter-spacing: 0.5px;
        }

        .fd-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .fd-card {
          background-color: var(--white);
          border-radius: 8px;
          border: 1px solid var(--border-gray);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          position: relative;
        }

        .fd-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(2, 16, 36, 0.06);
          border-color: #cbd5e1;
        }

        .fd-image-container {
          position: relative;
          height: 310px;
          width: 100%;
          overflow: hidden;
          background-color: #f8fafc;
        }

        .fd-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .fd-card:hover .fd-image {
          transform: scale(1.04);
        }

        .fd-wishlist-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          color: var(--header-dark);
          font-size: 18px;
          cursor: pointer;
          z-index: 5;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .fd-wishlist-btn:hover {
          background-color: rgba(255, 255, 255, 0.9);
          transform: scale(1.1);
        }

        .fd-details {
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .fd-product-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .fd-name {
          font-size: 14px;
          font-weight: 500;
          color: var(--header-dark);
          letter-spacing: 0.2px;
          transition: var(--transition);
        }
        
        .fd-name:hover {
          color: var(--accent-blue);
        }

        .fd-price {
          font-size: 15px;
          font-weight: 600;
          color: var(--header-dark);
        }

        .fd-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .fd-add-cart-btn {
          flex-grow: 1;
          color: var(--white);
          border: 1px solid var(--accent-blue);
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 11px 16px;
          cursor: pointer;
          transition: var(--transition);
          text-align: center;
        }

        .fd-add-cart-btn:hover {
          opacity: 0.9;
        }

        .fd-bag-btn {
          background: none;
          border: 1px solid var(--border-gray);
          color: var(--header-dark);
          border-radius: 4px;
          width: 38px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          font-size: 14px;
        }

        .fd-bag-btn:hover {
          border-color: var(--header-dark);
          background-color: var(--light-blue-gray);
        }

        /* CUSTOM DESIGN */
        .custom-design-section {
          background-color: var(--primary-navy);
          color: var(--white);
          padding: 100px 60px;
        }

        .custom-design-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
        }

        .custom-design-intro {
          flex: 1;
          max-width: 420px;
        }

        .intro-tag {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 15px;
        }

        .intro-title {
          font-family: var(--font-serif);
          font-size: 40px;
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 18px;
          letter-spacing: 0.5px;
        }

        .intro-underline {
          height: 1px;
          width: 100%;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.25) 50%, transparent 100%);
          margin-bottom: 22px;
        }

        .intro-description {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 35px;
          letter-spacing: 0.3px;
        }

        .intro-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background-color: var(--white);
          color: var(--primary-navy);
          padding: 15px 32px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-decoration: none;
          border-radius: 4px;
          transition: var(--transition);
          border: 1px solid var(--white);
        }

        .intro-btn:hover {
          background-color: transparent;
          color: var(--white);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .custom-design-steps-wrapper {
          flex: 2;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .step-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 180px;
        }

        .step-icon-wrap {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          transition: var(--transition);
        }

        .step-item:hover .step-icon-wrap {
          transform: scale(1.08);
        }

        .step-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 18px;
          transition: var(--transition);
        }

        .step-item:hover .step-number {
          background-color: var(--accent-blue);
          border-color: var(--accent-blue);
          color: var(--white);
        }

        .step-title {
          font-size: 19px;
          font-weight: 600;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }

        .step-desc {
          font-size: 12px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 300;
        }

        .step-connector {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
        }

        .connector-line {
          width: 100%;
          border-top: 1.5px dotted rgba(255, 255, 255, 0.25);
          position: relative;
        }

        .connector-line::after {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent-blue);
        }

        /* Responsiveness */
        @media (max-width: 1024px) {
          .hero-section {
            flex-direction: column;
            height: auto;
            max-height: none;
          }
          .hero-left {
            padding: 60px 40px;
          }
          .hero-right {
            height: 350px;
            min-height: 350px;
          }
          .slider-dots {
            left: 50%;
            bottom: 370px;
          }
          .trust-banner {
            grid-template-columns: repeat(3, 1fr);
            padding: 30px;
          }
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .fd-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .custom-design-container {
            flex-direction: column;
            gap: 40px;
            padding: 0;
          }
          .custom-design-intro {
            max-width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .trust-banner {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .trust-card {
            border-right: none;
            border-bottom: 1px solid var(--border-gray);
            padding-bottom: 15px;
          }
          .trust-card:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .category-section {
            padding: 40px 20px;
          }
          .categories-grid {
            grid-template-columns: 1fr;
          }
          .featured-diamonds-section {
            padding: 40px 20px;
          }
          .fd-grid {
            grid-template-columns: 1fr;
          }
          .custom-design-section {
            padding: 60px 20px;
          }
          .custom-design-steps-wrapper {
            flex-direction: column;
            gap: 30px;
            align-items: center;
          }
          .step-connector {
            display: none;
          }
        }
      `}} />
    </>
  );
}
