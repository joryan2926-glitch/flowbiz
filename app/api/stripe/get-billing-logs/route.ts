// ======================================================
// app/api/stripe/get-billing-logs/route.ts
// ======================================================

import { NextResponse } from "next/server";

import { supabaseAdmin }
from "@/app/lib/supabaseAdmin";

export async function POST(
  request: Request
){

  try{

    const {
      customerId,
    } = await request.json();

    if(!customerId){

      return NextResponse.json(
        {
          error:
            "customerId requis",
        },
        {
          status:400,
        }
      );
    }

    const {
      data,
      error,
    } = await supabaseAdmin

      .from("billing_logs")

      .select("*")

      .eq(
        "customer_id",
        customerId
      )

      .order(
        "created_at",
        {
          ascending:false,
        }
      )

      .limit(30);

    if(error){

      return NextResponse.json(
        {
          error:error.message,
        },
        {
          status:500,
        }
      );
    }

    return NextResponse.json({

      logs:data || [],
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
