"use client";

import { X } from "lucide-react";
import { POINTS_PER_CREDIT_RATE } from "@/context/AuthContext";

interface InfoModalProps {
  onClose: () => void;
  onProceed?: () => void;
  proceedLabel?: string;
}

export default function InfoModal({ onClose, onProceed, proceedLabel = "Convert now" }: InfoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-card border border-border-default rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-default">
          <h2 className="text-text-primary font-semibold">Points &amp; Credits — how it works</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-secondary transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Points */}
          <div className="rounded-xl bg-bg-base border border-border-default p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-clr-yellow text-lg">✦</span>
              <span className="text-text-primary font-semibold">Points</span>
            </div>
            <p className="text-text-secondary text-sm mb-3">
              Points are earned inside the platform and reflect your activity.
            </p>
            <ul className="space-y-1.5">
              {[
                "Completing quests",
                "Inviting friends who trade",
                "Trading volume milestones",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-text-muted text-xs">
                  <span className="w-1 h-1 rounded-full bg-clr-yellow flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-text-muted text-xs mt-3 italic">
              Points alone cannot be spent — convert them to Credits first.
            </p>
          </div>

          {/* Credits */}
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
                  <span className="w-1 h-1 rounded-full bg-clr-green flex-shrink-0" />
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
        </div>

        <div className="px-6 pb-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-bg-card-hover border border-border-default rounded-xl text-text-secondary text-sm hover:border-border-light transition-colors"
          >
            Close
          </button>
          {onProceed && (
            <button
              onClick={() => { onProceed(); onClose(); }}
              className="flex-1 py-2.5 bg-accent hover:bg-accent-hover rounded-xl text-white text-sm font-medium transition-colors"
            >
              {proceedLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
