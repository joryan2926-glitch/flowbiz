
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard, Users, FileText, Wallet, BarChart3, BrainCircuit,
  Briefcase, LineChart, Zap, Settings, Bell, Search, Sparkles,
  CheckCircle2, Clock3, AlertTriangle, ArrowUpRight, Mail, Receipt,
  CalendarDays, PlayCircle, ShieldCheck
} from "lucide-react";
import "../globals.css";

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
  ["Automatisations", "/automatisation", Zap],
  ["Paramètres", "/parametres", Settings],
];

export default function AutomatisationPage() {
  const [relance, setRelance] = useState(true);
  const [banque, setBanque] = useState(false);
  const [compta, setCompta] = useState(true);

  return (
    <div className="flowbizLayout">
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
            <Link key={href} href={href} className={label === "Automatisations" ? "menuItem active" : "menuItem"}>
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebarCard">
          <Zap size={22} />
          <h3>Automatisation IA</h3>
          <p>Relances, banque, compta et rappels connectés.</p>
        </div>
      </aside>

      <main className="mainContent">
        <header className="topbar">
          <div>
            <h2>Automatisations</h2>
            <p>Automatisez les actions répétitives et reliez tous les modules FlowBiz.</p>
          </div>

          <div className="topActions">
            <div className="searchBar">
              <Search size={18} />
              <input placeholder="Rechercher une automatisation..." />
            </div>
            <button className="notifBtn"><Bell size={18} /><span>3</span></button>
            <button className="iaTopBtn"><Sparkles size={18} /> IA</button>
          </div>
        </header>

        <section className="heroCard">
          <div className="heroGlow" />
          <div className="heroContent">
            <span>FlowBiz Automation Center</span>
            <h1>Automatisez votre business comme un vrai système intelligent</h1>
            <p>
              Relances clients, factures, synchronisation bancaire, rappels comptables,
              alertes IA et actions commerciales peuvent être déclenchés automatiquement.
            </p>
            <div className="heroButtons">
              <button className="primaryBtn"><PlayCircle size={18} /> Lancer scénario</button>
              <Link className="secondaryBtn" href="/ia"><BrainCircuit size={18} /> IA Conseil</Link>
            </div>
          </div>
        </section>

        <section className="statsGrid">
          <div className="statCard"><div className="statTop"><span>Scénarios actifs</span><Zap size={20}/></div><h2>7</h2><p>+3 cette semaine</p></div>
          <div className="statCard"><div className="statTop"><span>Temps gagné</span><Clock3 size={20}/></div><h2>12h</h2><p>Estimation mensuelle</p></div>
          <div className="statCard"><div className="statTop"><span>Relances IA</span><Mail size={20}/></div><h2>24</h2><p>Actions envoyées</p></div>
          <div className="statCard"><div className="statTop"><span>Erreurs évitées</span><ShieldCheck size={20}/></div><h2>9</h2><p>Contrôles automatiques</p></div>
        </section>

        <section className="dashboardGrid">
          <div className="leftColumn">
            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Scénarios principaux</h3>
                  <p>Activez ou désactivez les automatisations clés.</p>
                </div>
                <Zap size={26} />
              </div>

              <div className="automationList">
                <Auto title="Relance automatique des devis" text="Relance après 3 jours sans réponse." active={relance} setActive={setRelance} icon={<FileText size={22} />} />
                <Auto title="Synchronisation bancaire" text="Import automatique des mouvements bancaires." active={banque} setActive={setBanque} icon={<Wallet size={22} />} />
                <Auto title="Pré-classement comptable" text="Prépare les écritures depuis factures et paiements." active={compta} setActive={setCompta} icon={<BarChart3 size={22} />} />
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Parcours automatisé</h3>
                  <p>Prospect → devis → relance → paiement → comptabilité.</p>
                </div>
                <ArrowUpRight size={26} />
              </div>

              <div className="journey">
                {["Prospect", "Devis", "Relance", "Signature", "Paiement", "Compta"].map((s, i) => (
                  <div className="journeyStep" key={s}><div>{i + 1}</div><span>{s}</span></div>
                ))}
              </div>
            </section>
          </div>

          <div className="rightColumn">
            <section className="card finalCard">
              <Sparkles size={30} />
              <h3>Recommandation IA</h3>
              <p>Active les relances devis + synchronisation bancaire pour connecter ventes, finance et comptabilité.</p>
              <Link href="/factures" className="primaryBtn">Voir factures <ArrowUpRight size={16}/></Link>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div><h3>Modules connectés</h3><p>Tout le parcours est relié.</p></div>
                <Settings size={24}/>
              </div>
              <div className="shortcutGrid">
                <Link href="/clients"><Users size={22}/>Clients</Link>
                <Link href="/factures"><Receipt size={22}/>Factures</Link>
                <Link href="/finance"><Wallet size={22}/>Finance</Link>
                <Link href="/comptabilite"><BarChart3 size={22}/>Compta</Link>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

function Auto({ title, text, active, setActive, icon }: any) {
  return (
    <div className="autoRow">
      <div className="autoIcon">{icon}</div>
      <div><h4>{title}</h4><p>{text}</p></div>
      <button onClick={() => setActive(!active)} className={active ? "toggle activeToggle" : "toggle"}><span /></button>
    </div>
  );
}
