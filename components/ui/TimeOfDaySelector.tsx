"use client";
import { motion } from "framer-motion";
import { TIME_OF_DAY, type TimeOfDayValue } from "@/lib/constants";
import { timeOfDayEmoji, timeOfDayLabel } from "@/lib/utils/timeOfDay";
import { cn } from "@/lib/utils/cn";

interface Props {
  value: TimeOfDayValue;
  onChange: (v: TimeOfDayValue) => void;
}

export function TimeOfDaySelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {TIME_OF_DAY.map((tod) => (
        <motion.button
          key={tod}
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => onChange(tod)}
          className={cn(
            "flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 text-xs font-body transition-colors",
            value === tod
              ? "bg-honey text-espresso border-honey"
              : "bg-cream text-muted border-cream-dark hover:border-honey/50"
          )}
        >
          <span className="text-lg">{timeOfDayEmoji[tod]}</span>
          <span className="capitalize">{timeOfDayLabel[tod]}</span>
        </motion.button>
      ))}
    </div>
  );
}
