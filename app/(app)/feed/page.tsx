import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogCard } from "@/components/log/LogCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/layout/PageHeader";
import type { CoffeeLog } from "@/types/coffee";

export const revalidate = 0;

export default async function FeedPage() {
  const supabase = createClient();
  const { data: logs } = await supabase
    .from("coffee_logs")
    .select("*")
    .order("visited_at", { ascending: false })
    .limit(50);

  return (
    <div className="pb-28">
      <PageHeader
        title="Brew Notes"
        subtitle="your coffee journal"
      />

      {!logs || logs.length === 0 ? (
        <EmptyState
          title="No logs yet"
          subtitle="Start your café journey by logging your first coffee."
          action={
            <Link
              href="/log/new"
              className="inline-block px-6 py-3 rounded-2xl bg-terracotta text-cream font-body text-sm shadow-warm"
            >
              Log your first coffee
            </Link>
          }
        />
      ) : (
        <div className="px-4 space-y-3">
          {(logs as CoffeeLog[]).map((log) => (
            <LogCard key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
}
