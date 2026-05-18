"use client";


import "./dashboard-home.css";


import {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";


import Link from "next/link";


import {
  DollarSign,
  Wallet,
  Users,
  CreditCard,
  Receipt,
  TrendingUp,
  Bell,
  Activity,
  CircleAlert,
  Loader2,
  RefreshCw,
  FileText,
  Brain,
  CheckCircle2,
  Clock3,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  CalendarDays,
} from "lucide-react";


import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";


import { supabase }
from "@/app/lib/supabase";


/* ======================================================
INTERFACES
====================================================== */


interface Invoice{


  id:string;


  total:number;


  tax:number;


  payment_status:string;


  status:string;


  client_name:string;


  invoice_number:string;


  created_at:string;
}


interface Expense{


  id:string;


  amount:number;


  vat:number;


  category:string;


  title:string;


  created_at:string;
}


interface Subscription{


  id:string;


  status:string;


  plan:string;
}


interface Notification{


  id:string;


  title:string;


  message:string;


  type:string;


  created_at:string;
}


/* ======================================================
PAGE
====================================================== */


export default function DashboardPage(){


  /* ======================================================
  STATES
  ====================================================== */


  const [loading,setLoading] =
    useState(true);


  const [refreshing,setRefreshing] =
    useState(false);


  const [stats,setStats] =
    useState<any>(null);


  const [invoices,setInvoices] =
    useState<Invoice[]>([]);


  const [expenses,setExpenses] =
    useState<Expense[]>([]);


  const [subscriptions,
    setSubscriptions] =
    useState<Subscription[]>([]);


  const [notifications,
    setNotifications] =
    useState<Notification[]>([]);


  /* ======================================================
  LOAD DASHBOARD
  ====================================================== */


  const loadDashboard =
    useCallback(async ()=>{


      try{


        setRefreshing(true);


        /* =========================================
        CENTRAL API
        ========================================= */


        const response =
          await fetch(
            "/api/dashboard/stats",
            {
              cache:"no-store",
            }
          );


        const data =
          await response.json();


        if(data.success){


          setStats(data);
        }


        /* =========================================
        FACTURES
        ========================================= */


        const {
          data:invoiceData,
        } = await supabase


          .from("invoices")


          .select("*")


          .order(
            "created_at",
            {
              ascending:false,
            }
          )


          .limit(10);


        setInvoices(
          invoiceData || []
        );


        /* =========================================
        DEPENSES
        ========================================= */


        const {
          data:expenseData,
        } = await supabase


          .from("expenses")


          .select("*")


          .order(
            "created_at",
            {
              ascending:false,
            }
          )


          .limit(10);


        setExpenses(
          expenseData || []
        );


        /* =========================================
        ABONNEMENTS
        ========================================= */


        const {
          data:subscriptionData,
        } = await supabase


          .from("subscriptions")


          .select("*");


        setSubscriptions(
          subscriptionData || []
        );


        /* =========================================
        NOTIFICATIONS
        ========================================= */


        const {
          data:notificationData,
        } = await supabase


          .from("notifications")


          .select("*")


          .order(
            "created_at",
            {
              ascending:false,
            }
          )


          .limit(8);


        setNotifications(
          notificationData || []
        );


      }catch(error){


        console.log(
          "Dashboard error:",
          error
        );


      }finally{


        setLoading(false);


        setRefreshing(false);
      }


    },[]);


  /* ======================================================
  INIT
  ====================================================== */


  useEffect(()=>{


    loadDashboard();


  },[
    loadDashboard,
  ]);


  /* ======================================================
  REALTIME GLOBAL
  ====================================================== */


  useEffect(()=>{


    const channel =


      supabase


        .channel(
          "dashboard-live"
        )


        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"invoices",
          },


          ()=>{
            loadDashboard();
          }
        )


        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"expenses",
          },


          ()=>{
            loadDashboard();
          }
        )


        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"subscriptions",
          },


          ()=>{
            loadDashboard();
          }
        )


        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"notifications",
          },


          ()=>{
            loadDashboard();
          }
        )


        .subscribe();


    return ()=>{


      supabase.removeChannel(
        channel
      );
    };


  },[
    loadDashboard,
  ]);


  /* ======================================================
  KPI
  ====================================================== */


  const revenue =
    stats?.kpis?.revenue || 0;


  const paidRevenue =
    stats?.kpis?.paidRevenue || 0;


  const expensesTotal =
    stats?.kpis?.expensesTotal || 0;


  const cashflow =
    stats?.kpis?.cashflow || 0;


  const vatCollected =
    stats?.kpis?.vatCollected || 0;


  const vatDeductible =
    stats?.kpis?.vatDeductible || 0;


  const vatToPay =
    stats?.kpis?.vatToPay || 0;


  const clientsCount =
    stats?.kpis?.clientsCount || 0;


  const activeSubscriptions =
    stats?.kpis?.activeSubscriptions || 0;


  const failedPayments =
    stats?.kpis?.failedPayments || 0;


  const stripeInvoices =
    stats?.kpis?.stripeInvoices || 0;


  /* ======================================================
  CHARTS
  ====================================================== */


  const revenueChart =
    stats?.charts
      ?.monthlyRevenue || [];


  const expenseChart =
    useMemo(()=>{


      const grouped:
        Record<string,number> = {};


      expenses.forEach((expense)=>{


        grouped[
          expense.category
        ] =


          (
            grouped[
              expense.category
            ] || 0
          )


          +


          Number(
            expense.amount
          );
      });


      return Object.entries(
        grouped
      ).map(([name,value])=>({


        name,
        value,
      }));


    },[
      expenses,
    ]);


  /* ======================================================
  LOADING
  ====================================================== */


  if(loading){


    return(


      <div className="dashboardLoader">


        <Loader2 className="spin" />


      </div>
    );
  }


  /* ======================================================
  PAGE
  ====================================================== */


  return(


    <div className="dashboardPage">


      {/* ======================================================
      HEADER
      ====================================================== */}


      <header className="dashboardHeader">


        <div>


          <span className="dashboardBadge">


            <Brain />


            FLOWBIZ ERP OS


          </span>


          <h1>
            Dashboard Central
          </h1>


          <p>
            Pilotage temps réel de toute la plateforme
          </p>


        </div>


        <div className="headerActions">


          <button
            onClick={
              loadDashboard
            }
          >


            {
              refreshing


              ? <Loader2 className="spin" />


              : <RefreshCw />
            }


          </button>


          <button>


            <Bell />


          </button>


        </div>


      </header>


      {/* ======================================================
      QUICK ACCESS MODULES
      ====================================================== */}


      <section className="quickAccessGrid">


        <Link
          href="/clients"
          className="quickCard"
        >


          <div className="quickCardTop">


            <Users />


            <ArrowUpRight />


          </div>


          <strong>
            CRM Clients
          </strong>


          <span>
            Gestion relation client
          </span>


        </Link>


        <Link
          href="/factures"
          className="quickCard"
        >


          <div className="quickCardTop">


            <FileText />


            <ArrowUpRight />


          </div>


          <strong>
            Facturation
          </strong>


          <span>
            Stripe + PDF + Email
          </span>


        </Link>


        <Link
          href="/comptabilite"
          className="quickCard"
        >


          <div className="quickCardTop">


            <Receipt />


            <ArrowUpRight />


          </div>


          <strong>
            Comptabilité
          </strong>


          <span>
            TVA + Cashflow
          </span>


        </Link>


        <Link
          href="/analytics"
          className="quickCard"
        >


          <div className="quickCardTop">


            <BarChart3 />


            <ArrowUpRight />


          </div>


          <strong>
            Analytics
          </strong>


          <span>
            Revenus & performance
          </span>


        </Link>


      </section>


      {/* ======================================================
      KPI
      ====================================================== */}


      <section className="dashboardStats">


        <div className="dashboardCard">


          <DollarSign />


          <div>


            <h2>
              {revenue.toFixed(2)}€
            </h2>


            <span>
              Revenus totaux
            </span>


          </div>


        </div>


        <div className="dashboardCard">


          <Wallet />


          <div>


            <h2>
              {cashflow.toFixed(2)}€
            </h2>


            <span>
              Cashflow
            </span>


          </div>


        </div>


        <div className="dashboardCard">


          <Receipt />


          <div>


            <h2>
              {expensesTotal.toFixed(2)}€
            </h2>


            <span>
              Dépenses
            </span>


          </div>


        </div>


        <div className="dashboardCard">


          <TrendingUp />


          <div>


            <h2>
              {paidRevenue.toFixed(2)}€
            </h2>


            <span>
              Revenus payés
            </span>


          </div>


        </div>


        <div className="dashboardCard">


          <CreditCard />


          <div>


            <h2>
              {activeSubscriptions}
            </h2>


            <span>
              Abonnements actifs
            </span>


          </div>


        </div>


        <div className="dashboardCard">


          <CircleAlert />


          <div>


            <h2>
              {failedPayments}
            </h2>


            <span>
              Paiements échoués
            </span>


          </div>


        </div>


      </section>


      {/* ======================================================
      ANALYTICS
      ====================================================== */}


      <section className="dashboardGrid">


        {/* ======================================================
        REVENUE CHART
        ====================================================== */}


        <div className="widgetCard large">


          <div className="widgetTop">


            <div>


              <span>
                Analytics financières
              </span>


              <h3>
                Revenus mensuels
              </h3>


            </div>


          </div>


          <ResponsiveContainer
            width="100%"
            height={320}
          >


            <AreaChart
              data={revenueChart}
            >


              <defs>


                <linearGradient
                  id="gradientRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >


                  <stop
                    offset="5%"
                    stopColor="#7c5cff"
                    stopOpacity={0.8}
                  />


                  <stop
                    offset="95%"
                    stopColor="#7c5cff"
                    stopOpacity={0}
                  />


                </linearGradient>


              </defs>


              <CartesianGrid
                strokeDasharray="3 3"
              />


              <XAxis
                dataKey="month"
              />


              <YAxis />


              <Tooltip />


              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#7c5cff"
                fillOpacity={1}
                fill="url(#gradientRevenue)"
              />


            </AreaChart>


          </ResponsiveContainer>


        </div>


        {/* ======================================================
        EXPENSES CHART
        ====================================================== */}


        <div className="widgetCard">


          <div className="widgetTop">


            <div>


              <span>
                Répartition
              </span>


              <h3>
                Dépenses
              </h3>


            </div>


          </div>


          <ResponsiveContainer
            width="100%"
            height={280}
          >


            <PieChart>


              <Pie
                data={expenseChart}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >


                {
                  expenseChart.map(
                    (_,index)=>(


                      <Cell
                        key={index}
                        fill={
                          [
                            "#7c5cff",
                            "#00d2ff",
                            "#00ff9d",
                            "#ff9f43",
                            "#ff4d6d",
                          ][
                            index % 5
                          ]
                        }
                      />
                    )
                  )
                }


              </Pie>


              <Tooltip />


            </PieChart>


          </ResponsiveContainer>


        </div>


      </section>


      {/* ======================================================
      LOWER GRID
      ====================================================== */}


      <section className="dashboardBottomGrid">


        {/* ======================================================
        FACTURES
        ====================================================== */}


        <div className="widgetCard">


          <div className="widgetTop">


            <div>


              <span>
                Facturation
              </span>


              <h3>
                Dernières factures
              </h3>


            </div>


            <Link
              href="/dashboard/factures"
              className="widgetLink"
            >


              Voir


              <ChevronRight />


            </Link>


          </div>


          <div className="invoiceList">


            {
              invoices.map((invoice)=>(


                <div
                  key={invoice.id}
                  className="invoiceRow"
                >


                  <div>


                    <strong>
                      {invoice.total}€
                    </strong>


                    <span>
                      {
                        invoice.client_name
                      }
                    </span>


                  </div>


                  <div>


                    {
                      invoice.payment_status ===
                      "paid"


                      ? <CheckCircle2 />


                      : <Clock3 />
                    }


                  </div>


                </div>
              ))
            }


          </div>


        </div>


        {/* ======================================================
        NOTIFICATIONS
        ====================================================== */}


        <div className="widgetCard">


          <div className="widgetTop">


            <div>


              <span>
                Activité
              </span>


              <h3>
                Notifications
              </h3>


            </div>


          </div>


          <div className="notificationList">


            {
              notifications.map(
                (notification)=>(


                  <div
                    key={notification.id}
                    className="notificationRow"
                  >


                    <Activity />


                    <div>


                      <strong>
                        {
                          notification.title
                        }
                      </strong>


                      <span>
                        {
                          notification.message
                        }
                      </span>


                    </div>


                  </div>
                )
              )
            }


          </div>


        </div>


      </section>


      {/* ======================================================
      FOOTER KPI
      ====================================================== */}


      <section className="dashboardFooterStats">


        <div className="footerCard">


          <CalendarDays />


          <div>


            <span>
              TVA collectée
            </span>


            <strong>
              {vatCollected.toFixed(2)}€
            </strong>


          </div>


        </div>


        <div className="footerCard">


          <CalendarDays />


          <div>


            <span>
              TVA déductible
            </span>


            <strong>
              {vatDeductible.toFixed(2)}€
            </strong>


          </div>


        </div>


        <div className="footerCard">


          <CalendarDays />


          <div>


            <span>
              TVA nette
            </span>


            <strong>
              {vatToPay.toFixed(2)}€
            </strong>


          </div>


        </div>


        <div className="footerCard">


          <Users />


          <div>


            <span>
              Clients
            </span>


            <strong>
              {clientsCount}
            </strong>


          </div>


        </div>


        <div className="footerCard">


          <CreditCard />


          <div>


            <span>
              Factures Stripe
            </span>


            <strong>
              {stripeInvoices}
            </strong>


          </div>


        </div>


      </section>


    </div>
  );
}
