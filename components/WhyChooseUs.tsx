"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SVG Icons matching the original design
const ExcavatorIcon = () => (
  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="40" width="48" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="18" cy="52" r="6" stroke="currentColor" strokeWidth="2"/>
    <circle cx="46" cy="52" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 40V32C12 30.9 12.9 30 14 30H30L36 20H44V30H50C51.1 30 52 30.9 52 32V40" stroke="currentColor" strokeWidth="2"/>
    <path d="M36 20L28 8H20L24 20" stroke="currentColor" strokeWidth="2"/>
    <rect x="20" y="24" width="8" height="6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ChecklistIcon = () => (
  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="8" width="40" height="48" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 24L26 30L36 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 38L26 44L36 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="42" y1="25" x2="44" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="42" y1="39" x2="44" y2="39" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MichiganIcon = () => (
  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12C24 10 30 10 34 12C38 14 42 14 46 16C50 20 52 26 52 32C52 38 50 42 46 46C42 50 36 52 32 52C28 52 22 50 18 46C14 42 12 38 12 32C12 26 14 20 18 16C18 14 18 12 20 12Z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="32" cy="28" r="3" fill="currentColor"/>
    <path d="M32 31V38" stroke="currentColor" strokeWidth="2"/>
    <path d="M28 42H36" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const CommunicationIcon = () => (
  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="16" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 32L20 44H8V32Z" stroke="currentColor" strokeWidth="2"/>
    <line x1="16" y1="26" x2="36" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="16" y1="32" x2="32" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <rect x="28" y="28" width="28" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
    <line x1="36" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="36" y1="42" x2="44" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const features = [
  {
    Icon: ExcavatorIcon,
    title: "Experienced Equipment Work",
    description:
      "Our skilled operators and the right equipment get the hard work done with care.",
  },
  {
    Icon: ChecklistIcon,
    title: "Clean Site Prep Process",
    description:
      "We prepare your site the right way—safe, efficient, and ready for what's next.",
  },
  {
    Icon: MichiganIcon,
    title: "Michigan Property Expertise",
    description:
      "We serve Michigan soils, weather & terrain and know how to work it.",
  },
  {
    Icon: CommunicationIcon,
    title: "Reliable Project Communication",
    description:
      "Clear updates, honest timelines & answers when you need them.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-[#2a2520]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            — Why Choose Us —
          </p>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-white tracking-wide">
            Built on Experience. Focused on Results.
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg bg-[#3d3529] border border-[#4a4035] flex items-center justify-center text-primary">
                  <feature.Icon />
                </div>
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold uppercase text-primary mb-2 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
