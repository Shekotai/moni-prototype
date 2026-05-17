"use client";

import { useState } from "react";
import { Copy, Check, Unplug, Wallet } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AccountGuard from "@/components/AccountGuard";

function shortenAddress(addr: string) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export default function PaymentPage() {
  const { connectedWallet, disconnectWallet, connectWallet } = useAuth();
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const handleCopy = () => {
    if (!connectedWallet) return;
    navigator.clipboard.writeText(connectedWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = () => {
    if (!confirming) { setConfirming(true); return; }
    disconnectWallet();
    setConfirming(false);
  };

  return (
    <AccountGuard>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-text-primary mb-8">Payment</h1>

        <div className="space-y-4">
          {/* Connected wallet */}
          <div className="bg-bg-card border border-border-default rounded-2xl p-6">
            <label className="text-text-muted text-xs uppercase tracking-widest mb-4 block">
              Connected Wallet
            </label>

            {connectedWallet ? (
              <div className="flex items-center justify-between gap-3">
                {/* Wallet info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-clr-green/10 border border-clr-green/30 flex items-center justify-center shrink-0">
                    <Check size={16} className="text-clr-green" strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-clr-green text-xs font-semibold">Connected</span>
                    </div>
                    <span className="text-text-primary text-sm font-mono">
                      {shortenAddress(connectedWallet)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopy}
                    title="Copy address"
                    className="p-2 rounded-lg bg-bg-card-hover border border-border-default hover:border-border-light text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {copied ? <Check size={14} className="text-clr-green" /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={handleDisconnect}
                    title="Disconnect wallet"
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                      confirming
                        ? "bg-clr-red/10 border-clr-red/40 text-clr-red hover:bg-clr-red/20"
                        : "bg-bg-card-hover border-border-default hover:border-border-light text-text-muted hover:text-clr-red"
                    }`}
                  >
                    <Unplug size={13} />
                    {confirming ? "Confirm disconnect" : "Disconnect"}
                  </button>
                  {confirming && (
                    <button
                      onClick={() => setConfirming(false)}
                      className="px-2.5 py-2 rounded-lg border border-border-default text-text-muted hover:text-text-secondary text-xs transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* No wallet */
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-bg-card-hover border border-border-default flex items-center justify-center shrink-0">
                    <Wallet size={16} className="text-text-muted" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">No wallet connected</p>
                    <p className="text-text-muted text-xs mt-0.5">Connect a wallet to pay with crypto</p>
                  </div>
                </div>
                <button
                  onClick={connectWallet}
                  className="px-4 py-2 bg-accent hover:bg-accent-hover rounded-xl text-white text-sm font-medium transition-colors"
                >
                  Connect
                </button>
              </div>
            )}
          </div>

          {/* Full address card (when connected) */}
          {connectedWallet && (
            <div className="bg-bg-card border border-border-default rounded-2xl p-6">
              <label className="text-text-muted text-xs uppercase tracking-widest mb-3 block">
                Full Address
              </label>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={connectedWallet}
                  className="flex-1 bg-bg-base border border-border-default rounded-xl px-4 py-2.5 text-text-primary text-sm font-mono focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="p-2.5 bg-bg-card-hover border border-border-default hover:border-border-light rounded-xl text-text-muted hover:text-text-secondary transition-colors"
                >
                  {copied ? <Check size={15} className="text-clr-green" /> : <Copy size={15} />}
                </button>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-bg-card border border-border-default rounded-2xl p-6">
            <label className="text-text-muted text-xs uppercase tracking-widest mb-3 block">
              How it works
            </label>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start gap-2">
                <span className="text-clr-green mt-0.5">•</span>
                A wallet is automatically assigned when you sign in.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-clr-green mt-0.5">•</span>
                It is used to process crypto subscription payments.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-clr-green mt-0.5">•</span>
                You can disconnect it at any time and reconnect a new one.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AccountGuard>
  );
}
