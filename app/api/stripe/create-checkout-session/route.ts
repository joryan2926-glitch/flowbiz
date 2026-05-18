import { NextResponse } from "next/server";

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

    const {

      customerId,

      lineItems,

      mode,

      successUrl,

      cancelUrl,

      metadata,

    } = body;

    if(
      !lineItems ||
      lineItems.length === 0
    ){

      return NextResponse.json(
        {
          error:
            "Aucun produit",
        },
        {
          status:400,
        }
      );
    }

    const session =
      await stripe.checkout.sessions.create({

        customer:
          customerId,

        payment_method_types:[
          "card",
        ],

        mode:
          mode ||
          "payment",

        line_items:
          lineItems,

        success_url:
          successUrl ||

          `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,

        cancel_url:
          cancelUrl ||

          `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?cancel=true`,

        metadata:
          metadata || {},

        billing_address_collection:
          "required",

        automatic_tax:{
          enabled:true,
        },

        allow_promotion_codes:true,
      });

    return NextResponse.json({

      success:true,

      url:
        session.url,

      sessionId:
        session.id,
    });

  }catch(error:any){

    console.log(error);

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
