"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useConvexQuery } from "@/hooks/use-convex-query"
import { api } from "@/convex/_generated/api"
import { Loader2, Monitor, Sparkles } from "lucide-react"
import { EditorTopBar } from "./_components/editor-topbar"
import { EditorSidebar } from "./_components/editor-sidebar"
import CanvasEditor from "./_components/canvas"
import { CanvasContext } from "@/context/context"
import { RingLoader } from "react-spinners"

function MeshGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="editorBlob1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.15)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0)" />
          </radialGradient>
          <radialGradient id="editorBlob2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(236,72,153,0.12)" />
            <stop offset="100%" stopColor="rgba(236,72,153,0)" />
          </radialGradient>
          <radialGradient id="editorBlob3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.1)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </radialGradient>
        </defs>
        <circle
          cx="20%"
          cy="30%"
          r="400"
          fill="url(#editorBlob1)"
          className="animate-[float_20s_ease-in-out_infinite]"
        />
        <circle
          cx="80%"
          cy="20%"
          r="350"
          fill="url(#editorBlob2)"
          className="animate-[float_25s_ease-in-out_infinite_reverse]"
        />
        <circle
          cx="60%"
          cy="80%"
          r="300"
          fill="url(#editorBlob3)"
          className="animate-[float_22s_ease-in-out_infinite]"
        />
      </svg>
    </div>
  )
}

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

function GridLines() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.03]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  )
}

function FocusPoints() {
  const points = [
    { top: "15%", left: "10%", delay: "0s" },
    { top: "25%", right: "15%", delay: "1s" },
    { bottom: "20%", left: "20%", delay: "2s" },
    { bottom: "30%", right: "10%", delay: "0.5s" },
  ]

  return (
    <div className="pointer-events-none fixed inset-0">
      {points.map((point, i) => (
        <div key={i} className="absolute w-3 h-3" style={{ ...point }}>
          <div
            className="absolute inset-0 border border-orange-500/30 rounded-full animate-ping"
            style={{ animationDelay: point.delay, animationDuration: "3s" }}
          />
          <div className="absolute inset-1 bg-orange-500/20 rounded-full" />
        </div>
      ))}
    </div>
  )
}

function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Ring */}
      <div className="absolute top-[20%] right-[10%] w-16 h-16 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
      {/* Square */}
      <div className="absolute bottom-[25%] left-[8%] w-8 h-8 border border-white/5 rotate-45 animate-[float_15s_ease-in-out_infinite]" />
      {/* Small circle */}
      <div className="absolute top-[60%] right-[20%] w-4 h-4 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full animate-[float_12s_ease-in-out_infinite_reverse]" />
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      <MeshGradient />
      <NoiseOverlay />
      <GridLines />
      <FocusPoints />
      <FloatingShapes />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated rings around loader */}
        <div className="relative">
          <div
            className="absolute -inset-8 border border-orange-500/20 rounded-full animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <div
            className="absolute -inset-4 border border-cyan-500/20 rounded-full animate-ping"
            style={{ animationDuration: "2.5s" }}
          />
          <div className="relative">
            <Loader2
              className="h-10 w-10 animate-spin text-transparent bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text"
              style={{ stroke: "url(#loaderGradient)" }}
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <Loader2 className="h-10 w-10 animate-spin absolute inset-0" style={{ stroke: "url(#loaderGradient)" }} />
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/80 font-medium">Loading Editor</p>
          <p className="text-white/40 text-sm mt-1">Preparing your workspace...</p>
        </div>
      </div>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      <MeshGradient />
      <NoiseOverlay />
      <GridLines />

      <div className="relative z-10 text-center p-8 max-w-md">
        {/* Corner brackets decoration */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-orange-500/30" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-orange-500/30" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-orange-500/30" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-orange-500/30" />

        <div className="relative inline-block mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-slate-800/50 border border-white/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-orange-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-white to-white/70 bg-clip-text mb-3">
          Project Not Found
        </h1>
        <p className="text-white/50">The project you're looking for doesn't exist or you don't have access to it.</p>
      </div>
    </div>
  )
}

function MobileMessage() {
  return (
    <div className="lg:hidden min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <MeshGradient />
      <NoiseOverlay />
      <GridLines />
      <FocusPoints />

      <div className="relative z-10 text-center max-w-md p-8">
        {/* Corner brackets */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-orange-500/40" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-orange-500/40" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-orange-500/40" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-orange-500/40" />

        <div className="relative inline-block mb-6">
          <div
            className="absolute -inset-6 border border-cyan-500/20 rounded-full animate-ping"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute -inset-3 border border-orange-500/20 rounded-full animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <Monitor className="h-10 w-10 text-transparent" style={{ stroke: "url(#iconGradient)" }} />
            <svg width="0" height="0">
              <defs>
                <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <Monitor className="h-10 w-10 absolute" style={{ stroke: "url(#iconGradient)" }} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-white via-white to-white/70 bg-clip-text mb-4">
          Desktop Required
        </h1>
        <p className="text-white/60 text-lg mb-2">This editor is only usable on desktop.</p>
        <p className="text-white/40 text-sm">Please use a larger screen to access the full editing experience.</p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["Full Canvas", "AI Tools", "Pro Features"].map((feature, i) => (
            <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/50">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProcessingOverlay({ message }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative p-8 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        {/* Corner accents */}
        <div className="absolute -top-px -left-px w-8 h-8 border-l-2 border-t-2 border-orange-500/50 rounded-tl-2xl" />
        <div className="absolute -top-px -right-px w-8 h-8 border-r-2 border-t-2 border-orange-500/50 rounded-tr-2xl" />
        <div className="absolute -bottom-px -left-px w-8 h-8 border-l-2 border-b-2 border-orange-500/50 rounded-bl-2xl" />
        <div className="absolute -bottom-px -right-px w-8 h-8 border-r-2 border-b-2 border-orange-500/50 rounded-br-2xl" />

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-pink-500/5 rounded-2xl" />

        <div className="relative flex flex-col items-center gap-5">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
            <RingLoader color="#f97316" size={50} />
          </div>
          <div className="text-center">
            <p className="text-white font-medium text-lg">{message}</p>
            <p className="text-white/50 text-sm mt-2">Please wait, do not switch tabs or navigate away</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditorPage() {
  const params = useParams()
  const projectId = params.projectId
  const [canvasEditor, setCanvasEditor] = useState(null)
  const [processingMessage, setProcessingMessage] = useState(null)
  const [activeTool, setActiveTool] = useState("resize")

  const { data: project, isLoading, error } = useConvexQuery(api.projects.getProject, { projectId })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error || !project) {
    return <ErrorState />
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasEditor,
        setCanvasEditor,
        activeTool,
        onToolChange: setActiveTool,
        processingMessage,
        setProcessingMessage,
      }}
    >
      {/* Mobile Message */}
      <MobileMessage />

      {/* Desktop Editor */}
      <div className="hidden lg:block min-h-screen bg-slate-950 relative">
        <div className="fixed inset-0 pointer-events-none">
          <MeshGradient />
          <NoiseOverlay />
        </div>

        <div className="relative z-10 flex flex-col h-screen">
          {processingMessage && <ProcessingOverlay message={processingMessage} />}

          {/* Top Bar */}
          <EditorTopBar project={project} />

          {/* Main Editor Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <EditorSidebar project={project} />

            {/* Canvas Area - slightly transparent to show background */}
            <div className="flex-1 bg-slate-900/80 backdrop-blur-sm">
              <CanvasEditor project={project} activeTool={activeTool} />
            </div>
          </div>
        </div>
      </div>
    </CanvasContext.Provider>
  )
}
