"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp, Address } from "@/context/AppContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, addresses, placeOrder } = useApp();

  const [shippingOption, setShippingOption] = useState("Standard");
  const [paymentOption, setPaymentOption] = useState("UPI");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [orderPlaced, setSubmittedOrder] = useState(false);
  const [assignedOrderId, setAssignedOrderId] = useState("");

  const activeAddress: Address = useMemo(() => {
    return addresses.find((a) => a.isDefault) || addresses[0];
  }, [addresses]);

  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      router.push("/cart");
    }

    const storedDiscount = localStorage.getItem("rithika_applied_discount");
    if (storedDiscount) {
      setDiscountPercent(JSON.parse(storedDiscount));
    }
  }, [cart, orderPlaced, router]);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const shippingCost = shippingOption === "Express" ? 15 : 0;
  const discountAmount = subtotal * (discountPercent / 100);
  const grandTotal = subtotal - discountAmount + shippingCost;

  const handlePlaceOrder = () => {
    if (!activeAddress) return;
    const orderId = placeOrder(activeAddress, `${paymentOption} Payment`);
    if (orderId) {
      setAssignedOrderId(orderId);
      setSubmittedOrder(true);
      localStorage.removeItem("rithika_applied_discount");
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="document-container">
          <div className="success-message">
            <h1 className="document-title">Order Confirmed</h1>
            <p>Thank you for choosing Rithika Diamonds. Your secure order <strong>#{assignedOrderId}</strong> has been logged. We are crafting your masterpieces with precision.</p>
            <div className="success-actions">
              <Link href="/orders" className="btn-primary">Track My Order</Link>
              <Link href="/" className="btn-secondary">Back to Home</Link>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .checkout-page { background-color: #ffffff; color: #122742; min-height: 100vh; padding: 80px 20px; font-family: var(--font-sans, sans-serif); }
          .document-container { max-width: 800px; margin: 0 auto; }
          .document-title { font-family: var(--font-serif, serif); font-size: 32px; font-weight: 400; color: #122742; margin-bottom: 20px; }
          .success-message { text-align: center; padding: 100px 0; }
          .success-message p { margin-bottom: 40px; color: rgba(18,39,66,0.8); line-height: 1.6; }
          .success-actions { display: flex; gap: 20px; justify-content: center; }
          .btn-primary { background-color: #122742; color: #ffffff; padding: 15px 30px; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; text-decoration: none; }
          .btn-secondary { background-color: transparent; color: #122742; border: 1px solid #122742; padding: 15px 30px; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; text-decoration: none; }
        `}} />
      </div>
    );
  }

  return (
    <>
      <main className="checkout-page">
        <div className="document-container">
          <header className="document-header">
            <div className="breadcrumbs">
              <Link href="/">Home</Link> &mdash; <Link href="/cart">Your Cart</Link> &mdash; <span>Checkout</span>
            </div>
            <h1 className="document-title">Checkout</h1>
          </header>

          <div className="document-flow">
            
            {/* Step 1: Delivery Address */}
            <section className="checkout-section">
              <h2 className="section-title">1. Delivery Address</h2>
              {activeAddress ? (
                <div className="address-block">
                  <div className="address-details">
                    <p className="address-name">{activeAddress.name}</p>
                    <p className="address-text">
                      {activeAddress.addressLine1}<br />
                      {activeAddress.city}, {activeAddress.state} - {activeAddress.zip}, {activeAddress.country}
                    </p>
                    <p className="address-phone">{activeAddress.phone}</p>
                  </div>
                  <Link href="/address-book" className="edit-link">Edit</Link>
                </div>
              ) : (
                <div className="address-block empty">
                  <p>No addresses found.</p>
                  <Link href="/address-book" className="edit-link">Add Address</Link>
                </div>
              )}
            </section>

            {/* Step 2: Shipping Method */}
            <section className="checkout-section">
              <h2 className="section-title">2. Shipping Method</h2>
              <div className="options-list">
                <label className={`option-row ${shippingOption === "Standard" ? "selected" : ""}`}>
                  <div className="option-left">
                    <input type="radio" name="shipping" checked={shippingOption === "Standard"} onChange={() => setShippingOption("Standard")} />
                    <div>
                      <span className="option-name">Standard Shipping (3-5 Business Days)</span>
                      <span className="option-desc">Complimentary fully insured luxury courier</span>
                    </div>
                  </div>
                  <span className="option-price">Complimentary</span>
                </label>
                <label className={`option-row ${shippingOption === "Express" ? "selected" : ""}`}>
                  <div className="option-left">
                    <input type="radio" name="shipping" checked={shippingOption === "Express"} onChange={() => setShippingOption("Express")} />
                    <div>
                      <span className="option-name">Express Delivery (1-2 Business Days)</span>
                      <span className="option-desc">Priority high-security insured transit</span>
                    </div>
                  </div>
                  <span className="option-price">$15</span>
                </label>
              </div>
            </section>

            {/* Step 3: Payment Method */}
            <section className="checkout-section">
              <h2 className="section-title">3. Payment Method</h2>
              <div className="options-list">
                <label className={`option-row ${paymentOption === "UPI" ? "selected" : ""}`}>
                  <div className="option-left">
                    <input type="radio" name="payment" checked={paymentOption === "UPI"} onChange={() => setPaymentOption("UPI")} />
                    <div>
                      <span className="option-name">UPI Payment</span>
                      <span className="option-desc">GPay, PhonePe, Paytm</span>
                    </div>
                  </div>
                </label>
                <label className={`option-row ${paymentOption === "Card" ? "selected" : ""}`}>
                  <div className="option-left">
                    <input type="radio" name="payment" checked={paymentOption === "Card"} onChange={() => setPaymentOption("Card")} />
                    <div>
                      <span className="option-name">Credit / Debit Card</span>
                      <span className="option-desc">Visa, Mastercard, RuPay</span>
                    </div>
                  </div>
                </label>
                <label className={`option-row ${paymentOption === "NetBanking" ? "selected" : ""}`}>
                  <div className="option-left">
                    <input type="radio" name="payment" checked={paymentOption === "NetBanking"} onChange={() => setPaymentOption("NetBanking")} />
                    <div>
                      <span className="option-name">Net Banking</span>
                      <span className="option-desc">Direct bank transfer</span>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            {/* Step 4: Order Review */}
            <section className="checkout-section">
              <h2 className="section-title">4. Order Review</h2>
              <div className="review-items">
                {cart.map((item) => (
                  <div className="review-item-row" key={`${item.id}-${item.metal}-${item.size}`}>
                    <div className="review-item-left">
                      <img src={item.image} alt={item.name} />
                      <div className="review-item-info">
                        <span className="review-item-name">{item.name}</span>
                        <span className="review-item-meta">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="review-item-price">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Summary & Action */}
            <section className="checkout-section summary-section">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Complimentary" : `$${shippingCost}`}</span>
              </div>
              {discountPercent > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="summary-row total-row">
                <span>Total</span>
                <span>${grandTotal.toLocaleString()}</span>
              </div>

              <div className="checkout-action">
                <button className="btn-primary" onClick={handlePlaceOrder}>
                  Place Secure Order
                </button>
              </div>
            </section>

          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .checkout-page {
          background-color: #ffffff;
          color: #122742;
          min-height: 100vh;
          padding: 80px 20px;
          font-family: var(--font-sans, sans-serif);
        }

        .document-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .document-header {
          margin-bottom: 60px;
          border-bottom: 1px solid rgba(18,39,66,0.1);
          padding-bottom: 20px;
        }

        .breadcrumbs {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
          color: rgba(18,39,66,0.6);
        }

        .breadcrumbs a {
          color: #122742;
          text-decoration: none;
        }

        .document-title {
          font-family: var(--font-serif, serif);
          font-size: 32px;
          font-weight: 400;
          color: #122742;
        }

        .document-flow {
          display: flex;
          flex-direction: column;
        }

        .checkout-section {
          padding: 40px 0;
          border-bottom: 1px solid rgba(18,39,66,0.1);
        }

        .section-title {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          margin-bottom: 30px;
          color: #122742;
        }

        .address-block {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .address-details p {
          margin-bottom: 5px;
          font-size: 14px;
          line-height: 1.5;
        }

        .address-name {
          font-weight: 600;
        }

        .address-text, .address-phone {
          color: rgba(18,39,66,0.8);
        }

        .edit-link {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #122742;
          text-decoration: underline;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .option-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .option-left {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }

        .option-left input[type="radio"] {
          margin-top: 4px;
          accent-color: #122742;
        }

        .option-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .option-desc {
          display: block;
          font-size: 12px;
          color: rgba(18,39,66,0.6);
        }

        .option-price {
          font-size: 14px;
          font-weight: 400;
        }

        .review-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .review-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .review-item-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .review-item-left img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          background-color: #EBE3DC;
        }

        .review-item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .review-item-name {
          font-size: 14px;
          font-weight: 600;
        }

        .review-item-meta {
          font-size: 12px;
          color: rgba(18,39,66,0.6);
        }

        .review-item-price {
          font-size: 14px;
        }

        .summary-section {
          border-bottom: none;
          padding-top: 60px;
          max-width: 400px;
          margin-left: auto;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          border-bottom: 1px solid rgba(18,39,66,0.1);
          font-size: 14px;
        }

        .discount-row {
          color: #C9A680;
        }

        .total-row {
          font-size: 18px;
          font-weight: 600;
          border-bottom: none;
          padding-top: 20px;
        }

        .checkout-action {
          margin-top: 40px;
        }

        .btn-primary {
          display: block;
          width: 100%;
          background-color: #122742;
          color: #ffffff;
          text-align: center;
          padding: 18px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #0a1626;
        }

        @media (max-width: 768px) {
          .summary-section {
            max-width: 100%;
            margin-left: 0;
          }
        }
      `}} />
    </>
  );
}
