// ======================================================
// app/dashboard/ceo/page.tsx
// FLOWBIZ CEO DASHBOARD
// ULTRA PREMIUM FINAL VERSION
// ======================================================

"use client";

import "./ceo.css";

import {
  useEffect,
  useState,
} from "react";

import {
  DollarSign,
  TrendingUp,
  Users,
  Activity,
  Brain,
  ShieldCheck,
  Rocket,
  Loader2,
  Sparkles,
  Clock3,
  BadgeCheck,
} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface CeoMetrics{

  revenue:number;

  growth:number;

  activeCustomers:number;

  churn:number;

  mrr:number;

  arr:number;

  health:number;

  tasks:number;
}

/* ======================================================
PAGE
====================================================== */

export default function CeoDashboardPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    metrics,
    setMetrics,
  ] =
    useState<CeoMetrics | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  /*
  ====================================================
  LOAD DATA
  ====================================================
  */

  useEffect(()=>{

    async function loadDashboard(){

      try{

        const response =
          await fetch(

            "/api/stripe/analytics",

            {
              cache:"no-store",
            }
          );

        const data =
          await response.json();

        setMetrics({

          revenue:
            data.revenue || 0,

          growth:
            data.growth || 0,

          activeCustomers:
            data.customers || 0,

          churn:
            data.churn || 0,

          mrr:
            data.mrr || 0,

          arr:
            data.arr || 0,

          health:92,

          tasks:14,
        });

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);
      }
    }

    loadDashboard();

  },[]);

  /*
  ====================================================
  LOADER
  ====================================================
  */

  if(loading){

    return(

      <div className="ceoLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="ceoPage">

      {/* ==================================================
      GLOWS
      ================================================== */}

      <div className="ceoGlowOne" />
      <div className="ceoGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="ceoTopbar">

        <span className="ceoBadge">

          <Sparkles />

          FLOWBIZ CEO

        </span>

        <h1>

          CEO Dashboard

        </h1>

        <p>

          Pilotage SaaS temps réel :
          revenus,
          croissance,
          santé business
          et performance globale.

        </p>

      </header>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="ceoGrid">

        {/* REVENUE */}

        <div className="ceoCard">

          <div className="ceoCardTop">

            <div className="ceoIcon">

              <DollarSign />

            </div>

            <span className="ceoGrowth">

              +{metrics?.growth}%

            </span>

          </div>

          <strong>

            {metrics?.revenue}€

          </strong>

          <p>

            Revenus totaux

          </p>

        </div>

        {/* CUSTOMERS */}

        <div className="ceoCard">

          <div className="ceoCardTop">

            <div className="ceoIcon">

              <Users />

            </div>

          </div>

          <strong>

            {
              metrics?.activeCustomers
            }

          </strong>

          <p>

            Clients actifs

          </p>

        </div>

        {/* MRR */}

        <div className="ceoCard">

          <div className="ceoCardTop">

            <div className="ceoIcon">

              <TrendingUp />

            </div>

          </div>

          <strong>

            {metrics?.mrr}€

          </strong>

          <p>

            Monthly Recurring Revenue

          </p>

        </div>

        {/* ARR */}

        <div className="ceoCard">

          <div className="ceoCardTop">

            <div className="ceoIcon">

              <Rocket />

            </div>

          </div>

          <strong>

            {metrics?.arr}€

          </strong>

          <p>

            Annual Recurring Revenue

          </p>

        </div>

        {/* CHURN */}

        <div className="ceoCard">

          <div className="ceoCardTop">

            <div className="ceoIcon danger">

              <Activity />

            </div>

          </div>

          <strong>

            {metrics?.churn}%

          </strong>

          <p>

            Churn Rate

          </p>

        </div>

        {/* TASKS */}

        <div className="ceoCard">

          <div className="ceoCardTop">

            <div className="ceoIcon">

              <Clock3 />

            </div>

          </div>

          <strong>

            {metrics?.tasks}

          </strong>

          <p>

            Tâches prioritaires

          </p>

        </div>

      </section>

      {/* ==================================================
      HEALTH
      ================================================== */}

      <section className="ceoHealthSection">

        <div className="ceoHealthCard">

          <div className="ceoHealthTop">

            <ShieldCheck />

            SaaS Health Score

          </div>

          <div className="ceoHealthBar">

            <div

              className="ceoHealthFill"

              style={{
                width:
                  `${metrics?.health}%`,
              }}
            />

          </div>

          <span>

            Infrastructure stable,
            croissance positive,
            Stripe synchronisé
            et faible churn.

          </span>

        </div>

      </section>

      {/* ==================================================
      AI SECTION
      ================================================== */}

      <section className="ceoAiSection">

        <div className="ceoAiCard">

          <div className="ceoAiTop">

            <Brain />

            IA Business Analysis

          </div>

          <ul className="ceoAiList">

            <li>

              Forte croissance
              des revenus récurrents

            </li>

            <li>

              Risque churn faible

            </li>

            <li>

              Opportunité scaling
              acquisition SaaS

            </li>

            <li>

              Recommandation :
              renforcer onboarding

            </li>

          </ul>

        </div>

        <div className="ceoAiCard">

          <div className="ceoAiTop">

            <BadgeCheck />

            Priorités CEO

          </div>

          <ul className="ceoAiList">

            <li>

              Finaliser auth SaaS

            </li>

            <li>

              Déployer emails billing

            </li>

            <li>

              Optimiser conversion

            </li>

            <li>

              Préparer lancement public

            </li>

          </ul>

        </div>

      </section>

    </div>
  );
}
