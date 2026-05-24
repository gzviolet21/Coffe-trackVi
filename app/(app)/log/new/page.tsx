import { PageHeader } from "@/components/layout/PageHeader";
import { LogForm } from "@/components/log/LogForm";
import Link from "next/link";

export default function NewLogPage() {
  return (
    <div>
      <PageHeader
        title="New Visit"
        subtitle="tell me about that cup"
        right={
          <Link href="/feed" className="text-muted font-body text-sm">
            Cancel
          </Link>
        }
      />
      <LogForm />
    </div>
  );
}
