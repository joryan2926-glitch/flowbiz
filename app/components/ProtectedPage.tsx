"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProtectedPage({ children }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
      return;
    }

    // 🔥 AUTO CREATE USER
    await supabase.from("users").upsert({
      id: data.user.id,
      email: data.user.email,
      plan: "free",
    });

    setLoading(false);
  }

  if (loading) return <div>Loading...</div>;

  return children;
}
