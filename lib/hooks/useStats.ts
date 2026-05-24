import type { CoffeeLog } from "@/types/coffee";
import type { BrewMethodValue, FlavorNote } from "@/lib/constants";

export interface CoffeeStats {
  totalCafes: number;
  avgRating: string;
  favBrewMethod: BrewMethodValue | null;
  topFlavors: { note: FlavorNote; count: number }[];
  totalSpent: number;
  streak: number;
}

function mode(arr: string[]): string | null {
  if (!arr.length) return null;
  const freq: Record<string, number> = {};
  for (const v of arr) freq[v] = (freq[v] ?? 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}

function computeStreak(logs: CoffeeLog[]): number {
  if (!logs.length) return 0;

  const dateSet: Record<string, boolean> = {};
  for (const l of logs) {
    dateSet[new Date(l.visited_at).toISOString().slice(0, 10)] = true;
  }
  const dates = Object.keys(dateSet).sort((a, b) => b.localeCompare(a));

  const today = new Date().toISOString().slice(0, 10);
  let streak = 0;
  let cursor = today;

  for (const date of dates) {
    if (date === cursor) {
      streak++;
      const d = new Date(cursor);
      d.setDate(d.getDate() - 1);
      cursor = d.toISOString().slice(0, 10);
    } else if (date < cursor) {
      break;
    }
  }

  return streak;
}

export function computeStats(logs: CoffeeLog[]): CoffeeStats {
  const totalCafes = logs.length;

  const avgRating =
    totalCafes === 0
      ? "—"
      : (logs.reduce((s, l) => s + l.overall_rating, 0) / totalCafes).toFixed(1);

  const favBrewMethod = mode(logs.map((l) => l.brew_method)) as BrewMethodValue | null;

  const flavorCount: Record<string, number> = {};
  for (const log of logs) {
    for (const note of log.flavor_notes) {
      flavorCount[note] = (flavorCount[note] ?? 0) + 1;
    }
  }
  const topFlavors = Object.entries(flavorCount)
    .map(([note, count]) => ({ note: note as FlavorNote, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const totalSpent = logs.reduce((s, l) => s + (l.price ?? 0), 0);
  const streak = computeStreak(logs);

  return { totalCafes, avgRating, favBrewMethod, topFlavors, totalSpent, streak };
}
