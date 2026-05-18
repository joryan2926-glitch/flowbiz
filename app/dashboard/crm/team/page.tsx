"use client";

/* ======================================================
FLOWBIZ TEAM
FINAL CONNECTED VERSION
====================================================== */

import "./team.css";

import {

  useEffect,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  Users,
  Plus,
  Search,
  Trash2,
  Loader2,
  BrainCircuit,
  Mail,
  Shield,
  BriefcaseBusiness,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface TeamMember{

  id?:string;

  full_name:string;

  email:string;

  role:string;

  department:string;

  active:boolean;
}

/* ======================================================
PAGE
====================================================== */

export default function TeamPage(){

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

    members,
    setMembers,

  ] =
    useState<TeamMember[]>(
      []
    );

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

      full_name:"",
      email:"",
      role:"",
      department:"",
    });

  /*
  ====================================================
  LOAD MEMBERS
  ====================================================
  */

  useEffect(()=>{

    loadMembers();

    subscribeRealtime();

  },[]);

  async function loadMembers(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from(
            "crm_team"
          )

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

      setMembers(
        data || []
      );

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

  function subscribeRealtime(){

    supabase

      .channel(
        "crm-team-realtime"
      )

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"crm_team",
        },

        ()=>{

          loadMembers();
        }
      )

      .subscribe();
  }

  /*
  ====================================================
  CREATE
  ====================================================
  */

  async function createMember(){

    if(

      !form.full_name ||

      !form.email ||

      !form.role

    ) return;

    try{

      const { error } =

        await supabase

          .from(
            "crm_team"
          )

          .insert([

            {

              full_name:
                form.full_name,

              email:
                form.email,

              role:
                form.role,

              department:
                form.department,

              active:true,
            },
          ]);

      if(error){

        console.log(error);

        return;
      }

      setForm({

        full_name:"",
        email:"",
        role:"",
        department:"",
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

  async function deleteMember(
    id:string
  ){

    try{

      const { error } =

        await supabase

          .from(
            "crm_team"
          )

          .delete()

          .eq(
            "id",
            id
          );

      if(error){

        console.log(error);
      }

    }catch(error){

      console.log(error);
    }
  }

  /*
  ====================================================
  FILTERED
  ====================================================
  */

  const filteredMembers =

    members.filter(

      member =>

        member.full_name
          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        member.email
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

      <div className="teamLoader">

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

    <div className="teamPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="teamHeader">

        <div>

          <div className="teamBadge">

            <BrainCircuit
              size={16}
            />

            FLOWBIZ TEAM

          </div>

          <h1>

            Team Workspace

          </h1>

          <p>

            Gestion temps réel
            des collaborateurs
            et permissions.

          </p>

        </div>

      </header>

      {/* ==================================================
      CREATE
      ================================================== */}

      <section className="teamCreate">

        <input

          type="text"

          placeholder="
          Nom complet
          "

          value={form.full_name}

          onChange={(e)=>

            setForm({

              ...form,

              full_name:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <input

          type="email"

          placeholder="
          Email
          "

          value={form.email}

          onChange={(e)=>

            setForm({

              ...form,

              email:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <input

          type="text"

          placeholder="
          Rôle
          "

          value={form.role}

          onChange={(e)=>

            setForm({

              ...form,

              role:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <input

          type="text"

          placeholder="
          Département
          "

          value={form.department}

          onChange={(e)=>

            setForm({

              ...form,

              department:
                e.target.value,
            })
          }
        />

        {/* ============================================== */}

        <button
          onClick={createMember}
        >

          <Plus size={18} />

          Ajouter

        </button>

      </section>

      {/* ==================================================
      SEARCH
      ================================================== */}

      <section className="teamSearch">

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

      <section className="teamGrid">

        {
          filteredMembers.map(

            member => (

              <div
                key={member.id}
                className="teamCard"
              >

                {/* ==============================
                AVATAR
                ============================== */}

                <div className="teamAvatar">

                  {
                    member.full_name
                      .charAt(0)
                  }

                </div>

                {/* ==============================
                CONTENT
                ============================== */}

                <div className="teamInfos">

                  <h3>

                    {
                      member.full_name
                    }

                  </h3>

                  <div>

                    <Mail size={14} />

                    {
                      member.email
                    }

                  </div>

                  <div>

                    <Shield size={14} />

                    {
                      member.role
                    }

                  </div>

                  <div>

                    <BriefcaseBusiness
                      size={14}
                    />

                    {
                      member.department
                    }

                  </div>

                </div>

                {/* ==============================
                STATUS
                ============================== */}

                <div className={`

                  teamStatus

                  ${
                    member.active
                    ? "active"
                    : "inactive"
                  }

                `}>

                  {
                    member.active
                    ? "Actif"
                    : "Inactif"
                  }

                </div>

                {/* ==============================
                ACTIONS
                ============================== */}

                <button

                  className="teamDelete"

                  onClick={()=>

                    deleteMember(
                      member.id!
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
