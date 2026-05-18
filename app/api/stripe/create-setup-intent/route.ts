// ======================================================
// app/api/stripe/create-setup-intent/route.ts
// FLOWBIZ CREATE SETUP INTENT
// FINAL VERSION
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
    CREATE SETUP INTENT
    ====================================================
    */

    const setupIntent =

      await stripe
        .setupIntents
        .create({

          customer:
            customerId,

          automatic_payment_methods:{
            enabled:true,
          },
        });

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      clientSecret:
        setupIntent.client_secret,
    });

  }catch(error:any){

    console.log(
      "SETUP INTENT ERROR:",
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
