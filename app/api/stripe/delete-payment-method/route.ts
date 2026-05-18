// ======================================================
// app/api/stripe/delete-payment-method/route.ts
// FLOWBIZ DELETE PAYMENT METHOD
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
      paymentMethodId,
    } = body;

    /*
    ====================================================
    VALIDATION
    ====================================================
    */

    if(!paymentMethodId){

      return NextResponse.json(

        {
          error:
            "Payment Method ID manquant",
        },

        {
          status:400,
        }
      );
    }

    /*
    ====================================================
    DETACH
    ====================================================
    */

    await stripe
      .paymentMethods
      .detach(
        paymentMethodId
      );

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      success:true,
    });

  }catch(error:any){

    console.log(
      "DELETE METHOD ERROR:",
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
