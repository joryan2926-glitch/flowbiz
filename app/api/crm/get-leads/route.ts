// ======================================================
// app/api/crm/get-leads/route.ts
// FLOWBIZ CRM GET LEADS
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
          "leads"
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

      leads:data,
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
