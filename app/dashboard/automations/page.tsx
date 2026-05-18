// ======================================================
// app/dashboard/automations/page.tsx
// FLOWBIZ AUTOMATIONS
// FINAL VERSION
// ======================================================

"use client";

import "./automations.css";

import {
  useEffect,
  useState,
} from "react";

import {

  Loader2,
  Sparkles,
  Zap,
  Bot,
  Mail,
  BellRing,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Automation{

  id:string;

  name:string;

  trigger_type:string;

  action_type:string;

  enabled:boolean;
}

/* ======================================================
PAGE
====================================================== */

export default function AutomationsPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    automations,
    setAutomations,
  ] =
    useState<Automation[]>([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    async function load(){

      try{

        const response =
          await fetch(

            "/api/automations/get-automations"
          );

        const data =
          await response.json();

        setAutomations(
          data.automations || []
        );

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);
      }
    }

    load();

  },[]);

  /*
  ====================================================
  TOGGLE
  ====================================================
  */

  async function toggleAutomation(
    id:string,
    enabled:boolean
  ){

    try{

      await fetch(

        "/api/automations/toggle-automation",

        {

          method:"POST",

          headers:{
            "Content-Type":
              "application/json",
          },

          body:JSON.stringify({

            id,

            enabled:
              !enabled,
          }),
        }
      );

      setAutomations(

        prev=>

          prev.map(

            automation=>

              automation.id === id

              ? {
                  ...automation,
                  enabled:
                    !enabled,
                }

              : automation
          )
      );

    }catch(error){

      console.log(error);
    }
  }

  /*
  ====================================================
  LOADER
  ====================================================
  */

  if(loading){

    return(

      <div className="automationsLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="automationsPage">

      <div className="automationsGlowOne" />
      <div className="automationsGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="automationsTopbar">

        <span className="automationsBadge">

          <Sparkles />

          FLOWBIZ AUTOMATIONS

        </span>

        <h1>

          Business Automations

        </h1>

        <p>

          Gestion des workflows,
          automatisations CRM
          et actions business.

        </p>

      </header>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="automationsGrid">

        {
          automations.map(

            automation=>(

              <div
                key={automation.id}
                className="automationCard"
              >

                {/* ==================================================
                HEADER
                ================================================== */}

                <div className="automationHeader">

                  <div className="automationIcon">

                    <Zap />

                  </div>

                  <div>

                    <strong>

                      {
                        automation.name
                      }

                    </strong>

                    <span>

                      {
                        automation.trigger_type
                      }

                    </span>

                  </div>

                </div>

                {/* ==================================================
                ACTION
                ================================================== */}

                <div className="automationAction">

                  <Bot />

                  <span>

                    {
                      automation.action_type
                    }

                  </span>

                </div>

                {/* ==================================================
                STATUS
                ================================================== */}

                <div className="automationFooter">

                  <div className={`statusBadge ${automation.enabled ? "active" : "inactive"}`}>

                    <BellRing />

                    {
                      automation.enabled

                      ? "Active"

                      : "Disabled"
                    }

                  </div>

                  {/* ==================================================
                  TOGGLE
                  ================================================== */}

                  <button

                    className={`toggleButton ${automation.enabled ? "enabled" : ""}`}

                    onClick={()=>

                      toggleAutomation(

                        automation.id,

                        automation.enabled
                      )
                    }
                  >

                    <div className="toggleCircle" />

                  </button>

                </div>

              </div>
            )
          )
        }

      </section>

    </div>
  );
}
