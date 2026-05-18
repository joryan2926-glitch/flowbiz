/* =========================================================
FILE
app/api/stripe/create-invoice/route.ts
VERSION SIMPLE ET STABLE
========================================================= */


import { NextResponse }
from "next/server";


import Stripe
from "stripe";


/* =========================================================
STRIPE
========================================================= */


const stripe =
  new Stripe(
    process.env.STRIPE_SECRET_KEY as string
  );


/* =========================================================
POST
========================================================= */


export async function POST(
  request:Request
){


  try{


    const body =
      await request.json();


    const {
      client_name,
      email,
      total,
      invoice_id,
    } = body;


    /* =====================================================
    VALIDATION
    ===================================================== */


    if(
      !email ||
      !total
    ){


      return NextResponse.json(
        {
          error:
            "Informations manquantes",
        },
        {
          status:400,
        }
      );
    }


    /* =====================================================
    CUSTOMER
    ===================================================== */


    const customer =
      await stripe.customers.create({


        name:
          client_name,


        email,
      });


    /* =====================================================
    PRODUCT
    ===================================================== */


    const product =
      await stripe.products.create({


        name:
          `Facture ${invoice_id}`,
    });


    /* =====================================================
    PRICE
    ===================================================== */


    const price =
      await stripe.prices.create({


        product:
          product.id,


        unit_amount:
          Math.round(
            total * 100
          ),


        currency:"eur",
    });


    /* =====================================================
    PAYMENT LINK
    ===================================================== */


    const paymentLink =
      await stripe.paymentLinks.create({


        line_items:[
          {
            price:
              price.id,


            quantity:1,
          }
        ],


        customer_creation:
          "always",


        metadata:{
          invoice_id,
        },
    });


    /* =====================================================
    RESPONSE
    ===================================================== */


    return NextResponse.json({


      success:true,


      customerId:
        customer.id,


      hostedInvoiceUrl:
        paymentLink.url,


      invoiceId:
        invoice_id,
    });


  }catch(error){


    console.log(error);


    return NextResponse.json(
      {
        error:
          "Erreur Stripe",
      },
      {
        status:500,
      }
    );
  }
}
