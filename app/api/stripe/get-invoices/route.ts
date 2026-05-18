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
GET
====================================================== */

export async function GET(
  request:Request
){

  try{

    /*
    ====================================================
    URL PARAMS
    ====================================================
    */

    const {

      searchParams,

    } =

      new URL(
        request.url
      );

    const customerId =

      searchParams.get(
        "customerId"
      );

    /*
    ====================================================
    VALIDATION
    ====================================================
    */

    if(!customerId){

      return NextResponse.json(

        {
          error:
            "Customer ID manquant",
        },

        {
          status:400,
        }
      );
    }

    /*
    ====================================================
    GET INVOICES
    ====================================================
    */

    const invoices =

      await stripe
        .invoices
        .list({

          customer:
            customerId,

          limit:20,
        });

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      invoices:
        invoices.data,
    });

  }catch(error:any){

    console.log(
      "GET INVOICES ERROR:",
      error
    );

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
