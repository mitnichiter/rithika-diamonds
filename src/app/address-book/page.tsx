"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp, Address } from "@/context/AppContext";

export default function AddressBookPage() {
  const { addresses, addAddress, updateAddress, deleteAddress } = useApp();

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    addressLine1: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
    isDefault: false
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.addressLine1 && formData.city) {
      addAddress(formData);
      setFormData({
        name: "",
        addressLine1: "",
        city: "",
        state: "",
        zip: "",
        country: "United States",
        phone: "",
        isDefault: false
      });
      setFormOpen(false);
    }
  };

  const handleSetDefault = (id: string) => {
    updateAddress(id, { isDefault: true });
  };

  return (
    <>
      <main className="account-details-wrap">
        <section className="account-header-area">
          <div className="account-header-container">
            <div>
              <div className="breadcrumbs">Home &gt; My Account &gt; <span style={{ color: "var(--accent-blue)" }}>Address Book</span></div>
              <h1 className="account-title">Address Book</h1>
              <p className="account-subtitle">Manage your saved shipping addresses.</p>
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
                <Link href="/address-book" className="menu-link active" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>
                  <i className="fa-solid fa-map-location-dot"></i> Address Book
                </Link>
                <Link href="/notifications" className="menu-link">
                  <i className="fa-solid fa-bell"></i> Notifications
                </Link>
              </nav>
            </aside>

            {/* Main Content Column */}
            <div className="dashboard-main-panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-gray)", paddingBottom: "15px", marginBottom: "5px" }}>
                <h2 className="panel-title" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>Saved Addresses ({addresses.length})</h2>
                <button 
                  onClick={() => setFormOpen(!formOpen)}
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
                  {formOpen ? "Cancel" : "Add New Address"}
                </button>
              </div>

              {formOpen && (
                <form onSubmit={handleCreate} style={{
                  border: "1px solid var(--border-gray)",
                  borderRadius: "8px",
                  padding: "24px",
                  backgroundColor: "#fafbfc",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px"
                }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase" }}>New Address</h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-gray)" }}>Recipient Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--border-gray)" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-gray)" }}>Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--border-gray)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-gray)" }}>Address Line 1</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--border-gray)" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-gray)" }}>City</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--border-gray)" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-gray)" }}>State / Province</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--border-gray)" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-gray)" }}>ZIP / Postal Code</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--border-gray)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input 
                      type="checkbox" 
                      id="set-default"
                      checked={formData.isDefault}
                      onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    />
                    <label htmlFor="set-default" style={{ fontSize: "12px", color: "var(--text-gray)", cursor: "pointer" }}>Set as default shipping address</label>
                  </div>

                  <button 
                    type="submit"
                    style={{
                      backgroundColor: "var(--accent-blue)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "12px",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      marginTop: "10px"
                    }}
                  >
                    Save Address
                  </button>
                </form>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="addresses-grid">
                {addresses.map((addr) => (
                  <div key={addr.id} style={{
                    border: "1px solid var(--border-gray)",
                    borderRadius: "8px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    backgroundColor: "white"
                  }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", gap: "10px" }}>
                      {addr.name}
                      {addr.isDefault && <span style={{ fontSize: "9px", padding: "1px 6px", borderRadius: "10px", backgroundColor: "var(--accent-blue)", color: "white" }}>Default</span>}
                    </span>
                    <p style={{ fontSize: "13px", color: "var(--text-gray)", lineHeight: "1.5" }}>
                      {addr.addressLine1},<br />
                      {addr.city}, {addr.state} - {addr.zip}, {addr.country}
                    </p>
                    <span style={{ fontSize: "12px", fontWeight: 600 }}>{addr.phone}</span>
                    
                    <div style={{ display: "flex", gap: "15px", marginTop: "15px", borderTop: "1px solid var(--border-gray)", paddingTop: "15px" }}>
                      {!addr.isDefault && (
                        <button onClick={() => handleSetDefault(addr.id)} style={{
                          background: "none", border: "none", color: "var(--accent-blue)", fontSize: "11px", fontWeight: 700, cursor: "pointer", textTransform: "uppercase"
                        }}>
                          Set Default
                        </button>
                      )}
                      {addresses.length > 1 && (
                        <button onClick={() => deleteAddress(addr.id)} style={{
                          background: "none", border: "none", color: "#ef4444", fontSize: "11px", fontWeight: 700, cursor: "pointer", textTransform: "uppercase"
                        }}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

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
          .addresses-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </>
  );
}
