"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullname && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({
        fullname: "",
        phonenumber: "",
        email: "",
        subject: "",
        message: ""
      });
      setTimeout(() => setSubmitted(false), 8000);
    }
  };

  return (
    <>
      <main>
        {/* ==========================================
             3. CONTACT US HERO SECTION
             ========================================== */}
        <section className="hero-section">
          <div className="hero-left">
            <div className="hero-content">
              <span className="hero-tag">Contact Us</span>
              <div className="hero-separator">
                <span className="line"></span>
                <span className="diamond" style={{ backgroundColor: "var(--accent-blue)" }}></span>
                <span className="line"></span>
              </div>
              <h1 className="hero-title">We'd Love to Hear from You</h1>
              <p className="hero-description">
                Have a question, need assistance, or want to create something extraordinary? Our team is here to help you every step of the way.
              </p>
            </div>
          </div>
          <div className="hero-right"></div>
        </section>

        {/* ==========================================
             4. CONTACT METHODS BANNER (White Section)
             ========================================== */}
        <section className="contact-banner-section">
          <div className="contact-grid">
            {/* Card 1: Call Us */}
            <div className="contact-card">
              <div className="contact-circle-icon" style={{ backgroundColor: "var(--accent-blue)" }}><i className="fa-solid fa-phone"></i></div>
              <h3 className="contact-card-title">Call Us</h3>
              <a href="tel:+15550192834" className="contact-card-detail">+1 (555) 019-2834</a>
              <p className="contact-card-desc">Mon - Sat: 10:00 AM - 7:00 PM (EST)</p>
            </div>
            {/* Card 2: Email Us */}
            <div className="contact-card">
              <div className="contact-circle-icon" style={{ backgroundColor: "var(--accent-blue)" }}><i className="fa-regular fa-envelope"></i></div>
              <h3 className="contact-card-title">Email Us</h3>
              <a href="mailto:concierge@rithikadiamonds.com" className="contact-card-detail">concierge@rithikadiamonds.com</a>
              <p className="contact-card-desc">We reply within 24 hours</p>
            </div>
            {/* Card 3: Visit Us */}
            <div className="contact-card">
              <div className="contact-circle-icon" style={{ backgroundColor: "var(--accent-blue)" }}><i className="fa-solid fa-location-dot"></i></div>
              <h3 className="contact-card-title">Visit Us</h3>
              <span className="contact-card-detail" style={{ fontWeight: 500 }}>730 Fifth Ave, 14th Floor<br />New York, NY 10019</span>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="contact-card-link">Get Directions <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
            {/* Card 4: WhatsApp */}
            <div className="contact-card">
              <div className="contact-circle-icon" style={{ backgroundColor: "var(--accent-blue)" }}><i className="fa-brands fa-whatsapp"></i></div>
              <h3 className="contact-card-title">Chat on WhatsApp</h3>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="contact-card-detail">+1 (555) 019-2834</a>
              <p className="contact-card-desc">Chat with our experts instantly</p>
            </div>
          </div>
        </section>

        {/* ==========================================
             5. FORMS & MAP SPLIT SECTION
             ========================================== */}
        <section className="split-body-section">
          <div className="split-body-container">
            
            {/* Left Column: Form */}
            <div className="split-left">
              <h2 className="column-main-title">Send Us a Message</h2>
              <div className="hero-separator">
                <span className="line" style={{ background: "linear-gradient(to right, var(--text-gray), transparent)" }}></span>
                <span className="diamond" style={{ color: "var(--text-gray)", backgroundColor: "var(--text-gray)" }}></span>
                <span className="line" style={{ background: "linear-gradient(to right, var(--text-gray), transparent)" }}></span>
              </div>
              <p className="questions-subtitle">Fill out the form below and our team will get back to you shortly.</p>
              
              {submitted ? (
                <div style={{
                  padding: "30px",
                  borderRadius: "6px",
                  backgroundColor: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  color: "#1e3a8a",
                  width: "100%",
                  marginTop: "10px"
                }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "10px" }}>
                    <i className="fa-solid fa-circle-check" style={{ marginRight: "10px", color: "var(--accent-blue)" }}></i>
                    Message Sent Successfully
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
                    Thank you for reaching out to Rithika Diamonds. Your message has been routed to our expert concierge. We will contact you at your preferred email address within 24 hours.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-grid-fields">
                    <div className="form-field-group">
                      <label className="form-field-label" htmlFor="fullname">Full Name *</label>
                      <input
                        type="text"
                        id="fullname"
                        className="form-input-field"
                        placeholder="Enter your full name"
                        value={formData.fullname}
                        onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="form-field-label" htmlFor="phonenumber">Phone Number *</label>
                      <input
                        type="tel"
                        id="phonenumber"
                        className="form-input-field"
                        placeholder="Enter your phone number"
                        value={formData.phonenumber}
                        onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="form-field-label" htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        className="form-input-field"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="form-field-label" htmlFor="subject">Subject *</label>
                      <select
                        id="subject"
                        className="form-select-field"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="custom">Custom Jewelry Consultation</option>
                        <option value="order">Order Tracking / Support</option>
                      </select>
                    </div>
                    <div className="form-field-group full-width">
                      <label className="form-field-label" htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        className="form-textarea-field"
                        rows={5}
                        placeholder="Type your message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-action-row">
                    <button type="submit" className="form-submit-btn" style={{ backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" }}>
                      Send Message <i className="fa-solid fa-arrow-right-long" style={{ marginLeft: "8px" }}></i>
                    </button>
                    <span className="form-privacy-disclaimer">
                      <i className="fa-solid fa-shield-halved" style={{ color: "var(--accent-blue)", marginRight: "8px" }}></i> 
                      Your information is safe with us and will never be shared.
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Maps & Showroom Promo */}
            <div className="split-right">
              <h2 className="column-main-title">Our Location</h2>
              <div className="hero-separator">
                <span className="line" style={{ background: "linear-gradient(to right, var(--text-gray), transparent)" }}></span>
                <span className="diamond" style={{ color: "var(--text-gray)", backgroundColor: "var(--text-gray)" }}></span>
                <span className="line" style={{ background: "linear-gradient(to right, var(--text-gray), transparent)" }}></span>
              </div>
              
              {/* Interactive Google Map Frame */}
              <div className="map-frame-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1837920361665!2d-73.9749174!3d40.7614327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f000000001%3A0x7d87d46efb702ec9!2s730%205th%20Ave%2C%20New%20York%2C%20NY%2010019!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  className="map-iframe"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Walk-ins Promo Block */}
              <div className="appointment-promo-card">
                <div className="appointment-card-left">
                  <i className="fa-solid fa-store appointment-card-icon" style={{ color: "var(--accent-blue)" }}></i>
                  <div className="appointment-card-info">
                    <span className="appointment-card-title">Visit Our Showroom</span>
                    <p className="appointment-card-desc">Experience our exquisite collections in person. Walk-ins are welcome!</p>
                  </div>
                </div>
                <Link href="/contact" className="appointment-book-btn">
                  Book Appointment <i className="fa-solid fa-calendar-check" style={{ marginLeft: "8px", color: "var(--accent-blue)" }}></i>
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* ==========================================
             6. "NEED HELP CHOOSING?" BANNER SECTION
             ========================================== */}
        <section className="help-banner-section">
          <div className="help-banner-container">
            <h2 className="help-banner-title">Need Help Choosing?</h2>
            <p className="help-banner-subtitle">Our diamond experts are here to guide you in finding the perfect piece for your special moments.</p>
            <Link href="https://wa.me/1234567890" target="_blank" className="help-banner-btn" style={{ backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" }}>
              Talk To Our Experts <i className="fa-solid fa-headset" style={{ marginLeft: "5px" }}></i>
            </Link>
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Contact page specific styles */
        .hero-section {
          position: relative;
          background: linear-gradient(135deg, rgba(2, 11, 22, 0.95) 30%, rgba(2, 11, 22, 0.75) 60%, rgba(2, 11, 22, 0.45) 100%), 
                      url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80') no-repeat center center / cover;
          display: flex;
          min-height: 420px;
          height: calc(100vh - 120px);
          max-height: 520px;
          overflow: hidden;
        }

        .hero-left {
          flex: 1.2;
          display: flex;
          align-items: center;
          padding: 40px 80px;
          z-index: 2;
        }

        .hero-content {
          max-width: 580px;
          width: 100%;
          color: var(--white);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }

        .hero-tag {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--white);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .hero-separator {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .hero-separator .line {
          height: 1px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.35), transparent);
          width: 80px;
        }

        .hero-separator .diamond {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: 46px;
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: 0.5px;
        }

        .hero-description {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.3px;
        }

        .hero-right {
          flex: 1;
          background: linear-gradient(to right, rgba(2, 11, 22, 0.3) 0%, rgba(2, 11, 22, 0.45) 100%),
                      url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80') no-repeat center center / cover;
          position: relative;
          z-index: 1;
        }

        /* CONTACT METHODS BANNER */
        .contact-banner-section {
          background-color: var(--white);
          border-top: 1px solid var(--border-gray);
          border-bottom: 1px solid var(--border-gray);
          padding: 60px 40px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1400px;
          margin: 0 auto;
        }

        .contact-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 20px;
          position: relative;
        }

        .contact-card:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 15%;
          height: 70%;
          width: 1px;
          background-color: var(--border-gray);
        }

        .contact-circle-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          margin-bottom: 18px;
        }

        .contact-card-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--header-dark);
          margin-bottom: 10px;
        }

        .contact-card-detail {
          font-size: 14px;
          font-weight: 600;
          color: var(--header-dark);
          margin-bottom: 8px;
          text-decoration: none;
          line-height: 1.4;
        }

        .contact-card-desc {
          font-size: 11px;
          color: var(--text-gray);
          line-height: 1.5;
          max-width: 210px;
          font-weight: 400;
        }

        .contact-card-link {
          font-size: 11px;
          font-weight: 700;
          color: var(--header-dark);
          text-decoration: none;
          margin-top: 5px;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .contact-card-link:hover {
          color: var(--text-gray);
        }

        /* FORMS & MAP SPLIT SECTION */
        .split-body-section {
          padding: 80px 60px;
          background-color: var(--white);
        }

        .split-body-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
        }

        .split-left, .split-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
          width: 100%;
        }

        .column-main-title {
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 500;
          color: var(--header-dark);
          letter-spacing: 0.5px;
        }

        .questions-subtitle {
          font-size: 14px;
          color: var(--text-gray);
          font-weight: 300;
          margin-bottom: 10px;
        }

        .contact-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-grid-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          width: 100%;
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-field-group.full-width {
          grid-column: span 2;
        }

        .form-field-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-gray);
        }

        .form-input-field, .form-select-field, .form-textarea-field {
          width: 100%;
          border: 1px solid var(--border-gray);
          background-color: var(--white);
          padding: 12px 16px;
          border-radius: 4px;
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--header-dark);
          outline: none;
          transition: var(--transition);
        }

        .form-input-field::placeholder, .form-textarea-field::placeholder {
          color: #94a3b8;
        }

        .form-input-field:focus, .form-select-field:focus, .form-textarea-field:focus {
          border-color: var(--header-dark);
        }

        .form-select-field {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 16px;
          padding-right: 40px;
        }

        .form-action-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
          width: 100%;
          margin-top: 5px;
        }

        .form-submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--white);
          padding: 15px 36px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
          border: 1px solid var(--accent-blue);
        }

        .form-submit-btn:hover {
          opacity: 0.9;
        }

        .form-privacy-disclaimer {
          font-size: 11px;
          color: var(--text-gray);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Location Column styling */
        .map-frame-wrapper {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--border-gray);
        }

        .map-iframe {
          display: block;
          width: 100%;
        }

        .appointment-promo-card {
          width: 100%;
          background-color: var(--light-blue-gray);
          border: 1px solid var(--border-gray);
          border-radius: 8px;
          padding: 24px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .appointment-card-left {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .appointment-card-icon {
          font-size: 24px;
          margin-top: 3px;
        }

        .appointment-card-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .appointment-card-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--header-dark);
        }

        .appointment-card-desc {
          font-size: 12px;
          color: var(--text-gray);
          line-height: 1.5;
        }

        .appointment-book-btn {
          background-color: var(--white);
          color: var(--header-dark);
          border: 1px solid var(--border-gray);
          padding: 12px 24px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: var(--transition);
          white-space: nowrap;
        }

        .appointment-book-btn:hover {
          background-color: var(--header-dark);
          color: var(--white);
          border-color: var(--header-dark);
        }

        /* HELP CHOOSING BANNER */
        .help-banner-section {
          position: relative;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.1) 100%), 
                      url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80') center center / cover;
          padding: 80px 60px;
          border-top: 1px solid var(--border-gray);
          border-bottom: 1px solid var(--border-gray);
        }

        .help-banner-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }

        .help-banner-title {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 500;
          color: var(--header-dark);
        }

        .help-banner-subtitle {
          font-size: 14px;
          color: var(--text-gray);
          font-weight: 300;
          margin-bottom: 15px;
        }

        .help-banner-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--white);
          padding: 14px 28px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-decoration: none;
          border-radius: 4px;
          transition: var(--transition);
          border: 1px solid var(--accent-blue);
        }

        .help-banner-btn:hover {
          background-color: transparent !important;
          color: var(--accent-blue);
        }

        .help-banner-btn i {
          font-size: 13px;
        }

        /* Responsiveness */
        @media (max-width: 1024px) {
          .hero-section {
            flex-direction: column;
            min-height: auto;
            max-height: none;
            height: auto;
          }
          .hero-left {
            padding: 60px 40px;
          }
          .hero-right {
            height: 350px;
          }
          .contact-banner-section {
            padding: 40px 20px;
          }
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
          .contact-card:nth-child(2)::after {
            display: none;
          }
          .split-body-section {
            padding: 60px 30px;
          }
          .split-body-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .appointment-promo-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .appointment-book-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .contact-card::after {
            display: none !important;
          }
          .contact-card {
            border-bottom: 1px solid var(--border-gray);
            padding-bottom: 30px;
          }
          .contact-card:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .split-body-section {
            padding: 40px 20px;
          }
          .form-grid-fields {
            grid-template-columns: 1fr;
          }
          .form-field-group.full-width {
            grid-column: span 1;
          }
          .help-banner-section {
            padding: 60px 20px;
          }
          .help-banner-title {
            font-size: 26px;
          }
        }
      `}} />
    </>
  );
}
