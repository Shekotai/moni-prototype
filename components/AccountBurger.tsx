"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Settings, CreditCard, Zap, Users, LogOut, BarChart2, Globe, SlidersHorizontal, Wallet } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AccountBurgerProps {
  onClose: () => void;
}


export default function AccountBurger({ onClose }: AccountBurgerProps) {
  const { user, logout } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-64 bg-bg-card border border-border-default rounded-xl shadow-2xl z-50 overflow-hidden"
    >
      {/* Email + logout */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-default">
        <span className="text-text-secondary text-sm truncate">{user?.email}</span>
        <button
          onClick={() => { logout(); onClose(); }}
          className="text-text-muted hover:text-clr-red transition-colors ml-2 flex items-center gap-1 text-xs shrink-0"
        >
          <LogOut size={13} /> Out
        </button>
      </div>

      {/* Nav links */}
      <nav className="py-1">
        {[
          { icon: <Settings size={14} />,           label: "Profile",  href: "/account/profile" },
          { icon: <CreditCard size={14} />,         label: "Plans",    href: "/pricing" },
          { icon: <Wallet size={14} />,             label: "Payment",  href: "/account/payment" },
          { icon: <Zap size={14} />,                label: "API",      href: "/account/api" },
          { icon: <Users size={14} />,              label: "Invite",   href: "/account/invite" },
          { icon: <BarChart2 size={14} />,          label: "Usage",    href: "/account/usage" },
          { icon: <SlidersHorizontal size={14} />,  label: "Settings", href: "/account/settings" },
        ].map(({ icon, label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-colors text-sm"
          >
            <span className="text-text-muted">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      {/* Add to Chrome — moved here when logged in */}
      <div className="border-t border-border-default px-3 py-3">
        <button className="w-full flex items-center justify-center gap-2 py-2 bg-bg-card-hover border border-border-default hover:border-border-light rounded-lg text-text-secondary text-xs font-medium transition-all">
          <Globe size={13} /> Add to Chrome
        </button>
      </div>

      {/* Social links */}
      <div className="border-t border-border-default px-4 py-3 flex items-center gap-3 flex-wrap">
        {["Telegram", "X", "Discord"].map((label) => (
          <a key={label} href="#" target="_blank" rel="noopener noreferrer"
            className="text-text-muted hover:text-text-secondary text-xs transition-colors">
            {label} ↗
          </a>
        ))}
      </div>

      {/* Docs / GitHub / Changelog */}
      <div className="border-t border-border-default px-4 py-3 flex gap-4">
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-secondary text-xs transition-colors">GitHub ↗</a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-secondary text-xs transition-colors">Docs ↗</a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-secondary text-xs transition-colors">Changelog ↗</a>
      </div>
    </div>
  );
}
