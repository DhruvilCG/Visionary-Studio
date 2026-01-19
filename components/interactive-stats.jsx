"use client";

import {
  useAnimatedCounter,
  useIntersectionObserver,
} from "@/hooks/use-landing-hooks";
import { useEffect } from "react";

const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [count, setIsActive] = useAnimatedCounter(target, duration);

  useEffect(() => {
    if (isVisible) setIsActive(true);
  }, [isVisible, setIsActive]);

  return (
    <span
      ref={ref}
      className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 bg-clip-text text-transparent"
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const InteractiveStats = () => {
  const stats = [
    { label: "Images Edited", value: 100000, suffix: "+", icon: "🖼️" },
    { label: "Active Users", value: 10000, suffix: "+", icon: "👥" },
    { label: "AI Edits", value: 450000, suffix: "+", icon: "✨" },
    { label: "Satisfaction", value: 98, suffix: "%", icon: "⭐" },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/30 to-slate-900"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative backdrop-blur-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 text-center transition-all duration-300 hover:border-white/20 hover:transform hover:scale-105"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl lg:text-5xl font-black mb-3">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 uppercase tracking-widest text-xs font-semibold">
                  {stat.label}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 w-0 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveStats;
