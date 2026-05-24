"use client";
import { motion } from "framer-motion";

interface Props {
  value: boolean | null;
  onChange: (v: boolean) => void;
}

export function ReturnToggle({ value, onChange }: Props) {
  return (
    <div className="flex rounded-xl border-2 border-cream-dark overflow-hidden w-fit">
      {(
        [
          { label: "Yes, please!", v: true, activeClass: "bg-sage text-cream" },
          { label: "Pass", v: false, activeClass: "bg-muted text-cream" },
        ] as const
      ).map(({ label, v, activeClass }) => (
        <motion.button
          key={label}
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange(v)}
          className={`relative px-5 py-2 text-sm font-body transition-colors ${
            value === v ? activeClass : "bg-cream text-muted"
          }`}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}
