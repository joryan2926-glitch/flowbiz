// ======================================================
// app/api/stripe/cancel-subscription/route.ts
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
      subscriptionId,
      cancelAtPeriodEnd,
    } = await request.json();

    if(!subscriptionId){

      return NextResponse.json(
        {
          error:
            "subscriptionId requis",
        },
        {
          status:400,
        }
      );
    }

    const canceledSubscription =

      await stripe.subscriptions.update(

        subscriptionId,

        {
          cancel_at_period_end:
            cancelAtPeriodEnd ?? true,
        }
      );

    return NextResponse.json({

      success:true,

      subscription:
        canceledSubscription,
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
