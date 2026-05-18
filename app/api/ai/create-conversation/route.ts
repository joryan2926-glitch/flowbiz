// ======================================================
// app/api/ai/create-conversation/route.ts
// FLOWBIZ AI CONVERSATION
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

export async function POST(){

  try{

    const {

      data,

      error,

    } =

      await supabase

        .from(
          "ai_conversations"
        )

        .insert({

          title:
            "Nouvelle conversation",
        })

        .select()

        .single();

    if(error){

      throw error;
    }

    return NextResponse.json({

      success:true,

      conversation:data,
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
