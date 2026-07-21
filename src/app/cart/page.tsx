"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp, CartItem } from "@/context/AppContext";

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

  const handleMoveToWishlist = (item: CartItem) => {
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
      <main className="cart-page">
        <div className="document-container">
          <header className="document-header">
            <div className="breadcrumbs">
              <Link href="/">Home</Link> &mdash; <span>Your Cart</span>
            </div>
            <h1 className="document-title">My Cart ({totalCount})</h1>
          </header>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <Link href="/shop" className="btn-primary">Continue Shopping</Link>
            </div>
          ) : (
            <div className="document-flow">
              <div className="cart-items-list">
                {cart.map((item) => (
                  <article className="cart-item-row" key={`${item.id}-${item.metal}-${item.size}`}>
                    <div className="cart-item-media">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-meta">{item.metal} {item.size ? `| Size: ${item.size}` : ""}</p>
                      <div className="item-actions">
                        <button onClick={() => handleMoveToWishlist(item)}>Move to Wishlist</button>
                        <button onClick={() => removeFromCart(item.id, item.metal, item.size)}>Remove</button>
                      </div>
                    </div>
                    <div className="cart-item-controls">
                      <div className="qty-selector">
                        <button onClick={() => updateCartQuantity(item.id, item.metal, item.size, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, item.metal, item.size, item.quantity + 1)}>+</button>
                      </div>
                      <span className="item-price">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </article>
                ))}
              </div>

              <div className="summary-section">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                {discountPercent > 0 && (
                  <div className="summary-row discount-row">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>${finalTotal.toLocaleString()}</span>
                </div>

                <form className="promo-form" onSubmit={applyPromo}>
                  <input 
                    type="text" 
                    placeholder="Promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button type="submit">Apply</button>
                </form>
                {promoError && <p className="promo-msg error">{promoError}</p>}
                {promoSuccess && <p className="promo-msg success">{promoSuccess}</p>}

                <div className="checkout-action">
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      if (discountPercent > 0) {
                        localStorage.setItem("rithika_applied_discount", JSON.stringify(discountPercent));
                      } else {
                        localStorage.removeItem("rithika_applied_discount");
                      }
                      router.push("/checkout");
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .cart-page {
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

        .empty-cart {
          text-align: center;
          padding: 80px 0;
        }

        .empty-cart p {
          margin-bottom: 30px;
          color: rgba(18,39,66,0.6);
        }

        .document-flow {
          display: flex;
          flex-direction: column;
        }

        .cart-item-row {
          display: flex;
          gap: 30px;
          padding: 30px 0;
          border-bottom: 1px solid rgba(18,39,66,0.1);
        }

        .cart-item-media {
          width: 100px;
          height: 100px;
          background-color: #EBE3DC;
        }

        .cart-item-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .item-name {
          font-family: var(--font-serif, serif);
          font-size: 18px;
          font-weight: 400;
          margin-bottom: 8px;
        }

        .item-meta {
          font-size: 12px;
          color: rgba(18,39,66,0.6);
          margin-bottom: 16px;
        }

        .item-actions {
          display: flex;
          gap: 20px;
        }

        .item-actions button {
          background: none;
          border: none;
          padding: 0;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(18,39,66,0.6);
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .item-actions button:hover {
          color: #122742;
        }

        .cart-item-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          padding: 10px 0;
        }

        .qty-selector {
          display: flex;
          align-items: center;
          gap: 15px;
          border: 1px solid rgba(18,39,66,0.2);
          padding: 5px 10px;
        }

        .qty-selector button {
          background: none;
          border: none;
          cursor: pointer;
          color: #122742;
          font-size: 14px;
        }

        .qty-selector span {
          font-size: 12px;
          min-width: 20px;
          text-align: center;
        }

        .item-price {
          font-size: 16px;
          font-weight: 400;
        }

        .summary-section {
          margin-top: 40px;
          padding-top: 20px;
          width: 100%;
          max-width: 400px;
          align-self: flex-end;
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

        .promo-form {
          display: flex;
          gap: 10px;
          margin-top: 30px;
          margin-bottom: 10px;
        }

        .promo-form input {
          flex: 1;
          border: 1px solid rgba(18,39,66,0.2);
          padding: 12px;
          font-size: 12px;
          outline: none;
          background: transparent;
          color: #122742;
        }

        .promo-form button {
          background-color: #EBE3DC;
          color: #122742;
          border: none;
          padding: 0 20px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
        }

        .promo-msg {
          font-size: 11px;
          margin-bottom: 20px;
        }

        .promo-msg.error { color: #d9534f; }
        .promo-msg.success { color: #C9A680; }

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
          .cart-item-row {
            flex-direction: column;
            gap: 20px;
          }
          .cart-item-controls {
            flex-direction: row;
            align-items: center;
          }
          .summary-section {
            max-width: 100%;
          }
        }
      `}} />
    </>
  );
}
