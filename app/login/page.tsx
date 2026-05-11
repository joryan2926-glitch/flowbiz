"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function login() {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard",
      },
    });
    alert("Email envoyé !");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="p-8 bg-white/5 rounded-2xl">
        <h1 className="text-2xl mb-4">Connexion FlowBiz</h1>

        <input
          className="p-3 w-full text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={login} className="mt-4 bg-blue-500 px-4 py-2">
          Se connecter
        </button>
      </div>
    </div>
  );
}
