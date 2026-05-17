"use client";

import { Check, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Plan {
  name: string;
  planKey: string;
  badge?: string;
  priceUsd: number;
  period: string;
  description: string;
  features: string[];
  solRequired: number;
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Free",
    planKey: "free",
    priceUsd: 0,
    period: "forever",
    description: "Get started with basic features",
    solRequired: 0,
    features: ["100 requests/day", "Basic market data", "Community access", "1 API key"],
  },
  {
    name: "Standard",
    planKey: "standard",
    badge: "Popular",
    priceUsd: 29,
    period: "/ month",
    description: "For active traders",
    solRequired: 10,
    features: ["1,000 requests/day", "Advanced analytics", "Trading signals", "5 API keys", "Priority support"],
    highlighted: true,
  },
  {
    name: "PRO",
    planKey: "pro",
    priceUsd: 99,
    period: "/ month",
    description: "For professional traders",
    solRequired: 100,
    features: ["Unlimited requests", "Real-time data", "AI insights", "Unlimited API keys", "Dedicated support", "Early access"],
  },
];

interface PlanCardsProps {
  tradedSol: number;
}

export default function PlanCards({ tradedSol }: PlanCardsProps) {
  const { isLoggedIn, credits } = useAuth();
  const router = useRouter();

  const handleBuy = (plan: Plan) => {
    if (plan.priceUsd === 0) return;
    if (!isLoggedIn) {
      router.push(`/login?redirect=/pricing/checkout?plan=${plan.planKey}`);
      return;
    }
    router.push(`/pricing/checkout?plan=${plan.planKey}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PLANS.map((plan) => {
        const locked = plan.solRequired > 0 && tradedSol < plan.solRequired;
        const tradingDiscountPct = plan.solRequired > 0
          ? Math.min(100, Math.round((tradedSol / plan.solRequired) * 100))
          : 0;
        const creditValueUsd = credits * 0.01;
        const creditCapUsd = plan.priceUsd * 0.2;
        const maxCreditDiscount = Math.min(creditValueUsd, creditCapUsd);
        const isFree = plan.priceUsd === 0;

        return (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border p-6 transition-colors ${
              plan.highlighted
                ? "border-accent bg-accent/5"
                : "border-border-default bg-bg-card hover:border-border-light"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-accent rounded-full text-white text-xs font-semibold">
                {plan.badge}
              </span>
            )}

            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-text-primary font-semibold text-lg">{plan.name}</h3>
                <p className="text-text-muted text-xs mt-0.5">{plan.description}</p>
              </div>
              {locked && <Lock size={15} className="text-text-muted mt-1 shrink-0" />}
            </div>

            {/* Price */}
            <div className="mb-3">
              <span className="text-3xl font-bold text-text-primary">
                {plan.priceUsd === 0 ? "$0" : `$${plan.priceUsd}`}
              </span>
              <span className="text-text-muted text-sm ml-1">{plan.period}</span>
            </div>

            {/* Discount badges for logged-in users */}
            {isLoggedIn && !isFree && (
              <div className="space-y-1.5 mb-3">
                <div className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs ${
                  tradingDiscountPct > 0
                    ? "bg-clr-green/5 border border-clr-green/20 text-clr-green"
                    : "bg-bg-base border border-border-default text-text-muted"
                }`}>
                  <span>📊 Trading discount</span>
                  <span className="font-semibold">
                    {tradingDiscountPct > 0 ? `−${tradingDiscountPct}%` : `0%`}
                  </span>
                </div>
                {credits > 0 && (
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs bg-accent/5 border border-accent/20 text-text-secondary">
                    <span>🪙 Credits</span>
                    <span className="font-semibold text-accent">up to −${maxCreditDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            <ul className="space-y-1.5 flex-1 mb-5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                  <Check size={12} className="text-clr-green shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleBuy(plan)}
              className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isFree
                  ? "bg-bg-card-hover border border-border-default text-text-primary hover:bg-bg-card-hover"
                  : plan.highlighted
                  ? "bg-accent hover:bg-accent-hover text-white"
                  : "bg-bg-card-hover border border-border-default text-text-primary hover:border-border-light"
              }`}
            >
              {isFree
                ? "Get started"
                : isLoggedIn
                ? "Buy now"
                : "Sign in to buy"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
