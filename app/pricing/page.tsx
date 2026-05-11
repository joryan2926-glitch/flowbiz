"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const plans = [
  {
    id: "essentiel",
    name: "Essentiel",
    price: "39€ / mois",
    desc: "Factures, clients et dashboard de base.",
  },
  {
    id: "premium",
    name: "Premium",
    price: "65€ / mois",
    desc: "Dashboard CEO, suivi financier et automatisations.",
  },
  {
    id: "pro",
    name: "Pro",
    price: "85€ / mois",
    desc: "IA, analyses avancées et fonctionnalités complètes.",
  },
];

export default function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState("");

  async function subscribe(plan: string) {
    setLoadingPlan(plan);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/stripe/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, plan }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Erreur abonnement Stripe");
    }

    setLoadingPlan("");
  }

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-white">
      <h1 className="text-4xl font-black">Abonnements FlowBiz</h1>
      <p className="mt-2 text-white/60">
        Choisissez l’offre adaptée à votre activité.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="mt-2 text-3xl font-black">{plan.price}</p>
            <p className="mt-3 text-white/60">{plan.desc}</p>

            <button
              onClick={() => subscribe(plan.id)}
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-bold hover:bg-blue-700"
              disabled={loadingPlan === plan.id}
            >
              {loadingPlan === plan.id ? "Redirection..." : "S’abonner"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
