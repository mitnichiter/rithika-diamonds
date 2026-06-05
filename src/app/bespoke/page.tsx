"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function BespokePage() {
  const { submitBespokeRequest } = useApp();

  // Form States
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [jewelleryType, setJewelleryType] = useState("");
  const [metal, setMetal] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [assignedId, setAssignedId] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullname && email && jewelleryType && metal) {
      // Submit custom bespoke request to global state!
      submitBespokeRequest({
        metal: metal,
        stone: "Natural Diamonds", // default
        carat: "1.0 - 2.0 Ct (Custom)", // default
        details: `Type: ${jewelleryType}. Budget: ${budget}. Brief: ${details}. Reference file: ${uploadedFileName || "None"}`
      });

      const randomId = `BS-${Math.floor(100000 + Math.random() * 900000)}`;
      setAssignedId(randomId);
      setSubmitted(true);

      // Reset
      setFullName("");
      setPhone("");
      setEmail("");
      setJewelleryType("");
      setMetal("");
      setBudget("");
      setDetails("");
      setUploadedFileName("");
      
      // Auto scroll to top of form or alert
      const formEl = document.getElementById("create-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <main>
        {/* ==========================================
             3. CUSTOM DESIGN HERO BANNER
             ========================================== */}
        <section className="hero-section">
          <div className="hero-left">
            <div className="hero-content">
              <span className="hero-tag" style={{ color: "var(--accent-blue)" }}>Custom Design</span>
              <h1 className="hero-title">Design Your Dream Diamond Jewellery</h1>
              <p className="hero-description">Your vision, our craftsmanship. Exclusively yours.</p>
              <a href="#create-form" className="hero-btn">Start Your Custom Design <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
          </div>
          <div className="hero-right"></div>
        </section>

        {/* ==========================================
             4. HOW IT WORKS SECTION
             ========================================== */}
        <section className="how-works-section">
          <div className="section-header">
            <h2>How It Works</h2>
            <div className="separator">
              <span className="separator-line"></span>
              <span className="diamond-bullet" style={{ color: "var(--accent-blue)" }}>◆</span>
              <span className="separator-line"></span>
            </div>
          </div>

          <div className="steps-wrapper">
            
            {/* Step 1 */}
            <div className="step-item">
              <div className="step-icon-wrap">
                <i className="fa-regular fa-comments step-svg" style={{ color: "var(--accent-blue)" }}></i>
              </div>
              <div className="step-number" style={{ border: "1px solid var(--accent-blue)" }}>1</div>
              <h3 className="step-title">Share Your Idea</h3>
              <p className="step-desc">Tell us your inspiration, requirements &amp; budget.</p>
            </div>

            <div className="step-connector">
              <div className="connector-line"></div>
            </div>

            {/* Step 2 */}
            <div className="step-item">
              <div className="step-icon-wrap">
                <svg className="step-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="14" r="6" stroke="var(--accent-blue)" strokeWidth="1.2" />
                  <circle cx="12" cy="14" r="8.5" stroke="var(--accent-blue)" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.4" />
                  <path d="M12 8 L9 5 L15 5 Z" stroke="var(--accent-blue)" strokeWidth="1" strokeLinejoin="round" />
                  <path d="M9 5 L10 2 L14 2 L15 5 Z" stroke="var(--accent-blue)" strokeWidth="1" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="step-number">2</div>
              <h3 className="step-title">Design &amp; Preview</h3>
              <p className="step-desc">Our experts create 3D designs for your approval.</p>
            </div>

            <div className="step-connector">
              <div className="connector-line"></div>
            </div>

            {/* Step 3 */}
            <div className="step-item">
              <div className="step-icon-wrap">
                <i className="fa-solid fa-compass-drafting step-svg" style={{ color: "var(--accent-blue)" }}></i>
              </div>
              <div className="step-number">3</div>
              <h3 className="step-title">Crafting Process</h3>
              <p className="step-desc">We handcraft your jewellery with precision &amp; care.</p>
            </div>

            <div className="step-connector">
              <div className="connector-line"></div>
            </div>

            {/* Step 4 */}
            <div className="step-item">
              <div className="step-icon-wrap">
                <i className="fa-solid fa-box-open step-svg" style={{ color: "var(--accent-blue)" }}></i>
              </div>
              <div className="step-number">4</div>
              <h3 className="step-title">Delivery</h3>
              <p className="step-desc">Your masterpiece is delivered safely to your doorstep.</p>
            </div>

          </div>
        </section>

        {/* ==========================================
             5. REQUEST FORM CONTAINER SECTION
             ========================================== */}
        <section className="request-form-section" id="create-form">
          <div className="section-header">
            <h2>Let's Create Something Unique</h2>
            <p className="questions-subtitle" style={{ textAlign: "center", marginTop: "5px" }}>Fill in your details and our design experts will get in touch with you.</p>
          </div>

          <div className="form-container">
            {submitted ? (
              <div style={{
                padding: "40px",
                textAlign: "center",
                color: "#1e3a8a",
                backgroundColor: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "6px"
              }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: "48px", color: "var(--accent-blue)", marginBottom: "20px" }}></i>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontWeight: 500, marginBottom: "12px" }}>Bespoke Request Submitted</h3>
                <p style={{ fontSize: "15px", lineHeight: "1.6", maxWidth: "600px", margin: "0 auto 20px auto", color: "var(--text-gray)" }}>
                  Thank you! Your custom jewellery request has been logged successfully as reference <strong style={{ color: "var(--header-dark)" }}>#{assignedId}</strong>. One of our master jewellery designers will review your brief and contact you within 24 hours to schedule a styling consultation.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  style={{
                    backgroundColor: "var(--accent-blue)",
                    color: "white",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    cursor: "pointer"
                  }}
                >
                  Create Another Design
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  
                  {/* Column 1: Personal Details */}
                  <div className="form-column">
                    <h3 className="column-title" style={{ borderLeft: "2px solid var(--accent-blue)" }}>1. Your Details</h3>
                    
                    <div className="input-group">
                      <label className="input-label" htmlFor="full-name">Full Name</label>
                      <input 
                        type="text" 
                        id="full-name" 
                        className="form-input" 
                        placeholder="Enter your full name" 
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                        required 
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label" htmlFor="phone-number">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone-number" 
                        className="form-input" 
                        placeholder="Enter your phone number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required 
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label" htmlFor="email-address">Email Address</label>
                      <input 
                        type="email" 
                        id="email-address" 
                        className="form-input" 
                        placeholder="Enter your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  {/* Column 2: Design Specs */}
                  <div className="form-column">
                    <h3 className="column-title" style={{ borderLeft: "2px solid var(--accent-blue)" }}>2. Design Information</h3>
                    
                    <div className="input-group">
                      <label className="input-label" htmlFor="jewellery-type">Type of Jewellery</label>
                      <select 
                        id="jewellery-type" 
                        className="form-select" 
                        value={jewelleryType}
                        onChange={(e) => setJewelleryType(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select type</option>
                        <option value="Engagement Ring">Engagement Ring</option>
                        <option value="Diamond Necklace">Diamond Necklace</option>
                        <option value="Bespoke Earrings">Bespoke Earrings</option>
                        <option value="Bracelet/Bangle">Bracelet/Bangle</option>
                        <option value="Other Spec">Other Spec</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label className="input-label" htmlFor="metal-preference">Metal Preference</label>
                      <select 
                        id="metal-preference" 
                        className="form-select" 
                        value={metal}
                        onChange={(e) => setMetal(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select metal</option>
                        <option value="18K White Gold">18K White Gold</option>
                        <option value="18K Yellow Gold">18K Yellow Gold</option>
                        <option value="18K Rose Gold">18K Rose Gold</option>
                        <option value="Platinum">Platinum</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label className="input-label" htmlFor="budget-range">Budget Range</label>
                      <select 
                        id="budget-range" 
                        className="form-select" 
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select budget range</option>
                        <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                        <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Column 3: Upload & Design Brief */}
                  <div className="form-column">
                    <h3 className="column-title" style={{ borderLeft: "2px solid var(--accent-blue)" }}>3. Share Your Inspiration</h3>
                    
                    <div className="input-group">
                      <label className="input-label">Upload Reference Images (Optional)</label>
                      <div className="upload-drag-area" style={{ position: "relative" }}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: 0,
                            cursor: "pointer",
                            zIndex: 5
                          }}
                        />
                        <i className="fa-solid fa-cloud-arrow-up upload-icon" style={{ color: "var(--accent-blue)" }}></i>
                        {uploadedFileName ? (
                          <p className="upload-text" style={{ fontWeight: 600, color: "var(--header-dark)" }}>
                            Selected File:<br />
                            <span style={{ fontSize: "11px", color: "var(--accent-blue)" }}>{uploadedFileName}</span>
                          </p>
                        ) : (
                          <p className="upload-text">Click to upload reference image<br /><span>PNG, JPG up to 5MB</span></p>
                        )}
                      </div>
                    </div>

                    <div className="input-group">
                      <label className="input-label" htmlFor="design-brief">Design Brief</label>
                      <div className="textarea-wrapper">
                        <textarea 
                          id="design-brief" 
                          className="form-textarea" 
                          rows={4} 
                          placeholder="Tell us more about your custom design wishes..." 
                          maxLength={500}
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                        ></textarea>
                        <span className="char-counter">{details.length}/500</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="form-action-footer">
                  <button type="submit" className="form-submit-btn" style={{ backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" }}>Submit Request <i className="fa-solid fa-arrow-right-long"></i></button>
                  <span className="form-privacy-note"><i className="fa-solid fa-shield-halved" style={{ color: "var(--accent-blue)" }}></i> Your information is safe with us and will never be shared.</span>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ==========================================
             6. "WHY CHOOSE CUSTOM DESIGN?"
             ========================================== */}
        <section className="why-custom-section">
          <div className="section-header">
            <h2>Why Choose Bespoke Custom Design?</h2>
            <div className="separator">
              <span className="separator-line"></span>
              <span className="diamond-bullet" style={{ color: "var(--accent-blue)" }}>◆</span>
              <span className="separator-line"></span>
            </div>
          </div>

          <div className="why-custom-grid">
            <div className="why-card">
              <i className="fa-solid fa-pen-fancy why-icon" style={{ color: "var(--accent-blue)" }}></i>
              <h3 className="why-title">100% Unique To You</h3>
              <p className="why-desc">No duplicate molds. Your masterpiece is custom engineered exclusively for your story.</p>
            </div>
            <div className="why-card">
              <i className="fa-solid fa-gem why-icon" style={{ color: "var(--accent-blue)" }}></i>
              <h3 className="why-title">Hand-Selected Diamonds</h3>
              <p className="why-desc">Our gemologists handpick every individual diamond for color matching, brilliance and flawless symmetry.</p>
            </div>
            <div className="why-card">
              <i className="fa-solid fa-hourglass-start why-icon" style={{ color: "var(--accent-blue)" }}></i>
              <h3 className="why-title">Artisanal Heritage</h3>
              <p className="why-desc">Meticulously modeled and hand-finished by master craftspeople with decades of high-jewellery expertise.</p>
            </div>
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Bespoke custom designer page specific styles */
        .hero-section {
          position: relative;
          background: linear-gradient(135deg, rgba(2, 11, 22, 0.95) 30%, rgba(2, 11, 22, 0.75) 60%, rgba(2, 11, 22, 0.45) 100%), 
                      url('https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80') no-repeat center center / cover;
          display: flex;
          min-height: 500px;
          height: calc(100vh - 120px);
          max-height: 700px;
          overflow: hidden;
        }

        .hero-left {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 40px 80px;
          z-index: 2;
        }

        .hero-content {
          max-width: 540px;
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
          display: inline-flex;
          align-items: center;
          gap: 8px;
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
          max-width: 440px;
          letter-spacing: 0.3px;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background-color: var(--white);
          color: var(--primary-navy);
          padding: 15px 32px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-decoration: none;
          border-radius: 4px;
          transition: var(--transition);
          border: 1px solid var(--white);
          margin-top: 15px;
        }

        .hero-btn:hover {
          background-color: transparent;
          color: var(--white);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .hero-right {
          flex: 1.1;
          background: linear-gradient(to right, rgba(2, 11, 22, 0.3) 0%, rgba(2, 11, 22, 0.45) 100%),
                      url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80') no-repeat center center / cover;
          position: relative;
          z-index: 1;
        }

        /* HOW IT WORKS SECTION */
        .how-works-section {
          padding: 80px 60px;
          background-color: var(--white);
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header h2 {
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 500;
          letter-spacing: 2px;
          color: var(--header-dark);
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .section-header .separator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .section-header .separator-line {
          height: 1px;
          width: 60px;
          background: linear-gradient(to right, transparent, var(--text-gray), transparent);
        }

        .section-header .diamond-bullet {
          font-size: 8px;
          color: var(--header-dark);
        }

        .steps-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          max-width: 1400px;
          margin: 0 auto;
        }

        .step-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 180px;
        }

        .step-icon-wrap {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          transition: var(--transition);
        }

        .step-item:hover .step-icon-wrap {
          transform: scale(1.08);
        }

        .step-svg {
          font-size: 32px;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.05));
        }

        .step-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: var(--light-blue-gray);
          border: 1px solid var(--border-gray);
          color: var(--header-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 18px;
          transition: var(--transition);
        }

        .step-item:hover .step-number {
          background-color: var(--accent-blue) !important;
          border-color: var(--accent-blue) !important;
          color: var(--white) !important;
        }

        .step-title {
          font-size: 19px;
          font-weight: 600;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
          color: var(--header-dark);
        }

        .step-desc {
          font-size: 12px;
          line-height: 1.5;
          color: var(--text-gray);
          font-weight: 300;
        }

        .step-connector {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
        }

        .connector-line {
          width: 100%;
          border-top: 1.5px dotted var(--border-gray);
          position: relative;
        }

        .connector-line::after {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent-blue);
        }

        /* REQUEST FORM SECTION */
        .request-form-section {
          background-color: var(--light-blue-gray);
          padding: 80px 60px;
          border-top: 1px solid var(--border-gray);
          border-bottom: 1px solid var(--border-gray);
        }

        .form-container {
          max-width: 1200px;
          margin: 0 auto;
          background-color: var(--white);
          border: 1px solid var(--border-gray);
          border-radius: 8px;
          padding: 50px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-bottom: 40px;
        }

        .form-column {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .column-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--header-dark);
          padding-left: 10px;
          line-height: 1;
          margin-bottom: 10px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-gray);
        }

        .form-input, .form-select, .form-textarea {
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

        .form-input::placeholder, .form-textarea::placeholder {
          color: #94a3b8;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--header-dark);
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 16px;
          padding-right: 40px;
        }

        .upload-drag-area {
          border: 1.5px dashed var(--border-gray);
          border-radius: 6px;
          padding: 30px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: var(--transition);
          background-color: #fafbfc;
        }

        .upload-drag-area:hover {
          border-color: var(--header-dark);
          background-color: #f8fafc;
        }

        .upload-icon {
          font-size: 24px;
        }

        .upload-text {
          font-size: 12px;
          color: var(--header-dark);
          line-height: 1.4;
          font-weight: 500;
        }

        .upload-text span {
          font-size: 10px;
          color: var(--text-gray);
          font-weight: 400;
        }

        .textarea-wrapper {
          position: relative;
        }

        .char-counter {
          position: absolute;
          bottom: 12px;
          right: 16px;
          font-size: 10px;
          color: var(--text-gray);
          font-weight: 500;
        }

        .form-action-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-gray);
          padding-top: 35px;
          gap: 30px;
        }

        .form-submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--white);
          border: 1px solid var(--accent-blue);
          padding: 16px 36px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
        }

        .form-submit-btn:hover {
          opacity: 0.9;
        }

        .form-privacy-note {
          font-size: 11px;
          color: var(--text-gray);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* WHY CUSTOM DESIGN SECTION */
        .why-custom-section {
          padding: 80px 60px;
          background-color: var(--white);
        }

        .why-custom-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .why-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 30px 20px;
          background-color: #fafbfc;
          border: 1px solid var(--border-gray);
          border-radius: 8px;
          transition: var(--transition);
        }

        .why-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(2, 16, 36, 0.04);
        }

        .why-icon {
          font-size: 28px;
          margin-bottom: 20px;
        }

        .why-title {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 600;
          color: var(--header-dark);
          margin-bottom: 12px;
        }

        .why-desc {
          font-size: 13px;
          color: var(--text-gray);
          line-height: 1.6;
          font-weight: 300;
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
          .how-works-section {
            padding: 60px 30px;
          }
          .steps-wrapper {
            flex-direction: column;
            gap: 30px;
            align-items: center;
          }
          .step-connector {
            display: none;
          }
          .request-form-section {
            padding: 60px 30px;
          }
          .form-container {
            padding: 30px;
          }
          .form-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .form-action-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .form-submit-btn {
            width: 100%;
            justify-content: center;
          }
          .why-custom-section {
            padding: 60px 30px;
          }
          .why-custom-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .how-works-section {
            padding: 60px 20px;
          }
          .request-form-section {
            padding: 60px 20px;
          }
          .why-custom-section {
            padding: 60px 20px;
          }
        }
      `}} />
    </>
  );
}
