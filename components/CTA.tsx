"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax effect
      gsap.fromTo(
        ".cta-bg",
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Left content
      gsap.fromTo(
        ".cta-left",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Right content
      gsap.fromTo(
        ".cta-right",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          delay: 0.2,
        }
      );

      // Button pulse animation
      gsap.to(".cta-button", {
        boxShadow: "0 0 30px rgba(211, 84, 0, 0.4)",
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/cta-bg.jpg"
          alt="Forest background"
          fill
          className="cta-bg object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="cta-left">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
              Ready to Get Started?
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-white tracking-wide">
              Let&apos;s Build Something Great.
            </h2>
          </div>

          {/* Right Content */}
          <div className="cta-right flex flex-col md:flex-row items-start md:items-center gap-6 lg:justify-end">
            <p className="text-white/70 max-w-sm leading-relaxed">
              Whether you&apos;re clearing land, building a driveway, or prepping a
              site—we&apos;re ready to help.
            </p>
            <Link
              href="/contact"
              className="cta-button flex-shrink-0 inline-flex items-center px-7 py-3.5 bg-primary text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Request an Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
