"use client";

import { useState } from "react";
import AccountGuard from "@/components/AccountGuard";

/* ─── Reusable toggle ─── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-accent" : "bg-bg-card-hover border border-border-default"}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[22px]" : "translate-x-0.5"}`}
      />
    </button>
  );
}

/* ─── Preset amount chip ─── */
function AmountChip({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-bg-card-hover border border-border-default rounded-xl px-3 py-2 text-text-primary text-sm text-center focus:outline-none focus:border-accent transition-colors"
    />
  );
}

/* ─── Trading preset profile ─── */
interface TradingProfile {
  buyAmounts: string[];
  sellAmounts: string[];
  slippage: string;
  mevFee: string;
  tip: string;
  mevProtect: boolean;
  autoFeeBuy: boolean;
  maxFeeBuy: string;
  autoFeeSell: boolean;
  maxFeeSell: string;
}

const DEFAULT_PROFILE: TradingProfile = {
  buyAmounts:   ["0.01", "0.1", "1", "10"],
  sellAmounts:  ["10", "25", "50", "100"],
  slippage:     "10",
  mevFee:       "0.0015",
  tip:          "0.001",
  mevProtect:   true,
  autoFeeBuy:   true,
  maxFeeBuy:    "0.001",
  autoFeeSell:  false,
  maxFeeSell:   "0.001",
};

function makeProfiles(): TradingProfile[] {
  return [
    { ...DEFAULT_PROFILE },
    { ...DEFAULT_PROFILE, buyAmounts: ["0.5", "1", "2", "5"], sellAmounts: ["25", "50", "75", "100"], slippage: "15", autoFeeSell: true },
    { ...DEFAULT_PROFILE, buyAmounts: ["1", "5", "10", "50"], sellAmounts: ["50", "100", "200", "500"], slippage: "20", mevProtect: false },
  ];
}

/* ─── Platform integration entries ─── */
const PLATFORMS = [
  { key: "twitter",     label: "Twitter",     icon: <XIcon /> },
  { key: "axiom",       label: "Axiom",       icon: <AxiomIcon /> },
  { key: "padre",       label: "Padre",       icon: <PadreIcon /> },
  { key: "dexscreener", label: "DexScreener", icon: <DexIcon /> },
];

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.258 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function AxiomIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
      <polygon points="12,2 22,20 2,20"/>
    </svg>
  );
}
function PadreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3bbe82" strokeWidth="2" className="shrink-0">
      <ellipse cx="12" cy="12" rx="5" ry="9" />
    </svg>
  );
}
function DexIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3l2 4h-4l2-4zm-5 9l3-5 2 3 2-3 3 5H7zm10 3H7v-1h10v1z"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════ */

export default function SettingsPage() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [profiles, setProfiles] = useState<TradingProfile[]>(makeProfiles());
  const [activeProfile, setActiveProfile] = useState(0);
  const [quickBuyAmount, setQuickBuyAmount] = useState("0.5");
  const [quickBuyProfile, setQuickBuyProfile] = useState(0);
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    twitter: true, axiom: true, padre: true, dexscreener: true,
  });

  const profile = profiles[activeProfile];

  function updateProfile(patch: Partial<TradingProfile>) {
    setProfiles((prev) => prev.map((p, i) => i === activeProfile ? { ...p, ...patch } : p));
  }

  function updateBuyAmount(idx: number, val: string) {
    const next = [...profile.buyAmounts]; next[idx] = val;
    updateProfile({ buyAmounts: next });
  }

  function updateSellAmount(idx: number, val: string) {
    const next = [...profile.sellAmounts]; next[idx] = val;
    updateProfile({ sellAmounts: next });
  }

  return (
    <AccountGuard>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-text-primary mb-8">Settings</h1>

        <div className="space-y-4">

          {/* ── Language ── */}
          <section className="bg-bg-card border border-border-default rounded-2xl p-6">
            <h2 className="text-text-primary font-semibold text-base mb-4">Language</h2>
            <div className="flex items-center gap-2">
              {(["en", "zh"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    lang === l
                      ? "bg-accent text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {l === "en" ? "English" : "中文"}
                </button>
              ))}
            </div>
          </section>

          {/* ── Trading ── */}
          <section className="bg-bg-card border border-border-default rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-text-primary font-semibold text-base">Trading</h2>
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveProfile(i)}
                    className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition-colors ${
                      activeProfile === i
                        ? "bg-accent text-white"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    P{i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Buy */}
              <div className="bg-bg-base border border-border-default rounded-xl p-4">
                <p className="text-clr-green text-sm font-semibold mb-3">Buy</p>
                <div className="grid grid-cols-4 gap-1.5 mb-3">
                  {profile.buyAmounts.map((v, i) => (
                    <AmountChip key={i} value={v} onChange={(val) => updateBuyAmount(i, val)} />
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap text-xs text-text-muted mb-3">
                  <span title="Slippage" className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h9m-9 6h18"/></svg>
                    <input
                      value={profile.slippage}
                      onChange={(e) => updateProfile({ slippage: e.target.value })}
                      className="w-10 bg-bg-card-hover border border-border-default rounded px-1.5 py-1 text-text-primary focus:outline-none focus:border-accent transition-colors"
                    />
                    <span>%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8"/></svg>
                    <input
                      value={profile.mevFee}
                      onChange={(e) => updateProfile({ mevFee: e.target.value })}
                      className="w-14 bg-bg-card-hover border border-border-default rounded px-1.5 py-1 text-text-primary focus:outline-none focus:border-accent transition-colors"
                    />
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                    <input
                      value={profile.tip}
                      onChange={(e) => updateProfile({ tip: e.target.value })}
                      className="w-14 bg-bg-card-hover border border-border-default rounded px-1.5 py-1 text-text-primary focus:outline-none focus:border-accent transition-colors"
                    />
                  </span>
                  <span className="flex items-center gap-1.5 ml-auto">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span className="text-text-secondary">On</span>
                    <Toggle checked={profile.mevProtect} onChange={(v) => updateProfile({ mevProtect: v })} />
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="shrink-0">Auto Fee</span>
                  <Toggle checked={profile.autoFeeBuy} onChange={(v) => updateProfile({ autoFeeBuy: v })} />
                  <input
                    value={profile.maxFeeBuy}
                    onChange={(e) => updateProfile({ maxFeeBuy: e.target.value })}
                    disabled={profile.autoFeeBuy}
                    className="w-16 bg-bg-card-hover border border-border-default rounded px-2 py-1 text-text-primary text-xs focus:outline-none focus:border-accent transition-colors disabled:opacity-40"
                  />
                  <span className="text-text-muted">MAX Fee</span>
                </div>
              </div>

              {/* Sell */}
              <div className="bg-bg-base border border-border-default rounded-xl p-4">
                <p className="text-clr-red text-sm font-semibold mb-3">Sell</p>
                <div className="grid grid-cols-4 gap-1.5 mb-3">
                  {profile.sellAmounts.map((v, i) => (
                    <AmountChip key={i} value={v} onChange={(val) => updateSellAmount(i, val)} />
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap text-xs text-text-muted mb-3">
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h9m-9 6h18"/></svg>
                    <input
                      value={profile.slippage}
                      onChange={(e) => updateProfile({ slippage: e.target.value })}
                      className="w-10 bg-bg-card-hover border border-border-default rounded px-1.5 py-1 text-text-primary focus:outline-none focus:border-accent transition-colors"
                    />
                    <span>%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8"/></svg>
                    <input
                      value={profile.mevFee}
                      onChange={(e) => updateProfile({ mevFee: e.target.value })}
                      className="w-14 bg-bg-card-hover border border-border-default rounded px-1.5 py-1 text-text-primary focus:outline-none focus:border-accent transition-colors"
                    />
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                    <input
                      value={profile.tip}
                      onChange={(e) => updateProfile({ tip: e.target.value })}
                      className="w-14 bg-bg-card-hover border border-border-default rounded px-1.5 py-1 text-text-primary focus:outline-none focus:border-accent transition-colors"
                    />
                  </span>
                  <span className="flex items-center gap-1.5 ml-auto">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span className="text-text-secondary">On</span>
                    <Toggle checked={profile.mevProtect} onChange={(v) => updateProfile({ mevProtect: v })} />
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="shrink-0">Auto Fee</span>
                  <Toggle checked={profile.autoFeeSell} onChange={(v) => updateProfile({ autoFeeSell: v })} />
                  <input
                    value={profile.maxFeeSell}
                    onChange={(e) => updateProfile({ maxFeeSell: e.target.value })}
                    disabled={profile.autoFeeSell}
                    className="w-16 bg-bg-card-hover border border-border-default rounded px-2 py-1 text-text-primary text-xs focus:outline-none focus:border-accent transition-colors disabled:opacity-40"
                  />
                  <span className="text-text-muted">MAX Fee</span>
                </div>
              </div>
            </div>

            {/* Quick Buy */}
            <div className="mt-4 bg-bg-base border border-border-default rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-text-primary font-semibold text-sm">Quick Buy</p>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-card-hover border border-border-default rounded-lg text-sm text-text-secondary">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h9m-9 6h18"/></svg>
                  <input
                    value={quickBuyAmount}
                    onChange={(e) => setQuickBuyAmount(e.target.value)}
                    className="w-12 bg-transparent focus:outline-none text-text-primary"
                  />
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 bg-bg-card-hover border border-border-default rounded-lg text-sm text-text-secondary">
                  <span>P{quickBuyProfile + 1}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <button className="w-6 h-6 rounded-full border border-border-default flex items-center justify-center text-text-muted text-xs hover:text-text-secondary transition-colors">?</button>
              </div>
              <p className="text-text-muted text-xs">Instantly executes your buy order based on your entered amount</p>
            </div>
          </section>

          {/* ── Platform Integration ── */}
          <section className="bg-bg-card border border-border-default rounded-2xl p-6">
            <h2 className="text-text-primary font-semibold text-base mb-1">Platform Integration</h2>
            <p className="text-text-muted text-xs mb-5">Optimize experience when multiple extensions are displayed simultaneously</p>
            <div className="space-y-4">
              {PLATFORMS.map(({ key, label, icon }) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center shrink-0">{icon}</span>
                    <span className="text-text-primary text-sm font-medium">{label}</span>
                  </div>
                  <Toggle
                    checked={integrations[key]}
                    onChange={(v) => setIntegrations((prev) => ({ ...prev, [key]: v }))}
                  />
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </AccountGuard>
  );
}
