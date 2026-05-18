"use client";

import "./history.css";

import {
  useEffect,
  useState,
} from "react";

import {
  FileText,
  Download,
  CreditCard,
  Loader2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Invoice{

  id:string;

  amount_paid:number;

  currency:string;

  status:string;

  hosted_invoice_url:string;

  invoice_pdf:string;

  created:number;
}

/* ======================================================
PAGE
====================================================== */

export default function BillingHistoryPage(){

  const [
    invoices,
    setInvoices,
  ] =
    useState<Invoice[]>([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    async function loadInvoices(){

      try{

        const response =
          await fetch(

            "/api/stripe/get-invoices",

            {
              method:"POST",

              headers:{
                "Content-Type":
                  "application/json",
              },

              body:JSON.stringify({

                customerId:
                  "STRIPE_CUSTOMER_ID",
              }),
            }
          );

        const data =
          await response.json();

        setInvoices(
          data.invoices || []
        );

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);
      }
    }

    loadInvoices();

  },[]);

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="historyLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  STATUS
  ====================================================
  */

  function renderStatus(
    status:string
  ){

    if(status === "paid"){

      return(

        <span className="invoiceStatus paid">

          <CheckCircle2 />

          Payée

        </span>
      );
    }

    return(

      <span className="invoiceStatus failed">

        <AlertTriangle />

        Échec

      </span>
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="historyPage">

      <div className="historyGlowOne" />
      <div className="historyGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="historyTopbar">

        <span className="historyBadge">

          FLOWBIZ BILLING

        </span>

        <h1>

          Historique Billing

        </h1>

        <p>

          Factures Stripe,
          reçus,
          paiements,
          PDF
          et historique live.

        </p>

      </header>

      {/* ==================================================
      LIST
      ================================================== */}

      <section className="invoiceList">

        {
          invoices.map(

            invoice=>(

              <div
                key={invoice.id}
                className="invoiceCard"
              >

                {/* LEFT */}

                <div className="invoiceLeft">

                  <div className="invoiceIcon">

                    <CreditCard />

                  </div>

                  <div className="invoiceContent">

                    <strong>

                      {
                        (
                          invoice.amount_paid
                          / 100
                        ).toFixed(2)
                      }

                      €

                    </strong>

                    <p>

                      {
                        new Date(

                          invoice.created
                          * 1000

                        ).toLocaleDateString()
                      }

                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="invoiceRight">

                  {
                    renderStatus(
                      invoice.status
                    )
                  }

                  <a

                    href={
                      invoice.invoice_pdf
                    }

                    target="_blank"

                    className="invoiceButton"
                  >

                    <Download />

                    PDF

                  </a>

                </div>

              </div>
            )
          )
        }

      </section>

    </div>
  );
}
