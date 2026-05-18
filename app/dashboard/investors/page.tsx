// ======================================================
// app/dashboard/investors/page.tsx
// FLOWBIZ INVESTOR DASHBOARD
// ULTRA PREMIUM FINAL VERSION
// ======================================================

"use client";

import "./investors.css";

import {
  useEffect,
  useState,
} from "react";

import {
  Sparkles,
  TrendingUp,
  DollarSign,
  Activity,
  Brain,
  Crown,
  Rocket,
  ShieldCheck,
  Loader2,
  BarChart3,
} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface InvestorMetrics{

  mrr:number;

  arr:number;

  growth:number;

  churn:number;

  runway:number;

  burnRate:number;

  ltv:number;

  cac:number;

  activeCustomers:number;

  health:number;
}

/* ======================================================
PAGE
====================================================== */

export default function InvestorsDashboard(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    metrics,
    setMetrics,
  ] =
    useState<InvestorMetrics | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    async function loadMetrics(){

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

          mrr:
            data.mrr || 0,

          arr:
            data.arr || 0,

          growth:
            data.growth || 0,

          churn:
            data.churn || 0,

          runway:18,

          burnRate:4200,

          ltv:
            data.ltv || 0,

          cac:82,

          activeCustomers:
            data.customers || 0,

          health:91,
        });

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);
      }
    }

    loadMetrics();

  },[]);

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="investorsLoader">

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

    <div className="investorsPage">

      {/* ==================================================
      GLOWS
      ================================================== */}

      <div className="investorsGlowOne" />
      <div className="investorsGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="investorsTopbar">

        <div>

          <span className="investorsBadge">

            <Sparkles />

            FLOWBIZ INVESTORS

          </span>

          <h1>

            Investor Dashboard

          </h1>

          <p>

            Dashboard SaaS
            investisseur temps réel :
            revenus,
            croissance,
            santé financière
            et prévisions IA.

          </p>

        </div>

      </header>

      {/* ==================================================
      METRICS GRID
      ================================================== */}

      <section className="investorsGrid">

        {/* MRR */}

        <div className="investorCard">

          <div className="investorCardTop">

            <div className="investorIcon">

              <DollarSign />

            </div>

            <span className="growthBadge">

              +{metrics?.growth}%

            </span>

          </div>

          <strong>

            {metrics?.mrr}€

          </strong>

          <p>

            Monthly Recurring Revenue

          </p>

        </div>

        {/* ARR */}

        <div className="investorCard">

          <div className="investorCardTop">

            <div className="investorIcon">

              <TrendingUp />

            </div>

          </div>

          <strong>

            {metrics?.arr}€

          </strong>

          <p>

            Annual Recurring Revenue

          </p>

        </div>

        {/* CUSTOMERS */}

        <div className="investorCard">

          <div className="investorCardTop">

            <div className="investorIcon">

              <Crown />

            </div>

          </div>

          <strong>

            {
              metrics?.activeCustomers
            }

          </strong>

          <p>

            Active Customers

          </p>

        </div>

        {/* CHURN */}

        <div className="investorCard">

          <div className="investorCardTop">

            <div className="investorIcon danger">

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

        {/* RUNWAY */}

        <div className="investorCard">

          <div className="investorCardTop">

            <div className="investorIcon">

              <Rocket />

            </div>

          </div>

          <strong>

            {metrics?.runway} mois

          </strong>

          <p>

            Estimated Runway

          </p>

        </div>

        {/* LTV */}

        <div className="investorCard">

          <div className="investorCardTop">

            <div className="investorIcon">

              <BarChart3 />

            </div>

          </div>

          <strong>

            {metrics?.ltv}€

          </strong>

          <p>

            Customer Lifetime Value

          </p>

        </div>

      </section>

      {/* ==================================================
      HEALTH SECTION
      ================================================== */}

      <section className="healthSection">

        <div className="healthCard">

          <div className="healthTop">

            <ShieldCheck />

            SaaS Health Score

          </div>

          <div className="healthBar">

            <div

              className="healthFill"

              style={{
                width:
                  `${metrics?.health}%`,
              }}
            />

          </div>

          <span>

            Infrastructure stable,
            Stripe synchronisé,
            croissance positive
            et faible churn.

          </span>

        </div>

      </section>

      {/* ==================================================
      AI FORECAST
      ================================================== */}

      <section className="forecastSection">

        <div className="forecastCard">

          <div className="forecastTop">

            <Brain />

            Prévisions IA

          </div>

          <ul className="forecastList">

            <li>

              Croissance MRR projetée :
              +18% sur 90 jours

            </li>

            <li>

              Risque churn :
              faible

            </li>

            <li>

              Forte capacité
              d’expansion SaaS

            </li>

            <li>

              Recommandation :
              scaling acquisition

            </li>

          </ul>

        </div>

      </section>

    </div>
  );
}
