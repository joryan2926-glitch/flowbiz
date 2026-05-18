// ======================================================
// components/finance/FinanceKPIs.tsx
// FLOWBIZ FINANCE KPIS
// FINAL VERSION
// ======================================================


"use client";


import {
  DollarSign,
  Wallet,
  TrendingUp,
  Receipt,
  CreditCard,
} from "lucide-react";


interface Props{


  revenue:number;


  expenses:number;


  cashflow:number;


  mrr:number;


  arr:number;
}


export default function FinanceKPIs({
  revenue,
  expenses,
  cashflow,
  mrr,
  arr,
}:Props){


  const cards = [


    {
      title:"Revenus",
      value:revenue,
      icon:<DollarSign />,
    },


    {
      title:"Dépenses",
      value:expenses,
      icon:<Receipt />,
    },


    {
      title:"Cashflow",
      value:cashflow,
      icon:<Wallet />,
    },


    {
      title:"MRR",
      value:mrr,
      icon:<CreditCard />,
    },


    {
      title:"ARR",
      value:arr,
      icon:<TrendingUp />,
    },
  ];


  return(


    <section className="financeKpisGrid">


      {
        cards.map(
          (card,index)=>{


            return(


              <div
                key={index}
                className="financeKpiCard"
              >


                <div className="financeKpiIcon">


                  {card.icon}


                </div>


                <div>


                  <span>
                    {card.title}
                  </span>


                  <h2>


                    {
                      Number(
                        card.value
                      ).toFixed(2)
                    }€


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
