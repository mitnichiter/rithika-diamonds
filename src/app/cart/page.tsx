"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateCartQuantity, removeFromCart, toggleWishlist, products, addToCart } = useApp();

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "TIMELESS" || promoCode.trim().toUpperCase() === "RITHIKA") {
      setDiscountPercent(10);
      setPromoSuccess("Promo code applied: 10% discount on your order!");
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try 'TIMELESS' or 'RITHIKA'");
      setPromoSuccess("");
    }
  };

  const discountAmount = subtotal * (discountPercent / 100);
  const finalTotal = subtotal - discountAmount;

  // Recommendations
  const recommended = products.slice(1, 5);

  const handleMoveToWishlist = (item: any) => {
    toggleWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    removeFromCart(item.id, item.metal, item.size);
  };

  return (
    <>
      <main>
        {/* ==========================================
             3. MY CART / BREADCRUMBS BANNER
             ========================================== */}
        <section className="cart-header-area">
          <div className="cart-header-container">
            <div>
              <div className="breadcrumbs">
                Home &gt; <span style={{ color: "var(--accent-blue)" }}>Your Cart</span>
              </div>
              <h1 className="cart-title">My Cart ({totalCount})</h1>
              <p className="cart-subtitle">Review your items before secure checkout.</p>
            </div>
            <span className="secure-checkout-tag"><i className="fa-solid fa-shield-halved" style={{ color: "var(--accent-blue)", marginRight: "6px" }}></i> Secure Checkout</span>
          </div>
        </section>

        {/* ==========================================
             4. MAIN CART SECTION
             ========================================== */}
        <section className="cart-main-section">
          {cart.length === 0 ? (
            <div style={{
              padding: "100px 20px",
              textAlign: "center",
              border: "1px dashed var(--border-gray)",
              borderRadius: "8px",
              maxWidth: "1400px",
              margin: "0 auto"
            }}>
              <i className="fa-solid fa-bag-shopping" style={{ fontSize: "48px", color: "#cbd5e1", marginBottom: "20px" }}></i>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 400, marginBottom: "12px" }}>Your Cart is Empty</h2>
              <p style={{ color: "var(--text-gray)", fontSize: "14px", marginBottom: "30px" }}>Discover our collections and select diamond masterpieces to fill your cart.</p>
              <Link href="/shop" className="qty-btn" style={{
                backgroundColor: "var(--accent-blue)",
                color: "white",
                padding: "12px 30px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                width: "fit-content",
                margin: "0 auto",
                height: "auto",
                textDecoration: "none"
              }}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-main-container">
              
              {/* Left Column: Cart Items & Recommendations */}
              <div className="cart-left-panel">
                <div className="cart-items-flow">
                  {cart.map((item) => (
                    <article className="cart-item-card" key={`${item.id}-${item.metal}-${item.size}`}>
                      <div className="cart-item-media">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <h3 className="cart-prod-title">{item.name}</h3>
                        <span className="cart-prod-meta">{item.metal}</span>
                        {item.size && <span className="cart-prod-specs">Size: {item.size}</span>}
                        <div className="cart-item-actions">
                          <button 
                            className="cart-action-link" 
                            style={{ background: "none", border: "none", cursor: "pointer" }}
                            onClick={() => handleMoveToWishlist(item)}
                          >
                            <i className="fa-regular fa-heart"></i> Move to Wishlist
                          </button>
                          <button 
                            className="cart-action-link" 
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}
                            onClick={() => removeFromCart(item.id, item.metal, item.size)}
                          >
                            <i className="fa-regular fa-trash-can"></i> Remove
                          </button>
                        </div>
                      </div>
                      <div className="cart-price-qty-block">
                        <span className="cart-item-price">${(item.price * item.quantity).toLocaleString()}</span>
                        <div className="qty-selector">
                          <button 
                            className="qty-btn" 
                            onClick={() => updateCartQuantity(item.id, item.metal, item.size, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button 
                            className="qty-btn" 
                            onClick={() => updateCartQuantity(item.id, item.metal, item.size, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Inline Trust Grid */}
                <div className="micro-cart-trust-banner">
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
                      <span className="micro-trust-title">Secure Packing</span>
                      <span className="micro-trust-subtitle">100% Insured Transit</span>
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
                      <span className="micro-trust-title">Certified Diamonds</span>
                      <span className="micro-trust-subtitle">IGI Certified Authenticity</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations Block */}
                <div className="related-section">
                  <h2 className="related-title">You may also fall in love with</h2>
                  <div className="related-grid">
                    {recommended.map((prod) => (
                      <article className="related-card" key={prod.id}>
                        <div className="related-img-box">
                          <img src={prod.image} alt={prod.name} />
                        </div>
                        <div className="related-info">
                          <h3 className="related-prod-name">{prod.name}</h3>
                          <span className="related-prod-price">${prod.price.toLocaleString()}</span>
                          <button 
                            className="related-add-btn" 
                            style={{ backgroundColor: "var(--accent-blue)", border: "none", color: "white" }}
                            onClick={() => {
                              addToCart({
                                id: prod.id,
                                name: prod.name,
                                price: prod.price,
                                image: prod.image,
                                metal: "18K White Gold",
                                size: "7"
                              });
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Checkout & Summary Actions */}
              <div className="cart-right-panel">
                {/* Summary Box */}
                <div className="summary-card">
                  <h2 className="summary-title">Order Summary</h2>
                  <div className="summary-row">
                    <span className="summary-key">Subtotal ({totalCount} Items)</span>
                    <span className="summary-val">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-key">Shipping</span>
                    <span className="summary-val free-text" style={{ color: "#10b981", fontWeight: 700 }}>FREE</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-key">Insured Duties &amp; Taxes</span>
                    <span className="summary-val">FREE</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="summary-row" style={{ color: "#10b981", fontWeight: 600 }}>
                      <span className="summary-key">Discount ({discountPercent}%)</span>
                      <span className="summary-val">-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="total-underline-bar"></div>

                  <div className="summary-total-row">
                    <span>Total</span>
                    <span>${finalTotal.toLocaleString()}</span>
                  </div>

                  {/* Promo Code Trigger */}
                  <form onSubmit={applyPromo} style={{ marginTop: "20px", display: "flex", gap: "8px" }}>
                    <input 
                      type="text" 
                      placeholder="Enter promo code (RITHIKA)" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{
                        flex: 1,
                        border: "1px solid var(--border-gray)",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        fontSize: "12px",
                        outline: "none"
                      }}
                    />
                    <button type="submit" style={{
                      backgroundColor: "var(--accent-blue)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "8px 16px",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}>
                      Apply
                    </button>
                  </form>
                  {promoError && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "5px" }}>{promoError}</p>}
                  {promoSuccess && <p style={{ color: "#10b981", fontSize: "11px", marginTop: "5px", fontWeight: 500 }}>{promoSuccess}</p>}

                  <button 
                    className="summary-checkout-btn" 
                    style={{ backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" }}
                    onClick={() => {
                      if (discountPercent > 0) {
                        localStorage.setItem("rithika_applied_discount", JSON.stringify(discountPercent));
                      } else {
                        localStorage.removeItem("rithika_applied_discount");
                      }
                      router.push("/checkout");
                    }}
                  >
                    Secure Checkout <i className="fa-solid fa-lock" style={{ marginLeft: "6px" }}></i>
                  </button>
                </div>
              </div>

            </div>
          )}
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Scoped Cart styles */
        .cart-header-area {
          background-color: var(--light-blue-gray);
          border-bottom: 1px solid var(--border-gray);
          padding: 40px 60px;
        }

        .cart-header-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .breadcrumbs {
          font-size: 12px;
          color: var(--text-gray);
          margin-bottom: 15px;
          font-weight: 400;
          letter-spacing: 0.3px;
        }

        .cart-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 400;
          line-height: 1.2;
          color: var(--header-dark);
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .cart-subtitle {
          font-size: 13px;
          color: var(--text-gray);
          font-weight: 300;
        }

        .secure-checkout-tag {
          font-size: 13px;
          font-weight: 600;
          color: var(--header-dark);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cart-main-section {
          padding: 40px 60px 80px 60px;
          background-color: var(--white);
        }

        .cart-main-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.65fr;
          gap: 50px;
          align-items: start;
        }

        .cart-left-panel {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .cart-items-flow {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cart-item-card {
          background-color: var(--white);
          border-radius: 8px;
          border: 1px solid var(--border-gray);
          padding: 24px;
          display: grid;
          grid-template-columns: 130px 1.4fr 1.2fr;
          gap: 25px;
          align-items: center;
          transition: var(--transition);
        }

        .cart-item-card:hover {
          box-shadow: 0 4px 20px rgba(2, 16, 36, 0.03);
        }

        .cart-item-media {
          width: 130px;
          height: 130px;
          border-radius: 4px;
          border: 1px solid var(--border-gray);
          background-color: var(--light-blue-gray);
          overflow: hidden;
        }

        .cart-item-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cart-prod-title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 600;
          color: var(--header-dark);
          margin-bottom: 2px;
        }

        .cart-prod-meta {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-gray);
          line-height: 1.4;
        }

        .cart-prod-specs {
          font-size: 12px;
          font-weight: 600;
          color: var(--header-dark);
          margin-top: 4px;
        }

        .cart-item-actions {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }

        .cart-action-link {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-gray);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: var(--transition);
        }

        .cart-action-link:hover {
          color: var(--accent-blue) !important;
        }

        .cart-price-qty-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 15px;
        }

        .cart-item-price {
          font-size: 16px;
          font-weight: 700;
          color: var(--header-dark);
        }

        .qty-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-gray);
          border-radius: 4px;
          background-color: var(--white);
          overflow: hidden;
        }

        .qty-btn {
          background: none;
          border: none;
          width: 28px;
          height: 28px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-gray);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .qty-btn:hover {
          background-color: var(--light-blue-gray);
          color: var(--header-dark);
        }

        .qty-val {
          font-size: 13px;
          font-weight: 600;
          width: 28px;
          text-align: center;
          display: block;
        }

        .micro-cart-trust-banner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
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

        /* Recommendations Carousel */
        .related-section {
          border-top: 1px solid var(--border-gray);
          padding-top: 40px;
          margin-top: 15px;
        }

        .related-title {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 500;
          color: var(--header-dark);
          margin-bottom: 25px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .related-card {
          background-color: var(--white);
          border-radius: 6px;
          border: 1px solid var(--border-gray);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
        }

        .related-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(2, 16, 36, 0.04);
          border-color: #cbd5e1;
        }

        .related-img-box {
          height: 220px;
          background-color: var(--light-blue-gray);
          overflow: hidden;
        }

        .related-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .related-info {
          padding: 16px 15px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
          flex-grow: 1;
        }

        .related-prod-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--header-dark);
          margin-bottom: 2px;
        }

        .related-prod-price {
          font-size: 13px;
          font-weight: 700;
          color: var(--header-dark);
        }

        .related-add-btn {
          width: 100%;
          background: none;
          border: 1px solid var(--border-gray);
          color: var(--header-dark);
          padding: 8px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 3px;
          cursor: pointer;
          transition: var(--transition);
          margin-top: auto;
        }

        .related-add-btn:hover {
          background-color: var(--accent-blue);
          border-color: var(--accent-blue);
          color: var(--white);
        }

        /* Summary panel styling */
        .cart-right-panel {
          position: sticky;
          top: 100px;
        }

        .summary-card {
          background-color: #fafbfc;
          border: 1px solid var(--border-gray);
          border-radius: 8px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .summary-title {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 500;
          color: var(--header-dark);
          border-bottom: 1px solid var(--border-gray);
          padding-bottom: 15px;
          margin-bottom: 5px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .summary-key {
          color: var(--text-gray);
          font-weight: 400;
        }

        .summary-val {
          color: var(--header-dark);
          font-weight: 600;
        }

        .total-underline-bar {
          border-top: 1px solid var(--border-gray);
          margin: 10px 0;
        }

        .summary-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 700;
          color: var(--header-dark);
        }

        .summary-checkout-btn {
          width: 100%;
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
          margin-top: 15px;
        }

        .summary-checkout-btn:hover {
          opacity: 0.9;
        }

        /* Responsiveness */
        @media (max-width: 1024px) {
          .cart-main-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .cart-right-panel {
            position: relative;
            top: 0;
          }
        }

        @media (max-width: 768px) {
          .cart-header-area {
            padding: 30px 20px;
          }
          .cart-header-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .cart-main-section {
            padding: 40px 20px;
          }
          .cart-item-card {
            grid-template-columns: 80px 1fr;
            gap: 15px;
          }
          .cart-price-qty-block {
            grid-column: span 2;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid var(--border-gray);
            padding-top: 15px;
          }
          .micro-cart-trust-banner {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}} />
    </>
  );
}
