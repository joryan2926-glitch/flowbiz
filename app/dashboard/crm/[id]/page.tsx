// ======================================================
// app/dashboard/crm/[id]/page.tsx
// FLOWBIZ CRM CLIENT DETAILS
// ULTRA PREMIUM FINAL VERSION
// ======================================================

"use client";

import "./client-details.css";

import {

  useEffect,
  useState,

} from "react";

import {

  useParams,

} from "next/navigation";

import {

  createClient,

} from "@supabase/supabase-js";

import {

  Mail,
  Phone,
  Building2,
  DollarSign,
  CalendarDays,
  StickyNote,
  Upload,
  Brain,
  Clock3,
  CircleDot,
  Loader2,
  Sparkles,

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

interface Client{

  id:string;

  full_name:string;

  email:string;

  phone:string;

  company:string;

  value:number;

  pipeline_stage:string;

  notes:string;
}

interface Activity{

  id:string;

  type:string;

  content:string;

  created_at:string;
}

interface Note{

  id:string;

  content:string;

  created_at:string;
}

interface Meeting{

  id:string;

  title:string;

  meeting_date:string;
}

interface FileItem{

  id:string;

  file_name:string;

  file_url:string;
}

/* ======================================================
PAGE
====================================================== */

export default function ClientDetailsPage(){

  /*
  ====================================================
  PARAMS
  ====================================================
  */

  const params =
    useParams();

  const clientId =
    params.id as string;

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
    client,
    setClient,
  ] =
    useState<Client | null>(null);

  const [
    activities,
    setActivities,
  ] =
    useState<Activity[]>([]);

  const [
    notes,
    setNotes,
  ] =
    useState<Note[]>([]);

  const [
    meetings,
    setMeetings,
  ] =
    useState<Meeting[]>([]);

  const [
    files,
    setFiles,
  ] =
    useState<FileItem[]>([]);

  /*
  ====================================================
  LOAD DATA
  ====================================================
  */

  useEffect(()=>{

    if(clientId){

      loadData();
    }

  },[clientId]);

  /*
  ====================================================
  LOAD
  ====================================================
  */

  async function loadData(){

    try{

      /*
      ================================================
      CLIENT
      ================================================
      */

      const {

        data:clientData,

      } =

        await supabase

          .from(
            "crm_clients"
          )

          .select("*")

          .eq(
            "id",
            clientId
          )

          .single();

      setClient(
        clientData
      );

      /*
      ================================================
      ACTIVITIES
      ================================================
      */

      const {

        data:activitiesData,

      } =

        await supabase

          .from(
            "crm_activities"
          )

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

      setActivities(
        activitiesData || []
      );

      /*
      ================================================
      NOTES
      ================================================
      */

      const {

        data:notesData,

      } =

        await supabase

          .from(
            "crm_notes"
          )

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

      setNotes(
        notesData || []
      );

      /*
      ================================================
      MEETINGS
      ================================================
      */

      const {

        data:meetingsData,

      } =

        await supabase

          .from(
            "crm_meetings"
          )

          .select("*")

          .eq(
            "client_id",
            clientId
          )

          .order(
            "meeting_date",
            {
              ascending:false,
            }
          );

      setMeetings(
        meetingsData || []
      );

      /*
      ================================================
      FILES
      ================================================
      */

      const {

        data:filesData,

      } =

        await supabase

          .from(
            "crm_files"
          )

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

      setFiles(
        filesData || []
      );

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  LOADER
  ====================================================
  */

  if(loading){

    return(

      <div className="clientLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  NO CLIENT
  ====================================================
  */

  if(!client){

    return(

      <div className="clientLoader">

        Client introuvable

      </div>
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="clientDetailsPage">

      <div className="clientGlowOne" />
      <div className="clientGlowTwo" />

      {/* ==================================================
      HEADER
      ================================================== */}

      <section className="clientHero">

        <div className="clientAvatar">

          {
            client.full_name
              ?.charAt(0)
          }

        </div>

        <div className="clientHeroInfos">

          <div className="heroBadge">

            <Sparkles />

            FLOWBIZ CRM

          </div>

          <h1>

            {client.full_name}

          </h1>

          <div className="clientMeta">

            <div>

              <Mail />

              {client.email}

            </div>

            <div>

              <Phone />

              {client.phone}

            </div>

            <div>

              <Building2 />

              {client.company}

            </div>

          </div>

        </div>

        <div className="clientValueCard">

          <span>

            Valeur client

          </span>

          <strong>

            {client.value} €

          </strong>

          <small>

            {client.pipeline_stage}

          </small>

        </div>

      </section>

      {/* ==================================================
      GRID
      ================================================== */}

      <div className="clientGrid">

        {/* ==================================================
        LEFT
        ================================================== */}

        <div className="clientLeft">

          {/* ==============================================
          TIMELINE
          ============================================== */}

          <section className="detailsCard">

            <div className="cardHeader">

              <Clock3 />

              Timeline activité

            </div>

            <div className="timelineList">

              {
                activities.map(

                  activity=>(

                    <div
                      key={activity.id}
                      className="timelineItem"
                    >

                      <div className="timelineDot">

                        <CircleDot />

                      </div>

                      <div>

                        <strong>

                          {activity.type}

                        </strong>

                        <p>

                          {activity.content}

                        </p>

                        <span>

                          {
                            new Date(

                              activity.created_at
                            )

                            .toLocaleString()
                          }

                        </span>

                      </div>

                    </div>
                  )
                )
              }

            </div>

          </section>

          {/* ==============================================
          NOTES
          ============================================== */}

          <section className="detailsCard">

            <div className="cardHeader">

              <StickyNote />

              Notes clients

            </div>

            <div className="notesList">

              {
                notes.map(

                  note=>(

                    <div
                      key={note.id}
                      className="noteCard"
                    >

                      <p>

                        {note.content}

                      </p>

                      <span>

                        {
                          new Date(

                            note.created_at
                          )

                          .toLocaleString()
                        }

                      </span>

                    </div>
                  )
                )
              }

            </div>

          </section>

        </div>

        {/* ==================================================
        RIGHT
        ================================================== */}

        <div className="clientRight">

          {/* ==============================================
          MEETINGS
          ============================================== */}

          <section className="detailsCard">

            <div className="cardHeader">

              <CalendarDays />

              Réunions

            </div>

            <div className="meetingsList">

              {
                meetings.map(

                  meeting=>(

                    <div
                      key={meeting.id}
                      className="meetingCard"
                    >

                      <strong>

                        {meeting.title}

                      </strong>

                      <span>

                        {
                          new Date(

                            meeting.meeting_date
                          )

                          .toLocaleString()
                        }

                      </span>

                    </div>
                  )
                )
              }

            </div>

          </section>

          {/* ==============================================
          FILES
          ============================================== */}

          <section className="detailsCard">

            <div className="cardHeader">

              <Upload />

              Documents

            </div>

            <div className="filesList">

              {
                files.map(

                  file=>(

                    <a

                      key={file.id}

                      href={file.file_url}

                      target="_blank"

                      className="fileCard"
                    >

                      {file.file_name}

                    </a>
                  )
                )
              }

            </div>

          </section>

          {/* ==============================================
          AI INSIGHTS
          ============================================== */}

          <section className="detailsCard aiCard">

            <div className="cardHeader">

              <Brain />

              IA Insights

            </div>

            <div className="aiInsight">

              <strong>

                Score conversion :

              </strong>

              <span>

                87%

              </span>

            </div>

            <div className="aiInsight">

              <strong>

                Recommandation :

              </strong>

              <p>

                Relancer le client
                dans les 48h avec
                une proposition premium.

              </p>

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}
