import { Globe, Send } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero */}
      <section className="py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs mb-6">
          ✦ AI-powered Solana trading
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-text-primary mb-4 leading-tight">
          Trade smarter with <span className="text-accent">Moni</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mx-auto mb-10">
          Real-time market intelligence, discovery tools, and AI insights — all in one extension.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover rounded-xl text-white font-medium transition-colors">
            <Globe size={18} /> Add to Chrome
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-bg-card border border-border-default hover:border-border-light rounded-xl text-text-primary font-medium transition-colors">
            <Send size={18} /> Telegram Bot
          </button>
        </div>
      </section>

      {/* Trading Engine */}
      <section id="trading-engine" className="py-20 border-t border-border-default scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest mb-3 block">Core Feature</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Trading Engine</h2>
          <p className="text-text-secondary">
            Execute trades at lightning speed with our proprietary engine. Built for Solana, optimized for performance.
            Sub-second execution, real-time order books, and smart routing.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Avg execution", value: "<50ms" },
            { label: "Daily volume", value: "$2.4M" },
            { label: "Active traders", value: "12,400" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-bg-card border border-border-default rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-1">{value}</div>
              <div className="text-text-muted text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Discovery */}
      <section id="discovery" className="py-20 border-t border-border-default scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-clr-green text-xs font-semibold uppercase tracking-widest mb-3 block">Discovery</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Find the next gem</h2>
          <p className="text-text-secondary">
            Scan thousands of tokens in real time. Filter by volume, liquidity, social signals, and on-chain activity before anyone else.
          </p>
        </div>
        <div className="mt-12 bg-bg-card border border-border-default rounded-2xl p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {["Volume filter", "Liquidity scan", "Social signals", "On-chain alerts"].map((f) => (
              <div key={f} className="p-4 bg-bg-card-hover rounded-xl">
                <div className="text-accent text-xl mb-2">✦</div>
                <div className="text-text-secondary text-sm">{f}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ask Moni AI */}
      <section id="ask-moni" className="py-20 border-t border-border-default scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-clr-yellow text-xs font-semibold uppercase tracking-widest mb-3 block">AI Assistant</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Ask Moni AI</h2>
          <p className="text-text-secondary">
            Natural language queries about any token, wallet, or market trend. Get instant, AI-powered answers backed by real blockchain data.
          </p>
        </div>
        <div className="mt-10 max-w-xl mx-auto bg-bg-card border border-border-default rounded-2xl p-4 flex items-center gap-3">
          <div className="flex-1 text-text-muted text-sm">Ask anything about Solana markets...</div>
          <button className="px-4 py-1.5 bg-accent rounded-lg text-white text-sm">Ask</button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border-default text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">Ready to trade smarter?</h2>
        <p className="text-text-secondary mb-8">Join thousands of traders using Moni every day.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover rounded-xl text-white font-medium transition-colors">
            <Globe size={18} /> Add to Chrome
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-bg-card border border-border-default hover:border-border-light rounded-xl text-text-primary font-medium transition-colors">
            <Send size={18} /> Telegram Bot
          </button>
        </div>
      </section>
    </div>
  );
}
