// ======================================================
// app/api/stripe/webhook/route.ts
// FLOWBIZ STRIPE WEBHOOK
// SIMPLE STABLE VERSION
// ======================================================


import Stripe from "stripe";


import {
  headers,
} from "next/headers";


import {
  NextResponse,
} from "next/server";


import {
  createClient,
} from "@supabase/supabase-js";


/* ======================================================
RUNTIME
====================================================== */


export const runtime =
  "nodejs";


export const dynamic =
  "force-dynamic";


/* ======================================================
STRIPE
====================================================== */


const stripe =
  new Stripe(
    process.env
      .STRIPE_SECRET_KEY!
  );


/* ======================================================
SUPABASE
====================================================== */


const supabase =
  createClient(


    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,


    process.env
      .SUPABASE_SERVICE_ROLE_KEY!
  );


/* ======================================================
POST
====================================================== */


export async function POST(
  request:Request
){


  try{


    /* =====================================================
    BODY
    ===================================================== */


    const body =
      await request.text();


    /* =====================================================
    HEADERS
    ===================================================== */


    const headersList =
      await headers();


    const signature =
      headersList.get(
        "stripe-signature"
      );


    if(!signature){


      return NextResponse.json(


        {
          error:
            "Missing signature",
        },


        {
          status:400,
        }
      );
    }


    /* =====================================================
    WEBHOOK SECRET
    ===================================================== */


    const webhookSecret =


      process.env
        .STRIPE_WEBHOOK_SECRET;


    if(!webhookSecret){


      return NextResponse.json(


        {
          error:
            "Missing webhook secret",
        },


        {
          status:500,
        }
      );
    }


    /* =====================================================
    EVENT
    ===================================================== */


    const event =


      stripe.webhooks.constructEvent(


        body,


        signature,


        webhookSecret
      );


    console.log(
      "Stripe webhook:",
      event.type
    );


    /* =====================================================
    EVENTS
    ===================================================== */


    switch(event.type){


      /* ==================================================
      PAYMENT SUCCESS
      ================================================== */


      case
      "invoice.payment_succeeded":{


        const invoice:any =
          event.data.object;


        const localInvoiceId =
          invoice.metadata
            ?.invoice_id;


        try{


          if(localInvoiceId){


            await supabase


              .from(
                "invoices"
              )


              .update({


                payment_status:
                  "paid",


                status:
                  "Payée",


                stripe_invoice_id:
                  invoice.id,


                stripe_payment_link:
                  invoice.hosted_invoice_url,


                pdf_url:
                  invoice.invoice_pdf,
              })


              .eq(
                "id",
                localInvoiceId
              );
          }


          await supabase


            .from(
              "notifications"
            )


            .insert({


              title:
                "Paiement reçu",


              message:
                "Facture Stripe payée.",


              type:
                "payment",
            });


        }catch(error){


          console.log(
            "Payment success error:",
            error
          );
        }


        break;
      }


      /* ==================================================
      PAYMENT FAILED
      ================================================== */


      case
      "invoice.payment_failed":{


        const invoice:any =
          event.data.object;


        const localInvoiceId =
          invoice.metadata
            ?.invoice_id;


        try{


          if(localInvoiceId){


            await supabase


              .from(
                "invoices"
              )


              .update({


                payment_status:
                  "failed",


                status:
                  "Échouée",
              })


              .eq(
                "id",
                localInvoiceId
              );
          }


          await supabase


            .from(
              "notifications"
            )


            .insert({


              title:
                "Paiement échoué",


              message:
                "Le paiement Stripe a échoué.",


              type:
                "alert",
            });


        }catch(error){


          console.log(
            "Payment failed error:",
            error
          );
        }


        break;
      }


      /* ==================================================
      SUB CREATED
      ================================================== */


      case
      "customer.subscription.created":{


        const subscription:any =
          event.data.object;


        try{


          await supabase


            .from(
              "subscriptions"
            )


            .upsert({


              stripe_subscription_id:
                subscription.id,


              customer_id:
                subscription.customer,


              status:
                subscription.status,
            });


        }catch(error){


          console.log(
            "Subscription create error:",
            error
          );
        }


        break;
      }


      /* ==================================================
      SUB UPDATED
      ================================================== */


      case
      "customer.subscription.updated":{


        const subscription:any =
          event.data.object;


        try{


          await supabase


            .from(
              "subscriptions"
            )


            .update({


              status:
                subscription.status,
            })


            .eq(


              "stripe_subscription_id",


              subscription.id
            );


        }catch(error){


          console.log(
            "Subscription update error:",
            error
          );
        }


        break;
      }


      /* ==================================================
      SUB DELETED
      ================================================== */


      case
      "customer.subscription.deleted":{


        const subscription:any =
          event.data.object;


        try{


          await supabase


            .from(
              "subscriptions"
            )


            .update({


              status:
                "canceled",
            })


            .eq(


              "stripe_subscription_id",


              subscription.id
            );


        }catch(error){


          console.log(
            "Subscription delete error:",
            error
          );
        }


        break;
      }


      /* ==================================================
      DEFAULT
      ================================================== */


      default:


        console.log(
          "Unhandled:",
          event.type
        );
    }


    /* =====================================================
    SUCCESS
    ===================================================== */


    return NextResponse.json({


      received:true,
    });


  }catch(error:any){


    console.log(
      "Webhook error:",
      error
    );


    return NextResponse.json(


      {
        error:
          error.message,
      },


      {
        status:400,
      }
    );
  }
}
