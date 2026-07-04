import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import refImage from "@/imports/image.png";
import logoMark from "@/imports/image_5.png";

// ─── Font helpers ─────────────────────────────────────────────────────────────
const DISPLAY = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const MONO    = "'IBM Plex Mono', monospace";
const BODY    = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number; size: number; opacity: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  { id: "01", name: "Console Porting",    description: "Full-pipeline porting from PC or mobile to PlayStation, Xbox, and Nintendo Switch, preserving your vision on every platform." },
  { id: "02", name: "Optimization",       description: "Performance profiling, memory budgeting, and platform-specific tuning to hit target framerates across all hardware tiers." },
  { id: "03", name: "Certification",      description: "TRC, TCR, and Lot Check navigation from first submission through approval, without surprises." },
  { id: "04", name: "Platform Features",  description: "Native integration of trophies, achievements, cloud saves, haptics, DualSense, and platform-specific APIs." },
  { id: "05", name: "Launch Support",     description: "Day-one patch coordination, live ops support, and post-launch monitoring across all console storefronts." },
  { id: "06", name: "Co-Development",     description: "Embedded engineering teams that work inside your production pipeline from pre-alpha through ship." },
];

const processSteps = [
  { id: "01", name: "Assess",    description: "Audit the codebase, engine, and target hardware." },
  { id: "02", name: "Adapt",     description: "Re-architect input, memory, and rendering for console." },
  { id: "03", name: "Optimize",  description: "Lock target framerate, load times, and thermals." },
  { id: "04", name: "Integrate", description: "Wire platform features, trophies, and storefronts." },
  { id: "05", name: "Certify",   description: "Pass first-party compliance on every platform." },
  { id: "06", name: "Launch",    description: "Ship day-one and support the live title." },
];

const platforms = [
  { name: "PlayStation",      sub: "PS4 · PS5 · PS VR2" },
  { name: "Xbox",             sub: "One · Series X|S · Game Pass" },
  { name: "Nintendo Switch",  sub: "Switch · OLED · Lite" },
  { name: "Steam",            sub: "PC · Steam Deck" },
  { name: "Epic Games",       sub: "EGS · Epic Online Services" },
];

const caseStudies = [
  {
    index: "001", name: "Iron Protocol", tagline: "Physics-driven tactical shooter",
    platforms: ["PS5", "Xbox Series X|S"],
    services: ["Console Porting", "Optimization", "Certification"],
    description: "A complex physics-driven tactical shooter requiring deep PS5 DualSense integration and 60fps delivery on all hardware tiers. Shipped in 14 months.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1656823688406-a6a04c800f68?w=1400&h=560&fit=crop&auto=format",
    imageAlt: "Dramatic black game controller close-up",
  },
  {
    index: "002", name: "Hollow Reach", tagline: "Atmospheric exploration",
    platforms: ["Nintendo Switch", "Switch OLED"],
    services: ["Porting", "Launch Support", "Co-Development"],
    description: "An atmospheric exploration game brought to Switch with custom memory compression and handheld-optimized rendering pipelines. Zero cert failures.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1693929291343-f38cb7519d5d?w=1400&h=560&fit=crop&auto=format",
    imageAlt: "Close-up atmospheric game controller",
  },
  {
    index: "003", name: "Veil of Arda", tagline: "Cross-generational open-world RPG",
    platforms: ["PS4", "PS5", "Xbox One", "Xbox Series X|S"],
    services: ["Full Pipeline", "Platform Features", "Certification"],
    description: "A cross-generational RPG shipped simultaneously across four console SKUs with shared save architecture and split-screen support.",
    year: "2023",
    image: "https://images.unsplash.com/photo-1616341316676-fb436b96f99a?w=1400&h=560&fit=crop&auto=format",
    imageAlt: "Sleek black PlayStation controller on dark surface",
  },
];

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let particles: Particle[] = [];
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      const count = window.innerWidth < 768 ? 38 : 72;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        size: Math.random() * 1.2 + 0.6, opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const maxDist = window.innerWidth < 768 ? 140 : 220;

      // Move particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      }

      // Precompute distances
      const n = particles.length;
      const connected: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          connected[i][j] = connected[j][i] = Math.sqrt(dx * dx + dy * dy) < maxDist;
        }
      }

      // Draw triangle fills first (behind lines)
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (!connected[i][j]) continue;
          for (let k = j + 1; k < n; k++) {
            if (!connected[i][k] || !connected[j][k]) continue;
            const ax = particles[i].x, ay = particles[i].y;
            const bx = particles[j].x, by = particles[j].y;
            const cx = particles[k].x, cy = particles[k].y;
            // Area-based opacity — smaller triangles slightly more opaque
            const area = Math.abs((bx - ax) * (cy - ay) - (cx - ax) * (by - ay)) / 2;
            const alpha = Math.max(0, 0.055 - area / 800000);
            ctx.beginPath();
            ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.lineTo(cx, cy);
            ctx.closePath();
            ctx.fillStyle = `rgba(14,143,85,${alpha})`;
            ctx.fill();
          }
        }
      }

      // Draw edges
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (!connected[i][j]) continue;
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(14,160,85,${alpha})`;
          ctx.lineWidth = 0.7; ctx.stroke();
        }
      }

      // Draw dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,160,85,${p.opacity * 0.85})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize(); init(); draw();
    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />;
}

// ─── Contact Modal ────────────────────────────────────────────────────────────
function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6" onClick={onClose}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[480px] border border-white/[0.08] p-8 md:p-10"
        style={{ background: "#0A0A0A" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#444444] hover:text-[#F5F5F5] transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.2" />
            <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-2">
          <span className="text-[11px] text-[#0E8F55] tracking-[0.28em] uppercase" style={{ fontFamily: MONO }}>Get in Touch</span>
        </div>
        <h3 className="font-bold text-[#F5F5F5] mb-2 leading-tight" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
          Let's talk about your project.
        </h3>
        <p className="text-[#555555] text-[13px] leading-[1.7] mb-8" style={{ fontFamily: BODY }}>
          Whether you have a title ready to port or are still figuring out the scope, we're happy to have an early conversation. Reach us on LinkedIn or drop us a line directly.
        </p>

        {/* Options */}
        <div className="flex flex-col gap-3">
          <a
            href="https://linkedin.com/company/aranya-interactive"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border border-white/[0.08] px-6 py-4 hover:border-[#0E8F55]/60 hover:bg-[#0E8F55]/[0.06] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#0E8F55] flex-shrink-0">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <div>
                <div className="text-[12px] font-bold text-[#F5F5F5]" style={{ fontFamily: DISPLAY }}>LinkedIn</div>
                <div className="text-[11px] text-[#444444] tracking-[0.05em]" style={{ fontFamily: MONO }}>linkedin.com/company/aranya-interactive</div>
              </div>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#333333] group-hover:text-[#0E8F55] transition-colors duration-300 flex-shrink-0">
              <line x1="0" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1" />
              <polyline points="6,2 10,6 6,10" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </a>

          <a
            href="mailto:hello@aranyainteractive.com"
            className="group flex items-center justify-between border border-white/[0.08] px-6 py-4 hover:border-[#0E8F55]/60 hover:bg-[#0E8F55]/[0.06] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#0E8F55] flex-shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className="text-[12px] font-bold text-[#F5F5F5]" style={{ fontFamily: DISPLAY }}>Email</div>
                <div className="text-[11px] text-[#444444] tracking-[0.05em]" style={{ fontFamily: MONO }}>hello@aranyainteractive.com</div>
              </div>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#333333] group-hover:text-[#0E8F55] transition-colors duration-300 flex-shrink-0">
              <line x1="0" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1" />
              <polyline points="6,2 10,6 6,10" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-white/[0.05]">
          <p className="text-[11px] text-[#333333] leading-[1.6]" style={{ fontFamily: MONO }}>
            We typically respond within 24 hours on business days.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Text Reveal ──────────────────────────────────────────────────────────────
function TextReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "108%" }}
            animate={inView ? { y: 0 } : { y: "108%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}{i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ children, withLine = false }: { children: React.ReactNode; withLine?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {withLine && <div className="w-7 h-px bg-[#0E8F55]" />}
      <span className="text-[#0E8F55] text-[12px] tracking-[0.28em] uppercase" style={{ fontFamily: MONO }}>
        {children}
      </span>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onContact }: { onContact: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: "Studio",   href: "#studio"   },
    { label: "Process",  href: "#process"  },
    { label: "Services", href: "#services" },
    { label: "Work",     href: "#work"     },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md border-b border-white/[0.05]" : ""
      }`}
      style={scrolled ? { background: "rgba(5,7,5,0.88)" } : {}}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img src={logoMark} alt="Aranya Interactive mark" className="w-7 h-7 object-contain" />
          <div className="flex items-baseline gap-2">
            <span
              className="text-[#F5F5F5] text-[19px] font-bold tracking-tight leading-none"
              style={{ fontFamily: DISPLAY }}
            >
              ARANYA
            </span>
            <span
              className="text-[#555555] text-[12px] font-normal tracking-[0.22em] leading-none"
              style={{ fontFamily: MONO }}
            >
              INTERACTIVE
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#666666] hover:text-[#F5F5F5] transition-colors duration-300 text-[12px] tracking-[0.2em] uppercase"
              style={{ fontFamily: MONO, textDecoration: "none" }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onContact}
          className="hidden md:flex items-center text-[#F5F5F5] border border-[#F5F5F5]/30 hover:border-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#050505] transition-all duration-300 px-6 py-2.5 text-[12px] tracking-[0.2em] uppercase font-bold"
          style={{ fontFamily: MONO }}
        >
          Start a Project
        </button>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-white/70 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden border-t border-white/[0.05]" style={{ background: "rgba(5,5,5,0.97)" }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a key={link.label}
              href={link.href}
              className="text-left text-[12px] tracking-[0.2em] text-[#888888] hover:text-[#F5F5F5] transition-colors uppercase"
              style={{ fontFamily: MONO, textDecoration: "none" }}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => {
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }, 420);
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            className="text-left text-[12px] tracking-[0.2em] text-[#888888] hover:text-[#F5F5F5] transition-colors uppercase"
            style={{ fontFamily: MONO }}
            onClick={() => { setMenuOpen(false); onContact(); }}
          >
            Start a Project
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ onContact }: { onContact: () => void }) {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden" style={{ background: "radial-gradient(ellipse 90% 65% at 15% 105%, rgba(14,100,58,0.48) 0%, rgba(5,5,5,0) 62%), #050505" }}>
      <ParticleCanvas />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(to right,rgba(245,245,245,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(245,245,245,0.03) 1px,transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "linear-gradient(to top,#050505,transparent)" }} />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center pt-[68px] pb-10 md:pt-0 md:pb-0 md:justify-center">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 md:mb-10"
        >
          <SectionLabel withLine>Console Development Studio</SectionLabel>
        </motion.div>

        {/* Headline */}
        <h1 className="font-bold leading-[0.88] tracking-[-0.02em] text-[#F5F5F5]"
          style={{ fontFamily: DISPLAY, fontSize: "clamp(2.8rem, 8vw, 6.625rem)" }}
        >
          <div style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "105%" }} animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              bringing games
            </motion.div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "105%" }} animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              to{" "}
              <span className="relative inline-block">
                consoles
                <motion.span
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="absolute left-0 bottom-[-4px] w-full h-[5px] md:h-[6px] bg-[#0E8F55] block"
                />
              </span>
            </motion.div>
          </div>
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-10 text-[#606060] leading-[1.7] w-full md:max-w-[480px]"
          style={{ fontFamily: BODY, fontSize: "clamp(0.875rem, 1.1vw, 1.0625rem)" }}
        >
          A console-first development partner specializing in porting, optimization,
          certification, and launch support for PlayStation, Xbox, and Nintendo Switch.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <button
            className="w-full sm:w-auto bg-[#0E8F55] text-[#F5F5F5] px-8 py-3.5 text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-[#0b7a49] transition-colors duration-300"
            style={{ fontFamily: MONO }}
            onClick={onContact}
          >
            Start a Project
          </button>
          <button
            className="w-full sm:w-auto border border-white/[0.18] text-[#F5F5F5] px-8 py-3.5 text-[12px] tracking-[0.2em] uppercase font-bold hover:border-white/40 transition-colors duration-300"
            style={{ fontFamily: MONO }}
          >
            View Our Work
          </button>
        </motion.div>

        {/* Work preview strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px bg-white/[0.15]" />
            <span className="text-[9px] text-white/20 tracking-[0.3em] uppercase" style={{ fontFamily: MONO }}>
              Selected Work
            </span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {[
              { index: "001", sub: "PS5 · Xbox Series X|S" },
              { index: "002", sub: "Nintendo Switch" },
              { index: "003", sub: "Multi-platform" },
            ].map((item, i) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden flex-shrink-0 border border-white/[0.06]"
                style={{ width: "clamp(140px, 38vw, 220px)", height: "clamp(84px, 22vw, 128px)", background: "#080808" }}
              >
                {/* Shimmer */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, delay: 2.2 + i * 0.7, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-1/2 pointer-events-none"
                  style={{ background: "linear-gradient(105deg, transparent 30%, rgba(14,143,85,0.07) 50%, transparent 70%)" }}
                />
                <div className="absolute top-2.5 left-3">
                  <span className="text-[9px] text-[#2A2A2A] tracking-[0.2em]" style={{ fontFamily: MONO }}>{item.index}</span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                      className="w-1 h-1 rounded-full bg-[#0E8F55]"
                    />
                    <span className="text-[8px] text-[#0E8F55] tracking-[0.22em] uppercase" style={{ fontFamily: MONO }}>Soon</span>
                  </div>
                  <div className="text-[9px] text-[#333333] tracking-[0.08em]" style={{ fontFamily: MONO }}>{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator — hidden on mobile to save space */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
          />
          <span className="text-[9px] tracking-[0.28em] text-white/20 uppercase" style={{ fontFamily: MONO }}>Scroll</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]"
      />
    </section>
  );
}

// ─── Who We Are ───────────────────────────────────────────────────────────────
function WhoWeAreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="studio" ref={ref} className="relative py-16 md:py-40 overflow-hidden" style={{ background: "radial-gradient(ellipse 70% 60% at 95% 5%, rgba(14,100,58,0.30) 0%, rgba(5,5,5,0) 55%), #050505" }}>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-[1fr_1fr] gap-20 lg:gap-32 items-start">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }} className="mb-8">
              <SectionLabel withLine>Who We Are</SectionLabel>
            </motion.div>

            <h2 className="font-bold leading-[0.88] tracking-[-0.02em] text-[#F5F5F5] mb-10"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(3rem, 13vw, 13rem)" }}>
              <TextReveal text="console" delay={0.05} />
              <br />
              <TextReveal text="experts." delay={0.2} />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#606060] leading-[1.75] max-w-[390px]" style={{ fontFamily: BODY, fontSize: "clamp(0.906rem, 1.1875vw, 1.1875rem)" }}
            >
              We partner with developers and publishers to port, optimize, certify, launch,
              and support games across console platforms. Console is all we do, and we do it exceptionally.
            </motion.p>
          </div>

          {/* Right — platforms */}
          <div className="flex flex-col justify-between h-full">
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10"
            >
              <SectionLabel withLine>We ship on</SectionLabel>
            </motion.div>

            <div className="flex flex-col">
              {platforms.map((platform, i) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline justify-between py-5 border-b border-white/[0.06] cursor-default"
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                >
                  <span
                    className={`font-bold tracking-[-0.01em] transition-colors duration-300 ${hovered === i ? "text-[#0E8F55]" : "text-[#F5F5F5]"}`}
                    style={{ fontFamily: DISPLAY, fontSize: "clamp(1.25rem, 1.8vw, 1.875rem)" }}
                  >
                    {platform.name}
                  </span>
                  <span
                    className={`text-[11px] tracking-[0.18em] transition-colors duration-300 ${hovered === i ? "text-[#0E8F55]/70" : "text-[#3A3A3A]"}`}
                    style={{ fontFamily: MONO }}
                  >
                    {platform.sub}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const portingPoints = [
  { label: "Porting",       body: "Full-stack platform migration from PC or mobile to PlayStation, Xbox, and Nintendo Switch. Every rendering path, input system, and save architecture adapted for console." },
  { label: "Optimization",  body: "Frame-rate profiling, memory budgeting, and thermal management tuned to each hardware tier. We hit targets without compromising the experience." },
  { label: "Certification", body: "TRC, TCR, and Lot Check from first submission through approval. We know the requirements inside out and manage every iteration with the platform holders." },
  { label: "Platform APIs", body: "Native integration of trophies, achievements, cloud saves, DualSense haptics, adaptive triggers, and platform-specific SDKs. Wired in correctly, not bolted on." },
  { label: "Launch & Live", body: "Day-one patch coordination, storefront asset delivery, and post-launch monitoring across all console storefronts. We stay on until the title is stable." },
];

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activePoint, setActivePoint] = useState<number | null>(null);

  return (
    <section id="services" ref={ref} className="py-32 border-t border-white/[0.05]" style={{ background: "radial-gradient(ellipse 100% 50% at 50% 50%, rgba(14,90,52,0.14) 0%, transparent 65%), linear-gradient(to bottom, #060e09 0%, #050505 30%, #060e09 70%, #050505 100%)" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Section label + heading */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-8">
            <SectionLabel withLine>What We Do</SectionLabel>
          </motion.div>
          <h2 className="font-bold leading-[0.88] tracking-[-0.02em] text-[#F5F5F5]"
            style={{ fontFamily: DISPLAY, fontSize: "clamp(2.375rem, 5.625vw, 5.625rem)" }}>
            <TextReveal text="Two offerings." delay={0.05} />
            <br />
            <TextReveal text="One focus." delay={0.2} />
          </h2>
        </div>

        {/* ── Game Porting ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start pb-20 border-b border-white/[0.06] mb-20"
        >
          {/* Left — service title */}
          <div className="md:sticky md:top-32">
            <div className="text-[10px] text-[#0E8F55] tracking-[0.28em] uppercase mb-5" style={{ fontFamily: MONO }}>01</div>
            <h3 className="font-bold leading-[0.9] tracking-[-0.02em] text-[#F5F5F5] mb-6"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}>
              Game<br />Porting
            </h3>
            <p className="text-[#555555] leading-[1.75] max-w-[280px]"
              style={{ fontFamily: BODY, fontSize: "clamp(0.875rem, 1vw, 1rem)" }}>
              We handle the full technical journey from your existing build to a certified, shipping console title.
            </p>
          </div>

          {/* Right — 5 points */}
          <div className="flex flex-col">
            {portingPoints.map((point, i) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group py-6 border-b border-white/[0.06] cursor-default"
                onMouseEnter={() => setActivePoint(i)} onMouseLeave={() => setActivePoint(null)}
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className={`font-bold mb-2 transition-colors duration-300 ${activePoint === i ? "text-[#0E8F55]" : "text-[#F5F5F5]"}`}
                      style={{ fontFamily: DISPLAY, fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)" }}>
                      {point.label}
                    </div>
                    <div
                      className="text-[#555555] leading-[1.7] overflow-hidden transition-all duration-500"
                      style={{
                        fontFamily: BODY, fontSize: "13px",
                        maxHeight: activePoint === i ? "120px" : "0px",
                        opacity: activePoint === i ? 1 : 0,
                        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      {point.body}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activePoint === i ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex-shrink-0 mt-1 transition-colors duration-300 ${activePoint === i ? "text-[#0E8F55]" : "text-[#2A2A2A]"}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Co-Development ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start"
        >
          {/* Left — service title */}
          <div className="md:sticky md:top-32">
            <div className="text-[10px] text-[#0E8F55] tracking-[0.28em] uppercase mb-5" style={{ fontFamily: MONO }}>02</div>
            <h3 className="font-bold leading-[0.9] tracking-[-0.02em] text-[#F5F5F5] mb-6"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}>
              Co-Develop&shy;ment
            </h3>
            <p className="text-[#555555] leading-[1.75] max-w-[280px]"
              style={{ fontFamily: BODY, fontSize: "clamp(0.875rem, 1vw, 1rem)" }}>
              Not a vendor. An extension of your studio, embedded inside your pipeline from day one.
            </p>
          </div>

          {/* Right — description + attributes */}
          <div>
            <p className="text-[#888888] leading-[1.85] mb-12"
              style={{ fontFamily: BODY, fontSize: "clamp(1rem, 1.3vw, 1.25rem)" }}>
              Some projects need more than a porting partner. They need engineers who understand your codebase, your tools, and your deadlines as well as you do. We embed directly into your team, attending standups, committing to your repo, and shipping alongside you, so the handoff friction that kills co-development projects never has a chance to start.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.05]">
              {[
                { label: "Embedded Teams",    body: "We work in your tools, your repo, your Slack. No context-switching overhead." },
                { label: "Pre-Alpha to Ship", body: "Engagement from the earliest stages through certification and live ops." },
                { label: "Full-Stack",        body: "Gameplay, rendering, audio, platform. Wherever the work needs to be done." },
              ].map((attr, i) => (
                <motion.div
                  key={attr.label}
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.55 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6" style={{ background: "rgba(5,5,5,0.5)" }}
                >
                  <div className="text-[11px] text-[#0E8F55] tracking-[0.2em] uppercase mb-3" style={{ fontFamily: MONO }}>{attr.label}</div>
                  <div className="text-[#555555] leading-[1.65] text-[13px]" style={{ fontFamily: BODY }}>{attr.body}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function ProcessSection() {
  const headerRef    = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  // Only stage 01 is completed — the green line ends at the first node
  const activeIndex = 0;

  return (
    <section id="process" className="py-28 border-t border-white/[0.05] overflow-hidden" style={{ background: "radial-gradient(ellipse 130% 40% at 50% 0%, rgba(14,100,58,0.24) 0%, #050505 55%), #050505" }}>
      <div ref={headerRef} className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <SectionLabel withLine>Our Process</SectionLabel>
        </motion.div>

        {/* Headline */}
        <h2 className="font-bold leading-[0.9] tracking-[-0.02em]"
          style={{ fontFamily: DISPLAY, fontSize: "clamp(2.8rem, 7vw, 8.5rem)" }}>
          <div style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ y: "105%" }} animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#F5F5F5]">How we ship.</span>
            </motion.div>
          </div>
        </h2>
      </div>

      {/* Timeline — horizontal on desktop, vertical 2-col on mobile */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Desktop: horizontal track */}
        <div className="relative hidden md:block">
          <div className="absolute top-[14px] left-0 right-0 h-px bg-white/[0.10]" />
          <motion.div
            initial={{ width: 0 }}
            animate={headerInView ? { width: "calc(100% / 12)" } : { width: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[14px] left-0 h-px bg-[#0E8F55]"
          />
          <div className="grid grid-cols-6">
            {processSteps.map((step, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start"
                >
                  <div className="relative w-7 h-7 flex items-center justify-center mb-6">
                    {isActive ? (
                      <>
                        <div className="absolute inset-0 rounded-full border border-[#0E8F55]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0E8F55]" />
                      </>
                    ) : (
                      <div className="absolute inset-0 rounded-full border border-white/[0.20]" />
                    )}
                  </div>
                  <div className={`text-[10px] tracking-[0.22em] uppercase mb-2 ${isActive ? "text-[#0E8F55]" : "text-[#3A3A3A]"}`} style={{ fontFamily: MONO }}>
                    Stage {step.id}
                  </div>
                  <div className="font-bold leading-tight mb-2 text-[#F5F5F5]" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.25rem, 1.6vw, 1.75rem)" }}>
                    {step.name}
                  </div>
                  <div className={`leading-[1.6] pr-4 text-[13px] ${isActive ? "text-[#666666]" : "text-[#3A3A3A]"}`} style={{ fontFamily: BODY }}>
                    {step.description}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stacked list */}
        <div className="md:hidden flex flex-col">
          {processSteps.map((step, i) => {
            const isActive = i === activeIndex;
            const isLast = i === processSteps.length - 1;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -12 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-5"
              >
                {/* Left: node + connector line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    {isActive ? (
                      <>
                        <div className="absolute inset-0 rounded-full border border-[#0E8F55]" />
                        <div className="w-2 h-2 rounded-full bg-[#0E8F55]" />
                      </>
                    ) : (
                      <div className="absolute inset-0 rounded-full border border-white/[0.20]" />
                    )}
                  </div>
                  {!isLast && <div className="w-px flex-1 mt-2" style={{ background: isActive ? "#0E8F55" : "rgba(255,255,255,0.08)", minHeight: "40px" }} />}
                </div>
                {/* Right: content */}
                <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
                  <div className={`text-[10px] tracking-[0.22em] uppercase mb-1 ${isActive ? "text-[#0E8F55]" : "text-[#3A3A3A]"}`} style={{ fontFamily: MONO }}>
                    Stage {step.id}
                  </div>
                  <div className="font-bold text-[#F5F5F5] text-[18px] leading-tight mb-1" style={{ fontFamily: DISPLAY }}>
                    {step.name}
                  </div>
                  <div className={`text-[13px] leading-[1.65] ${isActive ? "text-[#666666]" : "text-[#3A3A3A]"}`} style={{ fontFamily: BODY }}>
                    {step.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────
function CaseStudyCard({ study, index }: { study: (typeof caseStudies)[0]; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(wrapRef, { once: true, margin: "-60px" });
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    setMouse({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 12, y: ((e.clientY - rect.top) / rect.height - 0.5) * 12, active: true });
  };

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove} onMouseLeave={() => setMouse({ x: 0, y: 0, active: false })}
      className="relative bg-[#080808] border border-white/[0.06] overflow-hidden group cursor-default"
      style={{
        transform: `perspective(900px) rotateX(${-mouse.y * 0.12}deg) rotateY(${mouse.x * 0.12}deg)`,
        transition: mouse.active ? "transform 0.12s ease" : "transform 0.6s ease",
      }}
    >
      {/* Image header */}
      <div className="relative overflow-hidden bg-[#111111]" style={{ height: "200px" }}>
        <img src={study.image} alt={study.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          style={{ filter: "brightness(0.55) saturate(0.7)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(8,8,8,0.1) 0%,rgba(8,8,8,0.05) 40%,rgba(8,8,8,0.85) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0E8F55]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="absolute top-6 left-8 right-8 flex items-start justify-between">
          <span className="text-[10px] text-white/40 tracking-[0.25em]" style={{ fontFamily: MONO }}>{study.index}</span>
          <span className="text-[10px] text-white/40 tracking-[0.2em]"  style={{ fontFamily: MONO }}>{study.year}</span>
        </div>
        <div className="absolute bottom-6 left-8">
          <span className="text-[10px] text-white/35 tracking-[0.22em] uppercase" style={{ fontFamily: MONO }}>{study.tagline}</span>
        </div>
      </div>

      {/* Text content */}
      <div className="p-6 md:p-8">
        <h3 className="font-bold leading-[0.9] tracking-[-0.02em] text-[#F5F5F5] mb-3 group-hover:text-[#0E8F55] transition-colors duration-500"
          style={{ fontFamily: DISPLAY, fontSize: "clamp(1.25rem, 2vw, 2rem)" }}>
          {study.name}
        </h3>
        <p className="text-[#555555] leading-[1.7] mb-6 text-[13px]" style={{ fontFamily: BODY }}>
          {study.description}
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[["Platforms", study.platforms], ["Services Delivered", study.services]].map(([title, items]) => (
            <div key={String(title)}>
              <div className="text-[9px] tracking-[0.28em] text-[#333333] uppercase mb-3" style={{ fontFamily: MONO }}>{title}</div>
              <div className="flex flex-wrap gap-1.5">
                {(items as string[]).map((item) => (
                  <span key={item} className="text-[10px] text-[#666666] border border-white/[0.07] px-2.5 py-1 tracking-[0.08em]" style={{ fontFamily: MONO }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CaseStudiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const slots = [
    { index: "001", platforms: ["PS5", "Xbox Series X|S"] },
    { index: "002", platforms: ["Nintendo Switch"] },
    { index: "003", platforms: ["PS4", "PS5", "Xbox"] },
  ];

  return (
    <section id="work" ref={ref} className="py-32 border-t border-white/[0.05]" style={{ background: "radial-gradient(ellipse 75% 55% at 85% 15%, rgba(14,95,55,0.22) 0%, rgba(5,5,5,0) 58%), #050505" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-8">
            <SectionLabel withLine>Selected Work</SectionLabel>
          </motion.div>
          <h2 className="font-bold leading-[0.88] tracking-[-0.02em] text-[#F5F5F5]"
            style={{ fontFamily: DISPLAY, fontSize: "clamp(2.375rem, 5.625vw, 5.625rem)" }}>
            <TextReveal text="Case studies." delay={0.05} />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map((slot, i) => (
            <motion.div
              key={slot.index}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-white/[0.06] overflow-hidden"
              style={{ background: "#080808" }}
            >
              {/* Animated diagonal shimmer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3.5, delay: i * 0.6, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-1/3"
                  style={{ background: "linear-gradient(105deg, transparent 30%, rgba(14,143,85,0.06) 50%, transparent 70%)" }}
                />
              </div>

              <div className="p-8 md:p-10 flex flex-col" style={{ minHeight: "280px" }}>
                {/* Top row */}
                <div className="flex items-start justify-between mb-auto">
                  <span className="text-[10px] text-[#2A2A2A] tracking-[0.25em]" style={{ fontFamily: MONO }}>{slot.index}</span>
                  <div className="flex gap-1.5">
                    {slot.platforms.map((p) => (
                      <span key={p} className="text-[9px] text-[#2A2A2A] border border-white/[0.05] px-2 py-1 tracking-[0.08em]" style={{ fontFamily: MONO }}>{p}</span>
                    ))}
                  </div>
                </div>

                {/* Center badge */}
                <div className="flex flex-col items-start justify-end pt-16">
                  <div className="inline-flex items-center gap-2.5 border border-[#0E8F55]/30 px-4 py-2 mb-5">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#0E8F55]"
                    />
                    <span className="text-[10px] text-[#0E8F55] tracking-[0.28em] uppercase" style={{ fontFamily: MONO }}>Announcing Soon</span>
                  </div>
                  <p className="text-[#2A2A2A] text-[12px] leading-[1.6] max-w-[220px]" style={{ fontFamily: BODY }}>
                    Details on this project will be shared when we are cleared to talk about it.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection({ onContact }: { onContact: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden border-t border-white/[0.05]"
      style={{ background: "radial-gradient(ellipse 110% 90% at 50% 60%, rgba(14,105,60,0.36) 0%, rgba(5,5,5,0) 62%), #050505" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(to right,rgba(245,245,245,0.018) 1px,transparent 1px),linear-gradient(to bottom,rgba(245,245,245,0.018) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" aria-hidden>
        <span className="font-black text-white select-none" style={{ fontFamily: DISPLAY, fontSize: "clamp(8rem,22vw,28rem)", opacity: 0.018, letterSpacing: "-0.04em", lineHeight: 1 }}>
          SHIP
        </span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} className="mb-10">
          <SectionLabel withLine>Ready to Ship</SectionLabel>
        </motion.div>

        <h2 className="font-bold leading-[0.86] tracking-[-0.02em] text-[#F5F5F5] mb-10"
          style={{ fontFamily: DISPLAY, fontSize: "clamp(2.625rem, 6.625vw, 6.625rem)" }}>
          <div style={{ overflow: "hidden" }}>
            <TextReveal text="let's ship" delay={0.05} />
          </div>
          <div style={{ overflow: "hidden" }}>
            <TextReveal text="your " delay={0.2} />
            <span className="relative inline-block">
              <TextReveal text="game." className="text-[#0E8F55]" delay={0.32} />
            </span>
          </div>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#555555] mb-14 max-w-[360px] mx-auto leading-[1.75]" style={{ fontFamily: BODY, fontSize: "clamp(0.906rem, 1.1875vw, 1.1875rem)" }}
        >
          Tell us about your project. We respond within 24 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className="group bg-[#0E8F55] text-[#F5F5F5] px-10 py-5 text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-[#0b7a49] transition-colors duration-300 flex items-center gap-4"
            style={{ fontFamily: MONO }}
            onClick={onContact}
          >
            Get In Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <line x1="0" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.2" />
              <polyline points="7,2 12,7 7,12" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
          <button
            className="border border-white/[0.12] text-[#888888] px-10 py-5 text-[12px] tracking-[0.2em] uppercase font-bold hover:border-white/25 hover:text-[#F5F5F5] transition-all duration-300"
            style={{ fontFamily: MONO }}
          >
            View Our Work
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onContact }: { onContact: () => void }) {
  const navLinks = [
    { label: "Studio",   href: "#studio" },
    { label: "Process",  href: "#process" },
    { label: "Services", href: "#services" },
    { label: "Work",     href: "#work" },
  ];

  return (
    <footer className="border-t border-white/[0.05] py-14" style={{ background: "radial-gradient(ellipse 80% 120% at 50% 100%, rgba(14,90,52,0.22) 0%, #050505 55%), #050505" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Top row */}
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-10 md:gap-20 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <img src={logoMark} alt="Aranya Interactive mark" className="w-7 h-7 object-contain opacity-80" />
              <div className="flex items-baseline gap-2">
                <span className="text-[19px] font-bold tracking-tight text-[#F5F5F5]" style={{ fontFamily: DISPLAY }}>ARANYA</span>
                <span className="text-[10px] tracking-[0.22em] text-[#444444]" style={{ fontFamily: MONO }}>INTERACTIVE</span>
              </div>
            </div>
            <div className="text-[11px] text-[#333333] tracking-[0.15em] uppercase mb-4" style={{ fontFamily: MONO }}>Console-First Development</div>
            <p className="text-[#3A3A3A] text-[12px] leading-[1.7] max-w-[260px]" style={{ fontFamily: BODY }}>
              Porting, optimization, certification, and co-development for PlayStation, Xbox, and Nintendo Switch.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-[10px] text-[#2A2A2A] tracking-[0.25em] uppercase mb-4" style={{ fontFamily: MONO }}>Navigate</div>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[12px] text-[#444444] hover:text-[#888888] transition-colors duration-300 tracking-[0.15em] uppercase"
                  style={{ fontFamily: MONO, textDecoration: "none" }}
                  onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }); }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] text-[#2A2A2A] tracking-[0.25em] uppercase mb-4" style={{ fontFamily: MONO }}>Contact</div>
            <div className="flex flex-col gap-3">
              <a
                href="https://linkedin.com/company/aranya-interactive"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[12px] text-[#444444] hover:text-[#0E8F55] transition-colors duration-300 tracking-[0.05em]"
                style={{ fontFamily: MONO, textDecoration: "none" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="mailto:hello@aranyainteractive.com"
                className="flex items-center gap-2.5 text-[12px] text-[#444444] hover:text-[#0E8F55] transition-colors duration-300 tracking-[0.05em]"
                style={{ fontFamily: MONO, textDecoration: "none" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                hello@aranyainteractive.com
              </a>
              <button
                onClick={onContact}
                className="mt-1 text-[11px] text-[#0E8F55] tracking-[0.2em] uppercase hover:text-[#0b7a49] transition-colors duration-300 text-left"
                style={{ fontFamily: MONO }}
              >
                Start a Project →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-[10px] text-[#2A2A2A] tracking-[0.15em]" style={{ fontFamily: MONO }}>© 2025 Aranya Interactive. All rights reserved.</div>
          <div className="text-[10px] text-[#2A2A2A] tracking-[0.15em]" style={{ fontFamily: MONO }}>PlayStation · Xbox · Nintendo Switch</div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <div className="min-h-screen" style={{ fontFamily: BODY, background: "#050505" }}>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <Navbar onContact={openContact} />
      <HeroSection onContact={openContact} />
      <WhoWeAreSection />
      <ProcessSection />
      <ServicesSection />
      <CaseStudiesSection />
      <CTASection onContact={openContact} />
      <Footer onContact={openContact} />
    </div>
  );
}
