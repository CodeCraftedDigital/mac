"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate 404 number
      tl.fromTo(
        ".error-number",
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        0.2
      );

      // Animate title
      tl.fromTo(
        ".error-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.5
      );

      // Animate description
      tl.fromTo(
        ".error-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.7
      );

      // Animate buttons
      tl.fromTo(
        ".error-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.9
      );

      // Animate decorative elements
      tl.fromTo(
        ".decorative-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        0.4
      );

      // Subtle floating animation for the icon
      gsap.to(".floating-icon", {
        y: -8,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo */}
        <Link href="/" className="inline-block mb-8">
          <div className="relative w-24 h-24 mx-auto">
            <Image
              src="/images/logo.png"
              alt="Mac's Timber & Terra"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Decorative line */}
        <div className="decorative-line h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-8 origin-center" />

        {/* 404 Number */}
        <div className="error-number relative mb-6">
          <span className="font-heading text-[120px] sm:text-[160px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 leading-none">
            404
          </span>
          {/* Excavator icon floating */}
          <div className="floating-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#2a2520] border border-[#3d3529] flex items-center justify-center text-primary shadow-xl">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 11V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" />
                <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
                <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
                <path d="M3 11h18" />
                <path d="M12 11v4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="error-title font-heading text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-white tracking-wide mb-4">
          Trail Not Found
        </h1>

        {/* Description */}
        <p className="error-description text-white/60 text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Looks like this path hasn&apos;t been cleared yet. Let&apos;s get you back to
          solid ground.
        </p>

        {/* Buttons */}
        <div className="error-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/25"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border-2 border-white/20 text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300"
          >
            Contact Us
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-white/40 text-sm mb-4">Or check out these pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/services"
              className="text-sm text-white/60 hover:text-primary transition-colors"
            >
              Services
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/our-work"
              className="text-sm text-white/60 hover:text-primary transition-colors"
            >
              Our Work
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/about"
              className="text-sm text-white/60 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/resources/blog"
              className="text-sm text-white/60 hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
