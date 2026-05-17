"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Check, ArrowRight, Zap, BarChart2, Lock } from "lucide-react";
import { useAuth, POINTS_PER_API_CREDIT_RATE, POINTS_PER_USAGE_CREDIT_RATE } from "@/context/AuthContext";

interface ConvertFlowProps {
  onClose: () => void;
}

type Target = "api" | "usage";

const TARGET_INFO = {
  api: {
    icon: <Zap size={16} className="text-accent" />,
    label: "API Credits",
    emoji: "⚡",
    color: "text-accent",
    bgColor: "bg-accent/5 border-accent/20",
    rate: POINTS_PER_API_CREDIT_RATE,
    description: "Consume API Credits with every call to the Moni API. Each request costs 1 API Credit.",
    bullets: ["1 request = 1 API Credit", "Used for data endpoints & trading signals", "Buy directly or convert from Points"],
    valuePerCredit: 0.01,
  },
  usage: {
    icon: <BarChart2 size={16} className="text-clr-yellow" />,
    label: "Usage Credits",
    emoji: "🪙",
    color: "text-clr-yellow",
    bgColor: "bg-clr-yellow/5 border-clr-yellow/20",
    rate: POINTS_PER_USAGE_CREDIT_RATE,
    description: "Apply Usage Credits at checkout to get a discount on any subscription plan.",
    bullets: ["Applied at plan checkout for discounts", "Cap: 20% off any plan price", "Convert from Points or buy directly"],
    valuePerCredit: 0.01,
  },
};

export default function ConvertFlow({ onClose }: ConvertFlowProps) {
  const { points, convertPointsToCredits, convertPointsToUsageCredits, user } = useAuth();
  const isPro = user?.plan === "PRO";
  const [target, setTarget] = useState<Target | null>(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ points: number; credits: number; target: Target } | null>(null);

  const info = target ? TARGET_INFO[target] : null;
  const numAmount = Number(amount) || 0;
  const creditsPreview = info ? Math.floor(numAmount / info.rate) : 0;
  const valueUsd = (creditsPreview * (info?.valuePerCredit ?? 0.01)).toFixed(2);
  const isValid = info ? numAmount >= info.rate && numAmount <= points : false;

  const handleMax = () => {
    if (!info) return;
    const maxConvertable = Math.floor(points / info.rate) * info.rate;
    setAmount(String(maxConvertable));
    setError("");
  };

  const handleConvert = () => {
    if (!target || !info) return;
    if (numAmount < info.rate) { setError(`Minimum ${info.rate} points`); return; }
    if (numAmount > points) { setError("Not enough points"); return; }
    const ok = target === "api"
      ? convertPointsToCredits(numAmount)
      : convertPointsToUsageCredits(numAmount);
    if (ok) setDone({ points: numAmount, credits: creditsPreview, target });
    else setError("Conversion failed");
  };

  /* ── Success screen ── */
  if (done) {
    const doneInfo = TARGET_INFO[done.target];
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-bg-card border border-border-default rounded-xl w-full max-w-sm p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-5">
            <Check size={30} className="text-accent" strokeWidth={2.5} />
          </div>
          <h3 className="text-text-primary font-bold text-xl mb-2">Converted!</h3>
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="text-center">
              <div className="text-clr-yellow font-bold text-2xl">{done.points.toLocaleString()}</div>
              <div className="text-text-muted text-xs mt-0.5">Points</div>
            </div>
            <ArrowRight size={18} className="text-text-muted" />
            <div className="text-center">
              <div className={`font-bold text-2xl ${doneInfo.color}`}>{done.credits}</div>
              <div className="text-text-muted text-xs mt-0.5">{doneInfo.label}</div>
            </div>
          </div>
          <p className="text-text-muted text-sm mt-3 mb-6">≈ ${(done.credits * 0.01).toFixed(2)} value added to your balance</p>
          <button onClick={onClose} className="w-full py-3 bg-accent hover:bg-accent-hover rounded-lg text-white font-medium transition-colors">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-bg-card border border-border-default rounded-xl w-full max-w-md shadow-2xl my-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-default">
          <div>
            <h2 className="text-text-primary font-semibold">Convert Points</h2>
            {target && (
              <p className="text-text-muted text-xs mt-0.5">→ {TARGET_INFO[target].label}</p>
            )}
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-secondary transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">

          {/* ── Annotations ── */}
          <div className="space-y-2">
            {/* Points */}
            <div className="rounded-lg bg-bg-base border border-border-default p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-clr-yellow">✦</span>
                <span className="text-text-primary font-medium text-sm">Points</span>
                <span className="ml-auto text-clr-yellow font-semibold text-sm">{points.toLocaleString()} pts</span>
              </div>
              <p className="text-text-muted text-xs leading-relaxed">Earned from quests, invites, and trading milestones. Cannot be spent directly — convert to Credits first.</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* API Credits */}
              <div className="rounded-lg bg-bg-base border border-border-default p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap size={12} className="text-accent" />
                  <span className="text-text-primary font-medium text-xs">API Credits</span>
                </div>
                <p className="text-text-muted text-[11px] leading-relaxed mb-2">For API requests. 1 call = 1 credit.</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-clr-yellow font-semibold text-xs">{POINTS_PER_API_CREDIT_RATE} pts</span>
                  <span className="text-text-muted text-[10px]">= 1 credit</span>
                </div>
              </div>

              {/* Usage Credits */}
              <div className="rounded-lg bg-bg-base border border-border-default p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <BarChart2 size={12} className="text-clr-yellow" />
                  <span className="text-text-primary font-medium text-xs">Usage Credits</span>
                </div>
                <p className="text-text-muted text-[11px] leading-relaxed mb-2">Discount at plan checkout. Up to 20% off.</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-clr-yellow font-semibold text-xs">{POINTS_PER_USAGE_CREDIT_RATE} pts</span>
                  <span className="text-text-muted text-[10px]">= 1 credit</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Target selector ── */}
          <div className="flex p-1 bg-bg-base border border-border-default rounded-lg">
            {(["api", "usage"] as Target[]).map((t) => {
              const ti = TARGET_INFO[t];
              const selected = target === t;
              const locked = t === "api" && !isPro;
              return (
                <button
                  key={t}
                  onClick={() => {
                    if (locked) return;
                    setTarget(t); setAmount(""); setError("");
                  }}
                  title={locked ? "Available on Pro plan" : undefined}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all ${
                    locked
                      ? "text-text-muted cursor-not-allowed opacity-60"
                      : selected
                      ? "bg-accent text-white shadow-sm"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {locked ? <Lock size={13} className="text-text-muted" /> : ti.icon}
                  {ti.label}
                  {locked && <span className="text-[10px] text-text-muted ml-0.5">Pro</span>}
                </button>
              );
            })}
          </div>

          {/* Pro upsell when API tab hovered/attempted */}
          {!isPro && (
            <div className="flex items-center gap-3 px-3 py-2.5 bg-accent/5 border border-accent/20 rounded-lg">
              <Lock size={13} className="text-accent shrink-0" />
              <p className="text-text-muted text-xs flex-1">API Credits conversion requires Pro plan.</p>
              <Link
                href="/pricing/checkout?plan=pro"
                onClick={onClose}
                className="text-accent text-xs font-semibold hover:underline shrink-0"
              >
                Upgrade ↗
              </Link>
            </div>
          )}

          {/* ── Convert input (shown after target selected) ── */}
          {target && info && (
            <div className="rounded-lg bg-bg-base border border-border-default p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Available points</span>
                <span className="text-clr-yellow font-semibold">{points.toLocaleString()} pts</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Rate</span>
                <span className="text-text-secondary">{info.rate} pts = 1 {info.label}</span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  placeholder={`Min ${info.rate} points`}
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setError(""); }}
                  className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3 pr-16 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  onClick={handleMax}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-accent text-xs font-semibold hover:opacity-80 transition-opacity"
                >
                  MAX
                </button>
              </div>

              {numAmount >= info.rate ? (
                <div className="flex items-center justify-between px-3 py-2.5 bg-bg-card rounded-lg border border-border-default">
                  <span className="text-text-muted text-xs">You will receive</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${info.color}`}>{creditsPreview} {info.label}</span>
                    <span className="text-text-muted text-xs">≈ ${valueUsd}</span>
                  </div>
                </div>
              ) : numAmount > 0 ? (
                <p className="text-text-muted text-xs text-center">Enter at least {info.rate} points</p>
              ) : null}

              {error && <p className="text-clr-red text-xs">{error}</p>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-bg-card-hover border border-border-default rounded-lg text-text-secondary text-sm hover:border-border-light transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleConvert}
            disabled={!isValid}
            className="flex-1 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-colors"
          >
            Convert Points →
          </button>
        </div>
      </div>
    </div>
  );
}
