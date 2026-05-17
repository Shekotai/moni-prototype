"use client";

import { useState } from "react";
import { Copy, Check, Unplug, Plus, Wallet, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AccountGuard from "@/components/AccountGuard";

const MOCK_WALLET = "EcSsijXx9DaK3mR7vQpL2nFtWbYuAoGs";

function shortenAddress(addr: string) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function isValidAddress(addr: string) {
  return addr.trim().length >= 32;
}

export default function PaymentPage() {
  const { connectedWallet, disconnectWallet, connectWallet } = useAuth();

  const [wallets, setWallets] = useState<string[]>(
    connectedWallet ? [connectedWallet] : []
  );
  const [activeWallet, setActiveWallet] = useState<string | null>(connectedWallet);
  const [copied, setCopied] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [addError, setAddError] = useState("");

  const handleCopy = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopied(addr);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSwitch = (addr: string) => {
    setActiveWallet(addr);
    connectWallet();
    setConfirming(null);
  };

  const handleDisconnectActive = () => {
    setActiveWallet(null);
    disconnectWallet();
    setConfirming(null);
  };

  const handleRemoveWallet = (addr: string) => {
    setWallets((w) => w.filter((a) => a !== addr));
    if (activeWallet === addr) {
      const remaining = wallets.filter((a) => a !== addr);
      const next = remaining[0] ?? null;
      setActiveWallet(next);
      if (!next) disconnectWallet();
    }
    setConfirming(null);
  };

  const handleAddWallet = () => {
    const addr = newAddress.trim();
    if (!isValidAddress(addr)) { setAddError("Enter a valid wallet address (min 32 chars)"); return; }
    if (wallets.includes(addr)) { setAddError("This wallet is already added"); return; }
    setWallets((w) => [...w, addr]);
    setNewAddress("");
    setAddError("");
    setShowAdd(false);
  };

  const handleConnectFirst = () => {
    setWallets([MOCK_WALLET]);
    setActiveWallet(MOCK_WALLET);
    connectWallet();
  };

  return (
    <AccountGuard>
      <div className="max-w-2xl px-8 py-10">
        <h1 className="text-xl font-semibold text-text-primary mb-8">Payment</h1>

        {/* ── Active wallet ── */}
        <div className="bg-bg-card border border-border-default rounded-xl p-5 mb-4">
          <p className="text-text-muted text-xs uppercase tracking-widest mb-4">Active wallet</p>

          {activeWallet ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-accent" strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-text-muted text-[11px] mb-0.5">Connected</p>
                  <p className="text-text-primary text-sm font-mono">{activeWallet}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => handleCopy(activeWallet)}
                  className="p-2 rounded-lg bg-bg-card-hover border border-border-default hover:border-border-light text-text-muted hover:text-text-secondary transition-colors">
                  {copied === activeWallet ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                </button>
                {confirming === "active" ? (
                  <>
                    <button onClick={handleDisconnectActive}
                      className="px-3 py-1.5 rounded-lg border border-clr-red/40 bg-clr-red/10 text-clr-red text-xs font-medium transition-colors">
                      Confirm
                    </button>
                    <button onClick={() => setConfirming(null)}
                      className="px-3 py-1.5 rounded-lg border border-border-default text-text-muted text-xs transition-colors">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setConfirming("active")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-default bg-bg-card-hover hover:border-border-light text-text-muted hover:text-clr-red text-xs transition-colors">
                    <Unplug size={12} /> Disconnect
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-bg-card-hover border border-border-default flex items-center justify-center shrink-0">
                  <Wallet size={14} className="text-text-muted" />
                </div>
                <div>
                  <p className="text-text-secondary text-sm">No wallet connected</p>
                  <p className="text-text-muted text-xs mt-0.5">Connect a wallet to pay with crypto</p>
                </div>
              </div>
              <button onClick={handleConnectFirst}
                className="px-4 py-2 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium transition-colors">
                Connect
              </button>
            </div>
          )}
        </div>

        {/* ── Saved wallets ── */}
        <div className="bg-bg-card border border-border-default rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-xs uppercase tracking-widest">Saved wallets</p>
            <button onClick={() => { setShowAdd((v) => !v); setNewAddress(""); setAddError(""); }}
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors">
              {showAdd ? <X size={12} /> : <Plus size={12} />}
              {showAdd ? "Cancel" : "Add wallet"}
            </button>
          </div>

          {/* Add form */}
          {showAdd && (
            <div className="mb-4 space-y-2">
              <div className="flex gap-2">
                <input
                  value={newAddress}
                  onChange={(e) => { setNewAddress(e.target.value); setAddError(""); }}
                  placeholder="Paste wallet address..."
                  className="flex-1 bg-bg-base border border-border-default rounded-lg px-3 py-2.5 text-text-primary text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                />
                <button onClick={handleAddWallet}
                  className="px-4 py-2.5 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium transition-colors shrink-0">
                  Add
                </button>
              </div>
              {addError && <p className="text-clr-red text-xs">{addError}</p>}
            </div>
          )}

          {/* Wallet list */}
          {wallets.length === 0 ? (
            <p className="text-text-muted text-sm text-center py-4">No saved wallets</p>
          ) : (
            <div className="space-y-2">
              {wallets.map((addr) => {
                const isActive = addr === activeWallet;
                const isConfirming = confirming === addr;
                return (
                  <div key={addr}
                    className={`flex items-center justify-between gap-3 px-3 py-3 rounded-lg border transition-colors ${
                      isActive
                        ? "border-accent/30 bg-accent/5"
                        : "border-border-default bg-bg-base hover:border-border-light"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-accent" : "bg-border-light"}`} />
                      <span className={`text-sm font-mono truncate ${isActive ? "text-text-primary" : "text-text-secondary"}`}>
                        {shortenAddress(addr)}
                      </span>
                      {isActive && <span className="text-accent text-[10px] font-semibold uppercase tracking-wide shrink-0">active</span>}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => handleCopy(addr)}
                        className="p-1.5 rounded-md text-text-muted hover:text-text-secondary transition-colors">
                        {copied === addr ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                      </button>

                      {!isActive && (
                        <button onClick={() => handleSwitch(addr)}
                          className="px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-medium hover:bg-accent/20 transition-colors">
                          Use
                        </button>
                      )}

                      {isConfirming ? (
                        <>
                          <button onClick={() => handleRemoveWallet(addr)}
                            className="px-2.5 py-1 rounded-md border border-clr-red/40 bg-clr-red/10 text-clr-red text-xs transition-colors">
                            Remove
                          </button>
                          <button onClick={() => setConfirming(null)}
                            className="p-1.5 rounded-md text-text-muted hover:text-text-secondary transition-colors">
                            <X size={12} />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setConfirming(addr)}
                          className="p-1.5 rounded-md text-text-muted hover:text-clr-red transition-colors">
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="bg-bg-card border border-border-default rounded-xl p-5">
          <p className="text-text-muted text-xs uppercase tracking-widest mb-3">How it works</p>
          <ul className="space-y-2 text-text-secondary text-sm">
            {[
              "The active wallet is used to process crypto subscription payments.",
              "You can save multiple wallets and switch between them at any time.",
              "Disconnecting removes the active wallet — your saved list stays intact.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="text-accent mt-1 shrink-0">•</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AccountGuard>
  );
}
