"use client";

import "./factures.css";

import Link from "next/link";
import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import FloatingAI from "../components/FloatingAI";

import {
  AlertTriangle,
  BadgeEuro,
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Mail,
  PenLine,
  Plus,
  Receipt,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

type DocumentStatus =
  | "Brouillon"
  | "Envoyé"
  | "Ouvert"
  | "Signé"
  | "Acompte payé"
  | "Payé"
  | "En retard"
  | "Annulé";

const filters = ["Tous", "Devis", "Factures", "Signé", "Payé", "En retard", "Brouillon"];

const documents = [
  {
    id: "DEV-2026-0456",
    type: "Devis",
    client: "Acme Corp",
    service: "Site web premium + automatisation CRM",
    status: "Ouvert" as DocumentStatus,
    amount: 4250,
    deposit: 1250,
    due: "18 mai 2026",
    margin: "+68%",
    quality: "Premium",
    risk: "Relance recommandée",
    nextAction: "Relancer dans 24h",
  },
  {
    id: "FAC-2026-0142",
    type: "Facture",
    client: "Innovatech",
    service: "Abonnement FlowBiz Academy",
    status: "Payé" as DocumentStatus,
    amount: 2400,
    deposit: 2400,
    due: "12 mai 2026",
    margin: "+72%",
    quality: "Excellent",
    risk: "Aucun risque",
    nextAction: "Proposer renouvellement",
  },
  {
    id: "DEV-2026-0461",
    type: "Devis",
    client: "Beta LLC",
    service: "Audit IA + tunnel commercial",
    status: "Signé" as DocumentStatus,
    amount: 3200,
    deposit: 0,
    due: "22 mai 2026",
    margin: "+61%",
    quality: "À suivre",
    risk: "Acompte non payé",
    nextAction: "Envoyer lien paiement",
  },
  {
    id: "FAC-2026-0138",
    type: "Facture",
    client: "Gamma SARL",
    service: "Maintenance + support premium",
    status: "En retard" as DocumentStatus,
    amount: 1450,
    deposit: 0,
    due: "06 mai 2026",
    margin: "+38%",
    quality: "Risque SAV",
    risk: "Retard paiement",
    nextAction: "Relance urgente",
  },
];

const journey = [
  "Prospect",
  "Proposition",
  "Devis",
  "Signature",
  "Acompte",
  "Facture",
  "Paiement",
  "Fidélisation",
];

const automations = [
  {
    rule: "SI devis ouvert depuis 7 jours",
    action: "Envoyer relance IA personnalisée",
    status: "Actif",
  },
  {
    rule: "SI facture payée",
    action: "Mettre à jour Finance + Comptabilité",
    status: "Actif",
  },
  {
    rule: "SI client premium signé",
    action: "Créer abonnement mensuel",
    status: "Prêt",
  },
  {
    rule: "SI facture en retard",
    action: "Alerte CEO + relance paiement",
    status: "Actif",
  },
];

const serviceQuality = [
  { label: "Délai réponse", value: "2h", status: "Excellent" },
  { label: "Satisfaction", value: "92%", status: "Premium" },
  { label: "Documents complets", value: "87%", status: "À finaliser" },
  { label: "Litiges ouverts", value: "1", status: "À traiter" },
];

export default function FacturesPage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [selected, setSelected] = useState(documents[0]);
  const [filter, setFilter] = useState("Tous");
  const [query, setQuery] = useState("");
  const [selectedStep, setSelectedStep] = useState("Devis");

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchFilter =
        filter === "Tous" ||
        doc.type === filter ||
        doc.status === filter;

      const matchSearch =
        doc.client.toLowerCase().includes(query.toLowerCase()) ||
        doc.id.toLowerCase().includes(query.toLowerCase()) ||
        doc.service.toLowerCase().includes(query.toLowerCase()) ||
        doc.status.toLowerCase().includes(query.toLowerCase());

      return matchFilter && matchSearch;
    });
  }, [filter, query]);

  const remaining = selected.amount - selected.deposit;

  return (
    <div className="invoiceLayout">
      <Sidebar onOpenAI={() => setAiOpen(true)} />

      <main className="mainContent">
        <header className="topbar">
          <div>
            <h2>Devis & Factures</h2>
            <p>Signature, paiement, qualité client, relances et automatisations commerciales.</p>
          </div>

          <div className="topActions">
            <div className="searchBar">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher client, facture, devis, service..."
              />
            </div>

            <button className="notifBtn">
              <Bell size={18} />
              <span>5</span>
            </button>

            <button className="iaTopBtn" onClick={() => setAiOpen(true)}>
              <Sparkles size={18} />
              IA Facturation
            </button>
          </div>
        </header>

        <section className="heroCard invoiceHero">
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

          <img src="/flowbiz-logo.png" alt="FlowBiz" className="heroLogo" />
          <img src="/flowbiz-logo.png" alt="" className="watermarkLogo" />

          <div className="heroContent">
            <span>FlowBiz Revenue Command Center</span>
            <h1>Transformez vos devis en revenus encaissés</h1>
            <p>
              Créez, signez, encaissez, relancez et connectez vos documents à la finance,
              à la comptabilité, au CRM et à l’expérience client premium.
            </p>

            <div className="heroButtons">
              <button className="primaryBtn" onClick={() => setModal("devis")}>
                <Plus size={18} />
                Nouveau devis
              </button>

              <button className="secondaryBtn" onClick={() => setModal("facture")}>
                <Receipt size={18} />
                Nouvelle facture
              </button>

              <button className="greenBtn" onClick={() => setAiOpen(true)}>
                <BrainCircuit size={18} />
                Optimiser avec IA
              </button>
            </div>
          </div>

          <div className="heroSignal">
            <Sparkles size={26} />
            <h3>Prévision encaissement</h3>
            <p>12 850 € peuvent être sécurisés sous 30 jours.</p>
          </div>
        </section>

        <section className="statsGrid">
          <Stat title="CA facturé" value="38 450 €" text="+14% ce mois" icon={<Wallet />} color="blue" />
          <Stat title="Devis ouverts" value="15 680 €" text="À convertir" icon={<FileText />} color="purple" />
          <Stat title="Taux signature" value="42%" text="+9% vs mois dernier" icon={<PenLine />} color="green" />
          <Stat title="Retards paiement" value="3" text="2 450 € à relancer" icon={<AlertTriangle />} color="pink" />
        </section>

        <section className="filterBar">
          <div>
            <Filter size={18} />
            <span>Filtres documents</span>
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

        <section className="invoiceGrid">
          <div className="leftColumn">
            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Parcours client → paiement</h3>
                  <p>{selectedStep} sélectionné · suivi commercial complet.</p>
                </div>
                <Target size={24} />
              </div>

              <div className="invoiceJourney">
                {journey.map((step, index) => (
                  <button
                    key={step}
                    onClick={() => setSelectedStep(step)}
                    className={selectedStep === step ? "journeyStep activeJourney" : "journeyStep"}
                  >
                    <strong>{index + 1}</strong>
                    <span>{step}</span>
                  </button>
                ))}
              </div>

              <div className="journeyInsight">
                <Sparkles size={18} />
                <p>
                  IA : l’étape <strong>{selectedStep}</strong> doit être reliée au CRM, paiement et qualité service.
                </p>
                <Link href="/clients">Voir client</Link>
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Documents commerciaux</h3>
                  <p>{filteredDocuments.length} document(s) affiché(s), reliés au CRM.</p>
                </div>
                <button className="smallBtn" onClick={() => setModal("devis")}>
                  <Plus size={16} />
                  Créer
                </button>
              </div>

              <div className="documentList">
                {filteredDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelected(doc)}
                    className={selected.id === doc.id ? "documentRow activeDocument" : "documentRow"}
                  >
                    <div className="documentIcon">
                      {doc.type === "Devis" ? <FileText size={20} /> : <Receipt size={20} />}
                    </div>

                    <div>
                      <h4>{doc.id}</h4>
                      <p>{doc.client} · {doc.service}</p>
                    </div>

                    <span className={`invoiceBadge ${doc.status.replace(" ", "").toLowerCase()}`}>
                      {doc.status}
                    </span>

                    <strong>{doc.amount.toLocaleString("fr-FR")} €</strong>
                    <em>{doc.nextAction}</em>
                  </button>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Automatisations facturation</h3>
                  <p>Réduire les oublis, les retards et les problèmes clients.</p>
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
                  <h3>Qualité service & problèmes limités</h3>
                  <p>Anticiper les litiges, retards, SAV et documents incomplets.</p>
                </div>
                <ShieldCheck size={24} />
              </div>

              <div className="qualityGrid">
                {serviceQuality.map((item) => (
                  <div className="qualityCard" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <p>{item.status}</p>
                  </div>
                ))}
              </div>

              <div className="qualityAlert">
                <AlertTriangle size={20} />
                <p>
                  Un client présente un risque SAV : document incomplet + facture en retard.
                  Recommandation : envoyer un suivi qualité avant relance ferme.
                </p>
              </div>
            </section>
          </div>

          <aside className="rightColumn">
            <section className="card documentPanel">
              <div className="panelTop">
                <div className="bigDocIcon">
                  {selected.type === "Devis" ? <FileText size={28} /> : <Receipt size={28} />}
                </div>

                <div>
                  <h3>{selected.id}</h3>
                  <p>{selected.client}</p>
                </div>

                <span className={`invoiceBadge ${selected.status.replace(" ", "").toLowerCase()}`}>
                  {selected.status}
                </span>
              </div>

              <div className="previewBox">
                <div className="previewTop">
                  <img src="/flowbiz-logo.png" alt="FlowBiz" />
                  <div>
                    <strong>{selected.type} FlowBiz</strong>
                    <span>{selected.quality}</span>
                  </div>
                </div>

                <div className="previewLine" />
                <p>{selected.service}</p>
                <h4>{selected.amount.toLocaleString("fr-FR")} €</h4>
                <small>Échéance : {selected.due}</small>
              </div>

              <div className="paymentBox">
                <div>
                  <span>Acompte encaissé</span>
                  <strong>{selected.deposit.toLocaleString("fr-FR")} €</strong>
                </div>
                <div>
                  <span>Solde restant</span>
                  <strong>{remaining.toLocaleString("fr-FR")} €</strong>
                </div>
              </div>

              <div className="documentData">
                <div><Users size={17} /><span>Client lié : {selected.client}</span></div>
                <div><BadgeEuro size={17} /><span>Marge estimée : {selected.margin}</span></div>
                <div><CalendarDays size={17} /><span>Échéance : {selected.due}</span></div>
                <div><AlertTriangle size={17} /><span>{selected.risk}</span></div>
              </div>

              <div className="panelActions">
                <button onClick={() => setModal("signature")}><PenLine size={16} /> Signature</button>
                <button onClick={() => setModal("paiement")}><CreditCard size={16} /> Paiement</button>
                <button onClick={() => setAiOpen(true)}><Sparkles size={16} /> Analyse</button>
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Actions document</h3>
                  <p>PDF, signature, paiement et export.</p>
                </div>
                <FileCheck2 size={24} />
              </div>

              <div className="documentActions">
                <button><Eye size={18} /> Prévisualiser PDF</button>
                <button><Download size={18} /> Télécharger</button>
                <button><Send size={18} /> Envoyer au client</button>
                <button><FileCheck2 size={18} /> Export comptable</button>
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Préconisations IA</h3>
                  <p>Transformer plus vite, limiter les problèmes.</p>
                </div>
                <BrainCircuit size={24} />
              </div>

              <div className="recommendationList">
                <div>
                  <strong>Relancer avec ton premium</strong>
                  <p>Le client a ouvert le devis mais n’a pas signé.</p>
                  <button onClick={() => setModal("relance")}>Préparer relance</button>
                </div>

                <div>
                  <strong>Proposer acompte</strong>
                  <p>Réduit le risque client et sécurise le démarrage.</p>
                  <button onClick={() => setModal("paiement")}>Créer lien</button>
                </div>

                <div>
                  <strong>Transformer en abonnement</strong>
                  <p>Maintenance possible : +120 €/mois.</p>
                  <button onClick={() => setModal("abonnement")}>Créer MRR</button>
                </div>
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Connexions modules</h3>
                  <p>Chaque action impacte le reste.</p>
                </div>
                <BarChart3 size={24} />
              </div>

              <div className="moduleLinks">
                <Link href="/clients">CRM client</Link>
                <Link href="/finance">Finance & Banque</Link>
                <Link href="/comptabilite">Comptabilité</Link>
                <Link href="/automatisation">Automatisations</Link>
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
              {modal === "paiement" ? <CreditCard /> : modal === "signature" ? <PenLine /> : modal === "relance" ? <Send /> : <FileText />}
            </div>

            <h3>
              {modal === "devis" && "Créer un devis premium"}
              {modal === "facture" && "Créer une facture"}
              {modal === "signature" && "Envoyer pour signature"}
              {modal === "paiement" && "Créer un lien de paiement"}
              {modal === "relance" && "Préparer une relance IA"}
              {modal === "abonnement" && "Transformer en abonnement"}
            </h3>

            <p>
              Action prête à connecter : CRM, Stripe, banque, comptabilité, PDF,
              signature électronique et automatisations.
            </p>

            <div className="modalFields">
              <input placeholder="Client / entreprise" />
              <input placeholder="Service / prestation" />
              <input placeholder="Montant / échéance" />
            </div>

            <div className="modalActions">
              <button onClick={() => setModal(null)}>Annuler</button>
              <Link href={modal === "devis" || modal === "facture" ? "/factures" : "/finance"}>
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
              <h3>Copilote Facturation FlowBiz</h3>
              <p>Réduire les retards, convertir les devis et améliorer l’expérience client.</p>
            </div>
          </div>

          <div className="drawerList">
            <div>
              <strong>1. Relancer Acme Corp</strong>
              <p>Devis ouvert. Potentiel : 4 250 €. Relance premium recommandée.</p>
              <button onClick={() => setModal("relance")}>Préparer relance</button>
            </div>

            <div>
              <strong>2. Sécuriser Beta LLC</strong>
              <p>Devis signé mais acompte non payé. Envoyer un lien de paiement.</p>
              <button onClick={() => setModal("paiement")}>Créer paiement</button>
            </div>

            <div>
              <strong>3. Limiter problème Gamma</strong>
              <p>Facture en retard + risque SAV. Envoyer suivi qualité avant relance ferme.</p>
              <Link href="/clients">Voir client</Link>
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
        <div className={`statIcon ${color}`}>{icon}</div>
      </div>
      <div className={`miniLine ${color}`} />
    </div>
  );
}
