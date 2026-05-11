"use client";

import "./rh.css";
import Link from "next/link";
import { useState } from "react";
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
  UserPlus,
  CalendarDays,
  BadgeEuro,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  Settings,
  Zap,
  Mail,
  Phone,
  FileCheck2,
  X,
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

const employees = [
  {
    name: "Sarah Martin",
    role: "Cheffe de projet",
    department: "Marketing",
    status: "Présent",
    salary: "3 200 €",
    email: "sarah.martin@flowbiz.fr",
    phone: "+33 6 12 34 56 78",
    contract: "CDI",
  },
  {
    name: "Thomas Bernard",
    role: "Développeur Full Stack",
    department: "Tech",
    status: "Présent",
    salary: "3 800 €",
    email: "thomas.bernard@flowbiz.fr",
    phone: "+33 6 22 45 78 11",
    contract: "CDI",
  },
  {
    name: "Julie Dubois",
    role: "Comptable",
    department: "Finance",
    status: "Présent",
    salary: "2 700 €",
    email: "julie.dubois@flowbiz.fr",
    phone: "+33 6 45 78 90 12",
    contract: "CDI",
  },
  {
    name: "Lucas Moreau",
    role: "Commercial",
    department: "Ventes",
    status: "En congé",
    salary: "2 900 €",
    email: "lucas.moreau@flowbiz.fr",
    phone: "+33 6 78 90 12 34",
    contract: "CDD",
  },
];

const rhSteps = ["Besoin", "Recrutement", "Contrat", "Planning", "Paie", "Performance"];

export default function RHPage() {
  const [selected, setSelected] = useState(employees[0]);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="rhLayout">
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
              className={label === "RH" ? "menuItem active" : "menuItem"}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebarCard">
          <Users size={22} />
          <h3>RH Intelligence</h3>
          <p>Suivi équipe, coûts, contrats et prévision RH.</p>
          <button type="button" onClick={() => setAiOpen(true)}>
            Analyser RH
          </button>
        </div>
      </aside>

      <main className="mainContent">
        <header className="topbar">
          <div>
            <h2>Ressources humaines</h2>
            <p>Gérez vos employés, contrats, plannings, congés et coûts RH.</p>
          </div>

          <div className="topActions">
            <div className="searchBar">
              <Search size={18} />
              <input placeholder="Rechercher employé, contrat, département..." />
            </div>

            <button type="button" className="notifBtn">
              <Bell size={18} />
              <span>2</span>
            </button>

            <button type="button" className="iaTopBtn" onClick={() => setAiOpen(true)}>
              <Sparkles size={18} />
              IA RH
            </button>
          </div>
        </header>

        <section className="heroCard">
          <div className="heroGlow" />

          <div className="heroContent">
            <span>FlowBiz People Management</span>
            <h1>Pilotez votre équipe avec une vision de dirigeant</h1>
            <p>
              Suivez les salariés, contrats, absences, masse salariale, planning et impact
              financier. FlowBiz relie les RH au business plan, à la finance et à la performance.
            </p>

            <div className="heroButtons">
              <button type="button" className="primaryBtn">
                <UserPlus size={18} />
                Ajouter un employé
              </button>

              <Link className="secondaryBtn" href="/finance">
                <BadgeEuro size={18} />
                Voir coût RH
              </Link>

              <button type="button" className="greenBtn" onClick={() => setAiOpen(true)}>
                <Sparkles size={18} />
                Analyser l’équipe
              </button>
            </div>
          </div>

          <div className="heroSignal">
            <Users size={28} />
            <strong>Équipe active</strong>
            <p>3 présents, 1 congé prévu, 2 alertes contrat.</p>
          </div>
        </section>

        <section className="statsGrid">
          <div className="statCard">
            <div className="statTop">
              <span>Total employés</span>
              <Users size={20} />
            </div>
            <h2>4</h2>
            <p>+1 recrutement prévu</p>
            <div className="miniLine blue" />
          </div>

          <div className="statCard">
            <div className="statTop">
              <span>Présents aujourd’hui</span>
              <CheckCircle2 size={20} />
            </div>
            <h2>3</h2>
            <p>75% de présence</p>
            <div className="miniLine green" />
          </div>

          <div className="statCard">
            <div className="statTop">
              <span>Masse salariale</span>
              <BadgeEuro size={20} />
            </div>
            <h2>12 600 €</h2>
            <p>Mensuel estimé</p>
            <div className="miniLine purple" />
          </div>

          <div className="statCard">
            <div className="statTop">
              <span>Alertes RH</span>
              <AlertTriangle size={20} />
            </div>
            <h2>2</h2>
            <p>Contrats à vérifier</p>
            <div className="miniLine pink" />
          </div>
        </section>

        <section className="rhGrid">
          <div className="leftColumn">
            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Parcours RH</h3>
                  <p>Besoin → recrutement → contrat → paie → performance.</p>
                </div>
                <Briefcase size={26} />
              </div>

              <div className="journey">
                {rhSteps.map((step, index) => (
                  <div className="journeyStep" key={step}>
                    <div>{index + 1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Équipe</h3>
                  <p>Vue opérationnelle des collaborateurs.</p>
                </div>

                <button type="button" className="smallBtn">
                  <UserPlus size={16} />
                  Ajouter
                </button>
              </div>

              <div className="employeeList">
                {employees.map((employee) => (
                  <button
                    type="button"
                    key={employee.email}
                    className={
                      selected.email === employee.email
                        ? "employeeRow activeRow"
                        : "employeeRow"
                    }
                    onClick={() => setSelected(employee)}
                  >
                    <div className="avatarMini">{employee.name.slice(0, 2)}</div>

                    <div>
                      <h4>{employee.name}</h4>
                      <p>{employee.email}</p>
                    </div>

                    <span>{employee.role}</span>
                    <span>{employee.department}</span>

                    <strong
                      className={
                        employee.status === "Présent"
                          ? "statusBadge"
                          : "statusBadge warningBadge"
                      }
                    >
                      {employee.status}
                    </strong>

                    <strong>{employee.salary}</strong>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="rightColumn">
            <section className="card employeeCard">
              <div className="detailsTop">
                <div className="bigAvatar">{selected.name.slice(0, 2)}</div>
                <div>
                  <h3>{selected.name}</h3>
                  <p>{selected.role}</p>
                </div>
              </div>

              <div className="detailsList">
                <div>
                  <Mail size={18} />
                  <span>{selected.email}</span>
                </div>

                <div>
                  <Phone size={18} />
                  <span>{selected.phone}</span>
                </div>

                <div>
                  <BadgeEuro size={18} />
                  <span>Salaire brut : {selected.salary} / mois</span>
                </div>

                <div>
                  <CalendarDays size={18} />
                  <span>Prochain congé : 24/06/2026</span>
                </div>

                <div>
                  <FileCheck2 size={18} />
                  <span>Contrat : {selected.contract} · dossier complet à 82%</span>
                </div>
              </div>

              <div className="aiInsight">
                <Sparkles size={22} />
                <div>
                  <h4>Analyse IA RH</h4>
                  <p>
                    Ce poste doit être relié au prévisionnel financier pour mesurer son impact
                    réel sur la trésorerie et la rentabilité.
                  </p>
                </div>
              </div>

              <div className="detailsButtons">
                <Link href="/business-plan" className="primaryBtn">
                  Impact BP
                </Link>

                <Link href="/finance" className="secondaryBtn">
                  Voir finance
                </Link>
              </div>
            </section>

            <section className="card finalCard">
              <ShieldCheck size={30} />
              <h3>Prévision RH</h3>
              <p>
                Avant chaque embauche, FlowBiz recommande d’anticiper les charges sociales,
                le besoin réel, la trésorerie et la rentabilité mensuelle.
              </p>

              <button type="button" className="primaryBtn" onClick={() => setAiOpen(true)}>
                Générer plan RH
                <ArrowUpRight size={16} />
              </button>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Modules reliés</h3>
                  <p>RH connectée à finance, compta et pilotage.</p>
                </div>
                <ArrowUpRight size={24} />
              </div>

              <div className="shortcutGrid">
                <Link href="/finance" className="shortcutItem">
                  <Wallet size={22} />
                  <span>Finance</span>
                </Link>

                <Link href="/comptabilite" className="shortcutItem">
                  <BarChart3 size={22} />
                  <span>Comptabilité</span>
                </Link>

                <Link href="/business-plan" className="shortcutItem">
                  <Briefcase size={22} />
                  <span>Business Plan</span>
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
          <button type="button" className="closeAi" onClick={() => setAiOpen(false)}>
            <X size={22} />
          </button>

          <div className="drawerHead">
            <Sparkles size={32} />
            <div>
              <h3>Copilote RH FlowBiz</h3>
              <p>Plan d’action dirigeant.</p>
            </div>
          </div>

          <div className="drawerList">
            <div>
              <strong>1. Vérifier les contrats</strong>
              <p>2 dossiers nécessitent une vérification avant validation.</p>
            </div>

            <div>
              <strong>2. Anticiper le coût RH</strong>
              <p>Relier la masse salariale au prévisionnel financier.</p>
            </div>

            <div>
              <strong>3. Préparer recrutement</strong>
              <p>Définir le besoin réel avant d’ajouter un nouveau salarié.</p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
