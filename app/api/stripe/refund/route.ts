// ======================================================
// app/api/stripe/refund/route.ts
// FLOWBIZ STRIPE REFUND API
// ======================================================

import { NextResponse } from "next/server";

import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

export async function POST(
  request: Request
){

  try{

    const {
      paymentIntentId,
      amount,
      reason,
    } = await request.json();

    /*
    ====================================================
    VALIDATION
    ====================================================
    */

    if(!paymentIntentId){

      return NextResponse.json(
        {
          error:
            "paymentIntentId requis",
        },
        {
          status:400,
        }
      );
    }

    /*
    ====================================================
    CREATE REFUND
    ====================================================
    */

    const refund =
      await stripe.refunds.create({

        payment_intent:
          paymentIntentId,

        amount:
          amount
            ? Math.round(
                amount * 100
              )
            : undefined,

        reason:
          reason ||
          "requested_by_customer",
      });

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      success:true,

      refund,
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
