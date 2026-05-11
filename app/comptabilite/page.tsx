"use client";

import "./comptabilite.css";

import Link from "next/link";
import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import FloatingAI from "../components/FloatingAI";

import {
  AlertTriangle,
  BadgeEuro,
  Banknote,
  BarChart3,
  Bell,
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Landmark,
  LineChart,
  PieChart,
  Plus,
  Receipt,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

type AccountingStatus =
  | "À valider"
  | "Validé"
  | "À rapprocher"
  | "Anomalie"
  | "Exporté"
  | "En attente";

type AccountingView =
  | "CEO"
  | "TVA"
  | "Bilan"
  | "Écritures";

const views: AccountingView[] = [
  "CEO",
  "TVA",
  "Bilan",
  "Écritures",
];

const accountingPath = [
  "Facture",
  "Paiement",
  "Rapprochement",
  "Écriture",
  "TVA",
  "Bilan",
  "Export",
];

const entries = [
  {
    id: "EC-2026-001",
    label: "Facture Acme Corp",
    client: "Acme Corp",
    account: "706 - Prestations de services",
    amount: 4250,
    vat: 850,
    date: "07/05/2026",
    status: "Validé" as AccountingStatus,
    source: "Facture FAC-2026-0142",
    risk: "Aucun",
  },
  {
    id: "EC-2026-002",
    label: "Paiement Stripe Innovatech",
    client: "Innovatech",
    account: "512 - Banque",
    amount: 1200,
    vat: 240,
    date: "06/05/2026",
    status: "À rapprocher" as AccountingStatus,
    source: "Stripe",
    risk: "Rapprochement requis",
  },
  {
    id: "EC-2026-003",
    label: "Abonnement Canva Pro",
    client: "Interne",
    account: "626 - Services numériques",
    amount: -89,
    vat: -17.8,
    date: "05/05/2026",
    status: "À valider" as AccountingStatus,
    source: "Carte bancaire",
    risk: "Justificatif manquant",
  },
  {
    id: "EC-2026-004",
    label: "Prélèvement OVH",
    client: "Interne",
    account: "613 - Hébergement",
    amount: -127,
    vat: -25.4,
    date: "04/05/2026",
    status: "Anomalie" as AccountingStatus,
    source: "Banque",
    risk: "Catégorie à vérifier",
  },
];

const vatItems = [
  {
    label: "TVA collectée",
    value: "4 860 €",
    text: "Sur ventes facturées",
    color: "blue",
  },
  {
    label: "TVA déductible",
    value: "1 210 €",
    text: "Sur dépenses validées",
    color: "green",
  },
  {
    label: "TVA à payer",
    value: "3 650 €",
    text: "Prévision prochaine période",
    color: "purple",
  },
];

const controls = [
  {
    title: "Justificatifs manquants",
    value: "4",
    text: "À récupérer avant export",
    level: "Attention",
  },
  {
    title: "Écritures en anomalie",
    value: "2",
    text: "Catégorisation à vérifier",
    level: "Urgent",
  },
  {
    title: "Factures non rapprochées",
    value: "5",
    text: "Impact banque + TVA",
    level: "À traiter",
  },
];

const automations = [
  {
    rule: "SI facture payée",
    action: "Créer écriture comptable + rapprocher banque",
    status: "Actif",
  },
  {
    rule: "SI dépense détectée",
    action: "Classer compte comptable + demander justificatif",
    status: "Actif",
  },
  {
    rule: "SI TVA proche échéance",
    action: "Créer alerte CEO + estimation à payer",
    status: "Prêt",
  },
  {
    rule: "SI anomalie comptable",
    action: "Bloquer export et demander validation",
    status: "Actif",
  },
];

const quality = [
  { label: "Écritures validées", value: "91%", text: "Qualité élevée" },
  { label: "Justificatifs complets", value: "84%", text: "À améliorer" },
  { label: "Rapprochement banque", value: "76%", text: "5 actions" },
  { label: "Risque fiscal", value: "Faible", text: "Sous contrôle" },
];

export default function ComptabilitePage() {
  const [view, setView] = useState<AccountingView>("CEO");
  const [selectedStep, setSelectedStep] = useState("Écriture");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [aiOpen, setAiOpen] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState(entries[0]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchSearch =
        entry.label.toLowerCase().includes(query.toLowerCase()) ||
        entry.client.toLowerCase().includes(query.toLowerCase()) ||
        entry.account.toLowerCase().includes(query.toLowerCase()) ||
        entry.status.toLowerCase().includes(query.toLowerCase());

      const matchFilter =
        filter === "Tous" ||
        entry.status === filter;

      return matchSearch && matchFilter;
    });
  }, [query, filter]);

  const totalRevenue = 38450;
  const totalExpenses = 9710;
  const profit = totalRevenue - totalExpenses;
  const vatToPay = 3650;

  return (
    <div className="accountingLayout">
      <Sidebar onOpenAI={() => setAiOpen(true)} />

      <main className="mainContent">
        <header className="topbar accountingTopbar">
          <div>
            <h2>Comptabilité</h2>
            <p>
              Écritures, TVA, justificatifs, bilan, export comptable et contrôle qualité IA.
            </p>
          </div>

          <div className="topActions">
            <div className="accountingViewSwitch">
              {views.map((item) => (
                <button
                  key={item}
                  onClick={() => setView(item)}
                  className={view === item ? "activeAccountingView" : ""}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="searchBar">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher écriture, facture, compte, TVA..."
              />
            </div>

            <button className="notifBtn">
              <Bell size={18} />
              <span>5</span>
            </button>

            <button
              className="iaTopBtn"
              onClick={() => setAiOpen(true)}
            >
              <Sparkles size={18} />
              IA Comptable
            </button>
          </div>
        </header>

        <section className="accountingHero">
          <div className="heroGlow" />

          <div className="flowbizOrb" />
          <div className="flowbizRing one" />
          <div className="flowbizRing two" />

          <img
            src="/flowbiz-logo.png"
            alt="FlowBiz"
            className="flowbizLogoFloat hero"
          />

          <img
            src="/flowbiz-logo.png"
            alt=""
            className="flowbizWatermark"
          />

          <div className="flowbizParticles">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="accountingHeroContent">
            <span>FlowBiz Accounting Command Center</span>

            <h1>
              Votre pilotage comptable intelligent
            </h1>

            <p>
              Automatisez vos écritures, contrôlez la TVA, rapprochez vos paiements,
              sécurisez vos justificatifs et préparez vos exports comptables avec l’IA.
            </p>

            <div className="heroButtons">
              <button
                className="primaryBtn"
                onClick={() => setModal("ecriture")}
              >
                <Plus size={18} />
                Nouvelle écriture
              </button>

              <button
                className="secondaryBtn"
                onClick={() => setModal("export")}
              >
                <Download size={18} />
                Export comptable
              </button>

              <button
                className="greenBtn"
                onClick={() => setAiOpen(true)}
              >
                <BrainCircuit size={18} />
                Contrôle IA
              </button>
            </div>
          </div>

          <div className="accountingHeroVisual">
            <div className="accountingCube">
              <BookOpenCheck size={72} />
            </div>

            <div className="accountingOrbit one" />
            <div className="accountingOrbit two" />
          </div>

          <aside className="accountingHeroPanel">
            <h3>Préconisations IA</h3>

            <button onClick={() => setModal("justificatif")}>
              <span>
                <FileCheck2 size={18} />
              </span>
              <div>
                <strong>4 justificatifs manquants</strong>
                <p>À récupérer avant export.</p>
              </div>
            </button>

            <button onClick={() => setModal("tva")}>
              <span>
                <Receipt size={18} />
              </span>
              <div>
                <strong>TVA à payer estimée</strong>
                <p>3 650 € à prévoir.</p>
              </div>
            </button>

            <button onClick={() => setAiOpen(true)}>
              <span>
                <Sparkles size={18} />
              </span>
              <div>
                <strong>2 anomalies détectées</strong>
                <p>Contrôle comptable recommandé.</p>
              </div>
            </button>
          </aside>
        </section>

        <section className="statsGrid accountingStats">
          <Stat
            title="CA comptabilisé"
            value={`${totalRevenue.toLocaleString("fr-FR")} €`}
            text="+14% ce mois"
            icon={<BadgeEuro />}
            color="blue"
          />

          <Stat
            title="Dépenses validées"
            value={`${totalExpenses.toLocaleString("fr-FR")} €`}
            text="91% catégorisées"
            icon={<Wallet />}
            color="purple"
          />

          <Stat
            title="Résultat estimé"
            value={`${profit.toLocaleString("fr-FR")} €`}
            text="Marge nette positive"
            icon={<TrendingUp />}
            color="green"
          />

          <Stat
            title="TVA à payer"
            value={`${vatToPay.toLocaleString("fr-FR")} €`}
            text="Échéance à préparer"
            icon={<Receipt />}
            color="pink"
          />
        </section>

        <section className="accountingMainGrid">
          <div className="accountingLeft">
            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Parcours comptable client</h3>
                  <p>
                    {selectedStep} sélectionné · facture, paiement, écriture, TVA et export.
                  </p>
                </div>

                <Target size={24} />
              </div>

              <div className="accountingJourney">
                {accountingPath.map((step, index) => (
                  <button
                    key={step}
                    onClick={() => setSelectedStep(step)}
                    className={
                      selectedStep === step
                        ? "accountingStep activeAccountingStep"
                        : "accountingStep"
                    }
                  >
                    <strong>{index + 1}</strong>
                    <span>{step}</span>
                  </button>
                ))}
              </div>

              <div className="accountingJourneyDetails">
                <div>
                  <span>Étape actuelle</span>
                  <strong>{selectedStep}</strong>

                  <div className="progressBar">
                    <i
                      style={{
                        width:
                          selectedStep === "Écriture"
                            ? "58%"
                            : selectedStep === "Export"
                              ? "100%"
                              : "42%",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <span>Prochaine action</span>
                  <strong>
                    {selectedStep === "Écriture"
                      ? "Validation TVA"
                      : "Contrôle automatique"}
                  </strong>
                  <p>2 anomalies doivent être vérifiées avant export.</p>
                </div>
              </div>
            </section>

            <section className="card accountingFlowCard">
              <div className="sectionHeader">
                <div>
                  <h3>Flux comptable mensuel</h3>
                  <p>Ventes, dépenses, TVA et résultat prévisionnel.</p>
                </div>

                <BarChart3 size={24} />
              </div>

              <div className="accountingBars">
                {[48, 56, 68, 42, 72, 88, 63, 74, 52, 91, 66, 78, 45, 83, 57, 94, 70, 61].map(
                  (height, index) => (
                    <span
                      key={index}
                      className={
                        index % 5 === 0
                          ? "accountingBar orange"
                          : index % 3 === 0
                            ? "accountingBar purple"
                            : "accountingBar green"
                      }
                      style={{
                        height: `${height}%`,
                        animationDelay: `${index * 0.04}s`,
                      }}
                    />
                  )
                )}
              </div>

              <div className="accountingLegend">
                <span>
                  <i className="greenDot" />
                  Produits : 38 450 €
                </span>

                <span>
                  <i className="orangeDot" />
                  Charges : 9 710 €
                </span>

                <strong>
                  Résultat : +28 740 €
                </strong>
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Écritures comptables</h3>
                  <p>
                    {filteredEntries.length} écriture(s) affichée(s), connectées aux factures et banques.
                  </p>
                </div>

                <div className="filterMini">
                  {["Tous", "À valider", "À rapprocher", "Validé", "Anomalie"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={filter === item ? "activeFilterMini" : ""}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="entryList">
                {filteredEntries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={
                      selectedEntry.id === entry.id
                        ? "entryRow activeEntry"
                        : "entryRow"
                    }
                  >
                    <div className="entryIcon">
                      {entry.amount >= 0 ? (
                        <Receipt size={20} />
                      ) : (
                        <Wallet size={20} />
                      )}
                    </div>

                    <div>
                      <h4>{entry.label}</h4>
                      <p>{entry.account}</p>
                    </div>

                    <span className={`accountingBadge ${entry.status.replace(" ", "").toLowerCase()}`}>
                      {entry.status}
                    </span>

                    <strong className={entry.amount >= 0 ? "amountIn" : "amountOut"}>
                      {entry.amount > 0 ? "+" : ""}
                      {entry.amount.toLocaleString("fr-FR")} €
                    </strong>

                    <em>{entry.risk}</em>
                  </button>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Automatisations comptables</h3>
                  <p>Moins d’erreurs, moins d’oublis, plus de contrôle.</p>
                </div>

                <Zap size={24} />
              </div>

              <div className="automationList">
                {automations.map((item) => (
                  <div
                    className="automationItem"
                    key={item.rule}
                  >
                    <div>
                      <strong>{item.rule}</strong>
                      <p>→ {item.action}</p>
                    </div>

                    <span>{item.status}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="accountingRight">
            <section className="card entryPanel">
              <div className="panelTop">
                <div className="bigEntryIcon">
                  <BookOpenCheck size={28} />
                </div>

                <div>
                  <h3>{selectedEntry.id}</h3>
                  <p>{selectedEntry.client}</p>
                </div>

                <span className={`accountingBadge ${selectedEntry.status.replace(" ", "").toLowerCase()}`}>
                  {selectedEntry.status}
                </span>
              </div>

              <div className="entryPreview">
                <div className="previewTop">
                  <img
                    src="/flowbiz-logo.png"
                    alt="FlowBiz"
                  />

                  <div>
                    <strong>Écriture comptable</strong>
                    <span>{selectedEntry.account}</span>
                  </div>
                </div>

                <div className="previewLine" />

                <p>{selectedEntry.label}</p>

                <h4>
                  {selectedEntry.amount.toLocaleString("fr-FR")} €
                </h4>

                <small>
                  TVA : {selectedEntry.vat.toLocaleString("fr-FR")} € · {selectedEntry.date}
                </small>
              </div>

              <div className="entryData">
                <div>
                  <FileText size={17} />
                  <span>Source : {selectedEntry.source}</span>
                </div>

                <div>
                  <Receipt size={17} />
                  <span>Compte : {selectedEntry.account}</span>
                </div>

                <div>
                  <CalendarDays size={17} />
                  <span>Date : {selectedEntry.date}</span>
                </div>

                <div>
                  <AlertTriangle size={17} />
                  <span>{selectedEntry.risk}</span>
                </div>
              </div>

              <div className="panelActions">
                <button onClick={() => setModal("validation")}>
                  <CheckCircle2 size={16} />
                  Valider
                </button>

                <button onClick={() => setModal("justificatif")}>
                  <FileCheck2 size={16} />
                  Justificatif
                </button>

                <button onClick={() => setAiOpen(true)}>
                  <Sparkles size={16} />
                  Analyse
                </button>
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>TVA & échéances</h3>
                  <p>Prévision de déclaration.</p>
                </div>

                <Receipt size={24} />
              </div>

              <div className="vatList">
                {vatItems.map((item) => (
                  <div
                    className={`vatCard ${item.color}`}
                    key={item.label}
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Contrôle qualité</h3>
                  <p>Fiabilité comptable avant export.</p>
                </div>

                <ShieldCheck size={24} />
              </div>

              <div className="qualityGrid accountingQuality">
                {quality.map((item) => (
                  <div
                    className="qualityCard"
                    key={item.label}
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Alertes comptables</h3>
                  <p>À traiter avant clôture.</p>
                </div>

                <AlertTriangle size={24} />
              </div>

              <div className="controlList">
                {controls.map((item) => (
                  <div
                    className="controlRow"
                    key={item.title}
                  >
                    <span>
                      <AlertTriangle size={16} />
                    </span>

                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                    </div>

                    <em>{item.level}</em>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Modules connectés</h3>
                  <p>Comptabilité reliée à tout le parcours client.</p>
                </div>

                <LineChart size={24} />
              </div>

              <div className="moduleLinks">
                <Link href="/clients">
                  CRM client
                </Link>

                <Link href="/factures">
                  Devis & factures
                </Link>

                <Link href="/finance">
                  Finance & banque
                </Link>

                <Link href="/automatisation">
                  Automatisations
                </Link>
              </div>
            </section>
          </aside>
        </section>

        <section className="card accountingMission">
          <div>
            <strong>Mission comptable du jour</strong>
            <p>
              Valider 5 opérations, récupérer 4 justificatifs et sécuriser la TVA.
            </p>
          </div>

          <div className="missionProgress">
            <span>74%</span>

            <div>
              <i />
            </div>
          </div>

          <button onClick={() => setAiOpen(true)}>
            <Sparkles size={18} />
            Demander le plan IA
          </button>
        </section>
      </main>

      <FloatingAI onClick={() => setAiOpen(true)} />

      {modal && (
        <div className="modalOverlay">
          <div className="actionModal">
            <button
              className="closeAi"
              onClick={() => setModal(null)}
            >
              <X size={18} />
            </button>

            <div className="modalIcon">
              {modal === "export" ? (
                <Download />
              ) : modal === "justificatif" ? (
                <FileCheck2 />
              ) : modal === "tva" ? (
                <Receipt />
              ) : (
                <BookOpenCheck />
              )}
            </div>

            <h3>
              {modal === "ecriture" && "Créer une écriture comptable"}
              {modal === "export" && "Exporter la comptabilité"}
              {modal === "justificatif" && "Ajouter un justificatif"}
              {modal === "tva" && "Préparer la TVA"}
              {modal === "validation" && "Valider l’écriture"}
            </h3>

            <p>
              Action prête à connecter : factures, banque, TVA, justificatifs,
              bilan, expert-comptable et automatisations IA.
            </p>

            <div className="modalFields">
              <input placeholder="Libellé / source" />
              <input placeholder="Compte comptable" />
              <input placeholder="Montant / TVA" />
            </div>

            <div className="modalActions">
              <button onClick={() => setModal(null)}>
                Annuler
              </button>

              <Link href="/comptabilite">
                Continuer
              </Link>
            </div>
          </div>
        </div>
      )}

      {aiOpen && (
        <aside className="aiDrawer">
          <button
            className="closeAi"
            onClick={() => setAiOpen(false)}
          >
            <X size={18} />
          </button>

          <div className="drawerHead">
            <img
              src="/flowbiz-logo.png"
              alt="FlowBiz"
            />

            <div>
              <h3>Copilote Comptable FlowBiz</h3>
              <p>
                Contrôle, TVA, écritures, justificatifs et export.
              </p>
            </div>
          </div>

          <div className="drawerList">
            <div>
              <strong>1. Récupérer 4 justificatifs</strong>
              <p>
                Ils bloquent la qualité du dossier et peuvent empêcher l’export propre.
              </p>

              <button onClick={() => setModal("justificatif")}>
                Demander justificatifs
              </button>
            </div>

            <div>
              <strong>2. Vérifier 2 anomalies</strong>
              <p>
                Catégories comptables incertaines sur OVH et une dépense interne.
              </p>

              <button onClick={() => setModal("validation")}>
                Vérifier écritures
              </button>
            </div>

            <div>
              <strong>3. Préparer la TVA</strong>
              <p>
                TVA prévisionnelle : 3 650 €. Prévoir trésorerie et export.
              </p>

              <button onClick={() => setModal("tva")}>
                Préparer TVA
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function Stat({
  title,
  value,
  text,
  icon,
  color,
}: any) {
  return (
    <div className="statCard">
      <div className="statTop">
        <div>
          <p>{title}</p>
          <h2>{value}</h2>
          <span>{text}</span>
        </div>

        <div className={`statIcon ${color}`}>
          {icon}
        </div>
      </div>

      <div className={`miniLine ${color}`} />
    </div>
  );
}
