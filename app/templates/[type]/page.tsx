import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NON_FACTORY_VISIT_TYPES } from "@/lib/enums";
import { getOrCreateTemplate } from "@/lib/templates";
import { TemplateEditorClient } from "@/components/templates/TemplateEditorClient";

export const dynamic = "force-dynamic";

export default async function TemplateTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  if (!NON_FACTORY_VISIT_TYPES.some((t) => t.value === type)) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { id: templateId, questions } = await getOrCreateTemplate(supabase, user.id, type);

  return <TemplateEditorClient templateId={templateId} visitType={type} initialQuestions={questions} />;
}
