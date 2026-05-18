// ======================================================
// components/RevenueCard.tsx
// ======================================================

"use client";

import "./revenue-card.css";

import {
  ArrowUpRight,
} from "lucide-react";

interface Props{

  title:string;

  value:string;

  growth:string;
}

export default function RevenueCard({
  title,
  value,
  growth,
}:Props){

  return(

    <div className="revenueCard">

      <span>

        {title}

      </span>

      <strong>

        {value}

      </strong>

      <div className="revenueGrowth">

        <ArrowUpRight />

        {growth}

      </div>

    </div>
  );
}
