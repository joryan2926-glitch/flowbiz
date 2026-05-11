"use client";

import "./clients.css";

import Link from "next/link";
import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import FloatingAI from "../components/FloatingAI";
import StatCard from "../components/StatCard";

import {
  Search,
  Bell,
  Sparkles,
  Users,
  Filter,
  ArrowUpRight,
  Zap,
  BadgeEuro,
  FileText,
  Wallet,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Building2,
  Plus,
  X,
  BrainCircuit,
  Receipt,
  Send,
  Clock3,
  ShieldCheck,
  CreditCard,
  CalendarDays,
  FileCheck2,
  StickyNote,
} from "lucide-react";


type ClientStatus = "VIP" | "Premium" | "Récurrent" | "À risque" | "Nouveau" | "Inactif";

const clients = [
  {
    id: 1,
    name: "Acme Corp",
    company: "Acme Corporation",
    contact: "Marie Laurent",
    email: "contact@acme.com",
    phone: "+33 1 23 45 67 89",
    address: "15 rue de la Paix, 75002 Paris",
    status: "VIP" as ClientStatus,
    stage: "Devis",
    revenue: 12850,
    potential: 4200,
    mrr: 120,
    score: 82,
    reliability: "Élevée",
    risk: "Faible",
    lastAction: "Devis envoyé",
    nextAction: "Relance IA dans 2 jours",
    payment: "Carte active · dernier paiement reçu",
    owner: "Jordan",
    margin: "+71%",
    timeSpent: "5h",
  },
  {
    id: 2,
    name: "Innovatech",
    company: "Innovatech Solutions",
    contact: "Thomas Bernard",
    email: "hello@innovatech.fr",
    phone: "+33 6 12 34 56 78",
    address: "Lyon, France",
    status: "Premium" as ClientStatus,
    stage: "Signature",
    revenue: 8600,
    potential: 2500,
    mrr: 240,
    score: 91,
    reliability: "Très élevée",
    risk: "Très faible",
    lastAction: "Signature en attente",
    nextAction: "Envoyer signature électronique",
    payment: "Stripe connecté",
    owner: "Jordan",
    margin: "+64%",
    timeSpent: "7h",
  },
  {
    id: 3,
    name: "Beta LLC",
    company: "Beta LLC",
    contact: "Lucas Moreau",
    email: "contact@beta.com",
    phone: "+33 6 33 45 78 91",
    address: "Bordeaux, France",
    status: "À risque" as ClientStatus,
    stage: "Relance",
    revenue: 3200,
    potential: 1200,
    mrr: 0,
    score: 58,
    reliability: "Moyenne",
    risk: "Élevé",
    lastAction: "Devis ouvert",
    nextAction: "Relance urgente",
    payment: "Paiement en attente",
    owner: "Sarah",
    margin: "+42%",
    timeSpent: "4h",
  },
  {
    id: 4,
    name: "Gamma SARL",
    company: "Gamma SARL",
    contact: "Julie Dubois",
    email: "contact@gamma.fr",
    phone: "+33 6 88 77 66 55",
    address: "Marseille, France",
    status: "Inactif" as ClientStatus,
    stage: "Prospect",
    revenue: 840,
    potential: 900,
    mrr: 0,
    score: 44,
    reliability: "Faible",
    risk: "Moyen",
    lastAction: "Aucun contact depuis 14 jours",
    nextAction: "Contacter client inactif",
    payment: "Aucun paiement récent",
    owner: "Jordan",
    margin: "+28%",
    timeSpent: "2h",
  },
];

const services = [
  { name: "Site web premium", status: "Signé", amount: "2 850 €", type: "Prestation" },
  { name: "Automatisation CRM", status: "Proposé", amount: "1 200 €", type: "Opportunité" },
  { name: "Maintenance mensuelle", status: "Récurrent possible", amount: "120 €/mois", type: "Abonnement" },
  { name: "Audit IA FlowBiz", status: "Non signé", amount: "650 €", type: "Upsell" },
];

const timeline = [
  ["12 mai", "Devis envoyé", "Proposition site web premium", FileText],
  ["15 mai", "Email ouvert", "Le client a consulté la proposition", Mail],
  ["17 mai", "Relance IA", "Relance automatique préparée", Sparkles],
  ["19 mai", "Paiement reçu", "Paiement partiel de 1 250 €", CreditCard],
  ["22 mai", "Abonnement proposé", "Maintenance mensuelle recommandée", BadgeEuro],
];

const documents = ["Devis #0456", "Facture #0456", "Contrat prestation", "Note interne", "PDF proposition"];

const kanban = [
  ["Prospect", 3],
  ["Contacté", 5],
  ["RDV", 2],
  ["Proposition", 4],
  ["Devis", 6],
  ["Négociation", 2],
  ["Signé", 8],
  ["Fidélisé", 12],
];

const filters = ["Tous", "VIP", "Premium", "Récurrent", "À risque", "Nouveau", "Inactif"];

export default function ClientsPage() {
  const [selected, setSelected] = useState(clients[0]);
  const [filter, setFilter] = useState("Tous");
  const [query, setQuery] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchFilter = filter === "Tous" || client.status === filter;
      const matchSearch =
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.email.toLowerCase().includes(query.toLowerCase()) ||
        client.company.toLowerCase().includes(query.toLowerCase()) ||
        client.stage.toLowerCase().includes(query.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [filter, query]);

  return (
    <div className="clientsLayout">
      <Sidebar onOpenAI={() => setAiOpen(true)} />

      <main className="mainContent">
        <header className="topbar">
          <div>
            <h2>CRM / Clients</h2>
            <p>Contacts, prestations, opportunités, relances, abonnements et pilotage IA.</p>
          </div>

          <div className="topActions">
            <div className="searchBar">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher client, email, service, statut..."
              />
            </div>

            <button className="notifBtn">
              <Bell size={18} />
              <span>4</span>
            </button>

            <button className="iaTopBtn" onClick={() => setAiOpen(true)}>
              <Sparkles size={18} />
              IA CRM
            </button>
          </div>
        </header>

        <section className="heroCard clientsHero">
          <img src="/flowbiz-logo.png" alt="FlowBiz" className="heroLogo" />
          <img src="/flowbiz-logo.png" alt="" className="watermarkLogo" />
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

          <div className="heroContent">
            <span>FlowBiz Client Command Center</span>
            <h1>Transformez vos clients en revenus récurrents</h1>
            <p>
              Pilotez tout le cycle client : acquisition, prestations, devis, signature,
              paiement, fidélisation, abonnements, rentabilité et recommandations IA.
            </p>

            <div className="heroButtons">
              <button className="primaryBtn" onClick={() => setModal("client")}>
                <Plus size={18} />
                Nouveau client
              </button>

              <button className="secondaryBtn" onClick={() => setModal("prestation")}>
                <BadgeEuro size={18} />
                Ajouter prestation
              </button>

              <button className="greenBtn" onClick={() => setAiOpen(true)}>
                <Sparkles size={18} />
                Analyse IA
              </button>
            </div>
          </div>

          <div className="heroSignal">
            <BrainCircuit size={28} />
            <strong>Prévision 30 jours</strong>
            <p>+12 500 € potentiels détectés sur les clients actifs.</p>
          </div>
        </section>

        <section className="statsGrid">
          <Stat title="Clients actifs" value="128" text="+6,7% ce mois" icon={<Users />} color="blue" />
          <Stat title="Opportunités" value="15 680 €" text="À transformer" icon={<Target />} color="purple" />
          <Stat title="MRR potentiel" value="1 420 €" text="Abonnements possibles" icon={<BadgeEuro />} color="green" />
          <Stat title="À relancer" value="4" text="Actions urgentes" icon={<AlertTriangle />} color="pink" />
        </section>

        <section className="filterBar">
          <div>
            <Filter size={18} />
            <span>Segmentation</span>
          </div>

          <div className="filterButtons">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={filter === item ? "activeFilter" : ""}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="crmGrid">
          <div className="leftColumn">
            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Vue Kanban CRM</h3>
                  <p>Pipeline commercial complet, prêt pour drag & drop plus tard.</p>
                </div>
                <Target size={26} />
              </div>

              <div className="kanbanGrid">
                {kanban.map(([stage, count]) => (
                  <button
                    key={stage}
                    className={selected.stage === stage ? "kanbanCol activeKanban" : "kanbanCol"}
                  >
                    <span>{stage}</span>
                    <strong>{count}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Liste clients</h3>
                  <p>{filteredClients.length} client(s) affiché(s), connecté(s) aux devis et finance.</p>
                </div>

                <button className="smallBtn" onClick={() => setModal("client")}>
                  <Plus size={16} />
                  Ajouter
                </button>
              </div>

              <div className="clientList">
                {filteredClients.map((client) => (
                  <button
                    key={client.id}
                    className={selected.id === client.id ? "clientRow activeClient" : "clientRow"}
                    onClick={() => setSelected(client)}
                  >
                    <div className="avatar">{client.name.slice(0, 2)}</div>

                    <div>
                      <h4>{client.name}</h4>
                      <p>{client.company} · {client.contact}</p>
                    </div>

                    <span className={`statusBadge ${client.status.replace(" ", "").toLowerCase()}`}>
                      {client.status}
                    </span>

                    <strong>{client.revenue.toLocaleString("fr-FR")} €</strong>
                    <em>{client.stage}</em>
                  </button>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Timeline intelligente</h3>
                  <p>Historique commercial, paiement, relance et fidélisation.</p>
                </div>
                <Clock3 size={26} />
              </div>

              <div className="timeline">
                {timeline.map(([date, title, text, Icon]: any) => (
                  <div className="timelineItem" key={title}>
                    <div className="timelineIcon"><Icon size={18} /></div>
                    <div>
                      <strong>{date} · {title}</strong>
                      <p>{text}</p>
                    </div>
                    <button onClick={() => setAiOpen(true)}>Action IA</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Services & prestations</h3>
                  <p>Acheté, proposé, non signé, récurrent et opportunités.</p>
                </div>
                <BadgeEuro size={26} />
              </div>

              <div className="servicesGrid">
                {services.map((service) => (
                  <div className="serviceCard" key={service.name}>
                    <span>{service.type}</span>
                    <h4>{service.name}</h4>
                    <p>{service.status}</p>
                    <strong>{service.amount}</strong>
                  </div>
                ))}
              </div>

              <div className="serviceActions">
                <button onClick={() => setModal("prestation")}>+ Ajouter prestation</button>
                <Link href="/factures">Créer devis lié</Link>
                <button onClick={() => setModal("abonnement")}>Transformer en abonnement</button>
                <button onClick={() => setAiOpen(true)}>Analyser rentabilité</button>
              </div>
            </section>
          </div>

          <aside className="rightColumn">
            <section className="card clientPanel">
              <div className="clientPanelTop">
                <div className="bigAvatar">{selected.name.slice(0, 2)}</div>
                <div>
                  <h3>{selected.name}</h3>
                  <p>{selected.company}</p>
                </div>
                <span className={`statusBadge ${selected.status.replace(" ", "").toLowerCase()}`}>
                  {selected.status}
                </span>
              </div>

              <div className="scoreBox">
                <div>
                  <span>Score IA</span>
                  <strong>{selected.score}/100</strong>
                </div>
                <div className="scoreCircle">
                  <span>{selected.score}</span>
                </div>
              </div>

              <div className="clientData">
                <div><Mail size={17} /><span>{selected.email}</span></div>
                <div><Phone size={17} /><span>{selected.phone}</span></div>
                <div><MapPin size={17} /><span>{selected.address}</span></div>
                <div><Building2 size={17} /><span>Responsable : {selected.owner}</span></div>
                <div><CreditCard size={17} /><span>{selected.payment}</span></div>
              </div>

              <div className="aiClientInsight">
                <Sparkles size={22} />
                <div>
                  <h4>Opportunité IA</h4>
                  <p>Ce client peut acheter une prestation complémentaire. Potentiel estimé : +{selected.potential.toLocaleString("fr-FR")} €.</p>
                </div>
              </div>

              <div className="clientActions">
                <Link href="/factures">Créer devis</Link>
                <button onClick={() => setModal("signature")}>Signature</button>
                <button onClick={() => setAiOpen(true)}>Analyser</button>
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Rentabilité client</h3>
                  <p>Vue CEO par client.</p>
                </div>
                <BarChart3 size={24} />
              </div>

              <div className="profitGrid">
                <div><span>Revenus</span><strong>{selected.revenue.toLocaleString("fr-FR")} €</strong></div>
                <div><span>Temps passé</span><strong>{selected.timeSpent}</strong></div>
                <div><span>Marge</span><strong>{selected.margin}</strong></div>
                <div><span>MRR</span><strong>{selected.mrr} €/mois</strong></div>
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Documents liés</h3>
                  <p>Devis, factures, contrats et notes.</p>
                </div>
                <FileCheck2 size={24} />
              </div>

              <div className="documentsList">
                {documents.map((doc) => (
                  <Link href="/factures" key={doc}>
                    <FileText size={18} />
                    <span>{doc}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Automatisation commerciale</h3>
                  <p>Flow type Make / Zapier.</p>
                </div>
                <Zap size={24} />
              </div>

              <div className="automationFlow">
                <div>SI devis ouvert</div>
                <span>→</span>
                <div>Non signé 7 jours</div>
                <span>→</span>
                <div>Relance IA</div>
              </div>

              <button className="fullBtn" onClick={() => setModal("relance")}>
                Activer relance automatique
              </button>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Notes internes</h3>
                  <p>Informations équipe.</p>
                </div>
                <StickyNote size={24} />
              </div>

              <div className="notesBox">
                <p>Préfère WhatsApp. À rappeler lundi. Sensible aux offres avec accompagnement.</p>
              </div>
            </section>
          </aside>
        </section>
      </main>

      <FloatingAI onClick={() => setAiOpen(true)} />

      {modal && (
        <div className="modalOverlay">
          <div className="clientModal">
            <button className="closeAi" onClick={() => setModal(null)}><X size={22} /></button>
            <div className="modalIcon">
              {modal === "client" ? <Users /> : modal === "signature" ? <ShieldCheck /> : modal === "abonnement" ? <BadgeEuro /> : <FileText />}
            </div>

            <h3>
              {modal === "client" && "Nouveau client"}
              {modal === "prestation" && "Ajouter une prestation"}
              {modal === "abonnement" && "Transformer en abonnement"}
              {modal === "signature" && "Envoyer pour signature"}
              {modal === "relance" && "Activer relance automatique"}
            </h3>

            <p>Action prête à connecter à Supabase, Stripe, factures, automatisations et IA.</p>

            <div className="modalFields">
              <input placeholder="Nom / prestation / client" />
              <input placeholder="Montant / objectif / échéance" />
            </div>

            <div className="modalActions">
              <button onClick={() => setModal(null)}>Annuler</button>
              <Link href={modal === "client" ? "/clients" : "/factures"}>Continuer</Link>
            </div>
          </div>
        </div>
      )}

      {aiOpen && (
        <aside className="aiDrawer">
          <button className="closeAi" onClick={() => setAiOpen(false)}><X size={22} /></button>

          <div className="drawerHead">
            <img src="/flowbiz-logo.png" alt="FlowBiz" />
            <div>
              <h3>Copilote CRM FlowBiz</h3>
              <p>Que dois-je faire aujourd’hui ?</p>
            </div>
          </div>

          <div className="drawerList">
            <div>
              <strong>1. Relancer Acme Corp</strong>
              <p>Devis ouvert et non signé. Potentiel : 4 200 €.</p>
              <Link href="/factures">Créer relance</Link>
            </div>

            <div>
              <strong>2. Transformer 2 devis</strong>
              <p>Deux opportunités peuvent être converties en factures.</p>
              <Link href="/factures">Voir devis</Link>
            </div>

            <div>
              <strong>3. Contacter clients inactifs</strong>
              <p>Gamma SARL n’a pas été relancé depuis 14 jours.</p>
              <button onClick={() => setModal("relance")}>Préparer relance</button>
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
        <span>{title}</span>
        <div className={`statIcon ${color}`}>{icon}</div>
      </div>
      <h2>{value}</h2>
      <p>{text}</p>
      <div className={`miniLine ${color}`} />
    </div>
  );
}
