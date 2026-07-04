import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VisitEditor } from "@/components/visit/VisitEditor";
import { GenericVisitEditor } from "@/components/visit/GenericVisitEditor";
import { getOrCreateTemplate } from "@/lib/templates";
import type { Visit } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function VisitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase.from("visits").select("*").eq("id", id).single();

  if (error || !data) {
    notFound();
  }

  const visit = data as Visit;

  if (visit.visit_type !== "potential_client") {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { questions } = await getOrCreateTemplate(supabase, user.id, visit.visit_type);

    return <GenericVisitEditor initialVisit={visit} questions={questions} />;
  }

  return <VisitEditor initialVisit={visit} />;
}
