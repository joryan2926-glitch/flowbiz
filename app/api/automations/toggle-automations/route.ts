// ======================================================
// app/api/automations/toggle-automation/route.ts
// FLOWBIZ TOGGLE AUTOMATION
// ======================================================

import {
  NextResponse,
} from "next/server";

import {
  createClient,
} from "@supabase/supabase-js";

const supabase =
  createClient(

    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .SUPABASE_SERVICE_ROLE_KEY!
  );

export async function POST(
  request:Request
){

  try{

    const body =
      await request.json();

    const {

      id,
      enabled,

    } = body;

    const {

      data,

      error,

    } =

      await supabase

        .from(
          "automations"
        )

        .update({
          enabled,
        })

        .eq(
          "id",
          id
        )

        .select()

        .single();

    if(error){

      throw error;
    }

    return NextResponse.json({

      success:true,

      automation:data,
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
