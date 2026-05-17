"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, CreditCard, Zap, Users, BarChart2, SlidersHorizontal, Wallet } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { icon: Settings,           label: "Profile",  href: "/account/profile" },
  { icon: BarChart2,          label: "Usage",    href: "/account/usage" },
  { icon: Users,              label: "Invite",   href: "/account/invite" },
  { icon: Zap,                label: "API",      href: "/account/api" },
  { icon: CreditCard,         label: "Plans",    href: "/account/plans" },
  { icon: Wallet,             label: "Payment",  href: "/account/payment" },
  { icon: SlidersHorizontal,  label: "Settings", href: "/account/settings" },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="w-48 shrink-0 border-r border-border-default bg-bg-base sticky top-[52px] h-[calc(100vh-52px)] flex flex-col">
      {/* User */}
      <div className="px-4 py-4 border-b border-border-default">
        <div className="flex items-center gap-2.5">
          <img
            src={user?.avatar ?? "/mock-avatar.png"}
            alt="avatar"
            className="w-7 h-7 rounded-full object-cover bg-bg-card-hover shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%237c5cf5'%3E%3Ccircle cx='12' cy='8' r='4'/%3E%3Cpath d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/%3E%3C/svg%3E";
            }}
          />
          <div className="min-w-0">
            <p className="text-text-primary text-xs font-medium truncate leading-tight">{user?.name ?? "—"}</p>
            <p className="text-[11px] text-text-muted truncate mt-0.5">
              <span className="text-clr-green">{user?.plan}</span> plan
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {NAV.map(({ icon: Icon, label, href }) => {
          const active =
            pathname === href ||
            (href.startsWith("/account") && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={`relative flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors ${
                active
                  ? "text-text-primary bg-bg-card"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-accent rounded-r" />
              )}
              <Icon size={13} className={active ? "text-accent" : "text-text-muted"} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
