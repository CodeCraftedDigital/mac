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

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const articles = [
  {
    date: "APR 22, 2024",
    title: "Site Preparation in Michigan: What to Know Before You Build",
    image: "/images/blog/site-preparation.jpg",
    href: "/resources/blog/site-preparation-michigan",
  },
  {
    date: "MAR 15, 2024",
    title: "Food Plots on Michigan Hunting Property: A Guide",
    image: "/images/blog/food-plots.jpg",
    href: "/resources/blog/food-plots-michigan",
  },
  {
    date: "APR 30, 2024",
    title: "Land Clearing in Michigan: Hunting Property, N*uilding",
    image: "/images/blog/land-clearing-guide.jpg",
    href: "/resources/blog/land-clearing-hunting",
  },
  {
    date: "JAN 10, 2024",
    title: "Land Clearing in Michigan: Best Practices & Tips",
    image: "/images/blog/land-clearing-tips.jpg",
    href: "/resources/blog/land-clearing-tips",
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-white/50 uppercase tracking-widest mb-2">
              — Resources —
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-white tracking-wide">
              Tips, Insights & Property Knowledge
            </h2>
          </div>
          <Link
            href="/resources/blog"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 border-2 border-white/40 text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-all"
          >
            View All Articles
            <ChevronRightIcon />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <Link
              key={index}
              href={article.href}
              className="blog-card group bg-[#2a2520] rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-white/40 uppercase mb-2 tracking-wide">
                  {article.date}
                </p>
                <h3 className="text-sm font-semibold text-white leading-snug mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wide group-hover:gap-2 transition-all">
                  Read More
                  <ArrowRightIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
