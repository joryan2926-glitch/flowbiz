"use client";

/* ======================================================
FLOWBIZ CRM CALLS
REALTIME CALL CENTER
====================================================== */

import "./crm-calls.css";

import {

  useEffect,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  BrainCircuit,
  Phone,
  Video,
  CalendarDays,
  Loader2,
  Plus,
  Trash2,
  Search,
  Clock3,
  Link2,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface CallItem{

  id:string;

  client_name:string;

  phone:string;

  type:string;

  status:string;

  meeting_link:string;

  notes:string;

  scheduled_at:string;
}

/* ======================================================
PAGE
====================================================== */

export default function CallsPage(){

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

    calls,
    setCalls,

  ] =
    useState<CallItem[]>([]);

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

      client_name:"",
      phone:"",
      type:"call",
      meeting_link:"",
      notes:"",
      scheduled_at:"",
    });

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    loadCalls();

    realtime();

  },[]);

  async function loadCalls(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from("crm_calls")

          .select("*")

          .order(
            "scheduled_at",
            {
              ascending:true,
            }
          );

      if(error){

        console.log(error);

        return;
      }

      setCalls(data || []);

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

      .channel("crm-calls")

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"crm_calls",
        },

        ()=>{

          loadCalls();
        }
      )

      .subscribe();
  }

  /*
  ====================================================
  CREATE
  ====================================================
  */

  async function createCall(){

    if(

      !form.client_name ||

      !form.scheduled_at

    ) return;

    try{

      const { error } =

        await supabase

          .from("crm_calls")

          .insert([

            {

              client_name:
                form.client_name,

              phone:
                form.phone,

              type:
                form.type,

              meeting_link:
                form.meeting_link,

              notes:
                form.notes,

              scheduled_at:
                form.scheduled_at,

              status:"scheduled",
            },
          ]);

      if(error){

        console.log(error);

        return;
      }

      setForm({

        client_name:"",
        phone:"",
        type:"call",
        meeting_link:"",
        notes:"",
        scheduled_at:"",
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

  async function deleteCall(
    id:string
  ){

    await supabase

      .from("crm_calls")

      .delete()

      .eq("id",id);
  }

  /*
  ====================================================
  TOGGLE STATUS
  ====================================================
  */

  async function toggleStatus(
    call:CallItem
  ){

    const newStatus =

      call.status ===
      "done"

      ? "scheduled"

      : "done";

    await supabase

      .from("crm_calls")

      .update({

        status:newStatus,
      })

      .eq(
        "id",
        call.id
      );
  }

  /*
  ====================================================
  FILTER
  ====================================================
  */

  const filteredCalls =

    calls.filter(

      call =>

        call.client_name
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

      <div className="callsLoader">

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

    <div className="callsPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="callsHeader">

        <div>

          <div className="callsBadge">

            <BrainCircuit
              size={16}
            />

            FLOWBIZ CALLS

          </div>

          <h1>

            Smart Calls

          </h1>

          <p>

            Gestion des appels,
            réunions et visios
            temps réel.

          </p>

        </div>

      </header>

      {/* ==================================================
      CREATE
      ================================================== */}

      <section className="callsCreate">

        <input

          type="text"

          placeholder="
          Client
          "

          value={form.client_name}

          onChange={(e)=>

            setForm({

              ...form,

              client_name:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <input

          type="text"

          placeholder="
          Téléphone
          "

          value={form.phone}

          onChange={(e)=>

            setForm({

              ...form,

              phone:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <select

          value={form.type}

          onChange={(e)=>

            setForm({

              ...form,

              type:
                e.target.value,
            })
          }
        >

          <option value="call">

            Appel

          </option>

          <option value="video">

            Visio

          </option>

        </select>

        {/* ============================================== */}

        <input

          type="datetime-local"

          value={form.scheduled_at}

          onChange={(e)=>

            setForm({

              ...form,

              scheduled_at:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <input

          type="text"

          placeholder="
          Lien réunion
          "

          value={form.meeting_link}

          onChange={(e)=>

            setForm({

              ...form,

              meeting_link:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <textarea

          placeholder="
          Notes...
          "

          value={form.notes}

          onChange={(e)=>

            setForm({

              ...form,

              notes:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <button
          onClick={createCall}
        >

          <Plus size={18} />

          Planifier

        </button>

      </section>

      {/* ==================================================
      SEARCH
      ================================================== */}

      <section className="callsSearch">

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

      <section className="callsList">

        {
          filteredCalls.map(

            call => (

              <div
                key={call.id}
                className={`

                  callCard

                  ${
                    call.status ===
                    "done"

                    ? "done"

                    : ""
                  }

                `}
              >

                {/* ==============================
                LEFT
                ============================== */}

                <div className="callLeft">

                  <div className="callIcon">

                    {

                      call.type ===
                      "video"

                      ? <Video size={22} />

                      : <Phone size={22} />
                    }

                  </div>

                  {/* ========================== */}

                  <div>

                    <h3>

                      {
                        call.client_name
                      }

                    </h3>

                    <span>

                      {
                        call.phone
                      }

                    </span>

                    {/* ====================== */}

                    <div className="callMeta">

                      <div>

                        <CalendarDays
                          size={14}
                        />

                        {

                          new Date(
                            call.scheduled_at
                          )

                          .toLocaleString()
                        }

                      </div>

                      {/* ================== */}

                      {

                        call.meeting_link && (

                          <div>

                            <Link2
                              size={14}
                            />

                            {
                              call.meeting_link
                            }

                          </div>
                        )
                      }

                    </div>

                    {/* ====================== */}

                    {

                      call.notes && (

                        <p>

                          {
                            call.notes
                          }

                        </p>
                      )
                    }

                  </div>

                </div>

                {/* ==============================
                RIGHT
                ============================== */}

                <div className="callRight">

                  <button

                    className={`

                      callStatus

                      ${
                        call.status
                      }

                    `}

                    onClick={()=>

                      toggleStatus(call)
                    }
                  >

                    {

                      call.status ===
                      "done"

                      ? "Terminée"

                      : "Planifiée"
                    }

                  </button>

                  {/* ========================== */}

                  <button

                    className="callDelete"

                    onClick={()=>

                      deleteCall(
                        call.id
                      )
                    }
                  >

                    <Trash2
                      size={18}
                    />

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
