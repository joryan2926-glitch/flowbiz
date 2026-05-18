"use client";

/* ======================================================
FLOWBIZ CRM SETTINGS
FINAL SETTINGS CENTER
====================================================== */

import "./crm-settings.css";

import {

  useEffect,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  BrainCircuit,
  Loader2,
  Save,
  Building2,
  Mail,
  Phone,
  MapPin,
  Bell,
  Moon,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Settings{

  id:string;

  company_name:string;

  company_email:string;

  company_phone:string;

  company_address:string;

  timezone:string;

  currency:string;

  notifications:boolean;

  dark_mode:boolean;
}

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

    loading,
    setLoading,

  ] =
    useState(true);

  const [

    saving,
    setSaving,

  ] =
    useState(false);

  const [

    settings,
    setSettings,

  ] =
    useState<Settings | null>(
      null
    );

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    loadSettings();

  },[]);

  async function loadSettings(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from("crm_settings")

          .select("*")

          .limit(1)

          .single();

      if(error){

        console.log(error);

        return;
      }

      setSettings(data);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  SAVE
  ====================================================
  */

  async function saveSettings(){

    if(!settings) return;

    try{

      setSaving(true);

      const {

        error,

      } =

        await supabase

          .from("crm_settings")

          .update({

            company_name:
              settings.company_name,

            company_email:
              settings.company_email,

            company_phone:
              settings.company_phone,

            company_address:
              settings.company_address,

            timezone:
              settings.timezone,

            currency:
              settings.currency,

            notifications:
              settings.notifications,

            dark_mode:
              settings.dark_mode,
          })

          .eq(
            "id",
            settings.id
          );

      if(error){

        console.log(error);

        return;
      }

      alert(
        "Paramètres sauvegardés"
      );

    }catch(error){

      console.log(error);

    }finally{

      setSaving(false);
    }
  }

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(

    loading ||

    !settings

  ){

    return(

      <div className="settingsLoader">

        <Loader2
          className="spin"
        />

      </div>
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

            <BrainCircuit
              size={16}
            />

            FLOWBIZ SETTINGS

          </div>

          <h1>

            Smart Settings

          </h1>

          <p>

            Paramètres globaux
            du CRM et du workspace
            utilisateur.

          </p>

        </div>

      </header>

      {/* ==================================================
      FORM
      ================================================== */}

      <section className="settingsForm">

        {/* ==============================================
        COMPANY
        ============================================== */}

        <div className="settingsCard">

          <h2>

            Entreprise

          </h2>

          {/* ========================================== */}

          <div className="inputGroup">

            <label>

              <Building2
                size={16}
              />

              Nom entreprise

            </label>

            <input

              type="text"

              value={
                settings.company_name
              }

              onChange={(e)=>

                setSettings({

                  ...settings,

                  company_name:
                    e.target.value,
                })
              }
            />

          </div>

          {/* ========================================== */}

          <div className="inputGroup">

            <label>

              <Mail
                size={16}
              />

              Email

            </label>

            <input

              type="email"

              value={
                settings.company_email
              }

              onChange={(e)=>

                setSettings({

                  ...settings,

                  company_email:
                    e.target.value,
                })
              }
            />

          </div>

          {/* ========================================== */}

          <div className="inputGroup">

            <label>

              <Phone
                size={16}
              />

              Téléphone

            </label>

            <input

              type="text"

              value={
                settings.company_phone
              }

              onChange={(e)=>

                setSettings({

                  ...settings,

                  company_phone:
                    e.target.value,
                })
              }
            />

          </div>

          {/* ========================================== */}

          <div className="inputGroup">

            <label>

              <MapPin
                size={16}
              />

              Adresse

            </label>

            <textarea

              value={
                settings.company_address
              }

              onChange={(e)=>

                setSettings({

                  ...settings,

                  company_address:
                    e.target.value,
                })
              }
            />

          </div>

        </div>

        {/* ==============================================
        SYSTEM
        ============================================== */}

        <div className="settingsCard">

          <h2>

            Système

          </h2>

          {/* ========================================== */}

          <div className="inputGroup">

            <label>

              Fuseau horaire

            </label>

            <select

              value={
                settings.timezone
              }

              onChange={(e)=>

                setSettings({

                  ...settings,

                  timezone:
                    e.target.value,
                })
              }
            >

              <option>

                Europe/Paris

              </option>

              <option>

                America/New_York

              </option>

              <option>

                Asia/Tokyo

              </option>

            </select>

          </div>

          {/* ========================================== */}

          <div className="inputGroup">

            <label>

              Devise

            </label>

            <select

              value={
                settings.currency
              }

              onChange={(e)=>

                setSettings({

                  ...settings,

                  currency:
                    e.target.value,
                })
              }
            >

              <option>

                EUR

              </option>

              <option>

                USD

              </option>

              <option>

                GBP

              </option>

            </select>

          </div>

          {/* ========================================== */}

          <div className="toggleRow">

            <div>

              <Bell
                size={18}
              />

              Notifications

            </div>

            <button

              className={`

                toggleButton

                ${
                  settings.notifications
                  ? "active"
                  : ""
                }

              `}

              onClick={()=>

                setSettings({

                  ...settings,

                  notifications:
                    !settings.notifications,
                })
              }
            >
              {

                settings.notifications

                ? "ON"

                : "OFF"
              }
            </button>

          </div>

          {/* ========================================== */}

          <div className="toggleRow">

            <div>

              <Moon
                size={18}
              />

              Dark mode

            </div>

            <button

              className={`

                toggleButton

                ${
                  settings.dark_mode
                  ? "active"
                  : ""
                }

              `}

              onClick={()=>

                setSettings({

                  ...settings,

                  dark_mode:
                    !settings.dark_mode,
                })
              }
            >
              {

                settings.dark_mode

                ? "ON"

                : "OFF"
              }
            </button>

          </div>

        </div>

      </section>

      {/* ==================================================
      SAVE
      ================================================== */}

      <button

        className="saveButton"

        onClick={saveSettings}
      >

        {

          saving

          ? (

            <Loader2
              className="spin"
              size={18}
            />
          )

          : (

            <Save size={18} />
          )
        }

        Sauvegarder

      </button>

    </div>
  );
}
