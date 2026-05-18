import Stripe from "stripe";

import {
  NextResponse,
} from "next/server";

import {
  createClient,
} from "@supabase/supabase-js";

/* ======================================================
STRIPE
====================================================== */

const stripe =
  new Stripe(

    process.env
      .STRIPE_SECRET_KEY!
  );

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

      userId,

      email,

      name,

    } = body;

    /*
    ====================================================
    CREATE CUSTOMER
    ====================================================
    */

    const customer =

      await stripe
        .customers
        .create({

          email,

          name,
        });

    /*
    ====================================================
    UPDATE PROFILE
    ====================================================
    */

    await supabase

      .from(
        "profiles"
      )

      .upsert({

        id:userId,

        email,

        full_name:name,

        stripe_customer_id:
          customer.id,
      });

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      success:true,

      customerId:
        customer.id,
    });

  }catch(error:any){

    console.log(error);

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
