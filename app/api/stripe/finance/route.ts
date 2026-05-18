// ======================================================
// app/api/stripe/finance/route.ts
// ======================================================


import {
  NextResponse,
} from "next/server";


import { stripe }
from "@/app/lib/stripe";


/* ======================================================
GET
====================================================== */


export async function GET(){


  try{


    /*
    ======================================================
    SUBSCRIPTIONS
    ======================================================
    */


    const subscriptions =


      await stripe.subscriptions.list({


        limit:100,
        status:"active",
      });


    /*
    ======================================================
    PAYMENT INTENTS
    ======================================================
    */


    const payments =


      await stripe.paymentIntents.list({


        limit:100,
      });


    /*
    ======================================================
    INVOICES
    ======================================================
    */


    const invoices =


      await stripe.invoices.list({


        limit:100,
      });


    /*
    ======================================================
    MRR
    ======================================================
    */


    const mrr =


      subscriptions.data.reduce(
        (acc,subscription)=>{


          const item =


            subscription.items
              .data[0];


          return(


            acc +


            (
              item?.price
                ?.unit_amount || 0
            ) / 100
          );
        },


        0
      );


    /*
    ======================================================
    MONTHLY REVENUE
    ======================================================
    */


    const monthlyRevenue =


      invoices.data.reduce(
        (acc,invoice)=>{


          return(


            acc +


            (
              invoice.amount_paid || 0
            ) / 100
          );
        },


        0
      );


    /*
    ======================================================
    FAILED PAYMENTS
    ======================================================
    */


    const failedPayments =


      payments.data.filter(
        (payment)=>


          payment.status ===
          "canceled"
      ).length;


    /*
    ======================================================
    SUCCESS PAYMENTS
    ======================================================
    */


    const successPayments =


      payments.data.filter(
        (payment)=>


          payment.status ===
          "succeeded"
      ).length;


    /*
    ======================================================
    CHURN
    ======================================================
    */


    const churnRate =


      subscriptions.data.length > 0


        ? Math.round(


            (
              failedPayments /


              subscriptions.data.length
            ) * 100
          )


        : 0;


    /*
    ======================================================
    RETURN
    ======================================================
    */


    return NextResponse.json({


      monthlyRevenue:
        Math.round(monthlyRevenue),


      mrr:
        Math.round(mrr),


      activeSubscriptions:
        subscriptions.data.length,


      failedPayments,


      totalPayments:
        successPayments,


      churnRate,
    });


  }catch(error:any){


    console.log(error);


    return NextResponse.json({


      error:error.message,
    },{
      status:500,
    });
  }
}
