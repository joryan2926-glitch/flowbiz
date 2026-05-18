// ======================================================
// app/api/stripe/payment-methods/route.ts
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

    const paymentMethods =
      await stripe.paymentMethods.list({

        customer:
          customerId,

        type:"card",
      });

    return NextResponse.json({

      paymentMethods:
        paymentMethods.data,
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
