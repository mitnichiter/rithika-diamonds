"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp, Product } from "@/context/AppContext";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isInWishlist } = useApp();

  const id = params?.id as string;

  // Find the selected product, default to floral-cluster-ring
  const product = useMemo(() => {
    return products.find((p) => p.id === id) || products[0];
  }, [products, id]);

  const wishlisted = isInWishlist(product.id);

  // States
  const [selectedMetal, setSelectedMetal] = useState("18K White Gold");
  const [selectedSize, setSelectedSize] = useState("10");
  const [activeTab, setActiveTab] = useState("Description");
  const [mainImage, setMainDisplayImage] = useState(product.image);

  // Sync main image when product changes
  React.useEffect(() => {
    setMainDisplayImage(product.image);
  }, [product]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      metal: selectedMetal,
      size: selectedSize,
      quantity: 1
    });
  };

  const relatedProducts = useMemo(() => {
    return products.filter((p) => p.id !== product.id).slice(0, 4);
  }, [products, product]);

  const thumbImages = [
    product.image,
    "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <>
      <main className="product-details-wrap">
        <div className="product-container">
          
          {/* Breadcrumbs */}
          <div className="product-breadcrumbs">
            Home &gt; Shop &gt; {product.category} &gt; <span style={{ color: "var(--accent-blue)" }}>{product.name}</span>
          </div>

          {/* Main Configurations Split */}
          <div className="product-main-grid">
            
            {/* Left Image Gallery Component */}
            <div className="product-gallery">
              <div className="thumb-column">
                {thumbImages.map((imgUrl, index) => (
                  <div 
                    key={index} 
                    className={`thumb-box ${mainImage === imgUrl ? "active" : ""}`}
                    onClick={() => setMainDisplayImage(imgUrl)}
                    style={mainImage === imgUrl ? { borderColor: "var(--accent-blue)" } : {}}
                  >
                    <img src={imgUrl} alt={`${product.name} thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>

              <div className="main-display-box" style={{ background: "linear-gradient(135deg, #05162e 0%, var(--primary-navy) 100%)" }}>
                <img src="/logo.png" alt="Rithika Diamonds Badge" className="brand-logo-badge" width={72} height={72} style={{ opacity: 0.15, objectFit: "contain", marginLeft: "-14px", marginRight: "-14px", marginTop: "-14px", marginBottom: "-14px" }} />
                <img className="main-display-img" src={mainImage} alt={product.name} />
              </div>
            </div>

            {/* Right Product Settings & Metadata Panel */}
            <div className="product-config-panel">
              
              <div className="bestseller-badge">Exquisite Diamond</div>
              <h1 className="product-main-title">{product.name}</h1>
              
              <div className="meta-rating-row">
                <span>SKU: RD-{product.category.toUpperCase().slice(0, 3)}-{product.id.slice(0, 4).toUpperCase()}</span>
                <span>|</span>
                <div className="star-block" style={{ color: "var(--accent-blue)" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={i < Math.floor(product.rating) ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                  ))}
                </div>
                <span>({product.reviewsCount} Reviews)</span>
              </div>

              <div className="product-price-block">
                <span className="panel-price">${product.price.toLocaleString()}</span>
                <span className="tax-disclaimer">(Complimentary Insured Shipping &amp; Duties Included)</span>
              </div>

              <div className="certified-callout">
                <i className="fa-regular fa-gem" style={{ color: "var(--accent-blue)" }}></i> True brilliance. Certified excellence.
              </div>

              {/* Config Option: Metal selection */}
              <div>
                <div className="config-label-title">Metal</div>
                <div className="metal-button-group">
                  {["18K White Gold", "18K Yellow Gold", "18K Rose Gold", "Platinum"].map((metal) => (
                    <button 
                      key={metal}
                      className={`metal-select-btn ${selectedMetal === metal ? "active" : ""}`}
                      onClick={() => setSelectedMetal(metal)}
                      style={selectedMetal === metal ? { backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)", color: "white" } : {}}
                    >
                      {metal} {metal === "Platinum" && <i className="fa-solid fa-sparkles" style={{ color: "var(--accent-blue)", marginLeft: "4px" }}></i>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Config Option: Size Selection */}
              <div>
                <div className="config-label-title">
                  <span>Ring / Jewellery Size</span>
                  <a href="#" className="size-ruler-link"><i className="fa-solid fa-ruler" style={{ color: "var(--accent-blue)" }}></i> Find your size</a>
                </div>
                <div className="size-button-group">
                  {["6", "7", "8", "9", "10", "11", "12"].map((size) => (
                    <button 
                      key={size}
                      className={`size-select-btn ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                      style={selectedSize === size ? { backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)", color: "white" } : {}}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="cta-row-panel">
                <button className="add-cart-cta-btn" style={{ backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" }} onClick={handleAddToCart}>
                  <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
                <button 
                  className="add-wishlist-cta-btn" 
                  onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })}
                  style={wishlisted ? { color: "#ef4444", borderColor: "#fca5a5", backgroundColor: "#fef2f2" } : {}}
                >
                  <i className={wishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                  {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>
              </div>

              {/* Micro Features trust indicators */}
              <div className="panel-trust-grid">
                <div className="micro-trust-card">
                  <i className="fa-solid fa-truck micro-trust-icon" style={{ color: "var(--accent-blue)" }}></i>
                  <div className="micro-trust-info">
                    <span className="micro-trust-title">Free Shipping</span>
                    <span className="micro-trust-subtitle">Fully Insured Delivery</span>
                  </div>
                </div>
                <div className="micro-trust-card">
                  <i className="fa-solid fa-shield-halved micro-trust-icon" style={{ color: "var(--accent-blue)" }}></i>
                  <div className="micro-trust-info">
                    <span className="micro-trust-title">Secure Payments</span>
                    <span className="micro-trust-subtitle">Safe &amp; Encrypted</span>
                  </div>
                </div>
                <div className="micro-trust-card">
                  <i className="fa-solid fa-rotate-left micro-trust-icon" style={{ color: "var(--accent-blue)" }}></i>
                  <div className="micro-trust-info">
                    <span className="micro-trust-title">Easy Returns</span>
                    <span className="micro-trust-subtitle">30 Day Returns</span>
                  </div>
                </div>
                <div className="micro-trust-card">
                  <i className="fa-regular fa-gem micro-trust-icon" style={{ color: "var(--accent-blue)" }}></i>
                  <div className="micro-trust-info">
                    <span className="micro-trust-title">Certification</span>
                    <span className="micro-trust-subtitle">IGI Certified Excellence</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Customize Option Box */}
          <section className="customize-banner-box">
            <div className="cust-banner-text">
              <h3>Want it in your own style?</h3>
              <p>We specialize in custom-made diamond jewellery. Start the designer to create your masterpiece.</p>
            </div>
            <Link href="/bespoke" className="cust-banner-btn">
              <i className="fa-solid fa-pen-fancy" style={{ color: "var(--accent-blue)" }}></i> Customize This Design
            </Link>
          </section>

          {/* Technical Spec Tabs System */}
          <section className="info-tabs-wrapper">
            <div className="tabs-header">
              {["Description", "Diamond Details", "Shipping & Returns"].map((tab) => (
                <button 
                  key={tab}
                  className={`tab-trigger ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                  style={activeTab === tab ? { color: "var(--accent-blue)" } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tab-panel-grid">
              {activeTab === "Description" && (
                <div className="tab-panel-desc">
                  <p className="tab-panel-text">
                    {product.description} Elegant curves and high art craftsmanship merge to symbolize love and femininity. Designed to draw light from all directions to amplify sparkle.
                  </p>
                  <ul className="tab-panel-bullets">
                    <li><i className="fa-solid fa-circle-check" style={{ color: "var(--accent-blue)" }}></i> Exquisite handcrafted setting for maximum brilliance</li>
                    <li><i className="fa-solid fa-circle-check" style={{ color: "var(--accent-blue)" }}></i> Crafted with ethically sourced, certified conflict-free diamonds</li>
                    <li><i className="fa-solid fa-circle-check" style={{ color: "var(--accent-blue)" }}></i> Perfect for engagements, anniversaries &amp; special celebrations</li>
                    <li><i className="fa-solid fa-circle-check" style={{ color: "var(--accent-blue)" }}></i> Available in multiple precious metals and custom sizing</li>
                  </ul>
                </div>
              )}

              {activeTab === "Diamond Details" && (
                <div className="tab-panel-specs">
                  <div className="spec-table-list">
                    <div className="spec-row">
                      <span className="spec-key">Precious Metal</span>
                      <span className="spec-val">{selectedMetal}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">Diamond Type</span>
                      <span className="spec-val">Natural Diamonds</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">Clarity &amp; Color</span>
                      <span className="spec-val">VVS1, F-G Color</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">Diamond Shape</span>
                      <span className="spec-val">Round Brilliant</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">Total Carat Weight</span>
                      <span className="spec-val">0.75 - 1.25 Ct (Approx.)</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">Setting Type</span>
                      <span className="spec-val">Multi-Prong Luxury Setting</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">Certification</span>
                      <span className="spec-val">IGI Certified Authenticity</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Shipping & Returns" && (
                <div className="tab-panel-desc">
                  <p className="tab-panel-text">
                    Every piece of Rithika jewellery is delivered with complimentary, fully insured shipping. Out of security and care, packages are delivered in discrete, high-end packaging.
                  </p>
                  <ul className="tab-panel-bullets">
                    <li><i className="fa-solid fa-circle-check" style={{ color: "var(--accent-blue)" }}></i> Insured transit with signature required upon delivery</li>
                    <li><i className="fa-solid fa-circle-check" style={{ color: "var(--accent-blue)" }}></i> Complimentary 30-day return policy for peace of mind</li>
                    <li><i className="fa-solid fa-circle-check" style={{ color: "var(--accent-blue)" }}></i> Included high-jewellery case and professional cleaning cloth</li>
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Related Products Section */}
          <section className="related-products-section" style={{ borderTop: "1px solid var(--border-gray)", paddingTop: "50px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 400, textAlign: "center", marginBottom: "40px" }}>You May Also Fall In Love With</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
              {relatedProducts.map((p) => (
                <article key={p.id} style={{ border: "1px solid var(--border-gray)", borderRadius: "8px", overflow: "hidden", backgroundColor: "white" }}>
                  <div style={{ position: "relative", height: "200px" }}>
                    <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--header-dark)", margin: 0 }}>{p.name}</h3>
                    <span style={{ fontSize: "14px", fontWeight: 700 }}>${p.price.toLocaleString()}</span>
                    <button 
                      onClick={() => router.push(`/product/${p.id}`)}
                      style={{
                        backgroundColor: "var(--accent-blue)",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "5px"
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Scoped product details styles */
        .product-details-wrap {
          padding: 30px 60px 80px 60px;
          background-color: var(--white);
        }

        .product-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .product-breadcrumbs {
          font-size: 12px;
          color: var(--text-gray);
          margin-bottom: 30px;
          font-weight: 400;
          letter-spacing: 0.3px;
        }

        .product-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 50px;
          margin-bottom: 60px;
        }

        .product-gallery {
          display: flex;
          gap: 20px;
        }

        .thumb-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 80px;
          flex-shrink: 0;
        }

        .thumb-box {
          width: 100%;
          height: 80px;
          border-radius: 4px;
          border: 1px solid var(--border-gray);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: var(--transition);
        }

        .thumb-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumb-box.active, .thumb-box:hover {
          border-color: var(--header-dark);
        }

        .main-display-box {
          flex-grow: 1;
          height: 580px;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }

        .main-display-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .brand-logo-badge {
          position: absolute;
          top: 25px;
          right: 25px;
          pointer-events: none;
        }

        .product-config-panel {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .bestseller-badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-gray);
        }

        .product-main-title {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 400;
          line-height: 1.15;
        }

        .meta-rating-row {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 13px;
          color: var(--text-gray);
        }

        .star-block {
          font-size: 11px;
          display: flex;
          gap: 2px;
        }

        .product-price-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .panel-price {
          font-size: 28px;
          font-weight: 700;
          color: var(--header-dark);
        }

        .tax-disclaimer {
          font-size: 11px;
          color: var(--text-gray);
          font-weight: 400;
        }

        .certified-callout {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: var(--light-blue-gray);
          padding: 12px 18px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          color: var(--header-dark);
          width: fit-content;
        }

        .config-label-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--header-dark);
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metal-button-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .metal-select-btn {
          background: none;
          border: 1px solid var(--border-gray);
          color: var(--text-gray);
          padding: 10px 18px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .metal-select-btn:hover {
          border-color: var(--header-dark);
          color: var(--header-dark);
        }

        .metal-select-btn.active {
          background-color: var(--header-dark);
          border-color: var(--header-dark);
          color: var(--white);
        }

        .size-ruler-link {
          font-size: 11px;
          text-transform: none;
          color: var(--text-gray);
          text-decoration: none;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .size-button-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .size-select-btn {
          background: none;
          border: 1px solid var(--border-gray);
          color: var(--text-gray);
          width: 40px;
          height: 40px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .size-select-btn:hover {
          border-color: var(--header-dark);
          color: var(--header-dark);
        }

        .size-select-btn.active {
          background-color: var(--header-dark);
          border-color: var(--header-dark);
          color: var(--white);
        }

        .cta-row-panel {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }

        .add-cart-cta-btn {
          flex: 1.5;
          color: var(--white);
          border: 1px solid var(--accent-blue);
          padding: 16px 24px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: var(--transition);
        }

        .add-cart-cta-btn:hover {
          opacity: 0.9;
        }

        .add-wishlist-cta-btn {
          flex: 1;
          background: none;
          border: 1px solid var(--border-gray);
          color: var(--header-dark);
          padding: 16px 24px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: var(--transition);
        }

        .add-wishlist-cta-btn:hover {
          border-color: var(--header-dark);
          background-color: var(--light-blue-gray);
        }

        .panel-trust-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          border-top: 1px solid var(--border-gray);
          padding-top: 25px;
          margin-top: 10px;
        }

        .micro-trust-card {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .micro-trust-icon {
          font-size: 20px;
        }

        .micro-trust-info {
          display: flex;
          flex-direction: column;
        }

        .micro-trust-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--header-dark);
        }

        .micro-trust-subtitle {
          font-size: 10px;
          color: var(--text-gray);
        }

        /* CUSTOMIZE BANNER BOX */
        .customize-banner-box {
          background-color: var(--light-blue-gray);
          border-radius: 6px;
          padding: 30px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
          border: 1px solid var(--border-gray);
        }

        .cust-banner-text h3 {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .cust-banner-text p {
          font-size: 13px;
          color: var(--text-gray);
          font-weight: 300;
        }

        .cust-banner-btn {
          background-color: var(--white);
          color: var(--header-dark);
          border: 1px solid var(--border-gray);
          padding: 12px 24px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: var(--transition);
        }

        .cust-banner-btn:hover {
          background-color: var(--header-dark);
          color: var(--white);
          border-color: var(--header-dark);
        }

        /* INFORMATION TABS */
        .info-tabs-wrapper {
          border-bottom: 1px solid var(--border-gray);
          padding-bottom: 50px;
          margin-bottom: 80px;
        }

        .tabs-header {
          display: flex;
          gap: 40px;
          border-bottom: 1px solid var(--border-gray);
          margin-bottom: 40px;
        }

        .tab-trigger {
          background: none;
          border: none;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-gray);
          padding-bottom: 15px;
          cursor: pointer;
          position: relative;
          transition: var(--transition);
        }

        .tab-trigger.active {
          color: var(--header-dark);
        }

        .tab-trigger.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--accent-blue);
        }

        .tab-panel-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
        }

        .tab-panel-desc {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .tab-panel-text {
          font-size: 14px;
          line-height: 1.65;
          color: var(--text-gray);
          font-weight: 300;
        }

        .tab-panel-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .tab-panel-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13px;
          color: var(--header-dark);
          font-weight: 500;
        }

        .spec-table-list {
          display: flex;
          flex-direction: column;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-gray);
          padding: 12px 0;
          font-size: 13px;
        }

        .spec-row:first-child {
          padding-top: 0;
        }

        .spec-row:last-child {
          border-bottom: none;
        }

        .spec-key {
          color: var(--text-gray);
          font-weight: 400;
        }

        .spec-val {
          color: var(--header-dark);
          font-weight: 600;
        }

        /* Responsiveness */
        @media (max-width: 1024px) {
          .product-details-wrap {
            padding: 30px;
          }
          .product-main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .main-display-box {
            height: 400px;
          }
          .customize-banner-box {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }
          .cust-banner-btn {
            width: 100%;
            justify-content: center;
          }
          .tab-panel-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .product-details-wrap {
            padding: 30px 20px;
          }
          .product-gallery {
            flex-direction: column-reverse;
          }
          .thumb-column {
            flex-direction: row;
            width: 100%;
            overflow-x: auto;
            padding-bottom: 5px;
          }
          .thumb-box {
            width: 70px;
            height: 70px;
          }
          .main-display-box {
            height: 320px;
          }
          .product-main-title {
            font-size: 28px;
          }
          .cta-row-panel {
            flex-direction: column;
          }
          .add-cart-cta-btn, .add-wishlist-cta-btn {
            width: 100%;
          }
          .panel-trust-grid {
            grid-template-columns: 1fr;
          }
          .tabs-header {
            gap: 20px;
            overflow-x: auto;
            padding-bottom: 5px;
          }
          .tab-trigger {
            white-space: nowrap;
          }
        }
      `}} />
    </>
  );
}
