"use client";

import { useAuth } from "@/context/AuthContext";

export default function SubscriptionCreditsCard() {
  const { usageCredits } = useAuth();
  const usageCreditsUsd = (usageCredits * 0.01).toFixed(2);

  return (
    <div className="bg-bg-card border border-border-default rounded-xl p-6 flex flex-col">
      <p className="text-text-muted text-xs uppercase tracking-widest mb-4">🪙 Subscription Credits</p>

      <div className="flex-1 space-y-2">
        <p className="text-text-secondary text-sm leading-relaxed">
          Earned as 0.3% of your trading volume — apply at checkout to reduce your plan price.
        </p>
        <p className="text-text-muted text-xs italic">
          On top of 90% cashback — total 120% return.
        </p>
      </div>

      <div className="flex items-baseline justify-between mt-6 pt-4 border-t border-border-default">
        <span className="text-3xl font-bold text-text-primary">${usageCreditsUsd}</span>
        <span className="text-text-muted text-xs">available</span>
      </div>
    </div>
  );
}
