"use client";

import { useAuth } from "@/context/AuthContext";
import ProgressBlock from "@/components/ProgressBlock";
import PlanCards from "@/components/PlanCards";
import SubscriptionCreditsCard from "@/components/SubscriptionCreditsCard";

export default function AccountPlansPage() {
  const { isLoggedIn, user } = useAuth();
  const tradedSol = user?.tradedSol ?? 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">Plans</h1>
        <p className="text-text-secondary text-sm mt-1">Trade to unlock — earn discounts on every SOL you trade</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2">
          <ProgressBlock
            tradedSol={tradedSol}
            isAuthenticated={isLoggedIn}
            variant="pricing"
          />
        </div>
        <div className="lg:col-span-1">
          <SubscriptionCreditsCard />
        </div>
      </div>

      <PlanCards tradedSol={tradedSol} />
    </div>
  );
}
