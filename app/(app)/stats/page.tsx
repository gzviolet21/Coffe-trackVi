import { createClient } from "@/lib/supabase/server";
import { computeStats } from "@/lib/hooks/useStats";
import { StatCard } from "@/components/stats/StatCard";
import { FlavorCloud } from "@/components/stats/FlavorCloud";
import { StreakBadge } from "@/components/stats/StreakBadge";
import { PageHeader } from "@/components/layout/PageHeader";
import { BREW_METHODS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils/formatters";
import type { CoffeeLog } from "@/types/coffee";

export const revalidate = 0;

export default async function StatsPage() {
  const supabase = createClient();
  const { data: logs } = await supabase
    .from("coffee_logs")
    .select("*")
    .order("visited_at", { ascending: false });

  const stats = computeStats((logs ?? []) as CoffeeLog[]);
  const favBrew = BREW_METHODS.find((b) => b.value === stats.favBrewMethod);

  return (
    <div className="pb-28">
      <PageHeader title="Your Stats" subtitle="the numbers tell a story" />

      <div className="px-4 space-y-4">
        <StreakBadge streak={stats.streak} />

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            emoji="🗺️"
            label="cafés visited"
            value={stats.totalCafes}
          />
          <StatCard
            emoji="⭐"
            label="avg rating"
            value={stats.avgRating}
          />
          {favBrew && (
            <StatCard
              emoji={favBrew.emoji}
              label="fav brew"
              value={favBrew.label}
            />
          )}
          {stats.totalSpent > 0 && (
            <StatCard
              emoji="💸"
              label="total spent"
              value={formatPrice(stats.totalSpent)}
            />
          )}
        </div>

        {stats.topFlavors.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-warm border border-cream-dark/40">
            <p className="font-accent text-muted text-base mb-3">top flavors</p>
            <FlavorCloud flavors={stats.topFlavors} />
          </div>
        )}
      </div>
    </div>
  );
}
