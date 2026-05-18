// ======================================================
// app/api/stripe/webhook/route.ts
// FLOWBIZ STRIPE WEBHOOK FINAL
// ======================================================


import { headers } from "next/headers";


import { NextResponse } from "next/server";


import Stripe from "stripe";


import { stripe } from "@/app/lib/stripe";


import { createClient } from "@supabase/supabase-js";


// ======================================================
// SUPABASE ADMIN
// ======================================================


const supabaseAdmin = createClient(


  process.env.NEXT_PUBLIC_SUPABASE_URL!,


  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


// ======================================================
// WEBHOOK
// ======================================================


export async function POST(req: Request){


  const body = await req.text();


  const signature =
    (await headers()).get(
      "stripe-signature"
    );


  if(!signature){


    return NextResponse.json(
      {
        error:"No signature"
      },
      {
        status:400
      }
    );
  }


  let event:Stripe.Event;


  try{


    event =
      stripe.webhooks.constructEvent(


        body,


        signature,


        process.env
          .STRIPE_WEBHOOK_SECRET!
      );


  }catch(error){


    console.log(
      "Webhook Error:",
      error
    );


    return NextResponse.json(
      {
        error:"Webhook invalid"
      },
      {
        status:400
      }
    );
  }


  // ======================================================
  // CHECKOUT SUCCESS
  // ======================================================


  if(
    event.type ===
    "checkout.session.completed"
  ){


    const session =
      event.data.object as Stripe.Checkout.Session;


    const customerId =
      session.customer as string;


    const paymentIntent =
      session.payment_intent as string;


    const amount =
      session.amount_total
        ? session.amount_total / 100
        : 0;


    const email =
      session.customer_details?.email;


    // ============================================
    // FIND INVOICE
    // ============================================


    const {
      data:invoice,
    } = await supabaseAdmin


      .from("invoices")


      .select("*")


      .eq(
        "stripe_customer_id",
        customerId
      )


      .single();


    if(invoice){


      // ============================================
      // UPDATE INVOICE
      // ============================================


      await supabaseAdmin


        .from("invoices")


        .update({


          status:"Payée",


          payment_status:"paid",


          paid_at:
            new Date()
              .toISOString(),
        })


        .eq(
          "id",
          invoice.id
        );


      // ============================================
      // PAYMENT ENTRY
      // ============================================


      await supabaseAdmin


        .from("payments")


        .insert([{


          invoice_id:
            invoice.id,


          stripe_payment_intent:
            paymentIntent,


          amount,


          status:"paid",


          payment_method:"stripe",
        }]);


      // ============================================
      // CRM ACTIVITY
      // ============================================


      if(invoice.client_id){


        await supabaseAdmin


          .from(
            "client_activities"
          )


          .insert([{


            client_id:
              invoice.client_id,


            action:
              `Facture ${invoice.invoice_number} payée`,
          }]);
      }


      // ============================================
      // NOTIFICATION
      // ============================================


      await supabaseAdmin


        .from("notifications")


        .insert([{


          title:
            "Paiement reçu",


          message:
            `${invoice.client_name} a payé ${invoice.total}€`,
        }]);


      console.log(
        "Paiement enregistré"
      );
    }
  }


  // ======================================================
  // PAYMENT FAILED
  // ======================================================


  if(
    event.type ===
    "payment_intent.payment_failed"
  ){


    const paymentIntent =
      event.data.object as Stripe.PaymentIntent;


    await supabaseAdmin


      .from("notifications")


      .insert([{


        title:
          "Paiement échoué",


        message:
          `Paiement Stripe échoué (${paymentIntent.id})`,
      }]);


    console.log(
      "Paiement échoué"
    );
  }


  // ======================================================
  // SUBSCRIPTION CREATED
  // ======================================================


  if(
    event.type ===
    "customer.subscription.created"
  ){


    const subscription =
      event.data.object as Stripe.Subscription;


    const customerId =
      subscription.customer as string;


    await supabaseAdmin


      .from("subscriptions")


      .insert([{


        stripe_customer_id:
          customerId,


        stripe_subscription_id:
          subscription.id,


        plan:
          subscription.items.data[0]
            ?.price.nickname ||


          "Plan",


        status:
          subscription.status,


        amount:
          (
            subscription.items
              .data[0]
              ?.price.unit_amount || 0
          ) / 100,


        current_period_end:
          new Date(
            subscription.items.data[0]
              ?.current_period_end * 1000
          ).toISOString(),
      }]);


    console.log(
      "Subscription créée"
    );
  }


  // ======================================================
  // SUBSCRIPTION DELETED
  // ======================================================


  if(
    event.type ===
    "customer.subscription.deleted"
  ){


    const subscription =
      event.data.object as Stripe.Subscription;


    await supabaseAdmin


      .from("subscriptions")


      .update({


        status:"cancelled",
      })


      .eq(
        "stripe_subscription_id",
        subscription.id
      );


    console.log(
      "Subscription annulée"
    );
  }


  // ======================================================
  // INVOICE PAID
  // ======================================================


  if(
    event.type ===
    "invoice.paid"
  ){


    const invoiceStripe =
      event.data.object as Stripe.Invoice;


    console.log(
      "Invoice Stripe payée:",
      invoiceStripe.id
    );
  }


  // ======================================================
  // RESPONSE
  // ======================================================


  return NextResponse.json({


    received:true,
  });
}
