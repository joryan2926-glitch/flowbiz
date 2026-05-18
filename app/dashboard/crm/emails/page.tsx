"use client";

/* ======================================================
FLOWBIZ CRM EMAILS
100% CONNECTED
====================================================== */

import "./crm-emails.css";

import {

  useEffect,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  BrainCircuit,
  Mail,
  Send,
  Trash2,
  Loader2,
  Search,
  Clock3,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Email{

  id:string;

  recipient:string;

  subject:string;

  message:string;

  status:string;

  created_at:string;
}

/* ======================================================
PAGE
====================================================== */

export default function EmailsPage(){

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

    emails,
    setEmails,

  ] =
    useState<Email[]>([]);

  const [

    search,
    setSearch,

  ] =
    useState("");

  const [

    form,
    setForm,

  ] =
    useState({

      recipient:"",
      subject:"",
      message:"",
    });

  /*
  ====================================================
  LOAD EMAILS
  ====================================================
  */

  useEffect(()=>{

    loadEmails();

    realtime();

  },[]);

  async function loadEmails(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from("crm_emails")

          .select("*")

          .order(
            "created_at",
            {
              ascending:false,
            }
          );

      if(error){

        console.log(error);

        return;
      }

      setEmails(data || []);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  REALTIME
  ====================================================
  */

  function realtime(){

    supabase

      .channel(
        "crm-emails-live"
      )

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"crm_emails",
        },

        ()=>{

          loadEmails();
        }
      )

      .subscribe();
  }

  /*
  ====================================================
  SEND EMAIL
  ====================================================
  */

  async function sendEmail(){

    if(

      !form.recipient ||

      !form.subject ||

      !form.message

    ) return;

    try{

      const { error } =

        await supabase

          .from("crm_emails")

          .insert([

            {

              recipient:
                form.recipient,

              subject:
                form.subject,

              message:
                form.message,

              status:"sent",
            },
          ]);

      if(error){

        console.log(error);

        return;
      }

      setForm({

        recipient:"",
        subject:"",
        message:"",
      });

    }catch(error){

      console.log(error);
    }
  }

  /*
  ====================================================
  DELETE
  ====================================================
  */

  async function deleteEmail(
    id:string
  ){

    await supabase

      .from("crm_emails")

      .delete()

      .eq("id",id);
  }

  /*
  ====================================================
  FILTERED
  ====================================================
  */

  const filteredEmails =

    emails.filter(

      email =>

        email.recipient
          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        email.subject
          .toLowerCase()

          .includes(
            search.toLowerCase()
          )
    );

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="emailsLoader">

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

    <div className="emailsPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="emailsHeader">

        <div>

          <div className="emailsBadge">

            <BrainCircuit
              size={16}
            />

            FLOWBIZ EMAILS

          </div>

          <h1>

            Smart Emails

          </h1>

          <p>

            Gestion avancée
            des emails CRM
            temps réel.

          </p>

        </div>

      </header>

      {/* ==================================================
      CREATE
      ================================================== */}

      <section className="emailsComposer">

        <input

          type="email"

          placeholder="
          Destinataire
          "

          value={form.recipient}

          onChange={(e)=>

            setForm({

              ...form,

              recipient:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <input

          type="text"

          placeholder="
          Sujet
          "

          value={form.subject}

          onChange={(e)=>

            setForm({

              ...form,

              subject:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <textarea

          placeholder="
          Message...
          "

          value={form.message}

          onChange={(e)=>

            setForm({

              ...form,

              message:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <button
          onClick={sendEmail}
        >

          <Send size={18} />

          Envoyer

        </button>

      </section>

      {/* ==================================================
      SEARCH
      ================================================== */}

      <section className="emailsSearch">

        <Search size={18} />

        <input

          type="text"

          placeholder="
          Rechercher...
          "

          value={search}

          onChange={(e)=>

            setSearch(
              e.target.value
            )
          }
        />

      </section>

      {/* ==================================================
      LIST
      ================================================== */}

      <section className="emailsList">

        {
          filteredEmails.map(

            email => (

              <div
                key={email.id}
                className="emailCard"
              >

                {/* ==============================
                LEFT
                ============================== */}

                <div className="emailLeft">

                  <div className="emailIcon">

                    <Mail size={22} />

                  </div>

                  <div>

                    <h3>

                      {
                        email.subject
                      }

                    </h3>

                    <span>

                      {
                        email.recipient
                      }

                    </span>

                    <p>

                      {
                        email.message
                      }

                    </p>

                    <div className="emailDate">

                      <Clock3
                        size={14}
                      />

                      {

                        new Date(
                          email.created_at
                        )

                        .toLocaleString()
                      }

                    </div>

                  </div>

                </div>

                {/* ==============================
                ACTIONS
                ============================== */}

                <button

                  className="emailDelete"

                  onClick={()=>

                    deleteEmail(
                      email.id
                    )
                  }
                >

                  <Trash2
                    size={18}
                  />

                </button>

              </div>
            )
          )
        }

      </section>

    </div>
  );
}
