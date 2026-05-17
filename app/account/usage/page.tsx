"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProgressBlock from "@/components/ProgressBlock";
import AccountGuard from "@/components/AccountGuard";
import ConvertFlow from "@/components/ConvertFlow";

function UsageBar({ percent, label }: { percent: number; label: string }) {
  return (
    <div className="w-full h-6 bg-border-default rounded-lg overflow-hidden relative">
      <div
        className="h-full bg-accent rounded-lg transition-all duration-500"
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white/80">
        {label}
      </span>
    </div>
  );
}

function LivePoints() {
  const { points } = useAuth();
  return <span className="text-4xl font-bold text-text-primary">{points.toLocaleString()}</span>;
}

export default function UsagePage() {
  const { isLoggedIn, user, credits, maxCredits } = useAuth();
  const [showConvert, setShowConvert] = useState(false);
  const creditPct = Math.round((credits / maxCredits) * 100);

  return (
    <AccountGuard>
      <div className="max-w-5xl px-8 py-10">
        <h1 className="text-2xl font-bold text-text-primary mb-8">Usage</h1>

        {/* Top cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          {/* Usage */}
          <div className="bg-bg-card border border-border-default rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-text-muted text-base leading-none">○</span>
              <span className="text-text-primary font-semibold">Usage</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-text-primary font-bold text-sm">Daily</span>
                    <span className="text-text-muted text-xs">Reset in 8h</span>
                  </div>
                  <span className="text-text-muted text-xs">1 240 / 2 000</span>
                </div>
                <UsageBar percent={50} label="50%" />
              </div>
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-text-primary font-bold text-sm">Weekly</span>
                    <span className="text-text-muted text-xs">Resets Sat 5:00 AM</span>
                  </div>
                  <span className="text-text-muted text-xs">6 820 / 14 000</span>
                </div>
                <UsageBar percent={10} label="10%" />
              </div>
            </div>
          </div>

          {/* Credits */}
          <div className="bg-bg-card border border-border-default rounded-2xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🪙</span>
              <span className="text-text-primary font-semibold">Credits</span>
            </div>
            <p className="text-text-secondary text-sm mb-4">Credits for service use</p>
            <div className="flex-1 flex items-end">
              <div className="w-full">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-text-primary">{creditPct}%</span>
                  <span className="text-text-secondary text-sm">{credits} left</span>
                </div>
                <div className="w-full h-1.5 bg-border-default rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${creditPct}%`,
                      backgroundColor: creditPct < 20 ? "var(--c-red)" : "var(--c-yellow)",
                    }}
                  />
                </div>
                <p className="text-text-muted text-xs">API calls &amp; plan upgrades</p>
              </div>
            </div>
          </div>

          {/* Points */}
          <div className="bg-bg-card border border-border-default rounded-2xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">✦</span>
              <span className="text-text-primary font-semibold">Points for quests and invites</span>
            </div>
            <p className="text-text-secondary text-xs mb-4">Convert points to upgrade your tariff plan</p>
            <div className="flex-1 flex flex-col justify-between">
              <LivePoints />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowConvert(true)}
                  className="flex-1 py-2 bg-bg-card-hover border border-border-default hover:border-accent/40 rounded-lg text-text-primary text-sm font-medium transition-colors"
                >
                  Convert
                </button>
                <Link
                  href="/account/invite"
                  className="flex-1 py-2 bg-bg-card-hover border border-border-default hover:border-border-light rounded-lg text-text-primary text-sm font-medium text-center transition-colors"
                >
                  To quests
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Progress block */}
        <ProgressBlock
          tradedSol={user?.tradedSol ?? 0}
          isAuthenticated={isLoggedIn}
          variant="usage"
        />
      </div>

      {showConvert && <ConvertFlow onClose={() => setShowConvert(false)} />}
    </AccountGuard>
  );
}
