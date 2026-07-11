import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewConnectorPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase.from("connectors").insert({ user_id: user.id }).select("id").single();

  if (error || !data) {
    throw new Error("建立新 Connector 失敗，請重試。");
  }

  redirect(`/connectors/${data.id}`);
}
