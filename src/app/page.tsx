"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

// --- Animation Variants ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const pulseGlow = {
  initial: { opacity: 0.5, scale: 1 },
  animate: { 
    opacity: [0.5, 0.8, 0.5], 
    scale: [1, 1.05, 1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
  }
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yShapes = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-primary overflow-hidden selection:bg-secondary selection:text-black">
      
      {/* --- Animated Background Elements --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: yShapes }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-tertiary/20 blur-[120px] mix-blend-screen"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          style={{ y: yShapes }}
          className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/10 blur-[100px] mix-blend-screen"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* 1. Sticky Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4">
          <Image 
            src="/magic-coils-logo-transparent.png" 
            alt="Magic Coils Logo" 
            width={120} 
            height={40} 
            className="object-contain h-8 w-auto"
          />
          <span className="hidden md:inline text-white/30 font-light">|</span>
          <span className="hidden md:inline font-heading text-sm font-bold text-white tracking-widest uppercase">
            Couture House Co.
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-white/60">
          <a href="#diagnostic" className="hover:text-secondary transition-colors">Diagnostic</a>
          <a href="#strategy" className="hover:text-secondary transition-colors">Strategy</a>
          <a href="#visuals" className="hover:text-secondary transition-colors">Visuals</a>
          <a href="#proposal" className="hover:text-secondary transition-colors">Proposal</a>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-tertiary to-blue-900 text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,35,102,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Lock size={14} className="relative z-10 group-hover:text-black transition-colors" />
          <span className="relative z-10 group-hover:text-black transition-colors">Client Portal</span>
        </motion.button>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-20 z-10">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-12 relative"
          >
            {/* Glowing backdrop for logo */}
            <div className="absolute inset-0 bg-secondary/20 blur-[60px] rounded-full scale-150" />
            <Image 
              src="/magic-coils-logo-transparent.png" 
              alt="Magic Coils Logo" 
              width={400} 
              height={200} 
              priority
              className="relative z-10 object-contain drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUpVariant} className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              The Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-yellow-200 to-secondary italic font-light">Crown</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-xl md:text-3xl text-white/70 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
              Elevating premium formulations into a <strong className="text-white font-bold">dominant digital authority.</strong>
            </motion.p>
            
            <motion.div variants={fadeUpVariant}>
              <a href="#diagnostic" className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full text-lg font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-secondary to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-black transition-colors">Initiate Diagnostic</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* 3. Phase I: The Reality (Diagnostic Assessment) */}
      <section id="diagnostic" className="relative py-32 px-6 z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-20 flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-secondary" size={24} />
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Phase I</span>
            </div>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-white">The Reality</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Cultural Moat",
                label: "Core Strength",
                desc: "Magic Coils has professional-quality formulations that nourish, define, and protect. The live events prove deep community trust among stylists and naturalistas.",
                color: "from-white/5 to-white/0",
                border: "border-white/10"
              },
              {
                title: "The Digital Gap",
                label: "Critical Failure",
                desc: "The current digital packaging limits a luxury product to a localized reach. High-end consumers buy the visual transformation first.",
                color: "from-tertiary/40 to-tertiary/10",
                border: "border-tertiary/50",
                featured: true
              },
              {
                title: "The Pivot",
                label: "Strategic Action",
                desc: "Transition the brand architecture from 'Local Hair Care' to 'An Exclusive E-Commerce Beauty Experience' using engineered social proof.",
                color: "from-secondary/20 to-secondary/5",
                border: "border-secondary/30"
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.8 } }
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative p-10 rounded-3xl backdrop-blur-md border ${card.border} bg-gradient-to-br ${card.color} overflow-hidden group`}
              >
                {card.featured && (
                  <motion.div 
                    variants={pulseGlow}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-tertiary/20 blur-2xl -z-10"
                  />
                )}
                <h3 className="font-heading text-3xl font-bold text-white mb-6">{card.title}</h3>
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-white/80">
                  {card.label}
                </div>
                <p className="text-white/70 leading-relaxed text-lg">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Phase II: The Digital Solution Engine */}
      <section id="strategy" className="relative py-32 px-6 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-tertiary/10 to-black pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-32"
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm block mb-4">Phase II</span>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6">The Solution Engine</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
          </motion.div>

          <div className="space-y-40">
            {[
              {
                title: "E-Commerce Architecture",
                desc: "Focus on building a frictionless, luxury web experience with a dynamic hair quiz to increase average order value. Tailored product recommendations convert casual browsers into loyal subscribers.",
                align: "left"
              },
              {
                title: "The 'Curl Talk' Growth Engine",
                desc: "Extracting virality from live stylist tutorials using hook psychology and dynamic subtitling. We turn your in-person expertise into highly shareable TikTok and Instagram assets.",
                align: "right"
              },
              {
                title: "AI-Driven Campaigns",
                desc: "Utilizing high-fidelity AI workflows to place Magic Coils in high-fashion, impossible editorial environments. Elevating the brand aesthetic without the cost of massive studio productions.",
                align: "left"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                variants={fadeUpVariant}
                className={`flex flex-col ${feature.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}
              >
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-tertiary/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50" />
                  <div className="relative aspect-[4/3] bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="text-white/30 font-heading text-2xl font-light italic"
                    >
                      Visual Asset {i + 1}
                    </motion.div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="text-secondary font-bold text-6xl opacity-20 mb-4 font-heading">0{i + 1}</div>
                  <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{feature.title}</h3>
                  <p className="text-xl text-white/60 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Phase III: Visual Authority (Image Gallery) */}
      <section id="visuals" className="relative py-32 px-6 z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mb-20"
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm block mb-4">Phase III</span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-white">Visual Authority</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            {[
              { span: "md:col-span-2 md:row-span-2", label: "Hero Campaign Shot" },
              { span: "md:col-span-2", label: "Product Texture Close-up" },
              { span: "md:col-span-1", label: "Stylist Action" },
              { span: "md:col-span-1", label: "Before/After" },
              { span: "md:col-span-4", label: "Full Product Lineup Lifestyle" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 0.98 }}
                className={`${item.span} relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 font-medium tracking-widest uppercase text-sm group-hover:text-white/90 transition-colors duration-300 z-20 relative">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Phase IV: Proposed Partnership (The Pitch) */}
      <section id="proposal" className="relative py-40 px-6 z-10 overflow-hidden">
        {/* Massive background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm block mb-4">Phase IV</span>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white">The Partnership</h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="relative p-[1px] rounded-[2.5rem] overflow-hidden"
          >
            {/* Animated rotating border */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--color-secondary)_360deg)] opacity-50"
            />
            
            <div className="relative bg-black/80 backdrop-blur-2xl rounded-[2.4rem] p-10 md:p-16 border border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                <div>
                  <Image 
                    src="/magic-coils-logo-transparent.png" 
                    alt="Magic Coils" 
                    width={200} 
                    height={80} 
                    className="mb-6"
                  />
                  <p className="text-secondary font-bold tracking-widest uppercase text-sm">
                    The E-Commerce & Content Engine
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-6xl font-bold text-white font-heading block mb-2">$[PRICE]</span>
                  <span className="text-white/50 uppercase tracking-widest text-sm font-bold">/ month retainer</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {[
                  "Continuous Webflow/Shopify Optimization",
                  "Dynamic Hair Quiz Management",
                  "Weekly AI-Enhanced Product Photography",
                  "5 High-Converting 'Curl Talk' Videos / Week",
                  "Monthly Algorithmic Intelligence Reporting",
                  "Direct Portal Access for Asset Delivery"
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"
                  >
                    <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={20} />
                    <span className="text-white/80 font-light">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <button className="group relative w-full md:w-auto bg-white text-black px-16 py-6 rounded-full text-xl font-bold overflow-hidden transition-transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 group-hover:text-black transition-colors flex items-center justify-center gap-3">
                    Initiate Partnership <ArrowRight size={24} />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="relative z-10 bg-black py-12 px-6 border-t border-white/10 text-center">
        <Image 
          src="/magic-coils-logo-transparent.png" 
          alt="Magic Coils" 
          width={100} 
          height={40} 
          className="mx-auto mb-6 opacity-50"
        />
        <p className="text-white/40 text-sm font-light tracking-widest uppercase">
          © 2026 Couture House Co. | Confidential Service Blueprint
        </p>
      </footer>
    </main>
  );
}
