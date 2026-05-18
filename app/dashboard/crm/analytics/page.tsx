"use client";

/* ======================================================
FLOWBIZ CRM ANALYTICS
REALTIME SALES ANALYTICS
====================================================== */

import "./crm-analytics.css";

import {

  useEffect,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  BrainCircuit,
  Loader2,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,

} from "lucide-react";

import {

  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,

} from "recharts";

/* ======================================================
INTERFACE
====================================================== */

interface Deal{

  id:string;

  full_name:string;

  value:number;

  stage:string;

  created_at:string;
}

/* ======================================================
PAGE
====================================================== */

export default function AnalyticsPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [

    loading,
    setLoading,

  ] =
    useState(true);

  const [

    deals,
    setDeals,

  ] =
    useState<Deal[]>([]);

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    loadAnalytics();

    realtime();

  },[]);

  async function loadAnalytics(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from("crm_pipeline")

          .select("*")

          .order(
            "created_at",
            {
              ascending:true,
            }
          );

      if(error){

        console.log(error);

        return;
      }

      setDeals(data || []);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  REALTIME
  ====================================================
  */

  function realtime(){

    supabase

      .channel(
        "crm-analytics"
      )

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"crm_pipeline",
        },

        ()=>{

          loadAnalytics();
        }
      )

      .subscribe();
  }

  /*
  ====================================================
  TOTALS
  ====================================================
  */

  const totalRevenue =

    deals.reduce(

      (acc,deal)=>

        acc + (
          Number(deal.value)
          || 0
        ),

      0
    );

  const wonDeals =

    deals.filter(

      deal =>

        deal.stage === "won"
    );

  const conversionRate =

    deals.length

    ? (

        wonDeals.length
        / deals.length

      ) * 100

    : 0;

  /*
  ====================================================
  MONTH DATA
  ====================================================
  */

  const monthMap:any = {};

  deals.forEach(

    deal => {

      const date =

        new Date(
          deal.created_at
        );

      const month =

        date.toLocaleString(
          "fr-FR",
          {
            month:"short",
          }
        );

      if(!monthMap[month]){

        monthMap[month] = 0;
      }

      monthMap[month] +=
        Number(deal.value);
    }
  );

  const chartData =

    Object.keys(monthMap)

      .map(

        month => ({

          month,

          revenue:
            monthMap[month],
        })
      );

  /*
  ====================================================
  PIE DATA
  ====================================================
  */

  const pieData = [

    {
      name:"Leads",
      value:
        deals.filter(
          d => d.stage === "lead"
        ).length,
    },

    {
      name:"Qualifiés",
      value:
        deals.filter(
          d => d.stage === "qualified"
        ).length,
    },

    {
      name:"Propositions",
      value:
        deals.filter(
          d => d.stage === "proposal"
        ).length,
    },

    {
      name:"Gagnés",
      value:
        deals.filter(
          d => d.stage === "won"
        ).length,
    },
  ];

  const colors = [

    "#6e59ff",
    "#00d4ff",
    "#00d97e",
    "#ffb800",
  ];

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="analyticsLoader">

        <Loader2
          className="spin"
        />

      </div>
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="analyticsPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="analyticsHeader">

        <div>

          <div className="analyticsBadge">

            <BrainCircuit
              size={16}
            />

            FLOWBIZ ANALYTICS

          </div>

          <h1>

            Smart Analytics

          </h1>

          <p>

            Dashboard analytics
            connecté en temps réel
            au CRM FlowBiz.

          </p>

        </div>

      </header>

      {/* ==================================================
      STATS
      ================================================== */}

      <section className="analyticsStats">

        {/* ============================================== */}

        <div className="analyticsCard">

          <div className="analyticsIcon">

            <DollarSign />

          </div>

          <div>

            <span>

              Revenus

            </span>

            <h2>

              {

                totalRevenue
                  .toLocaleString()

              } €

            </h2>

          </div>

        </div>

        {/* ============================================== */}

        <div className="analyticsCard">

          <div className="analyticsIcon">

            <Users />

          </div>

          <div>

            <span>

              Leads

            </span>

            <h2>

              {
                deals.length
              }

            </h2>

          </div>

        </div>

        {/* ============================================== */}

        <div className="analyticsCard">

          <div className="analyticsIcon">

            <CheckCircle2 />

          </div>

          <div>

            <span>

              Gagnés

            </span>

            <h2>

              {
                wonDeals.length
              }

            </h2>

          </div>

        </div>

        {/* ============================================== */}

        <div className="analyticsCard">

          <div className="analyticsIcon">

            <TrendingUp />

          </div>

          <div>

            <span>

              Conversion

            </span>

            <h2>

              {

                conversionRate
                  .toFixed(1)

              } %

            </h2>

          </div>

        </div>

      </section>

      {/* ==================================================
      CHARTS
      ================================================== */}

      <section className="chartsGrid">

        {/* ==============================================
        AREA
        ============================================== */}

        <div className="chartCard">

          <h3>

            Revenus mensuels

          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <AreaChart
              data={chartData}
            >

              <defs>

                <linearGradient
                  id="colorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#6e59ff"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor="#6e59ff"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />

              <XAxis
                dataKey="month"
                stroke="#ffffff88"
              />

              <Tooltip />

              <Area

                type="monotone"

                dataKey="revenue"

                stroke="#6e59ff"

                fillOpacity={1}

                fill="url(#colorRevenue)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

        {/* ==============================================
        PIE
        ============================================== */}

        <div className="chartCard">

          <h3>

            Pipeline

          </h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie

                data={pieData}

                cx="50%"

                cy="50%"

                outerRadius={110}

                dataKey="value"
              >

                {

                  pieData.map(

                    (
                      entry,
                      index
                    ) => (

                      <Cell

                        key={`cell-${index}`}

                        fill={
                          colors[index]
                        }
                      />
                    )
                  )
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </section>

    </div>
  );
}
