"use client";

import "./invoices.css";

import {
  useEffect,
  useState,
} from "react";

import {
  createClient,
} from "@supabase/supabase-js";

import {
  FileText,
  Loader2,
  Download,
  Sparkles,
} from "lucide-react";

/* ======================================================
SUPABASE
====================================================== */

const supabase =
  createClient(

    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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

export default function InvoicesPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

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
  LOAD INVOICES
  ====================================================
  */

  useEffect(()=>{

    async function loadInvoices(){

      try{

        /*
        ================================================
        GET USER
        ================================================
        */

        const {

          data:{
            user,
          },

        } =

          await supabase
            .auth
            .getUser();

        if(!user){

          setLoading(false);

          return;
        }

        /*
        ================================================
        GET PROFILE
        ================================================
        */

        const {

          data:profile,

        } =

          await supabase

            .from(
              "profiles"
            )

            .select("*")

            .eq(
              "id",
              user.id
            )

            .single();

        /*
        ================================================
        GET INVOICES
        ================================================
        */

        const response =
          await fetch(

            `/api/stripe/get-invoices?customerId=${profile.stripe_customer_id}`
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
  LOADER
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

          Factures

        </h1>

        <p>

          Historique des paiements,
          factures Stripe
          et téléchargements PDF.

        </p>

      </header>

      {/* ==================================================
      LIST
      ================================================== */}

      <section className="invoicesList">

        {
          invoices.map(

            invoice=>(

              <div
                key={invoice.id}
                className="invoiceCard"
              >

                {/* ICON */}

                <div className="invoiceIcon">

                  <FileText />

                </div>

                {/* CONTENT */}

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

                  <span>

                    {invoice.status}

                  </span>

                  <p>

                    {
                      new Date(

                        invoice.created
                        * 1000

                      ).toLocaleDateString()
                    }

                  </p>

                </div>

                {/* ACTION */}

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
            )
          )
        }

      </section>

    </div>
  );
}
