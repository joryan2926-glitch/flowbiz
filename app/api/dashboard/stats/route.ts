import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


export async function GET() {
  try {
    const { data: invoices, error: invoicesError } =
      await supabase
        .from("invoices")
        .select("*");


    const { data: clients, error: clientsError } =
      await supabase
        .from("clients")
        .select("*");


    if (invoicesError) {
      throw invoicesError;
    }


    if (clientsError) {
      throw clientsError;
    }


    const revenueMap: Record<string, number> = {};
    const clientsMap: Record<string, number> = {};


    invoices?.forEach((invoice: any) => {
      if (!invoice.created_at) return;


      const date = new Date(invoice.created_at);


      const month = date.toLocaleString("fr-FR", {
        month: "short",
      });


      if (!revenueMap[month]) {
        revenueMap[month] = 0;
      }


      revenueMap[month] += Number(
        invoice.total || 0
      );
    });


    clients?.forEach((client: any) => {
      if (!client.created_at) return;


      const date = new Date(client.created_at);


      const month = date.toLocaleString("fr-FR", {
        month: "short",
      });


      if (!clientsMap[month]) {
        clientsMap[month] = 0;
      }


      clientsMap[month] += 1;
    });


    const monthlyRevenue = Object.entries(
      revenueMap
    ).map(([month, revenue]) => ({
      month,
      revenue,
    }));


    const monthlyClients = Object.entries(
      clientsMap
    ).map(([month, clients]) => ({
      month,
      clients,
    }));


    return NextResponse.json({
      success: true,
      charts: {
        monthlyRevenue,
        monthlyClients,
      },
    });
  } catch (error: any) {
    console.log(
      "DASHBOARD STATS ERROR:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Erreur dashboard stats",
      },
      {
        status: 500,
      }
    );
  }
}
