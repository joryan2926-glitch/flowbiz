// ======================================================
// app/dashboard/ai/documents/page.tsx
// FLOWBIZ AI DOCUMENTS
// FINAL VERSION
// ======================================================

"use client";

import "./documents.css";

import {
  useState,
} from "react";

import {

  Loader2,
  Sparkles,
  FileText,
  Wand2,
  Save,

} from "lucide-react";

/* ======================================================
PAGE
====================================================== */

export default function DocumentsPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    result,
    setResult,
  ] =
    useState("");

  const [
    form,
    setForm,
  ] =
    useState({

      type:"",
      subject:"",
    });

  /*
  ====================================================
  GENERATE DOCUMENT
  ====================================================
  */

  async function generateDocument(){

    try{

      setLoading(true);

      const response =
        await fetch(

          "/api/ai/generate-document",

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

      setResult(
        data.document.content
      );

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="documentsPage">

      <div className="documentsGlowOne" />
      <div className="documentsGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="documentsTopbar">

        <span className="documentsBadge">

          <Sparkles />

          FLOWBIZ DOCUMENTS

        </span>

        <h1>

          AI Document Generator

        </h1>

        <p>

          Génération intelligente
          de documents business,
          CRM et commerciaux.

        </p>

      </header>

      {/* ==================================================
      FORM
      ================================================== */}

      <section className="documentsForm">

        <input

          placeholder="
          Type de document
          "

          value={form.type}

          onChange={(e)=>

            setForm({

              ...form,

              type:e.target.value,
            })
          }
        />

        <textarea

          placeholder="
          Sujet / description du document...
          "

          value={form.subject}

          onChange={(e)=>

            setForm({

              ...form,

              subject:e.target.value,
            })
          }
        />

        <button
          onClick={generateDocument}
        >

          {
            loading

            ? <Loader2 className="spin" />

            : <Wand2 />
          }

          Générer Document

        </button>

      </section>

      {/* ==================================================
      RESULT
      ================================================== */}

      {
        result && (

          <section className="documentResult">

            <div className="documentHeader">

              <div className="documentIcon">

                <FileText />

              </div>

              <div>

                <strong>

                  Document généré

                </strong>

                <span>

                  FlowBiz AI

                </span>

              </div>

            </div>

            <div className="documentContent">

              {result}

            </div>

            <button className="saveButton">

              <Save />

              Sauvegarder

            </button>

          </section>
        )
      }

    </div>
  );
}
