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

      subscriptionId,

      newPriceId,

      prorate,

    } = body;

    /*
    ====================================================
    GET SUBSCRIPTION
    ====================================================
    */

    const subscription =

      await stripe
        .subscriptions
        .retrieve(
          subscriptionId
        );

    /*
    ====================================================
    UPDATE SUBSCRIPTION
    ====================================================
    */

    const updatedSubscription =

      await stripe
        .subscriptions
        .update(

          subscriptionId,

          {

            items:[

              {

                id:

                  subscription
                    .items
                    .data[0]
                    .id,

                price:
                  newPriceId,
              },
            ],

            proration_behavior:

              prorate

              ? "create_prorations"

              : "none",
          }
        );

    return NextResponse.json({

      success:true,

      subscription:
        updatedSubscription,
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
