// ======================================================
// lib/dashboard-data.ts
// FLOWBIZ CENTRAL DATA ENGINE
// FINAL VERSION
// ======================================================


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
HELPERS
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
MAIN FUNCTION
====================================================== */


export async function getDashboardData(){


  try{


    /* ==================================================
    SUPABASE
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


    const activityResponse =
      await supabase


        .from("activity")


        .select("*")


        .order(
          "created_at",
          {
            ascending:false,
          }
        )


        .limit(20);


    const failedPaymentsResponse =
      await supabase


        .from("failed_payments")


        .select("*");


    /* ==================================================
    SAFE ARRAYS
    ================================================== */


    const invoices:any[] =
      invoicesResponse.data || [];


    const expenses:any[] =
      expensesResponse.data || [];


    const clients:any[] =
      clientsResponse.data || [];


    const subscriptions:any[] =
      subscriptionsResponse.data || [];


    const notifications:any[] =
      notificationsResponse.data || [];


    const activities:any[] =
      activityResponse.data || [];


    const failedPayments:any[] =
      failedPaymentsResponse.data || [];


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
      stripeInvoicesResponse.data || [];


    const stripeSubscriptions =
      stripeSubscriptionsResponse.data || [];


    /* ==================================================
    REVENUE
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


    /* ==================================================
    PAID REVENUE
    ================================================== */


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


    /* ==================================================
    EXPENSES
    ================================================== */


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


    /* ==================================================
    CASHFLOW
    ================================================== */


    const cashflow =
      paidRevenue -
      expensesTotal;


    /* ==================================================
    CLIENTS
    ================================================== */


    const clientsCount =
      clients.length;


    /* ==================================================
    ACTIVE SUBSCRIPTIONS
    ================================================== */


    const activeSubscriptions =


      subscriptions.filter(
        (subscription:any)=>


          subscription.status ===
          "active"
      ).length;


    /* ==================================================
    MRR
    ================================================== */


    const mrr =


      stripeSubscriptions.reduce(
        (
          acc:number,
          subscription:any
        )=>{


          const item =
            subscription.items
              ?.data?.[0];


          const amount =
            item?.price
              ?.unit_amount || 0;


          return(
            acc +
            (amount / 100)
          );


        },


        0
      );


    /* ==================================================
    ARR
    ================================================== */


    const arr =
      mrr * 12;


    /* ==================================================
    VAT
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
    CHURN RATE
    ================================================== */


    const canceledSubscriptions =


      subscriptions.filter(
        (subscription:any)=>


          subscription.status ===
          "canceled"
      ).length;


    const churnRate =


      activeSubscriptions > 0


      ? (
          canceledSubscriptions /
          activeSubscriptions
        ) * 100


      : 0;


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
    MONTHLY CASHFLOW
    ================================================== */


    const monthlyCashflow =


      monthlyRevenue.map(
        (
          month:any,
          index:number
        )=>({


          month:
            month.month,


          cashflow:
            month.revenue -
            (
              monthlyExpenses[index]
                ?.expenses || 0
            ),
        })
      );


    /* ==================================================
    RECENT INVOICES
    ================================================== */


    const recentInvoices =


      [...invoices]


        .sort(
          (
            a:any,
            b:any
          )=>


            new Date(
              b.created_at
            ).getTime()


            -


            new Date(
              a.created_at
            ).getTime()
        )


        .slice(0,10);


    /* ==================================================
    RECENT CLIENTS
    ================================================== */


    const recentClients =


      [...clients]


        .sort(
          (
            a:any,
            b:any
          )=>


            new Date(
              b.created_at
            ).getTime()


            -


            new Date(
              a.created_at
            ).getTime()
        )


        .slice(0,10);


    /* ==================================================
    ALERTS
    ================================================== */


    const alerts:any[] = [];


    if(failedPayments.length > 0){


      alerts.push({


        type:"payment",


        message:
          `${failedPayments.length} paiement(s) échoué(s)`,
      });
    }


    if(vatToPay > 10000){


      alerts.push({


        type:"finance",


        message:
          "TVA importante à payer",
      });
    }


    if(churnRate > 20){


      alerts.push({


        type:"subscription",


        message:
          "Churn élevé détecté",
      });
    }


    /* ==================================================
    RETURN
    ================================================== */


    return{


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


        churnRate,


        stripeInvoices:
          stripeInvoices.length,


        notificationsCount:
          notifications.length,
      },


      charts:{


        monthlyRevenue,
        monthlyExpenses,
        monthlyCashflow,
      },


      latest:{


        recentInvoices,
        recentClients,
        activities,
      },


      stripe:{


        invoices:
          stripeInvoices,


        subscriptions:
          stripeSubscriptions,
      },


      alerts,
    };


  }catch(error:any){


    console.log(
      "DASHBOARD DATA ERROR:",
      error
    );


    return{


      success:false,


      error:error.message,
    };
  }
}
