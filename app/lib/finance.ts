import { supabase } from "@/app/lib/supabase";


export async function getFinanceAnalytics() {


  try {


    /*
    ========================================
    INVOICES
    ========================================
    */


    const {
      data: invoices,
      error: invoicesError,
    } = await supabase


      .from("invoices")


      .select("*");


    if (invoicesError) {
      throw invoicesError;
    }


    /*
    ========================================
    EXPENSES
    ========================================
    */


    const {
      data: expenses,
      error: expensesError,
    } = await supabase


      .from("expenses")


      .select("*");


    if (expensesError) {
      throw expensesError;
    }


    /*
    ========================================
    SUBSCRIPTIONS
    ========================================
    */


    const {
      data: subscriptions,
      error: subscriptionsError,
    } = await supabase


      .from("subscriptions")


      .select("*");


    if (subscriptionsError) {
      throw subscriptionsError;
    }


    /*
    ========================================
    FAILED PAYMENTS
    ========================================
    */


    const {
      data: failedPayments,
      error: failedError,
    } = await supabase


      .from("failed_payments")


      .select("*");


    if (failedError) {
      throw failedError;
    }


    /*
    ========================================
    REVENUE
    ========================================
    */


    const revenue =


      invoices
        ?.filter(
          (invoice) =>
            invoice.payment_status === "paid"
        )


        .reduce(
          (acc, invoice) =>
            acc + Number(invoice.total || 0),
          0
        ) || 0;


    /*
    ========================================
    EXPENSES TOTAL
    ========================================
    */


    const expensesTotal =


      expenses?.reduce(
        (acc, expense) =>
          acc + Number(expense.amount || 0),
        0
      ) || 0;


    /*
    ========================================
    VAT
    ========================================
    */


    const collectedVat =


      invoices?.reduce(
        (acc, invoice) =>
          acc + Number(invoice.tax || 0),
        0
      ) || 0;


    const deductibleVat =


      expenses?.reduce(
        (acc, expense) =>
          acc + Number(expense.vat || 0),
        0
      ) || 0;


    const vatDue =
      collectedVat - deductibleVat;


    /*
    ========================================
    CASHFLOW
    ========================================
    */


    const cashflow =
      revenue - expensesTotal;


    /*
    ========================================
    MRR
    ========================================
    */


    const activeSubscriptions =


      subscriptions?.filter(
        (subscription) =>
          subscription.status === "active"
      ) || [];


    const mrr =
      activeSubscriptions.length * 49;


    /*
    ========================================
    CHURN
    ========================================
    */


    const canceledSubscriptions =


      subscriptions?.filter(
        (subscription) =>
          subscription.status === "canceled"
      ) || [];


    const churnRate =


      subscriptions?.length


        ? Math.round(
            (
              canceledSubscriptions.length /
              subscriptions.length
            ) * 100
          )


        : 0;


    /*
    ========================================
    MONTHLY REVENUE
    ========================================
    */


    const monthlyRevenueMap:
      Record<string, number> = {};


    invoices?.forEach((invoice) => {


      if (
        invoice.payment_status === "paid"
      ) {


        const month =
          new Date(
            invoice.created_at
          ).toLocaleString(
            "fr-FR",
            {
              month: "short",
            }
          );


        monthlyRevenueMap[month] =


          (monthlyRevenueMap[month] || 0)


          +


          Number(invoice.total || 0);
      }
    });


    const monthlyRevenue =


      Object.entries(
        monthlyRevenueMap
      ).map(([month, total]) => ({
        month,
        total,
      }));


    /*
    ========================================
    RETURN
    ========================================
    */


    return {


      revenue,


      expensesTotal,


      collectedVat,


      deductibleVat,


      vatDue,


      cashflow,


      mrr,


      churnRate,


      activeSubscriptions:
        activeSubscriptions.length,


      failedPayments:
        failedPayments?.length || 0,


      monthlyRevenue,
    };


  } catch (error) {


    console.log(error);


    return null;
  }
}
