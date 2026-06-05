"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <main className="account-details-wrap">
        <section className="account-header-area">
          <div className="account-header-container">
            <div>
              <div className="breadcrumbs">Home &gt; My Account &gt; <span style={{ color: "var(--accent-blue)" }}>Notifications</span></div>
              <h1 className="account-title">Notifications</h1>
              <p className="account-subtitle">Stay updated on your bespoke jewellery requests and orders.</p>
            </div>
          </div>
        </section>

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
                <Link href="/orders" className="menu-link">
                  <i className="fa-solid fa-box"></i> My Orders
                </Link>
                <Link href="/address-book" className="menu-link">
                  <i className="fa-solid fa-map-location-dot"></i> Address Book
                </Link>
                <Link href="/notifications" className="menu-link active" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>
                  <i className="fa-solid fa-bell"></i> Notifications
                </Link>
              </nav>
            </aside>

            {/* Main Content Column */}
            <div className="dashboard-main-panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-gray)", paddingBottom: "15px", marginBottom: "5px" }}>
                <h2 className="panel-title" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>My Notifications ({unreadCount} unread)</h2>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllNotificationsRead}
                    style={{
                      backgroundColor: "var(--accent-blue)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "8px 16px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      cursor: "pointer"
                    }}
                  >
                    Mark All as Read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div style={{
                  padding: "60px 20px",
                  textAlign: "center",
                  border: "1px dashed var(--border-gray)",
                  borderRadius: "8px"
                }}>
                  <i className="fa-regular fa-bell-slash" style={{ fontSize: "42px", color: "#cbd5e1", marginBottom: "15px" }}></i>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 400, marginBottom: "10px" }}>No Notifications</h3>
                  <p style={{ color: "var(--text-gray)", fontSize: "13px" }}>You are completely up to date.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }} className="notifications-list">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      onClick={() => !notif.read && markNotificationRead(notif.id)}
                      style={{
                        border: "1px solid var(--border-gray)",
                        borderRadius: "8px",
                        padding: "20px 24px",
                        backgroundColor: notif.read ? "white" : "#eff6ff",
                        borderColor: notif.read ? "var(--border-gray)" : "#bfdbfe",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "20px",
                        cursor: notif.read ? "default" : "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: notif.read ? "#f1f5f9" : "#dbeafe",
                          color: notif.read ? "var(--text-gray)" : "var(--accent-blue)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          flexShrink: 0
                        }}>
                          <i className="fa-solid fa-bell"></i>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--header-dark)", display: "flex", alignItems: "center", gap: "10px" }}>
                            {notif.title}
                            {!notif.read && <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--accent-blue)" }}></span>}
                          </span>
                          <p style={{ fontSize: "13px", color: "var(--text-gray)", lineHeight: "1.5", margin: 0 }}>
                            {notif.message}
                          </p>
                        </div>
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--text-gray)", whiteSpace: "nowrap" }}>{notif.date}</span>
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
        }
      `}} />
    </>
  );
}
