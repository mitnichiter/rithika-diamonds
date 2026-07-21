"use client";

import React from "react";
import Link from "next/link";
import { useApp, WishlistItem } from "@/context/AppContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      metal: "18K White Gold",
      size: "7"
    });
    toggleWishlist(item);
  };

  return (
    <>
      <main className="dashboard-wrap">
        <div className="dashboard-container">
          
          {/* Minimal Side Nav */}
          <aside className="dashboard-nav">
            <h1 className="nav-header">My Account</h1>
            <nav className="nav-links">
              <Link href="/orders" className="nav-link">Orders</Link>
              <Link href="/address-book" className="nav-link">Address Book</Link>
              <Link href="/wishlist" className="nav-link active">Wishlist</Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="dashboard-content">
            <div className="content-header">
              <h2 className="content-title">Wishlist</h2>
              <span className="content-meta">{wishlist.length} Items</span>
            </div>

            {wishlist.length === 0 ? (
              <div className="empty-state">
                <p>Your private collection is currently empty.</p>
                <Link href="/shop" className="btn-primary">Explore Collection</Link>
              </div>
            ) : (
              <div className="wishlist-grid">
                {wishlist.map((item, index) => (
                  <article className={`wishlist-card ${index % 2 !== 0 ? 'offset-card' : ''}`} key={item.id}>
                    <div className="card-media">
                      <button 
                        className="remove-btn" 
                        onClick={() => toggleWishlist(item)}
                        aria-label="Remove from Wishlist"
                      >
                        &times;
                      </button>
                      <img src={item.image} alt={item.name} className="card-img" />
                    </div>
                    <div className="card-info">
                      <h3 className="item-name">{item.name}</h3>
                      <span className="item-price">${item.price.toLocaleString()}</span>
                      <button className="btn-outline add-cart-btn" onClick={() => handleAddToCart(item)}>
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-wrap {
          background-color: #ffffff;
          color: #122742;
          min-height: 100vh;
          padding: 80px 40px;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 100px;
          align-items: start;
        }

        .dashboard-nav {
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: sticky;
          top: 120px;
        }

        .nav-header {
          font-family: var(--font-serif, serif);
          font-size: 24px;
          font-weight: 400;
          color: #122742;
          margin: 0;
        }

        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .nav-link {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #888;
          text-decoration: none;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-link:hover, .nav-link.active {
          color: #122742;
          font-weight: 600;
        }

        .nav-link.active::before {
          content: "";
          display: block;
          width: 4px;
          height: 4px;
          background-color: #C9A680;
          border-radius: 50%;
        }

        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          border-bottom: 1px solid #F4F4F4;
          padding-bottom: 20px;
        }

        .content-title {
          font-family: var(--font-serif, serif);
          font-size: 32px;
          font-weight: 400;
          color: #122742;
          margin: 0;
        }

        .content-meta {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #888;
        }

        .empty-state {
          padding: 80px 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        .empty-state p {
          font-size: 14px;
          color: #888;
        }

        .btn-primary {
          background-color: #122742;
          color: #ffffff;
          padding: 14px 32px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #C9A680;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid #122742;
          color: #122742;
          padding: 12px 24px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: #122742;
          color: #ffffff;
        }

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .wishlist-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: transform 0.4s ease;
        }

        .wishlist-card.offset-card {
          margin-top: 40px;
        }

        .wishlist-card:hover {
          transform: translateY(-4px);
        }

        .card-media {
          position: relative;
          aspect-ratio: 4/5;
          background-color: #F4F4F4;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .wishlist-card:hover .card-img {
          transform: scale(1.05);
        }

        .remove-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #ffffff;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #122742;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }

        .remove-btn:hover {
          background: #122742;
          color: #ffffff;
        }

        .card-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }

        .item-name {
          font-family: var(--font-serif, serif);
          font-size: 18px;
          color: #122742;
          margin: 0;
          font-weight: 400;
        }

        .item-price {
          font-size: 13px;
          color: #888;
        }

        .add-cart-btn {
          margin-top: 10px;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .dashboard-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .dashboard-nav {
            position: static;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #F4F4F4;
            padding-bottom: 20px;
          }
          .nav-links {
            flex-direction: row;
            gap: 30px;
          }
          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .wishlist-card.offset-card {
            margin-top: 0;
          }
        }

        @media (max-width: 768px) {
          .dashboard-wrap {
            padding: 40px 20px;
          }
          .wishlist-grid {
            grid-template-columns: 1fr;
          }
          .nav-links {
            display: none;
          }
        }
      `}} />
    </>
  );
}
