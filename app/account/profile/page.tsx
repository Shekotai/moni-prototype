"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Edit2, Upload, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AccountGuard from "@/components/AccountGuard";

export default function ProfilePage() {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.name ?? "time118");
  const [saved, setSaved] = useState(false);
  const refCode = "ГИ9и8пврп";
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AccountGuard>
      <div className="max-w-3xl px-8 py-10">
        <h1 className="text-2xl font-bold text-text-primary mb-8">Profile</h1>

        <div className="space-y-4">
          {/* Username */}
          <div className="bg-bg-card border border-border-default rounded-2xl p-6">
            <label className="text-text-muted text-xs uppercase tracking-widest mb-3 block">Username</label>
            <div className="flex gap-3">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 bg-bg-base border border-border-default rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2.5 bg-accent hover:bg-accent-hover rounded-xl text-white text-sm font-medium transition-colors"
              >
                {saved ? "Saved ✓" : "Save"}
              </button>
            </div>
          </div>

          {/* Avatar */}
          <div className="bg-bg-card border border-border-default rounded-2xl p-6">
            <label className="text-text-muted text-xs uppercase tracking-widest mb-4 block">Avatar</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-bg-card-hover border border-border-default overflow-hidden flex items-center justify-center">
                <img
                  src={user?.avatar ?? "/mock-avatar.png"}
                  alt="avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    (el.parentElement as HTMLDivElement).innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%237c5cf5'><circle cx='12' cy='8' r='4'/><path d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/></svg>`;
                  }}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-bg-card-hover border border-border-default hover:border-border-light rounded-xl text-text-secondary text-sm transition-colors">
                <Upload size={14} /> Upload / Change
              </button>
            </div>
          </div>

          {/* Referral code */}
          <div className="bg-bg-card border border-border-default rounded-2xl p-6">
            <label className="text-text-muted text-xs uppercase tracking-widest mb-3 block">Referral code</label>
            <div className="flex gap-2">
              <input
                readOnly
                value={refCode}
                className="flex-1 bg-bg-base border border-border-default rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none"
              />
              <button className="p-2.5 bg-bg-card-hover border border-border-default hover:border-border-light rounded-xl text-text-muted hover:text-text-secondary transition-colors">
                <Edit2 size={15} />
              </button>
              <button
                onClick={() => handleCopy(refCode)}
                className="p-2.5 bg-bg-card-hover border border-border-default hover:border-border-light rounded-xl text-text-muted hover:text-text-secondary transition-colors"
              >
                {copied ? "✓" : <Copy size={15} />}
              </button>
            </div>
          </div>

          {/* Plan info */}
          <div className="bg-bg-card border border-border-default rounded-2xl p-6">
            <label className="text-text-muted text-xs uppercase tracking-widest mb-4 block">Subscription</label>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-text-primary font-semibold">{user?.plan} Plan</span>
                  <span className="px-2 py-0.5 bg-clr-green/10 border border-clr-green/30 rounded-md text-clr-green text-xs font-semibold">
                    {user?.plan}
                  </span>
                </div>
                <p className="text-text-muted text-xs">Renews June 17, 2026</p>
              </div>
              <Link href="/pricing" className="flex items-center gap-1.5 px-4 py-2 bg-bg-card-hover border border-border-default hover:border-border-light rounded-xl text-text-secondary text-sm transition-colors">
                Manage <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AccountGuard>
  );
}
