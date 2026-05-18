"use client";

import "./flowbiz-ai.css";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Brain,
  Sparkles,
  Bell,
  ChevronRight,
  Loader2,
  Send,
  Mic,
  FileText,
  Search,
  Zap,
  Cpu,
  Bot,
  BarChart3,
  CalendarDays,
  Receipt,
  Users,
  Activity,
  Globe,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Trash2,
  RefreshCw,
  Download,
  Copy,
  Save,
  MessageSquare,
  Lightbulb,
  Target,
  Workflow,
  Database,
  Server,
  Mail,
  Briefcase,
  DollarSign,
  CreditCard,
  Layers3,
  Timer,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Wallet,
  Radar,
} from "lucide-react";

import { supabase } from "@/app/lib/supabase";

/* =========================================
INTERFACES
========================================= */

interface Client {
  id:string;
  name:string;
  email?:string;
  status:string;
  revenue:number;
  created_at?:string;
}

interface Invoice {
  id:string;
  total:number;
  status:string;
  created_at:string;
}

interface AgendaEvent {
  id:string;
  title:string;
  status:string;
  date:string;
}

interface AiConversation {
  id:string;
  prompt:string;
  response:string;
  created_at:string;
}

interface WorkflowItem {
  id:string;
  name:string;
  status:string;
}

/* =========================================
PAGE
========================================= */

export default function FlowbizIAPage(){

  /*
  =========================================
  STATES
  =========================================
  */

  const [loading,setLoading] =
    useState(true);

  const [sending,setSending] =
    useState(false);

  const [clients,setClients] =
    useState<Client[]>([]);

  const [invoices,setInvoices] =
    useState<Invoice[]>([]);

  const [events,setEvents] =
    useState<AgendaEvent[]>([]);

  const [conversations,
    setConversations] =
    useState<AiConversation[]>([]);

  const [workflows,
    setWorkflows] =
    useState<WorkflowItem[]>([]);

  const [prompt,setPrompt] =
    useState("");

  const [generatedResponse,
    setGeneratedResponse] =
    useState("");

  const [search,setSearch] =
    useState("");

  const [liveMode,setLiveMode] =
    useState(true);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  /*
  =========================================
  LOAD DATA
  =========================================
  */

  async function loadData(){

    try{

      setLoading(true);

      const [

        clientsRes,

        invoicesRes,

        eventsRes,

        aiRes,

        workflowsRes,

      ] = await Promise.all([

        supabase
          .from("clients")
          .select("*"),

        supabase
          .from("invoices")
          .select("*"),

        supabase
          .from("agenda_events")
          .select("*"),

        supabase
          .from("flowbiz_ai_history")
          .select("*")
          .order(
            "created_at",
            {
              ascending:false,
            }
          ),

        supabase
          .from("workflow_automations")
          .select("*"),
      ]);

      setClients(
        clientsRes.data || []
      );

      setInvoices(
        invoicesRes.data || []
      );

      setEvents(
        eventsRes.data || []
      );

      setConversations(
        aiRes.data || []
      );

      setWorkflows(
        workflowsRes.data || []
      );

      setLoading(false);

    }catch(error){

      console.log(error);

      setLoading(false);
    }
  }

  /*
  =========================================
  INIT
  =========================================
  */

  useEffect(()=>{

    loadData();

  },[]);

  /*
  =========================================
  REALTIME
  =========================================
  */

  useEffect(()=>{

    const channel =

      supabase

      .channel(
        "flowbiz-ai-live"
      )

      .on(
        "postgres_changes",
        {
          event:"*",
          schema:"public",
          table:"flowbiz_ai_history",
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

  /*
  =========================================
  AUTO SCROLL
  =========================================
  */

  useEffect(()=>{

    messagesEndRef.current?.scrollIntoView({
      behavior:"smooth",
    });

  },[
    generatedResponse,
    conversations,
  ]);

  /*
  =========================================
  KPI
  =========================================
  */

  const totalRevenue =

    invoices.reduce(
      (
        acc,
        invoice
      )=>

        acc +
        Number(invoice.total || 0),

      0
    );

  const activeClients =

    clients.filter(
      (client)=>

        client.status ===
        "Actif"
    ).length;

  const paidInvoices =

    invoices.filter(
      (invoice)=>

        invoice.status ===
        "Payée"
    ).length;

  const pendingInvoices =

    invoices.filter(
      (invoice)=>

        invoice.status ===
        "En attente"
    ).length;

  const upcomingEvents =

    events.filter(
      (event)=>

        event.status ===
        "Planifié"
    ).length;

  const failedInvoices =

    invoices.filter(
      (invoice)=>

        invoice.status ===
        "Refusée"
    ).length;

  const monthlyRevenue =

    Math.round(
      totalRevenue / 12
    );

  const workflowActive =

    workflows.length;

  const businessScore =

    Math.min(
      100,
      Math.round(
        (
          activeClients * 2 +
          paidInvoices * 3 +
          upcomingEvents
        ) / 2
      )
    );

  /*
  =========================================
  IA GENERATION
  =========================================
  */

  async function handleGenerate(){

    try{

      if(!prompt){

        alert(
          "Veuillez entrer une demande."
        );

        return;
      }

      setSending(true);

      /*
      =========================================
      SMART CONTEXT
      =========================================
      */

      const topClient =

        clients.sort(
          (a,b)=>

            b.revenue -
            a.revenue
        )[0];

      const responseText =

`Analyse intelligente FlowBiz IA

━━━━━━━━━━━━━━━━━━

BUSINESS OVERVIEW

• Clients actifs : ${activeClients}
• Factures payées : ${paidInvoices}
• Factures en attente : ${pendingInvoices}
• Revenus globaux : ${totalRevenue.toLocaleString()}€
• Événements planifiés : ${upcomingEvents}

━━━━━━━━━━━━━━━━━━

ANALYSE IA

• Croissance stable détectée
• Activité CRM positive
• Flux financier cohérent
• Productivité équipe correcte

━━━━━━━━━━━━━━━━━━

RECOMMANDATIONS

1. Prioriser les relances clients
2. Optimiser les workflows automatiques
3. Automatiser les emails commerciaux
4. Réduire les délais de paiement
5. Générer davantage de leads premium

━━━━━━━━━━━━━━━━━━

TOP CLIENT

${topClient?.name || "Aucun client"}
${topClient?.revenue || 0}€

━━━━━━━━━━━━━━━━━━

BUSINESS HEALTH SCORE

${businessScore}/100`;

      /*
      =========================================
      STREAMING EFFECT
      =========================================
      */

      setGeneratedResponse("");

      for(
        let i = 0;
        i < responseText.length;
        i++
      ){

        await new Promise(
          (resolve)=>

            setTimeout(
              resolve,
              5
            )
        );

        setGeneratedResponse(
          (prev)=>

            prev +
            responseText[i]
        );
      }

      await supabase

        .from(
          "flowbiz_ai_history"
        )

        .insert([
          {
            prompt,
            response:
              responseText,
          },
        ]);

      setPrompt("");

      setSending(false);

    }catch(error){

      console.log(error);

      setSending(false);
    }
  }

  /*
  =========================================
  DELETE HISTORY
  =========================================
  */

  async function deleteConversation(
    id:string
  ){

    await supabase

      .from(
        "flowbiz_ai_history"
      )

      .delete()

      .eq("id",id);

    await loadData();
  }

  /*
  =========================================
  COPY
  =========================================
  */

  async function copyResponse(
    text:string
  ){

    await navigator.clipboard.writeText(
      text
    );

    alert(
      "Réponse copiée"
    );
  }

  /*
  =========================================
  EXPORT HISTORY
  =========================================
  */

  function exportHistory(){

    const content = JSON.stringify(
      conversations,
      null,
      2
    );

    const blob =
      new Blob(
        [content],
        {
          type:"application/json",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "flowbiz-ai-history.json";

    link.click();
  }

  /*
  =========================================
  FILTER
  =========================================
  */

  const filteredHistory =
    useMemo(()=>{

      return conversations.filter(
        (item)=>

          item.prompt
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    },[
      conversations,
      search,
    ]);

  /*
  =========================================
  LOADING
  =========================================
  */

  if(loading){

    return(

      <div className="flowbizAiLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  return(

    <div className="flowbizAiPage">

      {/* GLOWS */}

      <div className="flowGlowOne" />
      <div className="flowGlowTwo" />

      {/* TOPBAR */}

      <header className="flowTopbar">

        <div>

          <span className="flowBadge">

            <Sparkles />

            FLOWBIZ IA CORE

          </span>

          <h1>

            FlowBiz IA Premium

          </h1>

          <p>

            IA connectée au CRM,
            analytics,
            agenda,
            workflows,
            finances
            et automatisations business.

          </p>

        </div>

        <div className="flowActions">

          <button>

            <Bell />

          </button>

          <button
            onClick={
              exportHistory
            }
          >

            <Download />

            Export IA

          </button>

        </div>

      </header>

      {/* HERO */}

      <section className="flowHero">

        <div className="flowHeroLeft">

          <Brain />

          <div>

            <h3>

              Intelligence Business Temps Réel

            </h3>

            <p>

              Analyse automatique des données,
              génération intelligente
              et recommandations stratégiques.

            </p>

          </div>

        </div>

        <button
          className={`activateBtn ${
            liveMode
            ? "active"
            : ""
          }`}
          onClick={() =>
            setLiveMode(
              !liveMode
            )
          }
        >

          {
            liveMode
            ? "IA Active"
            : "IA Pause"
          }

          <ChevronRight />

        </button>

      </section>

      {/* KPI */}

      <section className="flowStats">

        <div className="flowStatCard revenue">

          <DollarSign />

          <div>

            <h2>

              {totalRevenue.toLocaleString()}€

            </h2>

            <span>

              Revenus analysés

            </span>

          </div>

        </div>

        <div className="flowStatCard">

          <Users />

          <div>

            <h2>

              {activeClients}

            </h2>

            <span>

              Clients actifs

            </span>

          </div>

        </div>

        <div className="flowStatCard">

          <Receipt />

          <div>

            <h2>

              {paidInvoices}

            </h2>

            <span>

              Factures payées

            </span>

          </div>

        </div>

        <div className="flowStatCard">

          <Workflow />

          <div>

            <h2>

              {workflowActive}

            </h2>

            <span>

              Workflows actifs

            </span>

          </div>

        </div>

      </section>

      {/* GRID */}

      <section className="flowGrid">

        {/* IA CHAT */}

        <div className="flowWidget large">

          <div className="widgetTop">

            <div>

              <span>

                Assistant IA

              </span>

              <h3>

                Génération intelligente

              </h3>

            </div>

            <button>

              <Mic />

            </button>

          </div>

          <textarea
            placeholder="Analyse mes clients, génère un résumé business, détecte les risques..."
            value={prompt}
            onChange={(e)=>
              setPrompt(
                e.target.value
              )
            }
          />

          <button
            className="generateBtn"
            onClick={
              handleGenerate
            }
          >

            {
              sending ? (

                <Loader2 className="spin" />

              ) : (

                <>
                  <Send />
                  Générer avec IA
                </>
              )
            }

          </button>

          {
            generatedResponse && (

              <div className="generatedBox">

                <div className="generatedTop">

                  <h4>

                    Réponse IA

                  </h4>

                  <button
                    onClick={() =>
                      copyResponse(
                        generatedResponse
                      )
                    }
                  >

                    <Copy />

                  </button>

                </div>

                <pre>

                  {generatedResponse}

                </pre>

              </div>
            )
          }

        </div>

        {/* MRR */}

        <div className="flowWidget">

          <div className="widgetMiniTop">

            <TrendingUp />

            MRR / ARR

          </div>

          <div className="miniStats">

            <div>

              <span>

                MRR

              </span>

              <strong>

                {monthlyRevenue.toLocaleString()}€

              </strong>

            </div>

            <div>

              <span>

                ARR

              </span>

              <strong>

                {totalRevenue.toLocaleString()}€

              </strong>

            </div>

          </div>

        </div>

        {/* CASHFLOW */}

        <div className="flowWidget">

          <div className="widgetMiniTop">

            <Wallet />

            Cashflow

          </div>

          <div className="miniStats">

            <div>

              <span>

                Entrées

              </span>

              <strong className="green">

                +{totalRevenue.toLocaleString()}€

              </strong>

            </div>

            <div>

              <span>

                En attente

              </span>

              <strong className="orange">

                {pendingInvoices}

              </strong>

            </div>

          </div>

        </div>

        {/* STRIPE */}

        <div className="flowWidget">

          <div className="widgetMiniTop">

            <CreditCard />

            Stripe

          </div>

          <ul className="flowList">

            <li>
              {paidInvoices} paiements validés
            </li>

            <li>
              {failedInvoices} paiements refusés
            </li>

            <li>
              Flux temps réel actif
            </li>

          </ul>

        </div>

        {/* CRM */}

        <div className="flowWidget">

          <div className="widgetMiniTop">

            <Briefcase />

            Funnel CRM

          </div>

          <div className="funnelBox">

            <span>
              {clients.length} Leads
            </span>

            <ChevronRight />

            <span>
              {activeClients} Actifs
            </span>

            <ChevronRight />

            <span>
              {paidInvoices} Convertis
            </span>

          </div>

        </div>

        {/* SCORE */}

        <div className="flowWidget">

          <div className="widgetMiniTop">

            <Radar />

            Business Score

          </div>

          <div className="scoreCircle">

            {businessScore}/100

          </div>

        </div>

        {/* INFRA */}

        <div className="flowWidget">

          <div className="widgetMiniTop">

            <Server />

            Infrastructure

          </div>

          <div className="infraStats">

            <div>

              <Database />

              Supabase connecté

            </div>

            <div>

              <ShieldCheck />

              Sécurité active

            </div>

            <div>

              <Cpu />

              IA synchronisée

            </div>

          </div>

        </div>

        {/* AUTOMATIONS */}

        <div className="flowWidget">

          <div className="widgetMiniTop">

            <Workflow />

            Automatisations

          </div>

          <ul className="flowList">

            {
              workflows.length > 0 ? (

                workflows.map(
                  (workflow)=>(
                    <li
                      key={
                        workflow.id
                      }
                    >
                      {
                        workflow.name
                      }
                    </li>
                  )
                )

              ) : (

                <li>
                  Aucun workflow
                </li>
              )
            }

          </ul>

        </div>

        {/* INSIGHTS */}

        <div className="flowWidget">

          <div className="widgetMiniTop">

            <Lightbulb />

            Insights IA

          </div>

          <ul className="flowList">

            <li>
              {pendingInvoices} factures à relancer
            </li>

            <li>
              {upcomingEvents} rendez-vous prévus
            </li>

            <li>
              Activité CRM stable
            </li>

            <li>
              Opportunités détectées
            </li>

          </ul>

        </div>

        {/* REALTIME */}

        <div className="flowWidget">

          <div className="widgetMiniTop">

            <Activity />

            Temps réel

          </div>

          <div className="liveStats">

            <div>

              <Zap />

              IA active

            </div>

            <div>

              <Mail />

              Emails synchronisés

            </div>

            <div>

              <Bot />

              Monitoring live

            </div>

          </div>

        </div>

      </section>

      {/* TOOLBAR */}

      <section className="flowToolbar">

        <div className="flowSearch">

          <Search />

          <input
            type="text"
            placeholder="Rechercher une conversation..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <button
          className="refreshBtn"
          onClick={
            loadData
          }
        >

          <RefreshCw />

          Actualiser

        </button>

      </section>

      {/* HISTORY */}

      <section className="historySection">

        <div className="sectionTop">

          <h3>

            Historique IA

          </h3>

        </div>

        <div className="historyGrid">

          {
            filteredHistory.map(
              (item)=>(

                <div
                  key={item.id}
                  className="historyCard"
                >

                  <div className="historyTop">

                    <MessageSquare />

                    <span>

                      {
                        new Date(
                          item.created_at
                        ).toLocaleString()
                      }

                    </span>

                  </div>

                  <h4>

                    {item.prompt}

                  </h4>

                  <p>

                    {item.response}

                  </p>

                  <div className="historyActions">

                    <button
                      onClick={() =>
                        copyResponse(
                          item.response
                        )
                      }
                    >

                      <Copy />

                    </button>

                    <button>

                      <Save />

                    </button>

                    <button
                      onClick={() =>
                        deleteConversation(
                          item.id
                        )
                      }
                    >

                      <Trash2 />

                    </button>

                  </div>

                </div>
              )
            )
          }

          <div ref={messagesEndRef} />

        </div>

      </section>

    </div>
  );
}
