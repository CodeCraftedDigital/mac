"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SVG Icons
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const AwardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>
    <circle cx="12" cy="8" r="6"/>
  </svg>
);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline for coordinated animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Background subtle zoom
      tl.fromTo(
        ".hero-bg",
        { scale: 1.1 },
        { scale: 1, duration: 2, ease: "power2.out" },
        0
      );

      // Title with split text feel - each line staggers
      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 80, clipPath: "inset(100% 0 0 0)" },
        { 
          opacity: 1, 
          y: 0, 
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2 
        },
        0.3
      );

      // Description slides up smoothly
      tl.fromTo(
        ".hero-description",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.7
      );

      // Buttons with slight scale
      tl.fromTo(
        ".hero-buttons",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        0.9
      );

      // Badges stagger in from left
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.1 
        },
        1.1
      );

      // Parallax scroll effect on background
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Excavator working in forest"
          fill
          className="hero-bg object-cover"
          priority
        />
        {/* Darker overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        <div className="max-w-2xl">
          <h1 className="hero-title font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold uppercase leading-[1.05] tracking-tight text-white">
            Michigan Excavation,
            <br />
            Land Clearing &
            <br />
            Site Preparation
            <br />
            <span className="text-primary">Done Right.</span>
          </h1>

          <p className="hero-description mt-6 text-base sm:text-lg text-white/80 max-w-lg leading-relaxed">
            From land clearing to final grade, we deliver rugged, reliable
            excavation and site prep that sets your property up for success.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold text-sm uppercase tracking-wider rounded transition-all duration-300 ease-out hover:bg-primary/90 hover:scale-105 hover:shadow-xl shadow-lg shadow-primary/30"
            >
              Request an Estimate
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ChevronRightIcon />
              </span>
            </Link>
            <Link
              href="/our-work"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border-2 border-white/40 text-white font-semibold text-sm uppercase tracking-wider rounded transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/60"
            >
              View Our Work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ChevronRightIcon />
              </span>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="hero-badge flex items-center gap-2.5 text-white/80">
              <span className="text-primary"><MapPinIcon /></span>
              <span className="text-sm font-medium uppercase tracking-wide">
                Proudly Serving Michigan
              </span>
            </div>
            <div className="hero-badge flex items-center gap-2.5 text-white/80">
              <span className="text-primary"><ShieldIcon /></span>
              <span className="text-sm font-medium uppercase tracking-wide">
                Fully Insured
              </span>
            </div>
            <div className="hero-badge flex items-center gap-2.5 text-white/80">
              <span className="text-primary"><AwardIcon /></span>
              <span className="text-sm font-medium uppercase tracking-wide">
                Quality Work, Done Right
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
