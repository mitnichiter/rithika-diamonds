"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      metal: "18K White Gold",
      size: "7"
    });
    // Remove from wishlist after adding to cart
    toggleWishlist(item);
  };

  return (
    <>
      <main className="wishlist-details-wrap">
        <div className="wishlist-container">
          
          {/* Breadcrumbs */}
          <div className="wishlist-breadcrumbs">
            Home &gt; <span style={{ color: "var(--accent-blue)" }}>My Wishlist</span>
          </div>

          <div className="wishlist-header">
            <h1 className="wishlist-title">My Wishlist ({wishlist.length})</h1>
            <p className="wishlist-subtitle">Your private collection of favorite diamond masterpieces.</p>
          </div>

          {wishlist.length === 0 ? (
            <div style={{
              padding: "80px 20px",
              textAlign: "center",
              border: "1px dashed var(--border-gray)",
              borderRadius: "8px"
            }}>
              <i className="fa-regular fa-heart" style={{ fontSize: "48px", color: "#cbd5e1", marginBottom: "20px" }}></i>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, marginBottom: "10px" }}>Your Wishlist is Empty</h2>
              <p style={{ color: "var(--text-gray)", fontSize: "14px", marginBottom: "25px" }}>Save your favorite diamond masterpieces to view them here.</p>
              <Link href="/shop" style={{
                backgroundColor: "var(--accent-blue)",
                color: "white",
                padding: "12px 30px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                textDecoration: "none"
              }}>
                Explore Shop
              </Link>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlist.map((item) => (
                <article className="wishlist-card" key={item.id}>
                  <div className="card-media">
                    <button 
                      className="wishlist-remove-btn" 
                      onClick={() => toggleWishlist(item)}
                      aria-label="Remove from Wishlist"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    <img src={item.image} alt={item.name} className="card-img" />
                  </div>
                  <div className="card-desc-box">
                    <h3 className="product-title">{item.name}</h3>
                    <span className="product-price">${item.price.toLocaleString()}</span>
                    
                    <div className="card-actions">
                      <button className="add-cart-btn" onClick={() => handleAddToCart(item)}>
                        <i className="fa-solid fa-bag-shopping"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Scoped wishlist styles */
        .wishlist-details-wrap {
          padding: 40px 60px 80px 60px;
          background-color: var(--white);
        }

        .wishlist-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .wishlist-breadcrumbs {
          font-size: 12px;
          color: var(--text-gray);
          margin-bottom: 30px;
          font-weight: 400;
          letter-spacing: 0.3px;
        }

        .wishlist-header {
          margin-bottom: 40px;
        }

        .wishlist-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 400;
          line-height: 1.2;
          color: var(--header-dark);
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .wishlist-subtitle {
          font-size: 13px;
          color: var(--text-gray);
          font-weight: 300;
        }

        /* Grid */
        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .wishlist-card {
          background-color: var(--white);
          border-radius: 8px;
          border: 1px solid var(--border-gray);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          position: relative;
        }

        .wishlist-card:hover {
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

        .wishlist-card:hover .card-img {
          transform: scale(1.04);
        }

        .wishlist-remove-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background-color: rgba(255, 255, 255, 0.9);
          border: none;
          color: var(--header-dark);
          font-size: 14px;
          cursor: pointer;
          z-index: 5;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }

        .wishlist-remove-btn:hover {
          background-color: #ef4444;
          color: white;
          transform: scale(1.1) rotate(90deg);
        }

        .card-desc-box {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-grow: 1;
        }

        .product-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--header-dark);
          letter-spacing: 0.2px;
          margin: 0;
        }

        .product-price {
          font-size: 15px;
          font-weight: 650;
          color: var(--header-dark);
        }

        .card-actions {
          margin-top: auto;
          padding-top: 10px;
        }

        .add-cart-btn {
          width: 100%;
          background-color: var(--accent-blue);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 12px;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .add-cart-btn:hover {
          opacity: 0.9;
        }

        /* Responsiveness */
        @media (max-width: 1024px) {
          .wishlist-details-wrap {
            padding: 30px;
          }
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .wishlist-details-wrap {
            padding: 30px 20px;
          }
          .wishlist-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </>
  );
}
