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

const projects = [
  {
    title: "Land Clearing",
    location: "Iron Area • Newkirk County",
    beforeImage: "/images/projects/land-clearing-before.jpg",
    afterImage: "/images/projects/land-clearing-after.jpg",
  },
  {
    title: "Site Preparation",
    location: "New Build • Ios • Ionia County",
    beforeImage: "/images/projects/site-prep-before.jpg",
    afterImage: "/images/projects/site-prep-after.jpg",
  },
  {
    title: "Excavation & Grading",
    location: "Pond Build • Barry County",
    beforeImage: "/images/projects/excavation-before.jpg",
    afterImage: "/images/projects/excavation-after.jpg",
  },
  {
    title: "Driveway Repair",
    location: "Grading & Gravel • Clinton County",
    beforeImage: "/images/projects/driveway-before.jpg",
    afterImage: "/images/projects/driveway-after.jpg",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Project cards with scale and stagger
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: {
            each: 0.1,
            ease: "power2.out",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
          },
        }
      );

      // Before/After labels pop in
      gsap.fromTo(
        ".before-label, .after-label",
        { opacity: 0, scale: 0.5, y: -10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 75%",
          },
          delay: 0.4,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-[#2a2520]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="projects-header flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-white/50 uppercase tracking-widest mb-2">
              Our Work
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-white tracking-wide">
              Real Projects. Real Results.
            </h2>
          </div>
          <Link
            href="/our-work"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 border-2 border-white/40 text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-all"
          >
            View More Projects
            <ChevronRightIcon />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="project-card group">
              {/* Before/After Images */}
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <div className="grid grid-cols-2">
                  {/* Before */}
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={project.beforeImage}
                      alt={`${project.title} Before`}
                      fill
                      className="object-cover img-hover-zoom"
                    />
                    <div className="before-label absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold uppercase rounded">
                      Before
                    </div>
                  </div>
                  {/* After */}
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={project.afterImage}
                      alt={`${project.title} After`}
                      fill
                      className="object-cover img-hover-zoom"
                    />
                    <div className="after-label absolute top-2 right-2 px-2 py-0.5 bg-primary text-white text-[10px] font-bold uppercase rounded">
                      After
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="mt-4">
                <h3 className="font-heading text-sm font-bold uppercase text-white tracking-wide">
                  {project.title}
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
