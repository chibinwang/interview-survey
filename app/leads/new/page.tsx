import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewLeadPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase.from("leads").insert({ user_id: user.id }).select("id").single();

  if (error || !data) {
    throw new Error("建立新名單失敗，請重試。");
  }

  redirect(`/leads/${data.id}`);
}
