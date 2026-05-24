"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  value: File | null;
  onChange: (file: File | null) => void;
}

export function PhotoUpload({ value, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File | null) => {
    onChange(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  if (preview && value) {
    return (
      <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-cream-dark">
        <Image src={preview} alt="Preview" fill className="object-cover" />
        <button
          type="button"
          onClick={() => handleFile(null)}
          className="absolute top-2 right-2 bg-espresso/80 text-cream rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-espresso"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={() => ref.current?.click()}
      className="w-full h-36 rounded-2xl border-2 border-dashed border-terracotta/40 flex flex-col items-center justify-center gap-2 text-muted hover:border-terracotta/70 transition-colors"
    >
      <span className="text-3xl">📷</span>
      <span className="text-sm font-body">Add a photo</span>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </motion.button>
  );
}
