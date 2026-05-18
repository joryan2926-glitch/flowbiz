"use client";

/* ======================================================
FLOWBIZ CRM NOTIFICATIONS
REALTIME NOTIFICATION CENTER
====================================================== */

import "./notifications.css";

import {

  useEffect,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  Bell,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  Loader2,
  Search,
  BellRing,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Notification{

  id:string;

  title:string;

  description:string;

  type:string;

  is_read:boolean;

  created_at:string;
}

/* ======================================================
PAGE
====================================================== */

export default function NotificationsPage(){

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

    notifications,
    setNotifications,

  ] =
    useState<Notification[]>([]);

  const [

    search,
    setSearch,

  ] =
    useState("");

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    loadNotifications();

    realtime();

  },[]);

  async function loadNotifications(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from("crm_notifications")

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

      setNotifications(data || []);

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

      .channel("crm-notifications")

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"crm_notifications",
        },

        ()=>{

          loadNotifications();
        }
      )

      .subscribe();
  }

  /*
  ====================================================
  MARK AS READ
  ====================================================
  */

  async function markAsRead(
    id:string,
    current:boolean
  ){

    await supabase

      .from(
        "crm_notifications"
      )

      .update({

        is_read:!current,
      })

      .eq("id",id);
  }

  /*
  ====================================================
  DELETE
  ====================================================
  */

  async function deleteNotification(
    id:string
  ){

    await supabase

      .from(
        "crm_notifications"
      )

      .delete()

      .eq("id",id);
  }

  /*
  ====================================================
  FILTER
  ====================================================
  */

  const filteredNotifications =

    notifications.filter(

      item =>

        item.title
          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        item.description
          ?.toLowerCase()

          .includes(
            search.toLowerCase()
          )
    );

  /*
  ====================================================
  ICON
  ====================================================
  */

  function renderIcon(
    type:string
  ){

    switch(type){

      case "success":

        return (
          <CheckCircle2 />
        );

      case "warning":

        return (
          <AlertTriangle />
        );

      default:

        return (
          <Info />
        );
    }
  }

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="notifLoader">

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

    <div className="notifPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="notifHeader">

        <div>

          <div className="notifBadge">

            <BrainCircuit
              size={16}
            />

            FLOWBIZ NOTIFICATIONS

          </div>

          <h1>

            Smart Notifications

          </h1>

          <p>

            Centre de notifications
            temps réel connecté
            à tout le CRM.

          </p>

        </div>

      </header>

      {/* ==================================================
      SEARCH
      ================================================== */}

      <section className="notifSearch">

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

      <section className="notifList">

        {

          filteredNotifications.map(

            item => (

              <div

                key={item.id}

                className={`

                  notifCard

                  ${
                    item.is_read
                    ? "read"
                    : ""
                  }

                `}
              >

                {/* ==============================
                LEFT
                ============================== */}

                <div className="notifLeft">

                  <div className={`

                    notifIcon

                    ${
                      item.type
                    }

                  `}>

                    {
                      renderIcon(
                        item.type
                      )
                    }

                  </div>

                  {/* ========================== */}

                  <div>

                    <h3>

                      {
                        item.title
                      }

                    </h3>

                    <p>

                      {
                        item.description
                      }

                    </p>

                    {/* ====================== */}

                    <span>

                      {

                        new Date(
                          item.created_at
                        )

                        .toLocaleString()
                      }

                    </span>

                  </div>

                </div>

                {/* ==============================
                RIGHT
                ============================== */}

                <div className="notifRight">

                  <button

                    className={`

                      notifRead

                      ${
                        item.is_read
                        ? "active"
                        : ""
                      }

                    `}

                    onClick={()=>

                      markAsRead(
                        item.id,
                        item.is_read
                      )
                    }
                  >

                    {

                      item.is_read

                      ? "Lu"

                      : "Non lu"
                    }

                  </button>

                  {/* ========================== */}

                  <button

                    className="notifDelete"

                    onClick={()=>

                      deleteNotification(
                        item.id
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
