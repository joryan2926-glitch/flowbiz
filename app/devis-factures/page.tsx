"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  Bell,
  Sparkles,
  FileText,
  ReceiptText,
  Send,
  Eye,
  MoreVertical,
  Download,
  Filter,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  Wallet,
  TrendingUp,
  CalendarDays,
  UserCheck,
  CreditCard,
  Signature,
  ArrowUpRight,
  X,
  Brain,
  Target,
  Users,
  Building2,
} from "lucide-react";

/* =========================================================
   REPÈRE 1 — DONNÉES DEVIS / FACTURES
========================================================= */

const documents = [
  {
    id: "DEV-2026-0012",
    type: "Devis",
    client: "Acme Corp",
    amount: "2 850 €",
    status: "En attente",
    date: "06/05/2026",
    due: "14/05/2026",
    step: "Devis",
    probability: "78%",
    description: "Création interface SaaS FlowBiz premium",
    nextAction: "Relancer aujourd’hui",
  },
  {
    id: "FAC-2026-0045",
    type: "Facture",
    client: "Innovatech",
    amount: "5 680 €",
    status: "Payée",
    date: "04/05/2026",
    due: "08/05/2026",
    step: "Paiement",
    probability: "100%",
    description: "Développement automatisation business",
    nextAction: "Classer en comptabilité",
  },
  {
    id: "DEV-2026-0013",
    type: "Devis",
    client: "Beta LLC",
    amount: "8 450 €",
    status: "À relancer",
    date: "02/05/2026",
    due: "10/05/2026",
    step: "Signature",
    probability: "64%",
    description: "Développement CRM intelligent",
    nextAction: "Envoyer relance IA",
  },
  {
    id: "FAC-2026-0046",
    type: "Facture",
    client: "Gamma SARL",
    amount: "1 200 €",
    status: "Impayée",
    date: "28/04/2026",
    due: "05/05/2026",
    step: "Paiement",
    probability: "38%",
    description: "Prestation accompagnement marketing",
    nextAction: "Envoyer rappel paiement",
  },
  {
    id: "DEV-2026-0014",
    type: "Devis",
    client: "Delta Solutions",
    amount: "4 900 €",
    status: "Signé",
    date: "25/04/2026",
    due: "30/04/2026",
    step: "Facture",
    probability: "92%",
    description: "Création tunnel client complet",
    nextAction: "Transformer en facture",
  },
];

/* =========================================================
   REPÈRE 2 — PARCOURS CLIENT COMPLET
========================================================= */

const clientJourney = [
  {
    label: "Prospect",
    icon: Users,
    count: 24,
    value: "18 200 €",
    clients: ["Beta LLC", "Nova Agency", "Epsilon Group"],
  },
  {
    label: "RDV",
    icon: CalendarDays,
    count: 9,
    value: "12 400 €",
    clients: ["Acme Corp", "Delta Solutions"],
  },
  {
    label: "Proposition",
    icon: Send,
    count: 6,
    value: "9 850 €",
    clients: ["Innovatech", "Gamma SARL"],
  },
  {
    label: "Devis",
    icon: FileText,
    count: 3,
    value: "8 450 €",
    clients: ["Acme Corp", "Beta LLC"],
  },
  {
    label: "Signature",
    icon: Signature,
    count: 2,
    value: "4 900 €",
    clients: ["Delta Solutions"],
  },
  {
    label: "Paiement",
    icon: CreditCard,
    count: 5,
    value: "6 880 €",
    clients: ["Innovatech", "Gamma SARL"],
  },
  {
    label: "Facture",
    icon: ReceiptText,
    count: 8,
    value: "12 120 €",
    clients: ["Acme Corp", "Innovatech"],
  },
  {
    label: "Fidélisation",
    icon: UserCheck,
    count: 12,
    value: "22 000 €",
    clients: ["Clients récurrents"],
  },
];

export default function DevisFacturationPage() {
  /* =========================================================
     REPÈRE 3 — STATES INTERACTIFS
  ========================================================= */

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tous");
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);
  const [selectedStep, setSelectedStep] = useState(clientJourney[3]);
  const [aiOpen, setAiOpen] = useState(false);

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const search =
        doc.id.toLowerCase().includes(query.toLowerCase()) ||
        doc.client.toLowerCase().includes(query.toLowerCase()) ||
        doc.type.toLowerCase().includes(query.toLowerCase());

      const statusOk = status === "Tous" || doc.status === status;

      return search && statusOk;
    });
  }, [query, status]);

  const stats = [
    ["Devis en attente", "12", "15 680 € à convertir", FileText, "blue"],
    ["Factures payées", "34", "24 950 € encaissés", CheckCircle2, "green"],
    ["À relancer", "3", "8 450 € débloquables", AlertTriangle, "purple"],
    ["Impayés", "2", "3 200 € à sécuriser", Clock3, "pink"],
  ] as const;

  return (
    <main className="page">
      <div className="premiumBg" />

      {/* =====================================================
          REPÈRE 4 — HEADER PREMIUM
      ===================================================== */}

      <section className="content">
        <header className="topbar">
          <div>
            <h1>Devis & Facturation</h1>
            <p>
              Transformez vos prospects en devis, vos devis en paiements, puis vos
              paiements en clients fidèles.
            </p>
          </div>

          <div className="topActions">
            <div className="search">
              <Search size={18} />
              <input placeholder="Rechercher devis, facture, client..." />
              <small>⌘ K</small>
            </div>

            <button className="bell">
              <Bell size={19} />
              <span>3</span>
            </button>

            <button className="aiBtn" onClick={() => setAiOpen(true)}>
              <Sparkles size={18} />
              Copilote ventes
            </button>
          </div>
        </header>

        {/* =====================================================
            REPÈRE 5 — HERO COMMERCIAL
        ===================================================== */}

        <section className="hero">
          <div>
            <span>FlowBiz Sales Engine</span>
            <h2>Un parcours client complet, du prospect à la fidélisation</h2>
            <p>
              Suivez chaque étape : RDV, proposition, devis, signature, paiement,
              facture et fidélisation. L’IA vous indique quoi relancer et quand agir.
            </p>

            <div className="heroActions">
              <button>
                <Plus size={18} />
                Nouveau devis
              </button>

              <button>
                <ReceiptText size={18} />
                Nouvelle facture
              </button>

              <button onClick={() => setAiOpen(true)}>
                <Sparkles size={18} />
                Relance IA
              </button>
            </div>
          </div>

          <div className="heroSignal">
            <Sparkles size={22} />
            <strong>8 450 € peuvent être débloqués</strong>
            <p>3 devis chauds nécessitent une relance aujourd’hui.</p>
          </div>
        </section>

        {/* =====================================================
            REPÈRE 6 — KPI FACTURATION
        ===================================================== */}

        <section className="kpiGrid">
          {stats.map(([label, value, detail, Icon, color]) => (
            <div className={`kpi ${color}`} key={label}>
              <div className="kpiTop">
                <div>
                  <p>{label}</p>
                  <h3>{value}</h3>
                </div>

                <div className="kpiIcon">
                  <Icon size={24} />
                </div>
              </div>

              <div className="trend">
                <TrendingUp size={16} />
                <span>{detail}</span>
              </div>

              <div className="sparkline" />
            </div>
          ))}
        </section>

        {/* =====================================================
            REPÈRE 7 — GRILLE PRINCIPALE
        ===================================================== */}

        <section className="mainGrid">
          <div className="mainColumn">
            {/* =================================================
                REPÈRE 8 — INSIGHT IA
            ================================================= */}

            <div className="card aiLarge">
              <div className="cardHeader">
                <div>
                  <h3>FlowBiz AI Insight</h3>
                  <p>Priorités commerciales détectées automatiquement.</p>
                </div>
                <Brain size={28} />
              </div>

              <div className="aiActions">
                <div className="aiAction urgent">
                  <AlertTriangle size={20} />
                  <div>
                    <strong>3 devis sont en attente de réponse</strong>
                    <p>
                      Une relance aujourd’hui peut débloquer 8 450 € de chiffre
                      d’affaires.
                    </p>
                  </div>
                  <button onClick={() => setAiOpen(true)}>Relancer</button>
                </div>

                <div className="aiAction">
                  <Wallet size={20} />
                  <div>
                    <strong>2 factures impactent directement la trésorerie</strong>
                    <p>
                      Une facture est payée, une autre doit être rappelée avant retard.
                    </p>
                  </div>
                  <Link href="/banque">Voir banque</Link>
                </div>

                <div className="aiAction">
                  <ReceiptText size={20} />
                  <div>
                    <strong>1 devis signé doit être transformé en facture</strong>
                    <p>Delta Solutions est prêt pour facturation immédiate.</p>
                  </div>
                  <button>Créer facture</button>
                </div>
              </div>
            </div>

            {/* =================================================
                REPÈRE 9 — PARCOURS CLIENT CLIQUABLE
            ================================================= */}

            <div className="card journeyCard">
              <div className="cardHeader">
                <div>
                  <h3>Parcours client intelligent</h3>
                  <p>
                    Cliquez sur une étape pour voir les clients, montants et actions
                    prioritaires.
                  </p>
                </div>
                <Target size={26} />
              </div>

              <div className="journey">
                {clientJourney.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <button
                      key={step.label}
                      className={
                        selectedStep.label === step.label
                          ? "journeyStep activeStep"
                          : "journeyStep"
                      }
                      onClick={() => setSelectedStep(step)}
                    >
                      <div className="stepIcon">
                        <Icon size={20} />
                      </div>

                      <strong>{step.label}</strong>
                      <small>{step.count} dossier(s)</small>
                      <span>{step.value}</span>

                      {index < clientJourney.length - 1 && (
                        <div className="connector">→</div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="journeyDetails">
                <div>
                  <span>Étape sélectionnée</span>
                  <h4>{selectedStep.label}</h4>
                  <p>
                    {selectedStep.value} de potentiel commercial dans cette étape.
                  </p>
                </div>

                <div className="clientChips">
                  {selectedStep.clients.map((client) => (
                    <span key={client}>{client}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* =================================================
                REPÈRE 10 — TABLE DEVIS / FACTURES
            ================================================= */}

            <div className="card tableCard">
              <div className="tableHeader">
                <div>
                  <h3>Documents commerciaux</h3>
                  <p>{filteredDocs.length} document(s) affiché(s)</p>
                </div>

                <div className="filters">
                  <div className="miniSearch">
                    <Search size={16} />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Rechercher..."
                    />
                  </div>

                  <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Tous</option>
                    <option>En attente</option>
                    <option>À relancer</option>
                    <option>Payée</option>
                    <option>Impayée</option>
                    <option>Signé</option>
                  </select>

                  <button>
                    <Filter size={16} />
                    Filtres
                  </button>

                  <button>
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>

              <div className="table">
                <div className="tableRow tableHead">
                  <span>Document</span>
                  <span>Client</span>
                  <span>Montant</span>
                  <span>Étape</span>
                  <span>Statut</span>
                  <span>Action</span>
                </div>

                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className={`tableRow ${
                      selectedDoc.id === doc.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <div className="docCell">
                      <div className="docIcon">
                        {doc.type === "Facture" ? (
                          <ReceiptText size={18} />
                        ) : (
                          <FileText size={18} />
                        )}
                      </div>

                      <div>
                        <strong>{doc.id}</strong>
                        <small>{doc.type}</small>
                      </div>
                    </div>

                    <span>{doc.client}</span>
                    <strong>{doc.amount}</strong>
                    <span>{doc.step}</span>

                    <span className={`status ${cleanStatus(doc.status)}`}>
                      {doc.status}
                    </span>

                    <div className="rowActions">
                      <button>
                        <Eye size={16} />
                      </button>
                      <button>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =====================================================
              REPÈRE 11 — PANNEAU DÉTAIL DOCUMENT
          ===================================================== */}

          <aside className="sideColumn">
            <div className="card detailPanel">
              <div className="docMain">
                <div className="bigDocIcon">
                  {selectedDoc.type === "Facture" ? (
                    <ReceiptText size={28} />
                  ) : (
                    <FileText size={28} />
                  )}
                </div>

                <div>
                  <h3>{selectedDoc.id}</h3>
                  <p>{selectedDoc.client}</p>
                  <span className={`status ${cleanStatus(selectedDoc.status)}`}>
                    {selectedDoc.status}
                  </span>
                </div>
              </div>

              <div className="tabs">
                <button className="activeTab">Détails</button>
                <button>Paiement</button>
                <button>Historique</button>
              </div>

              <div className="infoList">
                <Info icon={<Building2 size={18} />} label="Client" value={selectedDoc.client} />
                <Info icon={<Wallet size={18} />} label="Montant" value={selectedDoc.amount} />
                <Info icon={<CalendarDays size={18} />} label="Émission" value={selectedDoc.date} />
                <Info icon={<Clock3 size={18} />} label="Échéance" value={selectedDoc.due} />
                <Info icon={<Target size={18} />} label="Étape" value={selectedDoc.step} />
                <Info icon={<TrendingUp size={18} />} label="Probabilité" value={selectedDoc.probability} />
              </div>

              <div className="docInsight">
                <Sparkles size={20} />
                <strong>Recommandation IA</strong>
                <p>
                  {selectedDoc.nextAction}. Ce document peut améliorer votre conversion
                  ou votre trésorerie.
                </p>

                <button onClick={() => setAiOpen(true)}>
                  Générer une action
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

            <div className="card priorityCard">
              <div>
                <AlertTriangle size={24} />
                <h3>Priorité du jour</h3>
              </div>

              <p>
                Relancez les devis chauds, transformez les devis signés en factures,
                puis sécurisez les paiements en retard.
              </p>

              <button onClick={() => setAiOpen(true)}>
                Ouvrir le copilote
                <ArrowUpRight size={16} />
              </button>
            </div>
          </aside>
        </section>
      </section>

      {/* =====================================================
          REPÈRE 12 — COPILOTE IA FLOTTANT
      ===================================================== */}

      <button className="floatingAi" onClick={() => setAiOpen(true)}>
        <Sparkles size={22} />
      </button>

      {aiOpen && (
        <aside className="aiDrawer">
          <button className="closeAi" onClick={() => setAiOpen(false)}>
            <X size={18} />
          </button>

          <div className="drawerHead">
            <div className="drawerIcon">
              <Brain size={26} />
            </div>

            <div>
              <h3>Copilote Devis & Facturation</h3>
              <p>Que dois-je faire pour encaisser plus vite ?</p>
            </div>
          </div>

          <div className="drawerActions">
            <div>
              <strong>1. Relancer Beta LLC</strong>
              <p>Devis consulté plusieurs fois. Potentiel : 8 450 €.</p>
              <button>Envoyer relance</button>
            </div>

            <div>
              <strong>2. Transformer Delta Solutions en facture</strong>
              <p>Le devis est signé. Facturation immédiate recommandée.</p>
              <button>Créer facture</button>
            </div>

            <div>
              <strong>3. Sécuriser Gamma SARL</strong>
              <p>Facture impayée. Rappel paiement conseillé aujourd’hui.</p>
              <button>Envoyer rappel</button>
            </div>
          </div>
        </aside>
      )}

      {/* =====================================================
          REPÈRE 13 — CSS PREMIUM 10/10
      ===================================================== */}

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #050816;
          color: white;
          font-family: Inter, Arial, sans-serif;
          overflow-x: hidden;
        }

        .premiumBg {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(circle at 20% 10%, rgba(37,99,235,.2), transparent 30%),
            radial-gradient(circle at 80% 25%, rgba(147,51,234,.2), transparent 35%),
            radial-gradient(circle at 70% 90%, rgba(6,182,212,.13), transparent 35%);
          animation: bgMove 12s ease-in-out infinite alternate;
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 2;
          padding: 32px;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: center;
          margin-bottom: 24px;
        }

        .topbar h1 {
          margin: 0;
          font-size: 34px;
          letter-spacing: -0.04em;
        }

        .topbar p {
          margin: 8px 0 0;
          color: #94a3b8;
        }

        .topActions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .search {
          width: 420px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 16px;
          padding: 13px 16px;
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.1);
          backdrop-filter: blur(18px);
        }

        .search input,
        .miniSearch input,
        select {
          background: transparent;
          border: 0;
          outline: none;
          color: white;
        }

        .search input::placeholder,
        .miniSearch input::placeholder,
        .search small {
          color: #64748b;
        }

        .bell,
        .aiBtn {
          border: 0;
          color: white;
          cursor: pointer;
        }

        .bell {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: rgba(255,255,255,.06);
          animation: bellPulse 2.5s ease-in-out infinite;
        }

        .bell span {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 21px;
          height: 21px;
          border-radius: 50%;
          background: #ec4899;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .aiBtn {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 14px 18px;
          border-radius: 16px;
          font-weight: 800;
          background: linear-gradient(90deg,#2563eb,#9333ea);
          box-shadow: 0 0 28px rgba(147,51,234,.35);
        }

        .hero {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 28px;
          border-radius: 34px;
          padding: 48px;
          margin-bottom: 28px;
          background:
            linear-gradient(135deg, rgba(37,99,235,.92), rgba(147,51,234,.76)),
            radial-gradient(circle at right, rgba(255,255,255,.22), transparent 40%);
          box-shadow: 0 35px 100px rgba(79,70,229,.35);
          animation: heroEnter .9s ease both, heroGlow 6s ease-in-out infinite;
        }

        .hero > * {
          position: relative;
          z-index: 2;
        }

        .hero span {
          font-size: 13px;
          color: #dbeafe;
        }

        .hero h2 {
          margin: 12px 0;
          max-width: 900px;
          font-size: clamp(42px,5vw,70px);
          line-height: .95;
          letter-spacing: -0.06em;
        }

        .hero p {
          max-width: 850px;
          color: #dbeafe;
          line-height: 1.7;
        }

        .heroActions {
          margin-top: 26px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .heroActions button {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 0;
          color: white;
          border-radius: 16px;
          padding: 14px 18px;
          font-weight: 800;
          background: rgba(255,255,255,.18);
          cursor: pointer;
          transition: .25s ease;
        }

        .heroActions button:first-child {
          background: linear-gradient(90deg,#06b6d4,#2563eb);
        }

        .heroActions button:last-child {
          background: linear-gradient(90deg,#22c55e,#16a34a);
        }

        .heroActions button:hover {
          transform: translateY(-3px) scale(1.03);
        }

        .heroSignal {
          align-self: center;
          padding: 22px;
          background: rgba(255,255,255,.14);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 22px;
        }

        .heroSignal p {
          margin-bottom: 0;
        }

        .kpiGrid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 24px;
          margin-bottom: 28px;
        }

        .kpi,
        .card {
          position: relative;
          overflow: hidden;
          background: rgba(255,255,255,.048);
          border: 1px solid rgba(255,255,255,.085);
          backdrop-filter: blur(18px);
          border-radius: 26px;
          box-shadow: 0 25px 80px rgba(0,0,0,.25);
        }

        .kpi {
          min-height: 160px;
          padding: 28px;
          transition: .28s ease;
          animation: cardEnter .7s ease both;
        }

        .kpi:hover,
        .card:hover {
          transform: translateY(-5px);
          border-color: rgba(255,255,255,.14);
        }

        .kpiTop {
          display: flex;
          justify-content: space-between;
        }

        .kpi p {
          color: #cbd5e1;
          margin: 0;
        }

        .kpi h3 {
          margin: 13px 0;
          font-size: 36px;
        }

        .kpiIcon {
          width: 58px;
          height: 58px;
          border-radius: 19px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,.08);
          animation: softFloat 4s ease-in-out infinite;
        }

        .trend {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #22c55e;
        }

        .sparkline {
          position: absolute;
          right: -20px;
          bottom: -30px;
          width: 170px;
          height: 100px;
          border-radius: 50%;
          filter: blur(35px);
          opacity: .48;
        }

        .blue .sparkline { background:#2563eb; }
        .green .sparkline { background:#22c55e; }
        .purple .sparkline { background:#a855f7; }
        .pink .sparkline { background:#ec4899; }

        .mainGrid {
          display: grid;
          grid-template-columns: 1.55fr 420px;
          gap: 28px;
        }

        .mainColumn,
        .sideColumn {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .card {
          padding: 28px;
          transition: .28s ease;
          animation: cardEnter .8s ease both;
        }

        .cardHeader,
        .tableHeader {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 22px;
        }

        .cardHeader h3,
        .tableHeader h3 {
          margin: 0;
          font-size: 23px;
        }

        .cardHeader p,
        .tableHeader p {
          margin: 7px 0 0;
          color: #94a3b8;
        }

        .aiActions {
          display: grid;
          gap: 14px;
        }

        .aiAction {
          display: grid;
          grid-template-columns: 38px 1fr auto;
          gap: 14px;
          align-items: center;
          padding: 16px;
          border-radius: 18px;
          background: rgba(255,255,255,.04);
        }

        .aiAction p {
          color: #94a3b8;
          margin: 5px 0 0;
        }

        .aiAction button,
        .aiAction a {
          border: 0;
          color: #050816;
          background: white;
          padding: 10px 13px;
          border-radius: 12px;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
        }

        .urgent {
          background: linear-gradient(90deg, rgba(245,158,11,.13), rgba(147,51,234,.08));
        }

        .journey {
          display: grid;
          grid-template-columns: repeat(8,1fr);
          gap: 12px;
        }

        .journeyStep {
          position: relative;
          border: 0;
          color: white;
          padding: 14px 10px;
          border-radius: 18px;
          background: rgba(255,255,255,.04);
          cursor: pointer;
          transition: .25s ease;
        }

        .journeyStep:hover,
        .activeStep {
          background: linear-gradient(145deg, rgba(37,99,235,.25), rgba(147,51,234,.2));
          box-shadow: 0 0 26px rgba(147,51,234,.25);
          transform: translateY(-4px);
        }

        .stepIcon {
          width: 42px;
          height: 42px;
          margin: 0 auto 10px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg,#2563eb,#9333ea);
        }

        .journeyStep strong,
        .journeyStep small,
        .journeyStep span {
          display: block;
        }

        .journeyStep small {
          color: #94a3b8;
          margin-top: 6px;
        }

        .journeyStep span {
          margin-top: 7px;
          color: #d8b4fe;
          font-weight: 800;
        }

        .connector {
          position: absolute;
          right: -12px;
          top: 50%;
          color: #64748b;
        }

        .journeyDetails {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          gap: 18px;
          padding: 18px;
          border-radius: 18px;
          background: rgba(255,255,255,.04);
        }

        .journeyDetails span {
          color: #94a3b8;
        }

        .journeyDetails h4 {
          margin: 6px 0;
          font-size: 24px;
        }

        .clientChips {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .clientChips span {
          padding: 9px 12px;
          border-radius: 999px;
          background: rgba(147,51,234,.18);
          color: #ddd6fe;
        }

        .filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .miniSearch,
        select,
        .filters button {
          height: 44px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 14px;
          padding: 0 14px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          color: white;
        }

        .table {
          overflow-x: auto;
        }

        .tableRow {
          min-width: 920px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr 130px 90px;
          gap: 18px;
          align-items: center;
          padding: 16px 14px;
          border-bottom: 1px solid rgba(255,255,255,.06);
          transition: .25s ease;
        }

        .tableRow:not(.tableHead) {
          cursor: pointer;
        }

        .tableRow:not(.tableHead):hover,
        .tableRow.selected {
          background: rgba(37,99,235,.12);
          border-radius: 16px;
          transform: translateX(4px);
        }

        .tableHead {
          color: #94a3b8;
          text-transform: uppercase;
          font-size: 12px;
        }

        .docCell {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .docIcon,
        .bigDocIcon {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg,#2563eb,#9333ea);
          box-shadow: 0 0 22px rgba(147,51,234,.35);
        }

        .docIcon {
          width: 42px;
          height: 42px;
          border-radius: 14px;
        }

        .docCell small {
          display: block;
          color: #94a3b8;
          margin-top: 4px;
        }

        .status {
          width: fit-content;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 13px;
        }

        .status.payee,
        .status.signe {
          color: #34d399;
          background: rgba(16,185,129,.12);
        }

        .status.en-attente {
          color: #fbbf24;
          background: rgba(245,158,11,.12);
        }

        .status.a-relancer {
          color: #c084fc;
          background: rgba(147,51,234,.14);
        }

        .status.impayee {
          color: #fb7185;
          background: rgba(236,72,153,.12);
        }

        .rowActions {
          display: flex;
          gap: 8px;
        }

        .rowActions button {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.04);
          color: white;
        }

        .docMain {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .bigDocIcon {
          width: 76px;
          height: 76px;
          border-radius: 24px;
        }

        .docMain h3 {
          margin: 0;
          font-size: 24px;
        }

        .docMain p {
          margin: 5px 0 10px;
          color: #94a3b8;
        }

        .tabs {
          margin: 26px 0;
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 8px;
        }

        .tabs button {
          border: 0;
          background: transparent;
          color: #94a3b8;
          padding: 10px;
          border-bottom: 2px solid transparent;
        }

        .activeTab {
          color: white !important;
          border-color: #9333ea !important;
        }

        .infoList {
          display: grid;
          gap: 14px;
        }

        .infoItem {
          display: flex;
          gap: 14px;
          padding: 14px;
          border-radius: 16px;
          background: rgba(255,255,255,.035);
        }

        .infoItem .icon {
          color: #a78bfa;
        }

        .infoItem p {
          margin: 0 0 5px;
          color: #94a3b8;
          font-size: 13px;
        }

        .docInsight {
          margin-top: 22px;
          padding: 18px;
          border-radius: 20px;
          background: linear-gradient(145deg, rgba(147,51,234,.18), rgba(37,99,235,.12));
        }

        .docInsight p,
        .priorityCard p {
          color: #cbd5e1;
          line-height: 1.6;
        }

        .docInsight button,
        .priorityCard button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 0;
          border-radius: 14px;
          padding: 13px 15px;
          font-weight: 800;
          color: #050816;
          background: white;
        }

        .priorityCard {
          background: linear-gradient(145deg, rgba(245,158,11,.14), rgba(147,51,234,.12));
        }

        .priorityCard div {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .floatingAi {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 30;
          width: 62px;
          height: 62px;
          border-radius: 22px;
          border: 0;
          color: white;
          background: linear-gradient(135deg,#2563eb,#9333ea);
          box-shadow: 0 0 40px rgba(147,51,234,.55);
          animation: softFloat 3s ease-in-out infinite;
        }

        .aiDrawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 430px;
          height: 100vh;
          z-index: 50;
          padding: 28px;
          background: rgba(5,9,22,.96);
          border-left: 1px solid rgba(255,255,255,.1);
          backdrop-filter: blur(24px);
          animation: slideIn .35s ease both;
        }

        .closeAi {
          position: absolute;
          right: 22px;
          top: 22px;
          width: 38px;
          height: 38px;
          border-radius: 12px;
          border: 0;
          color: white;
          background: rgba(255,255,255,.06);
        }

        .drawerHead {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 30px;
        }

        .drawerIcon {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg,#2563eb,#9333ea);
        }

        .drawerHead h3 {
          margin: 0;
        }

        .drawerHead p {
          margin: 5px 0 0;
          color: #94a3b8;
        }

        .drawerActions {
          display: grid;
          gap: 16px;
        }

        .drawerActions div {
          padding: 18px;
          border-radius: 20px;
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.08);
        }

        .drawerActions p {
          color: #94a3b8;
          line-height: 1.6;
        }

        .drawerActions button {
          color: #050816;
          background: white;
          padding: 10px 13px;
          border-radius: 12px;
          border: 0;
          font-weight: 800;
        }

        @keyframes bgMove {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }

        @keyframes heroEnter {
          from { opacity: 0; transform: translateY(24px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroGlow {
          0%,100% { box-shadow: 0 35px 100px rgba(79,70,229,.35); }
          50% { box-shadow: 0 35px 125px rgba(168,85,247,.5); }
        }

        @keyframes bellPulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        @keyframes softFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @media (max-width: 1400px) {
          .kpiGrid { grid-template-columns: repeat(2,1fr); }
          .mainGrid { grid-template-columns: 1fr; }
          .hero { grid-template-columns: 1fr; }
          .journey { grid-template-columns: repeat(4,1fr); }
        }

        @media (max-width: 980px) {
          .content { padding: 20px; }
          .topbar { flex-direction: column; align-items: flex-start; }
          .topActions { width: 100%; flex-wrap: wrap; }
          .search { width: 100%; }
          .hero h2 { font-size: 42px; }
          .kpiGrid { grid-template-columns: 1fr; }
          .journey { grid-template-columns: repeat(2,1fr); }
          .aiDrawer { width: 100%; }
        }
      `}</style>
    </main>
  );
}

/* =========================================================
   REPÈRE 14 — COMPOSANT INFO
========================================================= */

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="infoItem">
      <div className="icon">{icon}</div>

      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function cleanStatus(status: string) {
  return status
    .toLowerCase()
    .replace("é", "e")
    .replace("à", "a")
    .replace(" ", "-");
}
