"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

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
      <main className="dashboard-wrap">
        <div className="dashboard-container">
          
          {/* Minimal Side Nav */}
          <aside className="dashboard-nav">
            <h1 className="nav-header">My Account</h1>
            <nav className="nav-links">
              <Link href="/orders" className="nav-link">Orders</Link>
              <Link href="/address-book" className="nav-link active">Address Book</Link>
              <Link href="/wishlist" className="nav-link">Wishlist</Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="dashboard-content">
            <div className="content-header">
              <h2 className="content-title">Address Book</h2>
              <button className="btn-outline" onClick={() => setFormOpen(!formOpen)}>
                {formOpen ? "Cancel" : "Add New Address"}
              </button>
            </div>

            {formOpen && (
              <div className="form-wrapper">
                <h3 className="form-title">New Address</h3>
                <form onSubmit={handleCreate} className="address-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Recipient Name</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address Line 1</label>
                    <input type="text" required value={formData.addressLine1} onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })} />
                  </div>

                  <div className="form-row three-cols">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>State / Province</label>
                      <input type="text" required value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>ZIP / Postal Code</label>
                      <input type="text" required value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-checkbox">
                    <input type="checkbox" id="set-default" checked={formData.isDefault} onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })} />
                    <label htmlFor="set-default">Set as default shipping address</label>
                  </div>

                  <button type="submit" className="btn-primary">Save Address</button>
                </form>
              </div>
            )}

            <div className="addresses-grid">
              {addresses.map((addr, index) => (
                <div className={`address-card ${index % 2 !== 0 ? 'offset-card' : ''}`} key={addr.id}>
                  <div className="address-header">
                    <h4 className="address-name">{addr.name}</h4>
                    {addr.isDefault && <span className="status-pill">Default</span>}
                  </div>
                  <p className="address-details">
                    {addr.addressLine1}<br />
                    {addr.city}, {addr.state} {addr.zip}<br />
                    {addr.country}
                  </p>
                  <p className="address-phone">{addr.phone}</p>
                  
                  <div className="address-actions">
                    {!addr.isDefault && (
                      <button onClick={() => handleSetDefault(addr.id)} className="action-btn">Set Default</button>
                    )}
                    {addresses.length > 1 && (
                      <button onClick={() => deleteAddress(addr.id)} className="action-btn delete-btn">Delete</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
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

        .btn-outline {
          background: transparent;
          border: 1px solid #122742;
          color: #122742;
          padding: 10px 24px;
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

        .btn-primary {
          background-color: #122742;
          color: #ffffff;
          border: none;
          padding: 14px 32px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 20px;
        }

        .btn-primary:hover {
          background-color: #C9A680;
        }

        .form-wrapper {
          background-color: #F4F4F4;
          padding: 40px;
        }

        .form-title {
          font-family: var(--font-serif, serif);
          font-size: 20px;
          color: #122742;
          margin-top: 0;
          margin-bottom: 30px;
          font-weight: 400;
        }

        .address-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .form-row.three-cols {
          grid-template-columns: 1fr 1fr 1fr;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #888;
        }

        .form-group input {
          padding: 12px 16px;
          border: 1px solid #EBE3DC;
          background-color: #ffffff;
          font-size: 13px;
          color: #122742;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus {
          border-color: #122742;
        }

        .form-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }

        .form-checkbox label {
          font-size: 12px;
          color: #122742;
          cursor: pointer;
        }

        .addresses-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .address-card {
          padding: 40px;
          border: 1px solid #F4F4F4;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: transform 0.4s ease;
        }

        .address-card.offset-card {
          margin-top: 40px;
        }

        .address-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(18, 39, 66, 0.04);
        }

        .address-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .address-name {
          font-family: var(--font-serif, serif);
          font-size: 20px;
          color: #122742;
          margin: 0;
          font-weight: 400;
        }

        .status-pill {
          display: inline-block;
          padding: 4px 10px;
          background-color: #EBE3DC;
          color: #122742;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 2px;
          font-weight: 600;
        }

        .address-details, .address-phone {
          font-size: 13px;
          line-height: 1.6;
          color: #888;
          margin: 0;
        }

        .address-actions {
          display: flex;
          gap: 20px;
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid #F4F4F4;
        }

        .action-btn {
          background: none;
          border: none;
          color: #C9A680;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          padding: 0;
          transition: color 0.3s ease;
        }

        .action-btn:hover {
          color: #122742;
        }

        .delete-btn {
          color: #888;
        }

        .delete-btn:hover {
          color: #ef4444;
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
          .address-card.offset-card {
            margin-top: 0;
          }
        }

        @media (max-width: 768px) {
          .dashboard-wrap {
            padding: 40px 20px;
          }
          .addresses-grid {
            grid-template-columns: 1fr;
          }
          .form-row, .form-row.three-cols {
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
