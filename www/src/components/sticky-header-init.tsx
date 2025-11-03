"use client";

import { useEffect } from "react";
import { StickyHeader } from "ovos";

export default function StickyHeaderInit() {
  useEffect(() => {
    try {
      StickyHeader({});
    } catch (e) {
      // no-op: avoid breaking hydration if library not ready
      console.warn("StickyHeader init failed:", e);
    }
  }, []);
  return null;
}

