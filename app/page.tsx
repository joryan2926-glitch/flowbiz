"use client";

import "./dashboard.css";

import Link from "next/link";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import FloatingAI from "./components/FloatingAI";

import {
  AlertTriangle,
  BarChart3,
  Bell,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Plus,
  Receipt,
  Search,
  Send,
  Sparkles,
  Target,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const modes = ["CEO", "Commercial", "Comptable"] as const;

const pipeline = [
  "Prospect",
  "RDV",
  "Proposition",
  "Devis",
  "Signature",
  "Paiement",
  "Facture",
  "Fidélisation",
];

export default function DashboardPage() {
  const [mode, setMode] = useState<(typeof modes)[number]>("CEO");
  const [selectedStep, setSelectedStep] = useState("Prospect");
  const [aiOpen, setAiOpen] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  return (
    <div className="dashboardLayout">
      <Sidebar onOpenAI={() => setAiOpen(true)} />

      <main className="mainContent">
        <header className="topbar">
          <div>
            <h2>Bienvenue, Jordan 👋</h2>
            <p>Votre cockpit intelligent de pilotage business.</p>
          </div>

          <div className="topActions">
            <div className="modeSwitch">
              {modes.map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={mode === item ? "modeActive" : ""}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="searchBar">
              <Search size={18} />
              <input placeholder="Rechercher client, facture, action..." />
            </div>

            <button className="notifBtn">
              <Bell size={18} />
              <span>4</span>
            </button>

            <button className="iaTopBtn" onClick={() => setAiOpen(true)}>
              <Sparkles size={18} />
              Copilote FlowBiz
            </button>
          </div>
        </header>

        <section className="heroCard">
          <div className="heroGlow" />
          <img src="/flowbiz-logo.png" alt="FlowBiz" className="heroLogo" />

          <div className="heroContent">
            <span>
              {mode === "CEO" && "FlowBiz CEO Dashboard"}
              {mode === "Commercial" && "FlowBiz Sales Dashboard"}
              {mode === "Comptable" && "FlowBiz Finance Dashboard"}
            </span>

            <h1>
              {mode === "CEO" && "Votre cockpit business intelligent"}
              {mode === "Commercial" && "Votre moteur commercial intelligent"}
              {mode === "Comptable" && "Votre pilotage financier intelligent"}
            </h1>

            <p>
              {mode === "CEO" &&
                "Analysez, décidez et pilotez votre activité depuis une seule plateforme : clients, devis, paiements, automatisations et IA."}
              {mode === "Commercial" &&
                "Transformez vos prospects en clients grâce au suivi du tunnel, aux relances IA, aux devis connectés et aux opportunités priorisées."}
              {mode === "Comptable" &&
                "Surveillez encaissements, factures, TVA, rapprochements bancaires, trésorerie et alertes financières en temps réel."}
            </p>

            <div className="heroButtons">
              <button className="primaryBtn" onClick={() => setModal("devis")}>
                <Plus size={18} />
                Nouveau devis
              </button>

              <Link href="/clients" className="secondaryBtn">
                <Users size={18} />
                Voir clients
              </Link>

              <button className="greenBtn" onClick={() => setAiOpen(true)}>
                <BrainCircuit size={18} />
                Demander à l’IA
              </button>
            </div>
          </div>

          <div className="heroSignal">
            <Sparkles size={24} />
            <h3>3 actions prioritaires</h3>
            <p>8 450 € peuvent être débloqués cette semaine.</p>
          </div>
        </section>

        <section className="statsGrid">
          {mode === "CEO" && (
            <>
              <Stat title="Chiffre d’affaires" value="23 850 €" text="+12.5% ce mois" icon={<Wallet />} color="blue" />
              <Stat title="Factures en attente" value="5 680 €" text="3 relances à faire" icon={<Receipt />} color="purple" />
              <Stat title="Clients actifs" value="128" text="+6 nouveaux" icon={<Users />} color="green" />
              <Stat title="Bénéfice net" value="8 950 €" text="Marge en hausse" icon={<BarChart3 />} color="pink" />
            </>
          )}

          {mode === "Commercial" && (
            <>
              <Stat title="Prospects chauds" value="24" text="+5 opportunités" icon={<Users />} color="blue" />
              <Stat title="Devis ouverts" value="12" text="15 680 € à convertir" icon={<FileText />} color="purple" />
              <Stat title="Conversion" value="34%" text="+8% ce mois" icon={<Target />} color="green" />
              <Stat title="Relances urgentes" value="3" text="À traiter aujourd’hui" icon={<AlertTriangle />} color="pink" />
            </>
          )}

          {mode === "Comptable" && (
            <>
              <Stat title="Encaissements" value="24 950 €" text="+9.4% ce mois" icon={<Wallet />} color="green" />
              <Stat title="À rapprocher" value="7" text="Transactions bancaires" icon={<BarChart3 />} color="blue" />
              <Stat title="TVA estimée" value="3 650 €" text="À prévoir" icon={<Receipt />} color="purple" />
              <Stat title="Retards paiement" value="3" text="2 450 € à sécuriser" icon={<AlertTriangle />} color="pink" />
            </>
          )}
        </section>

        <section className="dashboardFocusGrid">
          <section className="card">
            <div className="sectionHeader">
              <div>
                <h3>Parcours client intelligent</h3>
                <p>{selectedStep} sélectionné · tunnel complet connecté au CRM.</p>
              </div>
              <Target size={24} />
            </div>

            <div className="pipelineGrid">
              {pipeline.map((step, index) => (
                <button
                  key={step}
                  onClick={() => setSelectedStep(step)}
                  className={selectedStep === step ? "pipelineStep activePipe" : "pipelineStep"}
                >
                  <strong>{index + 1}</strong>
                  <span>{step}</span>
                </button>
              ))}
            </div>

            <div className="pipelineInsight">
              <Sparkles size={18} />
              <p>
                IA : l’étape <strong>{selectedStep}</strong> contient des opportunités à prioriser.
              </p>
              <Link href="/clients">Voir CRM</Link>
            </div>
          </section>

          <section className="card">
            <div className="sectionHeader">
              <div>
                <h3>Actions aujourd’hui</h3>
                <p>Priorités opérationnelles immédiates.</p>
              </div>
              <BrainCircuit size={24} />
            </div>

            <div className="todayActions">
              <button onClick={() => setModal("relance")}>
                <AlertTriangle size={20} />
                <div>
                  <strong>Relancer 3 devis</strong>
                  <span>Potentiel : 8 450 €</span>
                </div>
                <em>Factures</em>
              </button>

              <Link href="/finance">
                <Wallet size={20} />
                <div>
                  <strong>Vérifier banque</strong>
                  <span>2 transactions à rapprocher</span>
                </div>
                <em>Finance</em>
              </Link>

              <button onClick={() => setAiOpen(true)}>
                <Sparkles size={20} />
                <div>
                  <strong>Analyse IA du jour</strong>
                  <span>Résumé business automatique</span>
                </div>
                <em>IA</em>
              </button>
            </div>
          </section>
        </section>

        <section className="dashboardGrid">
          <section className="card">
            <div className="sectionHeader">
              <div>
                <h3>Automatisations actives</h3>
                <p>Relances, signatures, paiements et comptabilité.</p>
              </div>
              <Zap size={24} />
            </div>

            <div className="automationList">
              <Automation title="Devis ouvert 7 jours" action="Envoyer relance IA" status="Actif" />
              <Automation title="Facture payée" action="Mettre à jour Finance + Comptabilité" status="Actif" />
              <Automation title="Nouveau client" action="Créer dossier CRM + proposition" status="Prêt" />
            </div>
          </section>

          <section className="card">
            <div className="sectionHeader">
              <div>
                <h3>Préconisations IA</h3>
                <p>Recommandations stratégiques FlowBiz.</p>
              </div>
              <Sparkles size={24} />
            </div>

            <div className="recommendationList">
              <div>
                <strong>2 clients génèrent 41% du CA</strong>
                <p>Diversifier votre portefeuille client.</p>
                <Link href="/clients">Analyser</Link>
              </div>

              <div>
                <strong>MRR potentiel détecté</strong>
                <p>3 prestations peuvent devenir des abonnements.</p>
                <Link href="/factures">Créer offres</Link>
              </div>

              <div>
                <strong>Trésorerie stable 21 jours</strong>
                <p>Vous pouvez lancer une campagne commerciale.</p>
                <Link href="/finance">Voir finance</Link>
              </div>
            </div>
          </section>
        </section>

        <section className="card shortcutsPanel">
          <div className="sectionHeader">
            <div>
              <h3>Raccourcis connectés</h3>
              <p>Chaque action prépare une connexion future Supabase / Stripe / IA.</p>
            </div>
            <Plus size={24} />
          </div>

          <div className="shortcutGrid">
            <button onClick={() => setModal("client")}>Ajouter client</button>
            <button onClick={() => setModal("devis")}>Créer devis</button>
            <Link href="/factures">Voir factures</Link>
            <Link href="/finance">Voir banque</Link>
            <Link href="/comptabilite">Rapport comptable</Link>
            <button onClick={() => setAiOpen(true)}>Ouvrir IA</button>
          </div>
        </section>
      </main>

      <FloatingAI onClick={() => setAiOpen(true)} />

      {aiOpen && (
        <aside className="aiDrawer">
          <button className="closeAi" onClick={() => setAiOpen(false)}>
            <X size={18} />
          </button>

          <div className="drawerHead">
            <img src="/flowbiz-logo.png" alt="FlowBiz" />
            <div>
              <h3>Copilote IA FlowBiz</h3>
              <p>Que dois-je faire maintenant ?</p>
            </div>
          </div>

          <div className="drawerList">
            <div>
              <strong>1. Relancer Acme Corp</strong>
              <p>Dernière interaction il y a 9 jours. Potentiel : 4 200 €.</p>
              <Link href="/factures">Préparer relance</Link>
            </div>

            <div>
              <strong>2. Transformer devis en facture</strong>
              <p>Deux opportunités ont une forte probabilité de signature.</p>
              <Link href="/factures">Voir devis</Link>
            </div>

            <div>
              <strong>3. Vérifier trésorerie</strong>
              <p>Une sortie importante arrive dans 5 jours.</p>
              <Link href="/finance">Voir finance</Link>
            </div>
          </div>
        </aside>
      )}

      {modal && (
        <div className="modalOverlay">
          <div className="actionModal">
            <button className="closeAi" onClick={() => setModal(null)}>
              <X size={18} />
            </button>

            <div className="modalIcon">
              {modal === "client" ? <Users /> : modal === "relance" ? <Send /> : <FileText />}
            </div>

            <h3>
              {modal === "client" && "Ajouter un client"}
              {modal === "devis" && "Créer un devis"}
              {modal === "relance" && "Relancer les devis"}
            </h3>

            <p>Action préparée. Connexion future : CRM, factures, finance, automatisations et IA.</p>

            <div className="modalFields">
              <input placeholder="Nom du client / entreprise" />
              <input placeholder="Montant / objectif" />
              <input placeholder="Service ou prestation" />
            </div>

            <div className="modalActions">
              <button onClick={() => setModal(null)}>Annuler</button>
              <Link href={modal === "client" ? "/clients" : "/factures"}>Continuer</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ title, value, text, icon, color }: any) {
  return (
    <div className="statCard">
      <div className="statTop">
        <div>
          <p>{title}</p>
          <h2>{value}</h2>
          <span>{text}</span>
        </div>
        <div className={`statIcon ${color}`}>{icon}</div>
      </div>
      <div className={`miniLine ${color}`} />
    </div>
  );
}

function Automation({ title, action, status }: any) {
  return (
    <div className="automationItem">
      <div>
        <strong>{title}</strong>
        <p>→ {action}</p>
      </div>
      <span>{status}</span>
    </div>
  );
}
