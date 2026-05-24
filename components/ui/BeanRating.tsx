"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface Props {
  value: number;
  onChange?: (n: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}

const sizes = { sm: "w-5 h-5", md: "w-7 h-7", lg: "w-9 h-9" };

function BeanIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse
        cx="12" cy="12" rx="8" ry="10"
        fill={filled ? "#C4622D" : "#E8D5C0"}
        stroke={filled ? "#A0501F" : "#C9B09A"}
        strokeWidth="1.5"
      />
      <path
        d="M12 4 Q8 8 8 12 Q8 16 12 20"
        stroke={filled ? "#A0501F" : "#C9B09A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function BeanRating({ value, onChange, max = 5, size = "md", readOnly = false }: Props) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <motion.button
          key={n}
          type="button"
          disabled={readOnly}
          whileTap={readOnly ? {} : { scale: 0.8 }}
          onClick={() => onChange?.(n)}
          className={cn(
            sizes[size],
            readOnly ? "cursor-default" : "cursor-pointer focus:outline-none"
          )}
          aria-label={`${n} bean${n !== 1 ? "s" : ""}`}
        >
          <BeanIcon filled={n <= value} />
        </motion.button>
      ))}
    </div>
  );
}
