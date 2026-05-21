"use client";


import "./agenda.css";


import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Brain,
  CalendarDays,
  CheckCircle2,
  CheckSquare,
  ClipboardList,
  Clock3,
  CreditCard,
  Edit3,
  FileText,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Repeat,
  Save,
  Search,
  Sparkles,
  Trash2,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";


import { supabase } from "@/app/lib/supabase";


interface Participant {
  name: string;
  email: string;
  status: string;
}


interface Task {
  title: string;
  done: boolean;
}


interface EventItem {
  id: string;
  title: string;
  description: string | null;
  date: string;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  attendee: string | null;
  attendee_email: string | null;
  participants: Participant[] | null;
  tasks: Task[] | null;
  category: string | null;
  priority: string | null;
  status: string | null;
  meeting_link: string | null;
  notes: string | null;
  recurring: boolean | null;
  favorite: boolean | null;
  timezone: string | null;
  weather: string | null;
  created_at?: string;
}


const emptyParticipants: Participant[] = [];
const emptyTasks: Task[] = [];


export default function AgendaPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState("");


  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [attendee, setAttendee] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [category, setCategory] = useState("Rendez-vous");
  const [priority, setPriority] = useState("Normale");
  const [status, setStatus] = useState("Planifié");
  const [meetingLink, setMeetingLink] = useState("");
  const [notes, setNotes] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [timezone, setTimezone] = useState("Europe/Paris");


  const [newTask, setNewTask] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");


  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);


      const { data, error } = await supabase
        .from("agenda_events")
        .select("*")
        .order("date", { ascending: true });


      if (error) {
        console.error(error);
        setEvents([]);
        return;
      }


      setEvents((data || []) as EventItem[]);
    } catch (error) {
      console.error(error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    loadEvents();


    const channel = supabase
      .channel("agenda-flowbiz-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "agenda_events",
        },
        () => {
          loadEvents();
        }
      )
      .subscribe();


    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadEvents]);


  function resetForm() {
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


  function safeOpen(url?: string | null) {
    if (!url?.trim()) {
      alert("Aucun lien disponible.");
      return;
    }


    const finalUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;


    window.open(finalUrl, "_blank", "noopener,noreferrer");
  }


  function addTask() {
    if (!newTask.trim()) return;


    setTasks((prev) => [
      ...prev,
      {
        title: newTask.trim(),
        done: false,
      },
    ]);


    setNewTask("");
  }


  function removeTask(index: number) {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  }


  function toggleTask(index: number) {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index
          ? {
              ...task,
              done: !task.done,
            }
          : task
      )
    );
  }


  function addParticipant() {
    if (!participantName.trim() || !participantEmail.trim()) return;


    setParticipants((prev) => [
      ...prev,
      {
        name: participantName.trim(),
        email: participantEmail.trim(),
        status: "Invité",
      },
    ]);


    setParticipantName("");
    setParticipantEmail("");
  }


  function removeParticipant(index: number) {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  }


  function openCreate() {
    resetForm();
    setShowModal(true);
  }


  function openEdit(event: EventItem) {
    setEditingEvent(event);
    setTitle(event.title || "");
    setDescription(event.description || "");
    setDate(event.date || "");
    setStartTime(event.start_time || "");
    setEndTime(event.end_time || "");
    setLocation(event.location || "");
    setAttendee(event.attendee || "");
    setAttendeeEmail(event.attendee_email || "");
    setParticipants(event.participants || emptyParticipants);
    setTasks(event.tasks || emptyTasks);
    setCategory(event.category || "Rendez-vous");
    setPriority(event.priority || "Normale");
    setStatus(event.status || "Planifié");
    setMeetingLink(event.meeting_link || "");
    setNotes(event.notes || "");
    setRecurring(Boolean(event.recurring));
    setFavorite(Boolean(event.favorite));
    setTimezone(event.timezone || "Europe/Paris");
    setShowModal(true);
  }


  async function handleSaveEvent() {
    if (!title.trim() || !date) {
      alert("Titre et date requis.");
      return;
    }


    try {
      setSaving(true);


      const payload = {
        title: title.trim(),
        description: description.trim(),
        date,
        start_time: startTime,
        end_time: endTime,
        location: location.trim(),
        attendee: attendee.trim(),
        attendee_email: attendeeEmail.trim(),
        participants,
        tasks,
        category,
        priority,
        status,
        meeting_link: meetingLink.trim(),
        notes: notes.trim(),
        recurring,
        favorite,
        timezone,
        weather: "Non renseignée",
      };


      const request = editingEvent
        ? supabase.from("agenda_events").update(payload).eq("id", editingEvent.id)
        : supabase.from("agenda_events").insert([payload]);


      const { error } = await request;


      if (error) {
        alert(error.message);
        return;
      }


      await loadEvents();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  }


  async function handleDelete(id: string) {
    const ok = confirm("Supprimer cet événement ?");
    if (!ok) return;


    const { error } = await supabase.from("agenda_events").delete().eq("id", id);


    if (error) {
      alert(error.message);
      return;
    }


    await loadEvents();
  }


  async function updateEventStatus(event: EventItem, nextStatus: string) {
    const { error } = await supabase
      .from("agenda_events")
      .update({ status: nextStatus })
      .eq("id", event.id);


    if (error) {
      alert(error.message);
      return;
    }


    await loadEvents();
  }


  const filteredEvents = useMemo(() => {
    const value = search.toLowerCase();


    return events.filter((event) => {
      return (
        event.title?.toLowerCase().includes(value) ||
        event.attendee?.toLowerCase().includes(value) ||
        event.location?.toLowerCase().includes(value) ||
        event.category?.toLowerCase().includes(value)
      );
    });
  }, [events, search]);


  const today = new Date().toISOString().split("T")[0];


  const todayEvents = events.filter((event) => event.date === today).length;
  const completedEvents = events.filter((event) => event.status === "Terminé").length;
  const urgentEvents = events.filter((event) => event.priority === "Urgente").length;
  const recurringEvents = events.filter((event) => event.recurring).length;


  const nextMeeting = events.find((event) => event.date >= today) || null;


  if (loading) {
    return (
      <main className="agendaLoader">
        <Loader2 className="spin" />
      </main>
    );
  }


  return (
    <main className="agendaPage">
      <header className="agendaTopbar">
        <div>
          <span className="agendaBadge">
            <Sparkles size={16} />
            FLOWBIZ AGENDA IA
          </span>


          <h1>Agenda Ultra Premium</h1>


          <p>
            Agenda connecté au CRM, aux factures, aux réunions, aux relances et
            aux automatisations FlowBiz.
          </p>
        </div>


        <div className="agendaActions">
          <button className="notifBtn" type="button">
            <Bell size={18} />
            <span className="notifDot" />
          </button>


          <button className="addEventBtn" type="button" onClick={openCreate}>
            <Plus size={18} />
            Nouvel événement
          </button>
        </div>
      </header>


      <section className="agendaToolbar">
        <div className="agendaSearch">
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher un événement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>


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


      <section className="widgetsGrid">
        <div className="widgetCard large">
          <div className="widgetTop">
            <div>
              <span>Analytics</span>
              <h3>Activité Agenda</h3>
            </div>


            <Link href="/dashboard/analytics">Voir rapport</Link>
          </div>


          <div className="chartBox">
            <div className="chartLine" />
          </div>
        </div>


        <div className="widgetCard nextMeetingCard">
          <div className="widgetMiniTop">
            <Video />
            Prochaine réunion
          </div>


          {nextMeeting ? (
            <>
              <h3>{nextMeeting.title}</h3>
              <p>{nextMeeting.attendee || "Aucun participant"}</p>
              <span>{nextMeeting.start_time || "Heure non définie"}</span>


              <button type="button" onClick={() => safeOpen(nextMeeting.meeting_link)}>
                Rejoindre
              </button>
            </>
          ) : (
            <p>Aucun rendez-vous à venir.</p>
          )}
        </div>


        <div className="widgetCard">
          <div className="widgetMiniTop">
            <Brain />
            IA Résumé
          </div>


          <ul className="activityList">
            <li>{urgentEvents} événement(s) urgent(s)</li>
            <li>{todayEvents} rendez-vous aujourd’hui</li>
            <li>{completedEvents} événement(s) terminé(s)</li>
          </ul>
        </div>


        <div className="widgetCard">
          <div className="widgetMiniTop">
            <Zap />
            Raccourcis
          </div>


          <div className="shortcutGrid">
            <button type="button" onClick={openCreate}>
              <Plus size={16} />
            </button>


            <Link href="/dashboard/clients">
              <Users size={16} />
            </Link>


            <Link href="/dashboard/factures">
              <CreditCard size={16} />
            </Link>


            <Link href="/dashboard/analytics">
              <BarChart3 size={16} />
            </Link>
          </div>
        </div>


        <div className="widgetCard">
          <div className="widgetMiniTop">
            <Activity />
            Activité Live
          </div>


          <ul className="activityList">
            <li>Agenda synchronisé</li>
            <li>CRM connecté</li>
            <li>Factures liées</li>
          </ul>
        </div>
      </section>


      <section className="eventsGrid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <article key={event.id} className="eventCard">
              <div className="eventTop">
                <div>
                  <h3>{event.title}</h3>
                  <span>{event.category || "Rendez-vous"}</span>
                </div>


                <span className="eventStatus">{event.status || "Planifié"}</span>
              </div>


              <div className="eventInfos">
                <div>
                  <CalendarDays size={16} />
                  {event.date}
                </div>


                <div>
                  <Clock3 size={16} />
                  {event.start_time || "--:--"} - {event.end_time || "--:--"}
                </div>


                <div>
                  <Users size={16} />
                  {event.attendee || "Aucun participant"}
                </div>


                <div>
                  <MapPin size={16} />
                  {event.location || "Aucun lieu"}
                </div>


                <div>
                  <Globe size={16} />
                  {event.timezone || "Europe/Paris"}
                </div>
              </div>


              <p className="eventDescription">
                {event.description || "Aucune description."}
              </p>


              {event.tasks && event.tasks.length > 0 && (
                <div className="tasksBox">
                  <h4>Tâches</h4>


                  {event.tasks.map((task, index) => (
                    <div key={`${task.title}-${index}`} className="taskItem">
                      <CheckSquare size={14} />
                      <span>{task.title}</span>
                    </div>
                  ))}
                </div>
              )}


              {event.participants && event.participants.length > 0 && (
                <div className="participantsBox">
                  <h4>Participants</h4>


                  {event.participants.map((participant, index) => (
                    <div key={`${participant.email}-${index}`} className="participantItem">
                      <Users size={14} />
                      <span>{participant.name}</span>
                    </div>
                  ))}
                </div>
              )}


              <div className="eventActions">
                <button
                  type="button"
                  onClick={() => {
                    if (!event.attendee_email) {
                      alert("Aucun email disponible.");
                      return;
                    }


                    window.location.href = `mailto:${event.attendee_email}`;
                  }}
                >
                  <Mail size={16} />
                </button>


                <button
                  type="button"
                  onClick={() => alert("Numéro téléphone non renseigné dans ce modèle.")}
                >
                  <Phone size={16} />
                </button>


                <button type="button" onClick={() => safeOpen(event.meeting_link)}>
                  <Video size={16} />
                </button>


                <button type="button" onClick={() => updateEventStatus(event, "Terminé")}>
                  <CheckCircle2 size={16} />
                </button>


                <button type="button">
                  <ClipboardList size={16} />
                </button>


                <button type="button">
                  <FileText size={16} />
                </button>


                <button type="button" onClick={() => openEdit(event)}>
                  <Edit3 size={16} />
                </button>


                <button type="button" onClick={() => handleDelete(event.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="emptyState">
            <CalendarDays size={70} />
            <h3>Aucun événement</h3>
            <p>Crée ton premier événement FlowBiz.</p>
          </div>
        )}
      </section>


      {showModal && (
        <div className="modalOverlay">
          <div className="modalCard">
            <div className="modalTop">
              <h2>{editingEvent ? "Modifier événement" : "Nouvel événement"}</h2>


              <button
                type="button"
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
                onChange={(e) => setTitle(e.target.value)}
              />


              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />


              <div className="doubleGrid">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />


                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>Planifié</option>
                  <option>Terminé</option>
                  <option>Annulé</option>
                </select>
              </div>


              <div className="doubleGrid">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />


                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>


              <div className="doubleGrid">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Rendez-vous</option>
                  <option>Commercial</option>
                  <option>Formation</option>
                  <option>Facturation</option>
                  <option>Interne</option>
                </select>


                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option>Basse</option>
                  <option>Normale</option>
                  <option>Urgente</option>
                </select>
              </div>


              <input
                type="text"
                placeholder="Lieu"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />


              <input
                type="text"
                placeholder="Participant principal"
                value={attendee}
                onChange={(e) => setAttendee(e.target.value)}
              />


              <input
                type="email"
                placeholder="Email participant"
                value={attendeeEmail}
                onChange={(e) => setAttendeeEmail(e.target.value)}
              />


              <input
                type="text"
                placeholder="Lien Meet / Zoom"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />


              <div className="taskCreator">
                <input
                  type="text"
                  placeholder="Nouvelle tâche"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />


                <button type="button" onClick={addTask}>
                  Ajouter tâche
                </button>
              </div>


              {tasks.length > 0 && (
                <div className="modalList">
                  {tasks.map((task, index) => (
                    <button key={`${task.title}-${index}`} type="button" onClick={() => toggleTask(index)}>
                      <CheckSquare size={14} />
                      {task.title}
                      <X size={14} onClick={() => removeTask(index)} />
                    </button>
                  ))}
                </div>
              )}


              <div className="participantCreator">
                <input
                  type="text"
                  placeholder="Participant"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                />


                <input
                  type="email"
                  placeholder="Email"
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                />


                <button type="button" onClick={addParticipant}>
                  Ajouter participant
                </button>
              </div>


              {participants.length > 0 && (
                <div className="modalList">
                  {participants.map((participant, index) => (
                    <button
                      key={`${participant.email}-${index}`}
                      type="button"
                      onClick={() => removeParticipant(index)}
                    >
                      <Users size={14} />
                      {participant.name}
                      <X size={14} />
                    </button>
                  ))}
                </div>
              )}


              <textarea
                placeholder="Notes internes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />


              <div className="toggleGrid">
                <label>
                  <input
                    type="checkbox"
                    checked={favorite}
                    onChange={() => setFavorite((prev) => !prev)}
                  />
                  Favori
                </label>


                <label>
                  <input
                    type="checkbox"
                    checked={recurring}
                    onChange={() => setRecurring((prev) => !prev)}
                  />
                  Récurrent
                </label>
              </div>


              <button className="saveEventBtn" type="button" onClick={handleSaveEvent}>
                {saving ? (
                  <Loader2 className="spin" />
                ) : (
                  <>
                    <Save />
                    Sauvegarder événement
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
