// ======================================================
// app/api/ai/get-prompts/route.ts
// FLOWBIZ AI PROMPTS
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
          "ai_saved_prompts"
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

      prompts:data,
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
