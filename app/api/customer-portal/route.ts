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

    const body =
      await request.json();

    const {

      customerId,

    } = body;

    /*
    ====================================================
    PORTAL SESSION
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

            "http://localhost:3000/dashboard/billing",
        });

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      url:
        session.url,
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
