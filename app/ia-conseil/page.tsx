"use client";

import "./ia.css";

import Link from "next/link";
import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import FloatingAI from "../components/FloatingAI";

import {
  AlertTriangle,
  BarChart3,
  Bell,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Lightbulb,
  LineChart,
  MessageSquare,
  Plus,
  Rocket,
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

type IaMode = "CEO" | "Commercial" | "Finance" | "Organisation";
type Priority = "Urgent" | "Important" | "Optimisation" | "Opportunité";

const modes: IaMode[] = ["CEO", "Commercial", "Finance", "Organisation"];

const recommendations = [
  {
    title: "Relancer 3 devis ouverts",
    text: "Potentiel immédiat : 8 450 € à encaisser.",
    priority: "Urgent" as Priority,
    module: "/factures",
    action: "Préparer relance",
  },
  {
    title: "Transformer 2 prestations en abonnement",
    text: "MRR potentiel : +1 280 €/mois.",
    priority: "Opportunité" as Priority,
    module: "/clients",
    action: "Voir clients",
  },
  {
    title: "Rapprocher 5 opérations bancaires",
    text: "Améliore la fiabilité comptable et la trésorerie.",
    priority: "Important" as Priority,
    module: "/finance",
    action: "Voir finance",
  },
  {
    title: "Récupérer 4 justificatifs",
    text: "Prépare l’export comptable et limite les anomalies.",
    priority: "Optimisation" as Priority,
    module: "/comptabilite",
    action: "Voir comptabilité",
  },
];

const prompts = [
  "Que dois-je faire aujourd’hui pour améliorer mon chiffre d’affaires ?",
  "Analyse mes clients à risque et propose un plan d’action.",
  "Comment transformer mes devis en paiements rapidement ?",
  "Quelles dépenses puis-je réduire ce mois-ci ?",
  "Prépare-moi une stratégie commerciale sur 7 jours.",
  "Explique-moi les priorités comptables avant export.",
];

const actionPlan = [
  {
    hour: "09:00",
    title: "Relancer les devis chauds",
    module: "Factures",
    impact: "+8 450 €",
  },
  {
    hour: "11:30",
    title: "Appeler les clients inactifs",
    module: "CRM",
    impact: "+3 opportunités",
  },
  {
    hour: "14:00",
    title: "Vérifier les paiements",
    module: "Finance",
    impact: "+2 450 €",
  },
  {
    hour: "16:00",
    title: "Préparer le rapport CEO",
    module: "IA",
    impact: "Décision rapide",
  },
];

const automations = [
  {
    rule: "SI devis ouvert depuis 7 jours",
    action: "Créer relance IA personnalisée",
    status: "Actif",
  },
  {
    rule: "SI client inactif 30 jours",
    action: "Proposer offre de réactivation",
    status: "Prêt",
  },
  {
    rule: "SI facture en retard",
    action: "Relance douce puis ferme",
    status: "Actif",
  },
  {
    rule: "SI dépense élevée détectée",
    action: "Proposer optimisation budget",
    status: "Actif",
  },
];

export default function IaConseilPage() {
  const [mode, setMode] = useState<IaMode>("CEO");
  const [query, setQuery] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.text.toLowerCase().includes(query.toLowerCase()) ||
      item.priority.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="iaConseilLayout">
      <Sidebar onOpenAI={() => setAiOpen(true)} />

      <main className="mainContent">
        <header className="topbar">
          <div>
            <h2>IA Conseil</h2>
            <p>
              Votre copilote stratégique pour décider, prioriser, automatiser et développer votre activité.
            </p>
          </div>

          <div className="topActions">
            <div className="iaModeSwitch">
              {modes.map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={mode === item ? "activeIaMode" : ""}
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
                placeholder="Rechercher préconisation, client, facture..."
              />
            </div>

            <button className="notifBtn">
              <Bell size={18} />
              <span>7</span>
            </button>

            <button className="iaTopBtn" onClick={() => setAiOpen(true)}>
              <Sparkles size={18} />
              IA Active
            </button>
          </div>
        </header>

        <section className="iaHero">
          <div className="heroGlow" />

          <div className="flowbizOrb" />
          <div className="flowbizRing one" />
          <div className="flowbizRing two" />

          <img src="/flowbiz-logo.png" alt="FlowBiz" className="flowbizLogoFloat hero" />
          <img src="/flowbiz-logo.png" alt="" className="flowbizWatermark" />

          <div className="flowbizParticles">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="iaHeroContent">
            <span>FlowBiz AI Command Center</span>

            <h1>
              Votre conseiller stratégique intelligent
            </h1>

            <p>
              L’IA analyse vos clients, devis, factures, finances, dépenses, priorités,
              risques et opportunités pour vous proposer les meilleures décisions.
            </p>

            <div className="heroButtons">
              <button className="primaryBtn" onClick={() => setAiOpen(true)}>
                <MessageSquare size={18} />
                Poser une question
              </button>

              <button className="secondaryBtn" onClick={() => setModal("rapport")}>
                <FileText size={18} />
                Générer rapport CEO
              </button>

              <button className="greenBtn" onClick={() => setModal("automation")}>
                <Zap size={18} />
                Créer automatisation
              </button>
            </div>
          </div>

          <div className="iaHeroVisual">
            <div className="iaCube">
              <BrainCircuit size={76} />
            </div>

            <div className="iaOrbit one" />
            <div className="iaOrbit two" />
          </div>

          <aside className="iaHeroPanel">
            <h3>Décision recommandée</h3>

            <div>
              <strong>Sécuriser 12 850 €</strong>
              <p>
                Relancer 3 devis, vérifier 2 paiements et transformer 2 clients en abonnement.
              </p>
            </div>

            <button onClick={() => setAiOpen(true)}>
              Lancer le plan IA
            </button>
          </aside>
        </section>

        <section className="statsGrid iaStats">
          <Stat title="Gain potentiel" value="12 850 €" text="Cette semaine" icon={<Wallet />} color="blue" />
          <Stat title="Actions prioritaires" value="7" text="À traiter aujourd’hui" icon={<Target />} color="purple" />
          <Stat title="Opportunités" value="5" text="Détectées par IA" icon={<TrendingUp />} color="green" />
          <Stat title="Risques limités" value="3" text="À surveiller" icon={<AlertTriangle />} color="pink" />
        </section>

        <section className="iaMainGrid">
          <div className="iaLeft">
            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Préconisations intelligentes</h3>
                  <p>{filteredRecommendations.length} recommandation(s) selon vos données.</p>
                </div>

                <Lightbulb size={24} />
              </div>

              <div className="recommendationGrid">
                {filteredRecommendations.map((item) => (
                  <div className="iaRecommendation" key={item.title}>
                    <div className={`priorityBadge ${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </div>

                    <h4>{item.title}</h4>
                    <p>{item.text}</p>

                    <div>
                      <Link href={item.module}>
                        {item.action}
                      </Link>

                      <button onClick={() => setAiOpen(true)}>
                        Analyser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Plan d’action du jour</h3>
                  <p>Priorités classées par impact business.</p>
                </div>

                <Rocket size={24} />
              </div>

              <div className="iaTimeline">
                {actionPlan.map((item) => (
                  <div className="timelineItem" key={item.hour}>
                    <span>{item.hour}</span>

                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.module} · {item.impact}</p>
                    </div>

                    <button onClick={() => setModal(item.title)}>
                      Traiter
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Questions rapides</h3>
                  <p>Prompts pratiques pour piloter plus vite.</p>
                </div>

                <MessageSquare size={24} />
              </div>

              <div className="promptGrid">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setSelectedPrompt(prompt);
                      setAiOpen(true);
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="iaRight">
            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Score business IA</h3>
                  <p>Lecture rapide de la santé de l’activité.</p>
                </div>

                <BarChart3 size={24} />
              </div>

              <div className="scoreCircle">
                <strong>86</strong>
                <span>/100</span>
              </div>

              <div className="scoreDetails">
                <div>
                  <span>Commercial</span>
                  <strong>78%</strong>
                </div>

                <div>
                  <span>Finance</span>
                  <strong>84%</strong>
                </div>

                <div>
                  <span>Qualité client</span>
                  <strong>91%</strong>
                </div>

                <div>
                  <span>Automatisation</span>
                  <strong>64%</strong>
                </div>
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Automatisations proposées</h3>
                  <p>À activer pour limiter les oublis.</p>
                </div>

                <Zap size={24} />
              </div>

              <div className="automationList">
                {automations.map((item) => (
                  <div className="automationItem" key={item.rule}>
                    <div>
                      <strong>{item.rule}</strong>
                      <p>→ {item.action}</p>
                    </div>

                    <span>{item.status}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Modules connectés</h3>
                  <p>L’IA agit sur tout le parcours.</p>
                </div>

                <ShieldCheck size={24} />
              </div>

              <div className="moduleLinks">
                <Link href="/clients">
                  <Users size={18} />
                  CRM
                </Link>

                <Link href="/factures">
                  <FileText size={18} />
                  Factures
                </Link>

                <Link href="/finance">
                  <Wallet size={18} />
                  Finance
                </Link>

                <Link href="/comptabilite">
                  <BarChart3 size={18} />
                  Comptabilité
                </Link>
              </div>
            </section>

            <section className="card iaRiskPanel">
              <div className="sectionHeader">
                <div>
                  <h3>Risques détectés</h3>
                  <p>Problèmes à limiter avant impact.</p>
                </div>

                <AlertTriangle size={24} />
              </div>

              <div className="riskList">
                <div>
                  <span>Critique</span>
                  <strong>Facture en retard</strong>
                  <p>Gamma SARL · 2 450 €</p>
                </div>

                <div>
                  <span>Attention</span>
                  <strong>Client inactif</strong>
                  <p>14 jours sans interaction</p>
                </div>

                <div>
                  <span>Qualité</span>
                  <strong>Document incomplet</strong>
                  <p>Signature manquante</p>
                </div>
              </div>
            </section>
          </aside>
        </section>
      </main>

      <FloatingAI onClick={() => setAiOpen(true)} />

      {modal && (
        <div className="modalOverlay">
          <div className="actionModal">
            <button className="closeAi" onClick={() => setModal(null)}>
              <X size={18} />
            </button>

            <div className="modalIcon">
              {modal === "rapport" ? <FileText /> : modal === "automation" ? <Zap /> : <BrainCircuit />}
            </div>

            <h3>
              {modal === "rapport" && "Générer un rapport CEO"}
              {modal === "automation" && "Créer une automatisation IA"}
              {modal !== "rapport" && modal !== "automation" && "Action IA"}
            </h3>

            <p>
              L’IA prépare l’action, les données liées, le module concerné et le prochain meilleur choix.
            </p>

            <div className="modalFields">
              <input placeholder="Objectif" />
              <input placeholder="Module concerné" />
              <input placeholder="Résultat attendu" />
            </div>

            <div className="modalActions">
              <button onClick={() => setModal(null)}>
                Annuler
              </button>

              <Link href="/ia-conseil">
                Continuer
              </Link>
            </div>
          </div>
        </div>
      )}

      {aiOpen && (
        <aside className="aiDrawer">
          <button className="closeAi" onClick={() => setAiOpen(false)}>
            <X size={18} />
          </button>

          <div className="drawerHead">
            <img src="/flowbiz-logo.png" alt="FlowBiz" />

            <div>
              <h3>Copilote IA FlowBiz</h3>
              <p>Mode : {mode}</p>
            </div>
          </div>

          <div className="aiQuestionBox">
            <span>Question sélectionnée</span>
            <strong>{selectedPrompt}</strong>
          </div>

          <div className="drawerList">
            <div>
              <strong>1. Priorité immédiate</strong>
              <p>Relancer les devis ouverts : potentiel 8 450 €.</p>
              <Link href="/factures">
                Voir devis
              </Link>
            </div>

            <div>
              <strong>2. Opportunité MRR</strong>
              <p>Transformer 2 prestations en abonnements mensuels.</p>
              <Link href="/clients">
                Voir clients
              </Link>
            </div>

            <div>
              <strong>3. Qualité & risque</strong>
              <p>Limiter les retards, documents incomplets et oublis de paiement.</p>
              <button onClick={() => setModal("rapport")}>
                Générer plan
              </button>
            </div>
          </div>
        </aside>
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

        <div className={`statIcon ${color}`}>
          {icon}
        </div>
      </div>

      <div className={`miniLine ${color}`} />
    </div>
  );
}
