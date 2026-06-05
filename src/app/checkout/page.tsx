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
    // Check if cart is empty and order wasn't just placed
    if (cart.length === 0 && !orderPlaced) {
      router.push("/cart");
    }

    // Load any applied discount
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
      <div style={{
        padding: "80px 20px",
        textAlign: "center",
        color: "#1e3a8a",
        backgroundColor: "#eff6ff",
        border: "1px solid #bfdbfe",
        borderRadius: "8px",
        maxWidth: "800px",
        margin: "80px auto"
      }}>
        <i className="fa-solid fa-circle-check" style={{ fontSize: "56px", color: "var(--accent-blue)", marginBottom: "20px" }}></i>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 500, marginBottom: "12px", color: "var(--header-dark)" }}>Order Placed Successfully!</h1>
        <p style={{ fontSize: "16px", color: "var(--text-gray)", marginBottom: "30px" }}>
          Thank you for choosing Rithika Diamonds. Your secure order <strong style={{ color: "var(--header-dark)" }}>#{assignedOrderId}</strong> has been logged. We are crafting your masterpieces with precision.
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <Link href="/orders" style={{
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
            Track My Order
          </Link>
          <Link href="/" style={{
            backgroundColor: "white",
            color: "var(--header-dark)",
            border: "1px solid var(--border-gray)",
            padding: "12px 30px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            textDecoration: "none"
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <main>
        {/* ==========================================
             3. BREADCRUMBS & SECTION TITLE BANNER
             ========================================== */}
        <section className="checkout-header-area">
          <div className="checkout-header-container">
            <div>
              <div className="breadcrumbs">
                Home &gt; Your Cart &gt; <span style={{ color: "var(--accent-blue)" }}>Checkout</span>
              </div>
              <h1 className="checkout-main-title">Proceed to Checkout</h1>
              <p className="checkout-subtitle">Almost there! Review your order details and complete your purchase.</p>
            </div>
            <span className="secure-checkout-tag"><i className="fa-solid fa-shield-halved" style={{ color: "var(--accent-blue)", marginRight: "6px" }}></i> Secure Checkout</span>
          </div>
        </section>

        {/* ==========================================
             4. CHECKOUT CONTAINER GRID
             ========================================== */}
        <section className="checkout-main-section">
          <div className="checkout-container">
            
            {/* Left Column: Checkout Steps */}
            <div className="checkout-steps-panel">
              
              {/* Step 1: Delivery Address */}
              <div className="step-group">
                <div className="step-header-row">
                  <span className="step-number-circle" style={{ backgroundColor: "var(--accent-blue)" }}>1</span>
                  <h2 className="step-header-title">Delivery Address</h2>
                </div>
                {activeAddress ? (
                  <div className="delivery-address-card">
                    <div className="delivery-card-left">
                      <input type="radio" name="address-option" className="delivery-radio-input" checked readOnly id="addr-default" />
                      <label className="delivery-info-block" htmlFor="addr-default">
                        <span className="delivery-recipient-row">
                          {activeAddress.name} <span className="delivery-default-badge" style={{ backgroundColor: "var(--accent-blue)" }}>Default</span>
                        </span>
                        <p className="delivery-address-text">
                          {activeAddress.addressLine1},<br />
                          {activeAddress.city}, {activeAddress.state} - {activeAddress.zip}, {activeAddress.country}
                        </p>
                        <span className="delivery-phone">{activeAddress.phone}</span>
                      </label>
                    </div>
                    <Link href="/address-book" className="delivery-edit-btn">Manage</Link>
                  </div>
                ) : (
                  <div style={{ padding: "20px", border: "1px dashed var(--border-gray)", borderRadius: "6px" }}>
                    <p style={{ fontSize: "13px", color: "var(--text-gray)" }}>No addresses found.</p>
                    <Link href="/address-book" style={{ fontSize: "12px", color: "var(--accent-blue)", fontWeight: 600 }}>Create New Address</Link>
                  </div>
                )}
              </div>

              {/* Step 2: Shipping Method */}
              <div className="step-group">
                <div className="step-header-row">
                  <span className="step-number-circle" style={{ backgroundColor: "var(--accent-blue)" }}>2</span>
                  <h2 className="step-header-title">Shipping Method</h2>
                </div>
                <div className="shipping-methods-wrapper">
                  {/* Option 1: Standard */}
                  <label className="shipping-method-option" htmlFor="ship-std" onClick={() => setShippingOption("Standard")} style={shippingOption === "Standard" ? { borderColor: "var(--accent-blue)" } : {}}>
                    <div className="shipping-left">
                      <input type="radio" name="shipping-option" className="delivery-radio-input" checked={shippingOption === "Standard"} onChange={() => {}} id="ship-std" />
                      <div className="shipping-info-text">
                        <span className="shipping-name">Standard Shipping (3-5 Business Days)</span>
                        <p className="shipping-desc">Complimentary fully insured luxury courier</p>
                      </div>
                    </div>
                    <span className="shipping-cost free-text" style={{ color: "#10b981", fontWeight: 700 }}>FREE</span>
                  </label>
                  {/* Option 2: Express */}
                  <label className="shipping-method-option" htmlFor="ship-exp" onClick={() => setShippingOption("Express")} style={shippingOption === "Express" ? { borderColor: "var(--accent-blue)" } : {}}>
                    <div className="shipping-left">
                      <input type="radio" name="shipping-option" className="delivery-radio-input" checked={shippingOption === "Express"} onChange={() => {}} id="ship-exp" />
                      <div className="shipping-info-text">
                        <span className="shipping-name">Express Delivery (1-2 Business Days)</span>
                        <p className="shipping-desc">Priority high-security insured transit</p>
                      </div>
                    </div>
                    <span className="shipping-cost">$15</span>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="step-group">
                <div className="step-header-row">
                  <span className="step-number-circle" style={{ backgroundColor: "var(--accent-blue)" }}>3</span>
                  <h2 className="step-header-title">Payment Method</h2>
                </div>
                <div className="payment-accordions-wrapper">
                  {/* UPI */}
                  <label className="payment-option-row" htmlFor="pay-upi" onClick={() => setPaymentOption("UPI")} style={paymentOption === "UPI" ? { borderColor: "var(--accent-blue)" } : {}}>
                    <div className="payment-left">
                      <input type="radio" name="payment-method" className="delivery-radio-input" checked={paymentOption === "UPI"} onChange={() => {}} id="pay-upi" />
                      <div className="payment-detail-box">
                        <span className="payment-name">UPI Payment (GPay, PhonePe, Paytm)</span>
                        <p className="payment-desc">Pay securely using any mobile UPI app.</p>
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-down payment-chevron"></i>
                  </label>

                  {/* Cards */}
                  <label className="payment-option-row" htmlFor="pay-card" onClick={() => setPaymentOption("Card")} style={paymentOption === "Card" ? { borderColor: "var(--accent-blue)" } : {}}>
                    <div className="payment-left">
                      <input type="radio" name="payment-method" className="delivery-radio-input" checked={paymentOption === "Card"} onChange={() => {}} id="pay-card" />
                      <div className="payment-detail-box">
                        <span className="payment-name">Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                        <p className="payment-desc">Safe, bank-grade encrypted payment gateway.</p>
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-down payment-chevron"></i>
                  </label>

                  {/* Net Banking */}
                  <label className="payment-option-row" htmlFor="pay-net" onClick={() => setPaymentOption("NetBanking")} style={paymentOption === "NetBanking" ? { borderColor: "var(--accent-blue)" } : {}}>
                    <div className="payment-left">
                      <input type="radio" name="payment-method" className="delivery-radio-input" checked={paymentOption === "NetBanking"} onChange={() => {}} id="pay-net" />
                      <div className="payment-detail-box">
                        <span className="payment-name">Net Banking</span>
                        <p className="payment-desc">Pay directly from your primary bank account.</p>
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-down payment-chevron"></i>
                  </label>
                </div>
              </div>

              {/* Step 4: Order Review */}
              <div className="step-group">
                <div className="step-header-row">
                  <span className="step-number-circle" style={{ backgroundColor: "var(--accent-blue)" }}>4</span>
                  <h2 className="step-header-title">Order Review</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {cart.map((item) => (
                    <div className="review-item-card" key={`${item.id}-${item.metal}-${item.size}`}>
                      <div className="review-item-left">
                        <div className="review-item-media">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="review-item-info">
                          <h3 className="review-prod-title">{item.name}</h3>
                          <span className="review-prod-meta">{item.metal}</span>
                          {item.size && <span className="review-prod-specs">Size: {item.size} | Qty: {item.quantity}</span>}
                        </div>
                      </div>
                      <span className="review-item-price">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Encryption Security Banner */}
                <div className="security-encryption-banner">
                  <i className="fa-solid fa-shield-halved security-banner-icon" style={{ color: "var(--accent-blue)" }}></i>
                  <div className="security-banner-info">
                    <span className="security-banner-title">Your payments are 100% secure.</span>
                    <p className="security-banner-desc">Bank-grade AES 256-bit encryption protects all transitions.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Checkout Sidebar Summary */}
            <div className="checkout-right-panel">
              
              {/* Order Summary Card */}
              <div className="summary-card">
                <div className="summary-title-row">
                  <h2 className="summary-title" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>Order Summary</h2>
                  <span className="summary-item-count" style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-gray)" }}>{totalCount} Items</span>
                </div>

                {/* Compact Item Preview List */}
                <div className="summary-compact-list" style={{ borderTop: "1px solid var(--border-gray)", paddingTop: "15px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {cart.map((item) => (
                    <div className="compact-item-row" key={`${item.id}-${item.metal}`} style={{ display: "flex", gap: "12px", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <img src={item.image} alt={item.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "3px" }} />
                        <span style={{ fontSize: "12px", fontWeight: 500 }} className="compact-item-title">{item.name} <span style={{ color: "var(--text-gray)" }}>x{item.quantity}</span></span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700 }}>${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid var(--border-gray)", paddingTop: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div className="summary-row">
                    <span className="summary-key">Subtotal</span>
                    <span className="summary-val">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-key">Shipping</span>
                    <span className="summary-val">{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="summary-row" style={{ color: "#10b981", fontWeight: 600 }}>
                      <span className="summary-key">Discount ({discountPercent}%)</span>
                      <span className="summary-val">-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ borderTop: "1px solid var(--border-gray)", margin: "8px 0" }}></div>
                  <div className="summary-total-row">
                    <span>Total</span>
                    <span>${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  className="summary-checkout-btn" 
                  style={{ backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" }}
                  onClick={handlePlaceOrder}
                >
                  Place Secure Order <i className="fa-solid fa-lock" style={{ marginLeft: "6px" }}></i>
                </button>
              </div>

            </div>

          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Scoped checkout styles */
        .checkout-header-area {
          background-color: var(--light-blue-gray);
          border-bottom: 1px solid var(--border-gray);
          padding: 40px 60px;
        }

        .checkout-header-container {
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

        .checkout-main-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 400;
          line-height: 1.2;
          color: var(--header-dark);
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .checkout-subtitle {
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

        .checkout-main-section {
          padding: 40px 60px 80px 60px;
          background-color: var(--white);
        }

        .checkout-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.65fr;
          gap: 50px;
          align-items: start;
        }

        .checkout-steps-panel {
          display: flex;
          flex-direction: column;
          gap: 35px;
        }

        .step-group {
          border: 1px solid var(--border-gray);
          border-radius: 8px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          background-color: var(--white);
        }

        .step-header-row {
          display: flex;
          align-items: center;
          gap: 15px;
          border-bottom: 1px solid var(--border-gray);
          padding-bottom: 15px;
        }

        .step-number-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .step-header-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--header-dark);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Delivery Address styling */
        .delivery-address-card {
          background-color: #fafbfc;
          border: 1px solid var(--border-gray);
          border-radius: 6px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .delivery-card-left {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .delivery-radio-input {
          margin-top: 4px;
          cursor: pointer;
        }

        .delivery-info-block {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .delivery-recipient-row {
          font-size: 14px;
          font-weight: 700;
          color: var(--header-dark);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .delivery-default-badge {
          font-size: 9px;
          font-weight: 700;
          color: white;
          padding: 1px 6px;
          border-radius: 10px;
        }

        .delivery-address-text {
          font-size: 13px;
          color: var(--text-gray);
          line-height: 1.5;
        }

        .delivery-phone {
          font-size: 12px;
          font-weight: 600;
          color: var(--header-dark);
        }

        .delivery-edit-btn {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-gray);
          text-decoration: none;
          text-transform: uppercase;
          transition: var(--transition);
        }

        .delivery-edit-btn:hover {
          color: var(--header-dark);
        }

        /* Shipping Methods */
        .shipping-methods-wrapper {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .shipping-method-option {
          border: 1px solid var(--border-gray);
          border-radius: 6px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: var(--transition);
          background-color: #fafbfc;
        }

        .shipping-left {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .shipping-info-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .shipping-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--header-dark);
        }

        .shipping-desc {
          font-size: 11px;
          color: var(--text-gray);
        }

        .shipping-cost {
          font-size: 14px;
          font-weight: 700;
          color: var(--header-dark);
        }

        /* Payment methods */
        .payment-accordions-wrapper {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .payment-option-row {
          border: 1px solid var(--border-gray);
          border-radius: 6px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: var(--transition);
          background-color: #fafbfc;
        }

        .payment-left {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .payment-detail-box {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .payment-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--header-dark);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .payment-desc {
          font-size: 11px;
          color: var(--text-gray);
        }

        .payment-chevron {
          font-size: 12px;
          color: var(--text-gray);
        }

        /* Review Item Card */
        .review-item-card {
          border: 1px solid var(--border-gray);
          border-radius: 6px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .review-item-left {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .review-item-media {
          width: 60px;
          height: 60px;
          border-radius: 4px;
          border: 1px solid var(--border-gray);
          overflow: hidden;
          background-color: var(--light-blue-gray);
        }

        .review-item-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .review-item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .review-prod-title {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 600;
          color: var(--header-dark);
        }

        .review-prod-meta {
          font-size: 11px;
          color: var(--text-gray);
        }

        .review-prod-specs {
          font-size: 11px;
          font-weight: 600;
          color: var(--header-dark);
        }

        .review-item-price {
          font-size: 14px;
          font-weight: 700;
          color: var(--header-dark);
        }

        /* Security encryption banner */
        .security-encryption-banner {
          background-color: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 6px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 15px;
        }

        .security-banner-icon {
          font-size: 20px;
        }

        .security-banner-info {
          display: flex;
          flex-direction: column;
        }

        .security-banner-title {
          font-size: 12px;
          font-weight: 700;
          color: #1e3a8a;
        }

        .security-banner-desc {
          font-size: 11px;
          color: #1d4ed8;
        }

        /* Summary panel styling */
        .checkout-right-panel {
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

        .summary-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-gray);
          padding-bottom: 15px;
          margin-bottom: 5px;
        }

        .summary-title {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 500;
          color: var(--header-dark);
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
          .checkout-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .checkout-right-panel {
            position: relative;
            top: 0;
          }
        }

        @media (max-width: 768px) {
          .checkout-header-area {
            padding: 30px 20px;
          }
          .checkout-header-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .checkout-main-section {
            padding: 40px 20px;
          }
          .step-group {
            padding: 20px;
          }
          .delivery-address-card {
            flex-direction: column;
            gap: 15px;
          }
          .delivery-edit-btn {
            width: 100%;
            text-align: right;
          }
          .review-item-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .review-item-price {
            width: 100%;
            text-align: right;
            border-top: 1px solid var(--border-gray);
            padding-top: 10px;
          }
          .security-encryption-banner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}} />
    </>
  );
}
