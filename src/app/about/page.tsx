"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <main>
        {/* ==========================================
             3. ABOUT US HERO SECTION
             ========================================== */}
        <section className="hero-section">
          <div className="hero-left">
            <div className="hero-content">
              <span className="hero-tag">About Us</span>
              <div className="hero-separator">
                <span className="line"></span>
                <span className="diamond" style={{ backgroundColor: "var(--accent-blue)" }}></span>
                <span className="line"></span>
              </div>
              <h1 className="hero-title">Crafting Brilliance.<br />Creating Memories.</h1>
              <p className="hero-description">
                At Rithika Diamonds, we don't just create jewellery, we craft emotions that last forever. With in-house manufacturing and a passion for perfection, we bring your dreams to life in every sparkle.
              </p>
            </div>
          </div>
          <div className="hero-right"></div>
        </section>

        {/* ==========================================
             4. "OUR STORY" SECTION
             ========================================== */}
        <section className="our-story-section">
          <div className="story-container">
            <div className="story-left">
              <span className="hero-tag" style={{ color: "var(--header-dark)" }}>Our Story</span>
              <div className="hero-separator">
                <span className="line" style={{ background: "linear-gradient(to right, var(--text-gray), transparent)" }}></span>
                <span className="diamond" style={{ color: "var(--text-gray)", backgroundColor: "var(--text-gray)" }}></span>
                <span className="line" style={{ background: "linear-gradient(to right, var(--text-gray), transparent)" }}></span>
              </div>
              <h2 className="story-title">A Legacy of Trust and Excellence</h2>
              <p className="story-desc">
                Rithika Diamonds was founded with a simple belief - that every individual deserves jewellery that is as unique as their story.
              </p>
              <p className="story-desc">
                From a small beginning to a trusted name in diamond jewellery, our journey is built on trust, transparency, and unparalleled craftsmanship.
              </p>
              <Link href="/collections" className="story-btn" style={{ backgroundColor: "var(--accent-blue)", borderColor: "var(--accent-blue)" }}>
                Our Journey <i className="fa-solid fa-arrow-right-long" style={{ marginLeft: "8px" }}></i>
              </Link>
            </div>
            <div className="story-right"></div>
          </div>
        </section>

        {/* ==========================================
             5. STATS / METRIC BANNER (White Section)
             ========================================== */}
        <section className="stats-banner-section">
          <div className="stats-grid">
            {/* Stat Card 1 */}
            <div className="stat-card">
              <div className="stat-icon" style={{ color: "var(--accent-blue)" }}><i className="fa-solid fa-award"></i></div>
              <span className="stat-value">10+</span>
              <span className="stat-title">Years of Excellence</span>
              <p className="stat-desc">A decade of brilliance, built on trust and quality.</p>
            </div>
            {/* Stat Card 2 */}
            <div className="stat-card">
              <div className="stat-icon" style={{ color: "var(--accent-blue)" }}><i className="fa-solid fa-industry"></i></div>
              <span className="stat-value">100%</span>
              <span className="stat-title">In-house Manufacturing</span>
              <p className="stat-desc">Every piece is crafted with precision and care.</p>
            </div>
            {/* Stat Card 3 */}
            <div className="stat-card">
              <div className="stat-icon" style={{ color: "var(--accent-blue)" }}><i className="fa-regular fa-gem"></i></div>
              <span className="stat-value">100%</span>
              <span className="stat-title">Certified Diamonds</span>
              <p className="stat-desc">Authentic, ethically sourced and BIS/IGI certified.</p>
            </div>
            {/* Stat Card 4 */}
            <div className="stat-card">
              <div className="stat-icon" style={{ color: "var(--accent-blue)" }}><i className="fa-solid fa-users"></i></div>
              <span className="stat-value">20K+</span>
              <span className="stat-title">Happy Customers</span>
              <p className="stat-desc">Thousands of smiles, countless memories.</p>
            </div>
          </div>
        </section>

        {/* ==========================================
             6. "OUR CRAFTSMANSHIP" SECTION (Navy Section)
             ========================================== */}
        <section className="craftsmanship-section">
          <div className="craft-container">
            <div className="craft-left">
              <span className="hero-tag">Our Craftsmanship</span>
              <div className="hero-separator">
                <span className="line"></span>
                <span className="diamond" style={{ backgroundColor: "var(--accent-blue)" }}></span>
                <span className="line"></span>
              </div>
              <h2 className="craft-title">Where Precision Meets Perfection</h2>
              <p className="craft-desc">
                Our skilled artisans and advanced technology work together to ensure every jewel is a masterpiece that reflects elegance, strength and timeless beauty.
              </p>
              <Link href="/bespoke" className="craft-btn">
                See Our Process <i className="fa-solid fa-arrow-right-long" style={{ marginLeft: "8px" }}></i>
              </Link>
            </div>

            <div className="craft-right">
              {/* Horizontal dotted timeline connector line */}
              <div className="connecting-line"></div>

              <div className="craft-steps-grid">
                {/* Step 1: Design */}
                <div className="craft-step-card">
                  <div className="step-img-box">
                    <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80" alt="Design stage" className="step-img" />
                    <div className="step-badge" style={{ backgroundColor: "var(--accent-light)" }}><i className="fa-solid fa-pencil"></i></div>
                  </div>
                  <div className="step-info">
                    <h3 className="step-title-name">Design</h3>
                    <p className="step-desc-text">Conceptualizing your dream with creativity and detail.</p>
                  </div>
                </div>
                {/* Step 2: Craft */}
                <div className="craft-step-card">
                  <div className="step-img-box">
                    <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80" alt="Crafting stage" className="step-img" />
                    <div className="step-badge" style={{ backgroundColor: "var(--accent-light)" }}><i className="fa-solid fa-fire-burner"></i></div>
                  </div>
                  <div className="step-info">
                    <h3 className="step-title-name">Craft</h3>
                    <p className="step-desc-text">Expert artisans bring the design to life.</p>
                  </div>
                </div>
                {/* Step 3: Perfection */}
                <div className="craft-step-card">
                  <div className="step-img-box">
                    <img src="https://images.unsplash.com/photo-1502741224143-90386d7c8c82?auto=format&fit=crop&w=400&q=80" alt="Perfection checks" className="step-img" />
                    <div className="step-badge" style={{ backgroundColor: "var(--accent-light)" }}><i className="fa-solid fa-magnifying-glass"></i></div>
                  </div>
                  <div className="step-info">
                    <h3 className="step-title-name">Perfection</h3>
                    <p className="step-desc-text">Every piece is checked for quality and brilliance.</p>
                  </div>
                </div>
                {/* Step 4: Delivery */}
                <div className="craft-step-card">
                  <div className="step-img-box">
                    <img src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=400&q=80" alt="Final delivery packaging" className="step-img" />
                    <div className="step-badge" style={{ backgroundColor: "var(--accent-light)" }}><i className="fa-solid fa-box"></i></div>
                  </div>
                  <div className="step-info">
                    <h3 className="step-title-name">Delivery</h3>
                    <p className="step-desc-text">Delivered to you with care, safely and securely.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
             7. "WHY CHOOSE RITHIKA DIAMONDS" SECTION
             ========================================== */}
        <section className="why-choose-section">
          <div className="section-header">
            <h2>Why Choose Rithika Diamonds?</h2>
            <div className="separator">
              <span className="separator-line"></span>
              <span className="diamond-bullet" style={{ color: "var(--accent-blue)" }}>◆</span>
              <span className="separator-line"></span>
            </div>
          </div>

          <div className="why-choose-grid">
            {/* Item 1 */}
            <div className="choose-card">
              <i className="fa-solid fa-industry choose-icon" style={{ color: "var(--accent-blue)" }}></i>
              <h3 className="choose-title">In-house Manufacturing</h3>
              <p className="choose-desc">Complete control over quality and craftsmanship.</p>
            </div>
            {/* Item 2 */}
            <div className="choose-card">
              <i className="fa-solid fa-pencil choose-icon" style={{ color: "var(--accent-blue)" }}></i>
              <h3 className="choose-title">Custom Designs</h3>
              <p className="choose-desc">Your ideas, our expertise - exclusively yours.</p>
            </div>
            {/* Item 3 */}
            <div className="choose-card">
              <i className="fa-regular fa-gem choose-icon" style={{ color: "var(--accent-blue)" }}></i>
              <h3 className="choose-title">Certified Diamonds</h3>
              <p className="choose-desc">IGI/BIS certified diamonds with authenticity.</p>
            </div>
            {/* Item 4 */}
            <div className="choose-card">
              <i className="fa-solid fa-award choose-icon" style={{ color: "var(--accent-blue)" }}></i>
              <h3 className="choose-title">Premium Craftsmanship</h3>
              <p className="choose-desc">Finest artisanship for timeless elegance.</p>
            </div>
            {/* Item 5 */}
            <div className="choose-card">
              <i className="fa-solid fa-shield-halved choose-icon" style={{ color: "var(--accent-blue)" }}></i>
              <h3 className="choose-title">Trust & Transparency</h3>
              <p className="choose-desc">Honest pricing and clear communication.</p>
            </div>
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* About page specific styles */
        .hero-section {
          position: relative;
          background: linear-gradient(135deg, rgba(2, 11, 22, 0.95) 30%, rgba(2, 11, 22, 0.75) 60%, rgba(2, 11, 22, 0.45) 100%), 
                      url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80') no-repeat center center / cover;
          display: flex;
          min-height: 480px;
          height: calc(100vh - 120px);
          max-height: 600px;
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

        /* OUR STORY SECTION */
        .our-story-section {
          padding: 80px 60px;
          background-color: var(--white);
        }

        .story-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 60px;
          align-items: center;
        }

        .story-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
        }

        .story-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 400;
          line-height: 1.2;
          color: var(--header-dark);
          letter-spacing: 0.5px;
        }

        .story-desc {
          font-size: 14px;
          line-height: 1.65;
          color: var(--text-gray);
          font-weight: 300;
        }

        .story-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--white);
          padding: 15px 32px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-decoration: none;
          border-radius: 4px;
          transition: var(--transition);
          margin-top: 15px;
          border: 1px solid var(--accent-blue);
        }

        .story-btn:hover {
          background-color: transparent !important;
          color: var(--accent-blue);
        }

        .story-right {
          height: 480px;
          border-radius: 6px;
          overflow: hidden;
          background: url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80') no-repeat center center / cover;
          border: 1px solid var(--border-gray);
        }

        /* STATS / METRIC BANNER */
        .stats-banner-section {
          background-color: var(--white);
          border-top: 1px solid var(--border-gray);
          border-bottom: 1px solid var(--border-gray);
          padding: 60px 40px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1400px;
          margin: 0 auto;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 20px;
          position: relative;
        }

        .stat-card:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 15%;
          height: 70%;
          width: 1px;
          background-color: var(--border-gray);
        }

        .stat-icon {
          font-size: 26px;
          color: var(--header-dark);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-value {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 500;
          color: var(--header-dark);
          margin-bottom: 6px;
          line-height: 1;
        }

        .stat-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--header-dark);
          margin-bottom: 8px;
          letter-spacing: 0.2px;
        }

        .stat-desc {
          font-size: 11px;
          color: var(--text-gray);
          line-height: 1.5;
          max-width: 210px;
          font-weight: 400;
        }

        /* CRAFTSMANSHIP SECTION */
        .craftsmanship-section {
          background-color: var(--primary-navy);
          color: var(--white);
          padding: 90px 60px;
        }

        .craft-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 50px;
          align-items: center;
        }

        .craft-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
        }

        .craft-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: 0.5px;
        }

        .craft-desc {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
        }

        .craft-btn {
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

        .craft-btn:hover {
          background-color: transparent;
          color: var(--white);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .craft-right {
          position: relative;
          width: 100%;
        }

        .connecting-line {
          position: absolute;
          top: 195px;
          left: 10%;
          right: 10%;
          height: 1px;
          border-top: 1.5px dotted rgba(255, 255, 255, 0.3);
          z-index: 1;
        }

        .craft-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .craft-step-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .step-img-box {
          position: relative;
          height: 195px;
          width: 100%;
          border-radius: 8px;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          overflow: visible;
          background-color: rgba(255, 255, 255, 0.02);
          margin-bottom: 25px;
        }

        .step-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
          display: block;
        }

        .step-badge {
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--white);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          z-index: 10;
          transition: var(--transition);
        }

        .craft-step-card:hover .step-badge {
          transform: translateX(-50%) scale(1.1);
        }

        .step-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .step-title-name {
          font-size: 17px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--white);
        }

        .step-desc-text {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
          font-weight: 300;
          max-width: 150px;
        }

        /* WHY CHOOSE SECTION */
        .why-choose-section {
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

        .why-choose-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .choose-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 10px;
          border-right: 1px solid var(--border-gray);
        }

        .choose-card:last-child {
          border-right: none;
        }

        .choose-icon {
          font-size: 26px;
          margin-bottom: 15px;
        }

        .choose-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--header-dark);
          margin-bottom: 10px;
        }

        .choose-desc {
          font-size: 11px;
          color: var(--text-gray);
          line-height: 1.5;
          max-width: 180px;
        }

        /* Responsive Breakpoints */
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
          .story-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .story-right {
            height: 350px;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
          .stat-card:nth-child(2)::after {
            display: none;
          }
          .craft-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .connecting-line {
            display: none;
          }
          .craft-steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
          .step-img-box {
            height: 250px;
          }
          .why-choose-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
          .choose-card {
            border-right: none;
            border-bottom: 1px solid var(--border-gray);
            padding-bottom: 30px;
          }
          .choose-card:nth-last-child(-n+2) {
            border-bottom: none;
            padding-bottom: 0;
          }
        }

        @media (max-width: 768px) {
          .stats-banner-section {
            padding: 40px 20px;
          }
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .stat-card::after {
            display: none !important;
          }
          .craftsmanship-section {
            padding: 60px 20px;
          }
          .craft-steps-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .why-choose-section {
            padding: 60px 20px;
          }
          .why-choose-grid {
            grid-template-columns: 1fr;
          }
          .choose-card {
            border-bottom: 1px solid var(--border-gray) !important;
            padding-bottom: 30px !important;
          }
          .choose-card:last-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
        }
      `}} />
    </>
  );
}
