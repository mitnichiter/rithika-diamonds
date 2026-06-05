"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function OrdersPage() {
  const { orders } = useApp();

  return (
    <>
      <main className="account-details-wrap">
        {/* ==========================================
             3. BREADCRUMBS & ACCOUNT HEADER BANNER
             ========================================== */}
        <section className="account-header-area">
          <div className="account-header-container">
            <div>
              <div className="breadcrumbs">Home &gt; My Account &gt; <span style={{ color: "var(--accent-blue)" }}>My Orders</span></div>
              <h1 className="account-title">My Orders</h1>
              <p className="account-subtitle">View and track your jewellery orders.</p>
            </div>
          </div>
        </section>

        {/* ==========================================
             4. ACCOUNT DASHBOARD LAYOUT
             ========================================== */}
        <section className="dashboard-section">
          <div className="dashboard-container">
            
            {/* Sidebar Column */}
            <aside className="dashboard-sidebar">
              <div className="user-profile-summary">
                <div className="avatar-circle" style={{ backgroundColor: "var(--accent-blue)" }}>
                  <i className="fa-regular fa-user"></i>
                </div>
                <div className="user-meta">
                  <span className="user-name">Guest Customer</span>
                  <span className="user-email">concierge@rithikadiamonds.com</span>
                </div>
              </div>

              <nav className="sidebar-menu">
                <Link href="/orders" className="menu-link active" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>
                  <i className="fa-solid fa-box"></i> My Orders
                </Link>
                <Link href="/address-book" className="menu-link">
                  <i className="fa-solid fa-map-location-dot"></i> Address Book
                </Link>
                <Link href="/notifications" className="menu-link">
                  <i className="fa-solid fa-bell"></i> Notifications
                </Link>
              </nav>
            </aside>

            {/* Main Content Column */}
            <div className="dashboard-main-panel">
              <h2 className="panel-title">Order History ({orders.length})</h2>
              
              {orders.length === 0 ? (
                <div style={{
                  padding: "60px 20px",
                  textAlign: "center",
                  border: "1px dashed var(--border-gray)",
                  borderRadius: "8px"
                }}>
                  <i className="fa-solid fa-box" style={{ fontSize: "42px", color: "#cbd5e1", marginBottom: "15px" }}></i>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 400, marginBottom: "10px" }}>No Orders Placed Yet</h3>
                  <p style={{ color: "var(--text-gray)", fontSize: "13px", marginBottom: "20px" }}>You have not placed any orders yet. Discover our collection to place your first order.</p>
                  <Link href="/shop" style={{
                    backgroundColor: "var(--accent-blue)",
                    color: "white",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textDecoration: "none",
                    display: "inline-block"
                  }}>
                    Explore Shop
                  </Link>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div className="order-group-card" key={order.id}>
                      <div className="order-card-header">
                        <div className="header-meta-group">
                          <div className="meta-item">
                            <span className="meta-label">ORDER PLACED</span>
                            <span className="meta-val">{order.date}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">TOTAL</span>
                            <span className="meta-val">${order.total.toLocaleString()}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">SHIP TO</span>
                            <span className="meta-val">{order.shippingAddress.name}</span>
                          </div>
                        </div>
                        <div className="header-order-id">
                          <span className="id-label">ORDER # {order.id}</span>
                          <span className="status-badge" style={{ backgroundColor: "#eff6ff", color: "var(--accent-blue)" }}>{order.status}</span>
                        </div>
                      </div>

                      <div className="order-card-body">
                        {order.items.map((item) => (
                          <div className="order-product-row" key={item.id}>
                            <div className="product-media-block">
                              <img src={item.image} alt={item.name} />
                            </div>
                            <div className="product-details-block">
                              <h4 className="prod-name-title">{item.name}</h4>
                              <p className="prod-desc-meta">Price: ${item.price.toLocaleString()} | Qty: {item.quantity}</p>
                              <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                                <Link href={`/product/${item.id}`} style={{
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  color: "var(--accent-blue)",
                                  textDecoration: "none",
                                  textTransform: "uppercase"
                                }}>
                                  Buy It Again
                                </Link>
                              </div>
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
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Account Dashboard Shared Styles */
        .account-details-wrap {
          background-color: var(--white);
        }

        .account-header-area {
          background-color: var(--light-blue-gray);
          border-bottom: 1px solid var(--border-gray);
          padding: 40px 60px;
        }

        .account-header-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .breadcrumbs {
          font-size: 12px;
          color: var(--text-gray);
          margin-bottom: 15px;
          font-weight: 400;
          letter-spacing: 0.3px;
        }

        .account-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 400;
          line-height: 1.2;
          color: var(--header-dark);
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .account-subtitle {
          font-size: 13px;
          color: var(--text-gray);
          font-weight: 300;
        }

        .dashboard-section {
          padding: 40px 60px 80px 60px;
        }

        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 50px;
          align-items: start;
        }

        /* Sidebar Column */
        .dashboard-sidebar {
          border: 1px solid var(--border-gray);
          border-radius: 8px;
          padding: 24px;
          background-color: #fafbfc;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .user-profile-summary {
          display: flex;
          align-items: center;
          gap: 15px;
          border-bottom: 1px solid var(--border-gray);
          padding-bottom: 20px;
        }

        .avatar-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .user-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .user-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--header-dark);
        }

        .user-email {
          font-size: 11px;
          color: var(--text-gray);
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .menu-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-gray);
          text-decoration: none;
          border-radius: 4px;
          transition: var(--transition);
        }

        .menu-link i {
          width: 16px;
          text-align: center;
        }

        .menu-link:hover, .menu-link.active {
          background-color: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          color: var(--header-dark);
        }

        /* Main panel */
        .dashboard-main-panel {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .panel-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 500;
          color: var(--header-dark);
          border-bottom: 1px solid var(--border-gray);
          padding-bottom: 15px;
          margin-bottom: 5px;
        }

        /* Orders card */
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .order-group-card {
          border: 1px solid var(--border-gray);
          border-radius: 8px;
          overflow: hidden;
          background-color: white;
          transition: var(--transition);
        }

        .order-group-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .order-card-header {
          background-color: #fafbfc;
          border-bottom: 1px solid var(--border-gray);
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .header-meta-group {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .meta-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-gray);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .meta-val {
          font-size: 13px;
          font-weight: 600;
          color: var(--header-dark);
        }

        .header-order-id {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .id-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--header-dark);
        }

        .status-badge {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .order-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .order-product-row {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .order-product-row:not(:last-child) {
          border-bottom: 1px solid var(--border-gray);
          padding-bottom: 20px;
        }

        .product-media-block {
          width: 80px;
          height: 80px;
          border-radius: 4px;
          border: 1px solid var(--border-gray);
          overflow: hidden;
          flex-shrink: 0;
        }

        .product-media-block img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-details-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .prod-name-title {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 600;
          color: var(--header-dark);
        }

        .prod-desc-meta {
          font-size: 12px;
          color: var(--text-gray);
        }

        /* Responsiveness */
        @media (max-width: 1024px) {
          .dashboard-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .account-header-area {
            padding: 30px 20px;
          }
          .dashboard-section {
            padding: 40px 20px;
          }
          .order-card-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .header-order-id {
            align-items: flex-start;
            border-top: 1px solid var(--border-gray);
            padding-top: 10px;
            width: 100%;
          }
        }
      `}} />
    </>
  );
}
