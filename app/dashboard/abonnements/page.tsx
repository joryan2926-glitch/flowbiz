"use client";


import "./abonnements.css";


import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Crown,
  Download,
  FileText,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";


type Plan = {
  id: string;
  name: string;
  price: string;
  badge: string;
  description: string;
  features: string[];
  stripePriceId?: string;
};


const plans: Plan[] = [
  {
    id: "free",
    name: "Free Starter",
    price: "0€",
    badge: "Découverte",
    description: "Pour tester FlowBiz gratuitement.",
    features: ["CRM limité", "Factures limitées", "Dashboard simple"],
  },
  {
    id: "essential",
    name: "Essentiel",
    price: "19€/mois",
    badge: "Indépendants",
    description: "Pour commencer à piloter son activité.",
    features: ["Clients illimités", "Facturation", "Finance", "Support standard"],
    stripePriceId: "price_ESSENTIEL",
  },
  {
    id: "premium",
    name: "Premium",
    price: "49€/mois",
    badge: "Recommandé",
    description: "Pour automatiser et analyser son business.",
    features: ["IA business", "Analytics", "Stripe", "Automatisations"],
    stripePriceId: "price_PREMIUM",
  },
  {
    id: "pro",
    name: "Pro",
    price: "99€/mois",
    badge: "Équipe",
    description: "Pour PME, équipes et gestion avancée.",
    features: ["Multi-utilisateurs", "CRM avancé", "Automations", "Support prioritaire"],
    stripePriceId: "price_PRO",
  },
];


export default function AbonnementsPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState("free");


  const currentPlan = useMemo(
    () => plans.find((plan) => plan.id === activePlan),
    [activePlan]
  );


  async function subscribe(plan: Plan) {
    if (plan.id === "free") {
      setActivePlan("free");
      alert("Offre Free Starter activée.");
      return;
    }


    try {
      setLoadingPlan(plan.id);


      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: plan.id,
          priceId: plan.stripePriceId,
          planName: plan.name,
        }),
      });


      const data = await response.json();


      if (!response.ok) {
        alert(data?.error || "Erreur Stripe Checkout.");
        return;
      }


      if (data?.url) {
        window.location.href = data.url;
        return;
      }


      alert("Session Stripe créée, mais aucune URL reçue.");
    } catch (error) {
      console.error(error);
      alert("Impossible de lancer le paiement Stripe.");
    } finally {
      setLoadingPlan(null);
    }
  }


  function exportPlans() {
    const blob = new Blob([JSON.stringify(plans, null, 2)], {
      type: "application/json",
    });


    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");


    a.href = url;
    a.download = "flowbiz-abonnements.json";
    a.click();


    URL.revokeObjectURL(url);
  }


  return (
    <main className="subscriptionsPage">
      <header className="subscriptionsHeader">
        <div>
          <span className="subscriptionsBadge">
            <Sparkles size={15} />
            FLOWBIZ SUBSCRIPTIONS
          </span>


          <h1>Abonnements FlowBiz</h1>


          <p>
            Gérez les offres SaaS, les paiements Stripe, les accès utilisateurs
            et les plans Free, Essentiel, Premium et Pro.
          </p>
        </div>


        <div className="subscriptionsActions">
          <button type="button" onClick={exportPlans} className="ghostBtn">
            <Download size={18} />
            Exporter
          </button>


          <Link href="/dashboard" className="primaryBtn">
            Dashboard
            <ArrowRight size={18} />
          </Link>
        </div>
      </header>


      <section className="subscriptionsStats">
        <div className="statCard">
          <CreditCard />
          <div>
            <strong>{plans.length}</strong>
            <span>Offres</span>
          </div>
        </div>


        <div className="statCard">
          <Crown />
          <div>
            <strong>{currentPlan?.name}</strong>
            <span>Plan actuel</span>
          </div>
        </div>


        <div className="statCard">
          <ShieldCheck />
          <div>
            <strong>Stripe</strong>
            <span>Paiement sécurisé</span>
          </div>
        </div>


        <div className="statCard">
          <Users />
          <div>
            <strong>SaaS</strong>
            <span>Accès clients</span>
          </div>
        </div>
      </section>


      <section className="plansGrid">
        {plans.map((plan) => {
          const isActive = activePlan === plan.id;
          const isLoading = loadingPlan === plan.id;


          return (
            <article
              key={plan.id}
              className={`planCard ${isActive ? "active" : ""}`}
            >
              <div className="planTop">
                <span>{plan.badge}</span>
                {isActive && <CheckCircle2 size={20} />}
              </div>


              <h2>{plan.name}</h2>
              <strong>{plan.price}</strong>
              <p>{plan.description}</p>


              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={15} />
                    {feature}
                  </li>
                ))}
              </ul>


              <button
                type="button"
                className="subscribeBtn"
                onClick={() => subscribe(plan)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="spin" size={18} />
                ) : (
                  <Zap size={18} />
                )}


                {plan.id === "free" ? "Activer" : "Souscrire"}
              </button>
            </article>
          );
        })}
      </section>


      <section className="linkedPages">
        <Link href="/dashboard/factures">
          <FileText />
          Factures
        </Link>


        <Link href="/dashboard/finance">
          <CreditCard />
          Finance
        </Link>


        <Link href="/dashboard/analytics">
          <BarChart3 />
          Analytics
        </Link>


        <button type="button" onClick={() => location.reload()}>
          <RefreshCw />
          Actualiser
        </button>
      </section>
    </main>
  );
}
