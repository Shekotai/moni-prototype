"use client";

import { useAuth } from "@/context/AuthContext";
import ProgressBlock from "@/components/ProgressBlock";
import PlanCards from "@/components/PlanCards";

export default function PricingPage() {
  const { isLoggedIn, user } = useAuth();
  const tradedSol = user?.tradedSol ?? 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-text-primary mb-2">Pricing</h1>
        <p className="text-text-secondary">Trade to unlock — earn discounts on every SOL you trade</p>
      </div>

      <div className="mb-10">
        <ProgressBlock
          tradedSol={tradedSol}
          isAuthenticated={isLoggedIn}
          variant="pricing"
        />
      </div>

      <PlanCards tradedSol={tradedSol} />
    </div>
  );
}
