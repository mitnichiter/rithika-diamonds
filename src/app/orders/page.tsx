"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function OrdersPage() {
  const { orders } = useApp();

  return (
    <>
      <main className="dashboard-wrap">
        <div className="dashboard-container">
          
          {/* Minimal Side Nav */}
          <aside className="dashboard-nav">
            <h1 className="nav-header">My Account</h1>
            <nav className="nav-links">
              <Link href="/orders" className="nav-link active">Orders</Link>
              <Link href="/address-book" className="nav-link">Address Book</Link>
              <Link href="/wishlist" className="nav-link">Wishlist</Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="dashboard-content">
            <div className="content-header">
              <h2 className="content-title">Order History</h2>
              <span className="content-meta">{orders.length} Orders</span>
            </div>

            {orders.length === 0 ? (
              <div className="empty-state">
                <p>You have not placed any orders yet.</p>
                <Link href="/shop" className="btn-primary">Explore Collection</Link>
              </div>
            ) : (
              <div className="orders-grid">
                {orders.map((order, index) => (
                  <div className={`order-card ${index % 2 !== 0 ? 'offset-card' : ''}`} key={order.id}>
                    <div className="order-meta">
                      <div className="meta-group">
                        <span className="meta-label">Order Number</span>
                        <span className="meta-value">#{order.id}</span>
                      </div>
                      <div className="meta-group">
                        <span className="meta-label">Date</span>
                        <span className="meta-value">{order.date}</span>
                      </div>
                      <div className="meta-group">
                        <span className="meta-label">Total</span>
                        <span className="meta-value">${order.total.toLocaleString()}</span>
                      </div>
                      <div className="status-pill">{order.status}</div>
                    </div>
                    <div className="order-items">
                      {order.items.map((item) => (
                        <div className="order-item" key={item.id}>
                          <img src={item.image} alt={item.name} className="item-image" />
                          <div className="item-details">
                            <h4 className="item-name">{item.name}</h4>
                            <p className="item-meta">Qty: {item.quantity} &mdash; ${item.price.toLocaleString()}</p>
                            <Link href={`/product/${item.id}`} className="item-action">Buy Again</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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

        .orders-grid {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .order-card {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 60px;
          padding-bottom: 60px;
          border-bottom: 1px solid #F4F4F4;
        }

        .order-card.offset-card {
          padding-left: 80px;
        }

        .order-meta {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .meta-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .meta-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #888;
        }

        .meta-value {
          font-size: 13px;
          color: #122742;
        }

        .status-pill {
          display: inline-block;
          padding: 6px 14px;
          background-color: #EBE3DC;
          color: #122742;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 2px;
          font-weight: 600;
          width: fit-content;
          margin-top: 10px;
        }

        .order-items {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .order-item {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .item-image {
          width: 100px;
          height: 120px;
          background-color: #F4F4F4;
          object-fit: cover;
        }

        .item-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .item-name {
          font-family: var(--font-serif, serif);
          font-size: 18px;
          color: #122742;
          margin: 0;
        }

        .item-meta {
          font-size: 12px;
          color: #888;
          margin: 0;
        }

        .item-action {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #C9A680;
          text-decoration: none;
          margin-top: 10px;
          transition: color 0.3s ease;
        }

        .item-action:hover {
          color: #122742;
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
          .order-card.offset-card {
            padding-left: 0;
          }
        }

        @media (max-width: 768px) {
          .dashboard-wrap {
            padding: 40px 20px;
          }
          .order-card {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .nav-links {
            display: none;
          }
        }
      `}} />
    </>
  );
}
