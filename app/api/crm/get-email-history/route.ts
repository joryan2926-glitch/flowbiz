// ======================================================
// app/api/crm/get-email-history/route.ts
// FLOWBIZ CRM EMAIL HISTORY
// ======================================================

import {
  NextResponse,
} from "next/server";

import {
  createClient,
} from "@supabase/supabase-js";

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
GET
====================================================== */

export async function GET(){

  try{

    const {

      data,

      error,

    } =

      await supabase

        .from(
          "crm_email_history"
        )

        .select("*")

        .order(

          "created_at",

          {
            ascending:false,
          }
        );

    if(error){

      throw error;
    }

    return NextResponse.json({

      emails:data,
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
