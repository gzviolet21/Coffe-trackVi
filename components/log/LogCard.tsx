"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BeanRating } from "@/components/ui/BeanRating";
import { formatRelativeDate } from "@/lib/utils/formatters";
import { BREW_METHODS } from "@/lib/constants";
import type { CoffeeLog } from "@/types/coffee";

interface Props {
  log: CoffeeLog;
}

export function LogCard({ log }: Props) {
  const brew = BREW_METHODS.find((b) => b.value === log.brew_method);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.99 }}
    >
      <Link href={`/log/${log.id}`}>
        <div className="bg-white rounded-2xl shadow-warm p-4 flex gap-3 border border-cream-dark/50">
          {log.photo_url ? (
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={log.photo_url}
                alt={log.cafe_name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-xl bg-cream-dark flex items-center justify-center text-3xl flex-shrink-0">
              ☕
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-espresso text-base leading-tight truncate">
                {log.cafe_name}
              </h3>
              <span className="text-[11px] text-muted font-body shrink-0">
                {formatRelativeDate(log.visited_at)}
              </span>
            </div>

            {log.coffee_name && (
              <p className="text-xs text-muted font-body mt-0.5 truncate">{log.coffee_name}</p>
            )}

            <div className="flex items-center gap-2 mt-1.5">
              <BeanRating value={log.overall_rating} size="sm" readOnly />
              {brew && (
                <span className="text-[11px] text-muted font-body">
                  {brew.emoji} {brew.label}
                </span>
              )}
            </div>

            {log.flavor_notes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {log.flavor_notes.slice(0, 3).map((note) => (
                  <span
                    key={note}
                    className="px-2 py-0.5 rounded-full bg-cream text-espresso text-[10px] font-body border border-cream-dark capitalize"
                  >
                    {note}
                  </span>
                ))}
                {log.flavor_notes.length > 3 && (
                  <span className="text-[10px] text-muted font-body self-center">
                    +{log.flavor_notes.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
