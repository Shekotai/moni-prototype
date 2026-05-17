"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type PlanName = "FREE" | "STANDARD" | "PRO";

interface MockUser {
  name: string;
  email: string;
  avatar: string;
  plan: PlanName;
  tradedSol: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: MockUser | null;
  login: () => void;
  logout: () => void;
  /** API Credits: consumed by API calls */
  credits: number;
  maxCredits: number;
  spendCredits: (n: number) => void;
  addCredits: (n: number) => void;
  /** Usage Credits: spent at plan checkout for discounts */
  usageCredits: number;
  maxUsageCredits: number;
  addUsageCredits: (n: number) => void;
  /** Points: earned via quests/invites, convertible to credits */
  points: number;
  addPoints: (n: number) => void;
  /** 100 points = 1 API Credit */
  convertPointsToCredits: (pointsAmount: number) => boolean;
  /** 50 points = 1 Usage Credit */
  convertPointsToUsageCredits: (pointsAmount: number) => boolean;
  /** Upgrade plan (mock) */
  upgradePlan: (plan: PlanName) => void;
  /** Connected payment wallet */
  connectedWallet: string | null;
  disconnectWallet: () => void;
  connectWallet: () => void;
}

/** 100 points = 1 API Credit */
export const POINTS_PER_API_CREDIT_RATE = 100;
/** 50 points = 1 Usage Credit */
export const POINTS_PER_USAGE_CREDIT_RATE = 50;
/** @deprecated use POINTS_PER_API_CREDIT_RATE */
export const POINTS_PER_CREDIT_RATE = 100;

const mockUser: MockUser = {
  name: "time118",
  email: "time118@gmail.com",
  avatar: "/mock-avatar.png",
  plan: "PRO",
  tradedSol: 3,
};

const MOCK_WALLET = "EcSsijXx9DaK3mR7vQpL2nFtWbYuAoGs";

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  credits: 223,
  maxCredits: 1000,
  spendCredits: () => {},
  addCredits: () => {},
  usageCredits: 135,
  maxUsageCredits: 500,
  addUsageCredits: () => {},
  points: 17800,
  addPoints: () => {},
  convertPointsToCredits: () => false,
  convertPointsToUsageCredits: () => false,
  upgradePlan: () => {},
  connectedWallet: MOCK_WALLET,
  disconnectWallet: () => {},
  connectWallet: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [plan, setPlan] = useState<PlanName>("PRO");
  const [credits, setCredits] = useState(223);
  // 3 SOL traded × $150/SOL × 0.3% = $1.35 → 135 credits at $0.01 each
  const [usageCredits, setUsageCredits] = useState(135);
  const [points, setPoints] = useState(17800);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(MOCK_WALLET);
  const maxCredits = 1000;
  const maxUsageCredits = 500;

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const spendCredits = (n: number) => setCredits((c) => Math.max(0, c - n));
  const addCredits = (n: number) => setCredits((c) => Math.min(maxCredits, c + n));
  const addUsageCredits = (n: number) => setUsageCredits((c) => Math.min(maxUsageCredits, c + n));
  const addPoints = (n: number) => setPoints((p) => p + n);

  const convertPointsToCredits = (pointsAmount: number): boolean => {
    if (points < pointsAmount) return false;
    const gained = Math.floor(pointsAmount / POINTS_PER_API_CREDIT_RATE);
    if (gained < 1) return false;
    setPoints((p) => p - pointsAmount);
    setCredits((c) => Math.min(maxCredits, c + gained));
    return true;
  };

  const convertPointsToUsageCredits = (pointsAmount: number): boolean => {
    if (points < pointsAmount) return false;
    const gained = Math.floor(pointsAmount / POINTS_PER_USAGE_CREDIT_RATE);
    if (gained < 1) return false;
    setPoints((p) => p - pointsAmount);
    setUsageCredits((c) => Math.min(maxUsageCredits, c + gained));
    return true;
  };

  const upgradePlan = (newPlan: PlanName) => setPlan(newPlan);
  const disconnectWallet = () => setConnectedWallet(null);
  const connectWallet = () => setConnectedWallet(MOCK_WALLET);

  const user: MockUser | null = isLoggedIn
    ? { ...mockUser, plan }
    : null;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        credits,
        maxCredits,
        spendCredits,
        addCredits,
        usageCredits,
        maxUsageCredits,
        addUsageCredits,
        points,
        addPoints,
        convertPointsToCredits,
        convertPointsToUsageCredits,
        upgradePlan,
        connectedWallet,
        disconnectWallet,
        connectWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
