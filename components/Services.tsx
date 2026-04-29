"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const services = [
  {
    title: "Land Clearing",
    description: "Remove trees, brush, stumps & debris to open up your land.",
    image: "/images/services/land-clearing.jpg",
    href: "/services/land-clearing",
  },
  {
    title: "Site Preparation",
    description: "Prep your property for builds, utilities, barns & more.",
    image: "/images/services/site-preparation.jpg",
    href: "/services/site-preparation",
  },
  {
    title: "Excavation & Grading",
    description: "Precision grade & excavation solutions for any project.",
    image: "/images/services/excavation-grading.jpg",
    href: "/services/excavation-grading",
  },
  {
    title: "Drainage & Ditching",
    description: "Improve drainage, prevent erosion & protect your land.",
    image: "/images/services/drainage-ditching.jpg",
    href: "/services/drainage-ditching",
  },
  {
    title: "Driveway Repair",
    description: "Maintain & repair driveways for better lasting performance.",
    image: "/images/services/driveway-repair.jpg",
    href: "/services/driveway-repair",
  },
  {
    title: "Food Plots",
    description: "Create productive food plots to attract hunting & habitat.",
    image: "/images/services/food-plots.jpg",
    href: "/services/food-plots",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        ".services-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Service cards with premium stagger
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: {
            each: 0.08,
            ease: "power2.out",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[#f5f0e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="services-header flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <p className="text-sm font-medium text-[#666] uppercase tracking-widest mb-2">
              — What We Do —
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-[#1a1a1a] tracking-wide">
              Excavation & Land Services
            </h2>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#1a1a1a] text-[#1a1a1a] font-semibold text-sm uppercase tracking-wider rounded hover:bg-[#1a1a1a] hover:text-[#f5f0e6] transition-all"
          >
            View All Services
            <ChevronRightIcon />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="service-card group bg-white rounded-lg overflow-hidden shadow-md card-hover hover:shadow-2xl"
            >
              <div className="relative h-32 sm:h-36 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover img-hover-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-heading text-xs sm:text-sm font-bold uppercase text-[#1a1a1a] mb-1.5 leading-tight">
                  {service.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#666] leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
