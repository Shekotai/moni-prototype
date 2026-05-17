"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Trash2, Plus, Zap, Users, History, Wallet, Tag, BarChart2, Brain, TrendingUp, Sparkles, Lock } from "lucide-react";
import AccountGuard from "@/components/AccountGuard";
import { useAuth } from "@/context/AuthContext";

interface ApiKey {
  id: string;
  key: string;
  calls: number;
}

export default function ApiPage() {
  const { credits, maxCredits, spendCredits, addCredits, user } = useAuth();
  const isPro = user?.plan === "PRO";
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  const creditPct = Math.round((credits / maxCredits) * 100);

  const createKey = () => {
    const id = Math.random().toString(36).slice(2, 8);
    const key = `sk-moni-${id}-${Math.random().toString(36).slice(2, 8)}`;
    setKeys((prev) => [...prev, { id, key, calls: 0 }]);
  };

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const testCall = (id: string) => {
    if (credits < 1) {
      setTestResult("❌ Not enough credits");
      return;
    }
    spendCredits(1);
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, calls: k.calls + 1 } : k))
    );
    setTestResult("✅ Request sent — 1 credit consumed");
    setTimeout(() => setTestResult(null), 3000);
  };

  const maskKey = (key: string) => {
    const parts = key.split("-");
    return `${parts[0]}-${parts[1]}-****-****`;
  };

  return (
    <AccountGuard>
      <div className="max-w-4xl px-8 py-10">
        <h1 className="text-2xl font-bold text-text-primary mb-8">API</h1>

        {/* Pro-only gate */}
        {!isPro && (
          <div className="mb-6 flex items-center gap-4 px-5 py-4 bg-accent/5 border border-accent/20 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <Lock size={18} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary font-semibold text-sm">API access requires Pro</p>
              <p className="text-text-muted text-xs mt-0.5">Unlock API keys, full endpoint access, and unlimited requests.</p>
            </div>
            <Link
              href="/pricing/checkout?plan=pro"
              className="shrink-0 px-4 py-2 bg-accent hover:bg-accent-hover rounded-lg text-white text-xs font-semibold transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${!isPro ? "relative" : ""}`}>
          {!isPro && (
            <div className="absolute inset-0 z-10 rounded-xl backdrop-blur-[3px] bg-bg-base/40 flex items-center justify-center">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
                  <Lock size={24} className="text-accent" />
                </div>
                <p className="text-text-primary font-semibold mb-1">Pro plan required</p>
                <p className="text-text-muted text-sm mb-4">API access is available on the Pro plan only.</p>
                <Link
                  href="/pricing/checkout?plan=pro"
                  className="inline-block px-6 py-2.5 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-semibold transition-colors"
                >
                  Upgrade to Pro ⚡
                </Link>
              </div>
            </div>
          )}
          {/* API Keys */}
          <div className="bg-bg-card border border-border-default rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-text-primary font-semibold">API Keys</h2>
              <button
                onClick={createKey}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent-hover rounded-lg text-white text-xs font-medium transition-colors"
              >
                <Plus size={13} /> Create API Key
              </button>
            </div>

            {keys.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-clr-red text-sm font-medium">No API Keys Found</p>
                <p className="text-text-muted text-xs mt-1">Create your first key above</p>
              </div>
            ) : (
              <div className="space-y-2">
                {keys.map((k) => (
                  <div key={k.id} className="p-3 bg-bg-base border border-border-default rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="flex-1 text-text-secondary text-xs font-mono truncate">
                        {maskKey(k.key)}
                      </code>
                      <button
                        onClick={() => copyKey(k.key)}
                        className="p-1.5 text-text-muted hover:text-text-secondary transition-colors"
                        title="Copy"
                      >
                        {copied === k.key ? (
                          <span className="text-clr-green text-xs">✓</span>
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                      <button
                        onClick={() => revokeKey(k.id)}
                        className="p-1.5 text-text-muted hover:text-clr-red transition-colors"
                        title="Revoke"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted text-xs">{k.calls} calls</span>
                      <button
                        onClick={() => testCall(k.id)}
                        className="flex items-center gap-1 px-2 py-1 bg-bg-card-hover border border-border-default hover:border-accent/40 rounded-lg text-text-muted hover:text-accent text-xs transition-colors"
                      >
                        <Zap size={11} /> Test call (−1 credit)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {testResult && (
              <p className="mt-3 text-xs text-text-secondary bg-bg-base border border-border-default rounded-lg px-3 py-2">
                {testResult}
              </p>
            )}
          </div>

          {/* Credits */}
          <div className="bg-bg-card border border-border-default rounded-xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🌐</span>
              <h2 className="text-text-primary font-semibold">API Credits</h2>
            </div>
            <p className="text-text-secondary text-sm mb-5">
              Credits for API calls
            </p>

            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-text-primary">{creditPct}%</span>
                <span className="text-text-secondary text-sm">{credits} left</span>
              </div>
              <div className="w-full h-2 bg-border-default rounded-full overflow-hidden mb-1">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${creditPct}%`,
                    backgroundColor: creditPct < 20 ? "#e05555" : "#f0b428",
                  }}
                />
              </div>
              <p className="text-text-muted text-xs mb-5">
                Each API call costs 1 credit · Credits can also be applied toward plan upgrades
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => addCredits(100)}
                className="w-full py-2.5 bg-accent hover:bg-accent-hover rounded-xl text-white text-sm font-medium transition-colors"
              >
                Buy Credits (+100)
              </button>
              <p className="text-center text-text-muted text-xs">
                or convert Points → Credits on the{" "}
                <a href="/account/usage" className="text-accent hover:underline">Usage page</a>
              </p>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="mt-10">
          <div className="mb-5">
            <p className="text-text-muted text-xs uppercase tracking-widest mb-1">Available endpoints</p>
            <p className="text-text-secondary text-sm">Programmatic access to Moni data — connect to your tools, models and dashboards.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: <TrendingUp size={16} />,  title: "Token Analytics",      desc: "Real-time price, volume, liquidity and on-chain metrics for any Solana token." },
              { icon: <Wallet size={16} />,       title: "Wallet Profiler",      desc: "Full trading history, PnL, and activity breakdown for any wallet address." },
              { icon: <Users size={16} />,        title: "Smart Followers",      desc: "Top-20 smart-money followers of any Twitter / X account." },
              { icon: <History size={16} />,      title: "CA History",           desc: "Contracts previously mentioned by KOLs in your watchlist." },
              { icon: <Tag size={16} />,          title: "Wallet Labels",        desc: "Request labels and tags for any wallet address." },
              { icon: <BarChart2 size={16} />,    title: "Market Screener",      desc: "Filter tokens by volume, liquidity, age, and social signals in real time." },
              { icon: <Brain size={16} />,        title: "AI Signals",           desc: "LLM-powered market summaries and trading signal feed." },
              { icon: <History size={16} />,      title: "Rename History",       desc: "Past username changes for tracked Twitter accounts." },
              { icon: <Sparkles size={16} />,     title: "More",                 desc: "Additional endpoints available on request.", accent: true },
            ].map(({ icon, title, desc, accent }) => (
              <div
                key={title}
                className={`rounded-xl border p-4 flex flex-col gap-3 transition-colors ${
                  accent
                    ? "border-accent/30 bg-accent/5"
                    : "border-border-default bg-bg-card hover:border-border-light"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                  accent
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-border-default bg-bg-card-hover text-text-muted"
                }`}>
                  {icon}
                </div>
                <div>
                  <p className="text-text-primary text-sm font-medium mb-1">{title}</p>
                  <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccountGuard>
  );
}
