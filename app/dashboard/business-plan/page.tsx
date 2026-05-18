"use client";

import "./business-plan.css";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Wallet,
  BarChart3,
  BrainCircuit,
  Briefcase,
  LineChart,
  Bell,
  Search,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  Target,
  Zap,
  ShieldCheck,
  CalendarDays,
  Building2,
  BadgeEuro,
  Rocket,
  ClipboardList,
  PieChart,
  TrendingUp,
  TrendingDown,
  FileCheck2,
  Map,
  Layers3,
  X,
  Plus,
  CircleDot,
} from "lucide-react";

const menu = [
  ["Dashboard", "/", LayoutDashboard],
  ["Clients", "/clients", Users],
  ["Factures", "/factures", FileText],
  ["Finance & Banque", "/finance", Wallet],
  ["Comptabilité", "/comptabilite", BarChart3],
  ["IA Conseil", "/ia", BrainCircuit],
  ["Création entreprise", "/creation-entreprise", Briefcase],
  ["Business Plan", "/business-plan", Briefcase],
  ["Étude de marché", "/etude-marche", LineChart],
];

const businessSteps = [
  "Vision",
  "Offre",
  "Marché",
  "Clients",
  "Revenus",
  "Charges",
  "Financement",
  "Lancement",
];

const sections = [
  {
    title: "Résumé exécutif",
    text: "Synthèse claire du projet, de l’opportunité, du modèle économique et de la stratégie.",
    status: "Prioritaire",
    icon: FileCheck2,
  },
  {
    title: "Modèle économique",
    text: "Revenus, abonnements, services, formations, marges et hypothèses de croissance.",
    status: "En cours",
    icon: PieChart,
  },
  {
    title: "Plan de financement",
    text: "Besoin total, prêts, garanties, trésorerie de départ et affectation des fonds.",
    status: "À renforcer",
    icon: BadgeEuro,
  },
  {
    title: "Stratégie commerciale",
    text: "Acquisition, tunnel client, conversion, fidélisation et automatisations.",
    status: "Prêt",
    icon: Target,
  },
];

const scenarios = [
  {
    name: "Prudent",
    revenue: "48K€",
    margin: "22%",
    cash: "8K€",
    color: "cyan",
  },
  {
    name: "Réaliste",
    revenue: "96K€",
    margin: "34%",
    cash: "18K€",
    color: "purple",
  },
  {
    name: "Ambitieux",
    revenue: "180K€",
    margin: "42%",
    cash: "36K€",
    color: "green",
  },
];

export default function BusinessPlanPage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState("Réaliste");
  const [modelReady, setModelReady] = useState(false);
  const [financeReady, setFinanceReady] = useState(false);
  const [marketReady, setMarketReady] = useState(false);

  const progress = useMemo(() => {
    let value = 38;
    if (modelReady) value += 20;
    if (financeReady) value += 22;
    if (marketReady) value += 20;
    return value;
  }, [modelReady, financeReady, marketReady]);

  return (
    <div className="bpLayout">
      <aside className="sidebar">
        <div className="brand">
          <div className="logoIcon" />
          <div>
            <h1>FlowBiz</h1>
            <p>Gérez. Analysez. Développez.</p>
          </div>
        </div>

        <nav className="menu">
          {menu.map(([label, href, Icon]: any) => (
            <Link
              key={href}
              href={href}
              className={label === "Business Plan" ? "menuItem active" : "menuItem"}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebarCard">
          <Briefcase size={22} />
          <h3>Business plan IA</h3>
          <p>Dossier prêt à {progress}% pour banque, partenaires et lancement.</p>
          <button onClick={() => setAiOpen(true)}>Optimiser</button>
        </div>
      </aside>

      <main className="mainContent">
        <header className="topbar">
          <div>
            <h2>Business Plan</h2>
            <p>Construisez un dossier clair, stratégique, finançable et connecté aux autres modules.</p>
          </div>

          <div className="topActions">
            <div className="searchBar">
              <Search size={18} />
              <input placeholder="Rechercher financement, revenus, charges..." />
            </div>

            <button className="notifBtn">
              <Bell size={18} />
              <span>4</span>
            </button>

            <button className="iaTopBtn" onClick={() => setAiOpen(true)}>
              <Sparkles size={18} />
              Optimisation IA
            </button>
          </div>
        </header>

        <section className="heroCard">
          <div className="heroGlow" />
          <div className="heroGridPattern" />

          <div className="heroContent">
            <span>FlowBiz Investor Builder</span>
            <h1>Transformez votre idée en dossier bancaire crédible</h1>
            <p>
              Structurez votre business plan avec une logique de dirigeant :
              modèle économique, marché, stratégie commerciale, prévisionnel,
              financement et trajectoire de croissance.
            </p>

            <div className="heroButtons">
              <button className="primaryBtn" onClick={() => setAiOpen(true)}>
                <Sparkles size={18} />
                Générer la synthèse
              </button>

              <Link className="secondaryBtn" href="/finance">
                <Wallet size={18} />
                Plan financier
              </Link>

              <Link className="goldBtn" href="/etude-marche">
                <LineChart size={18} />
                Étude de marché
              </Link>
            </div>
          </div>

          <div className="investorPanel">
            <span>Dossier investisseur</span>
            <strong>{progress}%</strong>
            <p>Niveau de préparation global</p>

            <div className="progressBar">
              <span style={{ width: `${progress}%` }} />
            </div>

            <div className="panelMini">
              <div>
                <small>Besoin</small>
                <b>75K€</b>
              </div>
              <div>
                <small>Scénario</small>
                <b>{selectedScenario}</b>
              </div>
            </div>
          </div>
        </section>

        <section className="controlStrip">
          <div className={modelReady ? "controlBox activeControl cyanControl" : "controlBox cyanControl"}>
            <PieChart size={24} />
            <div>
              <h3>Modèle économique</h3>
              <p>{modelReady ? "Hypothèses validées." : "Valider revenus, prix et marges."}</p>
            </div>
            <button onClick={() => setModelReady(!modelReady)}>
              {modelReady ? "Validé" : "Valider"}
            </button>
          </div>

          <div className={financeReady ? "controlBox activeControl greenControl" : "controlBox greenControl"}>
            <BadgeEuro size={24} />
            <div>
              <h3>Financement</h3>
              <p>{financeReady ? "Plan prêt pour banque." : "Structurer prêt, garanties et trésorerie."}</p>
            </div>
            <button onClick={() => setFinanceReady(!financeReady)}>
              {financeReady ? "Prêt" : "Préparer"}
            </button>
          </div>

          <div className={marketReady ? "controlBox activeControl goldControl" : "controlBox goldControl"}>
            <LineChart size={24} />
            <div>
              <h3>Marché</h3>
              <p>{marketReady ? "Analyse marché intégrée." : "Relier l’étude de marché au BP."}</p>
            </div>
            <button onClick={() => setMarketReady(!marketReady)}>
              {marketReady ? "Lié" : "Relier"}
            </button>
          </div>
        </section>

        <section className="statsGrid">
          <div className="statCard cyanCard">
            <div className="statTop">
              <span>Chiffre d’affaires cible</span>
              <TrendingUp size={20} />
            </div>
            <h2>96K€</h2>
            <p><ArrowUpRight size={15} /> Scénario réaliste année 1</p>
            <div className="miniLine cyan" />
          </div>

          <div className="statCard purpleCard">
            <div className="statTop">
              <span>Besoin financement</span>
              <BadgeEuro size={20} />
            </div>
            <h2>75K€</h2>
            <p><ShieldCheck size={15} /> Banque + garantie + prêt honneur</p>
            <div className="miniLine purple" />
          </div>

          <div className="statCard greenCard">
            <div className="statTop">
              <span>Marge estimée</span>
              <PieChart size={20} />
            </div>
            <h2>34%</h2>
            <p><CheckCircle2 size={15} /> Objectif rentable</p>
            <div className="miniLine green" />
          </div>

          <div className="statCard goldCard">
            <div className="statTop">
              <span>Point mort</span>
              <Target size={20} />
            </div>
            <h2>8 mois</h2>
            <p><Clock3 size={15} /> À sécuriser par ventes récurrentes</p>
            <div className="miniLine gold" />
          </div>
        </section>

        <section className="bpGrid">
          <div className="leftColumn">
            <section className="card mapCard">
              <div className="sectionHeader">
                <div>
                  <h3>Parcours Business Plan CEO</h3>
                  <p>Une trame claire de l’idée au lancement commercial.</p>
                </div>
                <Map size={28} />
              </div>

              <div className="journey">
                {businessSteps.map((step, index) => (
                  <div key={step} className="journeyStep">
                    <div>{index + 1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="card sectionsCard">
              <div className="sectionHeader">
                <div>
                  <h3>Sections du dossier</h3>
                  <p>Chaque bloc est pensé pour rassurer banque, financeurs et partenaires.</p>
                </div>
                <ClipboardList size={28} />
              </div>

              <div className="sectionsList">
                {sections.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="sectionItem" key={item.title}>
                      <div className="sectionIcon">
                        <Icon size={20} />
                      </div>

                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>

                      <span>{item.status}</span>
                      <ArrowUpRight size={18} />
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="scenarioAndChart">
              <div className="card scenariosCard">
                <div className="sectionHeader">
                  <div>
                    <h3>Scénarios financiers</h3>
                    <p>Comparez plusieurs trajectoires avant de présenter le dossier.</p>
                  </div>
                  <Layers3 size={28} />
                </div>

                <div className="scenarioGrid">
                  {scenarios.map((scenario) => (
                    <button
                      key={scenario.name}
                      onClick={() => setSelectedScenario(scenario.name)}
                      className={
                        selectedScenario === scenario.name
                          ? `scenarioBox selectedScenario ${scenario.color}`
                          : `scenarioBox ${scenario.color}`
                      }
                    >
                      <CircleDot size={18} />
                      <strong>{scenario.name}</strong>
                      <small>CA : {scenario.revenue}</small>
                      <small>Marge : {scenario.margin}</small>
                      <small>Cash : {scenario.cash}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card chartCard">
                <div className="sectionHeader">
                  <div>
                    <h3>Prévisionnel visuel</h3>
                    <p>Simulation prête à connecter au module finance.</p>
                  </div>
                  <BarChart3 size={26} />
                </div>

                <div className="fakeChart">
                  <div className="chartFill" />
                  <span className="dot d1" />
                  <span className="dot d2" />
                  <span className="dot d3" />
                  <span className="dot d4" />
                  <span className="dot d5" />
                  <span className="dot d6" />
                </div>

                <div className="months">
                  <span>M1</span><span>M2</span><span>M3</span><span>M4</span><span>M5</span><span>M6</span>
                </div>
              </div>
            </section>
          </div>

          <div className="rightColumn">
            <section className="card aiCard">
              <div className="sectionHeader">
                <div>
                  <h3>Coach IA Business Plan</h3>
                  <p>Actions prioritaires pour rendre le dossier convaincant.</p>
                </div>
                <BrainCircuit size={28} />
              </div>

              <div className="aiList">
                <div className="aiItem warning">
                  <AlertTriangle size={20} />
                  <div>
                    <h4>Justifier les 75K€</h4>
                    <p>Le besoin de financement doit être relié à des postes précis.</p>
                  </div>
                  <Link href="/finance">Finance</Link>
                </div>

                <div className="aiItem success">
                  <CheckCircle2 size={20} />
                  <div>
                    <h4>Renforcer les revenus récurrents</h4>
                    <p>Les abonnements améliorent la crédibilité bancaire.</p>
                  </div>
                  <Link href="/factures">Ventes</Link>
                </div>

                <div className="aiItem gold">
                  <Target size={20} />
                  <div>
                    <h4>Relier l’étude de marché</h4>
                    <p>La preuve marché doit soutenir les hypothèses de CA.</p>
                  </div>
                  <Link href="/etude-marche">Marché</Link>
                </div>
              </div>
            </section>

            <section className="card fundingCard">
              <div className="sectionHeader">
                <div>
                  <h3>Montage financier</h3>
                  <p>Répartition à présenter proprement.</p>
                </div>
                <BadgeEuro size={26} />
              </div>

              <div className="fundingList">
                <div><span>Développement plateforme</span><strong>22 000 €</strong></div>
                <div><span>Marketing & tournée</span><strong>18 000 €</strong></div>
                <div><span>Trésorerie départ</span><strong>12 000 €</strong></div>
                <div><span>Matériel & outils</span><strong>8 000 €</strong></div>
                <div><span>Lancement & commercial</span><strong>15 000 €</strong></div>
              </div>
            </section>

            <section className="card shortcutCard">
              <div className="sectionHeader">
                <div>
                  <h3>Modules reliés</h3>
                  <p>Le business plan n’est pas isolé.</p>
                </div>
                <Plus size={24} />
              </div>

              <div className="shortcutGrid">
                <Link href="/creation-entreprise"><Building2 size={22} /><span>Création</span></Link>
                <Link href="/finance"><Wallet size={22} /><span>Finance</span></Link>
                <Link href="/etude-marche"><LineChart size={22} /><span>Marché</span></Link>
                <Link href="/clients"><Users size={22} /><span>Clients</span></Link>
                <Link href="/factures"><FileText size={22} /><span>Ventes</span></Link>
                <Link href="/ia"><BrainCircuit size={22} /><span>IA Conseil</span></Link>
              </div>
            </section>

            <section className="card finalCard">
              <Rocket size={30} />
              <h3>Version banque / investisseur</h3>
              <p>
                Préparez un dossier clair : synthèse, marché, modèle économique,
                plan financier, risques, plan d’action et annexes.
              </p>
              <button onClick={() => setAiOpen(true)}>
                Générer version finale <ArrowUpRight size={16} />
              </button>
            </section>
          </div>
        </section>
      </main>

      {aiOpen && (
        <aside className="aiDrawer">
          <button className="closeAi" onClick={() => setAiOpen(false)}>
            <X size={22} />
          </button>

          <div className="drawerHead">
            <BrainCircuit size={32} />
            <div>
              <h3>Coach Business Plan FlowBiz</h3>
              <p>Optimisation CEO du dossier.</p>
            </div>
          </div>

          <div className="drawerList">
            <div>
              <strong>1. Clarifier le besoin de financement</strong>
              <p>Chaque euro demandé doit être relié à un usage précis et crédible.</p>
              <Link href="/finance">Structurer finance</Link>
            </div>

            <div>
              <strong>2. Prouver la demande marché</strong>
              <p>Relier segments clients, concurrence et tendances à vos hypothèses de CA.</p>
              <Link href="/etude-marche">Étude de marché</Link>
            </div>

            <div>
              <strong>3. Rendre le parcours client concret</strong>
              <p>Montrer comment un prospect devient client, puis revenu récurrent.</p>
              <Link href="/clients">Ouvrir CRM</Link>
            </div>

            <div>
              <strong>4. Préparer la version banque</strong>
              <p>Résumé exécutif, tableaux financiers, plan d’action, risques et garanties.</p>
              <button>Générer checklist</button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

