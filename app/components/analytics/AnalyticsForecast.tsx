// ======================================================
// components/analytics/AnalyticsForecast.tsx
// FLOWBIZ ANALYTICS FORECAST
// ======================================================


"use client";


import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react";


interface Props{


  revenue:number;


  expenses:number;


  growthRate:number;


  churnRate:number;
}


export default function AnalyticsForecast({
  revenue,
  expenses,
  growthRate,
  churnRate,
}:Props){


  const estimatedRevenue =
    revenue * 1.12;


  const estimatedProfit =
    estimatedRevenue - expenses;


  const riskLevel =
    churnRate > 20
    ? "Élevé"
    : churnRate > 10
    ? "Modéré"
    : "Faible";


  return(


    <section className="forecastGrid">


      <div className="forecastCard">


        <div className="forecastTop">


          <Brain />


          <h3>
            Prévisions IA
          </h3>


        </div>


        <div className="forecastContent">


          <div className="forecastRow">


            <span>
              Revenus estimés
            </span>


            <strong>


              {
                estimatedRevenue.toFixed(2)
              }€


            </strong>


          </div>


          <div className="forecastRow">


            <span>
              Profit prévisionnel
            </span>


            <strong>


              {
                estimatedProfit.toFixed(2)
              }€


            </strong>


          </div>


          <div className="forecastRow">


            <span>
              Croissance prévue
            </span>


            <strong>


              {
                growthRate.toFixed(2)
              }%


            </strong>


          </div>


        </div>


      </div>


      <div className="forecastCard">


        <div className="forecastTop">


          <AlertTriangle />


          <h3>
            Risques détectés
          </h3>


        </div>


        <div className="forecastContent">


          <div className="forecastRisk">


            <span>
              Niveau de churn
            </span>


            <strong>


              {
                churnRate.toFixed(2)
              }%


            </strong>


          </div>


          <div className="forecastRisk">


            <span>
              Niveau de risque
            </span>


            <strong>
              {riskLevel}
            </strong>


          </div>


        </div>


      </div>


      <div className="forecastCard">


        <div className="forecastTop">


          <Sparkles />


          <h3>
            Recommandations
          </h3>


        </div>


        <div className="forecastContent">


          <ul className="forecastList">


            <li>
              Optimiser les abonnements
            </li>


            <li>
              Réduire les dépenses fixes
            </li>


            <li>
              Améliorer la rétention client
            </li>


            <li>
              Développer le MRR
            </li>


          </ul>


        </div>


      </div>


    </section>
  );
}
