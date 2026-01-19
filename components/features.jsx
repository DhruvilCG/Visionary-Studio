import { useIntersectionObserver } from "@/hooks/use-landing-hooks";
import { useState } from "react";

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0, gradient }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`group relative backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 transition-all duration-700 cursor-pointer overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${isHovered ? "border-white/30 transform scale-105" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      {isHovered && (
        <div className={`absolute inset-0 ${gradient} opacity-5 blur-2xl transition-opacity duration-300`}></div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed text-sm">
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 h-1 ${gradient} transition-all duration-300 ${isHovered ? "w-full" : "w-0"}`}></div>
    </div>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: "✂️",
      title: "Smart Crop & Resize",
      description:
        "Interactive cropping with aspect ratio constraints and intelligent resizing that preserves image quality across any dimension.",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      icon: "🎨",
      title: "Color & Light Adjustment",
      description:
        "Professional-grade brightness, contrast, saturation controls with real-time preview and auto-enhance capabilities.",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      icon: "🤖",
      title: "AI Background Removal",
      description:
        "Remove or replace backgrounds instantly using advanced AI that detects complex edges and fine details with precision.",
      gradient: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      icon: "🔧",
      title: "AI Content Editor",
      description:
        "Edit images with natural language prompts. Remove objects, change elements, or add new content using generative AI.",
      gradient: "bg-gradient-to-r from-orange-500 to-red-500"
    },
    {
      icon: "📏",
      title: "Image Extender",
      description:
        "Expand your canvas in any direction with AI-powered generative fill that seamlessly blends new content with existing images.",
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-500"
    },
    {
      icon: "⬆️",
      title: "AI Upscaler",
      description:
        "Enhance image resolution up to 4x using AI upscaling technology that preserves details and reduces artifacts.",
      gradient: "bg-gradient-to-r from-cyan-500 to-blue-500"
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="features">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-400/5 backdrop-blur-sm">
            <span className="text-blue-400">✨</span>
            <span className="text-sm font-semibold text-cyan-400">Powerful Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Everything You Need
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              to Edit Like a Pro
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional-grade tools powered by cutting-edge AI. From basic adjustments to advanced generative editing, create stunning images in seconds.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 80} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
