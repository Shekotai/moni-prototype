"use client";

import Link from "next/link";

interface ProgressBlockProps {
  tradedSol: number;
  isAuthenticated: boolean;
  variant: "pricing" | "usage";
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-2 bg-border-default rounded-full overflow-hidden">
      <div
        className="h-full bg-accent rounded-full transition-all duration-500"
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}

export default function ProgressBlock({ tradedSol, isAuthenticated, variant }: ProgressBlockProps) {
  if (!isAuthenticated) {
    return (
      <div className="bg-bg-card border border-border-default rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-bg-card-hover flex items-center justify-center text-4xl">
          📊
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-text-primary font-semibold text-lg mb-1">Trade via Moni Extension</h3>
          <p className="text-text-secondary text-sm mb-1">to unlock subscription plans</p>
          <p className="text-text-muted text-xs">Goal: 10 SOL for Standard · Goal: 100 SOL for PRO</p>
        </div>
        <Link
          href="/login?redirect=/pricing"
          className="px-5 py-2.5 bg-accent hover:bg-accent-hover rounded-xl text-sm font-medium text-white transition-colors whitespace-nowrap"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const standardGoal = 10;
  const proGoal = 100;
  const standardPct = Math.round((tradedSol / standardGoal) * 100);
  const proPct = Math.round((tradedSol / proGoal) * 100);

  const standardDiscount = standardPct;
  const proDiscount = proPct;

  const title = variant === "pricing" ? "Progress to next subscription" : "Progress to next subscription";

  return (
    <div className="bg-bg-card border border-border-default rounded-xl p-6">
      <p className="text-text-muted text-xs uppercase tracking-widest mb-4">○ {title}</p>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-text-primary text-sm font-medium">To Standard</span>
            <span className="text-text-secondary text-sm">{standardPct}%</span>
          </div>
          <ProgressBar percent={standardPct} />
          <p className="text-text-muted text-xs mt-1.5">Traded {tradedSol} SOL out of {standardGoal} SOL</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-text-primary text-sm font-medium">To PRO</span>
            <span className="text-text-secondary text-sm">{proPct}%</span>
          </div>
          <ProgressBar percent={proPct} />
          <p className="text-text-muted text-xs mt-1.5">Traded {tradedSol} SOL out of {proGoal} SOL</p>
        </div>
      </div>

      {variant === "pricing" && (
        <div className="flex flex-wrap gap-3 mt-5">
          <button className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg text-accent text-sm font-medium hover:bg-accent/20 transition-colors">
            Buy Standard ({standardDiscount}% off)
          </button>
          <button className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg text-accent text-sm font-medium hover:bg-accent/20 transition-colors">
            Buy PRO ({proDiscount}% off)
          </button>
        </div>
      )}

      {variant === "usage" && (
        <div className="mt-5">
          <Link href="/pricing" className="px-4 py-2 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium transition-colors inline-block">
            Upgrade → Pricing
          </Link>
        </div>
      )}
    </div>
  );
}
