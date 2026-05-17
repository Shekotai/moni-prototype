"use client";

import { useState } from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { useAuth, POINTS_PER_CREDIT_RATE } from "@/context/AuthContext";

interface ConvertFlowProps {
  onClose: () => void;
}

export default function ConvertFlow({ onClose }: ConvertFlowProps) {
  const { points, convertPointsToCredits } = useAuth();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ points: number; credits: number } | null>(null);

  const numAmount = Number(amount) || 0;
  const creditsPreview = Math.floor(numAmount / POINTS_PER_CREDIT_RATE);
  const valueUsd = (creditsPreview * 0.01).toFixed(2);
  const isValid = numAmount >= POINTS_PER_CREDIT_RATE && numAmount <= points;

  const handleMax = () => {
    const maxConvertable = Math.floor(points / POINTS_PER_CREDIT_RATE) * POINTS_PER_CREDIT_RATE;
    setAmount(String(maxConvertable));
    setError("");
  };

  const handleConvert = () => {
    if (numAmount < POINTS_PER_CREDIT_RATE) { setError(`Minimum ${POINTS_PER_CREDIT_RATE} points`); return; }
    if (numAmount > points) { setError("Not enough points"); return; }
    const ok = convertPointsToCredits(numAmount);
    if (ok) setDone({ points: numAmount, credits: creditsPreview });
    else setError("Conversion failed");
  };

  /* ── Success screen ── */
  if (done) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-bg-card border border-border-default rounded-2xl w-full max-w-sm p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-clr-green/10 border border-clr-green/30 flex items-center justify-center mx-auto mb-5">
            <Check size={30} className="text-clr-green" strokeWidth={2.5} />
          </div>
          <h3 className="text-text-primary font-bold text-xl mb-2">Converted!</h3>
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="text-center">
              <div className="text-clr-yellow font-bold text-2xl">{done.points.toLocaleString()}</div>
              <div className="text-text-muted text-xs mt-0.5">Points</div>
            </div>
            <ArrowRight size={18} className="text-text-muted" />
            <div className="text-center">
              <div className="text-clr-green font-bold text-2xl">{done.credits}</div>
              <div className="text-text-muted text-xs mt-0.5">Credits</div>
            </div>
          </div>
          <p className="text-text-muted text-sm mt-3 mb-6">≈ ${(done.credits * 0.01).toFixed(2)} value added to your balance</p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-accent hover:bg-accent-hover rounded-xl text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  /* ── Main modal ── */
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-bg-card border border-border-default rounded-2xl w-full max-w-md shadow-2xl my-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-default">
          <h2 className="text-text-primary font-semibold">Points &amp; Credits — how it works</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-secondary transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Points info */}
          <div className="rounded-xl bg-bg-base border border-border-default p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-clr-yellow text-lg">✦</span>
              <span className="text-text-primary font-semibold">Points</span>
            </div>
            <p className="text-text-secondary text-sm mb-3">
              Points are earned inside the platform and reflect your activity.
            </p>
            <ul className="space-y-1.5">
              {["Completing quests", "Inviting friends who trade", "Trading volume milestones"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-text-muted text-xs">
                  <span className="w-1 h-1 rounded-full bg-clr-yellow shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-text-muted text-xs mt-3 italic">
              Points alone cannot be spent — convert them to Credits first.
            </p>
          </div>

          {/* Credits info */}
          <div className="rounded-xl bg-bg-base border border-border-default p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🪙</span>
              <span className="text-text-primary font-semibold">Credits</span>
            </div>
            <p className="text-text-secondary text-sm mb-3">
              Credits are the internal currency you spend within Moni.
            </p>
            <ul className="space-y-1.5">
              {[
                "Each API call costs 1 credit",
                "Apply credits at checkout to get a discount on plans",
                "Buy credits directly, or convert from Points",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-text-muted text-xs">
                  <span className="w-1 h-1 rounded-full bg-clr-green shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Exchange rate */}
          <div className="flex items-center justify-center gap-3 py-3 rounded-xl border border-border-light bg-bg-card-hover">
            <div className="text-center">
              <div className="text-clr-yellow font-bold text-lg">{POINTS_PER_CREDIT_RATE}</div>
              <div className="text-text-muted text-xs">Points</div>
            </div>
            <span className="text-text-muted text-xl">=</span>
            <div className="text-center">
              <div className="text-clr-green font-bold text-lg">1</div>
              <div className="text-text-muted text-xs">Credit</div>
            </div>
            <span className="text-text-muted mx-1">≈</span>
            <div className="text-center">
              <div className="text-text-secondary font-bold text-lg">$0.01</div>
              <div className="text-text-muted text-xs">value</div>
            </div>
          </div>

          {/* Convert input */}
          <div className="rounded-xl bg-bg-base border border-border-default p-4 space-y-3">
            {/* Balance row */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted">Available</span>
              <span className="text-clr-yellow font-semibold">{points.toLocaleString()} pts</span>
            </div>

            {/* Input */}
            <div className="relative">
              <input
                type="number"
                placeholder={`Min ${POINTS_PER_CREDIT_RATE} points`}
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
                className="w-full bg-bg-card border border-border-default rounded-xl px-4 py-3 pr-16 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <button
                onClick={handleMax}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-accent text-xs font-semibold hover:opacity-80 transition-opacity"
              >
                MAX
              </button>
            </div>

            {/* Live calculation */}
            {numAmount >= POINTS_PER_CREDIT_RATE ? (
              <div className="flex items-center justify-between px-3 py-2.5 bg-bg-card rounded-lg border border-border-default">
                <span className="text-text-muted text-xs">You will receive</span>
                <div className="flex items-center gap-2">
                  <span className="text-clr-green font-bold text-sm">{creditsPreview} Credits</span>
                  <span className="text-text-muted text-xs">≈ ${valueUsd}</span>
                </div>
              </div>
            ) : numAmount > 0 ? (
              <p className="text-text-muted text-xs text-center">
                Enter at least {POINTS_PER_CREDIT_RATE} points to convert
              </p>
            ) : null}

            {error && <p className="text-clr-red text-xs">{error}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-bg-card-hover border border-border-default rounded-xl text-text-secondary text-sm hover:border-border-light transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleConvert}
            disabled={!isValid}
            className="flex-1 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white text-sm font-medium transition-colors"
          >
            Convert Points →
          </button>
        </div>
      </div>
    </div>
  );
}
