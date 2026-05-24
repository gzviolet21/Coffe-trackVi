import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogDetail } from "@/components/log/LogDetail";
import Link from "next/link";
import type { CoffeeLog } from "@/types/coffee";

interface Props {
  params: { id: string };
}

export default async function LogDetailPage({ params }: Props) {
  const supabase = createClient();
  const { data: log } = await supabase
    .from("coffee_logs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!log) notFound();

  return (
    <div>
      <div className="px-5 pt-6 pb-2">
        <Link href="/feed" className="text-muted font-body text-sm">
          ← Back
        </Link>
      </div>
      <LogDetail log={log as CoffeeLog} />
    </div>
  );
}
