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

      paymentMethodId,

    } = body;

    /*
    ====================================================
    UPDATE CUSTOMER
    ====================================================
    */

    await stripe
      .customers
      .update(

        customerId,

        {

          invoice_settings:{

            default_payment_method:
              paymentMethodId,
          },
        }
      );

    return NextResponse.json({

      success:true,
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
