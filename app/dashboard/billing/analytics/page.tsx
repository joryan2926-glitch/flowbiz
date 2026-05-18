// ========================================================
// app/dashboard/billing/analytics/page.tsx
// FLOWBIZ BILLING ANALYTICS LIVE
// ========================================================

"use client";

import "./analytics.css";

import {
  useEffect,
  useState,
} from "react";

import {
  Loader2,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  BarChart3,
  Activity,
  RefreshCw,
  Sparkles,
  Brain,
  ShieldCheck,
  ArrowUpRight,
  LineChart,
  PieChart,
  Users,
} from "lucide-react";

/* ========================================================
INTERFACE
======================================================== */

interface Analytics{

  mrr:number;

  arr:number;

  churn:number;

  activeSubscriptions:number;

  canceledSubscriptions:number;

  totalSubscriptions:number;

  growthRate:number;

  investorScore:number;
}

/* ========================================================
PAGE
======================================================== */

export default function AnalyticsPage(){

  /*
  ======================================================
  STATES
  ======================================================
  */

  const [loading,setLoading] =
    useState(true);

  const [analytics,
    setAnalytics] =
    useState<Analytics | null>(
      null
    );

  /*
  ======================================================
  LOAD ANALYTICS
  ======================================================
  */

  async function loadAnalytics(){

    try{

      setLoading(true);

      const response =
        await fetch(
          "/api/stripe/analytics"
        );

      const data =
        await response.json();

      setAnalytics(data);

      setLoading(false);

    }catch(error){

      console.log(error);

      setLoading(false);
    }
  }

  /*
  ======================================================
  INIT
  ======================================================
  */

  useEffect(()=>{

    loadAnalytics();

  },[]);

  /*
  ======================================================
  LOADING
  ======================================================
  */

  if(
    loading ||
    !analytics
  ){

    return(

      <div className="analyticsLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ======================================================
  PAGE
  ======================================================
  */

  return(

    <div className="analyticsPage">

      {/* GLOWS */}

      <div className="analyticsGlowOne" />
      <div className="analyticsGlowTwo" />

      {/* TOPBAR */}

      <header className="analyticsTopbar">

        <div>

          <span className="analyticsBadge">

            <Sparkles />

            FLOWBIZ CEO ANALYTICS

          </span>

          <h1>

            SaaS Analytics Live

          </h1>

          <p>

            Dashboard CEO,
            investisseurs,
            croissance SaaS,
            revenus récurrents
            et analytics Stripe live.

          </p>

        </div>

        <button
          className="refreshBtn"
          onClick={loadAnalytics}
        >

          <RefreshCw />

          Actualiser

        </button>

      </header>

      {/* HERO */}

      <section className="analyticsHero">

        <div className="heroLeft">

          <Brain />

          <div>

            <h3>

              Intelligence SaaS Temps Réel

            </h3>

            <p>

              MRR,
              ARR,
              churn,
              croissance,
              abonnements
              et prévisions business.

            </p>

          </div>

        </div>

      </section>

      {/* KPI */}

      <section className="analyticsStats">

        <div className="analyticsCard revenue">

          <CircleDollarSign />

          <div>

            <strong>

              {
                analytics.mrr
                  .toLocaleString()
              }

              €

            </strong>

            <span>

              MRR Réel

            </span>

          </div>

        </div>

        <div className="analyticsCard">

          <BarChart3 />

          <div>

            <strong>

              {
                analytics.arr
                  .toLocaleString()
              }

              €

            </strong>

            <span>

              ARR Réel

            </span>

          </div>

        </div>

        <div className="analyticsCard">

          <TrendingDown />

          <div>

            <strong>

              {
                analytics.churn
              }%

            </strong>

            <span>

              Churn Rate

            </span>

          </div>

        </div>

        <div className="analyticsCard">

          <Users />

          <div>

            <strong>

              {
                analytics.activeSubscriptions
              }

            </strong>

            <span>

              Abonnements actifs

            </span>

          </div>

        </div>

      </section>

      {/* GRID */}

      <section className="analyticsGrid">

        {/* GROWTH */}

        <div className="analyticsWidget">

          <div className="widgetTop">

            <LineChart />

            Croissance SaaS

          </div>

          <div className="growthBox">

            <strong>

              +
              {
                analytics.growthRate
                  .toFixed(1)
              }

              %

            </strong>

            <span>

              Croissance moyenne

            </span>

          </div>

        </div>

        {/* CEO */}

        <div className="analyticsWidget">

          <div className="widgetTop">

            <ShieldCheck />

            Dashboard CEO

          </div>

          <ul className="analyticsList">

            <li>

              MRR stable

            </li>

            <li>

              Churn maîtrisé

            </li>

            <li>

              Croissance positive

            </li>

            <li>

              Revenus récurrents actifs

            </li>

          </ul>

        </div>

        {/* INVESTOR */}

        <div className="analyticsWidget">

          <div className="widgetTop">

            <PieChart />

            Dashboard Investisseurs

          </div>

          <div className="investorScore">

            <strong>

              {
                analytics.investorScore
              }/100

            </strong>

            <span>

              Investor Score

            </span>

          </div>

        </div>

        {/* SUBSCRIPTIONS */}

        <div className="analyticsWidget">

          <div className="widgetTop">

            <Activity />

            Abonnements

          </div>

          <div className="subscriptionAnalytics">

            <div>

              <TrendingUp />

              <span>

                Actifs :
                {" "}
                {
                  analytics.activeSubscriptions
                }

              </span>

            </div>

            <div>

              <TrendingDown />

              <span>

                Résiliés :
                {" "}
                {
                  analytics.canceledSubscriptions
                }

              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
