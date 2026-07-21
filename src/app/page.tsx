"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useApp, Product } from "@/context/AppContext";

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("translate-y-0", "opacity-100");
            entry.target.classList.remove("translate-y-12", "opacity-0");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useScrollReveal();
  const { products, addToCart, toggleWishlist, isInWishlist } = useApp();

  const featuredProducts = products.slice(0, 4);

  const handleQuickAdd = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      metal: "18K White Gold",
      size: "7",
      quantity: 1,
    });
  };

  return (
    <main className="bg-secondary min-h-screen selection:bg-accent selection:text-primary overflow-hidden">
      {/* HERO SECTION - Ethereal Glass / Soft Structuralism */}
      <section className="relative min-h-[100dvh] flex items-center justify-center bg-primary pt-32 pb-24 px-4 md:px-12 lg:px-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-white/5 blur-[150px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]">
            <span className="inline-block py-1 px-4 rounded-full border border-accent/30 text-accent text-[10px] uppercase tracking-[0.2em] font-sans mb-8">
              Since 2004
            </span>
          </div>
          
          <h1 className="reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.32,0.72,0,1)] font-serif text-5xl md:text-7xl lg:text-8xl xl:text-[10rem] leading-[0.9] text-secondary tracking-tight mb-12">
            Exclusive <br />
            <span className="italic text-accent">Masterpieces</span>
          </h1>

          <p className="reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.32,0.72,0,1)] font-sans text-secondary/70 text-lg md:text-xl max-w-2xl font-light tracking-wide mb-16">
            Custom-made diamond jewellery crafted with precision, passion, and perfection. We merge high art with luxury craftsmanship.
          </p>

          <div className="reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] delay-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col sm:flex-row gap-6">
            <Link href="/shop" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-primary font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98]">
              <span>Shop Diamonds</span>
              <div className="ml-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
            <Link href="/bespoke" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border border-secondary/30 text-secondary font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-secondary/5 hover:scale-[0.98]">
              <span>Bespoke Design</span>
            </Link>
          </div>
        </div>

        {/* Glass overlapping element at the bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-5xl h-64 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 p-2 hidden md:block z-20">
          <div className="w-full h-full rounded-[calc(2rem-8px)] bg-primary/40 border border-white/5 flex items-center justify-around px-12">
            {[
              { label: "Certified", value: "100%" },
              { label: "Craftsmanship", value: "In-house" },
              { label: "Design", value: "Custom" },
              { label: "Shipping", value: "Global" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-4xl text-accent mb-2">{stat.value}</div>
                <div className="font-sans text-xs uppercase tracking-[0.2em] text-secondary/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Z-AXIS CASCADE - Featured Categories */}
      <section className="py-32 md:py-48 px-4 md:px-12 lg:px-24 bg-secondary relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] mb-24 md:mb-40">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary tracking-tight">
              Curated <br />
              <span className="italic text-accent">Collections</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Card 1 */}
            <div className="md:col-span-5 md:mt-24 reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]">
              <Link href="/shop?category=Rings" className="group block relative p-2 rounded-[2rem] bg-primary/5 border border-primary/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-4 md:-rotate-2">
                <div className="relative rounded-[calc(2rem-8px)] overflow-hidden bg-white aspect-[4/5]">
                  <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80" alt="Rings" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <h3 className="font-serif text-3xl text-secondary">Rings</h3>
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary transition-transform duration-500 group-hover:scale-110">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="md:col-span-7 reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.32,0.72,0,1)] z-10">
              <Link href="/shop?category=Pendants" className="group block relative p-2 rounded-[2rem] bg-primary/5 border border-primary/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-4 md:rotate-1 md:-ml-12">
                <div className="relative rounded-[calc(2rem-8px)] overflow-hidden bg-white aspect-[16/10] md:aspect-[4/3]">
                  <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80" alt="Pendants" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <h3 className="font-serif text-3xl text-secondary">Pendants</h3>
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary transition-transform duration-500 group-hover:scale-110">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS - Soft Structuralism */}
      <section className="py-32 md:py-48 px-4 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]">
            <div>
              <span className="inline-block py-1 px-4 rounded-full border border-primary/20 text-primary text-[10px] uppercase tracking-[0.2em] font-sans mb-6">
                The Collection
              </span>
              <h2 className="font-serif text-4xl md:text-6xl text-primary tracking-tight">
                Featured <span className="italic text-accent">Pieces</span>
              </h2>
            </div>
            <Link href="/shop" className="group inline-flex items-center gap-4 text-primary font-sans text-xs font-semibold uppercase tracking-[0.15em]">
              <span>View All</span>
              <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-secondary">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, idx) => {
              const wishlisted = isInWishlist(product.id);
              return (
                <article 
                  key={product.id} 
                  className="group reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="p-1.5 rounded-[2rem] bg-secondary/30 border border-primary/5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-2">
                    <div className="relative rounded-[calc(2rem-6px)] overflow-hidden bg-secondary/50 aspect-[4/5] mb-4">
                      <button 
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-primary z-10 transition-transform duration-300 hover:scale-110"
                        onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })}
                        aria-label="Add to Wishlist"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={wishlisted ? "text-red-500" : ""}>
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                    <div className="px-4 pb-4">
                      <Link href={`/product/${product.id}`} className="block font-serif text-lg text-primary mb-1 transition-colors hover:text-accent">
                        {product.name}
                      </Link>
                      <div className="flex items-center justify-between mt-4">
                        <span className="font-sans text-sm text-primary/70 tracking-wide">${product.price.toLocaleString()}</span>
                        <button 
                          onClick={() => handleQuickAdd(product)}
                          className="w-8 h-8 rounded-full bg-primary text-secondary flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-accent"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BESPOKE CTA - Editorial Split */}
      <section className="py-32 md:py-0 bg-primary text-secondary overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[80vh]">
          <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]">
            <span className="inline-block py-1 px-4 rounded-full border border-accent/30 text-accent text-[10px] uppercase tracking-[0.2em] font-sans mb-8 w-max">
              Bespoke Service
            </span>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight mb-8">
              Your Vision, <br />
              <span className="italic text-accent">Realized.</span>
            </h2>
            <p className="font-sans text-secondary/70 text-lg max-w-md font-light tracking-wide mb-12">
              Work directly with our master artisans to create a one-of-a-kind piece that perfectly captures your unique story.
            </p>
            <Link href="/bespoke" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-primary font-sans text-xs font-semibold uppercase tracking-[0.15em] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] w-max">
              <span>Start Custom Design</span>
              <div className="ml-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-full reveal-on-scroll translate-y-12 opacity-0 transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.32,0.72,0,1)]">
            <img src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=80" alt="Bespoke Craftsmanship" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </div>
        </div>
      </section>
    </main>
  );
}
