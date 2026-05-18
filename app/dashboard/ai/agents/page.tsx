// ======================================================
// app/dashboard/ai/agents/page.tsx
// FLOWBIZ AI AGENTS
// FINAL VERSION
// ======================================================

"use client";

import "./agents.css";

import {
  useEffect,
  useState,
} from "react";

import {

  Loader2,
  Sparkles,
  Bot,
  Brain,
  Plus,
  ShieldCheck,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Agent{

  id:string;

  name:string;

  role:string;

  objective:string;

  status:string;
}

/* ======================================================
PAGE
====================================================== */

export default function AgentsPage(){

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
    creating,
    setCreating,
  ] =
    useState(false);

  const [
    agents,
    setAgents,
  ] =
    useState<Agent[]>([]);

  const [
    form,
    setForm,
  ] =
    useState({

      name:"",
      role:"",
      objective:"",
    });

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

            "/api/ai/get-agents"
          );

        const data =
          await response.json();

        setAgents(
          data.agents || []
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
  CREATE
  ====================================================
  */

  async function createAgent(){

    try{

      setCreating(true);

      const response =
        await fetch(

          "/api/ai/create-agent",

          {

            method:"POST",

            headers:{
              "Content-Type":
                "application/json",
            },

            body:JSON.stringify(
              form
            ),
          }
        );

      const data =
        await response.json();

      if(data.error){

        alert(data.error);

        return;
      }

      setAgents(

        prev=>[
          data.agent,
          ...prev,
        ]
      );

      setForm({

        name:"",
        role:"",
        objective:"",
      });

    }catch(error){

      console.log(error);

    }finally{

      setCreating(false);
    }
  }

  /*
  ====================================================
  LOADER
  ====================================================
  */

  if(loading){

    return(

      <div className="agentsLoader">

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

    <div className="agentsPage">

      <div className="agentsGlowOne" />
      <div className="agentsGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="agentsTopbar">

        <span className="agentsBadge">

          <Sparkles />

          FLOWBIZ AGENTS

        </span>

        <h1>

          AI Agents

        </h1>

        <p>

          Créez des agents IA
          intelligents dédiés
          au business et CRM.

        </p>

      </header>

      {/* ==================================================
      FORM
      ================================================== */}

      <section className="agentForm">

        <input

          placeholder="
          Nom de l'agent
          "

          value={form.name}

          onChange={(e)=>

            setForm({

              ...form,

              name:e.target.value,
            })
          }
        />

        <input

          placeholder="
          Rôle de l'agent
          "

          value={form.role}

          onChange={(e)=>

            setForm({

              ...form,

              role:e.target.value,
            })
          }
        />

        <textarea

          placeholder="
          Objectif et comportement...
          "

          value={form.objective}

          onChange={(e)=>

            setForm({

              ...form,

              objective:e.target.value,
            })
          }
        />

        <button
          onClick={createAgent}
        >

          {
            creating

            ? <Loader2 className="spin" />

            : <Plus />
          }

          Créer Agent IA

        </button>

      </section>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="agentsGrid">

        {
          agents.map(

            agent=>(

              <div
                key={agent.id}
                className="agentCard"
              >

                {/* ==================================================
                HEADER
                ================================================== */}

                <div className="agentHeader">

                  <div className="agentIcon">

                    <Bot />

                  </div>

                  <div>

                    <strong>

                      {agent.name}

                    </strong>

                    <span>

                      {agent.role}

                    </span>

                  </div>

                </div>

                {/* ==================================================
                OBJECTIVE
                ================================================== */}

                <p className="agentObjective">

                  {agent.objective}

                </p>

                {/* ==================================================
                FOOTER
                ================================================== */}

                <div className="agentFooter">

                  <div className="agentStatus">

                    <ShieldCheck />

                    {agent.status}

                  </div>

                  <div className="agentBrain">

                    <Brain />

                    FlowBiz AI
                  </div>

                </div>

              </div>
            )
          )
        }

      </section>

    </div>
  );
}
