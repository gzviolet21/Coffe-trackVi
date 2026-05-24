"use client";
import { motion } from "framer-motion";
import { FLAVOR_NOTES, type FlavorNote } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

interface Props {
  value: FlavorNote[];
  onChange: (v: FlavorNote[]) => void;
}

export function FlavorChips({ value, onChange }: Props) {
  const toggle = (note: FlavorNote) => {
    onChange(
      value.includes(note) ? value.filter((n) => n !== note) : [...value, note]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {FLAVOR_NOTES.map((note) => {
        const active = value.includes(note);
        return (
          <motion.button
            key={note}
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => toggle(note)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm border-2 capitalize transition-colors font-body",
              active
                ? "bg-terracotta text-cream border-terracotta"
                : "bg-cream text-espresso border-cream-dark hover:border-terracotta/40"
            )}
          >
            {note}
          </motion.button>
        );
      })}
    </div>
  );
}
