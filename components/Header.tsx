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

  // Sticky header on scroll up
  useEffect(() => {
    const handleScroll = () => {
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

  // Animate header visibility - use full header height including logo overflow
  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        y: isVisible ? 0 : "-100%",
        duration: 0.4,
        ease: "power3.out",
      });
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-black/70 to-transparent"
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

        {/* Mobile Menu - Sheet from Right */}
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              ref={overlayRef}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />
            
            {/* Sheet Panel */}
            <div
              ref={mobileMenuRef}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-[#1a1a1a] z-50 flex flex-col shadow-2xl border-l border-white/10"
            >
              {/* Header with Logo and Close */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <Link href="/" onClick={closeMenu} className="flex-shrink-0">
                  <div className="relative w-[80px] h-[80px]">
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
                  className="p-2 text-white/70 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto py-4 px-5">
                {navItems.map((item) => (
                  <div key={item.label} ref={addToRefs}>
                    <Link
                      href={item.href}
                      className={`block py-4 text-lg font-heading font-bold uppercase tracking-wider border-b border-white/5 transition-colors ${
                        item.active
                          ? "text-primary"
                          : "text-white/90 hover:text-primary"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                    {item.dropdown &&
                      item.items?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block py-2.5 pl-4 text-sm text-white/50 hover:text-primary transition-colors"
                          onClick={closeMenu}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                  </div>
                ))}
              </nav>

              {/* CTA Buttons at Bottom */}
              <div ref={ctaButtonsRef} className="p-5 border-t border-white/10 space-y-3">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-primary text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-primary/90 transition-all"
                  onClick={closeMenu}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Request an Estimate
                </Link>
                <a
                  href="tel:6165550146"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-transparent border border-white/20 text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-white/5 transition-all"
                  onClick={closeMenu}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  (616) 555-0146
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
