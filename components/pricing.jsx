import { useIntersectionObserver } from "@/hooks/use-landing-hooks";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";

const PricingCard = ({
  id,
  plan,
  price,
  features,
  featured = false,
  planId,
  buttonText,
}) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);
  const { has } = useAuth();

  // Check if user has this specific plan
  const isCurrentPlan = id ? has?.({ plan: id }) : false;

  const handlePopup = async () => {
    if (isCurrentPlan) return; // Don't open checkout for current plan

    try {
      const openCheckout = window?.Clerk?.__internal_openCheckout;
      if (!openCheckout) {
        toast.error(
          "Billing is disabled. Enable Clerk Billing to continue.",
          {
            description:
              "Open Clerk dashboard → Billing settings and enable Checkout.",
          }
        );
        return;
      }

      await openCheckout({
        planId: planId,
        planPeriod: "month",
        subscriberType: "user",
      });
    } catch (error) {
      console.error("Checkout error:", error);
      const message =
        error?.code === "cannot_render_billing_disabled"
          ? "Billing is disabled in Clerk."
          : "Unable to open checkout.";
      toast.error(message, {
        description:
          "Visit Clerk dashboard → Billing settings to enable and configure plans.",
      });
    }
  };

  return (
    <div
      ref={ref}
      className={`relative group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow background */}
      {featured && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
      )}

      <div
        className={`relative backdrop-blur-xl border rounded-3xl p-8 transition-all duration-300 ${
          featured
            ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-400/50 transform scale-105"
            : "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-white/10 hover:border-white/20"
        } ${isHovered && !featured ? "transform scale-105" : ""}`}
      >
        {featured && (
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-blue-500/50">
              ⭐ Most Popular
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">{plan}</h3>
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ${price}
            </span>
            {price > 0 && (
              <span className="text-lg text-gray-400 font-semibold">/month</span>
            )}
          </div>
          {price === 0 && (
            <p className="text-sm text-gray-400 font-medium">Perfect for getting started</p>
          )}
          {price > 0 && (
            <p className="text-sm text-cyan-400 font-medium">Billed monthly</p>
          )}
        </div>

        {/* Features List */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-200">
              <div className="flex-shrink-0 mt-1">
                <Check className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={featured ? "primary" : "glass"}
          size="xl"
          className="w-full group"
          onClick={handlePopup}
          disabled={isCurrentPlan || !planId}
        >
          {isCurrentPlan ? (
            <>✓ Current Plan</>
          ) : (
            <>
              {buttonText}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-xs text-gray-500 text-center">
            Cancel anytime. No hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
};

// Pricing Section Component
const PricingSection = () => {
  const plans = [
    {
      id: "free_user",
      plan: "Starter",
      price: 0,
      features: [
        "3 projects maximum",
        "20 exports per month",
        "Basic crop & resize tools",
        "Color & light adjustments",
        "Text editing tool",
      ],
      buttonText: "Get Started Free",
    },
    {
      id: "pro",
      plan: "Pro",
      price: 12,
      features: [
        "Unlimited projects",
        "Unlimited exports",
        "All editing tools included",
        "AI background removal",
        "AI image extender",
        "AI upscaler & retouch",
        "Priority support",
      ],
      featured: true,
      planId: "cplan_37www5sP2wYuUabd9jRsBL1Il3U",
      buttonText: "Upgrade to Pro",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900"></div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-400/5 backdrop-blur-sm">
            <span className="text-blue-400">💰</span>
            <span className="text-sm font-semibold text-cyan-400">Transparent Pricing</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Simple,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Flexible Pricing
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start free and upgrade when you're ready. No credit card required. Cancel anytime with no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-green-400/30 bg-green-400/5 backdrop-blur-sm">
            <span className="text-xl">🛡️</span>
            <p className="text-sm text-gray-300">
              <span className="text-green-400 font-semibold">30-day guarantee</span> — Try Pro risk-free
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
