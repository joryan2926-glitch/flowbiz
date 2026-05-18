"use client";

/* ======================================================
FLOWBIZ CRM TASKS
FINAL PRODUCTIVITY SYSTEM
====================================================== */

import "./tasks.css";

import {

  useMemo,
  useState,

} from "react";

import {

  Plus,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  CalendarDays,
  User2,
  Search,
  Filter,
  MoreVertical,
  BriefcaseBusiness,
  BrainCircuit,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface Task{

  id:number;

  title:string;

  description:string;

  priority:string;

  status:string;

  assigned:string;

  dueDate:string;
}

/* ======================================================
DATA
====================================================== */

const initialTasks:Task[] = [

  {
    id:1,

    title:
      "Relancer prospect Netflix",

    description:
      "Envoyer proposition commerciale IA.",

    priority:"high",

    status:"todo",

    assigned:"Jordan",

    dueDate:"2026-05-20",
  },

  {
    id:2,

    title:
      "Créer facture Stripe",

    description:
      "Préparer la facture abonnement SaaS.",

    priority:"medium",

    status:"progress",

    assigned:"Sarah",

    dueDate:"2026-05-21",
  },

  {
    id:3,

    title:
      "Validation contrat client",

    description:
      "Faire signer le contrat CRM.",

    priority:"low",

    status:"done",

    assigned:"David",

    dueDate:"2026-05-23",
  },
];

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

    tasks,
    setTasks,

  ] =
    useState(initialTasks);

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
      assigned:"",
      dueDate:"",
    });

  /*
  ====================================================
  FILTERED
  ====================================================
  */

  const filteredTasks =

    useMemo(()=>{

      return tasks.filter(

        task =>

          task.title
            .toLowerCase()

            .includes(
              search.toLowerCase()
            )

          ||

          task.assigned
            .toLowerCase()

            .includes(
              search.toLowerCase()
            )
      );

    },[
      tasks,
      search,
    ]);

  /*
  ====================================================
  STATS
  ====================================================
  */

  const todoCount =

    tasks.filter(

      task=>
      task.status ===
      "todo"

    ).length;

  const progressCount =

    tasks.filter(

      task=>
      task.status ===
      "progress"

    ).length;

  const doneCount =

    tasks.filter(

      task=>
      task.status ===
      "done"

    ).length;

  /*
  ====================================================
  CREATE TASK
  ====================================================
  */

  function createTask(){

    if(
      !form.title
    ) return;

    const newTask:Task = {

      id:Date.now(),

      title:
        form.title,

      description:
        form.description,

      assigned:
        form.assigned,

      dueDate:
        form.dueDate,

      priority:"medium",

      status:"todo",
    };

    setTasks([
      newTask,
      ...tasks,
    ]);

    setForm({

      title:"",
      description:"",
      assigned:"",
      dueDate:"",
    });
  }

  /*
  ====================================================
  UPDATE STATUS
  ====================================================
  */

  function updateStatus(

    id:number,
    status:string

  ){

    setTasks(

      tasks.map(

        task =>

          task.id === id

            ? {
                ...task,
                status,
              }

            : task
      )
    );
  }

  /*
  ====================================================
  PRIORITY CLASS
  ====================================================
  */

  function getPriorityClass(
    priority:string
  ){

    switch(priority){

      case "high":
        return "high";

      case "medium":
        return "medium";

      default:
        return "low";
    }
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

            <BrainCircuit size={16} />

            FLOWBIZ TASKS

          </div>

          <h1>

            CRM Productivity

          </h1>

          <p>

            Gestion intelligente
            des tâches commerciales,
            équipes et workflow.

          </p>

        </div>

      </header>

      {/* ==================================================
      STATS
      ================================================== */}

      <section className="tasksStats">

        <div className="tasksStatCard">

          <div className="tasksStatIcon purple">

            <Clock3 />

          </div>

          <div>

            <span>

              À faire

            </span>

            <strong>

              {todoCount}

            </strong>

          </div>

        </div>

        {/* ============================================== */}

        <div className="tasksStatCard">

          <div className="tasksStatIcon blue">

            <AlertTriangle />

          </div>

          <div>

            <span>

              En cours

            </span>

            <strong>

              {progressCount}

            </strong>

          </div>

        </div>

        {/* ============================================== */}

        <div className="tasksStatCard">

          <div className="tasksStatIcon green">

            <CheckCircle2 />

          </div>

          <div>

            <span>

              Terminées

            </span>

            <strong>

              {doneCount}

            </strong>

          </div>

        </div>

      </section>

      {/* ==================================================
      SEARCH
      ================================================== */}

      <section className="tasksSearchSection">

        <div className="tasksSearch">

          <Search size={18} />

          <input

            type="text"

            placeholder="
            Rechercher une tâche...
            "

            value={search}

            onChange={(e)=>

              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <button className="tasksFilterButton">

          <Filter size={18} />

          Filtrer

        </button>

      </section>

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

        <input

          type="text"

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

        <input

          type="text"

          placeholder="
          Assigné à
          "

          value={form.assigned}

          onChange={(e)=>

            setForm({

              ...form,

              assigned:
                e.target.value,
            })
          }
        />

        <input

          type="date"

          value={form.dueDate}

          onChange={(e)=>

            setForm({

              ...form,

              dueDate:
                e.target.value,
            })
          }
        />

        <button
          onClick={createTask}
        >

          <Plus size={18} />

          Ajouter

        </button>

      </section>

      {/* ==================================================
      TASKS
      ================================================== */}

      <section className="tasksGrid">

        {
          filteredTasks.map(

            task=>(

              <div
                key={task.id}
                className="taskCard"
              >

                {/* ========================================
                TOP
                ======================================== */}

                <div className="taskTop">

                  <div className={`

                    taskPriority

                    ${
                      getPriorityClass(
                        task.priority
                      )
                    }

                  `}>

                    {
                      task.priority
                    }

                  </div>

                  <button>

                    <MoreVertical
                      size={18}
                    />

                  </button>

                </div>

                {/* ========================================
                CONTENT
                ======================================== */}

                <h3>

                  {task.title}

                </h3>

                <p>

                  {task.description}

                </p>

                {/* ========================================
                INFOS
                ======================================== */}

                <div className="taskInfos">

                  <div>

                    <User2 size={16} />

                    {task.assigned}

                  </div>

                  <div>

                    <CalendarDays
                      size={16}
                    />

                    {task.dueDate}

                  </div>

                </div>

                {/* ========================================
                ACTIONS
                ======================================== */}

                <div className="taskActions">

                  <button
                    onClick={()=>

                      updateStatus(
                        task.id,
                        "todo"
                      )
                    }
                  >

                    Todo

                  </button>

                  <button
                    onClick={()=>

                      updateStatus(
                        task.id,
                        "progress"
                      )
                    }
                  >

                    Progress

                  </button>

                  <button
                    onClick={()=>

                      updateStatus(
                        task.id,
                        "done"
                      )
                    }
                  >

                    Done

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
