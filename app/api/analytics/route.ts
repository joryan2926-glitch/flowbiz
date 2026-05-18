// ======================================================
// app/api/analytics/route.ts
// FLOWBIZ ANALYTICS API
// SIMPLE STABLE VERSION
// ======================================================


import { NextResponse } from "next/server";


import { createClient }
from "@supabase/supabase-js";


import Stripe from "stripe";


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
STRIPE
====================================================== */


const stripe =
  new Stripe(
    process.env
      .STRIPE_SECRET_KEY!
  );


/* ======================================================
HELPER
====================================================== */


function monthLabel(
  month:number
){


  const months = [


    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",


    "Juil",
    "Août",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];


  return months[month];
}


/* ======================================================
GET
====================================================== */


export async function GET(){


  try{


    /* ==================================================
    DATABASE
    ================================================== */


    const invoicesResponse =
      await supabase
        .from("invoices")
        .select("*");


    const expensesResponse =
      await supabase
        .from("expenses")
        .select("*");


    const clientsResponse =
      await supabase
        .from("clients")
        .select("*");


    const subscriptionsResponse =
      await supabase
        .from("subscriptions")
        .select("*");


    const notificationsResponse =
      await supabase
        .from("notifications")
        .select("*");


    /* ==================================================
    SAFE ARRAYS
    ================================================== */


    const invoices =
      invoicesResponse.data || [];


    const expenses =
      expensesResponse.data || [];


    const clients =
      clientsResponse.data || [];


    const subscriptions =
      subscriptionsResponse.data || [];


    const notificationsData =
      notificationsResponse.data || [];


    /* ==================================================
    STRIPE
    ================================================== */


    const stripeInvoicesResponse =
      await stripe.invoices.list({
        limit:100,
      });


    const stripeSubscriptionsResponse =
      await stripe.subscriptions.list({
        limit:100,
      });


    const stripeInvoices =
      stripeInvoicesResponse.data;


    const stripeSubscriptions =
      stripeSubscriptionsResponse.data;


    /* ==================================================
    KPI
    ================================================== */


    const revenue =


      invoices.reduce(
        (
          acc:number,
          invoice:any
        )=>


          acc +
          Number(
            invoice.total || 0
          ),


        0
      );


    const paidRevenue =


      invoices


        .filter(
          (invoice:any)=>


            invoice.payment_status ===
            "paid"
        )


        .reduce(
          (
            acc:number,
            invoice:any
          )=>


            acc +
            Number(
              invoice.total || 0
            ),


          0
        );


    const expensesTotal =


      expenses.reduce(
        (
          acc:number,
          expense:any
        )=>


          acc +
          Number(
            expense.amount || 0
          ),


        0
      );


    const cashflow =
      paidRevenue -
      expensesTotal;


    const clientsCount =
      clients.length;


    const activeSubscriptions =


      subscriptions.filter(
        (subscription:any)=>


          subscription.status ===
          "active"
      ).length;


    /* ==================================================
    STRIPE MRR
    ================================================== */


    const mrr =


      stripeSubscriptions.reduce(
        (
          acc:number,
          subscription:any
        )=>{


          const amount =


            subscription.items
              ?.data?.[0]
              ?.price
              ?.unit_amount || 0;


          return(
            acc +
            amount / 100
          );


        },


        0
      );


    const arr =
      mrr * 12;


    /* ==================================================
    TVA
    ================================================== */


    const vatCollected =


      invoices.reduce(
        (
          acc:number,
          invoice:any
        )=>


          acc +
          Number(
            invoice.tax || 0
          ),


        0
      );


    const vatDeductible =


      expenses.reduce(
        (
          acc:number,
          expense:any
        )=>


          acc +
          Number(
            expense.vat || 0
          ),


        0
      );


    const vatToPay =
      vatCollected -
      vatDeductible;


    /* ==================================================
    MONTHLY REVENUE
    ================================================== */


    const monthlyRevenue =


      Array.from(
        { length:12 },


        (_,index)=>{


          const total =


            invoices


              .filter(
                (invoice:any)=>{


                  const date =
                    new Date(
                      invoice.created_at
                    );


                  return(
                    date.getMonth()
                    === index
                  );
                }
              )


              .reduce(
                (
                  acc:number,
                  invoice:any
                )=>


                  acc +
                  Number(
                    invoice.total || 0
                  ),


                0
              );


          return{


            month:
              monthLabel(index),


            revenue:
              total,
          };
        }
      );


    /* ==================================================
    MONTHLY EXPENSES
    ================================================== */


    const monthlyExpenses =


      Array.from(
        { length:12 },


        (_,index)=>{


          const total =


            expenses


              .filter(
                (expense:any)=>{


                  const date =
                    new Date(
                      expense.created_at
                    );


                  return(
                    date.getMonth()
                    === index
                  );
                }
              )


              .reduce(
                (
                  acc:number,
                  expense:any
                )=>


                  acc +
                  Number(
                    expense.amount || 0
                  ),


                0
              );


          return{


            month:
              monthLabel(index),


            expenses:
              total,
          };
        }
      );


    /* ==================================================
    ALERTS
    ================================================== */


    const unpaidInvoices =


      invoices.filter(
        (invoice:any)=>


          invoice.payment_status !==
          "paid"
      );


    const alerts:any[] = [];


    if(unpaidInvoices.length > 0){


      alerts.push({


        type:"warning",


        message:
          `${unpaidInvoices.length} facture(s) impayée(s)`,
      });
    }


    /* ==================================================
    RETURN
    ================================================== */


    return NextResponse.json({


      success:true,


      kpis:{


        revenue,
        paidRevenue,
        expensesTotal,
        cashflow,


        mrr,
        arr,


        clientsCount,
        activeSubscriptions,


        vatCollected,
        vatDeductible,
        vatToPay,


        stripeInvoices:
          stripeInvoices.length,


        notificationsCount:
          notificationsData.length,
      },


      charts:{


        monthlyRevenue,
        monthlyExpenses,
      },


      alerts,
    });


  }catch(error:any){


    console.log(
      "ANALYTICS ERROR:",
      error
    );


    return NextResponse.json(


      {
        success:false,
        error:error.message,
      },


      {
        status:500,
      }
    );
  }
}
