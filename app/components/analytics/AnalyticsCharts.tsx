// ======================================================
// components/analytics/AnalyticsCharts.tsx
// FLOWBIZ ANALYTICS CHARTS
// ======================================================


"use client";


import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";


interface Props{


  monthlyRevenue:any[];


  monthlyExpenses:any[];


  monthlyCashflow:any[];
}


export default function AnalyticsCharts({
  monthlyRevenue,
  monthlyExpenses,
  monthlyCashflow,
}:Props){


  return(


    <section className="analyticsChartsGrid">


      {/* ======================================================
      REVENUE
      ====================================================== */}


      <div className="analyticsChartCard">


        <div className="analyticsChartTop">


          <h3>
            Revenus
          </h3>


        </div>


        <ResponsiveContainer
          width="100%"
          height={320}
        >


          <AreaChart
            data={monthlyRevenue}
          >


            <defs>


              <linearGradient
                id="analyticsRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >


                <stop
                  offset="5%"
                  stopColor="#7c5cff"
                  stopOpacity={0.8}
                />


                <stop
                  offset="95%"
                  stopColor="#7c5cff"
                  stopOpacity={0}
                />


              </linearGradient>


            </defs>


            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis dataKey="month" />


            <YAxis />


            <Tooltip />


            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#7c5cff"
              fillOpacity={1}
              fill="url(#analyticsRevenue)"
            />


          </AreaChart>


        </ResponsiveContainer>


      </div>


      {/* ======================================================
      EXPENSES
      ====================================================== */}


      <div className="analyticsChartCard">


        <div className="analyticsChartTop">


          <h3>
            Dépenses
          </h3>


        </div>


        <ResponsiveContainer
          width="100%"
          height={320}
        >


          <AreaChart
            data={monthlyExpenses}
          >


            <defs>


              <linearGradient
                id="analyticsExpenses"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >


                <stop
                  offset="5%"
                  stopColor="#ff4d6d"
                  stopOpacity={0.8}
                />


                <stop
                  offset="95%"
                  stopColor="#ff4d6d"
                  stopOpacity={0}
                />


              </linearGradient>


            </defs>


            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis dataKey="month" />


            <YAxis />


            <Tooltip />


            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ff4d6d"
              fillOpacity={1}
              fill="url(#analyticsExpenses)"
            />


          </AreaChart>


        </ResponsiveContainer>


      </div>


      {/* ======================================================
      CASHFLOW
      ====================================================== */}


      <div className="analyticsChartCard full">


        <div className="analyticsChartTop">


          <h3>
            Cashflow
          </h3>


        </div>


        <ResponsiveContainer
          width="100%"
          height={320}
        >


          <LineChart
            data={monthlyCashflow}
          >


            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis dataKey="month" />


            <YAxis />


            <Tooltip />


            <Line
              type="monotone"
              dataKey="cashflow"
              stroke="#00ff9d"
              strokeWidth={3}
            />


          </LineChart>


        </ResponsiveContainer>


      </div>


    </section>
  );
}
