import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-red-600 pointer-events-none z-[9999] mix-blend-multiply"
      style={{ willChange: "transform", transition: "transform 0.08s ease-out" }}
    />
  );
}
