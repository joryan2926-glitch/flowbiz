// ======================================================
// app/dashboard/crm/emails/history/page.tsx
// FLOWBIZ EMAIL HISTORY
// FINAL VERSION
// ======================================================

"use client";

import "./history.css";

import {
  useEffect,
  useState,
} from "react";

import {

  Loader2,
  Sparkles,
  Mail,
  CalendarDays,
  CheckCircle2,

} from "lucide-react";

/* ======================================================
INTERFACE
====================================================== */

interface EmailHistory{

  id:string;

  recipient:string;

  subject:string;

  message:string;

  status:string;

  created_at:string;
}

/* ======================================================
PAGE
====================================================== */

export default function EmailHistoryPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    emails,
    setEmails,
  ] =
    useState<EmailHistory[]>([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    async function load(){

      try{

        const response =
          await fetch(

            "/api/crm/get-email-history"
          );

        const data =
          await response.json();

        setEmails(
          data.emails || []
        );

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);
      }
    }

    load();

  },[]);

  /*
  ====================================================
  LOADER
  ====================================================
  */

  if(loading){

    return(

      <div className="historyLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="historyPage">

      <div className="historyGlowOne" />
      <div className="historyGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="historyTopbar">

        <span className="historyBadge">

          <Sparkles />

          FLOWBIZ HISTORY

        </span>

        <h1>

          Email History

        </h1>

        <p>

          Historique complet
          des emails CRM
          envoyés.

        </p>

      </header>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="historyGrid">

        {
          emails.map(

            email=>(

              <div
                key={email.id}
                className="historyCard"
              >

                {/* ==================================================
                HEADER
                ================================================== */}

                <div className="historyHeader">

                  <div className="historyIcon">

                    <Mail />

                  </div>

                  <div>

                    <strong>

                      {email.subject}

                    </strong>

                    <span>

                      {email.recipient}

                    </span>

                  </div>

                </div>

                {/* ==================================================
                MESSAGE
                ================================================== */}

                <p className="historyMessage">

                  {email.message}

                </p>

                {/* ==================================================
                FOOTER
                ================================================== */}

                <div className="historyFooter">

                  <div>

                    <CalendarDays />

                    {
                      new Date(

                        email.created_at

                      ).toLocaleDateString()
                    }

                  </div>

                  <div className="statusBadge">

                    <CheckCircle2 />

                    {email.status}

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
