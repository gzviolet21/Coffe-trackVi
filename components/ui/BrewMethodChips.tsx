"use client";
import { motion } from "framer-motion";
import { BREW_METHODS, type BrewMethodValue } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

interface Props {
  value: BrewMethodValue;
  onChange: (v: BrewMethodValue) => void;
}

export function BrewMethodChips({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {BREW_METHODS.map((method) => {
        const active = value === method.value;
        return (
          <motion.button
            key={method.value}
            type="button"
            whileTap={{ scale: 0.93 }}
            onClick={() => onChange(method.value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border-2 transition-colors font-body",
              active
                ? "bg-espresso text-cream border-espresso"
                : "bg-cream text-espresso border-cream-dark hover:border-espresso/30"
            )}
          >
            <span>{method.emoji}</span>
            <span>{method.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
