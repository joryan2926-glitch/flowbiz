// ======================================================
// components/analytics/AnalyticsKPIs.tsx
// FLOWBIZ ANALYTICS KPIS
// ======================================================


"use client";


import {
  DollarSign,
  Wallet,
  Users,
  CreditCard,
  TrendingUp,
} from "lucide-react";


interface Props{


  revenue:number;


  cashflow:number;


  clients:number;


  subscriptions:number;


  mrr:number;
}


export default function AnalyticsKPIs({
  revenue,
  cashflow,
  clients,
  subscriptions,
  mrr,
}:Props){


  const kpis = [


    {
      title:"Revenus",
      value:`${revenue.toFixed(2)}€`,
      icon:<DollarSign />,
    },


    {
      title:"Cashflow",
      value:`${cashflow.toFixed(2)}€`,
      icon:<Wallet />,
    },


    {
      title:"Clients",
      value:clients,
      icon:<Users />,
    },


    {
      title:"Abonnements",
      value:subscriptions,
      icon:<CreditCard />,
    },


    {
      title:"MRR",
      value:`${mrr.toFixed(2)}€`,
      icon:<TrendingUp />,
    },
  ];


  return(


    <section className="analyticsKpisGrid">


      {
        kpis.map(
          (kpi,index)=>{


            return(


              <div
                key={index}
                className="analyticsKpiCard"
              >


                <div className="analyticsKpiIcon">


                  {kpi.icon}


                </div>


                <div>


                  <span>
                    {kpi.title}
                  </span>


                  <h2>
                    {kpi.value}
                  </h2>


                </div>


              </div>
            );
          }
        )
      }


    </section>
  );
}
