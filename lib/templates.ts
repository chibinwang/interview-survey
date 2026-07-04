import type { createClient } from "@/lib/supabase/server";
import { STARTER_TEMPLATES } from "@/lib/starterTemplates";
import type { TemplateQuestion } from "@/lib/types";

type Supabase = Awaited<ReturnType<typeof createClient>>;

// Fetches the (user, visit_type) template, creating it — and seeding its
// starter questions on first creation — if it doesn't exist yet. Called from
// both the templates management page and the visit editor, since a user may
// open a non-factory visit type without ever visiting /templates/[type] first.
export async function getOrCreateTemplate(
  supabase: Supabase,
  userId: string,
  visitType: string
): Promise<{ id: string; questions: TemplateQuestion[] }> {
  const { data: existing } = await supabase.from("templates").select("id").eq("visit_type", visitType).maybeSingle();

  if (existing) {
    const { data: questions } = await supabase
      .from("template_questions")
      .select("*")
      .eq("template_id", existing.id)
      .order("position", { ascending: true });
    return { id: existing.id, questions: (questions ?? []) as TemplateQuestion[] };
  }

  const { data: created, error } = await supabase
    .from("templates")
    .insert({ user_id: userId, visit_type: visitType })
    .select("id")
    .single();
  if (error || !created) {
    throw new Error("建立範本失敗，請重試。");
  }

  const starterSet = STARTER_TEMPLATES[visitType];
  if (!starterSet) {
    return { id: created.id, questions: [] };
  }

  const { data: inserted } = await supabase
    .from("template_questions")
    .insert(
      starterSet.map((q, position) => ({
        template_id: created.id,
        user_id: userId,
        position,
        ...q,
      }))
    )
    .select("*")
    .order("position", { ascending: true });

  return { id: created.id, questions: (inserted ?? []) as TemplateQuestion[] };
}
