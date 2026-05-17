"use client";

import { useState } from "react";
import { Copy, Trash2, Plus, Zap } from "lucide-react";
import AccountGuard from "@/components/AccountGuard";
import { useAuth } from "@/context/AuthContext";

interface ApiKey {
  id: string;
  key: string;
  calls: number;
}

export default function ApiPage() {
  const { credits, maxCredits, spendCredits, addCredits } = useAuth();
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* API Keys */}
          <div className="bg-bg-card border border-border-default rounded-2xl p-6">
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
          <div className="bg-bg-card border border-border-default rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🪙</span>
              <h2 className="text-text-primary font-semibold">Credits</h2>
            </div>
            <p className="text-text-secondary text-sm mb-5">
              Credits for service use
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
      </div>
    </AccountGuard>
  );
}
