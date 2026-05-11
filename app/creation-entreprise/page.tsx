"use client";

import "./creation-entreprise.css";

import { useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  Sparkles,
  Building2,
  Briefcase,
  ShieldCheck,
  FileText,
  Wallet,
  BadgeEuro,
  CheckCircle2,
  ArrowRight,
  BrainCircuit,
  Rocket,
  Users,
  Landmark,
  Target,
  Clock3,
  Bell,
  Search,
  Star,
  Zap,
  TrendingUp,
  BarChart3,
  Layers3,
  Receipt,
} from "lucide-react";

export default function CreationEntreprisePage() {
  const [selectedForm, setSelectedForm] = useState("SASU");

  const forms = [
    {
      name: "SASU",
      desc: "Structure premium flexible",
      tax: "IS",
      capital: "Libre",
      color: "purple",
    },
    {
      name: "EURL",
      desc: "Structure sécurisée",
      tax: "IR / IS",
      capital: "Libre",
      color: "blue",
    },
    {
      name: "SAS",
      desc: "Projet associé",
      tax: "IS",
      capital: "Libre",
      color: "pink",
    },
    {
      name: "SARL",
      desc: "Cadre classique",
      tax: "IR / IS",
      capital: "Libre",
      color: "green",
    },
  ];

  const steps = [
    "Analyse du projet",
    "Choix juridique",
    "Prévisionnel",
    "Dépôt capital",
    "Statuts",
    "Immatriculation",
    "Compte bancaire",
    "Lancement",
  ];

  const alerts = [
    {
      title: "Statuts à signer",
      desc: "Validation fondateur",
      color: "purple",
    },
    {
      title: "Capital en attente",
      desc: "Dépôt bancaire",
      color: "orange",
    },
    {
      title: "Prévisionnel validé",
      desc: "FlowBiz IA",
      color: "green",
    },
  ];

  return (
    <div className="creationLayout">
      <Sidebar />

      <main className="creationMain">

        <header className="creationTopbar">

          <div>
            <h1>
              Création <span>d’entreprise</span>
            </h1>

            <p>
              Lancez votre société avec un parcours intelligent,
              automatisé et premium.
            </p>
          </div>

          <div className="topbarActions">

            <div className="searchBox">
              <Search size={16} />
              <input
                type="text"
                placeholder="Rechercher statut, aide, financement..."
              />
            </div>

            <button className="iaButton">
              <Sparkles size={16} />
              FlowBiz IA
            </button>

          </div>

        </header>

        <section className="creationHero">

          <div className="heroLeft">

            <span className="heroMini">
              FlowBiz Startup Command Center
            </span>

            <h2>
              Créez votre <span>entreprise</span>
              <br />
              comme un CEO premium
            </h2>

            <p>
              Structure juridique, statuts, prévisionnel,
              dépôt de capital, aides, financement, branding,
              automatisation et pilotage intelligent.
            </p>

            <div className="heroButtons">

              <button className="primaryBtn">
                <Rocket size={18} />
                Démarrer maintenant
              </button>

              <button className="secondaryBtn">
                <BrainCircuit size={18} />
                Analyse IA
              </button>

              <button className="secondaryBtn">
                <Wallet size={18} />
                Financement
              </button>

            </div>

          </div>

          <div className="heroRight">

            <div className="cubeContainer">

              <div className="flowCube">
                <div className="cubeGlow"></div>

                <div className="cubeLogo">
                  <Building2 size={58} />
                </div>

              </div>

            </div>

            <div className="heroAlerts">

              <h4>Préconisations IA</h4>

              {alerts.map((item, index) => (
                <div
                  key={index}
                  className={`alertCard ${item.color}`}
                >
                  <div className="alertIcon">
                    <Sparkles size={15} />
                  </div>

                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>

                  <ArrowRight size={15} />
                </div>
              ))}

            </div>

          </div>

        </section>

        <section className="statsGrid">

          <div className="statCard blue">
            <div className="statIcon">
              <TrendingUp size={20} />
            </div>

            <div>
              <span>Budget projet</span>
              <h3>73 250 €</h3>
              <p>Prévisionnel estimé</p>
            </div>
          </div>

          <div className="statCard purple">
            <div className="statIcon">
              <Landmark size={20} />
            </div>

            <div>
              <span>Financement</span>
              <h3>91%</h3>
              <p>Eligible aides & garanties</p>
            </div>
          </div>

          <div className="statCard green">
            <div className="statIcon">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Dossier validé</span>
              <h3>7/9</h3>
              <p>Étapes terminées</p>
            </div>
          </div>

          <div className="statCard pink">
            <div className="statIcon">
              <Clock3 size={20} />
            </div>

            <div>
              <span>Délai moyen</span>
              <h3>5 jours</h3>
              <p>Immatriculation estimée</p>
            </div>
          </div>

        </section>

        <section className="creationContent">

          <div className="leftContent">

            <div className="glassCard">

              <div className="sectionHeader">
                <h3>
                  <Layers3 size={20} />
                  Parcours de création
                </h3>

                <span>Automatisation intelligente</span>
              </div>

              <div className="timeline">

                {steps.map((step, index) => (
                  <div key={index} className="timelineItem">

                    <div className="timelineCircle">
                      {index + 1}
                    </div>

                    <span>{step}</span>

                    {index < steps.length - 1 && (
                      <div className="timelineLine"></div>
                    )}

                  </div>
                ))}

              </div>

            </div>

            <div className="glassCard">

              <div className="sectionHeader">
                <h3>
                  <Briefcase size={20} />
                  Structures juridiques
                </h3>

                <span>Conseils IA premium</span>
              </div>

              <div className="formsGrid">

                {forms.map((form, index) => (
                  <div
                    key={index}
                    className={`formCard ${
                      selectedForm === form.name
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedForm(form.name)
                    }
                  >

                    <div className={`formBadge ${form.color}`}>
                      {form.name}
                    </div>

                    <h4>{form.desc}</h4>

                    <p>Fiscalité : {form.tax}</p>

                    <span>
                      Capital : {form.capital}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            <div className="glassCard">

              <div className="sectionHeader">
                <h3>
                  <ShieldCheck size={20} />
                  Qualité & sécurité
                </h3>

                <span>FlowBiz Protection</span>
              </div>

              <div className="qualityGrid">

                <div className="qualityCard">
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>Statuts sécurisés</strong>
                    <p>Validation IA juridique</p>
                  </div>
                </div>

                <div className="qualityCard">
                  <Wallet size={18} />
                  <div>
                    <strong>Optimisation financière</strong>
                    <p>Aides & garanties détectées</p>
                  </div>
                </div>

                <div className="qualityCard">
                  <Receipt size={18} />
                  <div>
                    <strong>Documents générés</strong>
                    <p>Automatisation complète</p>
                  </div>
                </div>

                <div className="qualityCard">
                  <Bell size={18} />
                  <div>
                    <strong>Rappels intelligents</strong>
                    <p>Échéances pilotées</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          <aside className="rightContent">

            <div className="sideCard">

              <div className="sectionHeader">
                <h3>
                  <Target size={18} />
                  Objectifs CEO
                </h3>
              </div>

              <div className="goalItem">
                <span>Business plan</span>
                <strong>92%</strong>
              </div>

              <div className="goalBar">
                <div className="goalFill purple"></div>
              </div>

              <div className="goalItem">
                <span>Prévisionnel financier</span>
                <strong>87%</strong>
              </div>

              <div className="goalBar">
                <div className="goalFill blue"></div>
              </div>

              <div className="goalItem">
                <span>Documents juridiques</span>
                <strong>95%</strong>
              </div>

              <div className="goalBar">
                <div className="goalFill green"></div>
              </div>

            </div>

            <div className="sideCard">

              <div className="sectionHeader">
                <h3>
                  <BarChart3 size={18} />
                  IA recommandations
                </h3>
              </div>

              <div className="recommendationItem">
                <Zap size={16} />
                <div>
                  <strong>SASU recommandée</strong>
                  <p>Protection & évolutivité</p>
                </div>
              </div>

              <div className="recommendationItem">
                <Users size={16} />
                <div>
                  <strong>France Active détecté</strong>
                  <p>Garantie bancaire possible</p>
                </div>
              </div>

              <div className="recommendationItem">
                <Star size={16} />
                <div>
                  <strong>FlowBiz Academy</strong>
                  <p>Formation CPF possible</p>
                </div>
              </div>

            </div>

            <div className="sideCard premium">

              <div className="premiumGlow"></div>

              <h3>FlowBiz AI Premium</h3>

              <p>
                Assistant stratégique intelligent
                pour automatiser la création,
                les aides et le financement.
              </p>

              <button>
                Activer l’IA
              </button>

            </div>

          </aside>

        </section>

      </main>
    </div>
  );
}
