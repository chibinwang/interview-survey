import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ConnectorEditor } from "@/components/connectors/ConnectorEditor";
import type { Connector } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ConnectorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase.from("connectors").select("*").eq("id", id).single();

  if (error || !data) {
    notFound();
  }

  return <ConnectorEditor initialConnector={data as Connector} />;
}
