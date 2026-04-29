"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEstimateModal } from "@/context/EstimateModalContext";

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
  const { openModal } = useEstimateModal();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
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

  // Animate header visibility - premium GSAP slide (desktop only)
  useEffect(() => {
    if (headerRef.current) {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop) {
        // Kill any existing animations to prevent conflicts
        gsap.killTweensOf(headerRef.current);
        
        if (isVisible && isScrolled) {
          // Slide down with premium easing when returning
          gsap.fromTo(
            headerRef.current,
            { 
              y: "-100%",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
            },
            {
              y: 0,
              boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
              duration: 0.6,
              ease: "power4.out",
            }
          );
        } else if (isVisible && !isScrolled) {
          // At top of page - reset
          gsap.to(headerRef.current, {
            y: 0,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          // Slide up smoothly when hiding
          gsap.to(headerRef.current, {
            y: "-100%",
            duration: 0.45,
            ease: "power3.inOut",
          });
        }
      }
    }
  }, [isVisible, isScrolled]);

  // Mobile menu animation - premium slide from right with stagger on nav items only
  useEffect(() => {
    if (mobileMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
      
      // Set initial states immediately to prevent flashes
      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 0 });
      if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { x: "100%" });
      if (menuItemsRef.current.length > 0) gsap.set(menuItemsRef.current, { opacity: 0, x: 30 });
      
      const tl = gsap.timeline();
      
      // Fade in overlay
      if (overlayRef.current) {
        tl.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
      }
      
      // Slide in panel from right
      if (mobileMenuRef.current) {
        tl.to(mobileMenuRef.current, { x: "0%", duration: 0.4, ease: "power3.out" }, 0.05);
      }

      // Stagger menu items only - no CTA animation
      if (menuItemsRef.current.length > 0) {
        tl.to(
          menuItemsRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.2
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

    // Slide out panel
    if (mobileMenuRef.current) {
      tl.to(mobileMenuRef.current, { x: "100%", duration: 0.3, ease: "power3.in" }, 0);
    }

    // Fade out overlay
    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0.05);
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
      className={`relative lg:fixed lg:top-0 lg:left-0 lg:right-0 z-50 transition-colors duration-300 overflow-visible ${
        isScrolled ? "lg:bg-[#1a1a1a]/95 lg:backdrop-blur-md" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="flex items-center justify-between py-2 overflow-visible">
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
                    className="absolute top-full left-0 mt-3 w-56 bg-[#2a2520] rounded-lg shadow-2xl border border-[#3d3529] z-[60] dropdown-menu"
                  >
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="dropdown-item group relative flex items-center px-4 py-3 text-sm text-white/80 hover:text-white overflow-hidden first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <span className="dropdown-bg absolute inset-0 bg-primary" />
                        <span className="dropdown-text relative z-10">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <button
            onClick={openModal}
            className="hidden lg:inline-flex items-center px-5 py-2.5 bg-primary text-white font-semibold text-[13px] uppercase tracking-wider rounded hover:bg-primary/90 transition-all hover:scale-105"
          >
            Request an Estimate
          </button>

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
            className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={closeMenu}
          />
          
          {/* Sheet Panel */}
          <div
            ref={mobileMenuRef}
            className="lg:hidden fixed inset-y-0 right-0 w-[85%] max-w-[340px] bg-[#1a1714] z-[101] flex flex-col h-full shadow-2xl"
          >
            {/* Header with Logo and Close */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <Link href="/" onClick={closeMenu} className="flex-shrink-0">
                <div className="relative w-[50px] h-[50px]">
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
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Navigation Items - Scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <nav className="px-5 py-3">
                {navItems.map((item) => (
                  <div key={item.label} ref={addToRefs}>
                    <Link
                      href={item.href}
                      className={`group flex items-center justify-between py-3.5 border-b border-white/5 transition-all duration-300 ${
                        item.active ? "text-primary" : "text-white/90"
                      }`}
                      onClick={closeMenu}
                    >
                      <span className="text-[15px] font-heading font-bold uppercase tracking-wider group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                      <svg 
                        className="w-4 h-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            {/* Primary CTA at Bottom */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              <button
                onClick={() => {
                  closeMenu();
                  setTimeout(() => openModal(), 400);
                }}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Request Free Estimate
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
