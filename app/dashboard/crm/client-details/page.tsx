"use client";

/* ======================================================
FLOWBIZ CLIENT DETAILS
100% REALTIME CONNECTED
====================================================== */

import "./client-details.css";

import {

  useEffect,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  Users,
  Mail,
  Phone,
  Building2,
  Plus,
  Trash2,
  Loader2,
  BrainCircuit,
  ClipboardList,
  StickyNote,

} from "lucide-react";

/* ======================================================
INTERFACES
====================================================== */

interface Client{

  id:string;

  full_name:string;

  email:string;

  phone:string;

  company:string;
}

interface Note{

  id:string;

  client_id:string;

  content:string;
}

interface Task{

  id:string;

  client_id:string;

  title:string;

  status:string;
}

/* ======================================================
PAGE
====================================================== */

export default function ClientDetailsPage(){

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

    clients,
    setClients,

  ] =
    useState<Client[]>([]);

  const [

    selectedClient,
    setSelectedClient,

  ] =
    useState<Client | null>(
      null
    );

  const [

    notes,
    setNotes,

  ] =
    useState<Note[]>([]);

  const [

    tasks,
    setTasks,

  ] =
    useState<Task[]>([]);

  const [

    noteInput,
    setNoteInput,

  ] =
    useState("");

  const [

    taskInput,
    setTaskInput,

  ] =
    useState("");

  /*
  ====================================================
  LOAD CLIENTS
  ====================================================
  */

  useEffect(()=>{

    loadClients();

  },[]);

  async function loadClients(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from("clients")

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

      setClients(data || []);

      if(data?.length){

        selectClient(data[0]);
      }

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  SELECT CLIENT
  ====================================================
  */

  async function selectClient(
    client:Client
  ){

    setSelectedClient(client);

    loadNotes(client.id);

    loadTasks(client.id);
  }

  /*
  ====================================================
  LOAD NOTES
  ====================================================
  */

  async function loadNotes(
    clientId:string
  ){

    const {

      data,

    } =

      await supabase

        .from("client_notes")

        .select("*")

        .eq(
          "client_id",
          clientId
        )

        .order(
          "created_at",
          {
            ascending:false,
          }
        );

    setNotes(data || []);
  }

  /*
  ====================================================
  LOAD TASKS
  ====================================================
  */

  async function loadTasks(
    clientId:string
  ){

    const {

      data,

    } =

      await supabase

        .from("client_tasks")

        .select("*")

        .eq(
          "client_id",
          clientId
        )

        .order(
          "created_at",
          {
            ascending:false,
          }
        );

    setTasks(data || []);
  }

  /*
  ====================================================
  CREATE NOTE
  ====================================================
  */

  async function createNote(){

    if(

      !selectedClient ||

      !noteInput

    ) return;

    await supabase

      .from("client_notes")

      .insert([

        {

          client_id:
            selectedClient.id,

          content:
            noteInput,
        },
      ]);

    setNoteInput("");

    loadNotes(
      selectedClient.id
    );
  }

  /*
  ====================================================
  CREATE TASK
  ====================================================
  */

  async function createTask(){

    if(

      !selectedClient ||

      !taskInput

    ) return;

    await supabase

      .from("client_tasks")

      .insert([

        {

          client_id:
            selectedClient.id,

          title:
            taskInput,
        },
      ]);

    setTaskInput("");

    loadTasks(
      selectedClient.id
    );
  }

  /*
  ====================================================
  DELETE NOTE
  ====================================================
  */

  async function deleteNote(
    id:string
  ){

    await supabase

      .from("client_notes")

      .delete()

      .eq("id",id);

    if(selectedClient){

      loadNotes(
        selectedClient.id
      );
    }
  }

  /*
  ====================================================
  DELETE TASK
  ====================================================
  */

  async function deleteTask(
    id:string
  ){

    await supabase

      .from("client_tasks")

      .delete()

      .eq("id",id);

    if(selectedClient){

      loadTasks(
        selectedClient.id
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

      <div className="detailsLoader">

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

    <div className="detailsPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="detailsHeader">

        <div>

          <div className="detailsBadge">

            <BrainCircuit
              size={16}
            />

            FLOWBIZ CLIENT DETAILS

          </div>

          <h1>

            Smart Client Center

          </h1>

          <p>

            Gestion avancée
            des clients,
            notes et tâches.

          </p>

        </div>

      </header>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="detailsGrid">

        {/* ==============================================
        CLIENTS
        ============================================== */}

        <aside className="detailsSidebar">

          {
            clients.map(

              client => (

                <div

                  key={client.id}

                  className={`

                    clientItem

                    ${
                      selectedClient?.id ===
                      client.id

                      ? "active"

                      : ""
                    }

                  `}

                  onClick={()=>

                    selectClient(client)
                  }
                >

                  <div className="clientAvatar">

                    {
                      client.full_name
                        ?.charAt(0)
                    }

                  </div>

                  <div>

                    <h3>

                      {
                        client.full_name
                      }

                    </h3>

                    <p>

                      {
                        client.company
                      }

                    </p>

                  </div>

                </div>
              )
            )
          }

        </aside>

        {/* ==============================================
        CONTENT
        ============================================== */}

        <div className="detailsContent">

          {

            selectedClient && (

              <>

                {/* ======================================
                INFOS
                ====================================== */}

                <div className="detailsCard">

                  <div className="detailsTop">

                    <div className="bigAvatar">

                      {
                        selectedClient
                          .full_name
                          .charAt(0)
                      }

                    </div>

                    <div>

                      <h2>

                        {
                          selectedClient
                            .full_name
                        }

                      </h2>

                      <div>

                        <Mail size={14} />

                        {
                          selectedClient
                            .email
                        }

                      </div>

                      <div>

                        <Phone size={14} />

                        {
                          selectedClient
                            .phone
                        }

                      </div>

                      <div>

                        <Building2
                          size={14}
                        />

                        {
                          selectedClient
                            .company
                        }

                      </div>

                    </div>

                  </div>

                </div>

                {/* ======================================
                NOTES
                ====================================== */}

                <div className="detailsCard">

                  <div className="sectionTitle">

                    <StickyNote
                      size={18}
                    />

                    Notes

                  </div>

                  <div className="createBox">

                    <input

                      type="text"

                      placeholder="
                      Ajouter une note...
                      "

                      value={noteInput}

                      onChange={(e)=>

                        setNoteInput(
                          e.target.value
                        )
                      }
                    />

                    <button
                      onClick={
                        createNote
                      }
                    >

                      <Plus size={18} />

                    </button>

                  </div>

                  {/* ============================== */}

                  <div className="listBox">

                    {
                      notes.map(

                        note => (

                          <div
                            key={note.id}
                            className="listItem"
                          >

                            <p>

                              {
                                note.content
                              }

                            </p>

                            <button

                              onClick={()=>

                                deleteNote(
                                  note.id
                                )
                              }
                            >

                              <Trash2
                                size={16}
                              />

                            </button>

                          </div>
                        )
                      )
                    }

                  </div>

                </div>

                {/* ======================================
                TASKS
                ====================================== */}

                <div className="detailsCard">

                  <div className="sectionTitle">

                    <ClipboardList
                      size={18}
                    />

                    Tâches

                  </div>

                  <div className="createBox">

                    <input

                      type="text"

                      placeholder="
                      Ajouter une tâche...
                      "

                      value={taskInput}

                      onChange={(e)=>

                        setTaskInput(
                          e.target.value
                        )
                      }
                    />

                    <button
                      onClick={
                        createTask
                      }
                    >

                      <Plus size={18} />

                    </button>

                  </div>

                  {/* ============================== */}

                  <div className="listBox">

                    {
                      tasks.map(

                        task => (

                          <div
                            key={task.id}
                            className="listItem"
                          >

                            <p>

                              {
                                task.title
                              }

                            </p>

                            <button

                              onClick={()=>

                                deleteTask(
                                  task.id
                                )
                              }
                            >

                              <Trash2
                                size={16}
                              />

                            </button>

                          </div>
                        )
                      )
                    }

                  </div>

                </div>

              </>
            )
          }

        </div>

      </section>

    </div>
  );
}
