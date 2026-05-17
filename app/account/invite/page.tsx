"use client";

import { useState } from "react";
import { Copy, Edit2, ChevronRight, HelpCircle } from "lucide-react";
import AccountGuard from "@/components/AccountGuard";
import QuestCard from "@/components/QuestCard";
import { useAuth } from "@/context/AuthContext";
import ConvertFlow from "@/components/ConvertFlow";

const QUESTS = [
  {
    title: "Hidden Treasure Expedition",
    points: 15,
    tasks: [
      { label: "Make 5 transactions", current: 5, total: 5, completed: true },
      { label: "Subscribe to the Moni Twitter", current: 1, total: 1, completed: true },
      { label: "Create a volume of SOL", current: 5, total: 5, completed: true },
    ],
    allCompleted: true,
  },
  {
    title: "Magical Forest Quest",
    points: 15,
    tasks: [
      { label: "A brief description of the task", current: 2, total: 5, completed: false },
    ],
  },
  {
    title: "Mystery of the Forgotten Ruins",
    points: 15,
    tasks: [
      { label: "A brief description of the task", current: 1, total: 10, completed: false },
    ],
  },
];

export default function InvitePage() {
  const { points, addPoints } = useAuth();
  const refCode = "ГИ9и8пврп";
  const [copied, setCopied] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [xConnected, setXConnected] = useState(false);
  const [showConvert, setShowConvert] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    setClaimed(true);
    addPoints(200);
  };

  return (
    <AccountGuard>
      <div className="max-w-5xl px-8 py-10">
        <h1 className="text-2xl font-bold text-text-primary mb-8">Invite & Quests</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Referral */}
          <div className="space-y-4">
            {/* Banner */}
            <div className="bg-gradient-to-br from-accent/20 to-bg-card border border-accent/20 rounded-2xl p-6 flex items-center gap-4">
              <div className="text-4xl">🎁</div>
              <div>
                <h2 className="text-text-primary font-semibold mb-0.5">Invite friends and get rewarded</h2>
                <p className="text-text-secondary text-sm">Every time they trade, you earn commissions</p>
              </div>
            </div>

            {/* Invite code */}
            <div className="bg-bg-card border border-border-default rounded-2xl p-5">
              <label className="text-text-muted text-xs uppercase tracking-widest mb-3 block">Invite code</label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={refCode}
                  className="flex-1 bg-bg-base border border-border-default rounded-xl px-4 py-2.5 text-text-primary text-sm"
                />
                <button className="p-2.5 bg-bg-card-hover border border-border-default rounded-xl text-text-muted hover:text-text-secondary transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={handleCopy} className="p-2.5 bg-bg-card-hover border border-border-default rounded-xl text-text-muted hover:text-text-secondary transition-colors">
                  {copied ? <span className="text-clr-green text-xs">✓</span> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-bg-card border border-border-default rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-4 text-sm text-text-muted">
                  <span>Remaining <span className="text-text-primary font-medium">23</span></span>
                  <span>·</span>
                  <span>Remaining <span className="text-text-primary font-medium">17</span></span>
                </div>
                <button className="text-accent text-xs flex items-center gap-0.5">All <ChevronRight size={12} /></button>
              </div>

              <div className="border-t border-border-default pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Total rewards</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-primary font-semibold">33 SOL</span>
                    <button className="text-accent text-xs flex items-center gap-0.5">History <ChevronRight size={12} /></button>
                    <span className="text-xl">🟠</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Unclaimed</span>
                  <div className="flex items-center gap-2">
                    <span className="text-clr-green font-semibold">2 SOL</span>
                    <button
                      onClick={handleClaim}
                      disabled={claimed}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${claimed ? "bg-clr-green/20 text-clr-green" : "bg-accent hover:bg-accent-hover text-white"}`}
                    >
                      {claimed ? "Claimed ✓" : "Claim"}
                    </button>
                  </div>
                </div>
                {!claimed && <p className="text-text-muted text-xs">Min 0.5 SOL to withdraw</p>}
              </div>
            </div>

            {/* Level */}
            <div className="bg-bg-card border border-border-default rounded-2xl p-5">
              <div className="flex justify-between mb-3">
                <div>
                  <div className="text-text-muted text-xs mb-0.5">≡ 0.000</div>
                  <div className="text-text-secondary text-sm">Level One · 2% Commission</div>
                  <div className="text-text-muted text-xs">$0.05 Saved</div>
                </div>
                <button className="text-accent text-xs">Next level</button>
              </div>
              <div className="w-full h-1.5 bg-border-default rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "12%" }} />
              </div>
              <p className="text-text-muted text-xs mt-2">Trade N SOL in volume to reach Level 2</p>
            </div>

            {/* Feed */}
            <div className="bg-bg-card border border-border-default rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-text-primary font-medium text-sm">Feed</span>
                <button className="text-accent text-xs flex items-center gap-0.5">All <ChevronRight size={12} /></button>
              </div>
              {[
                { type: "Reward", val: "+0.1 SOL", color: "text-clr-green", time: "1m" },
                { type: "Invited", val: "+1 referral", color: "text-accent", time: "1m" },
                { type: "Quests", val: "+15 points", color: "text-clr-yellow", time: "1m" },
              ].map(({ type, val, color, time }) => (
                <div key={type} className="flex items-center justify-between py-2 border-t border-border-default first:border-0">
                  <span className="text-text-secondary text-sm">{type}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${color}`}>{val}</span>
                    <span className="text-text-muted text-xs">{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Points + Quests */}
          <div className="space-y-4">
            {/* Points */}
            <div className="bg-bg-card border border-border-default rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-text-muted text-xs uppercase tracking-widest block mb-1">Points</span>
                  <span className="text-2xl font-bold text-text-primary">{points.toLocaleString()}</span>
                </div>
                <button className="text-text-muted hover:text-text-secondary mt-0.5">
                  <HelpCircle size={16} />
                </button>
              </div>
              <p className="text-text-muted text-xs mb-3">
                Convert to Credits · use Credits for API calls &amp; plan upgrades
              </p>
              <button
                onClick={() => setShowConvert(true)}
                className="w-full py-2 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium transition-colors"
              >
                Convert Points → Credits
              </button>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-text-primary font-semibold">Quests</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setXConnected((v) => !v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${xConnected ? "border-clr-green/30 bg-clr-green/10 text-clr-green" : "border-border-default bg-bg-card text-text-secondary hover:border-border-light"}`}
                >
                  {xConnected ? "X connected ✓" : "Connect X 🔗"}
                </button>
                <button className="text-accent text-xs flex items-center gap-0.5">All <ChevronRight size={12} /></button>
              </div>
            </div>

            {QUESTS.map((q) => (
              <QuestCard key={q.title} {...q} />
            ))}
          </div>
        </div>
      </div>
      {showConvert && <ConvertFlow onClose={() => setShowConvert(false)} />}
    </AccountGuard>
  );
}
