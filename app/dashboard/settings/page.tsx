"use client";

/* ======================================================
FLOWBIZ SETTINGS
FINAL CONTROL CENTER
====================================================== */

import "./settings.css";

import {

  useState,

} from "react";

import {

  User2,
  Building2,
  ShieldCheck,
  Bell,
  Palette,
  CreditCard,
  KeyRound,
  Save,
  BrainCircuit,
  Mail,
  Globe,
  MoonStar,
  Lock,
  Users,
  Database,
  CloudCog,

} from "lucide-react";

/* ======================================================
PAGE
====================================================== */

export default function SettingsPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [

    companyName,
    setCompanyName,

  ] =
    useState("FlowBiz");

  const [

    email,
    setEmail,

  ] =
    useState(
      "contact@flowbiz.fr"
    );

  const [

    website,
    setWebsite,

  ] =
    useState(
      "https://flowbiz.fr"
    );

  const [

    darkMode,
    setDarkMode,

  ] =
    useState(true);

  const [

    notifications,
    setNotifications,

  ] =
    useState(true);

  /*
  ====================================================
  SAVE
  ====================================================
  */

  function saveSettings(){

    alert(
      "Paramètres sauvegardés"
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="settingsPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="settingsHeader">

        <div>

          <div className="settingsBadge">

            <BrainCircuit size={16} />

            FLOWBIZ SETTINGS

          </div>

          <h1>

            Workspace Settings

          </h1>

          <p>

            Gérez les paramètres,
            sécurité et configuration
            globale de FlowBiz.

          </p>

        </div>

        {/* ============================================== */}

        <button

          className="settingsSaveButton"

          onClick={
            saveSettings
          }
        >

          <Save size={18} />

          Sauvegarder

        </button>

      </header>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="settingsGrid">

        {/* ==============================================
        PROFILE
        ============================================== */}

        <div className="settingsCard">

          <div className="settingsCardTitle">

            <User2 size={18} />

            Profil

          </div>

          <div className="settingsInputs">

            <div className="settingsInput">

              <label>

                Nom entreprise

              </label>

              <div>

                <Building2
                  size={18}
                />

                <input

                  type="text"

                  value={companyName}

                  onChange={(e)=>

                    setCompanyName(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* ====================================== */}

            <div className="settingsInput">

              <label>

                Email

              </label>

              <div>

                <Mail
                  size={18}
                />

                <input

                  type="email"

                  value={email}

                  onChange={(e)=>

                    setEmail(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* ====================================== */}

            <div className="settingsInput">

              <label>

                Website

              </label>

              <div>

                <Globe
                  size={18}
                />

                <input

                  type="text"

                  value={website}

                  onChange={(e)=>

                    setWebsite(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </div>

        </div>

        {/* ==============================================
        SECURITY
        ============================================== */}

        <div className="settingsCard">

          <div className="settingsCardTitle">

            <ShieldCheck size={18} />

            Sécurité

          </div>

          <div className="settingsOptions">

            <div className="settingsOption">

              <div>

                <Lock size={18} />

                Double authentification

              </div>

              <input
                type="checkbox"
                checked
                readOnly
              />

            </div>

            {/* ====================================== */}

            <div className="settingsOption">

              <div>

                <Bell size={18} />

                Notifications

              </div>

              <input

                type="checkbox"

                checked={
                  notifications
                }

                onChange={()=>

                  setNotifications(
                    !notifications
                  )
                }
              />

            </div>

            {/* ====================================== */}

            <div className="settingsOption">

              <div>

                <MoonStar size={18} />

                Dark mode

              </div>

              <input

                type="checkbox"

                checked={
                  darkMode
                }

                onChange={()=>

                  setDarkMode(
                    !darkMode
                  )
                }
              />

            </div>

          </div>

        </div>

        {/* ==============================================
        API
        ============================================== */}

        <div className="settingsCard">

          <div className="settingsCardTitle">

            <KeyRound size={18} />

            API & Intégrations

          </div>

          <div className="settingsIntegrations">

            <div className="settingsIntegration">

              <Database
                size={20}
              />

              <div>

                <strong>

                  Supabase

                </strong>

                <span>

                  Connecté

                </span>

              </div>

            </div>

            {/* ====================================== */}

            <div className="settingsIntegration">

              <CreditCard
                size={20}
              />

              <div>

                <strong>

                  Stripe

                </strong>

                <span>

                  Paiements actifs

                </span>

              </div>

            </div>

            {/* ====================================== */}

            <div className="settingsIntegration">

              <CloudCog
                size={20}
              />

              <div>

                <strong>

                  SMTP

                </strong>

                <span>

                  Emails configurés

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ==============================================
        TEAM
        ============================================== */}

        <div className="settingsCard">

          <div className="settingsCardTitle">

            <Users size={18} />

            Workspace équipe

          </div>

          <div className="settingsTeam">

            <div className="settingsMember">

              <div className="settingsAvatar">

                J

              </div>

              <div>

                <strong>

                  Jordan

                </strong>

                <span>

                  CEO

                </span>

              </div>

            </div>

            {/* ====================================== */}

            <div className="settingsMember">

              <div className="settingsAvatar blue">

                S

              </div>

              <div>

                <strong>

                  Sarah

                </strong>

                <span>

                  Sales Manager

                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
