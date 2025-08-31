"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ROUTES_TO_PREFETCH = ["/", "/paintings", "/photography", "/about", "/contact"] as const;

export default function PrefetchRoutes() {
  const router = useRouter();

  useEffect(() => {
    ROUTES_TO_PREFETCH.forEach((path) => {
      try {
        router.prefetch(path);
      } catch {
        // Best-effort prefetch; ignore errors in development
      }
    });
  }, [router]);

  return null;
}


