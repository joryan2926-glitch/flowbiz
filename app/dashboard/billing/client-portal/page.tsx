"use client";

import "./client-portal.css";

import {
  useEffect,
  useState,
} from "react";

import {
  CreditCard,
  Receipt,
  Sparkles,
  Loader2,
  ExternalLink,
  ShieldCheck,
  CalendarDays,
  CircleDollarSign,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

interface Subscription{
  id:string;
  status:string;
  price_id:string;
  current_period_end:string;
}

interface Invoice{
  id:string;
  amount_paid:number;
  currency:string;
  hosted_invoice_url:string;
  invoice_pdf:string;
  status:string;
  created_at:string;
}

interface PaymentMethod{
  id:string;
  brand:string;
  last4:string;
  exp_month:number;
  exp_year:number;
}

export default function ClientPortalPage(){

  /*
  ======================================================
  STATES
  ======================================================
  */

  const [loading,setLoading] =
    useState(true);

  const [portalLoading,
    setPortalLoading] =
    useState(false);

  const [refreshing,
    setRefreshing] =
    useState(false);

  const [subscription,
    setSubscription] =
    useState<Subscription | null>(
      null
    );

  const [invoices,setInvoices] =
    useState<Invoice[]>([]);

  const [
    paymentMethods,
    setPaymentMethods,
  ] =
    useState<PaymentMethod[]>([]);

  /*
  ======================================================
  CUSTOMER ID
  ======================================================
  */

  const customerId =
    typeof window !== "undefined"

      ? localStorage.getItem(
          "stripe_customer_id"
        )

      : null;

  /*
  ======================================================
  LOAD BILLING
  ======================================================
  */

  async function loadBilling(){

    try{

      setLoading(true);

      /*
      ============================
      SUBSCRIPTIONS
      ============================
      */

      const subscriptionRes =
        await fetch(
          "/api/stripe/subscription-status",
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

      const subscriptionData =
        await subscriptionRes.json();

      if(
        subscriptionData.subscription
      ){

        setSubscription(
          subscriptionData.subscription
        );
      }

      /*
      ============================
      INVOICES
      ============================
      */

      const invoicesRes =
        await fetch(
          "/api/stripe/invoices",
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

      const invoicesData =
        await invoicesRes.json();

      setInvoices(
        invoicesData.invoices || []
      );

      /*
      ============================
      PAYMENT METHODS
      ============================
      */

      const paymentMethodsRes =
        await fetch(
          "/api/stripe/payment-methods",
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

      const paymentMethodsData =
        await paymentMethodsRes.json();

      setPaymentMethods(
        paymentMethodsData.paymentMethods || []
      );

      setLoading(false);

    }catch(error){

      console.log(error);

      setLoading(false);
    }
  }

  /*
  ======================================================
  INIT
  ======================================================
  */

  useEffect(()=>{

    if(customerId){

      loadBilling();
    }

  },[]);

  /*
  ======================================================
  REFRESH
  ======================================================
  */

  async function refreshBilling(){

    setRefreshing(true);

    await loadBilling();

    setRefreshing(false);
  }

  /*
  ======================================================
  OPEN STRIPE PORTAL
  ======================================================
  */

  async function openPortal(){

    try{

      if(!customerId){

        alert(
          "Aucun client Stripe trouvé"
        );

        return;
      }

      setPortalLoading(true);

      const response =
        await fetch(
          "/api/stripe/create-portal-session",
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

      if(data.url){

        window.location.href =
          data.url;
      }

      setPortalLoading(false);

    }catch(error){

      console.log(error);

      setPortalLoading(false);
    }
  }

  /*
  ======================================================
  LOADING
  ======================================================
  */

  if(loading){

    return(

      <div className="portalLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ======================================================
  PAGE
  ======================================================
  */

  return(

    <div className="clientPortalPage">

      {/* GLOW */}

      <div className="portalGlowOne" />
      <div className="portalGlowTwo" />

      {/* TOPBAR */}

      <header className="portalTopbar">

        <div>

          <span className="portalBadge">

            <Sparkles />

            FLOWBIZ BILLING

          </span>

          <h1>

            Client Portal Premium

          </h1>

          <p>

            Gestion des abonnements,
            factures,
            paiements
            et cartes bancaires.

          </p>

        </div>

        <div className="portalActions">

          <button
            className="refreshBtn"
            onClick={refreshBilling}
          >

            {
              refreshing

                ? <Loader2 className="spin" />

                : <RefreshCw />
            }

          </button>

          <button
            className="portalBtn"
            onClick={openPortal}
          >

            {
              portalLoading ? (

                <Loader2 className="spin" />

              ) : (

                <>
                  <ExternalLink />

                  Ouvrir portail Stripe
                </>
              )
            }

          </button>

        </div>

      </header>

      {/* HERO */}

      <section className="portalHero">

        <div className="heroLeft">

          <ShieldCheck />

          <div>

            <h3>

              Billing sécurisé Stripe

            </h3>

            <p>

              Paiements sécurisés,
              cartes bancaires,
              facturation SaaS
              et abonnements live.

            </p>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="portalStats">

        <div className="portalStatCard">

          <CreditCard />

          <div>

            <strong>

              {
                paymentMethods.length
              }

            </strong>

            <span>

              Cartes bancaires

            </span>

          </div>

        </div>

        <div className="portalStatCard">

          <Receipt />

          <div>

            <strong>

              {invoices.length}

            </strong>

            <span>

              Factures

            </span>

          </div>

        </div>

        <div className="portalStatCard">

          <Wallet />

          <div>

            <strong>

              {
                subscription
                  ?.status || "Aucun"
              }

            </strong>

            <span>

              Statut abonnement

            </span>

          </div>

        </div>

      </section>

      {/* SUBSCRIPTION */}

      <section className="portalSection">

        <div className="sectionTop">

          <h2>

            Abonnement actif

          </h2>

        </div>

        {
          subscription ? (

            <div className="subscriptionCard">

              <div className="subscriptionTop">

                <CheckCircle2 />

                <div>

                  <strong>

                    Actif

                  </strong>

                  <span>

                    {
                      subscription.status
                    }

                  </span>

                </div>

              </div>

              <div className="subscriptionInfos">

                <div>

                  <CalendarDays />

                  Renouvellement :

                  {
                    new Date(
                      subscription.current_period_end
                    ).toLocaleDateString()
                  }

                </div>

                <div>

                  <CircleDollarSign />

                  Price :

                  {
                    subscription.price_id
                  }

                </div>

              </div>

            </div>

          ) : (

            <div className="emptyState">

              <AlertTriangle />

              Aucun abonnement trouvé

            </div>
          )
        }

      </section>

      {/* PAYMENT METHODS */}

      <section className="portalSection">

        <div className="sectionTop">

          <h2>

            Cartes bancaires

          </h2>

        </div>

        <div className="paymentGrid">

          {
            paymentMethods.map(
              (card)=>{

                return(

                  <div
                    key={card.id}
                    className="paymentCard"
                  >

                    <div className="paymentTop">

                      <CreditCard />

                      <strong>

                        {
                          card.brand
                        }

                      </strong>

                    </div>

                    <div className="paymentInfos">

                      **** **** ****
                      {" "}
                      {card.last4}

                    </div>

                    <span>

                      Exp :

                      {" "}

                      {
                        card.exp_month
                      }

                      /

                      {
                        card.exp_year
                      }

                    </span>

                  </div>
                );
              }
            )
          }

        </div>

      </section>

      {/* INVOICES */}

      <section className="portalSection">

        <div className="sectionTop">

          <h2>

            Factures Stripe

          </h2>

        </div>

        <div className="invoiceList">

          {
            invoices.map(
              (invoice)=>{

                return(

                  <div
                    key={invoice.id}
                    className="invoiceRow"
                  >

                    <div>

                      <strong>

                        {
                          (
                            invoice.amount_paid || 0
                          ).toLocaleString()
                        }

                        €

                      </strong>

                      <span>

                        {
                          new Date(
                            invoice.created_at
                          ).toLocaleDateString()
                        }

                      </span>

                    </div>

                    <div className="invoiceRight">

                      <span
                        className={
                          invoice.status ===
                          "paid"

                            ? "paid"

                            : "unpaid"
                        }
                      >

                        {
                          invoice.status
                        }

                      </span>

                      {
                        invoice.invoice_pdf && (

                          <a
                            href={
                              invoice.invoice_pdf
                            }
                            target="_blank"
                          >

                            <ArrowUpRight />

                          </a>
                        )
                      }

                    </div>

                  </div>
                );
              }
            )
          }

        </div>

      </section>

    </div>
  );
}
