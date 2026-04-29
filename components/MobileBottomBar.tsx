"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useEstimateModal } from "@/context/EstimateModalContext";

export default function MobileBottomBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const { openModal } = useEstimateModal();

  useEffect(() => {
    // Premium entrance animation
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  return (
    <div
      ref={barRef}
      className="lg:hidden fixed bottom-0 inset-x-0 z-[90] bg-[#1a1714] backdrop-blur-lg border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Quick Action Buttons - Compact */}
      <div className="grid grid-cols-3">
        {/* Call */}
        <a
          href="tel:6165550146"
          className="group flex flex-col items-center justify-center py-2.5 active:bg-white/5 transition-all duration-200"
        >
          <div className="w-10 h-10 mb-1 flex items-center justify-center rounded-lg bg-[#2a2520] border border-[#3d3529] text-primary group-active:bg-primary group-active:border-primary group-active:text-white transition-all duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <span className="text-[9px] font-semibold text-white/50 uppercase tracking-wider">Call</span>
        </a>

        {/* Email */}
        <a
          href="mailto:info@macstimberandterra.com"
          className="group flex flex-col items-center justify-center py-2.5 active:bg-white/5 transition-all duration-200"
        >
          <div className="w-10 h-10 mb-1 flex items-center justify-center rounded-lg bg-[#2a2520] border border-[#3d3529] text-primary group-active:bg-primary group-active:border-primary group-active:text-white transition-all duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <span className="text-[9px] font-semibold text-white/50 uppercase tracking-wider">Email</span>
        </a>

        {/* Quote/Estimate - Primary Action */}
        <button
          onClick={openModal}
          className="group flex flex-col items-center justify-center py-2.5 active:bg-white/5 transition-all duration-200"
        >
          <div className="w-10 h-10 mb-1 flex items-center justify-center rounded-lg bg-primary text-white group-active:bg-primary/80 transition-all duration-200 shadow-lg shadow-primary/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <span className="text-[9px] font-semibold text-primary uppercase tracking-wider">Quote</span>
        </button>
      </div>
    </div>
  );
}
