"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, CreditCard, Zap, Users, BarChart2, SlidersHorizontal, Wallet } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { icon: Settings,           label: "Profile",  href: "/account/profile" },
  { icon: CreditCard,         label: "Plans",    href: "/pricing" },
  { icon: Wallet,             label: "Payment",  href: "/account/payment" },
  { icon: Zap,                label: "API",      href: "/account/api" },
  { icon: Users,              label: "Invite",   href: "/account/invite" },
  { icon: BarChart2,          label: "Usage",    href: "/account/usage" },
  { icon: SlidersHorizontal,  label: "Settings", href: "/account/settings" },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="w-52 shrink-0 border-r border-border-default bg-bg-base sticky top-14 h-[calc(100vh-56px)] flex flex-col overflow-y-auto">
      {/* User info */}
      <div className="px-4 py-4 border-b border-border-default">
        <div className="flex items-center gap-2.5">
          <img
            src={user?.avatar ?? "/mock-avatar.png"}
            alt="avatar"
            className="w-7 h-7 rounded-full bg-bg-card-hover object-cover shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%237c5cf5'%3E%3Ccircle cx='12' cy='8' r='4'/%3E%3Cpath d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/%3E%3C/svg%3E";
            }}
          />
          <div className="min-w-0">
            <p className="text-text-primary text-xs font-medium truncate">{user?.name ?? "—"}</p>
            <p className="text-text-muted text-xs truncate">{user?.plan}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2">
        {NAV.map(({ icon: Icon, label, href }) => {
          const active =
            pathname === href ||
            (href.startsWith("/account") && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors relative ${
                active
                  ? "text-text-primary bg-bg-card"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
              )}
              <Icon
                size={14}
                className={active ? "text-accent" : "text-text-muted"}
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
