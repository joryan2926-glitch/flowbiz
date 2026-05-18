"use client";


import "./analytics.css";


import { useCallback, useEffect, useMemo, useState } from "react";


import {
  Sparkles,
  RefreshCw,
  Download,
  Loader2,
  AlertTriangle,
  X,
  Brain,
  ChevronRight,
  DollarSign,
  Users,
  Receipt,
  Clock3,
  Wallet,
  CreditCard,
  Layers3,
  Gauge,
  CalendarDays,
  Server,
  Cloud,
  Database,
  ShieldCheck,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";


import { supabase } from "@/app/lib/supabase";


interface Invoice {
  id: string;
  invoice_number?: string;
  client_name?: string;
  email?: string;
  company?: string;
  total: number;
  status?: string;
  payment_status?: string;
  stripe_payment_link?: string | null;
  created_at?: string;
  due_date?: string;
}


interface Client {
  id: string;
  name?: string;
  email?: string;
  company?: string;
  status?: string;
  revenue?: number;
  created_at?: string;
}


interface EventItem {
  id: string;
  title?: string;
  status?: string;
  date?: string;
  created_at?: string;
}


export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");


  const [clients, setClients] = useState<Client[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [stripeConnected, setStripeConnected] = useState(false);


  const loadAnalytics = useCallback(async () => {
    try {
      setRefreshing(true);
      setErrorMessage("");


      const [clientsRes, invoicesRes, eventsRes] = await Promise.all([
        supabase.from("clients").select("*").order("created_at", { ascending: false }),
        supabase.from("invoices").select("*").order("created_at", { ascending: false }),
        supabase.from("agenda_events").select("*").order("created_at", { ascending: false }),
      ]);


      if (clientsRes.error) throw clientsRes.error;
      if (invoicesRes.error) throw invoicesRes.error;


      setClients((clientsRes.data || []) as Client[]);
      setInvoices((invoicesRes.data || []) as Invoice[]);
      setEvents((eventsRes.data || []) as EventItem[]);


      try {
        const stripeResponse = await fetch("/api/stripe/check", {
          cache: "no-store",
        });


        setStripeConnected(stripeResponse.ok);
      } catch {
        setStripeConnected(false);
      }
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message || "Erreur analytics");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);


  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);


  useEffect(() => {
    const clientsChannel = supabase
      .channel("analytics-clients-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clients" },
        () => loadAnalytics()
      )
      .subscribe();


    const invoicesChannel = supabase
      .channel("analytics-invoices-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "invoices" },
        () => loadAnalytics()
      )
      .subscribe();


    const eventsChannel = supabase
      .channel("analytics-events-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "agenda_events" },
        () => loadAnalytics()
      )
      .subscribe();


    return () => {
      supabase.removeChannel(clientsChannel);
      supabase.removeChannel(invoicesChannel);
      supabase.removeChannel(eventsChannel);
    };
  }, [loadAnalytics]);


  const paidInvoices = useMemo(() => {
    return invoices.filter(
      (invoice) =>
        invoice.payment_status === "paid" ||
        invoice.status === "Payée" ||
        invoice.status === "paid"
    );
  }, [invoices]);


  const pendingInvoices = useMemo(() => {
    return invoices.filter(
      (invoice) =>
        invoice.payment_status !== "paid" &&
        invoice.status !== "Payée" &&
        invoice.status !== "paid"
    );
  }, [invoices]);


  const totalRevenue = useMemo(() => {
    return paidInvoices.reduce((acc, invoice) => acc + Number(invoice.total || 0), 0);
  }, [paidInvoices]);


  const pendingRevenue = useMemo(() => {
    return pendingInvoices.reduce((acc, invoice) => acc + Number(invoice.total || 0), 0);
  }, [pendingInvoices]);


  const totalClients = clients.length;


  const activeClients = useMemo(() => {
    return clients.filter(
      (client) => client.status === "Actif" || client.status === "active"
    ).length;
  }, [clients]);


  const todayEvents = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];


    return events.filter((event) => {
      const eventDate = event.date || event.created_at?.split("T")[0];
      return eventDate === today;
    }).length;
  }, [events]);


  const paymentRate = useMemo(() => {
    if (invoices.length === 0) return 0;
    return Math.round((paidInvoices.length / invoices.length) * 100);
  }, [invoices.length, paidInvoices.length]);


  const businessScore = useMemo(() => {
    if (invoices.length === 0 && clients.length === 0) return 0;


    const clientScore =
      clients.length > 0 ? Math.round((activeClients / clients.length) * 100) : 0;


    const score = Math.round((paymentRate + clientScore) / 2);


    return Math.min(100, score);
  }, [activeClients, clients.length, invoices.length, paymentRate]);


  const monthlyRevenue = useMemo(() => {
    const grouped: Record<string, number> = {};


    paidInvoices.forEach((invoice) => {
      if (!invoice.created_at) return;


      const date = new Date(invoice.created_at);


      const month = date.toLocaleDateString("fr-FR", {
        month: "short",
        year: "2-digit",
      });


      grouped[month] = (grouped[month] || 0) + Number(invoice.total || 0);
    });


    return Object.entries(grouped).map(([month, total]) => ({
      month,
      total,
    }));
  }, [paidInvoices]);


  const maxMonthlyRevenue = useMemo(() => {
    return Math.max(...monthlyRevenue.map((item) => item.total), 1);
  }, [monthlyRevenue]);


  const filteredClients = useMemo(() => {
    const value = search.toLowerCase().trim();


    if (!value) return clients;


    return clients.filter((client) =>
      `${client.name || ""} ${client.email || ""} ${client.company || ""} ${client.status || ""}`
        .toLowerCase()
        .includes(value)
    );
  }, [clients, search]);


  const topClients = useMemo(() => {
    return filteredClients
      .map((client) => {
        const revenueFromInvoices = paidInvoices
          .filter(
            (invoice) =>
              invoice.client_name?.toLowerCase() === client.name?.toLowerCase() ||
              invoice.email?.toLowerCase() === client.email?.toLowerCase()
          )
          .reduce((acc, invoice) => acc + Number(invoice.total || 0), 0);


        return {
          ...client,
          realRevenue: revenueFromInvoices || Number(client.revenue || 0),
        };
      })
      .sort((a, b) => b.realRevenue - a.realRevenue);
  }, [filteredClients, paidInvoices]);


  function handleExportJson() {
    const data = {
      generated_at: new Date().toISOString(),
      stripe_connected: stripeConnected,
      total_revenue: totalRevenue,
      pending_revenue: pendingRevenue,
      total_clients: totalClients,
      active_clients: activeClients,
      invoices_count: invoices.length,
      paid_invoices: paidInvoices.length,
      pending_invoices: pendingInvoices.length,
      payment_rate: paymentRate,
      business_score: businessScore,
      events_count: events.length,
      today_events: todayEvents,
      monthly_revenue: monthlyRevenue,
    };


    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });


    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");


    link.href = url;
    link.download = "flowbiz-analytics.json";
    link.click();


    URL.revokeObjectURL(url);
  }


  function handleExportCsv() {
    const rows = [
      ["Indicateur", "Valeur"],
      ["Revenus encaissés", totalRevenue],
      ["Revenus en attente", pendingRevenue],
      ["Clients", totalClients],
      ["Clients actifs", activeClients],
      ["Factures", invoices.length],
      ["Factures payées", paidInvoices.length],
      ["Factures en attente", pendingInvoices.length],
      ["Taux paiement", `${paymentRate}%`],
      ["Business score", `${businessScore}/100`],
      ["Événements", events.length],
      ["RDV aujourd’hui", todayEvents],
    ];


    const csv = rows.map((row) => row.join(";")).join("\n");


    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });


    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");


    link.href = url;
    link.download = "flowbiz-analytics.csv";
    link.click();


    URL.revokeObjectURL(url);
  }


  if (loading) {
    return (
      <div className="analyticsLoader">
        <Loader2 className="spin" />
      </div>
    );
  }


  return (
    <div className="analyticsPage">
      <div className="analyticsGlowOne" />
      <div className="analyticsGlowTwo" />


      <header className="analyticsTopbar">
        <div>
          <span className="analyticsBadge">
            <Sparkles />
            FLOWBIZ ANALYTICS IA
          </span>


          <h1>Analytics Business Intelligence</h1>


          <p>
            Dashboard relié au CRM, factures, agenda, paiements Stripe et données
            Supabase.
          </p>
        </div>


        <div className="analyticsActions">
          <button type="button" className="refreshBtn" onClick={loadAnalytics}>
            {refreshing ? <Loader2 className="spin" /> : <RefreshCw />}
          </button>


          <button type="button" className="exportBtn" onClick={handleExportCsv}>
            <Download />
            CSV
          </button>


          <button type="button" className="exportBtn" onClick={handleExportJson}>
            <Download />
            JSON
          </button>
        </div>
      </header>


      {errorMessage && (
        <div className="analyticsError">
          <AlertTriangle />
          <span>{errorMessage}</span>
          <button type="button" onClick={() => setErrorMessage("")}>
            <X />
          </button>
        </div>
      )}


      <section className="analyticsAiBar">
        <div className="analyticsAiLeft">
          <Brain />


          <div>
            <h4>FlowBiz IA Analytics</h4>
            <p>
              Analyse basée uniquement sur tes données réelles Supabase et tes paiements
              Stripe connectés.
            </p>
          </div>
        </div>


        <button type="button" className="analyticsAiBtn">
          {stripeConnected ? "STRIPE CONNECTÉ" : "STRIPE NON CONNECTÉ"}
          <ChevronRight />
        </button>
      </section>


      <section className="analyticsStats">
        <div className="analyticsStatCard revenue">
          <DollarSign />
          <div>
            <h2>{totalRevenue.toLocaleString()}€</h2>
            <span>Revenus encaissés</span>
          </div>
        </div>


        <div className="analyticsStatCard clients">
          <Users />
          <div>
            <h2>{activeClients}</h2>
            <span>Clients actifs</span>
          </div>
        </div>


        <div className="analyticsStatCard invoices">
          <Receipt />
          <div>
            <h2>{paidInvoices.length}</h2>
            <span>Factures payées</span>
          </div>
        </div>


        <div className="analyticsStatCard pending">
          <Clock3 />
          <div>
            <h2>{pendingInvoices.length}</h2>
            <span>En attente</span>
          </div>
        </div>
      </section>


      <section className="analyticsGrid">
        <div className="analyticsWidget large">
          <div className="widgetTop">
            <div>
              <span>Revenus mensuels réels</span>
              <h3>Croissance financière</h3>
            </div>


            <button type="button" onClick={handleExportCsv}>
              Télécharger rapport
            </button>
          </div>


          <div className="chartBars">
            {monthlyRevenue.length === 0 ? (
              <div className="emptyAnalytics">Aucun revenu encaissé pour le moment</div>
            ) : (
              monthlyRevenue.map((item) => (
                <div key={item.month} className="chartItem">
                  <div
                    className="chartBar"
                    style={{
                      height: `${Math.max(30, (item.total / maxMonthlyRevenue) * 180)}px`,
                    }}
                  />
                  <span>{item.month}</span>
                </div>
              ))
            )}
          </div>
        </div>


        <div className="analyticsWidget">
          <div className="widgetMiniTop">
            <TrendingUp />
            Paiements
          </div>


          <div className="metricBox">
            <strong>{paymentRate}%</strong>
            <span>Taux de paiement</span>
          </div>


          <div className="metricBox">
            <strong>{pendingRevenue.toLocaleString()}€</strong>
            <span>Montant en attente</span>
          </div>
        </div>


        <div className="analyticsWidget">
          <div className="widgetMiniTop">
            <Wallet />
            Cashflow réel
          </div>


          <div className="financeStats">
            <div className="green">
              <ArrowUpRight />
              +{totalRevenue.toLocaleString()}€
            </div>


            <div className="red">
              <ArrowDownRight />
              {pendingRevenue.toLocaleString()}€ en attente
            </div>
          </div>
        </div>


        <div className="analyticsWidget">
          <div className="widgetMiniTop">
            <CreditCard />
            Stripe
          </div>


          <div className="metricBox">
            <strong>{paidInvoices.length}</strong>
            <span>Paiements réussis</span>
          </div>


          <div className="metricBox">
            <strong>{pendingInvoices.length}</strong>
            <span>Paiements non réglés</span>
          </div>
        </div>


        <div className="analyticsWidget">
          <div className="widgetMiniTop">
            <Layers3 />
            Funnel CRM réel
          </div>


          <div className="funnelBox">
            <div>{clients.length} clients total</div>
            <div>↓</div>
            <div>{activeClients} clients actifs</div>
            <div>↓</div>
            <div>{paidInvoices.length} factures payées</div>
          </div>
        </div>


        <div className="analyticsWidget">
          <div className="widgetMiniTop">
            <Gauge />
            Business Score
          </div>


          <div className="scoreCircle">{businessScore}/100</div>
        </div>


        <div className="analyticsWidget">
          <div className="widgetMiniTop">
            <CalendarDays />
            Agenda
          </div>


          <div className="metricBox">
            <strong>{todayEvents}</strong>
            <span>RDV aujourd’hui</span>
          </div>


          <div className="metricBox">
            <strong>{events.length}</strong>
            <span>Événements total</span>
          </div>
        </div>


        <div className="analyticsWidget">
          <div className="widgetMiniTop">
            <Server />
            Infrastructure
          </div>


          <div className="infraBox">
            <div>
              <Cloud />
              App active
            </div>


            <div>
              <Database />
              Supabase connecté
            </div>


            <div>
              <ShieldCheck />
              Stripe {stripeConnected ? "connecté" : "non connecté"}
            </div>
          </div>
        </div>
      </section>


      <section className="analyticsToolbar">
        <div className="analyticsSearch">
          <Search />


          <input
            type="text"
            placeholder="Rechercher un client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>


      <section className="clientsSection">
        <div className="sectionTop">
          <h3>Top clients</h3>
          <span>{topClients.length} résultat(s)</span>
        </div>


        <div className="clientsTable">
          {topClients.length === 0 ? (
            <div className="emptyAnalytics">Aucun client trouvé</div>
          ) : (
            topClients.map((client) => (
              <div key={client.id} className="clientRow">
                <div className="clientLeft">
                  <div className="clientAvatar">
                    {client.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>


                  <div>
                    <h4>{client.name || "Client sans nom"}</h4>
                    <span>{client.company || client.status || "Aucune information"}</span>
                  </div>
                </div>


                <div className="clientRevenue">{client.realRevenue.toLocaleString()}€</div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
