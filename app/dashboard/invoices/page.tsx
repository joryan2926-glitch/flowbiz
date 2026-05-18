// ======================================================
// app/dashboard/invoices/page.tsx
// FLOWBIZ STRIPE INVOICES
// REAL LIVE BILLING
// ======================================================

"use client";

import "./invoices.css";

import {
  useEffect,
  useState,
} from "react";

import {
  Receipt,
  Sparkles,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Invoice{

  id:string;

  amount_paid:number;

  currency:string;

  status:string;

  invoice_pdf:string | null;

  created:number;
}

/* ======================================================
PAGE
====================================================== */

export default function InvoicesPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    invoices,
    setInvoices,
  ] = useState<Invoice[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /*
  ====================================================
  LOAD INVOICES
  ====================================================
  */

  async function loadInvoices(){

    try{

      setLoading(true);

      const response =
        await fetch(
          "/api/stripe/invoices"
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

  /*
  ====================================================
  INIT
  ====================================================
  */

  useEffect(()=>{

    loadInvoices();

  },[]);

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="invoicesLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="invoicesPage">

      <div className="invoicesGlowOne" />
      <div className="invoicesGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="invoicesTopbar">

        <span className="invoicesBadge">

          <Sparkles />

          FLOWBIZ BILLING

        </span>

        <h1>

          Factures Stripe

        </h1>

        <p>

          Gérez vos factures,
          exports PDF,
          paiements
          et historiques Stripe.

        </p>

      </header>

      {/* ==================================================
      LIST
      ================================================== */}

      <section className="invoicesList">

        {
          invoices.map(
            (
              invoice
            )=>(

              <div
                key={invoice.id}
                className="invoiceCard"
              >

                {/* LEFT */}

                <div className="invoiceLeft">

                  <div className="invoiceIcon">

                    <Receipt />

                  </div>

                  <div>

                    <strong>

                      {
                        invoice.id
                      }

                    </strong>

                    <span>

                      {
                        new Date(

                          invoice.created
                          * 1000

                        ).toLocaleDateString()
                      }

                    </span>

                  </div>

                </div>

                {/* CENTER */}

                <div className="invoiceCenter">

                  <strong>

                    {
                      (
                        invoice.amount_paid
                        / 100
                      ).toFixed(2)
                    }€

                  </strong>

                </div>

                {/* STATUS */}

                <div className="invoiceStatusWrapper">

                  {
                    invoice.status ===
                    "paid"

                      ? (

                        <div className="invoiceStatus paid">

                          <CheckCircle2 />

                          Payée

                        </div>

                      )

                      : (

                        <div className="invoiceStatus failed">

                          <AlertTriangle />

                          Échec

                        </div>
                      )
                  }

                </div>

                {/* ACTIONS */}

                <div className="invoiceActions">

                  {
                    invoice.invoice_pdf && (

                      <a

                        href={
                          invoice.invoice_pdf
                        }

                        target="_blank"

                        className="invoiceBtn"
                      >

                        <Download />

                        PDF

                      </a>
                    )
                  }

                  <a

                    href={
                      invoice.invoice_pdf || "#"
                    }

                    target="_blank"

                    className="invoiceBtn secondary"
                  >

                    <ExternalLink />

                    Ouvrir

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
