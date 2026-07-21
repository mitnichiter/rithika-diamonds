"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isInWishlist } = useApp();

  const id = params?.id as string;

  const product = useMemo(() => {
    return products.find((p) => p.id === id) || products[0];
  }, [products, id]);

  const wishlisted = isInWishlist(product.id);

  const [selectedMetal, setSelectedMetal] = useState("18K White Gold");
  const [selectedSize, setSelectedSize] = useState("10");
  const [mainImage, setMainDisplayImage] = useState(product.image);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMainDisplayImage(product.image);
    // Trigger entry animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [product]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      metal: selectedMetal,
      size: selectedSize,
      quantity: 1
    });
  };

  const thumbImages = [
    product.image,
    "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <main className="min-h-[100dvh] bg-[#EBE3DC] text-[#122742] selection:bg-[#C9A680] selection:text-[#122742] overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-24 lg:py-40">
        
        {/* The Editorial Split */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Massive Typography */}
          <div className={`w-full lg:w-1/2 flex flex-col gap-12 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${isLoaded ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-16 blur-md opacity-0'}`}>
            
            {/* Breadcrumbs */}
            <div className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-60">
              Home / Shop / {product.category} / {product.name}
            </div>

            {/* Title & Price */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-3">
                <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-[#122742]/20">
                  Exquisite Diamond
                </span>
                <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-[#C9A680] text-[#122742]">
                  IGI Certified
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight">
                {product.name}
              </h1>
              <div className="text-3xl md:text-4xl font-light tracking-wide">
                ${product.price.toLocaleString()}
              </div>
            </div>

            {/* Description */}
            <div className="text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl font-light">
              {product.description} Elegant curves and high art craftsmanship merge to symbolize love and femininity. Designed to draw light from all directions to amplify sparkle.
            </div>

            {/* Details Accordion / List */}
            <div className="flex flex-col gap-6 pt-8 border-t border-[#122742]/10">
              <h3 className="text-sm uppercase tracking-[0.2em] font-medium">The Details</h3>
              <ul className="flex flex-col gap-4">
                {[
                  { label: "Diamond Type", value: "Natural Diamonds" },
                  { label: "Clarity & Color", value: "VVS1, F-G Color" },
                  { label: "Shape", value: "Round Brilliant" },
                  { label: "Total Carat", value: "0.75 - 1.25 Ct (Approx.)" }
                ].map((detail, idx) => (
                  <li key={idx} className="flex justify-between items-center py-3 border-b border-[#122742]/5">
                    <span className="opacity-60">{detail.label}</span>
                    <span className="font-medium">{detail.value}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right: Sticky Interactive */}
          <div className={`w-full lg:w-1/2 relative transition-all duration-1000 delay-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${isLoaded ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-16 blur-md opacity-0'}`}>
            <div className="lg:sticky lg:top-32 flex flex-col gap-12">
              
              {/* Image Gallery (Double-Bezel) */}
              <div className="p-2 rounded-[2rem] bg-white/20 ring-1 ring-[#122742]/5 backdrop-blur-xl">
                <div className="relative rounded-[calc(2rem-0.5rem)] overflow-hidden bg-[#122742]/5 aspect-[4/5] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
                  <img 
                    src={mainImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105"
                  />
                  {/* Thumbnails */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-2 rounded-full bg-white/80 backdrop-blur-md ring-1 ring-black/5">
                    {thumbImages.map((imgUrl, index) => (
                      <button
                        key={index}
                        onClick={() => setMainDisplayImage(imgUrl)}
                        className={`w-12 h-12 rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mainImage === imgUrl ? 'ring-2 ring-[#122742] scale-110' : 'opacity-60 hover:opacity-100'}`}
                      >
                        <img src={imgUrl} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Configuration Panel (Double-Bezel) */}
              <div className="p-2 rounded-[2rem] bg-white/20 ring-1 ring-[#122742]/5 backdrop-blur-xl">
                <div className="flex flex-col gap-8 p-6 md:p-8 rounded-[calc(2rem-0.5rem)] bg-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
                  
                  {/* Metal Selection */}
                  <div className="flex flex-col gap-4">
                    <div className="text-xs uppercase tracking-[0.2em] font-medium flex justify-between">
                      <span>Metal</span>
                      <span className="opacity-60">{selectedMetal}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {["18K White Gold", "18K Yellow Gold", "18K Rose Gold", "Platinum"].map((metal) => (
                        <button
                          key={metal}
                          onClick={() => setSelectedMetal(metal)}
                          className={`px-5 py-3 rounded-full text-xs font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                            selectedMetal === metal 
                              ? 'bg-[#122742] text-[#EBE3DC] scale-105' 
                              : 'bg-white/50 text-[#122742] hover:bg-white ring-1 ring-[#122742]/10'
                          }`}
                        >
                          {metal}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="flex flex-col gap-4">
                    <div className="text-xs uppercase tracking-[0.2em] font-medium flex justify-between">
                      <span>Size</span>
                      <button className="opacity-60 hover:opacity-100 underline underline-offset-4 transition-opacity">Size Guide</button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {["6", "7", "8", "9", "10", "11", "12"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 rounded-full text-xs font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center ${
                            selectedSize === size 
                              ? 'bg-[#122742] text-[#EBE3DC] scale-110' 
                              : 'bg-white/50 text-[#122742] hover:bg-white ring-1 ring-[#122742]/10'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {/* Add to Cart - Nested Button Architecture */}
                    <button 
                      onClick={handleAddToCart}
                      className="group relative flex-1 flex items-center justify-between bg-[#122742] text-[#EBE3DC] rounded-full pl-6 pr-2 py-2 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                    >
                      <span className="text-xs uppercase tracking-[0.15em] font-bold z-10">Add to Cart</span>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 group-hover:bg-[#C9A680] group-hover:text-[#122742] z-10">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-[#0a1626] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-full"></div>
                    </button>

                    {/* Wishlist Button */}
                    <button 
                      onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })}
                      className={`group relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                        wishlisted 
                          ? 'bg-[#C9A680] text-[#122742]' 
                          : 'bg-white/50 text-[#122742] hover:bg-white ring-1 ring-[#122742]/10'
                      }`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${wishlisted ? 'scale-110' : 'group-hover:scale-110'}`}>
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
