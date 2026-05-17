"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Tag, ChevronDown, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AccountGuard from "@/components/AccountGuard";
import WalletModal from "@/components/WalletModal";

const PLANS = {
  standard: { name: "Standard", monthlyUsd: 29,  yearlyUsd: 249,  solRequired: 10  },
  pro:      { name: "PRO",      monthlyUsd: 99,  yearlyUsd: 828,  solRequired: 100 },
} as const;

type PlanKey = keyof typeof PLANS;

const VALID_PROMOS: Record<string, number> = {
  MONI10:   10,
  MONI20:   20,
  LAUNCH30: 30,
};

function RadioRow({
  checked, onClick, label, sublabel, price,
}: {
  checked: boolean; onClick: () => void;
  label: string; sublabel?: string; price: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-colors ${
        checked
          ? "border-accent bg-accent/5"
          : "border-border-default bg-bg-base hover:border-border-light"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
          checked ? "border-accent" : "border-border-light"
        }`}>
          {checked && <div className="w-2 h-2 rounded-full bg-accent" />}
        </div>
        <div>
          <span className="text-text-primary text-sm font-medium">{label}</span>
          {sublabel && <span className="text-text-muted text-xs ml-2">{sublabel}</span>}
        </div>
      </div>
      <span className="text-text-primary text-sm font-semibold">{price}</span>
    </button>
  );
}

function CheckoutInner() {
  const { user, points, upgradePlan } = useAuth();
  const searchParams = useSearchParams();
  const planKey = (searchParams.get("plan") ?? "standard") as PlanKey;
  const plan = PLANS[planKey] ?? PLANS.standard;

  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [useCreditsDiscount, setUseCreditsDiscount] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState<{ code: string; pct: number } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const tradedSol = user?.tradedSol ?? 0;
  const tradingDiscountPct = plan.solRequired > 0
    ? Math.min(100, Math.round((tradedSol / plan.solRequired) * 100))
    : 0;

  const basePrice = billing === "monthly" ? plan.monthlyUsd : plan.yearlyUsd;
  const yearlyMonthlyEquiv = Math.round(plan.yearlyUsd / 12);
  const annualSavings = plan.monthlyUsd * 12 - plan.yearlyUsd;

  const tradingDiscount = basePrice * (tradingDiscountPct / 100);
  const afterTrading = basePrice - tradingDiscount;

  const promoDiscount = promoApplied ? afterTrading * (promoApplied.pct / 100) : 0;
  const afterPromo = afterTrading - promoDiscount;

  // 100 points = $0.01, capped at 20% of plan price
  const pointValueUsd = points * 0.0001;
  const pointCapUsd = afterPromo * 0.2;
  const creditDiscount = useCreditsDiscount ? Math.min(pointValueUsd, pointCapUsd) : 0;
  const creditsToSpend = useCreditsDiscount ? Math.ceil(creditDiscount / 0.0001) : 0;

  const total = Math.max(0, afterPromo - creditDiscount);
  const totalSaved = basePrice - total;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (VALID_PROMOS[code]) {
      setPromoApplied({ code, pct: VALID_PROMOS[code] });
      setPromoError("");
      setShowPromo(false);
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const handlePurchaseComplete = () => {
    // points deduction handled server-side in production
    upgradePlan(planKey === "pro" ? "PRO" : "STANDARD");
    setShowWallet(false);
    setPurchased(true);
  };

  /* ── Success ── */
  if (purchased) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
            <Check size={30} className="text-accent" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">Payment confirmed!</h1>
          <p className="text-text-secondary mb-1">
            Upgraded to <span className="text-accent font-semibold">{plan.name}</span>
          </p>
          <p className="text-text-muted text-sm mb-8">Your new features are active immediately.</p>
          <Link
            href="/account/profile"
            className="inline-block px-8 py-2.5 bg-accent hover:bg-accent-hover rounded-lg text-white font-medium transition-colors"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/pricing" className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-secondary text-sm mb-8 transition-colors">
        <ChevronLeft size={15} /> Back to Pricing
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

        {/* ── Left ── */}
        <div className="space-y-3">

          {/* Plan */}
          <div className="bg-bg-card border border-border-default rounded-xl p-5">
            <p className="text-text-muted text-xs uppercase tracking-widest mb-1">Plan</p>
            <h1 className="text-text-primary text-xl font-semibold">Moni {plan.name}</h1>
          </div>

          {/* Billing */}
          <div className="bg-bg-card border border-border-default rounded-xl p-5">
            <h2 className="text-text-primary text-sm font-semibold mb-3">Billing cycle</h2>
            <div className="space-y-2">
              <RadioRow
                checked={billing === "monthly"}
                onClick={() => setBilling("monthly")}
                label="Monthly"
                price={`$${plan.monthlyUsd}/mo`}
              />
              <RadioRow
                checked={billing === "yearly"}
                onClick={() => setBilling("yearly")}
                label="Yearly"
                sublabel={`($${yearlyMonthlyEquiv}/mo)`}
                price={`$${plan.yearlyUsd}/yr`}
              />
            </div>
            {billing === "yearly" && annualSavings > 0 && (
              <p className="text-accent text-xs mt-3">Save ${annualSavings} per year vs monthly</p>
            )}
          </div>

          {/* Discounts */}
          <div className="bg-bg-card border border-border-default rounded-xl p-5">
            <h2 className="text-text-primary text-sm font-semibold mb-3">Discounts</h2>
            <div className="space-y-2">

              {/* Trading */}
              <div className={`flex items-start justify-between p-3 rounded-lg border ${
                tradingDiscountPct > 0
                  ? "border-accent/20 bg-accent/5"
                  : "border-border-default bg-bg-base"
              }`}>
                <div>
                  <p className="text-text-secondary text-sm flex items-center gap-1.5">
                    <span>📊</span> Trading volume discount
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">
                    {tradedSol} SOL traded / {plan.solRequired} SOL required
                  </p>
                </div>
                <span className={`text-sm font-semibold shrink-0 ml-4 ${
                  tradingDiscountPct > 0 ? "text-accent" : "text-text-muted"
                }`}>
                  {tradingDiscountPct > 0 ? `−$${tradingDiscount.toFixed(2)}` : "$0.00"}
                </span>
              </div>

              {/* Points */}
              <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                useCreditsDiscount
                  ? "border-accent/30 bg-accent/5"
                  : "border-border-default bg-bg-base hover:border-border-light"
              }`}>
                <input
                  type="checkbox"
                  checked={useCreditsDiscount}
                  onChange={(e) => setUseCreditsDiscount(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-violet-500"
                />
                <div className="flex-1">
                  <p className="text-text-secondary text-sm flex items-center gap-1.5">
                    <span>✦</span> Apply points
                  </p>
                  <p className="text-text-muted text-xs mt-0.5">
                    {points.toLocaleString()} points available ≈ ${pointValueUsd.toFixed(2)} · max 20% off
                  </p>
                </div>
                <span className={`text-sm font-semibold shrink-0 ml-4 ${
                  useCreditsDiscount && creditDiscount > 0 ? "text-accent" : "text-text-muted"
                }`}>
                  {useCreditsDiscount && creditDiscount > 0
                    ? `−$${creditDiscount.toFixed(2)}`
                    : points > 0 ? `up to −$${Math.min(pointValueUsd, afterPromo * 0.2).toFixed(2)}` : "$0.00"}
                </span>
              </label>
            </div>
          </div>

          {/* Promo */}
          <div className="bg-bg-card border border-border-default rounded-xl p-5">
            <button
              onClick={() => setShowPromo((v) => !v)}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm transition-colors"
            >
              <Tag size={13} className="text-accent" />
              {promoApplied
                ? <span>Promo <code className="font-mono text-accent">{promoApplied.code}</code> — {promoApplied.pct}% off</span>
                : "Apply promo code"}
              <ChevronDown size={13} className={`text-text-muted transition-transform ${showPromo ? "rotate-180" : ""}`} />
            </button>

            {showPromo && !promoApplied && (
              <div className="mt-3 flex gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }}
                  placeholder="Enter promo code"
                  className="flex-1 bg-bg-base border border-border-default rounded-lg px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors uppercase"
                />
                <button
                  onClick={applyPromo}
                  className="px-4 py-2.5 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            {promoError && <p className="text-clr-red text-xs mt-2">{promoError}</p>}
          </div>
        </div>

        {/* ── Right: Summary ── */}
        <div className="lg:sticky lg:top-20 self-start">
          <div className="bg-bg-card border border-border-default rounded-xl p-5">
            <h2 className="text-text-primary font-semibold mb-5">Summary</h2>

            <div className="space-y-2.5 mb-5 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">{plan.name} · {billing === "yearly" ? "Yearly" : "Monthly"}</span>
                <span className="text-text-primary font-medium">${basePrice.toFixed(2)}</span>
              </div>

              {billing === "yearly" && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Annual savings</span>
                  <span className="text-accent font-medium">−${annualSavings.toFixed(2)}</span>
                </div>
              )}

              {tradingDiscountPct > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Trading discount</span>
                  <span className="text-accent font-medium">−${tradingDiscount.toFixed(2)}</span>
                </div>
              )}

              {promoApplied && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Promo ({promoApplied.pct}%)</span>
                  <span className="text-accent font-medium">−${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              {useCreditsDiscount && creditDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">Points applied</span>
                  <span className="text-accent font-medium">−${creditDiscount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="border-t border-border-default pt-4 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-text-primary font-semibold">Total</span>
                <span className="text-text-primary font-bold text-xl">${total.toFixed(2)}</span>
              </div>
              {totalSaved > 0.01 && (
                <p className="text-accent text-xs text-right mt-1">You save ${totalSaved.toFixed(2)}</p>
              )}
            </div>

            <button
              onClick={() => setShowWallet(true)}
              className="w-full py-3 bg-accent hover:bg-accent-hover rounded-lg text-white font-semibold text-sm transition-colors mb-4"
            >
              Pay with crypto
            </button>

            <p className="text-text-muted text-[11px] leading-relaxed">
              By clicking &quot;Pay with crypto&quot;, you agree to our{" "}
              <a href="#" className="text-accent hover:underline">Terms of Service</a>.
              Cancel anytime before next billing period.
            </p>
          </div>
        </div>
      </div>

      {showWallet && (
        <WalletModal
          amountUsd={total}
          billing={billing}
          onClose={() => setShowWallet(false)}
          onSuccess={handlePurchaseComplete}
        />
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AccountGuard>
      <Suspense>
        <CheckoutInner />
      </Suspense>
    </AccountGuard>
  );
}
