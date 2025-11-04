"use client";

import { useEffect, useState } from "react";

export default function InlineSvg({ src, className = "", style = {} as React.CSSProperties }: { src: string; className?: string; style?: React.CSSProperties }) {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(src, { cache: "force-cache" });
        const text = await res.text();
        if (!cancelled) setSvg(text);
      } catch {
        if (!cancelled) setSvg("");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div
      className={className}
      style={style}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

