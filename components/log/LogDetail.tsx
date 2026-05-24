"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BeanRating } from "@/components/ui/BeanRating";
import { formatDate } from "@/lib/utils/formatters";
import { BREW_METHODS } from "@/lib/constants";
import { timeOfDayEmoji, timeOfDayLabel } from "@/lib/utils/timeOfDay";
import { createClient } from "@/lib/supabase/client";
import type { CoffeeLog } from "@/types/coffee";

interface Props {
  log: CoffeeLog;
}

export function LogDetail({ log }: Props) {
  const router = useRouter();
  const brew = BREW_METHODS.find((b) => b.value === log.brew_method);

  const handleDelete = async () => {
    if (!confirm("Delete this log?")) return;
    const supabase = createClient();
    if (log.photo_path) {
      await supabase.storage.from("coffee-photos").remove([log.photo_path]);
    }
    await supabase.from("coffee_logs").delete().eq("id", log.id);
    router.push("/feed");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-cream pb-28">
      {log.photo_url && (
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={log.photo_url}
            alt={log.cafe_name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream/80" />
        </div>
      )}

      <div className="px-5 pt-5 space-y-6">
        <div>
          <h1 className="font-display text-3xl text-espresso">{log.cafe_name}</h1>
          {log.address && (
            <p className="font-body text-sm text-muted mt-1">📍 {log.address}</p>
          )}
          <p className="font-body text-xs text-muted mt-0.5">
            {timeOfDayEmoji[log.time_of_day]} {timeOfDayLabel[log.time_of_day]} · {formatDate(log.visited_at)}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-warm space-y-4">
          {log.coffee_name && (
            <div>
              <p className="font-accent text-muted text-sm">the coffee</p>
              <p className="font-body text-espresso">{log.coffee_name}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <p className="font-accent text-muted text-sm mb-1">overall</p>
              <BeanRating value={log.overall_rating} size="md" readOnly />
            </div>
            {log.vibe_score && (
              <div className="text-right">
                <p className="font-accent text-muted text-sm mb-1">vibe</p>
                <BeanRating value={log.vibe_score} size="md" readOnly />
              </div>
            )}
          </div>

          {brew && (
            <div>
              <p className="font-accent text-muted text-sm">brew method</p>
              <p className="font-body text-espresso">{brew.emoji} {brew.label}</p>
            </div>
          )}

          {log.flavor_notes.length > 0 && (
            <div>
              <p className="font-accent text-muted text-sm mb-2">flavor notes</p>
              <div className="flex flex-wrap gap-1.5">
                {log.flavor_notes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-body capitalize border border-terracotta/20"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {log.would_return !== null && (
            <div>
              <p className="font-accent text-muted text-sm">would return?</p>
              <p className="font-body text-espresso">{log.would_return ? "Yes, please! ✓" : "Pass"}</p>
            </div>
          )}

          {log.price && (
            <div>
              <p className="font-accent text-muted text-sm">price</p>
              <p className="font-body text-espresso">${log.price.toFixed(2)}</p>
            </div>
          )}
        </div>

        {log.notes && (
          <div className="bg-white rounded-2xl p-4 shadow-warm">
            <p className="font-accent text-muted text-sm mb-1">notes</p>
            <p className="font-body text-espresso text-sm leading-relaxed">{log.notes}</p>
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleDelete}
          className="w-full py-3 rounded-xl text-sm font-body text-muted border border-muted/30 hover:border-muted/60 transition-colors"
        >
          Delete this log
        </motion.button>
      </div>
    </div>
  );
}
