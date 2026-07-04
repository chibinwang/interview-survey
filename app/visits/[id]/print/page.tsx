import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Visit, TemplateQuestion } from "@/lib/types";
import { FactoryPrintView } from "@/components/visit/print/FactoryPrintView";
import { GenericPrintView } from "@/components/visit/print/GenericPrintView";
import { getServerLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function PrintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const locale = await getServerLocale();
  const { data, error } = await supabase.from("visits").select("*").eq("id", id).single();

  if (error || !data) {
    notFound();
  }

  const v = data as Visit;

  if (v.visit_type !== "potential_client") {
    const { data: template } = await supabase
      .from("templates")
      .select("id")
      .eq("visit_type", v.visit_type)
      .maybeSingle();

    let questions: TemplateQuestion[] = [];
    if (template) {
      const { data: q } = await supabase
        .from("template_questions")
        .select("*")
        .eq("template_id", template.id)
        .order("position", { ascending: true });
      questions = (q ?? []) as TemplateQuestion[];
    }

    return <GenericPrintView v={v} questions={questions} locale={locale} />;
  }

  return <FactoryPrintView v={v} locale={locale} />;
}
