"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SVG Icons
const ClipboardIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <path d="M12 11h4"/>
    <path d="M12 16h4"/>
    <path d="M8 11h.01"/>
    <path d="M8 16h.01"/>
  </svg>
);

const ShovelIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22v-5l5-5 5 5-5 5z"/>
    <path d="m8.5 14.5 8-8"/>
    <path d="M18 6c2 2 2.5 5 2.5 5l-3.5 3.5"/>
    <path d="M15 2.5S18 3 20 5"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const steps = [
  {
    number: "01",
    Icon: ClipboardIcon,
    title: "Assess the Property",
    description:
      "We walk your land, understand your goals & recommend your next step.",
  },
  {
    number: "02",
    Icon: ShovelIcon,
    title: "Clear & Prepare the Ground",
    description:
      "We remove, grade, and excavate the right way, prepping the site for right way.",
  },
  {
    number: "03",
    Icon: CheckCircleIcon,
    title: "Finish the Site Right",
    description:
      "Final grade, clean up, and deliver the job makes every site we finish success.",
  },
];

export default function OurProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-[#3d3529]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-3">
            Our Process
          </p>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-white tracking-wide">
            Simple. Transparent. Effective.
          </h2>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-stretch">
              <div className="process-card flex-1 bg-[#4a4035] rounded-lg p-5 flex items-start gap-4">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <span className="font-heading text-4xl font-bold text-primary">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-sm font-bold uppercase text-white mb-2 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Icon */}
                <div className="flex-shrink-0 text-primary/40">
                  <step.Icon />
                </div>
              </div>

              {/* Arrow connector (except last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-8 -mr-4 z-10">
                  <ArrowIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
