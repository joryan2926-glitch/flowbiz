// ======================================================
// app/api/ai/create-workspace/route.ts
// FLOWBIZ AI CREATE WORKSPACE
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

      name,
      description,

    } = body;

    const {

      data,

      error,

    } =

      await supabase

        .from(
          "ai_workspaces"
        )

        .insert({

          name,
          description,
        })

        .select()

        .single();

    if(error){

      throw error;
    }

    return NextResponse.json({

      success:true,

      workspace:data,
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
