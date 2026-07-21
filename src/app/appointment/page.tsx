"use client";

import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, RotateCcw, Lock } from "lucide-react";

const SESSIONS = [
  {
    name: "Private Gemology Table",
    duration: "60 Mins",
    desc: "An individual examination of D-flawless loose diamonds under active microscopic magnification with our head gemologist."
  },
  {
    name: "Bespoke Engagement Drafting",
    duration: "90 Mins",
    desc: "Co-sketching and CAD architectural modeling of a singular custom ring from raw gemstone selection to set drawing."
  },
  {
    name: "Heirloom Restructuring Salon",
    duration: "75 Mins",
    desc: "Re-engineering and resetting ancestral estate diamonds into modern, light-maximizing custom metal frames."
  }
];

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    sessionType: "Private Gemology Table",
    date: "",
    time: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullname && formData.email && formData.date && formData.time) {
      setSubmitted(true);
    }
  };

  return (
    <main className="w-full min-h-[100dvh] bg-[#EBE3DC] text-[#122742] py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-2xl border-b border-[#122742]/15 pb-12 mb-16 animate-fade-in">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A680] font-semibold">The Salon Calendar</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tighter leading-none mt-4 mb-4">
            Schedule A
            <span className="block italic text-[#C9A680] font-normal mt-2">Private Viewing</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#122742]/70 font-light leading-relaxed">
            Secure an uninterrupted hour of gemological precision and bespoke design consulting, whether in our Fifth Avenue salon or via private, encrypted video link.
          </p>
        </div>

        {/* Split Form & Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Form */}
          <div className="lg:col-span-7 bg-white border border-[#122742]/15 p-8 sm:p-12">
            {submitted ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="h-16 w-16 bg-[#C9A680]/10 text-[#C9A680] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#122742]">Viewing Block Requested</h3>
                <p className="text-xs text-[#122742]/70 max-w-[45ch] mx-auto leading-relaxed mt-3">
                  Thank you! Your private salon session request is received. A personal boutique registrar will contact you within the hour to verify your credentials, confirm diamond inventory, and secure your scheduling slot.
                </p>

                <div className="mt-8 p-6 bg-[#EBE3DC]/50 border border-[#122742]/15 text-left flex flex-col gap-3 text-xs text-[#122742]">
                  <div className="flex justify-between items-center">
                    <span className="uppercase tracking-widest font-semibold text-[#122742]/60 text-[10px]">Session Archetype</span>
                    <span className="font-bold">{formData.sessionType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="uppercase tracking-widest font-semibold text-[#122742]/60 text-[10px]">Requested Block</span>
                    <span className="font-bold">{formData.date} at {formData.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-[#122742] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#C9A680] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Request Another Viewing</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#122742] mb-2">Atelier Request</h3>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#122742]/70">Session Archetype</label>
                  <select
                    value={formData.sessionType}
                    onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
                    className="w-full px-4 py-3 bg-[#EBE3DC] border border-[#122742]/15 text-xs font-semibold text-[#122742] focus:outline-none focus:border-[#C9A680] cursor-pointer rounded-none"
                  >
                    {SESSIONS.map((s, idx) => (
                      <option key={idx} value={s.name}>{s.name} ({s.duration})</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#122742]/70">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Victoria Sterling"
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    className="w-full px-4 py-3 bg-[#EBE3DC] border border-[#122742]/15 text-xs text-[#122742] placeholder-[#122742]/40 focus:outline-none focus:border-[#C9A680] rounded-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#122742]/70">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="E.g., victoria@sterling.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#EBE3DC] border border-[#122742]/15 text-xs text-[#122742] placeholder-[#122742]/40 focus:outline-none focus:border-[#C9A680] rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#122742]/70">Phone (Secure) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="E.g., +1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#EBE3DC] border border-[#122742]/15 text-xs text-[#122742] placeholder-[#122742]/40 focus:outline-none focus:border-[#C9A680] rounded-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#122742]/70">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-[#EBE3DC] border border-[#122742]/15 text-xs text-[#122742] focus:outline-none focus:border-[#C9A680] rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#122742]/70">Preferred Time *</label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 bg-[#EBE3DC] border border-[#122742]/15 text-xs text-[#122742] focus:outline-none focus:border-[#C9A680] rounded-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#122742]/70">Atelier Specifications (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Specify target carat weights, desired metal alloys, ring size, or ancestral stones to reset..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-[#EBE3DC] border border-[#122742]/15 text-xs text-[#122742] placeholder-[#122742]/40 focus:outline-none focus:border-[#C9A680] resize-none rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#122742] hover:bg-[#C9A680] text-white font-bold text-xs tracking-widest uppercase transition-colors duration-150 flex items-center justify-center gap-2 mt-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Secure Viewing Block</span>
                </button>
              </form>
            )}
          </div>

          {/* Right panel: Sessions list */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {SESSIONS.map((s, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-[#122742]/15 flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center border-b border-[#122742]/15 pb-2">
                    <h4 className="font-serif text-lg font-bold text-[#122742]">{s.name}</h4>
                    <span className="inline-block px-2.5 py-1 bg-[#EBE3DC] text-[#122742] text-[10px] font-semibold uppercase tracking-wider">{s.duration}</span>
                  </div>
                  <p className="text-xs text-[#122742]/70 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 p-6 bg-white border border-[#122742]/15 items-start">
              <ShieldCheck className="w-5 h-5 text-[#C9A680] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#122742]">Atelier Privacy Protocol</h5>
                <p className="text-[11px] sm:text-xs text-[#122742]/70 mt-1 leading-relaxed">
                  All consultations are bound by strict gemological non-disclosure agreements. We guarantee complete transactional discretion and military-grade biometric-encrypted data protection.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
