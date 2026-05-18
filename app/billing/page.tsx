"use client";

import "./billing.css";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeEuro,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileText,
  Filter,
  Loader2,
  Plus,
  Receipt,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
  AlertTriangle,
  Repeat,
  Banknote,
  BarChart3,
  CreditCardIcon,
  Percent,
  Building2,
  Layers3,
} from "lucide-react";

import { supabase } from "@/app/lib/supabase";

/* =========================================================
INTERFACES
========================================================= */

interface Invoice {
  id:string;
  client_id:string;
  number:string;
  total:number;
  tax:number;
  status:string;
  created_at:string;
  due_date:string;
  stripe_payment_intent_id:string;
  payment_method:string;
  pdf_url:string;
}

interface Payment {
  id:string;
  invoice_id:string;
  amount:number;
  status:string;
  provider:string;
  created_at:string;
}

interface Client {
  id:string;
  name:string;
  email:string;
  status:string;
  stripe_customer_id:string;
}

interface Subscription {
  id:string;
  client_id:string;
  stripe_subscription_id:string;
  plan:string;
  interval:string;
  amount:number;
  status:string;
  created_at:string;
}

interface NotificationItem {
  id:string;
  title:string;
  type:string;
  created_at:string;
}

/* =========================================================
PAGE
========================================================= */

export default function BillingPage(){

  /* =========================================================
  STATES
  ========================================================= */

  const [loading,setLoading] =
    useState(true);

  const [search,setSearch] =
    useState("");

  const [statusFilter,setStatusFilter] =
    useState("all");

  const [refreshing,setRefreshing] =
    useState(false);

  const [clients,setClients] =
    useState<Client[]>([]);

  const [payments,setPayments] =
    useState<Payment[]>([]);

  const [invoices,setInvoices] =
    useState<Invoice[]>([]);

  const [subscriptions,setSubscriptions] =
    useState<Subscription[]>([]);

  const [notifications,setNotifications] =
    useState<NotificationItem[]>([]);

  /* =========================================================
  LOAD DATA
  ========================================================= */

  async function loadData(){

    try{

      setLoading(true);

      const [

        invoicesRes,
        paymentsRes,
        clientsRes,
        subscriptionsRes,
        notificationsRes,

      ] = await Promise.all([

        supabase
          .from("invoices")
          .select("*")
          .order(
            "created_at",
            {
              ascending:false,
            }
          ),

        supabase
          .from("payments")
          .select("*")
          .order(
            "created_at",
            {
              ascending:false,
            }
          ),

        supabase
          .from("clients")
          .select("*"),

        supabase
          .from("subscriptions")
          .select("*"),

        supabase
          .from("billing_notifications")
          .select("*")
          .order(
            "created_at",
            {
              ascending:false,
            }
          )
          .limit(5),
      ]);

      setInvoices(
        invoicesRes.data || []
      );

      setPayments(
        paymentsRes.data || []
      );

      setClients(
        clientsRes.data || []
      );

      setSubscriptions(
        subscriptionsRes.data || []
      );

      setNotifications(
        notificationsRes.data || []
      );

      setLoading(false);

    }catch(error){

      console.log(error);

      setLoading(false);
    }
  }

  /* =========================================================
  INIT
  ========================================================= */

  useEffect(()=>{

    loadData();

  },[]);

  /* =========================================================
  REALTIME
  ========================================================= */

  useEffect(()=>{

    const channel =

      supabase

      .channel("billing-live")

      .on(
        "postgres_changes",
        {
          event:"*",
          schema:"public",
          table:"payments",
        },

        async ()=>{

          await loadData();
        }
      )

      .on(
        "postgres_changes",
        {
          event:"*",
          schema:"public",
          table:"invoices",
        },

        async ()=>{

          await loadData();
        }
      )

      .on(
        "postgres_changes",
        {
          event:"*",
          schema:"public",
          table:"subscriptions",
        },

        async ()=>{

          await loadData();
        }
      )

      .subscribe();

    return ()=>{

      supabase.removeChannel(
        channel
      );
    };

  },[]);

  /* =========================================================
  STRIPE CHECKOUT
  ========================================================= */

  async function createCheckoutSession(
    invoiceId:string
  ){

    try{

      const response = await fetch(
        "/api/stripe/create-checkout-session",
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json",
          },

          body:JSON.stringify({
            invoiceId,
          }),
        }
      );

      const data =
        await response.json();

      if(data?.url){

        window.location.href =
          data.url;
      }

    }catch(error){

      console.log(error);
    }
  }

  /* =========================================================
  STRIPE CUSTOMER PORTAL
  ========================================================= */

  async function openBillingPortal(){

    try{

      const response = await fetch(
        "/api/stripe/customer-portal",
        {
          method:"POST",
        }
      );

      const data =
        await response.json();

      if(data?.url){

        window.location.href =
          data.url;
      }

    }catch(error){

      console.log(error);
    }
  }

  /* =========================================================
  EXPORT CSV
  ========================================================= */

  async function exportCSV(){

    const rows = invoices.map(
      (invoice)=>{

        return {

          number:
            invoice.number,

          client:
            getClientName(
              invoice.client_id
            ),

          total:
            invoice.total,

          status:
            invoice.status,

          created_at:
            invoice.created_at,
        };
      }
    );

    const csvContent =

      [
        Object.keys(
          rows[0] || {}
        ).join(","),

        ...rows.map(
          (row)=>

            Object.values(
              row
            ).join(",")
        ),
      ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type:"text/csv",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "flowbiz-billing.csv";

    link.click();
  }

  /* =========================================================
  REFRESH
  ========================================================= */

  async function refreshData(){

    setRefreshing(true);

    await loadData();

    setRefreshing(false);
  }

  /* =========================================================
  HELPERS
  ========================================================= */

  function getClientName(
    clientId:string
  ){

    return (

      clients.find(
        (client)=>

          client.id ===
          clientId
      )?.name ||

      "Client"
    );
  }

  function getStatusClass(
    status:string
  ){

    switch(status){

      case "Payée":
      case "paid":

        return "paid";

      case "En attente":
      case "pending":

        return "pending";

      case "Échoué":
      case "failed":

        return "failed";

      default:

        return "";
    }
  }

  /* =========================================================
  KPI
  ========================================================= */

  const totalRevenue =

    payments.reduce(
      (
        acc,
        payment
      )=>

        acc +
        Number(
          payment.amount || 0
        ),

      0
    );

  const totalVat =

    invoices.reduce(
      (
        acc,
        invoice
      )=>

        acc +
        Number(
          invoice.tax || 0
        ),

      0
    );

  const pendingInvoices =

    invoices.filter(
      (invoice)=>

        invoice.status ===
        "En attente"
    ).length;

  const failedPayments =

    payments.filter(
      (payment)=>

        payment.status ===
        "Échoué"
    ).length;

  const paidInvoices =

    invoices.filter(
      (invoice)=>

        invoice.status ===
        "Payée"
    ).length;

  const mrr =

    subscriptions.reduce(
      (
        acc,
        sub
      )=>

        acc +
        Number(sub.amount || 0),

      0
    );

  const arr = mrr * 12;

  /* =========================================================
  FILTERED INVOICES
  ========================================================= */

  const filteredInvoices =
    useMemo(()=>{

      return invoices.filter(
        (invoice)=>{

          const client =
            getClientName(
              invoice.client_id
            );

          const matchesSearch =

            client
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesFilter =

            statusFilter === "all"

              ? true

              : invoice.status ===
                statusFilter;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );

    },[
      invoices,
      search,
      statusFilter,
    ]);

  /* =========================================================
  LOADING
  ========================================================= */

  if(loading){

    return(

      <div className="billingLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /* =========================================================
  PAGE
  ========================================================= */

  return(

    <div className="billingPage">

      {/* GLOWS */}

      <div className="billingGlowOne" />
      <div className="billingGlowTwo" />

      {/* TOPBAR */}

      <header className="billingTopbar">

        <div>

          <span className="billingBadge">

            <Sparkles />

            FLOWBIZ BILLING CORE

          </span>

          <h1>

            Billing & Finance

          </h1>

          <p>

            Gestion Stripe,
            abonnements,
            facturation,
            revenus récurrents,
            analytics
            et portail client.

          </p>

        </div>

        <div className="billingActions">

          <button>

            <Bell />

          </button>

          <button
            onClick={exportCSV}
          >

            <Download />

            Export

          </button>

        </div>

      </header>

      {/* HERO */}

      <section className="billingHero">

        <div className="billingHeroLeft">

          <Wallet />

          <div>

            <h3>

              Infrastructure financière premium

            </h3>

            <p>

              Stripe Billing,
              portail client,
              abonnements,
              analytics
              et automatisations connectées.

            </p>

          </div>

        </div>

        <div className="heroActions">

          <button
            className="portalBtn"
            onClick={
              openBillingPortal
            }
          >

            Portail client

            <ChevronRight />

          </button>

          <Link
            href="/dashboard/factures"
          >

            <button
              className="invoiceBtn"
            >

              <Plus />

              Nouvelle facture

            </button>

          </Link>

        </div>

      </section>

      {/* KPI */}

      <section className="billingStats">

        <div className="billingStatCard revenue">

          <CircleDollarSign />

          <div>

            <h2>

              {totalRevenue.toLocaleString()}€

            </h2>

            <span>

              Revenus encaissés

            </span>

          </div>

        </div>

        <div className="billingStatCard">

          <TrendingUp />

          <div>

            <h2>

              {mrr.toLocaleString()}€

            </h2>

            <span>

              MRR

            </span>

          </div>

        </div>

        <div className="billingStatCard">

          <BarChart3 />

          <div>

            <h2>

              {arr.toLocaleString()}€

            </h2>

            <span>

              ARR

            </span>

          </div>

        </div>

        <div className="billingStatCard">

          <Percent />

          <div>

            <h2>

              {totalVat.toLocaleString()}€

            </h2>

            <span>

              TVA collectée

            </span>

          </div>

        </div>

      </section>

      {/* GRID */}

      <section className="billingGrid">

        {/* CASHFLOW */}

        <div className="billingWidget large">

          <div className="widgetTop">

            <div>

              <span>

                Cashflow

              </span>

              <h3>

                Flux financiers

              </h3>

            </div>

            <button>

              Analytics

            </button>

          </div>

          <div className="cashflowGrid">

            <div className="cashCard positive">

              <ArrowUpRight />

              <div>

                <strong>

                  +{totalRevenue.toLocaleString()}€

                </strong>

                <span>

                  Entrées

                </span>

              </div>

            </div>

            <div className="cashCard negative">

              <ArrowDownRight />

              <div>

                <strong>

                  {failedPayments}

                </strong>

                <span>

                  Paiements échoués

                </span>

              </div>

            </div>

            <div className="cashCard recurring">

              <Repeat />

              <div>

                <strong>

                  {subscriptions.length}

                </strong>

                <span>

                  Abonnements actifs

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* STRIPE */}

        <div className="billingWidget">

          <div className="widgetMiniTop">

            <CreditCardIcon />

            Stripe

          </div>

          <div className="miniList">

            <div>

              <CheckCircle2 />

              Paiements validés :
              {" "}
              {paidInvoices}

            </div>

            <div>

              <AlertTriangle />

              Échecs :
              {" "}
              {failedPayments}

            </div>

            <div>

              <ShieldCheck />

              Stripe connecté

            </div>

          </div>

        </div>

        {/* SUBSCRIPTIONS */}

        <div className="billingWidget">

          <div className="widgetMiniTop">

            <BadgeEuro />

            Abonnements

          </div>

          <div className="subscriptionList">

            {
              subscriptions.map(
                (sub)=>(

                  <div
                    key={sub.id}
                    className="subscriptionItem"
                  >

                    <div>

                      <strong>

                        {sub.plan}

                      </strong>

                      <span>

                        {
                          getClientName(
                            sub.client_id
                          )
                        }

                      </span>

                    </div>

                    <b>

                      {sub.amount}€

                    </b>

                  </div>
                )
              )
            }

          </div>

        </div>

        {/* AUTOMATIONS */}

        <div className="billingWidget">

          <div className="widgetMiniTop">

            <Sparkles />

            Automatisations

          </div>

          <div className="miniList">

            <div>

              Relances automatiques

            </div>

            <div>

              Emails de paiement

            </div>

            <div>

              Factures PDF

            </div>

          </div>

        </div>

        {/* CLIENT JOURNEY */}

        <div className="billingWidget">

          <div className="widgetMiniTop">

            <Users />

            Parcours client

          </div>

          <div className="journeyFlow">

            <span>

              Devis

            </span>

            <ChevronRight />

            <span>

              Facture

            </span>

            <ChevronRight />

            <span>

              Paiement

            </span>

            <ChevronRight />

            <span>

              Abonnement

            </span>

          </div>

        </div>

        {/* NOTIFICATIONS */}

        <div className="billingWidget">

          <div className="widgetMiniTop">

            <Bell />

            Notifications

          </div>

          <div className="notificationsList">

            {
              notifications.map(
                (item)=>(

                  <div
                    key={item.id}
                    className="notificationItem"
                  >

                    <span>

                      {item.title}

                    </span>

                  </div>
                )
              )
            }

          </div>

        </div>

      </section>

      {/* TOOLBAR */}

      <section className="billingToolbar">

        <div className="billingSearch">

          <Search />

          <input
            type="text"
            placeholder="Rechercher un client..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="toolbarActions">

          <select
            value={statusFilter}
            onChange={(e)=>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="all">

              Tous

            </option>

            <option value="Payée">

              Payées

            </option>

            <option value="En attente">

              En attente

            </option>

          </select>

          <button
            onClick={refreshData}
          >

            {
              refreshing ? (

                <Loader2 className="spin" />

              ) : (

                <>
                  <RefreshCw />
                  Actualiser
                </>
              )
            }

          </button>

        </div>

      </section>

      {/* TABLE */}

      <section className="billingTableSection">

        <div className="sectionTop">

          <h3>

            Transactions & factures

          </h3>

        </div>

        <div className="billingTable">

          {
            filteredInvoices.map(
              (invoice)=>(

                <div
                  key={invoice.id}
                  className="billingRow"
                >

                  <div className="billingLeft">

                    <div className="billingIcon">

                      <Receipt />

                    </div>

                    <div>

                      <h4>

                        {
                          getClientName(
                            invoice.client_id
                          )
                        }

                      </h4>

                      <span>

                        {
                          invoice.number
                        }

                      </span>

                    </div>

                  </div>

                  <div className="billingCenter">

                    <strong>

                      {invoice.total}€

                    </strong>

                    <span>

                      {
                        invoice.payment_method ||
                        "Carte bancaire"
                      }

                    </span>

                  </div>

                  <div className="billingRight">

                    <span
                      className={`statusBadge ${getStatusClass(invoice.status)}`}
                    >

                      {invoice.status}

                    </span>

                    <div className="rowActions">

                      <button>

                        <Eye />

                      </button>

                      <button>

                        <Send />

                      </button>

                      <button
                        onClick={()=>
                          createCheckoutSession(
                            invoice.id
                          )
                        }
                      >

                        <CreditCard />

                      </button>

                      {
                        invoice.pdf_url && (

                          <a
                            href={
                              invoice.pdf_url
                            }

                            target="_blank"
                          >

                            <FileText />

                          </a>
                        )
                      }

                    </div>

                  </div>

                </div>
              )
            )
          }

        </div>

      </section>

    </div>
  );
}
