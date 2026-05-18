// ======================================================
// app/api/stripe/get-payment-methods/route.ts
// FLOWBIZ PAYMENT METHODS
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
GET
====================================================== */

export async function GET(
  request:Request
){

  try{

    /*
    ====================================================
    URL PARAMS
    ====================================================
    */

    const {

      searchParams,

    } =

      new URL(
        request.url
      );

    const customerId =

      searchParams.get(
        "customerId"
      );

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
    GET METHODS
    ====================================================
    */

    const methods =

      await stripe
        .paymentMethods
        .list({

          customer:
            customerId,

          type:"card",
        });

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      methods:
        methods.data,
    });

  }catch(error:any){

    console.log(
      "GET METHODS ERROR:",
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
