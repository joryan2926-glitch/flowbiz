// ======================================================
// app/api/stripe/invoices/route.ts
// REAL STRIPE INVOICES
// ======================================================

import Stripe from "stripe";

import {
  NextResponse,
} from "next/server";

export const runtime =
  "nodejs";

/* ======================================================
STRIPE
====================================================== */

const stripe = new Stripe(
  process.env
    .STRIPE_SECRET_KEY!
);

/* ======================================================
GET
====================================================== */

export async function GET(){

  try{

    /*
    ====================================================
    STRIPE INVOICES
    ====================================================
    */

    const invoices =
      await stripe.invoices.list({

        limit:100,
      });

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      success:true,

      invoices:
        invoices.data,
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
