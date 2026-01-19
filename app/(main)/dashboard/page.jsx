"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, ImageIcon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useConvexQuery } from "@/hooks/use-convex-query"
import { api } from "@/convex/_generated/api"
import { NewProjectModal } from "./_components/new-project-modal"
import { ProjectGrid } from "./_components/project-grid"

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

const GridLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
      <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white" />
      <div className="absolute top-1/3 left-0 right-0 h-px bg-white" />
      <div className="absolute top-2/3 left-0 right-0 h-px bg-white" />
    </div>
  )
}

const FocusPoints = () => {
  const points = [
    { x: "15%", y: "25%", delay: 0 },
    { x: "85%", y: "20%", delay: 1.5 },
    { x: "75%", y: "75%", delay: 0.8 },
    { x: "20%", y: "80%", delay: 2 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {points.map((point, i) => (
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
  )
}

export default function DashboardPage() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Get user's projects
  const { data: projects, isLoading } = useConvexQuery(api.projects.getUserProjects)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-16 relative overflow-hidden">
      <MeshGradient />
      <NoiseOverlay />
      <FloatingShapes />
      <GridLines />
      <FocusPoints />

      <div className="container mx-auto px-6 relative z-10">
        {/* Dashboard Header - Enhanced with Home page styling */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <div
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 transition-all duration-1000 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Dashboard</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <span className="text-sm text-gray-300">Welcome back</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              <SplitTextReveal className="text-white" delay={200}>
                Your Projects
              </SplitTextReveal>
            </h1>
            <p
              className={`text-lg text-white/70 max-w-lg transition-all duration-1000 delay-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Create and manage your AI-powered image designs
            </p>
          </div>

          <MagneticWrapper>
            <Button
              onClick={() => setShowNewProjectModal(true)}
              className={`group relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 border-0 shadow-lg shadow-orange-500/25 px-8 py-6 text-lg font-semibold transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
                New Project
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Button>
          </MagneticWrapper>
        </div>

        {/* Projects Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-2 border-orange-500/20 border-t-orange-500"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-orange-500/10"></div>
            </div>
            <span className="text-sm text-gray-500 font-mono animate-pulse">Loading projects...</span>
          </div>
        ) : projects && projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <EmptyState onCreateProject={() => setShowNewProjectModal(true)} mounted={mounted} />
        )}

        {/* New Project Modal */}
        <NewProjectModal isOpen={showNewProjectModal} onClose={() => setShowNewProjectModal(false)} />
      </div>
    </div>
  )
}

function EmptyState({ onCreateProject, mounted }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`relative flex flex-col items-center justify-center py-20 text-center transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Decorative card background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm" />
        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-orange-500/30" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-orange-500/30" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-pink-500/30" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-500/30" />
      </div>

      {/* Animated icon container */}
      <div className="relative mb-8">
        {/* Pulsing rings */}
        <div
          className="absolute inset-0 -m-4 rounded-full border border-orange-500/20 animate-ping"
          style={{ animationDuration: "2s" }}
        />
        <div
          className="absolute inset-0 -m-8 rounded-full border border-pink-500/10 animate-ping"
          style={{ animationDuration: "3s" }}
        />

        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-violet-600/20 flex items-center justify-center border border-white/10 backdrop-blur-sm">
          <ImageIcon className="h-14 w-14 text-orange-400" />
        </div>
      </div>

      {/* Title with gradient */}
      <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
        <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
          Create Your First
        </span>
        <br />
        <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 bg-clip-text text-transparent">
          Masterpiece
        </span>
      </h3>

      <p className="text-white/60 mb-10 max-w-md text-lg leading-relaxed">
        Upload an image to start editing with our powerful AI tools, or create a blank canvas to design from scratch.
      </p>

      {/* CTA Button with magnetic effect */}
      <MagneticWrapper>
        <Button
          onClick={onCreateProject}
          className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 border-0 shadow-lg shadow-orange-500/25 px-10 py-7 text-xl font-semibold"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Sparkles className="h-6 w-6 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300" />
            Start Creating
          </span>
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </Button>
      </MagneticWrapper>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {[
          { icon: "🎨", text: "AI Enhancement" },
          { icon: "✂️", text: "Smart Crop" },
          { icon: "🪄", text: "Background Removal" },
          { icon: "⚡", text: "Batch Edit" },
        ].map((feature, i) => (
          <div
            key={i}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-white/20 cursor-pointer ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${800 + i * 100}ms` }}
          >
            <span className="text-lg">{feature.icon}</span>
            <span className="text-sm text-gray-300">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
