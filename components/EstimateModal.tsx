"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "Land Clearing",
  "Site Preparation",
  "Excavation & Grading",
  "Drainage & Ditching",
  "Driveway Repair",
  "Food Plots",
  "Other",
];

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function EstimateModal({ isOpen, onClose }: EstimateModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Animate modal open
  useEffect(() => {
    if (isOpen && overlayRef.current && modalRef.current) {
      // Set initial states immediately to prevent flash
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { opacity: 0, scale: 0.95, y: 20 });

      const tl = gsap.timeline();

      tl.to(
        overlayRef.current,
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      tl.to(
        modalRef.current,
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0.1
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });

    if (modalRef.current) {
      tl.to(modalRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.25, ease: "power2.in" }, 0);
    }
    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0.1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Close after success
    setTimeout(() => {
      setIsSuccess(false);
      handleClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-5 py-8 sm:p-8">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#1f1a17] to-[#151210] rounded-2xl shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.png"
                  alt="Mac's Timber & Terra"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold uppercase text-white tracking-wide">
                  Request an Estimate
                </h2>
                <p className="text-sm text-white/50">Free, no-obligation quote</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {isSuccess ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-500/20 text-green-500">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">Request Sent!</h3>
              <p className="text-white/60">We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    className="w-full px-4 py-3 bg-[#2a2520] border border-[#3d3529] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(616) 555-0000"
                    className="w-full px-4 py-3 bg-[#2a2520] border border-[#3d3529] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-[#2a2520] border border-[#3d3529] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Service Needed *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 bg-[#2a2520] border border-[#3d3529] rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff50'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                >
                  <option value="" className="bg-[#1a1a1a]">Select a service...</option>
                  {services.map((service) => (
                    <option key={service} value={service} className="bg-[#1a1a1a]">
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Location */}
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Property Location (City/County)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grand Rapids, Kent County"
                  className="w-full px-4 py-3 bg-[#2a2520] border border-[#3d3529] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                />
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Project Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your project (size, timeline, special requirements...)"
                  className="w-full px-4 py-3 bg-[#2a2520] border border-[#3d3529] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-2 bg-primary text-white font-semibold text-sm uppercase tracking-wider rounded-xl hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Get My Free Estimate
                  </>
                )}
              </button>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 pt-2 text-[11px] text-white/40">
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Fully Insured
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Response in 24hrs
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
