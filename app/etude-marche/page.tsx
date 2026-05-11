"use client";

import "./etude-marche.css";
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
  Target,
  Zap,
  ShieldCheck,
  Map,
  Globe2,
  Building2,
  Radar,
  PieChart,
  Rocket,
  Eye,
  Layers3,
  TrendingUp,
  TrendingDown,
  BadgeEuro,
  ClipboardList,
  X,
  Plus,
  CircleDot,
  Compass,
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

const marketSteps = [
  "Marché",
  "Cibles",
  "Besoins",
  "Concurrents",
  "Prix",
  "Canaux",
  "Risques",
  "Opportunité",
];

const segments = [
  {
    title: "Créateurs d’entreprise",
    potential: "Très fort",
    budget: "Moyen",
    priority: "Prioritaire",
    color: "cyan",
  },
  {
    title: "TPE / indépendants",
    potential: "Fort",
    budget: "Moyen +",
    priority: "Cœur de cible",
    color: "green",
  },
  {
    title: "Associations",
    potential: "Moyen",
    budget: "Limité",
    priority: "Secondaire",
    color: "gold",
  },
  {
    title: "PME en croissance",
    potential: "Élevé",
    budget: "Fort",
    priority: "Premium",
    color: "purple",
  },
];

const competitors = [
  {
    name: "Pennylane",
    focus: "Comptabilité / finance",
    strength: "Référence marché",
    weakness: "Moins orienté création complète",
  },
  {
    name: "Sellsy",
    focus: "CRM / facturation",
    strength: "Très commercial",
    weakness: "Moins copilote stratégique",
  },
  {
    name: "Notion",
    focus: "Organisation",
    strength: "Flexible",
    weakness: "Pas spécialisé entreprise",
  },
  {
    name: "Qonto",
    focus: "Banque pro",
    strength: "Expérience bancaire forte",
    weakness: "Pas accompagnement global",
  },
];

const opportunities = [
  {
    title: "Centralisation des outils",
    text: "Les entrepreneurs utilisent trop d’outils séparés : CRM, factures, banque, IA, business plan.",
    icon: Layers3,
  },
  {
    title: "Besoin d’accompagnement",
    text: "Les créateurs veulent être guidés, pas seulement visualiser des données.",
    icon: Compass,
  },
  {
    title: "IA décisionnelle",
    text: "L’opportunité forte est de transformer les chiffres en actions concrètes.",
    icon: BrainCircuit,
  },
];

export default function EtudeMarchePage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("TPE / indépendants");
  const [marketReady, setMarketReady] = useState(false);
  const [competitionReady, setCompetitionReady] = useState(false);
  const [pricingReady, setPricingReady] = useState(false);

  const progress = useMemo(() => {
    let value = 42;
    if (marketReady) value += 20;
    if (competitionReady) value += 18;
    if (pricingReady) value += 20;
    return value;
  }, [marketReady, competitionReady, pricingReady]);

  return (
    <div className="marketLayout">
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
              className={label === "Étude de marché" ? "menuItem active" : "menuItem"}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebarCard">
          <Radar size={22} />
          <h3>Market Intelligence</h3>
          <p>Analyse marché prête à {progress}% pour votre business plan.</p>
          <button onClick={() => setAiOpen(true)}>Analyser</button>
        </div>
      </aside>

      <main className="mainContent">
        <header className="topbar">
          <div>
            <h2>Étude de marché</h2>
            <p>Analysez la demande, la concurrence, les segments clients et l’opportunité commerciale.</p>
          </div>

          <div className="topActions">
            <div className="searchBar">
              <Search size={18} />
              <input placeholder="Rechercher segment, concurrent, opportunité..." />
            </div>

            <button className="notifBtn">
              <Bell size={18} />
              <span>3</span>
            </button>

            <button className="iaTopBtn" onClick={() => setAiOpen(true)}>
              <Sparkles size={18} />
              Analyse IA
            </button>
          </div>
        </header>

        <section className="heroCard">
          <div className="heroGlow" />
          <div className="marketRadar">
            <span />
            <span />
            <span />
          </div>

          <div className="heroContent">
            <span>FlowBiz Market Radar</span>
            <h1>Comprenez votre marché avant de vendre</h1>
            <p>
              Identifiez vos cibles, concurrents, prix, canaux d’acquisition et
              opportunités. Reliez directement l’analyse au business plan, au CRM
              et au parcours commercial.
            </p>

            <div className="heroButtons">
              <button className="primaryBtn" onClick={() => setAiOpen(true)}>
                <Sparkles size={18} />
                Générer analyse IA
              </button>

              <Link className="secondaryBtn" href="/business-plan">
                <Briefcase size={18} />
                Relier au business plan
              </Link>

              <Link className="greenBtn" href="/clients">
                <Users size={18} />
                Créer segments CRM
              </Link>
            </div>
          </div>

          <div className="opportunityPanel">
            <Globe2 size={30} />
            <strong>Opportunité claire</strong>
            <p>Positionnement fort : copilote business tout-en-un pour entrepreneurs.</p>

            <div className="progressBar">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <section className="controlStrip">
          <div className={marketReady ? "controlBox activeControl cyanControl" : "controlBox cyanControl"}>
            <Globe2 size={24} />
            <div>
              <h3>Marché</h3>
              <p>{marketReady ? "Analyse globale prête." : "Valider taille, tendances et besoins."}</p>
            </div>
            <button onClick={() => setMarketReady(!marketReady)}>
              {marketReady ? "Validé" : "Valider"}
            </button>
          </div>

          <div className={competitionReady ? "controlBox activeControl pinkControl" : "controlBox pinkControl"}>
            <Building2 size={24} />
            <div>
              <h3>Concurrence</h3>
              <p>{competitionReady ? "Benchmark structuré." : "Comparer les acteurs existants."}</p>
            </div>
            <button onClick={() => setCompetitionReady(!competitionReady)}>
              {competitionReady ? "Prêt" : "Comparer"}
            </button>
          </div>

          <div className={pricingReady ? "controlBox activeControl goldControl" : "controlBox goldControl"}>
            <BadgeEuro size={24} />
            <div>
              <h3>Prix</h3>
              <p>{pricingReady ? "Hypothèses tarifaires prêtes." : "Définir offres, abonnements et packs."}</p>
            </div>
            <button onClick={() => setPricingReady(!pricingReady)}>
              {pricingReady ? "Prêt" : "Définir"}
            </button>
          </div>
        </section>

        <section className="statsGrid">
          <div className="statCard cyanCard">
            <div className="statTop">
              <span>Attractivité marché</span>
              <TrendingUp size={20} />
            </div>
            <h2>86%</h2>
            <p><ArrowUpRight size={15} /> Besoin élevé de simplification</p>
            <div className="miniLine cyan" />
          </div>

          <div className="statCard purpleCard">
            <div className="statTop">
              <span>Segments clés</span>
              <Users size={20} />
            </div>
            <h2>4</h2>
            <p><Target size={15} /> Priorisation commerciale nécessaire</p>
            <div className="miniLine purple" />
          </div>

          <div className="statCard greenCard">
            <div className="statTop">
              <span>Potentiel SaaS</span>
              <PieChart size={20} />
            </div>
            <h2>Fort</h2>
            <p><CheckCircle2 size={15} /> Revenus récurrents possibles</p>
            <div className="miniLine green" />
          </div>

          <div className="statCard goldCard">
            <div className="statTop">
              <span>Risque concurrence</span>
              <AlertTriangle size={20} />
            </div>
            <h2>Moyen</h2>
            <p><ShieldCheck size={15} /> Différenciation IA nécessaire</p>
            <div className="miniLine gold" />
          </div>
        </section>

        <section className="marketGrid">
          <div className="leftColumn">
            <section className="card journeyCard">
              <div className="sectionHeader">
                <div>
                  <h3>Parcours étude de marché</h3>
                  <p>Une analyse structurée qui nourrit directement le business plan et la stratégie commerciale.</p>
                </div>
                <Map size={28} />
              </div>

              <div className="journey">
                {marketSteps.map((step, index) => (
                  <div key={step} className="journeyStep">
                    <div>{index + 1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="splitGrid">
              <div className="card segmentsCard">
                <div className="sectionHeader">
                  <div>
                    <h3>Segments clients</h3>
                    <p>Choisissez la cible prioritaire.</p>
                  </div>
                  <Users size={26} />
                </div>

                <div className="segmentGrid">
                  {segments.map((segment) => (
                    <button
                      key={segment.title}
                      onClick={() => setSelectedSegment(segment.title)}
                      className={
                        selectedSegment === segment.title
                          ? `segmentBox selectedSegment ${segment.color}`
                          : `segmentBox ${segment.color}`
                      }
                    >
                      <CircleDot size={18} />
                      <strong>{segment.title}</strong>
                      <small>Potentiel : {segment.potential}</small>
                      <small>Budget : {segment.budget}</small>
                      <span>{segment.priority}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card positioningCard">
                <div className="sectionHeader">
                  <div>
                    <h3>Positionnement recommandé</h3>
                    <p>Différenciation claire face au marché.</p>
                  </div>
                  <Compass size={26} />
                </div>

                <div className="positionVisual">
                  <div className="axis horizontal" />
                  <div className="axis vertical" />
                  <div className="brandPoint">
                    <Sparkles size={18} />
                    FlowBiz
                  </div>
                  <span className="label l1">Gestion simple</span>
                  <span className="label l2">Accompagnement IA</span>
                  <span className="label l3">Outils séparés</span>
                  <span className="label l4">Pilotage complet</span>
                </div>
              </div>
            </section>

            <section className="card competitorsCard">
              <div className="sectionHeader">
                <div>
                  <h3>Benchmark concurrentiel</h3>
                  <p>Identifier les forces, limites et l’espace de différenciation.</p>
                </div>
                <Building2 size={28} />
              </div>

              <div className="competitorList">
                {competitors.map((item) => (
                  <div className="competitorItem" key={item.name}>
                    <div className="competitorIcon">
                      <Building2 size={20} />
                    </div>

                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.focus}</p>
                    </div>

                    <span className="strength">{item.strength}</span>
                    <span className="weakness">{item.weakness}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="card opportunitiesCard">
              <div className="sectionHeader">
                <div>
                  <h3>Opportunités marché</h3>
                  <p>Les angles à exploiter dans la commercialisation.</p>
                </div>
                <Rocket size={28} />
              </div>

              <div className="opportunityGrid">
                {opportunities.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div className="opportunityItem" key={item.title}>
                      <Icon size={24} />
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="rightColumn">
            <section className="card aiCard">
              <div className="sectionHeader">
                <div>
                  <h3>Analyse IA marché</h3>
                  <p>Décisions stratégiques prioritaires.</p>
                </div>
                <BrainCircuit size={28} />
              </div>

              <div className="aiList">
                <div className="aiItem warning">
                  <AlertTriangle size={20} />
                  <div>
                    <h4>Clarifier la cible prioritaire</h4>
                    <p>Commencer par TPE / indépendants et créateurs structurés.</p>
                  </div>
                  <Link href="/clients">CRM</Link>
                </div>

                <div className="aiItem success">
                  <CheckCircle2 size={20} />
                  <div>
                    <h4>Valoriser le copilote IA</h4>
                    <p>Votre différenciation principale est l’accompagnement décisionnel.</p>
                  </div>
                  <Link href="/ia">IA</Link>
                </div>

                <div className="aiItem gold">
                  <BadgeEuro size={20} />
                  <div>
                    <h4>Tester 3 offres</h4>
                    <p>Starter, Pro et Premium pour valider le prix psychologique.</p>
                  </div>
                  <Link href="/business-plan">BP</Link>
                </div>
              </div>
            </section>

            <section className="card demandCard">
              <div className="sectionHeader">
                <div>
                  <h3>Demande & usages</h3>
                  <p>Ce que recherchent les utilisateurs.</p>
                </div>
                <Eye size={26} />
              </div>

              <div className="demandList">
                <div><span>01</span><p>Gagner du temps sur l’administratif</p><strong>Très fort</strong></div>
                <div><span>02</span><p>Comprendre ses chiffres facilement</p><strong>Fort</strong></div>
                <div><span>03</span><p>Être guidé dans les décisions</p><strong>Très fort</strong></div>
                <div><span>04</span><p>Centraliser les outils business</p><strong>Élevé</strong></div>
              </div>
            </section>

            <section className="card acquisitionCard">
              <div className="sectionHeader">
                <div>
                  <h3>Canaux d’acquisition</h3>
                  <p>Où aller chercher les premiers utilisateurs.</p>
                </div>
                <Zap size={26} />
              </div>

              <div className="channelGrid">
                <div className="channel cyan"><span>Réseaux sociaux</span><strong>Rapide</strong></div>
                <div className="channel purple"><span>Partenaires création</span><strong>Crédible</strong></div>
                <div className="channel green"><span>Pépinières / incubateurs</span><strong>Qualifié</strong></div>
                <div className="channel gold"><span>Événements terrain</span><strong>Impact</strong></div>
              </div>
            </section>

            <section className="card shortcutCard">
              <div className="sectionHeader">
                <div>
                  <h3>Modules reliés</h3>
                  <p>Transformer l’analyse en actions.</p>
                </div>
                <Plus size={24} />
              </div>

              <div className="shortcutGrid">
                <Link href="/business-plan"><Briefcase size={22} /><span>Business plan</span></Link>
                <Link href="/clients"><Users size={22} /><span>CRM segments</span></Link>
                <Link href="/factures"><FileText size={22} /><span>Offres & devis</span></Link>
                <Link href="/ia"><BrainCircuit size={22} /><span>Analyse IA</span></Link>
                <Link href="/finance"><Wallet size={22} /><span>Prix & marge</span></Link>
                <Link href="/creation-entreprise"><Building2 size={22} /><span>Création</span></Link>
              </div>
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
              <h3>Analyste marché FlowBiz</h3>
              <p>Plan stratégique d’étude de marché.</p>
            </div>
          </div>

          <div className="drawerList">
            <div>
              <strong>1. Prioriser la cible</strong>
              <p>Commencer par TPE, indépendants et créateurs avec besoin de pilotage.</p>
              <Link href="/clients">Créer segments CRM</Link>
            </div>

            <div>
              <strong>2. Formaliser la différence</strong>
              <p>FlowBiz doit être présenté comme un copilote intelligent, pas juste un logiciel.</p>
              <Link href="/ia">Renforcer IA</Link>
            </div>

            <div>
              <strong>3. Relier au business plan</strong>
              <p>Les hypothèses de marché doivent soutenir le CA prévisionnel.</p>
              <Link href="/business-plan">Ouvrir BP</Link>
            </div>

            <div>
              <strong>4. Tester l’offre</strong>
              <p>Créer 3 offres commerciales et mesurer l’intérêt marché.</p>
              <button>Générer plan test</button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}