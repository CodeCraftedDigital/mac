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
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Animate header visibility
  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        y: isVisible ? 0 : -100,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isVisible]);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );

      // Stagger menu items
      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
  }, [mobileMenuOpen]);

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
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-[13px] font-semibold uppercase tracking-wider transition-colors ${
                    item.active
                      ? "text-primary"
                      : "text-white/90 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {item.dropdown && <ChevronDownIcon />}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#2a2520] rounded-lg shadow-xl border border-[#3d3529] overflow-hidden">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-3 text-sm text-white/80 hover:bg-primary hover:text-white transition-colors"
                      >
                        {subItem.label}
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
              menuItemsRef.current = [];
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden fixed inset-0 top-[84px] bg-[#1a1a1a]/98 backdrop-blur-lg overflow-y-auto"
          >
            <nav className="py-8 px-6">
              {navItems.map((item, index) => (
                <div key={item.label} ref={addToRefs}>
                  <Link
                    href={item.href}
                    className={`block py-4 text-xl font-heading font-bold uppercase tracking-wider border-b border-white/10 ${
                      item.active
                        ? "text-primary"
                        : "text-white/90 hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown &&
                    item.items?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block py-2 pl-4 text-base text-white/60 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                </div>
              ))}
              <div ref={addToRefs} className="pt-8">
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-4 bg-primary text-white font-semibold text-base uppercase tracking-wider rounded hover:bg-primary/90 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Request an Estimate
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
