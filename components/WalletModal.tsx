"use client";

import { useState } from "react";
import { X, Copy, Check, ChevronDown, AlertCircle, QrCode, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface WalletModalProps {
  amountUsd: number;
  billing: "monthly" | "yearly";
  onClose: () => void;
  onSuccess: () => void;
}

type Network = "SOL" | "ETH";
type Token = "USDC" | "SOL" | "ETH" | "USDT";

const TOKENS: Record<Network, Token[]> = {
  SOL: ["USDC", "SOL", "USDT"],
  ETH: ["USDC", "ETH", "USDT"],
};

const TOKEN_ICON: Record<Token, string> = {
  USDC: "💵",
  SOL:  "◎",
  ETH:  "Ξ",
  USDT: "💲",
};

const TOKEN_LABEL: Record<Token, string> = {
  USDC: "USD Coin",
  SOL:  "Solana",
  ETH:  "Ethereum",
  USDT: "Tether",
};

const WALLET_ADDRESS = "EcSsij...xx9DaK";

export default function WalletModal({ amountUsd, billing, onClose, onSuccess }: WalletModalProps) {
  const { user, connectedWallet } = useAuth();
  const [network, setNetwork] = useState<Network>("SOL");
  const [token, setToken] = useState<Token>("USDC");
  const [showNetworkDrop, setShowNetworkDrop] = useState(false);
  const [showTokenDrop, setShowTokenDrop] = useState(false);
  const [email, setEmail] = useState(user?.email ?? "");
  const [copied, setCopied] = useState(false);
  const [paying, setPaying] = useState(false);

  const notEnoughFunds = token !== "USDC" && token !== "USDT";
  const billingLabel = billing === "yearly" ? "PER YEAR" : "PER MONTH";
  const displayAddress = connectedWallet
    ? connectedWallet.slice(0, 6) + "..." + connectedWallet.slice(-4)
    : WALLET_ADDRESS;

  const handleCopy = () => {
    navigator.clipboard.writeText(connectedWallet ?? "EcSsijxxxxxx9DaK");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePay = () => {
    if (notEnoughFunds || !email.trim()) return;
    setPaying(true);
    setTimeout(() => { setPaying(false); onSuccess(); }, 1800);
  };

  const handleNetworkChange = (n: Network) => {
    setNetwork(n);
    setToken(TOKENS[n][0]);
    setShowNetworkDrop(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-card border border-border-default rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">

        {/* Wallet status bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-default bg-bg-base">
          <div className="flex items-center gap-2">
            {connectedWallet ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-clr-green flex items-center justify-center">
                  <Check size={10} className="text-clr-green" strokeWidth={3} />
                </div>
                <span className="text-clr-green text-xs font-medium">Connected</span>
              </>
            ) : (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-text-muted flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-text-muted" />
                </div>
                <span className="text-text-muted text-xs font-medium">No wallet</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {connectedWallet && (
              <>
                <span className="text-text-secondary text-xs font-mono">{displayAddress}</span>
                <button onClick={handleCopy} className="text-text-muted hover:text-text-secondary transition-colors" title="Copy address">
                  {copied ? <Check size={12} className="text-clr-green" /> : <Copy size={12} />}
                </button>
              </>
            )}
            <button onClick={onClose} className="text-text-muted hover:text-text-secondary ml-0.5 transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>


        {/* Amount */}
        <div className="text-center px-6 pt-6 pb-4">
          <div className="text-4xl font-bold text-text-primary mb-2">
            ${amountUsd.toFixed(2)} <span className="text-text-secondary">USDC</span>
          </div>
          <span className="inline-block px-3 py-1 bg-bg-card-hover rounded-lg text-text-muted text-xs font-semibold tracking-widest uppercase">
            {billingLabel}
          </span>
        </div>

        <div className="px-5 pb-5 space-y-3">
          {/* Network selector */}
          <div>
            <p className="text-text-muted text-xs mb-1.5">Network</p>
            <div className="relative">
              <button
                onClick={() => { setShowNetworkDrop((v) => !v); setShowTokenDrop(false); }}
                className="w-full flex items-center justify-between px-4 py-3 bg-bg-base border border-border-default rounded-xl text-text-primary text-sm hover:border-border-light transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{network === "SOL" ? "◎" : "Ξ"}</span>
                  <span>{network === "SOL" ? "Solana" : "Ethereum"}</span>
                </div>
                <ChevronDown size={14} className="text-text-muted" />
              </button>
              {showNetworkDrop && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-bg-card border border-border-default rounded-xl shadow-xl py-1 z-10">
                  {(["SOL", "ETH"] as Network[]).map((n) => (
                    <button key={n} onClick={() => handleNetworkChange(n)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-card-hover text-sm transition-colors">
                      <span>{n === "SOL" ? "◎" : "Ξ"}</span>
                      {n === "SOL" ? "Solana" : "Ethereum"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Token selector */}
          <div>
            <p className="text-text-muted text-xs mb-1.5">Pay with</p>
            <div className="relative">
              <button
                onClick={() => { setShowTokenDrop((v) => !v); setShowNetworkDrop(false); }}
                className="w-full flex items-center justify-between px-4 py-3 bg-bg-base border border-border-default rounded-xl text-text-primary text-sm hover:border-border-light transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{TOKEN_ICON[token]}</span>
                  <span>${amountUsd.toFixed(2)} {token} ({TOKEN_LABEL[token]})</span>
                </div>
                <ChevronDown size={14} className="text-text-muted" />
              </button>
              {showTokenDrop && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-bg-card border border-border-default rounded-xl shadow-xl py-1 z-10">
                  {TOKENS[network].map((t) => (
                    <button key={t} onClick={() => { setToken(t); setShowTokenDrop(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-card-hover text-sm transition-colors">
                      <span>{TOKEN_ICON[t]}</span>
                      {TOKEN_LABEL[t]} ({t})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subscription info */}
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-base border border-border-default rounded-xl">
            <Zap size={16} className="text-text-muted shrink-0" />
            <div>
              <p className="text-text-primary text-sm font-medium">Subscription Payment</p>
              <p className="text-text-muted text-xs">You&apos;ll receive renewal reminders.</p>
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="text-text-muted text-xs mb-1.5">
              Required Information
            </p>
            <div>
              <label className="text-text-muted text-xs mb-1 block">
                Email Address <span className="text-clr-red">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-base border border-border-default rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Not enough funds warning */}
          {notEnoughFunds && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-clr-red/10 border border-clr-red/30 rounded-xl">
              <AlertCircle size={14} className="text-clr-red shrink-0" />
              <p className="text-clr-red text-xs">Not enough funds in your wallet.</p>
            </div>
          )}

          {/* Pay Now */}
          <button
            onClick={handlePay}
            disabled={notEnoughFunds || !email.trim() || paying}
            className="w-full py-3.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-bg-card-hover border border-border-default text-text-primary hover:border-border-light disabled:hover:border-border-default"
          >
            {paying ? "Processing..." : "Pay Now"}
          </button>

          {/* Pay with QR */}
          <button className="w-full flex items-center justify-center gap-2 py-2.5 text-text-muted hover:text-text-secondary text-sm transition-colors">
            <QrCode size={15} /> Pay with QR
          </button>
        </div>
      </div>
    </div>
  );
}
