import { useState, useRef } from "react";
import { portfolios } from "@/data/portfolio";

const beauty = portfolios.find(p => p.slug === "beauty")!;

export default function BeautyReorder() {
  const [images, setImages] = useState<string[]>(beauty.images);
  const [copied, setCopied] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  const handleDragStart = (i: number) => { dragIndex.current = i; };
  const handleDragEnter = (i: number) => { dragOverIndex.current = i; };

  const handleDrop = () => {
    const from = dragIndex.current;
    const to = dragOverIndex.current;
    if (from === null || to === null || from === to) return;
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setImages(updated);
    dragIndex.current = null;
    dragOverIndex.current = null;
  };

  const handleRemove = (i: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleCopy = () => {
    const text = images.map(url => `      "${url}",`).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-white px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-3xl uppercase tracking-widest mb-2">Reorder Beauty Images</h1>
        <p className="font-sans text-xs tracking-widest uppercase text-neutral-400 mb-8">
          Drag to reorder · Click <strong>✕</strong> to remove · Then copy and paste into chat.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {images.map((src, i) => (
            <div
              key={src}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragEnter={() => handleDragEnter(i)}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              className="relative group cursor-grab active:cursor-grabbing select-none"
            >
              <img
                src={src}
                alt={`Beauty ${i + 1}`}
                className="w-full aspect-[3/4] object-cover pointer-events-none"
                draggable={false}
              />
              <div className="absolute top-2 left-2 bg-black/70 text-white font-sans text-[0.6rem] tracking-widest px-2 py-0.5 uppercase">
                {i + 1}
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-black transition-colors pointer-events-none" />
            </div>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="font-sans text-xs tracking-[0.2em] uppercase bg-black text-white px-8 py-3 hover:bg-neutral-700 transition-colors"
        >
          {copied ? "✓ Copied!" : "Copy New Order"}
        </button>

        {copied && (
          <p className="mt-4 font-sans text-xs tracking-widest uppercase text-neutral-400">
            Paste this into the chat and I'll update the page for you.
          </p>
        )}
      </div>
    </div>
  );
}
