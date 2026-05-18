// ======================================================
// app/dashboard/crm/automations/page.tsx
// FLOWBIZ CRM AUTOMATIONS
// ULTRA PREMIUM FINAL VERSION
// ======================================================

"use client";

import "./crm-automations.css";

import {

  useEffect,
  useState,

} from "react";

import {

  createClient,

} from "@supabase/supabase-js";

import {

  Brain,
  Sparkles,
  Workflow,
  Mail,
  Bell,
  Clock3,
  Loader2,
  Plus,
  PlayCircle,
  PauseCircle,

} from "lucide-react";

/* ======================================================
SUPABASE
====================================================== */

const supabase =
  createClient(

    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

/* ======================================================
INTERFACE
====================================================== */

interface Automation{

  id:string;

  name:string;

  trigger_type:string;

  action_type:string;

  status:string;
}

/* ======================================================
PAGE
====================================================== */

export default function CRMAutomationsPage(){

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
    automations,
    setAutomations,
  ] =
    useState<Automation[]>([]);

  const [
    form,
    setForm,
  ] =
    useState({

      name:"",
      trigger_type:"",
      action_type:"",
    });

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    loadAutomations();

  },[]);

  /*
  ====================================================
  LOAD FUNCTION
  ====================================================
  */

  async function loadAutomations(){

    const {

      data,

    } =

      await supabase

        .from(
          "crm_automations"
        )

        .select("*")

        .order(
          "created_at",
          {
            ascending:false,
          }
        );

    setAutomations(
      data || []
    );

    setLoading(false);
  }

  /*
  ====================================================
  CREATE
  ====================================================
  */

  async function createAutomation(){

    await supabase

      .from(
        "crm_automations"
      )

      .insert({

        ...form,

        status:"active",
      });

    setForm({

      name:"",
      trigger_type:"",
      action_type:"",
    });

    loadAutomations();
  }

  /*
  ====================================================
  TOGGLE
  ====================================================
  */

  async function toggleAutomation(

    id:string,
    currentStatus:string
  ){

    await supabase

      .from(
        "crm_automations"
      )

      .update({

        status:

          currentStatus === "active"

            ? "paused"

            : "active",
      })

      .eq(
        "id",
        id
      );

    loadAutomations();
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

    <div className="crmAutomationsPage">

      <div className="automationGlowOne" />
      <div className="automationGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="automationTopbar">

        <span className="automationBadge">

          <Sparkles />

          FLOWBIZ AUTOMATIONS

        </span>

        <h1>

          CRM Automations

        </h1>

        <p>

          Automatisations intelligentes
          CRM et IA FlowBiz.

        </p>

      </header>

      {/* ==================================================
      CREATE
      ================================================== */}

      <section className="automationCreate">

        <input

          placeholder="
          Nom automation
          "

          value={form.name}

          onChange={(e)=>

            setForm({

              ...form,

              name:e.target.value,
            })
          }
        />

        <select

          value={form.trigger_type}

          onChange={(e)=>

            setForm({

              ...form,

              trigger_type:
                e.target.value,
            })
          }
        >

          <option value="">

            Trigger

          </option>

          <option value="new_lead">

            Nouveau lead

          </option>

          <option value="meeting">

            Réunion créée

          </option>

          <option value="proposal">

            Proposition envoyée

          </option>

        </select>

        <select

          value={form.action_type}

          onChange={(e)=>

            setForm({

              ...form,

              action_type:
                e.target.value,
            })
          }
        >

          <option value="">

            Action

          </option>

          <option value="send_email">

            Envoyer email

          </option>

          <option value="notification">

            Notification

          </option>

          <option value="ai_followup">

            IA Follow-up

          </option>

        </select>

        <button
          onClick={createAutomation}
        >

          <Plus />

          Créer Automation

        </button>

      </section>

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

                {/* ==========================================
                HEADER
                ========================================== */}

                <div className="automationHeader">

                  <div className="automationIcon">

                    <Workflow />

                  </div>

                  <div>

                    <strong>

                      {automation.name}

                    </strong>

                    <span>

                      FlowBiz CRM

                    </span>

                  </div>

                </div>

                {/* ==========================================
                BODY
                ========================================== */}

                <div className="automationBody">

                  <div className="automationItem">

                    <Clock3 />

                    Trigger :

                    <strong>

                      {automation.trigger_type}

                    </strong>

                  </div>

                  <div className="automationItem">

                    <Brain />

                    Action :

                    <strong>

                      {automation.action_type}

                    </strong>

                  </div>

                </div>

                {/* ==========================================
                STATUS
                ========================================== */}

                <div className="automationFooter">

                  <div
                    className={`
                      automationStatus
                      ${automation.status}
                    `}
                  >

                    {
                      automation.status
                    }

                  </div>

                  <button

                    className="toggleButton"

                    onClick={()=>

                      toggleAutomation(

                        automation.id,
                        automation.status
                      )
                    }
                  >

                    {
                      automation.status
                      === "active"

                        ? <PauseCircle />

                        : <PlayCircle />
                    }

                  </button>

                </div>

              </div>
            )
          )
        }

      </section>

      {/* ==================================================
      AI SECTION
      ================================================== */}

      <section className="aiAutomationSection">

        <div className="aiAutomationCard">

          <div className="aiAutomationIcon">

            <Brain />

          </div>

          <h2>

            IA Automatisation

          </h2>

          <p>

            FlowBiz IA peut :

          </p>

          <ul>

            <li>

              Relancer automatiquement
              les leads

            </li>

            <li>

              Générer des emails IA

            </li>

            <li>

              Analyser le pipeline

            </li>

            <li>

              Détecter les opportunités

            </li>

            <li>

              Prioriser les prospects

            </li>

          </ul>

        </div>

      </section>

    </div>
  );
}
