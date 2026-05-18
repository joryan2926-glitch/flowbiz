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
      name,
      email,
      phone,
      metadata,
    } = body;

    if(!email){

      return NextResponse.json(
        {
          error:
            "Email requis",
        },
        {
          status:400,
        }
      );
    }

    const customer =
      await stripe.customers.create({

        name,

        email,

        phone,

        metadata:
          metadata || {},
      });

    return NextResponse.json({

      success:true,

      customerId:
        customer.id,

      customer,
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
