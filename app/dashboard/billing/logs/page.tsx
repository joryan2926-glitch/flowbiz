// ======================================================
// app/dashboard/billing/logs/page.tsx
// ======================================================

"use client";

import "./logs.css";

import {
  useEffect,
  useState,
} from "react";

import {
  Activity,
  Sparkles,
  Loader2,
  CheckCircle2,
  CreditCard,
  Receipt,
  RefreshCcw,
  AlertTriangle,
} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface BillingLog{

  id:string;

  action:string;

  amount:number;

  status:string;

  created_at:string;
}

/* ======================================================
PAGE
====================================================== */

export default function BillingLogsPage(){

  const [loading,setLoading] =
    useState(true);

  const [logs,setLogs] =
    useState<BillingLog[]>([]);

  const customerId =
    typeof window !== "undefined"

      ? localStorage.getItem(
          "stripe_customer_id"
        )

      : null;

  /*
  ====================================================
  LOAD
  ====================================================
  */

  async function loadLogs(){

    try{

      setLoading(true);

      const response =
        await fetch(
          "/api/stripe/get-billing-logs",
          {
            method:"POST",

            headers:{
              "Content-Type":
                "application/json",
            },

            body:JSON.stringify({
              customerId,
            }),
          }
        );

      const data =
        await response.json();

      setLogs(
        data.logs || []
      );

      setLoading(false);

    }catch(error){

      console.log(error);

      setLoading(false);
    }
  }

  useEffect(()=>{

    if(customerId){

      loadLogs();
    }

  },[]);

  /*
  ====================================================
  ICON
  ====================================================
  */

  function getIcon(
    action:string
  ){

    if(
      action.includes(
        "invoice"
      )
    ){

      return <Receipt />;
    }

    if(
      action.includes(
        "payment"
      )
    ){

      return <CreditCard />;
    }

    if(
      action.includes(
        "refund"
      )
    ){

      return <RefreshCcw />;
    }

    return <CheckCircle2 />;
  }

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="logsLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  PAGE
  ====================================================
  */

  return(

    <div className="logsPage">

      <div className="logsGlowOne" />
      <div className="logsGlowTwo" />

      {/* TOPBAR */}

      <header className="logsTopbar">

        <div>

          <span className="logsBadge">

            <Sparkles />

            FLOWBIZ BILLING

          </span>

          <h1>

            Historique Billing

          </h1>

          <p>

            Historique complet
            des paiements,
            remboursements,
            abonnements
            et événements Stripe.

          </p>

        </div>

      </header>

      {/* LIST */}

      <section className="logsList">

        {
          logs.map((log)=>(

            <div
              key={log.id}
              className="logCard"
            >

              <div className="logIcon">

                {
                  getIcon(
                    log.action
                  )
                }

              </div>

              <div className="logContent">

                <strong>

                  {log.action}

                </strong>

                <span>

                  {
                    new Date(
                      log.created_at
                    ).toLocaleString()
                  }

                </span>

              </div>

              <div className="logRight">

                {
                  log.amount && (

                    <strong>

                      {
                        Number(
                          log.amount
                        ).toLocaleString()
                      }

                      €

                    </strong>
                  )
                }

                <div
                  className={`logStatus ${log.status}`}
                >

                  {log.status}

                </div>

              </div>

            </div>
          ))
        }

      </section>

    </div>
  );
}
