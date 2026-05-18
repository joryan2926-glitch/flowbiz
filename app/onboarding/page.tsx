"use client";

import "./onboarding.css";

import {
  Building2,
  Check,
  ChevronRight,
  CreditCard,
  Sparkles,
  BarChart3,
  Wallet,
  Users,
  CalendarDays,
  BrainCircuit,
  ShieldCheck,
  Lock,
  Globe,
  Paintbrush,
  CheckCircle2,
} from "lucide-react";

import { useState } from "react";

export default function OnboardingPage() {

  const [step, setStep] = useState(1);

  const [selectedModules, setSelectedModules] =
    useState<string[]>([
      "CRM",
      "Finance",
    ]);

  const [connectedApps, setConnectedApps] =
    useState<string[]>([]);

  const totalSteps = 5;

  const modules = [
    {
      name: "CRM",
      icon: Users,
      color: "infoIcon",
    },

    {
      name: "Finance",
      icon: Wallet,
      color: "successIcon",
    },

    {
      name: "Analytics",
      icon: BarChart3,
      color: "premiumIcon",
    },

    {
      name: "Agenda",
      icon: CalendarDays,
      color: "warningIcon",
    },

    {
      name: "IA",
      icon: BrainCircuit,
      color: "premiumIcon",
    },

    {
      name: "Automatisation",
      icon: Sparkles,
      color: "dangerIcon",
    },
  ];

  const integrations = [
    "Stripe",
    "Google",
    "Slack",
    "Notion",
    "Banque",
  ];

  const toggleModule = (module: string) => {

    if (selectedModules.includes(module)) {

      setSelectedModules(
        selectedModules.filter(
          (m) => m !== module
        )
      );

    } else {

      setSelectedModules([
        ...selectedModules,
        module,
      ]);

    }

  };

  const toggleApp = (app: string) => {

    if (connectedApps.includes(app)) {

      setConnectedApps(
        connectedApps.filter(
          (a) => a !== app
        )
      );

    } else {

      setConnectedApps([
        ...connectedApps,
        app,
      ]);

    }

  };

  return (

    <div className="onboardingPage">

      {/* HEADER */}

      <div className="onboardingTop">

        <div>

          <p className="onboardingBadge">
            FLOWBIZ ONBOARDING
          </p>

          <h1 className="onboardingTitle">
            Configurez votre espace business
          </h1>

        </div>

        <div className="progressContainer">

          <div className="progressInfos">

            <span>
              Étape {step}/{totalSteps}
            </span>

            <span>
              {Math.round(
                (step / totalSteps) * 100
              )}%
            </span>

          </div>

          <div className="progressBar">

            <div
              className="progressFill"
              style={{
                width: `${
                  (step / totalSteps) * 100
                }%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="onboardingCard">

        {/* STEP 1 */}

        {step === 1 && (

          <div className="stepContent">

            <div className="stepHeader">

              <div className="stepIcon premiumIcon">
                <Building2 size={22} />
              </div>

              <div>

                <h2>
                  Informations entreprise
                </h2>

                <p>
                  Configurez votre activité.
                </p>

              </div>

            </div>

            <div className="formGrid">

              <div className="inputGroup">

                <label>
                  Nom entreprise
                </label>

                <input
                  placeholder="FlowBiz SAS"
                />

              </div>

              <div className="inputGroup">

                <label>
                  Secteur activité
                </label>

                <select>

                  <option>
                    SaaS
                  </option>

                  <option>
                    Immobilier
                  </option>

                  <option>
                    E-commerce
                  </option>

                  <option>
                    Conseil
                  </option>

                </select>

              </div>

              <div className="inputGroup">

                <label>
                  Taille équipe
                </label>

                <select>

                  <option>
                    1-5 employés
                  </option>

                  <option>
                    5-20 employés
                  </option>

                  <option>
                    20-50 employés
                  </option>

                </select>

              </div>

            </div>

          </div>

        )}

        {/* STEP 2 */}

        {step === 2 && (

          <div className="stepContent">

            <div className="stepHeader">

              <div className="stepIcon infoIcon">
                <Sparkles size={22} />
              </div>

              <div>

                <h2>
                  Modules FlowBiz
                </h2>

                <p>
                  Sélectionnez vos outils.
                </p>

              </div>

            </div>

            <div className="modulesGrid">

              {modules.map((module) => {

                const Icon = module.icon;

                const active =
                  selectedModules.includes(
                    module.name
                  );

                return (

                  <button
                    key={module.name}
                    className={`moduleCard ${
                      active
                        ? "activeModule"
                        : ""
                    }`}
                    onClick={() =>
                      toggleModule(module.name)
                    }
                  >

                    <div
                      className={`moduleIcon ${module.color}`}
                    >

                      <Icon size={20} />

                    </div>

                    <span>
                      {module.name}
                    </span>

                    {active && (
                      <CheckCircle2
                        size={18}
                        className="checkIcon"
                      />
                    )}

                  </button>

                );

              })}

            </div>

          </div>

        )}

        {/* STEP 3 */}

        {step === 3 && (

          <div className="stepContent">

            <div className="stepHeader">

              <div className="stepIcon successIcon">
                <Globe size={22} />
              </div>

              <div>

                <h2>
                  Connexions outils
                </h2>

                <p>
                  Activez vos intégrations.
                </p>

              </div>

            </div>

            <div className="integrationGrid">

              {integrations.map((app) => {

                const active =
                  connectedApps.includes(app);

                return (

                  <button
                    key={app}
                    className={`integrationCard ${
                      active
                        ? "activeIntegration"
                        : ""
                    }`}
                    onClick={() =>
                      toggleApp(app)
                    }
                  >

                    <div className="integrationLeft">

                      <div className="integrationIcon">

                        <CreditCard size={18} />

                      </div>

                      <div>

                        <strong>
                          {app}
                        </strong>

                        <p>
                          Connecter
                        </p>

                      </div>

                    </div>

                    {active ? (
                      <span className="status success">
                        Connecté
                      </span>
                    ) : (
                      <span className="status warning">
                        Inactif
                      </span>
                    )}

                  </button>

                );

              })}

            </div>

          </div>

        )}

        {/* STEP 4 */}

        {step === 4 && (

          <div className="stepContent">

            <div className="stepHeader">

              <div className="stepIcon warningIcon">
                <Paintbrush size={22} />
              </div>

              <div>

                <h2>
                  Branding entreprise
                </h2>

                <p>
                  Personnalisez votre espace.
                </p>

              </div>

            </div>

            <div className="brandingGrid">

              <div className="brandingCard">

                <h3>
                  Logo entreprise
                </h3>

                <button className="uploadButton">
                  Ajouter logo
                </button>

              </div>

              <div className="brandingCard">

                <h3>
                  Couleur principale
                </h3>

                <div className="colorChoices">

                  <span className="color blue"></span>
                  <span className="color purple"></span>
                  <span className="color green"></span>
                  <span className="color pink"></span>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* STEP 5 */}

        {step === 5 && (

          <div className="stepContent finalStep">

            <div className="finalIcon">

              <ShieldCheck size={54} />

            </div>

            <h2>
              FlowBiz est prêt 🚀
            </h2>

            <p>
              Votre environnement business
              intelligent est maintenant
              activé.
            </p>

            <div className="activationCards">

              <div className="activationCard">

                <Sparkles size={20} />

                IA Active

              </div>

              <div className="activationCard">

                <Lock size={20} />

                Sécurité entreprise

              </div>

              <div className="activationCard">

                <BarChart3 size={20} />

                Analytics temps réel

              </div>

            </div>

            <button className="launchButton">

              Accéder au Dashboard

              <ChevronRight size={18} />

            </button>

          </div>

        )}

        {/* FOOTER */}

        <div className="onboardingFooter">

          <button
            className="secondaryButton"
            disabled={step === 1}
            onClick={() =>
              setStep(step - 1)
            }
          >

            Retour

          </button>

          {step < totalSteps ? (

            <button
              className="primaryButton"
              onClick={() =>
                setStep(step + 1)
              }
            >

              Continuer

              <ChevronRight size={18} />

            </button>

          ) : (

            <button className="primaryButton">

              Terminer

              <Check size={18} />

            </button>

          )}

        </div>

      </div>

    </div>

  );

}
