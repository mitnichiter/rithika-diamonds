"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApp, Product } from "@/context/AppContext";

import { Suspense } from "react";

function ShopContent() {
  const { products, addToCart, toggleWishlist, isInWishlist } = useApp();
  const searchParams = useSearchParams();

  // Selected filter states
  const [selectedCategory, setSelectedCategory] = useState("All Jewellery");
  const [selectedMetal, setSelectedMetal] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // Sync category filter from URL search params if present
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("All Jewellery");
    }

    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchFilter(searchParam);
    } else {
      setSearchFilter("");
    }
  }, [searchParams]);

  const toggleMetalFilter = (metal: string) => {
    setSelectedMetal((prev) =>
      prev.includes(metal) ? prev.filter((m) => m !== metal) : [...prev, metal]
    );
  };

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

  // Memoized filter and sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (searchFilter.trim()) {
      const query = searchFilter.toLowerCase().trim();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "All Jewellery") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Metal filter (Since metals are mock-up attributes, let's filter if metal contains white/yellow/rose etc.)
    if (selectedMetal.length > 0) {
      // In this static mock we just randomly distribute or select
      result = result.filter((p) => {
        if (selectedMetal.includes("White Gold") && p.id.includes("ring")) return true;
        if (selectedMetal.includes("Yellow Gold") && p.id.includes("pendant")) return true;
        if (selectedMetal.includes("Platinum") && p.id.includes("bracelet")) return true;
        if (selectedMetal.includes("Rose Gold") && p.id.includes("earring")) return true;
        return false;
      });
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, selectedMetal, sortBy, searchFilter]);

  const resetFilters = () => {
    setSelectedCategory("All Jewellery");
    setSelectedMetal([]);
    setSortBy("featured");
    setSearchFilter("");
  };

  return (
    <>
      <main>
        {/* ==========================================
             3. SHOP HEADER BANNER
             ========================================== */}
        <section className="shop-header-banner">
          <div className="shop-banner-left">
            <div className="shop-banner-content">
              <div className="shop-breadcrumbs">
                Home &gt; <span style={{ color: "var(--accent-blue)" }}>Shop</span>
              </div>
              <h1 className="shop-banner-title">{selectedCategory === "All Jewellery" ? "Shop Exquisite Diamonds" : selectedCategory}</h1>
              <p className="shop-banner-description">Discover exquisite diamond jewellery crafted with precision, passion and perfection.</p>
            </div>
          </div>
          <div className="shop-banner-right"></div>
        </section>

        {/* ==========================================
             4. SHOP ENGINE (SIDEBAR & PRODUCT GRID)
             ========================================== */}
        <section className="shop-body-section">
          {/* Mobile Filter Navigation Toggle */}
          <div className="mobile-filter-bar">
            <button className="mobile-filter-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <i className="fa-solid fa-sliders"></i> Filters & Categories
            </button>
            <span className="results-count">Showing {filteredProducts.length} results</span>
          </div>

          <div className="shop-body-container">
            {/* Sidebar Column */}
            <aside className={`shop-sidebar ${mobileMenuOpen ? "active" : ""}`} style={mobileMenuOpen ? {
              display: "flex",
              position: "fixed",
              top: 0,
              left: 0,
              width: "280px",
              height: "100%",
              backgroundColor: "white",
              zIndex: 1050,
              padding: "30px 20px",
              boxShadow: "10px 0 30px rgba(0,0,0,0.15)",
              overflowY: "auto"
            } : {}}>

              {mobileMenuOpen && (
                <button onClick={() => setMobileMenuOpen(false)} style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "var(--header-dark)"
                }}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}

              {/* Categories Block */}
              <div className="filter-group">
                <h3 className="filter-title">Categories</h3>
                <ul className="category-filter-list">
                  {[
                    { name: "All Jewellery", count: products.length, icon: "fa-border-all" },
                    { name: "Rings", count: products.filter(p => p.category === "Rings").length, icon: "fa-ring" },
                    { name: "Pendants", count: products.filter(p => p.category === "Pendants").length, icon: "fa-gem" },
                    { name: "Earrings", count: products.filter(p => p.category === "Earrings").length, icon: "fa-certificate" },
                    { name: "Bracelets", count: products.filter(p => p.category === "Bracelets").length, icon: "fa-infinity" }
                  ].map((cat) => (
                    <li 
                      key={cat.name} 
                      className={selectedCategory === cat.name ? "active" : ""}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setMobileMenuOpen(false);
                      }}
                      style={selectedCategory === cat.name ? { fontWeight: 600, color: "var(--accent-blue)" } : {}}
                    >
                      <span>
                        <i className={`fa-solid ${cat.icon}`} style={selectedCategory === cat.name ? { color: "var(--accent-blue)" } : {}}></i> 
                        {cat.name}
                      </span>
                      <span className="count">({cat.count})</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filter Options */}
              <div className="filter-group">
                <h3 className="filter-title">Filter By</h3>
                
                {/* Search Term Status */}
                {searchFilter && (
                  <div style={{ marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: "var(--accent-blue)", fontWeight: 500 }}>
                      Query: "{searchFilter}"
                    </span>
                    <button onClick={() => setSearchFilter("")} style={{
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}>
                      [Clear]
                    </button>
                  </div>
                )}

                {/* Metal */}
                <div style={{ marginBottom: "25px" }}>
                  <span className="filter-title" style={{ fontSize: "11px", color: "var(--text-gray)", marginBottom: "10px", display: "block" }}>Metal</span>
                  <ul className="checkbox-list">
                    {[
                      { name: "White Gold", count: 3 },
                      { name: "Yellow Gold", count: 2 },
                      { name: "Rose Gold", count: 1 },
                      { name: "Platinum", count: 2 }
                    ].map((metal) => (
                      <li className="checkbox-item" key={metal.name} onClick={() => toggleMetalFilter(metal.name)}>
                        <div className="checkbox-item-left">
                          <input 
                            type="checkbox" 
                            id={`metal-${metal.name}`} 
                            checked={selectedMetal.includes(metal.name)}
                            onChange={() => {}} // handled by li click
                            style={selectedMetal.includes(metal.name) ? { backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" } : {}}
                          />
                          <label htmlFor={`metal-${metal.name}`} style={{ cursor: "pointer" }}>{metal.name}</label>
                        </div>
                        <span className="count">({metal.count})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clear filters button */}
                <button className="clear-filters-btn" onClick={resetFilters}>
                  <i className="fa-solid fa-rotate-left"></i> Reset All Filters
                </button>
              </div>
            </aside>

            {/* Right Column: Catalog */}
            <div className="shop-catalog-main">
              {/* Toolbar Header */}
              <div className="catalog-toolbar">
                <span className="results-count">Showing {filteredProducts.length} results</span>
                <div className="toolbar-actions">
                  <div className="select-dropdown-wrap">
                    <span>Sort by:</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort By">
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="popular">Best Selling</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Catalog Grid */}
              {filteredProducts.length === 0 ? (
                <div style={{ padding: "80px 20px", textAlign: "center", border: "1px dashed var(--border-gray)", borderRadius: "8px" }}>
                  <i className="fa-solid fa-gem" style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "15px" }}></i>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, marginBottom: "10px" }}>No Masterpieces Found</h3>
                  <p style={{ color: "var(--text-gray)", fontSize: "14px" }}>Try refining your search query or reset filters to view our exquisite diamond collection.</p>
                </div>
              ) : (
                <div className="catalog-grid">
                  {filteredProducts.map((product) => {
                    const wishlisted = isInWishlist(product.id);
                    return (
                      <article className="catalog-card" key={product.id}>
                        <div className="card-media">
                          <button 
                            className="wishlist-icon-btn" 
                            onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })}
                            aria-label="Wishlist"
                            style={wishlisted ? { color: "#ef4444", backgroundColor: "rgba(255,255,255,0.9)" } : {}}
                          >
                            <i className={wishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                          </button>
                          <img src={product.image} alt={product.name} className="card-img" />
                        </div>
                        <div className="card-desc-box">
                          <div className="product-titles-block">
                            <Link href={`/product/${product.id}`} className="product-title-name-link" style={{ textDecoration: "none" }}>
                              <h3 className="product-title-name">{product.name}</h3>
                            </Link>
                            <span className="product-price-label">${product.price.toLocaleString()}</span>
                          </div>
                          <div className="rating-wrapper">
                            <div className="rating-stars" style={{ color: "var(--accent-blue)" }}>
                              {Array.from({ length: 5 }).map((_, i) => (
                                <i key={i} className={i < Math.floor(product.rating) ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                              ))}
                            </div>
                            <span className="rating-count">({product.reviewsCount})</span>
                          </div>
                          <div className="card-actions-row">
                            <button className="add-cart-pill-btn" style={{ backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" }} onClick={() => handleQuickAdd(product)}>Add to Cart</button>
                            <button className="quick-bag-btn" aria-label="Quick Add" onClick={() => handleQuickAdd(product)}>
                              <i className="fa-solid fa-bag-shopping"></i>
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        </section>

        {/* ==========================================
             5. TRUST BADGES BANNER
             ========================================== */}
        <section className="trust-banner">
          <div className="trust-card">
            <div className="trust-icon" style={{ color: "var(--accent-blue)" }}><i className="fa-regular fa-gem"></i></div>
            <div className="trust-info">
              <span className="trust-title">100% Certified Diamonds</span>
              <span className="trust-subtitle">Authenticity Guaranteed</span>
            </div>
          </div>
          
          <div className="trust-card">
            <div className="trust-icon" style={{ color: "var(--accent-blue)" }}><i className="fa-solid fa-industry"></i></div>
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
            <div className="trust-icon" style={{ color: "var(--accent-blue)" }}><i className="fa-solid fa-shield-halved"></i></div>
            <div className="trust-info">
              <span className="trust-title">Secure Payments</span>
              <span className="trust-subtitle">Safe & Encrypted</span>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon" style={{ color: "var(--accent-blue)" }}><i className="fa-solid fa-rotate-left"></i></div>
            <div className="trust-info">
              <span className="trust-title">Easy Returns</span>
              <span className="trust-subtitle">Hassle Free Returns</span>
            </div>
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Shop page specific styles */
        .shop-header-banner {
          position: relative;
          background-color: var(--primary-navy);
          display: flex;
          height: 260px;
          overflow: hidden;
        }

        .shop-banner-left {
          flex: 1.2;
          display: flex;
          align-items: center;
          padding: 40px 60px;
          z-index: 2;
        }

        .shop-banner-content {
          max-width: 540px;
          width: 100%;
          color: var(--white);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .shop-breadcrumbs {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
        }

        .shop-banner-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: 0.5px;
        }

        .shop-banner-description {
          font-size: 13px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.3px;
        }

        .shop-banner-right {
          flex: 1;
          background: linear-gradient(to right, var(--primary-navy) 0%, rgba(2, 11, 22, 0.5) 30%, transparent 100%),
                      url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80') no-repeat center center / cover;
          position: relative;
          z-index: 1;
        }

        /* SHOP ENGINE SECTION */
        .shop-body-section {
          padding: 50px 60px 80px 60px;
          background-color: var(--white);
        }

        .shop-body-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          gap: 40px;
        }

        .mobile-filter-bar {
          display: none;
          width: 100%;
          background-color: var(--light-blue-gray);
          border: 1px solid var(--border-gray);
          padding: 12px 20px;
          border-radius: 4px;
          margin-bottom: 25px;
          justify-content: space-between;
          align-items: center;
        }

        .mobile-filter-btn {
          background: none;
          border: none;
          font-size: 13px;
          font-weight: 600;
          color: var(--header-dark);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .shop-sidebar {
          width: 270px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 35px;
        }

        .filter-group {
          border-bottom: 1px solid var(--border-gray);
          padding-bottom: 25px;
          width: 100%;
        }

        .filter-group:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .filter-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--header-dark);
          margin-bottom: 18px;
        }

        .category-filter-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .category-filter-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          font-weight: 400;
          color: var(--text-gray);
          cursor: pointer;
          transition: var(--transition);
        }

        .category-filter-list li i {
          margin-right: 8px;
          width: 16px;
          text-align: center;
          color: var(--text-gray);
          transition: var(--transition);
        }

        .category-filter-list li:hover,
        .category-filter-list li.active {
          color: var(--header-dark);
          font-weight: 600;
        }

        .category-filter-list li .count {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-gray);
        }

        /* Checkbox list */
        .checkbox-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: var(--text-gray);
          cursor: pointer;
        }

        .checkbox-item-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .checkbox-item-left input[type="checkbox"] {
          appearance: none;
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border: 1.5px solid var(--border-gray);
          border-radius: 3px;
          outline: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .checkbox-item-left input[type="checkbox"]:checked {
          background-color: var(--header-dark);
          border-color: var(--header-dark);
        }

        .checkbox-item-left input[type="checkbox"]:checked::before {
          content: "\\f00c";
          font-family: "Font Awesome 6 Free";
          font-weight: 900;
          color: var(--white);
          font-size: 10px;
        }

        .checkbox-item:hover {
          color: var(--header-dark);
        }

        .checkbox-item .count {
          font-size: 11px;
        }

        .clear-filters-btn {
          width: 100%;
          border: 1px solid var(--border-gray);
          background-color: var(--white);
          color: var(--header-dark);
          padding: 12px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: var(--transition);
        }

        .clear-filters-btn:hover {
          background-color: var(--header-dark);
          color: var(--white);
          border-color: var(--header-dark);
        }

        /* CATALOG REGION */
        .shop-catalog-main {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .catalog-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-gray);
          padding-bottom: 18px;
          margin-bottom: 25px;
        }

        .results-count {
          font-size: 13px;
          color: var(--text-gray);
          font-weight: 400;
        }

        .toolbar-actions {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .select-dropdown-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-gray);
        }

        .select-dropdown-wrap select {
          border: 1px solid var(--border-gray);
          background-color: var(--white);
          color: var(--header-dark);
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 500;
          outline: none;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
        }

        .select-dropdown-wrap select:hover {
          border-color: var(--header-dark);
        }

        /* Catalog Grid of Cards */
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .catalog-card {
          background-color: var(--white);
          border-radius: 8px;
          border: 1px solid var(--border-gray);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          position: relative;
        }

        .catalog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(2, 16, 36, 0.06);
          border-color: #cbd5e1;
        }

        .card-media {
          position: relative;
          height: 310px;
          width: 100%;
          overflow: hidden;
          background-color: #f8fafc;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .catalog-card:hover .card-img {
          transform: scale(1.04);
        }

        .wishlist-icon-btn {
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

        .wishlist-icon-btn:hover {
          background-color: rgba(255, 255, 255, 0.9);
          transform: scale(1.1);
        }

        .card-desc-box {
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }

        .product-titles-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .product-title-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--header-dark);
          letter-spacing: 0.2px;
          transition: var(--transition);
        }

        .product-title-name:hover {
          color: var(--accent-blue);
        }

        .product-price-label {
          font-size: 15px;
          font-weight: 600;
          color: var(--header-dark);
        }

        .rating-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .rating-stars {
          display: flex;
          gap: 2px;
        }

        .rating-count {
          color: var(--text-gray);
          font-weight: 400;
        }

        .card-actions-row {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-top: auto;
          padding-top: 10px;
        }

        .add-cart-pill-btn {
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

        .add-cart-pill-btn:hover {
          opacity: 0.9;
        }

        .quick-bag-btn {
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

        .quick-bag-btn:hover {
          border-color: var(--header-dark);
          background-color: var(--light-blue-gray);
        }

        /* TRUST BANNER */
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

        /* Responsiveness */
        @media (max-width: 1024px) {
          .shop-body-section {
            padding: 30px;
          }
          .mobile-filter-bar {
            display: flex;
          }
          .shop-sidebar {
            display: none;
          }
          .shop-sidebar.active {
            display: flex !important;
          }
          .catalog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .trust-banner {
            grid-template-columns: repeat(3, 1fr);
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .shop-header-banner {
            height: auto;
            min-height: auto;
          }
          .shop-banner-left {
            padding: 40px 20px;
            text-align: center;
            align-items: center;
          }
          .shop-banner-content {
            align-items: center;
          }
          .shop-banner-title {
            font-size: 30px;
          }
          .shop-banner-right {
            display: none;
          }
          .shop-body-section {
            padding: 30px 20px;
          }
          .catalog-grid {
            grid-template-columns: 1fr;
          }
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
        }
      `}} />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: "100px", textAlign: "center", fontFamily: "var(--font-serif)", fontSize: "20px" }}>
        Loading Exquisite Diamond Shop...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
