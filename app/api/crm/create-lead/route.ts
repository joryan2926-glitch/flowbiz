// ======================================================
// app/api/crm/create-lead/route.ts
// FLOWBIZ CREATE LEAD
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
      email,
      company,
      phone,
      value,
      notes,

    } = body;

    const {

      data,

      error,

    } =

      await supabase

        .from(
          "leads"
        )

        .insert({

          name,
          email,
          company,
          phone,
          value,
          notes,
        })

        .select()

        .single();

    if(error){

      throw error;
    }

    return NextResponse.json({

      success:true,

      lead:data,
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
