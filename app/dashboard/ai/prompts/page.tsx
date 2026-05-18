// ======================================================
// app/dashboard/ai/prompts/page.tsx
// FLOWBIZ AI PROMPTS LIBRARY
// FINAL VERSION
// ======================================================

"use client";

import "./prompts.css";

import {
  useEffect,
  useState,
} from "react";

import {

  Loader2,
  Sparkles,
  Wand2,
  Save,
  Layers3,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Prompt{

  id:string;

  title:string;

  prompt:string;

  category:string;
}

/* ======================================================
PAGE
====================================================== */

export default function PromptsPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    prompts,
    setPrompts,
  ] =
    useState<Prompt[]>([]);

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
    form,
    setForm,
  ] =
    useState({

      title:"",
      prompt:"",
      category:"",
    });

  /*
  ====================================================
  LOAD PROMPTS
  ====================================================
  */

  useEffect(()=>{

    async function loadPrompts(){

      try{

        const response =
          await fetch(

            "/api/ai/get-prompts"
          );

        const data =
          await response.json();

        setPrompts(
          data.prompts || []
        );

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);
      }
    }

    loadPrompts();

  },[]);

  /*
  ====================================================
  SAVE PROMPT
  ====================================================
  */

  async function savePrompt(){

    try{

      setSaving(true);

      const response =
        await fetch(

          "/api/ai/save-prompt",

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

      setPrompts(

        prev=>[
          data.prompt,
          ...prev,
        ]
      );

      setForm({

        title:"",
        prompt:"",
        category:"",
      });

    }catch(error){

      console.log(error);

    }finally{

      setSaving(false);
    }
  }

  /*
  ====================================================
  LOADER
  ====================================================
  */

  if(loading){

    return(

      <div className="promptsLoader">

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

    <div className="promptsPage">

      <div className="promptsGlowOne" />
      <div className="promptsGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="promptsTopbar">

        <span className="promptsBadge">

          <Sparkles />

          FLOWBIZ PROMPTS

        </span>

        <h1>

          AI Prompt Library

        </h1>

        <p>

          Bibliothèque de prompts
          intelligents business
          et CRM.

        </p>

      </header>

      {/* ==================================================
      FORM
      ================================================== */}

      <section className="promptForm">

        <input

          placeholder="Titre"

          value={form.title}

          onChange={(e)=>

            setForm({

              ...form,

              title:e.target.value,
            })
          }
        />

        <input

          placeholder="Catégorie"

          value={form.category}

          onChange={(e)=>

            setForm({

              ...form,

              category:e.target.value,
            })
          }
        />

        <textarea

          placeholder="Votre prompt IA..."

          value={form.prompt}

          onChange={(e)=>

            setForm({

              ...form,

              prompt:e.target.value,
            })
          }
        />

        <button
          onClick={savePrompt}
        >

          {
            saving

            ? <Loader2 className="spin" />

            : <Save />
          }

          Sauvegarder

        </button>

      </section>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="promptsGrid">

        {
          prompts.map(

            prompt=>(

              <div
                key={prompt.id}
                className="promptCard"
              >

                {/* ==================================================
                HEADER
                ================================================== */}

                <div className="promptHeader">

                  <div className="promptIcon">

                    <Wand2 />

                  </div>

                  <div>

                    <strong>

                      {prompt.title}

                    </strong>

                    <span>

                      {prompt.category}

                    </span>

                  </div>

                </div>

                {/* ==================================================
                CONTENT
                ================================================== */}

                <p className="promptContent">

                  {prompt.prompt}

                </p>

                {/* ==================================================
                FOOTER
                ================================================== */}

                <div className="promptFooter">

                  <Layers3 />

                  Prompt FlowBiz AI

                </div>

              </div>
            )
          )
        }

      </section>

    </div>
  );
}
