"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", href: "/", active: true },
  {
    label: "Services",
    href: "/services",
    dropdown: true,
    items: [
      { label: "Land Clearing", href: "/services/land-clearing" },
      { label: "Site Preparation", href: "/services/site-preparation" },
      { label: "Excavation & Grading", href: "/services/excavation-grading" },
      { label: "Drainage & Ditching", href: "/services/drainage-ditching" },
      { label: "Driveway Repair", href: "/services/driveway-repair" },
      { label: "Food Plots", href: "/services/food-plots" },
    ],
  },
  { label: "Our Work", href: "/our-work" },
  { label: "About Us", href: "/about" },
  {
    label: "Resources",
    href: "/resources",
    dropdown: true,
    items: [
      { label: "Blog", href: "/resources/blog" },
      { label: "FAQ", href: "/resources/faq" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

// SVG Icons
const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Sticky header on scroll up - desktop only
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    
    const handleScroll = () => {
      if (!mediaQuery.matches) return; // Skip on mobile
      
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
        setIsScrolled(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
        setIsScrolled(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate header visibility - only on desktop (lg+)
  useEffect(() => {
    if (headerRef.current) {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop) {
        gsap.to(headerRef.current, {
          y: isVisible ? 0 : "-100%",
          duration: 0.4,
          ease: "power3.out",
        });
      }
    }
  }, [isVisible]);

  // Mobile menu animation - premium slide from right with stagger
  useEffect(() => {
    if (mobileMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
      
      const tl = gsap.timeline();
      
      // Fade in overlay
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
          0
        );
      }
      
      // Slide in panel from right
      if (mobileMenuRef.current) {
        tl.fromTo(
          mobileMenuRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.4, ease: "power3.out" },
          0.1
        );
      }

      // Stagger menu items with premium feel
      if (menuItemsRef.current.length > 0) {
        tl.fromTo(
          menuItemsRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.25
        );
      }

      // Animate CTA buttons
      if (ctaButtonsRef.current) {
        tl.fromTo(
          ctaButtonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.5
        );
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menu animation
  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => setMobileMenuOpen(false),
    });

    if (ctaButtonsRef.current) {
      tl.to(ctaButtonsRef.current, { opacity: 0, y: 10, duration: 0.2, ease: "power2.in" }, 0);
    }

    tl.to(
      menuItemsRef.current.reverse(),
      { opacity: 0, x: 20, duration: 0.2, stagger: 0.03, ease: "power2.in" },
      0
    );

    if (mobileMenuRef.current) {
      tl.to(mobileMenuRef.current, { x: "100%", duration: 0.3, ease: "power3.in" }, 0.15);
    }

    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0.2);
    }
  };

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`relative lg:fixed lg:top-0 lg:left-0 lg:right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "lg:bg-[#1a1a1a]/95 lg:backdrop-blur-md lg:shadow-lg" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo - Large and overlapping */}
          <Link href="/" className="flex-shrink-0 relative z-10">
            <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] -my-2">
              <Image
                src="/images/logo.png"
                alt="Mac's Timber & Terra"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 text-[13px] font-semibold uppercase tracking-wider transition-colors ${
                      item.active
                        ? "text-primary"
                        : "text-white/90 hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <span className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}>
                      <ChevronDownIcon />
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-[13px] font-semibold uppercase tracking-wider transition-colors ${
                      item.active
                        ? "text-primary"
                        : "text-white/90 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && openDropdown === item.label && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-[#2a2520] rounded-lg shadow-xl border border-[#3d3529] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {item.items?.map((subItem, subIndex) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="group relative flex items-center px-4 py-3 text-sm text-white/80 hover:text-white transition-all duration-300"
                        onClick={() => setOpenDropdown(null)}
                        style={{ animationDelay: `${subIndex * 50}ms` }}
                      >
                        <span className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center px-5 py-2.5 bg-primary text-white font-semibold text-[13px] uppercase tracking-wider rounded hover:bg-primary/90 transition-all hover:scale-105"
          >
            Request an Estimate
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => {
              if (mobileMenuOpen) {
                closeMenu();
              } else {
                menuItemsRef.current = [];
                setMobileMenuOpen(true);
              }
            }}
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </button>
        </div>

        </div>

      {/* Mobile Menu - Premium Handheld Experience */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={closeMenu}
          />
          
          {/* Sheet Panel */}
          <div
            ref={mobileMenuRef}
            className="lg:hidden fixed top-0 right-0 bottom-0 w-[88%] max-w-[380px] bg-gradient-to-b from-[#1f1a17] to-[#151210] z-[101] flex flex-col shadow-2xl"
          >
            {/* Header with Logo and Close */}
            <div className="flex items-center justify-between px-6 py-5">
              <Link href="/" onClick={closeMenu} className="flex-shrink-0">
                <div className="relative w-[70px] h-[70px]">
                  <Image
                    src="/images/logo.png"
                    alt="Mac's Timber & Terra"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
              <button
                onClick={closeMenu}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto px-6 py-2">
              {navItems.map((item, index) => (
                <div key={item.label} ref={addToRefs}>
                  <Link
                    href={item.href}
                    className={`group flex items-center justify-between py-4 border-b border-white/5 transition-all duration-300 ${
                      item.active ? "text-primary" : "text-white/90"
                    }`}
                    onClick={closeMenu}
                  >
                    <span className="text-[15px] font-heading font-bold uppercase tracking-wider group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                    <svg 
                      className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 py-1 space-y-1">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block py-2 text-[13px] text-white/40 hover:text-primary transition-colors duration-300"
                          onClick={closeMenu}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Contact Info & CTAs */}
            <div ref={ctaButtonsRef} className="px-6 py-6 bg-black/20 border-t border-white/5">
              {/* Quick Contact Row */}
              <div className="flex gap-3 mb-5">
                <a
                  href="tel:6165550146"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span className="text-sm font-medium">Call</span>
                </a>
                <a
                  href="mailto:info@macstimberandterra.com"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span className="text-sm font-medium">Email</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 flex items-center justify-center py-3 bg-white/5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>

              {/* Contact Details */}
              <div className="mb-5 py-4 px-4 bg-white/5 rounded-xl space-y-3">
                <a href="tel:6165550146" className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <span className="text-sm">(616) 555-0146</span>
                </a>
                <a href="mailto:info@macstimberandterra.com" className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <span className="text-sm">info@macstimberandterra.com</span>
                </a>
                <div className="flex items-center gap-3 text-white/50">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/50">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <span className="text-sm">Serving All of Michigan</span>
                </div>
              </div>

              {/* Primary CTA */}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-semibold text-sm uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
                onClick={closeMenu}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
                Request Free Estimate
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
