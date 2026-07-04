import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VISIT_TYPES } from "@/lib/enums";

export const dynamic = "force-dynamic";

export default async function NewTypedVisitPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  if (!VISIT_TYPES.some((t) => t.value === type)) {
    notFound();
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("visits")
    .insert({ user_id: user.id, company_name: "", visit_type: type })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error("建立新拜訪失敗，請重試。");
  }

  redirect(`/visits/${data.id}`);
}
