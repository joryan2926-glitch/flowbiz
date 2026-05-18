// ======================================================
// app/dashboard/team/page.tsx
// FLOWBIZ TEAM CRM
// ULTRA PREMIUM FINAL VERSION
// ======================================================

"use client";

import "./team.css";

import {

  useEffect,
  useState,

} from "react";

import {

  createClient,

} from "@supabase/supabase-js";

import {

  Users,
  ShieldCheck,
  Sparkles,
  Loader2,
  Plus,
  Briefcase,
  Brain,
  Bell,
  TrendingUp,
  Crown,

} from "lucide-react";

/* ======================================================
SUPABASE
====================================================== */

const supabase =
  createClient(

    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

/* ======================================================
INTERFACES
====================================================== */

interface Member{

  id:string;

  full_name:string;

  email:string;

  role:string;

  status:string;
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
    useState<Member[]>([]);

  const [
    form,
    setForm,
  ] =
    useState({

      full_name:"",
      email:"",
      role:"",
    });

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    loadMembers();

  },[]);

  /*
  ====================================================
  LOAD MEMBERS
  ====================================================
  */

  async function loadMembers(){

    const {

      data,

    } =

      await supabase

        .from(
          "team_members"
        )

        .select("*")

        .order(
          "created_at",
          {
            ascending:false,
          }
        );

    setMembers(
      data || []
    );

    setLoading(false);
  }

  /*
  ====================================================
  CREATE MEMBER
  ====================================================
  */

  async function createMember(){

    /*
    ================================================
    WORKSPACE
    ================================================
    */

    let workspaceId = null;

    const {

      data:workspace,

    } =

      await supabase

        .from(
          "team_workspaces"
        )

        .select("*")
        .limit(1)
        .single();

    /*
    ================================================
    CREATE DEFAULT
    ================================================
    */

    if(!workspace){

      const {

        data:newWorkspace,

      } =

        await supabase

          .from(
            "team_workspaces"
          )

          .insert({

            name:
              "FlowBiz Workspace",

            description:
              "Workspace principal",
          })

          .select()
          .single();

      workspaceId =
        newWorkspace.id;

    }else{

      workspaceId =
        workspace.id;
    }

    /*
    ================================================
    MEMBER
    ================================================
    */

    const {

      data:member,

    } =

      await supabase

        .from(
          "team_members"
        )

        .insert({

          workspace_id:
            workspaceId,

          ...form,

          status:"active",
        })

        .select()
        .single();

    /*
    ================================================
    PERMISSIONS
    ================================================
    */

    await supabase

      .from(
        "team_permissions"
      )

      .insert({

        member_id:
          member.id,

        can_manage_clients:
          true,

        can_manage_team:
          form.role === "manager",

        can_manage_analytics:
          true,

        can_manage_automations:
          form.role === "manager",
      });

    /*
    ================================================
    ACTIVITY
    ================================================
    */

    await supabase

      .from(
        "team_activities"
      )

      .insert({

        member_id:
          member.id,

        activity_type:
          "member_created",

        content:
          `${form.full_name} ajouté à l'équipe`,
      });

    /*
    ================================================
    NOTIFICATION
    ================================================
    */

    await supabase

      .from(
        "team_notifications"
      )

      .insert({

        workspace_id:
          workspaceId,

        title:
          "Nouveau membre",

        content:
          `${form.full_name} a rejoint l'équipe`,

        type:"team",
      });

    setForm({

      full_name:"",
      email:"",
      role:"",
    });

    loadMembers();
  }

  /*
  ====================================================
  LOADER
  ====================================================
  */

  if(loading){

    return(

      <div className="teamLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  METRICS
  ====================================================
  */

  const managers =

    members.filter(

      member=>

        member.role
        === "manager"
    ).length;

  const sales =

    members.filter(

      member=>

        member.role
        === "sales"
    ).length;

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="teamPage">

      <div className="teamGlowOne" />
      <div className="teamGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="teamTopbar">

        <span className="teamBadge">

          <Sparkles />

          FLOWBIZ TEAM CRM

        </span>

        <h1>

          Team Workspace

        </h1>

        <p>

          Gestion des équipes,
          permissions et performances
          commerciales.

        </p>

      </header>

      {/* ==================================================
      STATS
      ================================================== */}

      <section className="teamStats">

        <div className="teamStatCard">

          <div className="teamStatIcon">

            <Users />

          </div>

          <div>

            <span>

              Collaborateurs

            </span>

            <strong>

              {members.length}

            </strong>

          </div>

        </div>

        <div className="teamStatCard">

          <div className="teamStatIcon manager">

            <Crown />

          </div>

          <div>

            <span>

              Managers

            </span>

            <strong>

              {managers}

            </strong>

          </div>

        </div>

        <div className="teamStatCard">

          <div className="teamStatIcon sales">

            <Briefcase />

          </div>

          <div>

            <span>

              Commerciaux

            </span>

            <strong>

              {sales}

            </strong>

          </div>

        </div>

        <div className="teamStatCard">

          <div className="teamStatIcon performance">

            <TrendingUp />

          </div>

          <div>

            <span>

              Performance

            </span>

            <strong>

              +28%

            </strong>

          </div>

        </div>

      </section>

      {/* ==================================================
      CREATE
      ================================================== */}

      <section className="teamCreate">

        <input

          placeholder="
          Nom collaborateur
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

        <input

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

        <select

          value={form.role}

          onChange={(e)=>

            setForm({

              ...form,

              role:e.target.value,
            })
          }
        >

          <option value="">

            Rôle

          </option>

          <option value="sales">

            Commercial

          </option>

          <option value="manager">

            Manager

          </option>

        </select>

        <button
          onClick={createMember}
        >

          <Plus />

          Ajouter membre

        </button>

      </section>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="teamGrid">

        {
          members.map(

            member=>(

              <div
                key={member.id}
                className="memberCard"
              >

                {/* ==========================================
                HEADER
                ========================================== */}

                <div className="memberHeader">

                  <div className="memberAvatar">

                    {
                      member.full_name
                        ?.charAt(0)
                    }

                  </div>

                  <div>

                    <strong>

                      {member.full_name}

                    </strong>

                    <span>

                      {member.email}

                    </span>

                  </div>

                </div>

                {/* ==========================================
                ROLE
                ========================================== */}

                <div className="memberRole">

                  {
                    member.role
                  }

                </div>

                {/* ==========================================
                PERMISSIONS
                ========================================== */}

                <div className="permissionsList">

                  <div>

                    <ShieldCheck />

                    Gestion CRM

                  </div>

                  <div>

                    <Brain />

                    IA CRM

                  </div>

                  <div>

                    <Bell />

                    Notifications

                  </div>

                </div>

                {/* ==========================================
                STATUS
                ========================================== */}

                <div className="memberFooter">

                  <div
                    className="
                    memberStatus
                    "
                  >

                    {
                      member.status
                    }

                  </div>

                  <div className="memberPerformance">

                    +18%

                  </div>

                </div>

              </div>
            )
          )
        }

      </section>

    </div>
  );
}
