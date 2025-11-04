"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { StickyHeader } from "ovos";

export default function StickyHeaderInit() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // Defer to next frame to ensure new DOM is ready after navigation
      requestAnimationFrame(() => {
        StickyHeader({});
      });
    } catch (e) {
      // no-op: avoid breaking hydration if library not ready
      console.warn("StickyHeader init failed:", e);
    }
  }, [pathname]);
  return null;
}
