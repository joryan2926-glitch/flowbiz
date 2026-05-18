// ======================================================
// components/finance/CashflowChart.tsx
// FLOWBIZ CASHFLOW CHART
// ======================================================


"use client";


import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";


interface Props{


  data:any[];
}


export default function CashflowChart({
  data,
}:Props){


  return(


    <div className="financeChartCard">


      <div className="financeChartTop">


        <h3>
          Évolution Cashflow
        </h3>


      </div>


      <ResponsiveContainer
        width="100%"
        height={320}
      >


        <AreaChart
          data={data}
        >


          <defs>


            <linearGradient
              id="cashflowGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >


              <stop
                offset="5%"
                stopColor="#00ff9d"
                stopOpacity={0.8}
              />


              <stop
                offset="95%"
                stopColor="#00ff9d"
                stopOpacity={0}
              />


            </linearGradient>


          </defs>


          <CartesianGrid
            strokeDasharray="3 3"
          />


          <XAxis
            dataKey="month"
          />


          <YAxis />


          <Tooltip />


          <Area
            type="monotone"
            dataKey="cashflow"
            stroke="#00ff9d"
            fillOpacity={1}
            fill="url(#cashflowGradient)"
          />


        </AreaChart>


      </ResponsiveContainer>


    </div>
  );
}
