// ======================================================
// app/dashboard/ai/workspaces/page.tsx
// FLOWBIZ AI WORKSPACES
// FINAL VERSION
// ======================================================

"use client";

import "./workspaces.css";

import {
  useEffect,
  useState,
} from "react";

import {

  Loader2,
  Sparkles,
  FolderKanban,
  Plus,
  Brain,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Workspace{

  id:string;

  name:string;

  description:string;
}

/* ======================================================
PAGE
====================================================== */

export default function WorkspacesPage(){

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
    workspaces,
    setWorkspaces,
  ] =
    useState<Workspace[]>([]);

  const [
    form,
    setForm,
  ] =
    useState({

      name:"",
      description:"",
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

            "/api/ai/get-workspaces"
          );

        const data =
          await response.json();

        setWorkspaces(
          data.workspaces || []
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

  async function createWorkspace(){

    try{

      setCreating(true);

      const response =
        await fetch(

          "/api/ai/create-workspace",

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

      setWorkspaces(

        prev=>[
          data.workspace,
          ...prev,
        ]
      );

      setForm({

        name:"",
        description:"",
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

      <div className="workspacesLoader">

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

    <div className="workspacesPage">

      <div className="workspacesGlowOne" />
      <div className="workspacesGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="workspacesTopbar">

        <span className="workspacesBadge">

          <Sparkles />

          FLOWBIZ WORKSPACES

        </span>

        <h1>

          AI Workspaces

        </h1>

        <p>

          Espaces intelligents
          pour organiser vos
          documents IA business.

        </p>

      </header>

      {/* ==================================================
      CREATE
      ================================================== */}

      <section className="workspaceForm">

        <input

          placeholder="
          Nom du workspace
          "

          value={form.name}

          onChange={(e)=>

            setForm({

              ...form,

              name:e.target.value,
            })
          }
        />

        <textarea

          placeholder="
          Description du workspace...
          "

          value={form.description}

          onChange={(e)=>

            setForm({

              ...form,

              description:e.target.value,
            })
          }
        />

        <button
          onClick={createWorkspace}
        >

          {
            creating

            ? <Loader2 className="spin" />

            : <Plus />
          }

          Créer Workspace

        </button>

      </section>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="workspacesGrid">

        {
          workspaces.map(

            workspace=>(

              <div
                key={workspace.id}
                className="workspaceCard"
              >

                {/* ==================================================
                HEADER
                ================================================== */}

                <div className="workspaceHeader">

                  <div className="workspaceIcon">

                    <FolderKanban />

                  </div>

                  <div>

                    <strong>

                      {workspace.name}

                    </strong>

                    <span>

                      Workspace IA

                    </span>

                  </div>

                </div>

                {/* ==================================================
                DESCRIPTION
                ================================================== */}

                <p className="workspaceDescription">

                  {workspace.description}

                </p>

                {/* ==================================================
                FOOTER
                ================================================== */}

                <div className="workspaceFooter">

                  <Brain />

                  FlowBiz AI Workspace

                </div>

              </div>
            )
          )
        }

      </section>

    </div>
  );
}
