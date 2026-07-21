"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, ArrowRight, MessageSquare, PenTool, Hammer, Package, ShieldCheck, Gem, Hourglass } from "lucide-react";

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
    <main className="w-full min-h-[100dvh] bg-[#EBE3DC] text-[#122742] overflow-hidden">
      {/* ==========================================
           3. CUSTOM DESIGN HERO BANNER
           ========================================== */}
      <section className="relative flex flex-col lg:flex-row min-h-[500px] lg:h-[calc(100vh-120px)] lg:max-h-[700px] bg-[#122742]">
        <div className="flex-1 flex items-center p-10 lg:p-20 z-10 bg-[#122742]">
          <div className="max-w-[540px] w-full text-white flex flex-col items-start gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#C9A680] flex items-center gap-2">
              Custom Design
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-light leading-[1.2] tracking-[0.5px]">
              Design Your Dream Diamond Jewellery
            </h1>
            <p className="text-sm font-light leading-[1.65] text-white/80 max-w-[440px] tracking-[0.3px]">
              Your vision, our craftsmanship. Exclusively yours.
            </p>
            <a href="#create-form" className="inline-flex items-center gap-3 bg-white text-[#122742] px-8 py-4 text-[11px] font-bold uppercase tracking-[1.5px] mt-4 hover:bg-transparent hover:text-white border border-white hover:border-white/40 transition-colors">
              Start Your Custom Design <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="flex-[1.1] relative z-0 min-h-[350px] lg:min-h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#122742] to-transparent opacity-80 lg:opacity-100 lg:from-[#122742] lg:via-[#122742]/50 lg:to-transparent"></div>
        </div>
      </section>

      {/* ==========================================
           4. HOW IT WORKS SECTION
           ========================================== */}
      <section className="py-20 px-6 lg:px-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-medium tracking-[2px] text-[#122742] uppercase mb-3">How It Works</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-[60px] bg-gradient-to-r from-transparent via-[#122742]/30 to-transparent"></span>
            <span className="text-[8px] text-[#C9A680]">◆</span>
            <span className="h-[1px] w-[60px] bg-gradient-to-r from-transparent via-[#122742]/30 to-transparent"></span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-0">
          
          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center text-center max-w-[180px]">
            <div className="h-20 flex items-center justify-center mb-4 text-[#C9A680]">
              <MessageSquare className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div className="w-7 h-7 rounded-full bg-[#EBE3DC] border border-[#122742]/15 text-[#122742] flex items-center justify-center text-[11px] font-bold mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2 tracking-[0.5px] text-[#122742]">Share Your Idea</h3>
            <p className="text-xs leading-relaxed text-[#122742]/70 font-light">Tell us your inspiration, requirements &amp; budget.</p>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center h-20">
            <div className="w-full border-t-[1.5px] border-dotted border-[#122742]/20 relative">
              <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C9A680]"></div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center text-center max-w-[180px]">
            <div className="h-20 flex items-center justify-center mb-4 text-[#C9A680]">
              <PenTool className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div className="w-7 h-7 rounded-full bg-[#EBE3DC] border border-[#122742]/15 text-[#122742] flex items-center justify-center text-[11px] font-bold mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2 tracking-[0.5px] text-[#122742]">Design &amp; Preview</h3>
            <p className="text-xs leading-relaxed text-[#122742]/70 font-light">Our experts create 3D designs for your approval.</p>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center h-20">
            <div className="w-full border-t-[1.5px] border-dotted border-[#122742]/20 relative">
              <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C9A680]"></div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center text-center max-w-[180px]">
            <div className="h-20 flex items-center justify-center mb-4 text-[#C9A680]">
              <Hammer className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div className="w-7 h-7 rounded-full bg-[#EBE3DC] border border-[#122742]/15 text-[#122742] flex items-center justify-center text-[11px] font-bold mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2 tracking-[0.5px] text-[#122742]">Crafting Process</h3>
            <p className="text-xs leading-relaxed text-[#122742]/70 font-light">We handcraft your jewellery with precision &amp; care.</p>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center h-20">
            <div className="w-full border-t-[1.5px] border-dotted border-[#122742]/20 relative">
              <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C9A680]"></div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex-1 flex flex-col items-center text-center max-w-[180px]">
            <div className="h-20 flex items-center justify-center mb-4 text-[#C9A680]">
              <Package className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div className="w-7 h-7 rounded-full bg-[#EBE3DC] border border-[#122742]/15 text-[#122742] flex items-center justify-center text-[11px] font-bold mb-4">4</div>
            <h3 className="text-lg font-semibold mb-2 tracking-[0.5px] text-[#122742]">Delivery</h3>
            <p className="text-xs leading-relaxed text-[#122742]/70 font-light">Your masterpiece is delivered safely to your doorstep.</p>
          </div>

        </div>
      </section>

      {/* ==========================================
           5. REQUEST FORM CONTAINER SECTION
           ========================================== */}
      <section className="py-20 px-6 lg:px-16 bg-[#EBE3DC] border-y border-[#122742]/15" id="create-form">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-medium tracking-[2px] text-[#122742] uppercase mb-2">Let's Create Something Unique</h2>
          <p className="text-sm text-[#122742]/70">Fill in your details and our design experts will get in touch with you.</p>
        </div>

        <div className="max-w-6xl mx-auto bg-white border border-[#122742]/15 p-8 lg:p-12">
          {submitted ? (
            <div className="text-center py-10 px-6 bg-[#EBE3DC]/30 border border-[#122742]/15">
              <CheckCircle2 className="w-12 h-12 text-[#C9A680] mx-auto mb-5" />
              <h3 className="font-serif text-2xl font-medium text-[#122742] mb-3">Bespoke Request Submitted</h3>
              <p className="text-sm leading-relaxed max-w-[600px] mx-auto mb-6 text-[#122742]/70">
                Thank you! Your custom jewellery request has been logged successfully as reference <strong className="text-[#122742]">#{assignedId}</strong>. One of our master jewellery designers will review your brief and contact you within 24 hours to schedule a styling consultation.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-[#122742] text-white px-8 py-3 text-xs font-bold uppercase tracking-[1px] hover:bg-[#C9A680] transition-colors"
              >
                Create Another Design
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
                
                {/* Column 1: Personal Details */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xs font-bold uppercase tracking-[1.5px] text-[#122742] pl-2.5 border-l-2 border-[#C9A680] leading-none mb-2">1. Your Details</h3>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-[1px] text-[#122742]/70" htmlFor="full-name">Full Name</label>
                    <input 
                      type="text" 
                      id="full-name" 
                      className="w-full border border-[#122742]/15 bg-[#EBE3DC] p-3 text-[13px] text-[#122742] outline-none focus:border-[#C9A680] rounded-none placeholder-[#122742]/40" 
                      placeholder="Enter your full name" 
                      value={fullname}
                      onChange={(e) => setFullName(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-[1px] text-[#122742]/70" htmlFor="phone-number">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone-number" 
                      className="w-full border border-[#122742]/15 bg-[#EBE3DC] p-3 text-[13px] text-[#122742] outline-none focus:border-[#C9A680] rounded-none placeholder-[#122742]/40" 
                      placeholder="Enter your phone number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-[1px] text-[#122742]/70" htmlFor="email-address">Email Address</label>
                    <input 
                      type="email" 
                      id="email-address" 
                      className="w-full border border-[#122742]/15 bg-[#EBE3DC] p-3 text-[13px] text-[#122742] outline-none focus:border-[#C9A680] rounded-none placeholder-[#122742]/40" 
                      placeholder="Enter your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                {/* Column 2: Design Specs */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xs font-bold uppercase tracking-[1.5px] text-[#122742] pl-2.5 border-l-2 border-[#C9A680] leading-none mb-2">2. Design Information</h3>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-[1px] text-[#122742]/70" htmlFor="jewellery-type">Type of Jewellery</label>
                    <select 
                      id="jewellery-type" 
                      className="w-full border border-[#122742]/15 bg-[#EBE3DC] p-3 text-[13px] text-[#122742] outline-none focus:border-[#C9A680] rounded-none cursor-pointer appearance-none" 
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23122742' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", backgroundSize: "16px" }}
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

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-[1px] text-[#122742]/70" htmlFor="metal-preference">Metal Preference</label>
                    <select 
                      id="metal-preference" 
                      className="w-full border border-[#122742]/15 bg-[#EBE3DC] p-3 text-[13px] text-[#122742] outline-none focus:border-[#C9A680] rounded-none cursor-pointer appearance-none" 
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23122742' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", backgroundSize: "16px" }}
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

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-[1px] text-[#122742]/70" htmlFor="budget-range">Budget Range</label>
                    <select 
                      id="budget-range" 
                      className="w-full border border-[#122742]/15 bg-[#EBE3DC] p-3 text-[13px] text-[#122742] outline-none focus:border-[#C9A680] rounded-none cursor-pointer appearance-none" 
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23122742' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", backgroundSize: "16px" }}
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
                <div className="flex flex-col gap-6">
                  <h3 className="text-xs font-bold uppercase tracking-[1.5px] text-[#122742] pl-2.5 border-l-2 border-[#C9A680] leading-none mb-2">3. Share Your Inspiration</h3>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-[1px] text-[#122742]/70">Upload Reference Images (Optional)</label>
                    <div className="relative border-[1.5px] border-dashed border-[#122742]/20 bg-[#EBE3DC]/50 p-6 text-center flex flex-col items-center gap-3 cursor-pointer hover:border-[#122742] transition-colors">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className="text-[#C9A680]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m16 16-4-4-4 4"></path></svg>
                      </div>
                      {uploadedFileName ? (
                        <p className="text-xs text-[#122742] font-medium leading-[1.4]">
                          Selected File:<br />
                          <span className="text-[10px] text-[#C9A680] font-normal">{uploadedFileName}</span>
                        </p>
                      ) : (
                        <p className="text-xs text-[#122742] font-medium leading-[1.4]">Click to upload reference image<br /><span className="text-[10px] text-[#122742]/70 font-normal">PNG, JPG up to 5MB</span></p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-[1px] text-[#122742]/70" htmlFor="design-brief">Design Brief</label>
                    <div className="relative">
                      <textarea 
                        id="design-brief" 
                        className="w-full border border-[#122742]/15 bg-[#EBE3DC] p-3 text-[13px] text-[#122742] outline-none focus:border-[#C9A680] rounded-none placeholder-[#122742]/40 resize-none" 
                        rows={4} 
                        placeholder="Tell us more about your custom design wishes..." 
                        maxLength={500}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                      ></textarea>
                      <span className="absolute bottom-3 right-4 text-[10px] text-[#122742]/50 font-medium">{details.length}/500</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-t border-[#122742]/15 pt-8 gap-6">
                <button type="submit" className="inline-flex items-center justify-center gap-3 bg-[#122742] text-white px-9 py-4 text-[11px] font-bold uppercase tracking-[1.5px] hover:bg-[#C9A680] transition-colors w-full lg:w-auto">
                  Submit Request <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-[#122742]/70 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9A680]" /> Your information is safe with us and will never be shared.
                </span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ==========================================
           6. "WHY CHOOSE CUSTOM DESIGN?"
           ========================================== */}
      <section className="py-20 px-6 lg:px-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-medium tracking-[2px] text-[#122742] uppercase mb-3">Why Choose Bespoke Custom Design?</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-[60px] bg-gradient-to-r from-transparent via-[#122742]/30 to-transparent"></span>
            <span className="text-[8px] text-[#C9A680]">◆</span>
            <span className="h-[1px] w-[60px] bg-gradient-to-r from-transparent via-[#122742]/30 to-transparent"></span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center p-8 bg-[#EBE3DC]/30 border border-[#122742]/15 transition-transform hover:-translate-y-1">
            <PenTool className="w-7 h-7 text-[#C9A680] mb-5" />
            <h3 className="font-serif text-xl font-semibold text-[#122742] mb-3">100% Unique To You</h3>
            <p className="text-[13px] text-[#122742]/70 leading-[1.6] font-light">No duplicate molds. Your masterpiece is custom engineered exclusively for your story.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-[#EBE3DC]/30 border border-[#122742]/15 transition-transform hover:-translate-y-1">
            <Gem className="w-7 h-7 text-[#C9A680] mb-5" />
            <h3 className="font-serif text-xl font-semibold text-[#122742] mb-3">Hand-Selected Diamonds</h3>
            <p className="text-[13px] text-[#122742]/70 leading-[1.6] font-light">Our gemologists handpick every individual diamond for color matching, brilliance and flawless symmetry.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-[#EBE3DC]/30 border border-[#122742]/15 transition-transform hover:-translate-y-1">
            <Hourglass className="w-7 h-7 text-[#C9A680] mb-5" />
            <h3 className="font-serif text-xl font-semibold text-[#122742] mb-3">Artisanal Heritage</h3>
            <p className="text-[13px] text-[#122742]/70 leading-[1.6] font-light">Meticulously modeled and hand-finished by master craftspeople with decades of high-jewellery expertise.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
