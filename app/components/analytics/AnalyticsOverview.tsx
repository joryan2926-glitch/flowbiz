// ======================================================
// components/analytics/AnalyticsOverview.tsx
// FLOWBIZ ANALYTICS OVERVIEW
// FINAL VERSION
// ======================================================


"use client";


import {
  Brain,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";


interface Props{


  revenue:number;


  growthRate:number;


  churnRate:number;


  conversionRate:number;
}


export default function AnalyticsOverview({
  revenue,
  growthRate,
  churnRate,
  conversionRate,
}:Props){


  return(


    <section className="analyticsOverviewGrid">


      <div className="analyticsOverviewCard">


        <div className="analyticsOverviewIcon">


          <BarChart3 />


        </div>


        <div>


          <span>
            Revenus globaux
          </span>


          <h2>


            {
              revenue.toFixed(2)
            }€


          </h2>


        </div>


      </div>


      <div className="analyticsOverviewCard">


        <div className="analyticsOverviewIcon">


          <TrendingUp />


        </div>


        <div>


          <span>
            Croissance
          </span>


          <h2>


            {
              growthRate.toFixed(2)
            }%


          </h2>


        </div>


      </div>


      <div className="analyticsOverviewCard">


        <div className="analyticsOverviewIcon">


          <Activity />


        </div>


        <div>


          <span>
            Churn
          </span>


          <h2>


            {
              churnRate.toFixed(2)
            }%


          </h2>


        </div>


      </div>


      <div className="analyticsOverviewCard">


        <div className="analyticsOverviewIcon">


          <Brain />


        </div>


        <div>


          <span>
            Conversion
          </span>


          <h2>


            {
              conversionRate.toFixed(2)
            }%


          </h2>


        </div>


      </div>


    </section>
  );
}
