// ======================================================
// app/api/crm/send-email/route.ts
// FLOWBIZ CRM EMAILS FINAL
// WITH HISTORY SAVE
// ======================================================

import {
  NextResponse,
} from "next/server";

import {
  Resend,
} from "resend";

import {
  createClient,
} from "@supabase/supabase-js";

/* ======================================================
RESEND
====================================================== */

const resend =
  new Resend(

    process.env
      .RESEND_API_KEY
  );

/* ======================================================
SUPABASE
====================================================== */

const supabase =
  createClient(

    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .SUPABASE_SERVICE_ROLE_KEY!
  );

/* ======================================================
POST
====================================================== */

export async function POST(
  request:Request
){

  try{

    const body =
      await request.json();

    const {

      to,
      subject,
      message,

    } = body;

    /*
    ====================================================
    SEND EMAIL
    ====================================================
    */

    await resend.emails.send({

      from:
        "FlowBiz <onboarding@resend.dev>",

      to,

      subject,

      html:`

        <div
          style="
            background:#070b1d;
            padding:40px;
            font-family:Arial;
            color:white;
          "
        >

          <h1
            style="
              font-size:28px;
              margin-bottom:20px;
            "
          >

            FlowBiz CRM

          </h1>

          <div
            style="
              background:#111827;
              padding:24px;
              border-radius:20px;
              border:1px solid rgba(255,255,255,.08);
            "
          >

            <p
              style="
                color:#d1d5db;
                line-height:1.8;
                font-size:15px;
              "
            >

              ${message}

            </p>

          </div>

        </div>
      `,
    });

    /*
    ====================================================
    SAVE HISTORY
    ====================================================
    */

    await supabase

      .from(
        "crm_email_history"
      )

      .insert({

        recipient:to,

        subject,

        message,

        status:"sent",
      });

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      success:true,
    });

  }catch(error:any){

    return NextResponse.json(

      {
        error:error.message,
      },

      {
        status:500,
      }
    );
  }
}
