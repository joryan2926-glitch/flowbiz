// ======================================================
// components/BillingChart.tsx
// REAL ANALYTICS CHART
// ======================================================

"use client";

import "./billing-chart.css";

interface Props{

  values:number[];
}

export default function BillingChart({
  values,
}:Props){

  const max =
    Math.max(...values);

  return(

    <div className="billingChart">

      {
        values.map(
          (
            value,
            index
          )=>{

            const height =
              (
                value / max
              ) * 100;

            return(

              <div
                key={index}
                className="chartColumn"
              >

                <div
                  className="chartBar"
                  style={{
                    height:
                      `${height}%`,
                  }}
                />

                <span>

                  M{index + 1}

                </span>

              </div>
            );
          }
        )
      }

    </div>
  );
}
