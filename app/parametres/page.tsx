"use client";

import "./parametres.css";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard, Users, FileText, Wallet, BarChart3, BrainCircuit,
  Briefcase, LineChart, Zap, Settings, Bell, Search, Sparkles,
  ShieldCheck, Plug, CreditCard, User, Lock, Database, Palette,
  CheckCircle2, ArrowUpRight, X, Mail, Building2, Globe2
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
  ["Automatisation", "/automatisation", Zap],
  ["RH", "/rh", Users],
  ["Paramètres", "/parametres", Settings],
];

export default function ParametresPage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [bank, setBank] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [supabase, setSupabase] = useState(true);
  const [email, setEmail] = useState(true);

  return (
    <div className="settingsLayout">
      <aside className="sidebar">
        <div className="brand">
          <img src="/flowbiz-logo.png" alt="FlowBiz" className="logoImage" />
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
              className={label === "Paramètres" ? "menuItem active" : "menuItem"}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebarCard">
          <Settings size={22} />
          <h3>Configuration</h3>
          <p>Connecteurs, sécurité, profil, IA et automatisations.</p>
          <button onClick={() => setAiOpen(true)}>Assistant config</button>
        </div>
      </aside>

      <main className="mainContent">
        <header className="topbar">
          <div>
            <h2>Paramètres</h2>
            <p>Configurez votre espace FlowBiz, vos connexions, votre sécurité et vos préférences.</p>
          </div>

          <div className="topActions">
            <div className="searchBar">
              <Search size={18} />
              <input placeholder="Rechercher paramètre, connexion, sécurité..." />
            </div>

            <button className="notifBtn">
              <Bell size={18} />
              <span>1</span>
            </button>

            <button className="iaTopBtn" onClick={() => setAiOpen(true)}>
              <Sparkles size={18} />
              Assistant
            </button>
          </div>
        </header>

        <section className="heroCard">
          <div className="heroGlow" />
          <div className="heroContent">
            <span>FlowBiz Control Center</span>
            <h1>Configurez votre plateforme comme un vrai système SaaS</h1>
            <p>
              Préparez les intégrations banque, Stripe, Supabase, emails, sécurité,
              rôles utilisateurs, automatisations et préférences visuelles.
            </p>

            <div className="heroButtons">
              <button className="primaryBtn" onClick={() => setAiOpen(true)}>
                <Sparkles size={18} />
                Vérifier configuration
              </button>

              <Link href="/automatisation" className="secondaryBtn">
                <Zap size={18} />
                Automatisations
              </Link>

              <Link href="/finance" className="greenBtn">
                <Wallet size={18} />
                Connexions finance
              </Link>
            </div>
          </div>

          <div className="heroSignal">
            <ShieldCheck size={28} />
            <strong>Système prêt à 78%</strong>
            <p>Base connectée, paiements et banque à finaliser.</p>
          </div>
        </section>

        <section className="statsGrid">
          <div className="statCard">
            <div className="statTop"><span>Connexions</span><Plug size={20} /></div>
            <h2>4</h2>
            <p>Services préparés</p>
            <div className="miniLine blue" />
          </div>

          <div className="statCard">
            <div className="statTop"><span>Sécurité</span><ShieldCheck size={20} /></div>
            <h2>82%</h2>
            <p>Protection configurée</p>
            <div className="miniLine green" />
          </div>

          <div className="statCard">
            <div className="statTop"><span>Automatisations</span><Zap size={20} /></div>
            <h2>7</h2>
            <p>Scénarios prêts</p>
            <div className="miniLine purple" />
          </div>

          <div className="statCard">
            <div className="statTop"><span>Alertes</span><Bell size={20} /></div>
            <h2>1</h2>
            <p>Stripe à finaliser</p>
            <div className="miniLine pink" />
          </div>
        </section>

        <section className="settingsGrid">
          <div className="leftColumn">
            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Connexions externes</h3>
                  <p>Préparez les API et services essentiels.</p>
                </div>
                <Plug size={26} />
              </div>

              <div className="settingList">
                <SettingRow title="Connexion bancaire" text="Import automatique des transactions et rapprochement." active={bank} setActive={setBank} icon={<Wallet size={22} />} />
                <SettingRow title="Stripe / Paiements" text="Paiements clients, abonnements, checkout et facturation." active={stripe} setActive={setStripe} icon={<CreditCard size={22} />} />
                <SettingRow title="Supabase Database" text="Base clients, factures, RH, finance et automatisations." active={supabase} setActive={setSupabase} icon={<Database size={22} />} />
                <SettingRow title="Emails transactionnels" text="Relances, devis, factures, notifications et invitations." active={email} setActive={setEmail} icon={<Mail size={22} />} />
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Sécurité & accès</h3>
                  <p>Préparez les rôles, permissions et protection du compte.</p>
                </div>
                <Lock size={26} />
              </div>

              <div className="securityGrid">
                <SecurityItem icon={<User size={22} />} title="Profil dirigeant" text="Compte principal administrateur." />
                <SecurityItem icon={<Users size={22} />} title="Rôles équipe" text="Admin, comptable, commercial, RH." />
                <SecurityItem icon={<ShieldCheck size={22} />} title="Validation actions" text="Confirmation avant opérations sensibles." />
                <SecurityItem icon={<Database size={22} />} title="Sauvegarde" text="Données critiques prêtes à sécuriser." />
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Préférences plateforme</h3>
                  <p>Personnalisez l’expérience FlowBiz.</p>
                </div>
                <Palette size={26} />
              </div>

              <div className="preferenceGrid">
                <button className="prefCard activePref">
                  <Palette size={22} />
                  <strong>Thème FlowBiz</strong>
                  <span>Bleu / violet / rose</span>
                </button>

                <button className="prefCard">
                  <Building2 size={22} />
                  <strong>Vue dirigeant</strong>
                  <span>Dashboard CEO</span>
                </button>

                <button className="prefCard">
                  <Globe2 size={22} />
                  <strong>Langue</strong>
                  <span>Français</span>
                </button>
              </div>
            </section>
          </div>

          <div className="rightColumn">
            <section className="card systemCard">
              <div className="sectionHeader">
                <div>
                  <h3>État système</h3>
                  <p>Pré-validation technique.</p>
                </div>
                <CheckCircle2 size={26} />
              </div>

              <div className="systemList">
                <SystemLine label="Pages reliées" status="OK" />
                <SystemLine label="Navigation sidebar" status="OK" />
                <SystemLine label="Supabase" status="Connecté" />
                <SystemLine label="Stripe" status="À finaliser" warning />
                <SystemLine label="Banque" status="À connecter" warning />
                <SystemLine label="IA Conseil" status="Simulation prête" />
              </div>
            </section>

            <section className="card finalCard">
              <Sparkles size={30} />
              <h3>Assistant configuration</h3>
              <p>
                FlowBiz recommande de finaliser Stripe et la banque pour connecter paiements,
                factures, finance et comptabilité.
              </p>
              <button className="primaryBtn" onClick={() => setAiOpen(true)}>
                Générer checklist <ArrowUpRight size={16} />
              </button>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Modules reliés</h3>
                  <p>Connexion directe aux pages importantes.</p>
                </div>
                <ArrowUpRight size={24} />
              </div>

              <div className="shortcutGrid">
                <Link href="/automatisation" className="shortcutItem">
                  <Zap size={22} />
                  <span>Automatisation</span>
                </Link>

                <Link href="/finance" className="shortcutItem">
                  <Wallet size={22} />
                  <span>Finance</span>
                </Link>

                <Link href="/comptabilite" className="shortcutItem">
                  <BarChart3 size={22} />
                  <span>Comptabilité</span>
                </Link>

                <Link href="/ia" className="shortcutItem">
                  <BrainCircuit size={22} />
                  <span>IA Conseil</span>
                </Link>
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
            <Sparkles size={32} />
            <div>
              <h3>Assistant paramètres FlowBiz</h3>
              <p>Checklist de configuration.</p>
            </div>
          </div>

          <div className="drawerList">
            <div>
              <strong>1. Finaliser Stripe</strong>
              <p>Activer checkout, abonnements, webhooks et paiements récurrents.</p>
            </div>

            <div>
              <strong>2. Connecter la banque</strong>
              <p>Préparer l’import automatique des transactions pour finance et comptabilité.</p>
            </div>

            <div>
              <strong>3. Sécuriser les rôles</strong>
              <p>Créer les rôles admin, comptable, commercial et RH.</p>
            </div>

            <div>
              <strong>4. Relier les automatisations</strong>
              <p>Connecter relances, factures, paiements et alertes IA.</p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function SettingRow({ title, text, active, setActive, icon }: any) {
  return (
    <div className={active ? "settingRow activeSetting" : "settingRow"}>
      <div className="settingIcon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
      <button onClick={() => setActive(!active)} className={active ? "toggle activeToggle" : "toggle"}>
        <span />
      </button>
    </div>
  );
}

function SecurityItem({ icon, title, text }: any) {
  return (
    <div className="securityItem">
      <div className="settingIcon">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function SystemLine({ label, status, warning }: any) {
  return (
    <div className="systemLine">
      <span>{label}</span>
      <strong className={warning ? "warningText" : "successText"}>{status}</strong>
    </div>
  );
}
