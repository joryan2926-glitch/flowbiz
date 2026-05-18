// ======================================================
// app/dashboard/billing/failed-payments/page.tsx
// FLOWBIZ FAILED PAYMENTS
// FINAL PRODUCTION VERSION
// ======================================================

"use client";

import "./failed-payments.css";

import {
  useEffect,
  useState,
} from "react";

import {
  AlertTriangle,
  CreditCard,
  Loader2,
  Sparkles,
  RefreshCcw,
  Activity,
  TrendingDown,
} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface FailedPayment{

  id:string;

  stripe_invoice_id:string;

  customer_id:string;

  amount:number;

  status:string;

  created_at:string;
}

/* ======================================================
PAGE
====================================================== */

export default function FailedPaymentsPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    failedPayments,
    setFailedPayments,
  ] =
    useState<FailedPayment[]>([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  /*
  ====================================================
  LOAD FAILED PAYMENTS
  ====================================================
  */

  async function loadFailedPayments(){

    try{

      const response =
        await fetch(

          "/api/stripe/get-failed-payments",

          {
            cache:"no-store",
          }
        );

      const data =
        await response.json();

      setFailedPayments(
        data.failedPayments || []
      );

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  INIT
  ====================================================
  */

  useEffect(()=>{

    loadFailedPayments();

  },[]);

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="failedLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  TOTAL
  ====================================================
  */

  const totalLost =

    failedPayments.reduce(

      (
        acc,
        item
      )=>

        acc + (
          item.amount || 0
        ),

      0
    );

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="failedPage">

      <div className="failedGlowOne" />
      <div className="failedGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="failedTopbar">

        <div>

          <span className="failedBadge">

            <Sparkles />

            FLOWBIZ BILLING

          </span>

          <h1>

            Failed Payments

          </h1>

          <p>

            Détection des paiements échoués,
            churn potentiel,
            cartes expirées
            et risque SaaS.

          </p>

        </div>

        <button
          className="refreshBtn"
          onClick={loadFailedPayments}
        >

          <RefreshCcw />

          Actualiser

        </button>

      </header>

      {/* ==================================================
      STATS
      ================================================== */}

      <section className="failedStats">

        <div className="failedStatCard">

          <div className="failedStatIcon">

            <AlertTriangle />

          </div>

          <strong>

            {
              failedPayments.length
            }

          </strong>

          <span>

            Paiements échoués

          </span>

        </div>

        <div className="failedStatCard">

          <div className="failedStatIcon revenue">

            <TrendingDown />

          </div>

          <strong>

            {
              (
                totalLost / 100
              ).toFixed(2)
            }€

          </strong>

          <span>

            Revenus à risque

          </span>

        </div>

        <div className="failedStatCard">

          <div className="failedStatIcon activity">

            <Activity />

          </div>

          <strong>

            High

          </strong>

          <span>

            Churn Risk

          </span>

        </div>

      </section>

      {/* ==================================================
      LIST
      ================================================== */}

      <section className="failedList">

        {
          failedPayments.map(

            payment=>(

              <div
                key={payment.id}
                className="failedCard"
              >

                {/* LEFT */}

                <div className="failedLeft">

                  <div className="failedIcon">

                    <CreditCard />

                  </div>

                  <div className="failedContent">

                    <strong>

                      {
                        (
                          payment.amount
                          / 100
                        ).toFixed(2)
                      }€

                    </strong>

                    <p>

                      Invoice :
                      {" "}
                      {
                        payment
                          .stripe_invoice_id
                      }

                    </p>

                    <span>

                      {
                        new Date(

                          payment.created_at

                        ).toLocaleString()
                      }

                    </span>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="failedRight">

                  <span className="failedStatus">

                    <AlertTriangle />

                    Échec paiement

                  </span>

                </div>

              </div>
            )
          )
        }

      </section>

    </div>
  );
}
