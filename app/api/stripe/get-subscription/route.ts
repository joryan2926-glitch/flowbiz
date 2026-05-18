// ======================================================
// app/api/stripe/get-subscription/route.ts
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

    const subscriptions =
      await stripe.subscriptions.list({

        customer:
          customerId,

        limit:1,

        status:"all",
      });

    return NextResponse.json({

      subscription:
        subscriptions.data[0] || null,
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
