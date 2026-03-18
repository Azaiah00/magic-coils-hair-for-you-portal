"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle2, Sparkles, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// --- Animation Variants ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
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
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const } 
  }
};

const allGalleryImages = [
  "/assets/img4.png",
  "/assets/img5.png",
  "/assets/img6.png",
  "/assets/img7.png",
  "/assets/img8.png",
  "/assets/img9.png",
  "/assets/new1.png",
  "/assets/new2.png",
  "/assets/new3.png",
  "/assets/new4.png",
  "/assets/new5.png",
  "/assets/new6.png",
  "/assets/new7.png",
];

// Divide images into 5 groups for the 5 windows
const windowGroups = [
  [allGalleryImages[0], allGalleryImages[5], allGalleryImages[10]],
  [allGalleryImages[1], allGalleryImages[6], allGalleryImages[11]],
  [allGalleryImages[2], allGalleryImages[7], allGalleryImages[12]],
  [allGalleryImages[3], allGalleryImages[8], allGalleryImages[0]],
  [allGalleryImages[4], allGalleryImages[9], allGalleryImages[1]],
];

function AutoRotatingWindow({ images, span, delayOffset, onClick }: { images: string[], span: string, delayOffset: number, onClick: (img: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }, delayOffset);
    return () => clearTimeout(timer);
  }, [images.length, delayOffset]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 0.98 }}
      onClick={() => onClick(images[currentIndex])}
      className={`${span} relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden group cursor-pointer`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image 
            src={images[currentIndex]}
            alt="Gallery Image"
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (imgSrc: string) => {
    const index = allGalleryImages.indexOf(imgSrc);
    setLightboxIndex(index !== -1 ? index : 0);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % allGalleryImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + allGalleryImages.length) % allGalleryImages.length);
    }
  };

  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yShapes = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-primary overflow-x-hidden selection:bg-secondary selection:text-black">
      
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Image 
            src="/magic-coils-logo-transparent.png" 
            alt="Magic Coils Logo" 
            width={120} 
            height={40} 
            className="object-contain h-6 sm:h-8 w-auto"
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
          className="group relative flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-tertiary to-blue-900 text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,35,102,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Lock size={14} className="relative z-10 group-hover:text-black transition-colors hidden sm:block" />
          <span className="relative z-10 group-hover:text-black transition-colors">
            <span className="sm:hidden">Portal</span>
            <span className="hidden sm:inline">Client Portal</span>
          </span>
        </motion.button>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 z-10">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8 sm:mb-12 relative"
          >
            <div className="absolute inset-0 bg-secondary/20 blur-[60px] rounded-full scale-150" />
            <Image 
              src="/magic-coils-logo-transparent.png" 
              alt="Magic Coils Logo" 
              width={400} 
              height={200} 
              priority
              className="relative z-10 object-contain drop-shadow-2xl w-[240px] sm:w-[320px] md:w-[400px] h-auto"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUpVariant} className="font-heading text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              The Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-yellow-200 to-secondary italic font-light">Crown</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="text-base sm:text-xl md:text-3xl text-white/70 mb-8 sm:mb-12 font-light max-w-3xl mx-auto leading-relaxed px-2">
              Elevating premium formulations into a <strong className="text-white font-bold">dominant digital authority.</strong>
            </motion.p>
            
            <motion.div variants={fadeUpVariant}>
              <a href="#diagnostic" className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-6 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-secondary to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-black transition-colors">Initiate Diagnostic</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

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
      <section id="diagnostic" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-12 sm:mb-20 flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-secondary" size={24} />
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Phase I</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-white">The Reality</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
                className={`relative p-6 sm:p-10 rounded-3xl backdrop-blur-md border ${card.border} bg-gradient-to-br ${card.color} overflow-hidden group`}
              >
                {card.featured && (
                  <motion.div 
                    variants={pulseGlow}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-tertiary/20 blur-2xl -z-10"
                  />
                )}
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">{card.title}</h3>
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider mb-4 text-white/80">
                  {card.label}
                </div>
                <p className="text-white/70 leading-relaxed text-base sm:text-lg">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Phase II: The Digital Solution Engine */}
      <section id="strategy" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-tertiary/10 to-black pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16 sm:mb-32"
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm block mb-4">Phase II</span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6">The Solution Engine</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
          </motion.div>

          <div className="space-y-20 sm:space-y-40">
            {[
              {
                title: "E-Commerce Architecture",
                desc: "Focus on building a frictionless, luxury web experience with a dynamic hair quiz to increase average order value. Tailored product recommendations convert casual browsers into loyal subscribers.",
                align: "left",
                img: "/assets/ecommerce-preview-new.png",
                link: "https://magiccoils-mock-up-site.netlify.app/"
              },
              {
                title: "The 'Curl Talk' Growth Engine",
                desc: "Extracting virality from live stylist tutorials using hook psychology and dynamic subtitling. We turn your in-person expertise into highly shareable TikTok and Instagram assets.",
                align: "right",
                img: "/assets/img2.png"
              },
              {
                title: "AI-Driven Campaigns",
                desc: "Utilizing high-fidelity AI workflows to place Magic Coils in high-fashion, impossible editorial environments. Elevating the brand aesthetic without the cost of massive studio productions.",
                align: "left",
                img: "/assets/img3.png"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                variants={fadeUpVariant}
                className={`flex flex-col ${feature.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 sm:gap-16`}
              >
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-tertiary/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50" />
                  {feature.link ? (
                    <a href={feature.link} target="_blank" rel="noopener noreferrer" className="relative block aspect-[4/3] bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden cursor-pointer">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay z-10"></div>
                      <Image 
                        src={feature.img}
                        alt={feature.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                        <span className="bg-secondary text-black px-6 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                          View Mock-Up <ArrowRight size={16} />
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="relative aspect-[4/3] bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay z-10"></div>
                      <Image 
                        src={feature.img}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
                <div className="w-full md:w-1/2">
                  <div className="text-secondary font-bold text-4xl sm:text-6xl opacity-20 mb-4 font-heading">0{i + 1}</div>
                  <h3 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">{feature.title}</h3>
                  <p className="text-base sm:text-xl text-white/60 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Phase III: Visual Authority (Image Gallery) */}
      <section id="visuals" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mb-12 sm:mb-20"
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm block mb-4">Phase III</span>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-white">Visual Authority</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] sm:auto-rows-[250px]">
            <AutoRotatingWindow images={windowGroups[0]} span="sm:col-span-2 sm:row-span-2" delayOffset={0} onClick={openLightbox} />
            <AutoRotatingWindow images={windowGroups[1]} span="sm:col-span-2 md:col-span-2" delayOffset={1000} onClick={openLightbox} />
            <AutoRotatingWindow images={windowGroups[2]} span="sm:col-span-1 md:col-span-1" delayOffset={2000} onClick={openLightbox} />
            <AutoRotatingWindow images={windowGroups[3]} span="sm:col-span-1 md:col-span-1" delayOffset={3000} onClick={openLightbox} />
            <AutoRotatingWindow images={windowGroups[4]} span="sm:col-span-2 md:col-span-4" delayOffset={1500} onClick={openLightbox} />
          </div>
        </div>
      </section>

      {/* 6. Phase IV: Brand Development & Growth Proposal */}
      <section id="proposal" className="relative py-20 sm:py-32 md:py-40 px-4 sm:px-6 z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Proposal Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-12 sm:mb-20"
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm block mb-4">Phase IV</span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 sm:mb-8">Brand Development & Growth Proposal</h2>
            <p className="text-white/60 text-base sm:text-lg font-light">for Hair For You / Magic Coils</p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-8 text-sm">
              <span className="text-white/50">Prepared for <strong className="text-white">Antwun</strong>, Hair For You / Magic Coils</span>
              <span className="text-white/50">Prepared by <strong className="text-secondary">Couture House</strong></span>
              <span className="text-white/50">March 17, 2026</span>
            </div>
            <p className="mt-3 sm:mt-4 text-white/40 text-sm">hello@couturehouse.co</p>
          </motion.div>

          {/* Executive Summary */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mb-12 sm:mb-16"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-secondary mb-4 sm:mb-6 uppercase tracking-wider">Executive Summary</h3>
            <p className="text-white/80 leading-relaxed text-base sm:text-lg">
              Magic Coils has the foundation of a premium textured-hair brand: a polished visual identity, a clear product story, and strong creative potential for social-first growth. Couture House proposes a focused partnership that combines a launch-ready online store with daily content creation and digital growth support designed to build awareness and drive product sales.
            </p>
            <p className="text-white/80 leading-relaxed text-base sm:text-lg mt-4 sm:mt-6">
              This proposal is structured to support both direct-to-consumer online sales and long-term trust with stylists, salons, and beauty-conscious customers by creating a consistent content engine and a clean conversion path from Instagram and TikTok to the website.
            </p>
          </motion.div>

          {/* Partnership Objectives */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mb-12 sm:mb-16"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-secondary mb-4 sm:mb-6 uppercase tracking-wider">Partnership Objectives</h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "Launch a branded e-commerce presence for Magic Coils on Shopify or a similar e-commerce platform.",
                "Build daily visibility and product awareness across Instagram and TikTok.",
                "Create premium static and short-form video content that can also support the website.",
                "Funnel social attention toward website visits, product discovery, and purchases.",
                "Strengthen digital infrastructure through SEO, analytics, email support, and commerce platform setup."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={18} />
                  <span className="text-white/80 leading-relaxed text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Structure / Pricing Cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mb-12 sm:mb-20"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-secondary mb-6 sm:mb-8 uppercase tracking-wider">Service Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative p-6 sm:p-8 rounded-2xl bg-white/5 border border-secondary/30 backdrop-blur-sm">
                <div className="text-secondary font-heading text-2xl sm:text-3xl font-bold mb-3">$500</div>
                <h4 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">One-Time Setup</h4>
                <p className="text-white/70 text-sm leading-relaxed">Website build, shop setup, launch-ready e-commerce structure, and digital foundation.</p>
              </div>
              <div className="relative p-6 sm:p-8 rounded-2xl bg-tertiary/20 border border-tertiary/40 backdrop-blur-sm">
                <div className="text-secondary font-heading text-2xl sm:text-3xl font-bold mb-3">$1,000 <span className="text-base sm:text-lg font-normal text-white/60">/mo</span></div>
                <h4 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">Monthly Growth Partnership</h4>
                <p className="text-white/70 text-sm leading-relaxed">Daily content creation and posting, social management, website support, SEO, analytics, and digital growth strategy.</p>
              </div>
            </div>
          </motion.div>

          {/* 1. Website Build & Shop Setup */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mb-12 sm:mb-16"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-4">1. Website Build & Shop Setup</h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-6">
              Couture House will design and launch a branded e-commerce website for Magic Coils on Shopify or a similar e-commerce platform. The objective is to create a clean, premium, conversion-ready storefront that supports both consumer purchases and long-term brand growth.
            </p>
            <h4 className="text-white/90 font-semibold mb-3 text-sm sm:text-base">Included in the one-time setup</h4>
            <ul className="space-y-2 mb-6">
              {[
                "Branded website design aligned with the Magic Coils visual identity.",
                "E-commerce shop setup with foundational product catalog structure.",
                "Product page framework and collection organization.",
                "Payment integration and mobile-responsive layout.",
                "Core pages such as Home, Shop, About, Contact, and supporting brand pages.",
                "Foundational setup for blog, hair quiz, and stylist directory features, to be expanded as product and content details are finalized.",
                "Basic on-page SEO setup and analytics installation.",
                "Foundational TikTok Shop and Instagram Shop coordination where platform eligibility and catalog details are available."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-sm sm:text-base">
                  <span className="text-secondary mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
              <p className="text-secondary font-bold text-xs sm:text-sm uppercase tracking-wider mb-2">Important launch note</p>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Because final product names, SKUs, pricing, and launch details are still being finalized, this portion of the proposal covers the platform build and launch foundation. The final product catalog and any advanced merchandising details will be completed during onboarding as the client finalizes inventory and launch information.
              </p>
            </div>
          </motion.div>

          {/* 2. Monthly Brand Growth Partnership */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mb-12 sm:mb-16"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-4">2. Monthly Brand Growth Partnership</h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">For a monthly investment of $1,000, Couture House will provide ongoing creative, social, website, and digital growth support to help Magic Coils build brand awareness and convert attention into sales.</p>
            
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  label: "A. Daily content creation and publishing",
                  items: [
                    "Daily content delivery and posting cadence across Instagram and TikTok.",
                    "Creation of static creatives and short-form video content.",
                    "Product-focused content, campaign-style promotional content, educational content, and lifestyle or brand storytelling content.",
                    "Content can be repurposed for website use where appropriate.",
                    "Creative collaboration is welcomed if the client requests specific content concepts or campaign directions.",
                    "Content production may use newly created assets from Couture House as well as product footage, founder footage, and supporting content shared by the client."
                  ]
                },
                {
                  label: "B. Instagram and TikTok management",
                  items: [
                    "Management of both social platforms.",
                    "Strategic posting to increase awareness, engagement, and brand recognition.",
                    "Organic social strategy focused on directing traffic toward the website and product discovery.",
                    "Routine platform monitoring and account support."
                  ]
                },
                {
                  label: "C. Website support and maintenance",
                  items: [
                    "Ongoing website maintenance.",
                    "Ongoing website update support.",
                    "Use of social content and approved brand assets to support site freshness.",
                    "Monitoring of key website performance indicators."
                  ]
                },
                {
                  label: "D. Digital growth strategy",
                  items: [
                    "SEO strategy and ongoing SEO support for the website.",
                    "Monitoring of website analytics and social performance data.",
                    "Email marketing support, including list growth opportunities and foundational website capture points.",
                    "Support with digital tools that improve business productivity and product visibility.",
                    "Google Business Profile and review strategy support where relevant to the brand's SEO and trust-building goals."
                  ]
                }
              ].map((section, si) => (
                <div key={si}>
                  <h4 className="text-secondary font-bold uppercase tracking-wider mb-3 text-xs sm:text-sm">{section.label}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/80 text-sm sm:text-base">
                        <span className="text-secondary mt-0.5 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What is not included */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mb-12 sm:mb-16 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h4 className="text-white font-bold uppercase tracking-wider mb-3 sm:mb-4 text-sm">What is not included</h4>
            <ul className="space-y-2">
              {[
                "Paid advertising management or media spend.",
                "Product fulfillment, shipping, returns, or customer service.",
                "Final inventory decisions, product manufacturing, or packaging production."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60 text-sm sm:text-base">
                  <span className="text-white/40 mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* How the growth system works */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mb-12 sm:mb-16"
          >
            <h4 className="text-secondary font-bold uppercase tracking-wider mb-6 text-xs sm:text-sm">How the growth system works</h4>
            {/* Desktop flow (horizontal) */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm md:text-base">
              <span className="px-4 py-2 rounded-full bg-tertiary/30 text-white font-medium">Content</span>
              <ArrowRight className="text-secondary shrink-0" size={20} />
              <span className="px-4 py-2 rounded-full bg-tertiary/30 text-white font-medium">Awareness</span>
              <ArrowRight className="text-secondary shrink-0" size={20} />
              <span className="px-4 py-2 rounded-full bg-tertiary/30 text-white font-medium">Website Visit</span>
              <ArrowRight className="text-secondary shrink-0" size={20} />
              <span className="px-4 py-2 rounded-full bg-tertiary/30 text-white font-medium">Product Discovery</span>
              <ArrowRight className="text-secondary shrink-0" size={20} />
              <span className="px-4 py-2 rounded-full bg-secondary/30 text-secondary font-bold">Purchase & Reviews</span>
            </div>
            {/* Mobile flow (vertical) */}
            <div className="flex sm:hidden flex-col items-center gap-2 text-sm">
              {["Content", "Awareness", "Website Visit", "Product Discovery"].map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="px-5 py-2 rounded-full bg-tertiary/30 text-white font-medium text-center">{step}</span>
                  <ArrowRight className="text-secondary rotate-90 my-1" size={16} />
                </div>
              ))}
              <span className="px-5 py-2 rounded-full bg-secondary/30 text-secondary font-bold text-center">Purchase & Reviews</span>
            </div>
            <p className="text-white/60 text-center mt-6 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              The monthly partnership is designed to support the full customer journey: attract attention with high-quality content, guide users to the website, improve product discovery, and strengthen the foundation for repeat purchases and reviews.
            </p>
          </motion.div>

          {/* Collaboration, Term & Investment */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="mb-12 sm:mb-16"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Collaboration, Term & Investment</h3>
            
            <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-10">
              <div>
                <h4 className="text-secondary font-bold uppercase tracking-wider mb-3 text-xs sm:text-sm">Collaboration expectations</h4>
                <ul className="space-y-2">
                  {[
                    "Hair For You / Magic Coils will retain responsibility for order fulfillment, shipping, customer service, and final product information.",
                    "Antwun and the Magic Coils team may share product information, media assets, campaign ideas, and feedback to support content creation and website growth.",
                    "Couture House will provide the creative and digital support outlined in this proposal and collaborate with the client on content suggestions and brand direction."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80 text-sm sm:text-base">
                      <span className="text-secondary mt-0.5 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-secondary font-bold uppercase tracking-wider mb-3 text-xs sm:text-sm">Term</h4>
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">This partnership is structured with a 3-month initial term, followed by month-to-month continuation thereafter. This provides enough time to implement the platform, establish the content rhythm, and evaluate the early impact of the partnership.</p>
              </div>

              <div>
                <h4 className="text-secondary font-bold uppercase tracking-wider mb-3 text-xs sm:text-sm">Reporting</h4>
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">Couture House will provide a monthly performance review covering social activity, top-performing content, website traffic observations, and growth opportunities for the next cycle.</p>
              </div>
            </div>

            {/* Investment Summary Table */}
            <div className="overflow-hidden rounded-2xl border border-white/10 mb-6 sm:mb-8">
              <div className="bg-tertiary/30 px-4 sm:px-6 py-3 sm:py-4">
                <h4 className="font-heading text-base sm:text-lg font-bold text-white">Investment Summary</h4>
              </div>
              <div className="divide-y divide-white/10">
                <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-white/5 gap-4">
                  <span className="text-white/80 text-sm sm:text-base">Website build & shop setup (one-time)</span>
                  <span className="text-secondary font-bold shrink-0">$500</span>
                </div>
                <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-white/5 gap-4">
                  <span className="text-white/80 text-sm sm:text-base">Monthly brand growth partnership</span>
                  <span className="text-secondary font-bold shrink-0">$1,000</span>
                </div>
                <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-white/5 gap-4">
                  <span className="text-white/60 text-sm sm:text-base">Paid media buying / ad spend</span>
                  <span className="text-white/40 text-xs sm:text-sm shrink-0">Not included</span>
                </div>
              </div>
            </div>

            <h4 className="text-secondary font-bold uppercase tracking-wider mb-3 sm:mb-4 text-xs sm:text-sm">Next steps</h4>
            <ul className="space-y-2 mb-6 sm:mb-8">
              {[
                "Approve the proposal and confirm the partnership start date.",
                "Complete onboarding for website platform access, brand assets, and product information.",
                "Finalize launch priorities for the website, product catalog, and social content workflow."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-sm sm:text-base">
                  <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-white/70 leading-relaxed mb-8 sm:mb-12 italic text-sm sm:text-base">
              Couture House appreciates the opportunity to support the launch and growth of Magic Coils and looks forward to helping build a premium digital presence that supports both product sales and long-term brand credibility.
            </p>

            <div className="text-center">
              <button className="group relative w-full sm:w-auto bg-white text-black px-8 sm:px-16 py-4 sm:py-6 rounded-full text-base sm:text-xl font-bold overflow-hidden transition-transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-black transition-colors flex items-center justify-center gap-3">
                  Initiate Partnership <ArrowRight size={20} />
                </span>
              </button>
            </div>
          </motion.div>

          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center text-white/40 text-xs sm:text-sm italic"
          >
            Couture House appreciates the opportunity to support the launch and growth of Magic Coils and looks forward to helping build a premium digital presence that supports both product sales and long-term brand credibility.
          </motion.p>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="relative z-10 bg-black py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10 text-center">
        <Image 
          src="/magic-coils-logo-transparent.png" 
          alt="Magic Coils" 
          width={100} 
          height={40} 
          className="mx-auto mb-4 sm:mb-6 opacity-50"
        />
        <p className="text-white/40 text-xs sm:text-sm font-light tracking-widest uppercase">
          © 2026 Couture House Co. | Confidential Service Blueprint
        </p>
      </footer>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 bg-black/20 p-2 rounded-full backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            >
              <X size={32} />
            </button>

            <button 
              className="absolute left-4 sm:left-8 text-white/50 hover:text-white transition-colors z-50 bg-black/20 p-3 rounded-full backdrop-blur-md"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>

            <motion.div 
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={allGalleryImages[lightboxIndex]}
                alt="Gallery Preview"
                fill
                className="object-contain"
                quality={100}
              />
            </motion.div>

            <button 
              className="absolute right-4 sm:right-8 text-white/50 hover:text-white transition-colors z-50 bg-black/20 p-3 rounded-full backdrop-blur-md"
              onClick={nextImage}
            >
              <ChevronRight size={32} />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 tracking-widest text-sm font-medium">
              {lightboxIndex + 1} / {allGalleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
