import Link from "next/link";
import { Globe, Send, Zap, Search, Brain, ArrowRight, ChevronRight } from "lucide-react";

const STATS = [
  { value: "<50ms",  label: "Avg execution"  },
  { value: "$2.4M",  label: "Daily volume"   },
  { value: "12,400", label: "Active traders" },
];

const FEATURES = [
  {
    icon: <Zap size={18} className="text-accent" />,
    label: "Trading Engine",
    href: "/#trading-engine",
    title: "Execute at the speed of thought",
    body: "Sub-second execution, real-time order books, and smart routing — built exclusively for Solana.",
  },
  {
    icon: <Search size={18} className="text-clr-green" />,
    label: "Discovery",
    href: "/#discovery",
    title: "Find the next gem before anyone else",
    body: "Scan thousands of tokens in real time. Filter by volume, liquidity, social signals, and on-chain activity.",
  },
  {
    icon: <Brain size={18} className="text-clr-yellow" />,
    label: "Ask Moni AI",
    href: "/#ask-moni",
    title: "Natural language market intelligence",
    body: "Ask anything about any token, wallet, or trend. Instant AI-powered answers backed by real blockchain data.",
  },
];

export default function Home() {
  return (
    <div className="relative">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-accent pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-24 pb-20 text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
            AI-powered Solana trading
          </div>

          <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-semibold text-text-primary leading-[1.08] tracking-tight mb-6 text-balance">
            Intelligence and trading layer<br />that <span className="text-accent">follows you</span>
          </h1>

          <p className="animate-fade-up delay-200 text-text-secondary text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Smart-money wallets, social signals, and one-click trades —{" "}
            overlaid on X, terminals, and Telegram.
          </p>

          <div className="animate-fade-up delay-300 flex flex-wrap gap-3 justify-center">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium">
              <Globe size={15} /> Add to Chrome
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-bg-card border border-border-default hover:border-border-light rounded-lg text-text-primary text-sm font-medium">
              <Send size={15} /> Telegram Bot
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-t border-border-default">
        <div className="max-w-4xl mx-auto px-5 py-12 grid grid-cols-3 divide-x divide-border-default">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center px-4">
              <div className="text-3xl font-semibold text-text-primary tracking-tight mb-1">{value}</div>
              <div className="text-text-muted text-xs uppercase tracking-widest font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="trading-engine" className="border-t border-border-default scroll-mt-14">
        <div className="max-w-5xl mx-auto px-5 py-20">
          <div className="text-center mb-14">
            <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">Platform</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight">
              Everything you need to trade better
            </h2>
          </div>

          <div id="discovery" className="grid grid-cols-1 md:grid-cols-3 gap-3 scroll-mt-14">
            {FEATURES.map(({ icon, label, href, title, body }) => (
              <div key={label}
                className="relative bg-bg-card border border-border-default rounded-xl p-6 hover:border-border-light card-highlight overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-bg-card-hover border border-border-default flex items-center justify-center mb-4">
                  {icon}
                </div>
                <p className="text-[11px] text-text-muted uppercase tracking-widest font-semibold mb-2">{label}</p>
                <h3 className="text-text-primary font-semibold text-[15px] leading-snug mb-2">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{body}</p>
                <a href={href} className="inline-flex items-center gap-1 text-text-muted hover:text-text-secondary text-xs">
                  Learn more <ChevronRight size={11} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ask Moni AI ── */}
      <section id="ask-moni" className="border-t border-border-default scroll-mt-14">
        <div className="max-w-3xl mx-auto px-5 py-20 text-center">
          <p className="text-xs text-clr-yellow font-semibold uppercase tracking-widest mb-3">AI Assistant</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight mb-4">
            Ask Moni AI anything
          </h2>
          <p className="text-text-secondary mb-10 leading-relaxed">
            Natural language queries about any token, wallet, or market trend.
            Get instant answers backed by real blockchain data.
          </p>

          <div className="bg-bg-card border border-border-default rounded-xl p-4 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-clr-green animate-pulse-glow" />
              <span className="text-text-muted text-xs">Moni AI · ready</span>
            </div>
            <div className="flex items-center gap-3 bg-bg-card-hover border border-border-default rounded-lg px-4 py-3">
              <span className="flex-1 text-text-muted text-sm">Ask anything about Solana markets...</span>
              <button className="px-3 py-1.5 bg-accent hover:bg-accent-hover rounded-md text-white text-xs font-medium shrink-0">Ask</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["What&apos;s trending today?", "Top volume tokens", "Analyze this wallet"].map((q) => (
                <button key={q}
                  className="px-3 py-1 bg-bg-base border border-border-default hover:border-border-light rounded-md text-text-muted hover:text-text-secondary text-xs"
                  dangerouslySetInnerHTML={{ __html: q }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border-default">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-accent pointer-events-none opacity-60" />
          <div className="relative max-w-3xl mx-auto px-5 py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight mb-4">
              Ready to trade smarter?
            </h2>
            <p className="text-text-secondary mb-8">Join thousands of traders using Moni every day.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium">
                <Globe size={15} /> Add to Chrome — it&apos;s free
              </button>
              <Link href="/pricing"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-bg-card border border-border-default hover:border-border-light rounded-lg text-text-primary text-sm font-medium">
                View plans <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
