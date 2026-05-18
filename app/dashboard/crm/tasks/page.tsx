"use client";

/* ======================================================
FLOWBIZ CRM TASKS
100% REALTIME CONNECTED
====================================================== */

import "./crm-tasks.css";

import {

  useEffect,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  BrainCircuit,
  Plus,
  Trash2,
  Loader2,
  CalendarDays,
  Flag,
  CheckCircle2,
  Clock3,
  Search,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Task{

  id:string;

  title:string;

  description:string;

  priority:string;

  status:string;

  assigned_to:string;

  due_date:string;
}

/* ======================================================
PAGE
====================================================== */

export default function TasksPage(){

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

    tasks,
    setTasks,

  ] =
    useState<Task[]>([]);

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

      title:"",
      description:"",
      priority:"medium",
      assigned_to:"",
      due_date:"",
    });

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    loadTasks();

    realtime();

  },[]);

  async function loadTasks(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from("crm_tasks")

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

      setTasks(data || []);

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

      .channel("crm-tasks")

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"crm_tasks",
        },

        ()=>{

          loadTasks();
        }
      )

      .subscribe();
  }

  /*
  ====================================================
  CREATE
  ====================================================
  */

  async function createTask(){

    if(!form.title) return;

    try{

      const { error } =

        await supabase

          .from("crm_tasks")

          .insert([

            {

              title:
                form.title,

              description:
                form.description,

              priority:
                form.priority,

              assigned_to:
                form.assigned_to,

              due_date:
                form.due_date,

              status:"todo",
            },
          ]);

      if(error){

        console.log(error);

        return;
      }

      setForm({

        title:"",
        description:"",
        priority:"medium",
        assigned_to:"",
        due_date:"",
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

  async function deleteTask(
    id:string
  ){

    await supabase

      .from("crm_tasks")

      .delete()

      .eq("id",id);
  }

  /*
  ====================================================
  STATUS
  ====================================================
  */

  async function toggleStatus(
    task:Task
  ){

    const newStatus =

      task.status ===
      "done"

      ? "todo"

      : "done";

    await supabase

      .from("crm_tasks")

      .update({

        status:newStatus,
      })

      .eq(
        "id",
        task.id
      );
  }

  /*
  ====================================================
  FILTER
  ====================================================
  */

  const filteredTasks =

    tasks.filter(

      task =>

        task.title
          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        task.assigned_to
          ?.toLowerCase()

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

      <div className="tasksLoader">

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

    <div className="tasksPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="tasksHeader">

        <div>

          <div className="tasksBadge">

            <BrainCircuit
              size={16}
            />

            FLOWBIZ TASKS

          </div>

          <h1>

            Smart Tasks

          </h1>

          <p>

            Gestion avancée
            des tâches CRM
            temps réel.

          </p>

        </div>

      </header>

      {/* ==================================================
      CREATE
      ================================================== */}

      <section className="tasksCreate">

        <input

          type="text"

          placeholder="
          Titre
          "

          value={form.title}

          onChange={(e)=>

            setForm({

              ...form,

              title:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <textarea

          placeholder="
          Description
          "

          value={form.description}

          onChange={(e)=>

            setForm({

              ...form,

              description:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <div className="tasksRow">

          <select

            value={form.priority}

            onChange={(e)=>

              setForm({

                ...form,

                priority:
                  e.target.value,
              })
            }
          >

            <option value="low">

              Faible

            </option>

            <option value="medium">

              Moyenne

            </option>

            <option value="high">

              Haute

            </option>

          </select>

          {/* ========================================== */}

          <input

            type="text"

            placeholder="
            Assigné à
            "

            value={form.assigned_to}

            onChange={(e)=>

              setForm({

                ...form,

                assigned_to:
                  e.target.value,
              })
            }
          />

          {/* ========================================== */}

          <input

            type="datetime-local"

            value={form.due_date}

            onChange={(e)=>

              setForm({

                ...form,

                due_date:
                  e.target.value,
              })
            }
          />

        </div>

        {/* ============================================== */}

        <button
          onClick={createTask}
        >

          <Plus size={18} />

          Ajouter tâche

        </button>

      </section>

      {/* ==================================================
      SEARCH
      ================================================== */}

      <section className="tasksSearch">

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

      <section className="tasksList">

        {
          filteredTasks.map(

            task => (

              <div
                key={task.id}
                className={`

                  taskCard

                  ${
                    task.status ===
                    "done"

                    ? "done"

                    : ""
                  }

                `}
              >

                {/* ==============================
                LEFT
                ============================== */}

                <div className="taskLeft">

                  <button

                    className="taskCheck"

                    onClick={()=>

                      toggleStatus(task)
                    }
                  >

                    <CheckCircle2
                      size={20}
                    />

                  </button>

                  {/* ========================== */}

                  <div>

                    <h3>

                      {
                        task.title
                      }

                    </h3>

                    <p>

                      {
                        task.description
                      }

                    </p>

                    {/* ====================== */}

                    <div className="taskMeta">

                      <span>

                        <Flag
                          size={14}
                        />

                        {
                          task.priority
                        }

                      </span>

                      <span>

                        {
                          task.assigned_to
                        }

                      </span>

                      <span>

                        <CalendarDays
                          size={14}
                        />

                        {

                          task.due_date

                          ? new Date(
                              task.due_date
                            )

                            .toLocaleString()

                          : "Aucune date"
                        }

                      </span>

                    </div>

                  </div>

                </div>

                {/* ==============================
                RIGHT
                ============================== */}

                <div className="taskRight">

                  <div className={`

                    taskStatus

                    ${
                      task.status
                    }

                  `}>

                    {

                      task.status ===
                      "done"

                      ? "Terminée"

                      : "À faire"
                    }

                  </div>

                  {/* ========================== */}

                  <button

                    className="taskDelete"

                    onClick={()=>

                      deleteTask(
                        task.id
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
