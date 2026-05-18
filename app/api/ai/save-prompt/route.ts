// ======================================================
// app/api/ai/save-prompt/route.ts
// FLOWBIZ SAVE PROMPT
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
POST
====================================================== */

export async function POST(
  request:Request
){

  try{

    const body =
      await request.json();

    const {

      title,
      prompt,
      category,

    } = body;

    const {

      data,

      error,

    } =

      await supabase

        .from(
          "ai_saved_prompts"
        )

        .insert({

          title,
          prompt,
          category,
        })

        .select()

        .single();

    if(error){

      throw error;
    }

    return NextResponse.json({

      success:true,

      prompt:data,
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
