import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import type { CoffeeLog } from "@/types/coffee";

const CafeMap = dynamic(
  () => import("@/components/map/CafeMap").then((m) => m.CafeMap),
  { ssr: false, loading: () => <div className="h-full bg-cream-dark animate-pulse rounded-2xl" /> }
);

export const revalidate = 0;

export default async function MapPage() {
  const supabase = createClient();
  const { data: logs } = await supabase
    .from("coffee_logs")
    .select("*")
    .not("latitude", "is", null)
    .order("visited_at", { ascending: false });

  const geoLogs = (logs ?? []) as CoffeeLog[];

  return (
    <div className="h-screen flex flex-col pb-28">
      <PageHeader title="Your Map" subtitle={`${geoLogs.length} pinned café${geoLogs.length !== 1 ? "s" : ""}`} />

      <div className="flex-1 px-4 pb-4">
        {geoLogs.length === 0 ? (
          <EmptyState
            title="No mapped cafés yet"
            subtitle="Log a coffee with location enabled to see it here."
          />
        ) : (
          <div className="h-full rounded-2xl overflow-hidden shadow-warm">
            <CafeMap logs={geoLogs} />
          </div>
        )}
      </div>
    </div>
  );
}
