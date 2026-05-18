"use client";

import "./agenda.css";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  Plus,
  Bell,
  Sparkles,
  Clock3,
  Users,
  Brain,
  Search,
  ChevronRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Video,
  Phone,
  Mail,
  Edit3,
  Trash2,
  Save,
  X,
  Loader2,
  MapPin,
  Briefcase,
  Star,
  ArrowUpRight,
  FileText,
  Timer,
  Globe,
  CloudSun,
  CheckSquare,
  ClipboardList,
  Repeat,
  Target,
  BarChart3,
  Zap,
  Mic,
  ShieldCheck,
  CreditCard,
  FolderOpen,
  Flame,
  Monitor,
  Coffee,
} from "lucide-react";

import { supabase } from "@/app/lib/supabase";

/* ========================================
INTERFACES
======================================== */

interface Participant{
  name:string;
  email:string;
  status:string;
}

interface Task{
  title:string;
  done:boolean;
}

interface EventItem{
  id:string;
  title:string;
  description:string;
  date:string;
  start_time:string;
  end_time:string;
  location:string;
  attendee:string;
  attendee_email:string;
  participants:Participant[];
  tasks:Task[];
  category:string;
  priority:string;
  status:string;
  meeting_link:string;
  notes:string;
  recurring:boolean;
  favorite:boolean;
  weather:string;
  timezone:string;
  created_at:string;
}

/* ========================================
PAGE
======================================== */

export default function AgendaPage(){

  /*
  ========================================
  STATES
  ========================================
  */

  const [loading,setLoading] =
    useState(true);

  const [saving,setSaving] =
    useState(false);

  const [events,setEvents] =
    useState<EventItem[]>([]);

  const [search,setSearch] =
    useState("");

  const [showModal,setShowModal] =
    useState(false);

  const [editingEvent,
    setEditingEvent] =
    useState<EventItem | null>(null);

  /*
  ========================================
  FORM
  ========================================
  */

  const [title,setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [date,setDate] =
    useState("");

  const [startTime,
    setStartTime] =
    useState("");

  const [endTime,
    setEndTime] =
    useState("");

  const [location,
    setLocation] =
    useState("");

  const [attendee,
    setAttendee] =
    useState("");

  const [attendeeEmail,
    setAttendeeEmail] =
    useState("");

  const [participants,
    setParticipants] =
    useState<Participant[]>([]);

  const [tasks,setTasks] =
    useState<Task[]>([]);

  const [category,
    setCategory] =
    useState("Rendez-vous");

  const [priority,
    setPriority] =
    useState("Normale");

  const [status,
    setStatus] =
    useState("Planifié");

  const [meetingLink,
    setMeetingLink] =
    useState("");

  const [notes,setNotes] =
    useState("");

  const [recurring,
    setRecurring] =
    useState(false);

  const [favorite,
    setFavorite] =
    useState(false);

  const [timezone,
    setTimezone] =
    useState("Europe/Paris");

  const [newTask,setNewTask] =
    useState("");

  const [participantName,
    setParticipantName] =
    useState("");

  const [participantEmail,
    setParticipantEmail] =
    useState("");

  /*
  ========================================
  SAFE LINKS
  ========================================
  */

  function safeOpen(url:string){

    if(
      !url ||
      url.trim() === ""
    ){
      alert(
        "Aucun lien disponible"
      );
      return;
    }

    let finalUrl = url;

    if(
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ){
      finalUrl = `https://${url}`;
    }

    window.open(
      finalUrl,
      "_blank"
    );
  }

  /*
  ========================================
  LOAD
  ========================================
  */

  async function loadEvents(){

    setLoading(true);

    const {
      data,
      error,
    } = await supabase

      .from("agenda_events")

      .select("*")

      .order(
        "date",
        {
          ascending:true,
        }
      );

    if(error){

      console.log(error);

      setLoading(false);

      return;
    }

    setEvents(data || []);

    setLoading(false);
  }

  /*
  ========================================
  INIT
  ========================================
  */

  useEffect(()=>{

    loadEvents();

  },[]);

  /*
  ========================================
  REALTIME
  ========================================
  */

  useEffect(()=>{

    const channel =

      supabase

      .channel(
        "agenda-flowbiz"
      )

      .on(
        "postgres_changes",
        {
          event:"*",
          schema:"public",
          table:"agenda_events",
        },

        async ()=>{

          await loadEvents();
        }
      )

      .subscribe();

    return ()=>{

      supabase.removeChannel(
        channel
      );
    };

  },[]);

  /*
  ========================================
  RESET
  ========================================
  */

  function resetForm(){

    setTitle("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setAttendee("");
    setAttendeeEmail("");
    setParticipants([]);
    setTasks([]);
    setCategory("Rendez-vous");
    setPriority("Normale");
    setStatus("Planifié");
    setMeetingLink("");
    setNotes("");
    setRecurring(false);
    setFavorite(false);
    setTimezone("Europe/Paris");
    setNewTask("");
    setParticipantName("");
    setParticipantEmail("");

    setEditingEvent(null);
  }

  /*
  ========================================
  ADD TASK
  ========================================
  */

  function addTask(){

    if(!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        title:newTask,
        done:false,
      }
    ]);

    setNewTask("");
  }

  /*
  ========================================
  ADD PARTICIPANT
  ========================================
  */

  function addParticipant(){

    if(
      !participantName ||
      !participantEmail
    ) return;

    setParticipants([
      ...participants,
      {
        name:participantName,
        email:participantEmail,
        status:"Invité",
      }
    ]);

    setParticipantName("");
    setParticipantEmail("");
  }

  /*
  ========================================
  SAVE
  ========================================
  */

  async function handleSaveEvent(){

    try{

      if(
        !title ||
        !date
      ){
        alert(
          "Titre et date requis"
        );
        return;
      }

      setSaving(true);

      const payload = {

        title:title.trim(),

        description:
          description.trim(),

        date,

        start_time:startTime,

        end_time:endTime,

        location:
          location.trim(),

        attendee:
          attendee.trim(),

        attendee_email:
          attendeeEmail.trim(),

        participants,

        tasks,

        category,

        priority,

        status,

        meeting_link:
          meetingLink.trim(),

        notes:
          notes.trim(),

        recurring,

        favorite,

        timezone,

        weather:"22°C Soleil",
      };

      if(editingEvent){

        const { error } = await supabase

          .from("agenda_events")

          .update(payload)

          .eq(
            "id",
            editingEvent.id
          );

        if(error){

          alert(error.message);

          setSaving(false);

          return;
        }

      }else{

        const { error } = await supabase

          .from("agenda_events")

          .insert([payload]);

        if(error){

          alert(error.message);

          setSaving(false);

          return;
        }
      }

      await loadEvents();

      setSaving(false);

      setShowModal(false);

      resetForm();

    }catch(error){

      console.log(error);

      setSaving(false);
    }
  }

  /*
  ========================================
  DELETE
  ========================================
  */

  async function handleDelete(
    id:string
  ){

    const confirmDelete =
      confirm(
        "Supprimer cet événement ?"
      );

    if(!confirmDelete) return;

    await supabase

      .from("agenda_events")

      .delete()

      .eq("id",id);

    await loadEvents();
  }

  /*
  ========================================
  EDIT
  ========================================
  */

  function openEdit(
    event:EventItem
  ){

    setEditingEvent(event);

    setTitle(event.title);

    setDescription(
      event.description
    );

    setDate(event.date);

    setStartTime(
      event.start_time
    );

    setEndTime(
      event.end_time
    );

    setLocation(
      event.location
    );

    setAttendee(
      event.attendee
    );

    setAttendeeEmail(
      event.attendee_email
    );

    setParticipants(
      event.participants || []
    );

    setTasks(
      event.tasks || []
    );

    setCategory(
      event.category
    );

    setPriority(
      event.priority
    );

    setStatus(
      event.status
    );

    setMeetingLink(
      event.meeting_link
    );

    setNotes(
      event.notes || ""
    );

    setRecurring(
      event.recurring || false
    );

    setFavorite(
      event.favorite || false
    );

    setTimezone(
      event.timezone ||
      "Europe/Paris"
    );

    setShowModal(true);
  }

  /*
  ========================================
  FILTER
  ========================================
  */

  const filteredEvents =
    useMemo(()=>{

      return events.filter(
        (event)=>

          event.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          event.attendee
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

          ||

          event.location
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    },[
      events,
      search,
    ]);

  /*
  ========================================
  KPI
  ========================================
  */

  const todayEvents =

    events.filter(
      (event)=>

        event.date ===
        new Date()
          .toISOString()
          .split("T")[0]
    ).length;

  const completedEvents =

    events.filter(
      (event)=>

        event.status ===
        "Terminé"
    ).length;

  const favoriteEvents =

    events.filter(
      (event)=>

        event.favorite
    ).length;

  const recurringEvents =

    events.filter(
      (event)=>

        event.recurring
    ).length;

  const urgentEvents =

    events.filter(
      (event)=>

        event.priority ===
        "Urgente"
    ).length;

  /*
  ========================================
  NEXT EVENT
  ========================================
  */

  const nextMeeting = events[0];

  /*
  ========================================
  LOADING
  ========================================
  */

  if(loading){

    return(

      <div className="agendaLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  return(

    <div className="agendaPage">

      {/* TOPBAR */}

      <header className="agendaTopbar">

        <div>

          <span className="agendaBadge">

            <Sparkles />

            FLOWBIZ AGENDA IA

          </span>

          <h1>

            Agenda Ultra Premium

          </h1>

          <p>

            Agenda SaaS intelligent connecté CRM,
            factures, réunions,
            automatisations et IA FlowBiz.

          </p>

        </div>

        <div className="agendaActions">

          <button className="notifBtn">

            <Bell />

            <span className="notifDot" />

          </button>

          <button
            className="addEventBtn"
            onClick={() => {

              resetForm();

              setShowModal(true);
            }}
          >

            <Plus />

            Nouvel événement

          </button>

        </div>

      </header>

      {/* SEARCH */}

      <section className="agendaToolbar">

        <div className="agendaSearch">

          <Search />

          <input
            type="text"
            placeholder="Rechercher un événement..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </section>

      {/* KPI */}

      <section className="agendaStats">

        <div className="agendaStat blue">
          <CalendarDays />
          <h2>{todayEvents}</h2>
          <span>Aujourd’hui</span>
        </div>

        <div className="agendaStat green">
          <CheckCircle2 />
          <h2>{completedEvents}</h2>
          <span>Terminés</span>
        </div>

        <div className="agendaStat orange">
          <AlertTriangle />
          <h2>{urgentEvents}</h2>
          <span>Urgents</span>
        </div>

        <div className="agendaStat purple">
          <Repeat />
          <h2>{recurringEvents}</h2>
          <span>Récurrents</span>
        </div>

      </section>

      {/* WIDGETS */}

      <section className="widgetsGrid">

        <div className="widgetCard large">

          <div className="widgetTop">

            <div>

              <span>
                Analytics
              </span>

              <h3>
                Activité Agenda
              </h3>

            </div>

            <button>

              Voir rapport

            </button>

          </div>

          <div className="chartBox">
            <div className="chartLine" />
          </div>

        </div>

        {/* NEXT MEETING */}

        <div className="widgetCard nextMeetingCard">

          <div className="widgetMiniTop">

            <Video />

            Prochaine réunion

          </div>

          {
            nextMeeting ? (
              <>
                <h3>
                  {nextMeeting.title}
                </h3>

                <p>
                  {nextMeeting.attendee}
                </p>

                <span>
                  {nextMeeting.start_time}
                </span>

                <button
                  onClick={() =>
                    safeOpen(
                      nextMeeting.meeting_link
                    )
                  }
                >

                  Rejoindre

                </button>
              </>
            ) : (
              <p>
                Aucun rendez-vous
              </p>
            )
          }

        </div>

        {/* WORKTIME */}

        <div className="widgetCard">

          <div className="widgetMiniTop">

            <Timer />

            Temps de travail

          </div>

          <div className="simpleWidget">

            <strong>
              07h 42m
            </strong>

            <span>
              Aujourd’hui
            </span>

          </div>

        </div>

        {/* WEATHER */}

        <div className="widgetCard">

          <div className="widgetMiniTop">

            <CloudSun />

            Météo

          </div>

          <div className="simpleWidget">

            <strong>
              22°C
            </strong>

            <span>
              Soleil • Saint-Étienne
            </span>

          </div>

        </div>

        {/* IA */}

        <div className="widgetCard">

          <div className="widgetMiniTop">

            <Brain />

            IA Résumé

          </div>

          <ul className="activityList">

            <li>
              Prévoir devis premium
            </li>

            <li>
              Relance vendredi
            </li>

            <li>
              Réunion optimisée
            </li>

          </ul>

        </div>

        {/* SHORTCUTS */}

        <div className="widgetCard">

          <div className="widgetMiniTop">

            <Zap />

            Raccourcis

          </div>

          <div className="shortcutGrid">

            <button>
              <Plus size={16}/>
            </button>

            <button>
              <Video size={16}/>
            </button>

            <button>
              <CreditCard size={16}/>
            </button>

            <button>
              <Users size={16}/>
            </button>

          </div>

        </div>

        {/* LIVE */}

        <div className="widgetCard">

          <div className="widgetMiniTop">

            <Activity />

            Activité Live

          </div>

          <ul className="activityList">

            <li>
              Réunion créée
            </li>

            <li>
              Notification envoyée
            </li>

            <li>
              CRM synchronisé
            </li>

            <li>
              Facture liée
            </li>

          </ul>

        </div>

      </section>

      {/* EVENTS */}

      <section className="eventsGrid">

        {
          filteredEvents.length > 0 ? (

            filteredEvents.map(
              (event)=>(

                <div
                  key={event.id}
                  className="eventCard"
                >

                  <div className="eventTop">

                    <div>

                      <h3>

                        {event.title}

                      </h3>

                      <span>

                        {event.category}

                      </span>

                    </div>

                    <span
                      className={`eventStatus ${event.status}`}
                    >

                      {event.status}

                    </span>

                  </div>

                  <div className="eventInfos">

                    <div>
                      <CalendarDays size={16} />
                      {event.date}
                    </div>

                    <div>
                      <Clock3 size={16} />
                      {event.start_time}
                      {" - "}
                      {event.end_time}
                    </div>

                    <div>
                      <Users size={16} />
                      {event.attendee}
                    </div>

                    <div>
                      <MapPin size={16} />
                      {event.location}
                    </div>

                    <div>
                      <Globe size={16} />
                      {event.timezone}
                    </div>

                  </div>

                  <div className="eventDescription">

                    {event.description}

                  </div>

                  {/* TASKS */}

                  {
                    event.tasks?.length > 0 && (

                      <div className="tasksBox">

                        <h4>

                          Tâches

                        </h4>

                        {
                          event.tasks.map(
                            (
                              task,
                              index
                            )=>(
                              <div
                                key={index}
                                className="taskItem"
                              >

                                <CheckSquare size={14} />

                                {task.title}

                              </div>
                            )
                          )
                        }

                      </div>
                    )
                  }

                  {/* PARTICIPANTS */}

                  {
                    event.participants?.length > 0 && (

                      <div className="participantsBox">

                        <h4>

                          Participants

                        </h4>

                        {
                          event.participants.map(
                            (
                              participant,
                              index
                            )=>(
                              <div
                                key={index}
                                className="participantItem"
                              >

                                <Users size={14} />

                                {
                                  participant.name
                                }

                              </div>
                            )
                          )
                        }

                      </div>
                    )
                  }

                  {/* ACTIONS */}

                  <div className="eventActions">

                    <button
                      onClick={() => {

                        if(
                          event.attendee_email
                        ){
                          window.location.href =
                            `mailto:${event.attendee_email}`;
                        }
                      }}
                    >

                      <Mail size={16} />

                    </button>

                    <button
                      onClick={() => {

                        if(
                          event.attendee
                        ){
                          window.location.href =
                            `tel:${event.attendee}`;
                        }
                      }}
                    >

                      <Phone size={16} />

                    </button>

                    <button
                      onClick={() =>
                        safeOpen(
                          event.meeting_link
                        )
                      }
                    >

                      <Video size={16} />

                    </button>

                    <button>
                      <ClipboardList size={16} />
                    </button>

                    <button>
                      <BarChart3 size={16} />
                    </button>

                    <button>
                      <FileText size={16} />
                    </button>

                    <button
                      onClick={() =>
                        openEdit(event)
                      }
                    >

                      <Edit3 size={16} />

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          event.id
                        )
                      }
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                </div>
              )
            )

          ) : (

            <div className="emptyState">

              <CalendarDays size={70} />

              <h3>

                Aucun événement

              </h3>

              <p>

                Créez votre premier événement premium FlowBiz.

              </p>

            </div>
          )
        }

      </section>

      {/* MODAL */}

      {
        showModal && (

          <div className="modalOverlay">

            <div className="modalCard">

              <div className="modalTop">

                <h2>

                  {
                    editingEvent
                    ? "Modifier événement"
                    : "Nouvel événement"
                  }

                </h2>

                <button
                  onClick={() => {

                    setShowModal(false);

                    resetForm();
                  }}
                >

                  <X />

                </button>

              </div>

              <div className="modalForm">

                <input
                  type="text"
                  placeholder="Titre"
                  value={title}
                  onChange={(e)=>
                    setTitle(
                      e.target.value
                    )
                  }
                />

                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e)=>
                    setDescription(
                      e.target.value
                    )
                  }
                />

                <div className="doubleGrid">

                  <input
                    type="date"
                    value={date}
                    onChange={(e)=>
                      setDate(
                        e.target.value
                      )
                    }
                  />

                  <select
                    value={status}
                    onChange={(e)=>
                      setStatus(
                        e.target.value
                      )
                    }
                  >

                    <option>
                      Planifié
                    </option>

                    <option>
                      Terminé
                    </option>

                    <option>
                      Annulé
                    </option>

                  </select>

                </div>

                <div className="doubleGrid">

                  <input
                    type="time"
                    value={startTime}
                    onChange={(e)=>
                      setStartTime(
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="time"
                    value={endTime}
                    onChange={(e)=>
                      setEndTime(
                        e.target.value
                      )
                    }
                  />

                </div>

                <input
                  type="text"
                  placeholder="Lieu"
                  value={location}
                  onChange={(e)=>
                    setLocation(
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Participant principal"
                  value={attendee}
                  onChange={(e)=>
                    setAttendee(
                      e.target.value
                    )
                  }
                />

                <input
                  type="email"
                  placeholder="Email participant"
                  value={attendeeEmail}
                  onChange={(e)=>
                    setAttendeeEmail(
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Lien Meet / Zoom"
                  value={meetingLink}
                  onChange={(e)=>
                    setMeetingLink(
                      e.target.value
                    )
                  }
                />

                {/* TASKS */}

                <div className="taskCreator">

                  <input
                    type="text"
                    placeholder="Nouvelle tâche"
                    value={newTask}
                    onChange={(e)=>
                      setNewTask(
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={addTask}
                  >

                    Ajouter tâche

                  </button>

                </div>

                {/* PARTICIPANTS */}

                <div className="participantCreator">

                  <input
                    type="text"
                    placeholder="Participant"
                    value={participantName}
                    onChange={(e)=>
                      setParticipantName(
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={participantEmail}
                    onChange={(e)=>
                      setParticipantEmail(
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={addParticipant}
                  >

                    Ajouter participant

                  </button>

                </div>

                <textarea
                  placeholder="Notes internes"
                  value={notes}
                  onChange={(e)=>
                    setNotes(
                      e.target.value
                    )
                  }
                />

                <div className="toggleGrid">

                  <label>
                    <input
                      type="checkbox"
                      checked={favorite}
                      onChange={() =>
                        setFavorite(
                          !favorite
                        )
                      }
                    />
                    Favori
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={recurring}
                      onChange={() =>
                        setRecurring(
                          !recurring
                        )
                      }
                    />
                    Récurrent
                  </label>

                </div>

                <button
                  className="saveEventBtn"
                  onClick={
                    handleSaveEvent
                  }
                >

                  {
                    saving ? (

                      <Loader2 className="spin" />

                    ) : (

                      <>
                        <Save />

                        Sauvegarder événement
                      </>
                    )
                  }

                </button>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
}
