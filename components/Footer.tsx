"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SVG Icons
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work" },
  { label: "Resources", href: "/resources" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const servicesCol1 = [
  { label: "Land Clearing", href: "/services/land-clearing" },
  { label: "Site Preparation", href: "/services/site-preparation" },
  { label: "Excavation & Grading", href: "/services/excavation-grading" },
];

const servicesCol2 = [
  { label: "Drainage • Ditching", href: "/services/drainage-ditching" },
  { label: "Food Plots", href: "/services/food-plots" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer columns stagger in
      gsap.fromTo(
        ".footer-col",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#2a1f1a] overflow-hidden">
      {/* Subtle wood grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo */}
          <div className="footer-col lg:col-span-1">
            <Link href="/" className="block transition-transform duration-300 hover:scale-105">
              <div className="relative w-28 h-28 mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Mac's Timber & Terra"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="font-heading text-xs font-bold uppercase text-[#c9a86c] mb-4 tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#b8a88a] hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column 1 */}
          <div className="footer-col">
            <h3 className="font-heading text-xs font-bold uppercase text-[#c9a86c] mb-4 tracking-widest">
              Services
            </h3>
            <ul className="space-y-2.5">
              {servicesCol1.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-sm text-[#b8a88a] hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column 2 */}
          <div className="footer-col lg:pt-8">
            <ul className="space-y-2.5">
              {servicesCol2.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-sm text-[#b8a88a] hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="footer-col">
            <h3 className="font-heading text-xs font-bold uppercase text-[#c9a86c] mb-4 tracking-widest">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:6165550146"
                  className="group flex items-center gap-2.5 text-sm text-[#b8a88a] hover:text-primary transition-all duration-300"
                >
                  <span className="text-primary transition-transform duration-300 group-hover:scale-110"><PhoneIcon /></span>
                  (616) 555-0146
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@macstimbera"
                  className="group flex items-center gap-2.5 text-sm text-[#b8a88a] hover:text-primary transition-all duration-300"
                >
                  <span className="text-primary transition-transform duration-300 group-hover:scale-110"><MailIcon /></span>
                  info@macstimbera
                </a>
              </li>
              <li className="text-sm text-[#b8a88a]">
                macstimberandterra.com
              </li>
              <li className="pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-[#3a2f2a] rounded-full text-[#b8a88a] hover:text-primary hover:bg-[#4a3f3a] transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
