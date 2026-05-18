"use client";

import "./pricing.css";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  Check,
  Crown,
  Rocket,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Loader2,
  ArrowRight,
  Brain,
  BarChart3,
  Users,
  CreditCard,
  Zap,
  Clock3,
  CheckCircle2,
} from "lucide-react";

export default function PricingPage() {

  const [loadingPlan, setLoadingPlan] =
    useState<string | null>(null);

  const [yearly, setYearly] =
    useState(false);

  const [openFaq, setOpenFaq] =
    useState<number | null>(0);

  const plans = useMemo(() => {

    return [

      {
        id: "starter",
        name: "Starter",
        icon: <Zap />,
        price: 0,

        desc: "Découvrir FlowBiz gratuitement",

        button: "Créer un compte",

        featured: false,

        trial: false,

        features: [
          "CRM limité",
          "3 clients max",
          "Facturation simple",
          "Dashboard basique",
          "Accès communauté",
          "Support email",
        ],
      },

      {
        id: "essentiel",

        name: "Essentiel",

        icon: <Sparkles />,

        price: yearly ? 15 : 19,

        desc:
          "Pour indépendants et freelances",

        button: "Essai gratuit 14 jours",

        featured: false,

        trial: true,

        features: [
          "CRM clients",
          "Facturation",
          "Dashboard",
          "IA basique",
          "5 utilisateurs max",
          "Support standard",
          "Exports PDF",
        ],
      },

      {
        id: "premium",

        name: "Premium",

        icon: <Crown />,

        price: yearly ? 39 : 49,

        desc:
          "Pour entreprises en croissance",

        button: "Essai Premium",

        featured: true,

        trial: true,

        features: [
          "IA avancée",
          "Automatisations",
          "Comptabilité",
          "Analytics",
          "Multi-utilisateurs",
          "Exports PDF",
          "Support prioritaire",
          "Accès Academy",
        ],
      },

      {
        id: "pro",

        name: "Pro",

        icon: <Rocket />,

        price: yearly ? 79 : 99,

        desc:
          "Pour équipes & entreprises",

        button: "Passer Pro",

        featured: false,

        trial: true,

        features: [
          "IA illimitée",
          "API & intégrations",
          "CRM avancé",
          "RH & gestion équipe",
          "Automatisation avancée",
          "Support VIP",
          "Accès FlowBiz Academy",
          "Multi-sites",
        ],
      },
    ];

  }, [yearly]);

  const handleCheckout = async (
    plan: string
  ) => {

    try {

      setLoadingPlan(plan);

      if (plan === "starter") {

        window.location.href =
          "/signup";

        return;
      }

      const response = await fetch(
        "/api/checkout",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            plan,
            yearly,
          }),
        }
      );

      const data = await response.json();

      if (data.url) {

        window.location.href =
          data.url;
      }

    } catch (error) {

      console.log(error);

      alert(
        "Erreur Stripe Checkout"
      );

    } finally {

      setLoadingPlan(null);
    }
  };

  const faq = [

    {
      q: "Puis-je annuler mon abonnement ?",

      a:
        "Oui, vous pouvez annuler à tout moment depuis votre espace client.",
    },

    {
      q: "Comment fonctionne la période d’essai ?",

      a:
        "Les offres Essentiel, Premium et Pro incluent 14 jours d’essai gratuit sans engagement.",
    },

    {
      q: "Les paiements sont-ils sécurisés ?",

      a:
        "Oui. Tous les paiements sont sécurisés par Stripe avec chiffrement SSL bancaire.",
    },

    {
      q: "Puis-je changer de formule ?",

      a:
        "Oui, vous pouvez passer à une formule supérieure à tout moment.",
    },
  ];

  return (

    <div className="pricingPage">

      {/* BACKGROUND */}

      <div className="bgGlow glow1" />
      <div className="bgGlow glow2" />

      {/* NAVBAR */}

      <nav className="pricingNavbar">

        <div className="logo">
          FLOWBIZ
        </div>

        <div className="navLinks">

          <Link href="/">
            Accueil
          </Link>

          <Link href="/dashboard">
            Dashboard
          </Link>

          <Link href="/academy">
            Academy
          </Link>

          <Link href="/login">
            Connexion
          </Link>

        </div>
      </nav>

      {/* HERO */}

      <section className="heroSection">

        <span className="heroBadge">
          SaaS IA • CRM • Finance
        </span>

        <h1>
          Développez votre entreprise
          avec FlowBiz
        </h1>

        <p>

          Une plateforme SaaS moderne
          pour gérer vos clients,
          automatiser vos tâches,
          piloter vos finances et
          accélérer votre croissance.

        </p>

        {/* STATS */}

        <div className="heroStats">

          <div className="statCard">

            <Brain />

            <h3>
              IA intégrée
            </h3>

            <span>
              Automatisation business
            </span>

          </div>

          <div className="statCard">

            <Users />

            <h3>
              CRM intelligent
            </h3>

            <span>
              Gestion clients complète
            </span>

          </div>

          <div className="statCard">

            <BarChart3 />

            <h3>
              Analytics
            </h3>

            <span>
              Analyse & croissance
            </span>

          </div>

        </div>

        {/* TRIAL */}

        <div className="trialBanner">

          <Clock3 />

          <div>

            <h3>
              14 jours d’essai gratuit
            </h3>

            <p>
              Sans engagement • Sans
              frais cachés • Annulation
              à tout moment
            </p>

          </div>

        </div>

        {/* TOGGLE */}

        <div className="billingToggle">

          <button
            className={
              !yearly
                ? "toggleActive"
                : ""
            }
            onClick={() =>
              setYearly(false)
            }
          >
            Mensuel
          </button>

          <button
            className={
              yearly
                ? "toggleActive"
                : ""
            }
            onClick={() =>
              setYearly(true)
            }
          >
            Annuel -20%
          </button>

        </div>

      </section>

      {/* CARDS */}

      <section className="pricingGrid">

        {plans.map((plan) => (

          <div
            key={plan.id}
            className={`pricingCard ${
              plan.featured
                ? "featured"
                : ""
            }`}
          >

            {plan.featured && (

              <div className="popular">
                POPULAIRE
              </div>

            )}

            <div className="planIcon">
              {plan.icon}
            </div>

            <h2>
              {plan.name}
            </h2>

            <p className="planDesc">
              {plan.desc}
            </p>

            {plan.trial && (

              <div className="trialTag">

                <CheckCircle2 />

                14 jours gratuits

              </div>

            )}

            <div className="price">

              {plan.price}€

              <span>
                /mois
              </span>

            </div>

            <ul>

              {plan.features.map(
                (feature) => (

                  <li key={feature}>

                    <Check />

                    {feature}

                  </li>
                )
              )}

            </ul>

            <button
              className={
                plan.featured
                  ? "premiumBtn"
                  : ""
              }
              onClick={() =>
                handleCheckout(
                  plan.id
                )
              }
              disabled={
                loadingPlan ===
                plan.id
              }
            >

              {loadingPlan ===
              plan.id ? (

                <Loader2 className="spin" />

              ) : (

                <>

                  {plan.button}

                  <ArrowRight />

                </>

              )}

            </button>

          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}

      <section className="howSection">

        <h2>
          Comment ça marche ?
        </h2>

        <div className="howGrid">

          <div className="howCard">

            <span>01</span>

            <h3>
              Créez votre compte
            </h3>

            <p>
              Commencez gratuitement
              avec FlowBiz Starter.
            </p>

          </div>

          <div className="howCard">

            <span>02</span>

            <h3>
              Activez votre essai
            </h3>

            <p>
              Testez les fonctionnalités
              premium pendant 14 jours.
            </p>

          </div>

          <div className="howCard">

            <span>03</span>

            <h3>
              Gérez votre activité
            </h3>

            <p>
              CRM, facturation, IA,
              automatisation et analytics
              dans une seule plateforme.
            </p>

          </div>

        </div>

      </section>

      {/* TABLE */}

      <section className="compareSection">

        <h2>
          Comparatif des offres
        </h2>

        <div className="tableWrapper">

          <table>

            <thead>

              <tr>

                <th>
                  Fonctionnalités
                </th>

                <th>
                  Starter
                </th>

                <th>
                  Essentiel
                </th>

                <th>
                  Premium
                </th>

                <th>
                  Pro
                </th>

              </tr>

            </thead>

            <tbody>

              <tr>
                <td>CRM</td>
                <td>Limité</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
              </tr>

              <tr>
                <td>IA</td>
                <td>❌</td>
                <td>Basique</td>
                <td>Avancée</td>
                <td>Illimitée</td>
              </tr>

              <tr>
                <td>Analytics</td>
                <td>❌</td>
                <td>❌</td>
                <td>✅</td>
                <td>✅</td>
              </tr>

              <tr>
                <td>API</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
                <td>✅</td>
              </tr>

              <tr>
                <td>Support</td>
                <td>Email</td>
                <td>Standard</td>
                <td>Prioritaire</td>
                <td>VIP</td>
              </tr>

            </tbody>

          </table>

        </div>
      </section>

      {/* SECURITY */}

      <section className="securitySection">

        <ShieldCheck />

        <h2>
          Paiements sécurisés
        </h2>

        <p>

          Toutes les transactions sont
          sécurisées par Stripe avec
          chiffrement bancaire SSL.

        </p>

      </section>

      {/* FAQ */}

      <section className="faqSection">

        <h2>
          Questions fréquentes
        </h2>

        <div className="faqGrid">

          {faq.map((item, index) => (

            <div
              key={index}
              className={`faqItem ${
                openFaq === index
                  ? "faqOpen"
                  : ""
              }`}
            >

              <button
                className="faqQuestion"
                onClick={() =>
                  setOpenFaq(
                    openFaq === index
                      ? null
                      : index
                  )
                }
              >

                {item.q}

                <ChevronDown />

              </button>

              {openFaq === index && (

                <div className="faqAnswer">
                  {item.a}
                </div>

              )}

            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="bottomCTA">

        <CreditCard />

        <h2>
          Lancez votre activité
          avec FlowBiz
        </h2>

        <p>

          CRM, IA, comptabilité,
          automatisation et gestion
          SaaS réunis dans une seule
          plateforme moderne.

        </p>

        <Link href="/signup">
          Commencer maintenant
        </Link>

      </section>

    </div>
  );
}
