// ======================================================
// app/api/ai/business-insights/route.ts
// FLOWBIZ AI ENGINE
// ======================================================

import {
  NextResponse,
} from "next/server";

import Stripe from "stripe";

export const runtime =
  "nodejs";

const stripe = new Stripe(
  process.env
    .STRIPE_SECRET_KEY!
);

export async function GET(){

  try{

    const subscriptions =
      await stripe.subscriptions.list({

        limit:100,

        status:"all",
      });

    const invoices =
      await stripe.invoices.list({

        limit:100,
      });

    /*
    ====================================================
    METRICS
    ====================================================
    */

    let active = 0;

    let canceled = 0;

    let revenue = 0;

    for(
      const sub
      of subscriptions.data
    ){

      if(
        sub.status ===
        "active"
      ){

        active++;
      }

      if(
        sub.status ===
        "canceled"
      ){

        canceled++;
      }
    }

    for(
      const invoice
      of invoices.data
    ){

      revenue +=
        invoice.amount_paid || 0;
    }

    /*
    ====================================================
    AI
    ====================================================
    */

    const churnRisk =

      canceled > 5

        ? "Élevé"

        : "Faible";

    const revenueForecast =

      Math.round(
        (revenue / 100) * 1.18
      );

    const recommendation =

      active > 10

        ? "Proposer upgrade Premium"

        : "Optimiser onboarding";

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      success:true,

      insights:[

        {
          title:
            "Prévision revenus",

          value:
            `${revenueForecast}€`,
        },

        {
          title:
            "Risque churn",

          value:
            churnRisk,
        },

        {
          title:
            "Recommandation IA",

          value:
            recommendation,
        },

        {
          title:
            "Clients VIP détectés",

          value:
            active > 20
              ? "Oui"
              : "Non",
        },
      ],
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
