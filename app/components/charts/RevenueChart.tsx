"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    month: "Jan",
    revenue: 12000,
  },
  {
    month: "Fév",
    revenue: 18000,
  },
  {
    month: "Mar",
    revenue: 22000,
  },
  {
    month: "Avr",
    revenue: 26000,
  },
  {
    month: "Mai",
    revenue: 32000,
  },
  {
    month: "Juin",
    revenue: 48500,
  },
];

export default function RevenueChart() {
  return (

    <div className="revenueChartCard">

      <div className="chartHeader">

        <div>

          <span className="chartMiniTitle">
            ANALYTICS FLOWBIZ
          </span>

          <h2>
            Revenus & Croissance
          </h2>

        </div>

        <div className="chartValue">
          +24%
        </div>

      </div>

      <div className="chartContainer">

        <ResponsiveContainer width="100%" height={320}>

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="flowbizGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#00ff9c"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#00ff9c"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <XAxis
              dataKey="month"
              tick={{
                fill: "rgba(255,255,255,0.6)",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#111217",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                color: "white",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#00ff9c"
              strokeWidth={4}
              fill="url(#flowbizGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}
