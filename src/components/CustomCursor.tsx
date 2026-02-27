import { useEffect, useRef } from "react";

const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice) return;
    const move = (e: MouseEvent) => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999]"
      style={{ willChange: "transform", transition: "transform 0.08s ease-out", backgroundColor: "hsl(0 100% 50%)" }}
    />
  );
}
