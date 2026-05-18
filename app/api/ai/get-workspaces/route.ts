// ======================================================
// app/api/ai/get-workspaces/route.ts
// FLOWBIZ AI WORKSPACES
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
          "ai_workspaces"
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

      workspaces:data,
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
