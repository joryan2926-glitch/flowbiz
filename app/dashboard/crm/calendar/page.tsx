"use client";

/* ======================================================
FLOWBIZ CRM CALENDAR
FINAL SMART SCHEDULER
====================================================== */

import "./calendar.css";

import {

  useState,

} from "react";

import {

  CalendarDays,
  Clock3,
  Plus,
  Search,
  Bell,
  Users,
  BrainCircuit,
  Video,
  Building2,
  ChevronLeft,
  ChevronRight,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Event{

  id:number;

  title:string;

  type:string;

  client:string;

  date:string;

  hour:string;

  location:string;
}

/* ======================================================
DATA
====================================================== */

const initialEvents:Event[] = [

  {
    id:1,

    title:
      "Réunion Netflix",

    type:"meeting",

    client:"Netflix",

    date:"2026-05-20",

    hour:"10:00",

    location:"Google Meet",
  },

  {
    id:2,

    title:
      "Démo CRM",

    type:"demo",

    client:"Spotify",

    date:"2026-05-21",

    hour:"14:30",

    location:"FlowBiz Office",
  },

  {
    id:3,

    title:
      "Appel Stripe",

    type:"call",

    client:"Stripe",

    date:"2026-05-22",

    hour:"09:00",

    location:"Zoom",
  },
];

/* ======================================================
PAGE
====================================================== */

export default function CalendarPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [

    events,
    setEvents,

  ] =
    useState(initialEvents);

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

  const filteredEvents =

    events.filter(

      event =>

        event.title
          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        event.client
          .toLowerCase()

          .includes(
            search.toLowerCase()
          )
    );

  /*
  ====================================================
  EVENT COLOR
  ====================================================
  */

  function getEventClass(
    type:string
  ){

    switch(type){

      case "meeting":
        return "meeting";

      case "demo":
        return "demo";

      default:
        return "call";
    }
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="calendarPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="calendarHeader">

        <div>

          <div className="calendarBadge">

            <BrainCircuit size={16} />

            FLOWBIZ CALENDAR

          </div>

          <h1>

            Smart Planning

          </h1>

          <p>

            Gestion intelligente
            des rendez-vous,
            appels et réunions.

          </p>

        </div>

        {/* ============================================== */}

        <button className="calendarButton">

          <Plus size={18} />

          Nouvel événement

        </button>

      </header>

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <section className="calendarTopbar">

        <div className="calendarSearch">

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

        <div className="calendarNavigation">

          <button>

            <ChevronLeft
              size={18}
            />

          </button>

          <span>

            Mai 2026

          </span>

          <button>

            <ChevronRight
              size={18}
            />

          </button>

        </div>

      </section>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="calendarGrid">

        {/* ==============================================
        EVENTS
        ============================================== */}

        <div className="calendarEvents">

          <div className="calendarSectionTitle">

            <div>

              <CalendarDays
                size={18}
              />

              Planning

            </div>

            <span>

              {
                filteredEvents.length
              } événements

            </span>

          </div>

          {/* ========================================== */}

          <div className="calendarEventsList">

            {
              filteredEvents.map(

                event => (

                  <div

                    key={event.id}

                    className={`

                      calendarEventCard

                      ${
                        getEventClass(
                          event.type
                        )
                      }

                    `}
                  >

                    {/* ==============================
                    LEFT
                    ============================== */}

                    <div className="calendarEventLeft">

                      <div className="calendarHour">

                        {
                          event.hour
                        }

                      </div>

                      <div>

                        <h3>

                          {
                            event.title
                          }

                        </h3>

                        <p>

                          {
                            event.client
                          }

                        </p>

                      </div>

                    </div>

                    {/* ==============================
                    RIGHT
                    ============================== */}

                    <div className="calendarEventInfos">

                      <div>

                        <Building2
                          size={16}
                        />

                        {
                          event.location
                        }

                      </div>

                      <div>

                        <Clock3
                          size={16}
                        />

                        {
                          event.date
                        }

                      </div>

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>

        {/* ==============================================
        SIDEBAR
        ============================================== */}

        <aside className="calendarSidebar">

          {/* ==========================================
          REMINDERS
          ========================================== */}

          <div className="calendarWidget">

            <div className="calendarSectionTitle">

              <div>

                <Bell size={18} />

                Rappels

              </div>

            </div>

            {/* ====================================== */}

            <div className="calendarReminder">

              <strong>

                Réunion Netflix

              </strong>

              <span>

                Aujourd’hui • 10:00

              </span>

            </div>

            {/* ====================================== */}

            <div className="calendarReminder">

              <strong>

                Démo CRM

              </strong>

              <span>

                Demain • 14:30

              </span>

            </div>

          </div>

          {/* ==========================================
          TEAMS
          ========================================== */}

          <div className="calendarWidget">

            <div className="calendarSectionTitle">

              <div>

                <Users size={18} />

                Équipe

              </div>

            </div>

            {/* ====================================== */}

            <div className="calendarTeam">

              <div className="calendarAvatar">

                J

              </div>

              <div>

                <strong>

                  Jordan

                </strong>

                <span>

                  Commercial

                </span>

              </div>

            </div>

            {/* ====================================== */}

            <div className="calendarTeam">

              <div className="calendarAvatar blue">

                S

              </div>

              <div>

                <strong>

                  Sarah

                </strong>

                <span>

                  Sales Manager

                </span>

              </div>

            </div>

          </div>

          {/* ==========================================
          VIDEO CALLS
          ========================================== */}

          <div className="calendarWidget">

            <div className="calendarSectionTitle">

              <div>

                <Video size={18} />

                Calls

              </div>

            </div>

            {/* ====================================== */}

            <div className="calendarCall">

              <strong>

                Zoom meeting

              </strong>

              <span>

                Connecté

              </span>

            </div>

          </div>

        </aside>

      </section>

    </div>
  );
}
