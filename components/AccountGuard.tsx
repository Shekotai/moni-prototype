"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AccountGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [isLoggedIn, pathname, router]);

  if (!isLoggedIn) return null;
  return <>{children}</>;
}
