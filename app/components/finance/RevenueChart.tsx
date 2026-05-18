// ======================================================
// components/finance/RevenueChart.tsx
// FLOWBIZ REVENUE CHART
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


export default function RevenueChart({
  data,
}:Props){


  return(


    <div className="financeChartCard">


      <div className="financeChartTop">


        <h3>
          Revenus mensuels
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
              id="revenueGradient"
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


          <XAxis
            dataKey="month"
          />


          <YAxis />


          <Tooltip />


          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#7c5cff"
            fillOpacity={1}
            fill="url(#revenueGradient)"
          />


        </AreaChart>


      </ResponsiveContainer>


    </div>
  );
}
