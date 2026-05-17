"use client";

import { useState } from "react";
import { ChevronUp, Zap, Check } from "lucide-react";
import { useAuth, PlanName } from "@/context/AuthContext";

const PLANS: { key: PlanName; label: string; badge?: string }[] = [
  { key: "FREE",     label: "Free"     },
  { key: "STANDARD", label: "Standard" },
  { key: "PRO",      label: "Pro", badge: "⚡" },
];

export default function PlanSwitcher() {
  const { user, isLoggedIn, login, logout, upgradePlan } = useAuth();
  const [open, setOpen] = useState(false);

  const currentPlan = user?.plan ?? "FREE";

  const handleSelect = (key: PlanName) => {
    if (key === "FREE") {
      logout();
    } else {
      if (!isLoggedIn) login();
      upgradePlan(key);
    }
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open && (
        <div className="mb-2 bg-bg-card border border-border-default rounded-xl shadow-2xl overflow-hidden w-44">
          <p className="text-[10px] text-text-muted uppercase tracking-widest px-3 pt-3 pb-1.5">Demo: switch plan</p>
          {PLANS.map(({ key, label, badge }) => {
            const active = isLoggedIn ? currentPlan === key : key === "FREE";
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "text-text-primary bg-accent/5"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-card-hover"
                }`}
              >
                {badge
                  ? <span className="text-accent text-xs w-4 text-center">{badge}</span>
                  : <span className="w-4" />
                }
                <span className="flex-1 text-left">{label}</span>
                {active && <Check size={13} className="text-accent shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 bg-bg-card border border-border-default rounded-xl shadow-lg hover:border-border-light transition-colors text-xs font-medium"
      >
        <Zap size={12} className="text-accent" />
        <span className="text-text-primary">
          {isLoggedIn ? currentPlan : "FREE"}
        </span>
        <ChevronUp size={11} className={`text-text-muted transition-transform ${open ? "" : "rotate-180"}`} />
      </button>
    </div>
  );
}
