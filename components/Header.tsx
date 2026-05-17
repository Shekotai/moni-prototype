"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Globe, ScrollText, BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AccountBurger from "./AccountBurger";

const TelegramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.258 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const DiscordIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.022.015.04.03.048a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);

function SocialIconBtn({ href, children, label }: { href: string; children: React.ReactNode; label: string }) {
  return (
    <div className="relative group">
      <a href={href} target="_blank" rel="noopener noreferrer"
        className="w-7 h-7 flex items-center justify-center rounded-md bg-bg-card border border-border-default text-text-muted hover:text-text-secondary hover:border-border-light">
        {children}
      </a>
      <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-bg-card border border-border-default rounded-md text-text-secondary text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
        {label}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-bg-card border-l border-t border-border-default rotate-45" />
      </div>
    </div>
  );
}

const PRODUCTS_MENU = [
  { label: "API",          href: "https://api.moni.ai",      external: true },
  { label: "Research",     href: "https://research.moni.ai", external: true },
  { label: "Community",    href: "https://t.me/moni",        external: true },
  { label: "Checker Bot",  href: "https://t.me/moni_bot",    external: true },
];

export default function Header() {
  const { isLoggedIn, user } = useAuth();
  const [showProducts, setShowProducts] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const shortName = user ? user.email.split("@")[0].slice(0, 10) : "";

  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-bg-base/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-5 h-[52px] flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="text-[15px] font-semibold tracking-tight text-text-primary">
            <span className="text-accent">M</span>oni
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0 flex-1 justify-center">
          {[
            { label: "Trading Engine", href: "/#trading-engine" },
            { label: "Discovery",      href: "/#discovery" },
            { label: "Ask Moni AI",    href: "/#ask-moni" },
          ].map(({ label, href }) => (
            <a key={href} href={href}
              className="px-3 py-1.5 text-[13px] text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-card">
              {label}
            </a>
          ))}

          {/* Products dropdown */}
          <div className="relative">
            <button onClick={() => setShowProducts((v) => !v)}
              className="flex items-center gap-1 px-3 py-1.5 text-[13px] text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-card">
              Products
              <ChevronDown size={12} className={`transition-transform duration-200 ${showProducts ? "rotate-180" : ""}`} />
            </button>
            {showProducts && (
              <div className="absolute top-full left-0 mt-1.5 w-44 bg-bg-card border border-border-default rounded-lg py-1 z-50 shadow-2xl shadow-black/50">
                {PRODUCTS_MENU.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 text-[13px] text-text-secondary hover:text-text-primary hover:bg-bg-card-hover">
                    {item.label}
                    <span className="text-text-muted text-xs">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <Link href="/pricing"
            className="px-3 py-1.5 text-[13px] text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-card">
            Pricing
          </Link>
          <a href="#"
            className="px-3 py-1.5 text-[13px] text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-card">
            Affiliates ↗
          </a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          {!isLoggedIn ? (
            <>
              <div className="hidden sm:flex items-center gap-1">
                <SocialIconBtn href="#" label="Telegram"><TelegramIcon /></SocialIconBtn>
                <SocialIconBtn href="#" label="X / Twitter"><XIcon /></SocialIconBtn>
                <SocialIconBtn href="#" label="Discord"><DiscordIcon /></SocialIconBtn>
                <SocialIconBtn href="#" label="Changelog"><ScrollText size={12} /></SocialIconBtn>
                <SocialIconBtn href="#" label="Docs"><BookOpen size={12} /></SocialIconBtn>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border-default mx-1" />
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-bg-card border border-border-default hover:border-border-light rounded-md text-[13px] text-text-secondary hover:text-text-primary">
                <Globe size={12} /> Add to Chrome
              </button>
              <Link href="/login"
                className="px-3 py-1.5 bg-accent hover:bg-accent-hover rounded-md text-[13px] font-medium text-white">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative flex items-center gap-2">
              <span className="hidden sm:flex items-center px-2 py-0.5 bg-clr-green/10 border border-clr-green/20 rounded text-clr-green text-[11px] font-semibold tracking-wide">
                {user?.plan}
              </span>
              <button onClick={() => setShowBurger((v) => !v)}
                className="flex items-center gap-2 px-2 py-1.5 bg-bg-card border border-border-default hover:border-border-light rounded-md">
                <img src={user?.avatar ?? "/mock-avatar.png"} alt="avatar"
                  className="w-5 h-5 rounded-full object-cover bg-bg-card-hover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='%237c5cf5'%3E%3Ccircle cx='12' cy='8' r='4'/%3E%3Cpath d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/%3E%3C/svg%3E";
                  }}
                />
                <span className="text-[13px] text-text-secondary hidden sm:block">{shortName}</span>
                <Menu size={13} className="text-text-muted" />
              </button>
              {showBurger && <AccountBurger onClose={() => setShowBurger(false)} />}
            </div>
          )}
          <button className="lg:hidden p-1.5 text-text-muted hover:text-text-primary"
            onClick={() => setShowMobileNav((v) => !v)}>
            {showMobileNav ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {showMobileNav && (
        <div className="lg:hidden border-t border-border-default bg-bg-base/95 backdrop-blur-md px-5 py-3 flex flex-col gap-0.5">
          {[
            { label: "Trading Engine", href: "/#trading-engine" },
            { label: "Discovery",      href: "/#discovery" },
            { label: "Ask Moni AI",    href: "/#ask-moni" },
            { label: "Pricing",        href: "/pricing" },
          ].map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setShowMobileNav(false)}
              className="py-2 text-sm text-text-secondary hover:text-text-primary">
              {label}
            </a>
          ))}
          {!isLoggedIn && (
            <div className="flex items-center gap-3 pt-2 mt-1 border-t border-border-default">
              {["Telegram", "X", "Discord"].map((s) => (
                <a key={s} href="#" className="text-text-muted hover:text-text-secondary text-xs">{s}</a>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
