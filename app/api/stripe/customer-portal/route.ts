// ======================================================
// app/api/stripe/customer-portal/route.ts
// FLOWBIZ STRIPE PORTAL
// FINAL FIXED VERSION
// ======================================================

import Stripe from "stripe";

import {
  NextResponse,
} from "next/server";

/* ======================================================
STRIPE
====================================================== */

const stripe =
  new Stripe(

    process.env
      .STRIPE_SECRET_KEY!
  );

/* ======================================================
POST
====================================================== */

export async function POST(
  request:Request
){

  try{

    /*
    ====================================================
    BODY
    ====================================================
    */

    const body =
      await request.json();

    const {
      customerId,
    } = body;

    /*
    ====================================================
    VALIDATION
    ====================================================
    */

    if(!customerId){

      return NextResponse.json(

        {
          error:
            "Customer ID manquant",
        },

        {
          status:400,
        }
      );
    }

    /*
    ====================================================
    CREATE BILLING PORTAL
    ====================================================
    */

    const session =

      await stripe
        .billingPortal
        .sessions
        .create({

          customer:
            customerId,

          return_url:

            process.env
              .NEXT_PUBLIC_APP_URL ||

            "http://localhost:3000/dashboard/billing",
        });

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      success:true,

      url:
        session.url,
    });

  }catch(error:any){

    console.log(
      "STRIPE PORTAL ERROR:",
      error
    );

    return NextResponse.json(

      {
        error:
          error.message,
      },

      {
        status:500,
      }
    );
  }
}
