"use client"

import InteractiveStats from "@/components/interactive-stats"
import PricingSection from "@/components/pricing"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"
import { Mail, MapPin, Phone, Twitter, Github, Linkedin, Sparkles } from "lucide-react"

const MeshGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <g filter="url(#goo)">
          <circle cx="20" cy="30" r="20" fill="url(#grad1)">
            <animate attributeName="cx" values="20;80;50;20" dur="20s" repeatCount="indefinite" />
            <animate attributeName="cy" values="30;60;80;30" dur="20s" repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy="70" r="25" fill="url(#grad2)">
            <animate attributeName="cx" values="80;30;60;80" dur="25s" repeatCount="indefinite" />
            <animate attributeName="cy" values="70;20;50;70" dur="25s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r="18" fill="#f97316" opacity="0.6">
            <animate attributeName="cx" values="50;70;30;50" dur="18s" repeatCount="indefinite" />
            <animate attributeName="cy" values="50;80;20;50" dur="18s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  )
}

const NoiseOverlay = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

const FloatingShapes = () => {
  const shapes = [
    { type: "ring", size: 80, x: 10, y: 20, duration: 25, delay: 0 },
    { type: "ring", size: 60, x: 85, y: 60, duration: 20, delay: 2 },
    { type: "square", size: 40, x: 75, y: 15, duration: 30, delay: 1 },
    { type: "square", size: 30, x: 20, y: 75, duration: 22, delay: 3 },
    { type: "triangle", size: 50, x: 60, y: 80, duration: 28, delay: 0.5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            animation: `float-shape ${shape.duration}s ease-in-out infinite`,
            animationDelay: `${shape.delay}s`,
          }}
        >
          {shape.type === "ring" && (
            <div className="rounded-full border border-white/10" style={{ width: shape.size, height: shape.size }} />
          )}
          {shape.type === "square" && (
            <div className="border border-white/10 rotate-45" style={{ width: shape.size, height: shape.size }} />
          )}
          {shape.type === "triangle" && (
            <div
              className="border-l border-b border-white/10 rotate-45"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
        </div>
      ))}
      <style jsx>{`
        @keyframes float-shape {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}

const SplitTextReveal = ({ children, className = "", delay = 0 }) => {
  const [revealed, setRevealed] = useState(false)
  const words = children.split(" ")

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <span
            className="inline-block transition-all duration-700 ease-out"
            style={{
              transform: revealed ? "translateY(0)" : "translateY(120%)",
              transitionDelay: `${i * 80}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

const MagneticWrapper = ({ children, className = "" }) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

const MarqueeStrip = () => {
  const items = [
    "AI Background Removal",
    "Smart Retouching",
    "One-Click Enhance",
    "Batch Processing",
    "4K Export",
    "Real-time Preview",
  ]

  return (
    <div className="w-full overflow-hidden py-6 border-y border-white/5 bg-white/[0.02]">
      <div className="flex animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8 mx-8 whitespace-nowrap">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">{item}</span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}

const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setStyle({
      transform: `perspective(1000px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) scale3d(1.02, 1.02, 1.02)`,
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(249, 115, 22, 0.15), transparent 50%)`,
    })
  }, [])

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
      background: "transparent",
    })
  }

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-300 ease-out ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

const FeaturePill = ({ icon, text, index }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200 + index * 100)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <Link href="/dashboard">
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-white/20 cursor-pointer ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="text-lg">{icon}</span>
        <span className="text-sm text-gray-300">{text}</span>
      </div>
    </Link>
  )
}

const HeroSection = () => {
  const [mounted, setMounted] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const slides = [
    { before: "Original", after: "Enhanced", color: "from-orange-500 to-pink-500" },
    { before: "Raw", after: "Processed", color: "from-cyan-500 to-violet-500" },
    { before: "Draft", after: "Final", color: "from-emerald-500 to-teal-500" },
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      <MeshGradient />
      <NoiseOverlay />
      <FloatingShapes />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Eyebrow Badge */}
        <div
          className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-slate-900 bg-gradient-to-br from-orange-400 to-pink-500"
                style={{ zIndex: 3 - i }}
              />
            ))}
          </div>
          <span className="text-sm text-gray-300">Trusted by 50,000+ creators worldwide</span>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 text-orange-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-400 ml-1">4.9</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-8">
          <div className="overflow-hidden">
            <SplitTextReveal className="text-white" delay={200}>
              Edit Photos
            </SplitTextReveal>
          </div>
          <div className="overflow-hidden mt-2">
            <SplitTextReveal
              className="bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 bg-clip-text text-transparent"
              delay={500}
            >
              Like Magic
            </SplitTextReveal>
          </div>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Professional-grade AI editing tools that transform your photos in seconds. No experience required.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <MagneticWrapper>
            <Link href="/dashboard">
              <Button
                variant="primary"
                size="xl"
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 border-0 shadow-lg shadow-orange-500/25"
              >
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  Start Creating — It's Free
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Button>
            </Link>
          </MagneticWrapper>

          <MagneticWrapper>
            <Button variant="glass" size="xl" className="group border-white/10 hover:border-white/20 hover:bg-white/5">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                See It In Action
              </span>
            </Button>
          </MagneticWrapper>
        </div>

        {/* Feature Pills */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-20 transition-all duration-1000 delay-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          <FeaturePill icon="🎨" text="AI Enhancement" index={0} />
          <FeaturePill icon="✂️" text="Smart Crop" index={1} />
          <FeaturePill icon="🪄" text="Background Removal" index={2} />
          <FeaturePill icon="⚡" text="Batch Edit" index={3} />
        </div>

        {/* Interactive Demo Card */}
        <div
          className={`transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <TiltCard className="w-full max-w-4xl mx-auto">
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl p-2 overflow-hidden">
              {/* Animated Border Glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-50"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.3), transparent)",
                  animation: "border-glow 3s ease-in-out infinite",
                }}
              />

              <div className="relative rounded-2xl bg-slate-950/90 overflow-hidden">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500 hover:brightness-125 transition-all cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500 hover:brightness-125 transition-all cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-green-500 hover:brightness-125 transition-all cursor-pointer" />
                    </div>
                    <div className="h-6 w-px bg-white/10" />
                    <div className="flex gap-1">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveSlide(i)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeSlide === i ? "bg-orange-500 w-6" : "bg-white/20 hover:bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-mono">visionary_project.vs</span>
                    <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                      Auto-saved
                    </div>
                  </div>
                </div>

                {/* Main Canvas Area */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {slides.map((slide, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-all duration-700 ${
                        activeSlide === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
                      }`}
                    >
                      {/* Before/After Split View */}
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 bg-slate-800 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-700/50 flex items-center justify-center border border-white/5">
                                <svg
                                  className="w-10 h-10 text-gray-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                              <span className="text-gray-500 font-medium">{slide.before}</span>
                            </div>
                          </div>
                        </div>
                        <div className={`w-1/2 bg-gradient-to-br ${slide.color} relative overflow-hidden`}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                <svg
                                  className="w-10 h-10 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                  />
                                </svg>
                              </div>
                              <span className="text-white font-semibold">{slide.after}</span>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30 -translate-x-1/2 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center cursor-ew-resize">
                            <svg
                              className="w-5 h-5 text-slate-900"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Processing Overlay Animation */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(249, 115, 22, 0.1) 50%, transparent 100%)",
                      animation: "scan 2s ease-in-out infinite",
                    }}
                  />
                </div>

                {/* Bottom Toolbar */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    {["Layers", "Adjust", "Effects", "Export"].map((tool, i) => (
                      <button
                        key={tool}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">100%</span>
                    <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>

      <style jsx>{`
        @keyframes border-glow {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes scan {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

const EditorGridOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Crosshair center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-40 h-40 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-orange-500/40 rounded-full" />
        </div>
      </div>
      {/* Corner crop marks */}
      {[
        { pos: "top-8 left-8", rotate: "0" },
        { pos: "top-8 right-8", rotate: "90" },
        { pos: "bottom-8 right-8", rotate: "180" },
        { pos: "bottom-8 left-8", rotate: "270" },
      ].map((corner, i) => (
        <div key={i} className={`absolute ${corner.pos}`} style={{ transform: `rotate(${corner.rotate}deg)` }}>
          <div className="w-8 h-px bg-orange-500/20" />
          <div className="w-px h-8 bg-orange-500/20" />
        </div>
      ))}
      {/* Animated scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        style={{ animation: "scanVertical 4s ease-in-out infinite" }}
      />
      <style jsx>{`
        @keyframes scanVertical {
          0%, 100% { top: 10%; opacity: 0; }
          50% { top: 90%; opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const LensFlareEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)",
          top: "20%",
          right: "-10%",
          animation: "flareFloat 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
          bottom: "10%",
          left: "-5%",
          animation: "flareFloat 10s ease-in-out infinite reverse",
        }}
      />
      {/* Hexagonal lens artifacts */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="none"
            stroke="url(#flareGrad)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="flareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <style jsx>{`
        @keyframes flareFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}

const ProToolsSection = () => {
  const [visible, setVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(null)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const sectionRef = useRef(null)

  const tools = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Instant Upscale",
      desc: "Transform any image to stunning 8K resolution using neural networks",
      tag: "AI",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      stat: "8x",
      statLabel: "Resolution",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      title: "Magic Eraser",
      desc: "Remove unwanted objects and let AI seamlessly reconstruct the scene",
      tag: "HOT",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
      stat: "1s",
      statLabel: "Process",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
      title: "Shadow Master",
      desc: "Intelligently adjust shadows and highlights with one-click presets",
      tag: "NEW",
      gradient: "from-violet-500 via-purple-500 to-indigo-500",
      stat: "50+",
      statLabel: "Presets",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      title: "Color DNA",
      desc: "Extract and apply color grading from any reference image instantly",
      tag: "AI",
      gradient: "from-cyan-500 via-teal-500 to-emerald-500",
      stat: "∞",
      statLabel: "Styles",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Face Perfect",
      desc: "AI-powered portrait retouching that keeps skin texture natural",
      tag: "PRO",
      gradient: "from-pink-500 via-rose-400 to-orange-400",
      stat: "97%",
      statLabel: "Accuracy",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Sky Replace",
      desc: "Swap skies with 100+ cinematic options - golden hour to northern lights",
      tag: "NEW",
      gradient: "from-blue-500 via-indigo-500 to-violet-500",
      stat: "100+",
      statLabel: "Skies",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-32 relative overflow-hidden">
      <NoiseOverlay />

      {/* Aperture Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="10"
              x2="100"
              y2="190"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-white"
              transform={`rotate(${i * 22.5} 100 100)`}
            />
          ))}
        </svg>
      </div>

      {/* Animated Focus Points */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "15%", y: "25%", delay: 0 },
          { x: "85%", y: "20%", delay: 1.5 },
          { x: "75%", y: "75%", delay: 0.8 },
          { x: "20%", y: "80%", delay: 2 },
        ].map((point, i) => (
          <div key={i} className="absolute" style={{ left: point.x, top: point.y, animationDelay: `${point.delay}s` }}>
            <div className="relative">
              <div className="w-6 h-6 border border-orange-500/30 rotate-45 animate-pulse" />
              <div
                className="absolute inset-0 w-6 h-6 border border-orange-500/20 rotate-45 scale-150 animate-ping"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Exposure Meter Decoration - Left Side */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-1 opacity-20">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${i === 7 ? "w-8 bg-orange-500" : i >= 5 && i <= 9 ? "w-6 bg-white/50" : "w-4 bg-white/30"}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
        <span className="text-[10px] text-white/40 font-mono mt-2 rotate-90">EV</span>
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-white" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-white" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* Viewfinder Frame Badge */}
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-white/[0.08] to-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">REC</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-sm font-medium text-gray-300">Studio Tools v3.0</span>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400">LIVE</span>
            </div>
          </div>

          {/* Main Title with Glitch Effect */}
          <h2
            className={`text-4xl md:text-6xl lg:text-8xl font-black mb-8 leading-[0.95] transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block text-white mb-2">Master Your</span>
            <span className="relative inline-block">
              <span className="relative">
                <span className="bg-gradient-to-r from-orange-400 via-rose-500 to-violet-500 bg-clip-text text-transparent">
                  Creative Flow
                </span>
                {/* Animated underline */}
                <svg className="absolute -bottom-4 left-0 w-full h-4 overflow-visible" viewBox="0 0 300 20">
                  <path
                    d="M0 10 Q 75 0, 150 10 T 300 10"
                    fill="none"
                    stroke="url(#flow-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 400,
                      strokeDashoffset: visible ? 0 : 400,
                      transition: "stroke-dashoffset 1.5s ease-out 0.5s",
                    }}
                  />
                  <defs>
                    <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="50%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </span>
          </h2>

          <p
            className={`text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Six powerful tools. One seamless workflow. Everything a modern creator needs to go from concept to
            masterpiece.
          </p>
        </div>

        {/* Tools Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <div
              key={i}
              className={`group relative transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              } ${i === 0 || i === 5 ? "md:col-span-1" : ""}`}
              style={{ transitionDelay: `${i * 120}ms` }}
              onMouseEnter={() => {
                setActiveCard(i)
                setHoveredFeature(i)
              }}
              onMouseLeave={() => {
                setActiveCard(null)
                setHoveredFeature(null)
              }}
            >
              <div
                className={`relative h-full p-6 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                  activeCard === i
                    ? "bg-white/[0.1] border-white/30 scale-[1.02] shadow-2xl shadow-black/20"
                    : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15"
                }`}
              >
                {/* Animated gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} transition-opacity duration-700 ${
                    activeCard === i ? "opacity-10" : "opacity-0"
                  }`}
                />

                {/* Corner brackets decoration */}
                <div
                  className={`absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 transition-all duration-500 ${activeCard === i ? "border-orange-500/60" : "border-white/10"}`}
                />
                <div
                  className={`absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 transition-all duration-500 ${activeCard === i ? "border-orange-500/60" : "border-white/10"}`}
                />
                <div
                  className={`absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 transition-all duration-500 ${activeCard === i ? "border-pink-500/60" : "border-white/10"}`}
                />
                <div
                  className={`absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 transition-all duration-500 ${activeCard === i ? "border-pink-500/60" : "border-white/10"}`}
                />

                {/* Scan line animation on hover */}
                {activeCard === i && (
                  <div
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
                    style={{ animation: "scanDown 1.5s ease-in-out infinite" }}
                  />
                )}

                <div className="relative z-10">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`relative p-4 rounded-2xl bg-gradient-to-br ${tool.gradient} transition-all duration-500 ${
                        activeCard === i ? "scale-110 shadow-lg" : ""
                      }`}
                      style={{
                        boxShadow:
                          activeCard === i
                            ? `0 8px 32px -8px ${tool.gradient.includes("orange") ? "rgba(249,115,22,0.4)" : tool.gradient.includes("pink") ? "rgba(236,72,153,0.4)" : "rgba(139,92,246,0.4)"}`
                            : "none",
                      }}
                    >
                      <div className="text-white">{tool.icon}</div>
                      {/* Pulse ring */}
                      {activeCard === i && (
                        <div
                          className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-white"
                          style={{ animationDuration: "1.5s" }}
                        />
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 ${
                          tool.tag === "AI"
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : tool.tag === "PRO"
                              ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                              : tool.tag === "HOT"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {tool.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`text-xl font-bold mb-3 transition-all duration-500 ${activeCard === i ? "text-white" : "text-gray-200"}`}
                  >
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{tool.desc}</p>

                  {/* Stats row */}
                  <div
                    className={`flex items-center justify-between pt-4 border-t border-white/5 transition-all duration-500 ${activeCard === i ? "border-white/10" : ""}`}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-2xl font-black bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent`}
                      >
                        {tool.stat}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">{tool.statLabel}</span>
                    </div>
                    <Link href="/dashboard">
                      <div
                        className={`flex items-center gap-2 text-sm font-medium transition-all duration-500 cursor-pointer hover:text-orange-300 ${
                          activeCard === i ? "opacity-100 translate-x-0 text-orange-400" : "opacity-0 translate-x-4"
                        }`}
                      >
                        Try it
                        <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Camera Info Bar */}
        <div
          className={`mt-16 flex justify-center transition-all duration-1000 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-orange-500/50 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border border-orange-500/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                </div>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Focus Mode</div>
                <div className="text-sm font-medium text-white">Auto Tracking</div>
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="text-2xl font-mono font-bold text-white">f/1.8</div>
              <div className="text-xs text-gray-500">Aperture</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="text-2xl font-mono font-bold text-orange-400">ISO 100</div>
              <div className="text-xs text-gray-500">Sensitivity</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanDown {
          0%, 100% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  )
}

const FinalCTASection = () => {
  const [visible, setVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [counter, setCounter] = useState(0)
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          // Start counter animation
          let count = 0
          const interval = setInterval(() => {
            count += 1847
            if (count >= 50000) {
              setCounter(50000)
              clearInterval(interval)
            } else {
              setCounter(count)
            }
          }, 50)
          return () => clearInterval(interval)
        }
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <section ref={sectionRef} className="py-32 md:py-40 relative overflow-hidden">
      <NoiseOverlay />

      {/* Cinematic Letterbox Effect */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Animated Film Grain Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px"
            style={{
              top: `${10 + i * 12}%`,
              background: `linear-gradient(90deg, transparent, rgba(249,115,22,${0.05 + i * 0.02}), transparent)`,
              animation: `filmLine ${6 + i}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Large Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)",
            top: "-20%",
            right: "-10%",
            animation: "orbFloat 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
            bottom: "-15%",
            left: "-5%",
            animation: "orbFloat 18s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Viewfinder Corner Marks */}
      <div className="absolute inset-8 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-white/10" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-white/10" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-white/10" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white/10" />
        {/* Center crosshair */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-px bg-white/10" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-px h-8 bg-white/10" />
        </div>
      </div>

      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6" onMouseMove={handleMouseMove}>
        {/* Interactive Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out opacity-60"
          style={{
            background: `radial-gradient(ellipse 600px 400px at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.12), transparent)`,
          }}
        />

        {/* Main Content Card */}
        <div
          className={`relative transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="relative p-10 md:p-20 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-2xl overflow-hidden">
            {/* Animated border glow */}
            <div
              className="absolute inset-0 rounded-[2.5rem] opacity-50"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.3) 25%, rgba(236,72,153,0.3) 50%, rgba(139,92,246,0.3) 75%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "borderGlow 4s linear infinite",
              }}
            />

            {/* Inner glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[300, 450, 600, 750].map((size, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-white/[0.03]"
                  style={{
                    width: size,
                    height: size,
                    animation: `ringPulse 6s ease-in-out infinite`,
                    animationDelay: `${i * 0.8}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 text-center">
              {/* Floating Status Pill */}
              <div
                className={`inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 via-pink-500/10 to-violet-500/20 border border-white/10 backdrop-blur-xl mb-10 transition-all duration-700 delay-200 ${
                  visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-50" />
                  </div>
                  <span className="text-sm font-semibold text-emerald-400">{counter.toLocaleString()}+</span>
                </div>
                <div className="w-px h-5 bg-white/20" />
                <span className="text-sm text-gray-300">creators editing right now</span>
              </div>

              {/* Cinematic Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-10 leading-[0.9] tracking-tight">
                <span
                  className={`block transition-all duration-700 delay-300 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                >
                  <span className="text-white">The Future of</span>
                </span>
                <span
                  className={`block mt-3 transition-all duration-700 delay-500 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                >
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-orange-400 via-rose-500 to-violet-500 bg-clip-text text-transparent">
                      Photo Editing
                    </span>
                    {/* Glowing underline */}
                    <div
                      className="absolute -bottom-3 left-0 right-0 h-1.5 rounded-full overflow-hidden"
                      style={{
                        background: "linear-gradient(90deg, #f97316, #ec4899, #8b5cf6)",
                        boxShadow: "0 0 20px rgba(249,115,22,0.5), 0 0 40px rgba(236,72,153,0.3)",
                        transform: visible ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 1s ease-out 0.8s",
                        transformOrigin: "left",
                      }}
                    />
                  </span>
                </span>
                <span
                  className={`block mt-3 transition-all duration-700 delay-700 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                >
                  <span className="text-gray-400">Is Already Here</span>
                </span>
              </h2>

              {/* Subtitle */}
              <p
                className={`text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-900 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Join the revolution. Let AI handle the technical complexity while you focus on what matters most —
                <span className="text-white font-medium"> your creative vision</span>.
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-5 justify-center items-center mb-12 transition-all duration-700 delay-1000 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <MagneticWrapper>
                  <Link href="/dashboard">
                    <Button
                      size="xl"
                      className="group relative overflow-hidden bg-white hover:bg-gray-100 text-slate-900 border-0 px-10 py-7 text-lg font-bold rounded-2xl shadow-2xl shadow-white/20"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Start Creating Free
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </div>
                      </span>
                      {/* Shimmer */}
                      <div
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)" }}
                      />
                    </Button>
                  </Link>
                </MagneticWrapper>

                <MagneticWrapper>
                  <Button
                    size="xl"
                    className="group border-2 border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 px-8 py-7 rounded-2xl backdrop-blur-sm"
                  >
                    <span className="flex items-center gap-3 text-white">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="text-left">
                        <span className="block text-sm text-gray-400">Watch Demo</span>
                        <span className="block font-semibold">See AI in Action</span>
                      </span>
                    </span>
                  </Button>
                </MagneticWrapper>
              </div>

              {/* Trust Badges */}
              <div
                className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-4 transition-all duration-700 delay-1100 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                {[
                  {
                    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                    text: "Bank-level security",
                  },
                  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "Setup in 30 seconds" },
                  {
                    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                    text: "Loved by creators",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes filmLine {
          0% { transform: translateX(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes borderGlow {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.03; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.05); }
        }
      `}</style>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-black border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-t from-orange-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-t from-violet-600/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-violet-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white">
                Visionary<span className="bg-gradient-to-r from-orange-400 to-violet-400 bg-clip-text text-transparent">Studio</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Professional AI-powered photo editing platform designed for creators, designers, and businesses.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-orange-500/50 transition-all group"
              >
                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition-colors" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-orange-500/50 transition-all group"
              >
                <Github className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition-colors" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-orange-500/50 transition-all group"
              >
                <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              {[
                { name: "Features", href: "#features" },
                { name: "Pricing", href: "#pricing" },
                { name: "Dashboard", href: "/dashboard" },
                { name: "API Docs", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-orange-400 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {[
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-orange-400 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Cookie Policy", href: "#" },
                { name: "Security", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-orange-400 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 <span className="text-gray-400 font-medium">Visionary Studio</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span>Made with ❤️ for creators</span>
            <span>•</span>
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Contact Section
const ContactSection = () => {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-600/20 to-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-600/20 to-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Mail className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300">Get In Touch</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Let's Create{" "}
            <span className="bg-gradient-to-r from-orange-400 via-rose-500 to-violet-500 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-violet-600/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-gray-400 text-sm">dhruvilpatel.m@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-violet-600/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <p className="text-gray-400 text-sm">+91 93133 36791</p>
                    <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM IST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-violet-600/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Office</h4>
                    <p className="text-gray-400 text-sm">Ahmedabad</p>
                    <p className="text-gray-400 text-sm">Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-orange-500/10 to-violet-600/10 border border-orange-500/20 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-2">Quick Response</h4>
              <p className="text-sm text-gray-300">
                We typically respond within 24 hours. For urgent matters, please use the phone number above.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 via-rose-500 to-violet-600 hover:from-orange-600 hover:via-rose-600 hover:to-violet-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


const App = () => {
  return (
    <div className="pt-20">
      <HeroSection />
      <MarqueeStrip />
      <InteractiveStats />
      <ProToolsSection />
      <div id="pricing">
        <PricingSection />
      </div>
      <FinalCTASection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
