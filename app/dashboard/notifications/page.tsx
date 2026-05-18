"use client";

/* ======================================================
FLOWBIZ DASHBOARD NOTIFICATIONS
FINAL VERSION
====================================================== */

import "./notifications.css";

import {

  useMemo,
  useState,

} from "react";

import {

  Bell,
  Search,
  CheckCheck,
  Trash2,
  BrainCircuit,
  Mail,
  CalendarDays,
  DollarSign,
  Users,
  ShieldCheck,
  Filter,
  MoreVertical,
  Clock3,
  AlertTriangle,
  ArrowUpRight,
  Activity,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Notification{

  id:number;

  title:string;

  description:string;

  type:string;

  date:string;

  unread:boolean;
}

/* ======================================================
DATA
====================================================== */

const initialNotifications:Notification[] = [

  {
    id:1,

    title:
      "Nouveau client signé",

    description:
      "Netflix a signé un contrat CRM premium.",

    type:"client",

    date:"Il y a 5 min",

    unread:true,
  },

  {
    id:2,

    title:
      "Paiement reçu",

    description:
      "Stripe a confirmé un paiement de 4 800 €.",

    type:"finance",

    date:"Il y a 12 min",

    unread:true,
  },

  {
    id:3,

    title:
      "Réunion planifiée",

    description:
      "Meeting Google Meet ajouté au calendrier.",

    type:"calendar",

    date:"Il y a 1 heure",

    unread:false,
  },

  {
    id:4,

    title:
      "Nouvelle connexion",

    description:
      "Connexion détectée depuis Paris.",

    type:"security",

    date:"Hier",

    unread:false,
  },

  {
    id:5,

    title:
      "Campagne marketing",

    description:
      "Nouvelle campagne LinkedIn lancée.",

    type:"marketing",

    date:"Hier",

    unread:true,
  },
];

/* ======================================================
PAGE
====================================================== */

export default function DashboardNotificationsPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [

    notifications,
    setNotifications,

  ] =
    useState(initialNotifications);

  const [

    search,
    setSearch,

  ] =
    useState("");

  /*
  ====================================================
  FILTERED
  ====================================================
  */

  const filteredNotifications =

    useMemo(()=>{

      return notifications.filter(

        item =>

          item.title
            .toLowerCase()

            .includes(
              search.toLowerCase()
            )

          ||

          item.description
            .toLowerCase()

            .includes(
              search.toLowerCase()
            )
      );

    },[
      notifications,
      search,
    ]);

  /*
  ====================================================
  COUNTS
  ====================================================
  */

  const unreadCount =

    notifications.filter(

      item =>
        item.unread

    ).length;

  /*
  ====================================================
  MARK ALL READ
  ====================================================
  */

  function markAllAsRead(){

    setNotifications(

      notifications.map(

        item => ({

          ...item,

          unread:false,
        })
      )
    );
  }

  /*
  ====================================================
  DELETE
  ====================================================
  */

  function deleteNotification(
    id:number
  ){

    setNotifications(

      notifications.filter(

        item =>
          item.id !== id
      )
    );
  }

  /*
  ====================================================
  ICON
  ====================================================
  */

  function getNotificationIcon(
    type:string
  ){

    switch(type){

      case "client":
        return <Users size={20} />;

      case "finance":
        return (
          <DollarSign
            size={20}
          />
        );

      case "calendar":
        return (
          <CalendarDays
            size={20}
          />
        );

      case "security":
        return (
          <ShieldCheck
            size={20}
          />
        );

      case "marketing":
        return (
          <Activity
            size={20}
          />
        );

      default:
        return (
          <Mail size={20} />
        );
    }
  }

  /*
  ====================================================
  CLASS
  ====================================================
  */

  function getNotificationClass(
    type:string
  ){

    switch(type){

      case "client":
        return "client";

      case "finance":
        return "finance";

      case "calendar":
        return "calendar";

      case "security":
        return "security";

      case "marketing":
        return "marketing";

      default:
        return "";
    }
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="dashboardNotificationsPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="dashboardNotificationsHeader">

        <div>

          <div className="dashboardNotificationsBadge">

            <BrainCircuit size={16} />

            FLOWBIZ NOTIFICATIONS

          </div>

          <h1>

            Smart Notification Center

          </h1>

          <p>

            Gestion temps réel
            des alertes,
            événements et activités.

          </p>

        </div>

        {/* ============================================== */}

        <button

          className="
          dashboardNotificationsButton
          "

          onClick={
            markAllAsRead
          }
        >

          <CheckCheck
            size={18}
          />

          Tout marquer lu

        </button>

      </header>

      {/* ==================================================
      STATS
      ================================================== */}

      <section className="dashboardNotificationsStats">

        <div className="dashboardNotificationsStatCard">

          <div className="dashboardNotificationsStatIcon purple">

            <Bell />

          </div>

          <div>

            <span>

              Notifications

            </span>

            <strong>

              {
                notifications.length
              }

            </strong>

          </div>

        </div>

        {/* ============================================== */}

        <div className="dashboardNotificationsStatCard">

          <div className="dashboardNotificationsStatIcon blue">

            <AlertTriangle />

          </div>

          <div>

            <span>

              Non lues

            </span>

            <strong>

              {
                unreadCount
              }

            </strong>

          </div>

        </div>

        {/* ============================================== */}

        <div className="dashboardNotificationsStatCard">

          <div className="dashboardNotificationsStatIcon green">

            <ArrowUpRight />

          </div>

          <div>

            <span>

              Activité

            </span>

            <strong>

              Live

            </strong>

          </div>

        </div>

      </section>

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <section className="dashboardNotificationsTopbar">

        <div className="dashboardNotificationsSearch">

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

        </div>

        {/* ============================================== */}

        <button className="dashboardNotificationsFilter">

          <Filter size={18} />

          Filtrer

        </button>

      </section>

      {/* ==================================================
      LIST
      ================================================== */}

      <section className="dashboardNotificationsList">

        {
          filteredNotifications.map(

            notification => (

              <div

                key={notification.id}

                className={`

                  dashboardNotificationCard

                  ${
                    getNotificationClass(
                      notification.type
                    )
                  }

                  ${
                    notification.unread
                    ? "unread"
                    : ""
                  }

                `}
              >

                {/* ==============================
                LEFT
                ============================== */}

                <div className="dashboardNotificationLeft">

                  <div className="dashboardNotificationIcon">

                    {
                      getNotificationIcon(
                        notification.type
                      )
                    }

                  </div>

                  <div>

                    <h3>

                      {
                        notification.title
                      }

                    </h3>

                    <p>

                      {
                        notification.description
                      }

                    </p>

                    <span>

                      <Clock3
                        size={14}
                      />

                      {
                        notification.date
                      }

                    </span>

                  </div>

                </div>

                {/* ==============================
                ACTIONS
                ============================== */}

                <div className="dashboardNotificationActions">

                  <button>

                    <MoreVertical
                      size={18}
                    />

                  </button>

                  <button

                    onClick={()=>

                      deleteNotification(
                        notification.id
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
