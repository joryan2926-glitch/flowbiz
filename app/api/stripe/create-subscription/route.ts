import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

export async function POST(
  request: Request
){

  try{

    const body =
      await request.json();

    const {
      customerId,
      priceId,
    } = body;

    const subscription =
      await stripe.subscriptions.create({

        customer: customerId,

        items:[
          {
            price: priceId,
          },
        ],

        payment_behavior:
          "default_incomplete",

        payment_settings:{
          save_default_payment_method:
            "on_subscription",
        },

        expand:[
          "latest_invoice.payment_intent",
        ],
      });

    const latestInvoice =
      subscription.latest_invoice as any;

    const paymentIntent =
      latestInvoice.payment_intent;

    return NextResponse.json({

      subscriptionId:
        subscription.id,

      clientSecret:
        paymentIntent.client_secret,
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
