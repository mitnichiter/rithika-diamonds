"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface CollectionCardData {
  id: string;
  name: string;
  desc: string;
  image: string;
  category: string;
  metals: string[];
  occasion: string[];
  wide?: boolean;
}

const COLLECTIONS_DATA: CollectionCardData[] = [
  {
    id: "bridal-set",
    name: "Bridal Collection",
    desc: "Timeless designs for your most precious day.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80",
    category: "Bridal Collection",
    metals: ["White Gold", "Yellow Gold", "Platinum"],
    occasion: ["Bridal", "Engagement"]
  },
  {
    id: "rings-set",
    name: "Diamond Rings",
    desc: "Elegant rings that celebrate love and commitment.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80",
    category: "Diamond Rings",
    metals: ["White Gold", "Yellow Gold", "Rose Gold", "Platinum"],
    occasion: ["Engagement", "Anniversary", "Everyday"]
  },
  {
    id: "necklace-set",
    name: "Necklaces",
    desc: "Stunning diamond necklaces for every occasion.",
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a3a35541?auto=format&fit=crop&w=500&q=80",
    category: "Necklaces",
    metals: ["White Gold", "Yellow Gold", "Platinum"],
    occasion: ["Bridal", "Anniversary"]
  },
  {
    id: "earring-set",
    name: "Earrings",
    desc: "Sparkling earrings to elevate your style.",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=500&q=80",
    category: "Earrings",
    metals: ["White Gold", "Yellow Gold", "Rose Gold"],
    occasion: ["Everyday", "Anniversary"]
  },
  {
    id: "bracelet-set",
    name: "Bracelets",
    desc: "Graceful bracelets that shine with elegance.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80",
    category: "Bracelets",
    metals: ["White Gold", "Platinum"],
    occasion: ["Everyday", "Anniversary"]
  },
  {
    id: "pendant-set",
    name: "Pendants",
    desc: "Charming pendants that speak your style.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80",
    category: "Pendants",
    metals: ["White Gold", "Yellow Gold", "Rose Gold"],
    occasion: ["Everyday", "Engagement"]
  },
  {
    id: "mens-set",
    name: "Men's Collection",
    desc: "Bold and refined designs crafted for him.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    category: "Men's Collection",
    metals: ["White Gold", "Yellow Gold", "Platinum"],
    occasion: ["Everyday", "Anniversary"],
    wide: true
  },
  {
    id: "loose-diamonds",
    name: "Loose Diamonds",
    desc: "Certified loose diamonds of exceptional quality.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
    category: "Loose Diamonds",
    metals: ["Platinum"],
    occasion: ["Bridal", "Engagement"],
    wide: true
  }
];

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Collections");
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMetal = (metal: string) => {
    setSelectedMetals((prev) =>
      prev.includes(metal) ? prev.filter((m) => m !== metal) : [...prev, metal]
    );
  };

  const toggleOccasion = (occasion: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occasion) ? prev.filter((o) => o !== occasion) : [...prev, occasion]
    );
  };

  const resetFilters = () => {
    setSelectedCategory("All Collections");
    setSelectedMetals([]);
    setSelectedOccasions([]);
  };

  // Filter & Sort logic
  const filteredCollections = useMemo(() => {
    let result = [...COLLECTIONS_DATA];

    if (selectedCategory !== "All Collections") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (selectedMetals.length > 0) {
      result = result.filter((item) =>
        item.metals.some((metal) => selectedMetals.includes(metal))
      );
    }

    if (selectedOccasions.length > 0) {
      result = result.filter((item) =>
        item.occasion.some((occ) => selectedOccasions.includes(occ))
      );
    }

    // Sort
    if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, selectedMetals, selectedOccasions, sortBy]);

  return (
    <>
      <main>
        {/* ==========================================
             3. COLLECTIONS HEADER BANNER
             ========================================== */}
        <section className="collections-header-banner">
          <div className="banner-left-area">
            <div className="banner-text-content">
              <div className="banner-breadcrumbs">
                Home &gt; <span style={{ color: "var(--accent-blue)" }}>Collections</span>
              </div>
              <h1 className="banner-headline-title">Explore Our Exquisite Collections</h1>
              <p className="banner-subtitle-desc">Handcrafted diamond jewellery for every moment worth celebrating.</p>
            </div>
          </div>
          <div className="banner-right-area"></div>
        </section>

        {/* ==========================================
             4. COLLECTIONS LAYOUT ENGINE
             ========================================== */}
        <section className="collections-body-section">
          {/* Mobile Filter Controls */}
          <div className="mobile-filter-bar">
            <button className="mobile-filter-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <i className="fa-solid fa-sliders"></i> Filters & Categories
            </button>
            <span className="results-count">Showing {filteredCollections.length} collections</span>
          </div>

          <div className="collections-body-container">
            {/* Sidebar Column */}
            <aside className={`collections-sidebar ${mobileMenuOpen ? "active" : ""}`} style={mobileMenuOpen ? {
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
                    { name: "All Collections", count: 8, icon: "fa-border-all" },
                    { name: "Bridal Collection", count: 1, icon: "fa-crown" },
                    { name: "Diamond Rings", count: 1, icon: "fa-ring" },
                    { name: "Necklaces", count: 1, icon: "fa-gem" },
                    { name: "Earrings", count: 1, icon: "fa-certificate" },
                    { name: "Bracelets", count: 1, icon: "fa-infinity" },
                    { name: "Pendants", count: 1, icon: "fa-medal" },
                    { name: "Men's Collection", count: 1, icon: "fa-user-tie" },
                    { name: "Loose Diamonds", count: 1, icon: "fa-diamond" }
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
                
                {/* Metal Preferences */}
                <div style={{ marginBottom: "25px" }}>
                  <span className="filter-title" style={{ fontSize: "11px", color: "var(--text-gray)", marginBottom: "10px", display: "block" }}>Metal</span>
                  <ul className="checkbox-list">
                    {[
                      { name: "White Gold", count: 6 },
                      { name: "Yellow Gold", count: 4 },
                      { name: "Rose Gold", count: 3 },
                      { name: "Platinum", count: 4 }
                    ].map((metal) => (
                      <li className="checkbox-item" key={metal.name} onClick={() => toggleMetal(metal.name)}>
                        <div className="checkbox-item-left">
                          <input 
                            type="checkbox" 
                            id={`metal-${metal.name}`} 
                            checked={selectedMetals.includes(metal.name)}
                            onChange={() => {}} // handled by li onClick
                            style={selectedMetals.includes(metal.name) ? { backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" } : {}}
                          />
                          <label htmlFor={`metal-${metal.name}`} style={{ cursor: "pointer" }}>{metal.name}</label>
                        </div>
                        <span className="count">({metal.count})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Occasion Selection */}
                <div style={{ marginBottom: "25px" }}>
                  <span className="filter-title" style={{ fontSize: "11px", color: "var(--text-gray)", marginBottom: "10px", display: "block" }}>Occasion</span>
                  <ul className="checkbox-list">
                    {[
                      { name: "Bridal", count: 2 },
                      { name: "Engagement", count: 3 },
                      { name: "Anniversary", count: 5 },
                      { name: "Everyday", count: 4 }
                    ].map((occ) => (
                      <li className="checkbox-item" key={occ.name} onClick={() => toggleOccasion(occ.name)}>
                        <div className="checkbox-item-left">
                          <input 
                            type="checkbox" 
                            id={`occ-${occ.name}`} 
                            checked={selectedOccasions.includes(occ.name)}
                            onChange={() => {}} // handled by li onClick
                            style={selectedOccasions.includes(occ.name) ? { backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" } : {}}
                          />
                          <label htmlFor={`occ-${occ.name}`} style={{ cursor: "pointer" }}>{occ.name}</label>
                        </div>
                        <span className="count">({occ.count})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reset Filter */}
                <button className="clear-filters-btn" onClick={resetFilters}>
                  <i className="fa-solid fa-rotate-left"></i> Reset All Filters
                </button>

              </div>
            </aside>

            {/* Right Column: Catalog */}
            <div className="collections-catalog-main">
              {/* Toolbar Header */}
              <div className="catalog-toolbar">
                <span className="results-count">Showing {filteredCollections.length} collections</span>
                <div className="toolbar-actions">
                  <div className="select-dropdown-wrap">
                    <span>Sort by:</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort Collections">
                      <option value="featured">Featured</option>
                      <option value="name-asc">Alphabetical: A-Z</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Collections Grid System */}
              {filteredCollections.length === 0 ? (
                <div style={{ padding: "80px 20px", textAlign: "center", border: "1px dashed var(--border-gray)", borderRadius: "8px" }}>
                  <i className="fa-solid fa-gem" style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "15px" }}></i>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 400, marginBottom: "10px" }}>No Collections Found</h3>
                  <p style={{ color: "var(--text-gray)", fontSize: "14px" }}>Try adjusting your filters to discover other diamond masterpieces.</p>
                </div>
              ) : (
                <div className="collections-grid">
                  {filteredCollections.map((col) => (
                    <article key={col.id} className={`collection-card ${col.wide ? "wide-card" : ""}`}>
                      <div className="card-media-wrapper">
                        <img src={col.image} alt={col.name} className="collection-img" />
                      </div>
                      <div className="collection-info">
                        <h3 className="collection-name">{col.name}</h3>
                        <p className="collection-card-desc">{col.desc}</p>
                        <Link href={`/shop?category=${encodeURIComponent(col.category === "All Collections" || col.category === "Bridal Collection" || col.category === "Loose Diamonds" ? "" : col.category)}`} className="collection-link">
                          Explore Collection <i className="fa-solid fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </article>
                  ))}
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
        /* Collections page specific styles */
        .collections-header-banner {
          position: relative;
          background-color: var(--primary-navy);
          display: flex;
          height: 260px;
          overflow: hidden;
        }

        .banner-left-area {
          flex: 1.2;
          display: flex;
          align-items: center;
          padding: 40px 60px;
          z-index: 2;
        }

        .banner-text-content {
          max-width: 540px;
          width: 100%;
          color: var(--white);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .banner-breadcrumbs {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
        }

        .banner-headline-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: 0.5px;
        }

        .banner-subtitle-desc {
          font-size: 13px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.3px;
        }

        .banner-right-area {
          flex: 1;
          background: linear-gradient(to right, var(--primary-navy) 0%, rgba(2, 11, 22, 0.5) 30%, transparent 100%),
                      url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80') no-repeat center center / cover;
          position: relative;
          z-index: 1;
        }

        /* COLLECTIONS BODY SECTION */
        .collections-body-section {
          padding: 50px 60px 80px 60px;
          background-color: var(--white);
        }

        .collections-body-container {
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

        .collections-sidebar {
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

        /* Checkbox lists */
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

        /* CATALOG COLUMN */
        .collections-catalog-main {
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

        /* Catalog Grid */
        .collections-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 24px;
        }

        .collection-card {
          background-color: var(--white);
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--border-gray);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          grid-column: span 2;
        }

        .collection-card.wide-card {
          grid-column: span 3;
        }

        .collection-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 30px rgba(2, 16, 36, 0.08);
          border-color: #cbd5e1;
        }

        .card-media-wrapper {
          position: relative;
          height: 310px;
          overflow: hidden;
        }

        .collection-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .collection-card:hover .collection-img {
          transform: scale(1.05);
        }

        .collection-info {
          padding: 25px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background-color: var(--white);
          flex-grow: 1;
        }

        .collection-name {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 500;
          color: var(--header-dark);
        }

        .collection-card-desc {
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-gray);
          font-weight: 300;
          margin-bottom: 5px;
        }

        .collection-link {
          font-size: 11px;
          font-weight: 600;
          color: var(--header-dark);
          text-decoration: none;
          letter-spacing: 0.5px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition);
          margin-top: auto;
        }

        .collection-link i {
          font-size: 10px;
          transition: transform 0.2s ease;
        }

        .collection-link:hover i {
          transform: translateX(3px);
        }

        .collection-link:hover {
          color: var(--accent-blue);
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
          .collections-body-section {
            padding: 30px;
          }
          .mobile-filter-bar {
            display: flex;
          }
          .collections-sidebar {
            display: none;
          }
          .collections-sidebar.active {
            display: flex !important;
          }
          .collections-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .collection-card {
            grid-column: span 2 !important;
          }
          .trust-banner {
            grid-template-columns: repeat(3, 1fr);
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .collections-header-banner {
            height: auto;
            min-height: auto;
          }
          .banner-left-area {
            padding: 40px 20px;
            text-align: center;
            align-items: center;
          }
          .banner-text-content {
            align-items: center;
          }
          .banner-headline-title {
            font-size: 30px;
          }
          .banner-right-area {
            display: none;
          }
          .collections-body-section {
            padding: 30px 20px;
          }
          .collections-grid {
            grid-template-columns: 1fr;
          }
          .collection-card {
            grid-column: span 4 !important;
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
