import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LeadEditor } from "@/components/leads/LeadEditor";
import type { Lead } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();

  if (error || !data) {
    notFound();
  }

  return <LeadEditor initialLead={data as Lead} />;
}
