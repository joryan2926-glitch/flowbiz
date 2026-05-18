// ======================================================
// app/api/crm/create-task/route.ts
// FLOWBIZ CREATE TASK
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

      lead_id,
      title,
      description,
      priority,
      due_date,

    } = body;

    const {

      data,

      error,

    } =

      await supabase

        .from(
          "crm_tasks"
        )

        .insert({

          lead_id,
          title,
          description,
          priority,
          due_date,
        })

        .select(`
          *,
          leads(
            name,
            company
          )
        `)

        .single();

    if(error){

      throw error;
    }

    return NextResponse.json({

      success:true,

      task:data,
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
