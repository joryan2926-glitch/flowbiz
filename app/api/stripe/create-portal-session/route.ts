import { NextResponse }
from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

export async function POST(
  request:Request
){

  try{

    const body =
      await request.json();

    const session =
      await stripe.billingPortal.sessions.create({

        customer:
          body.customerId,

        return_url:
          "http://localhost:3000/dashboard/billing",
      });

    return NextResponse.json({
      url:session.url,
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
