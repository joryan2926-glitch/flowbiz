import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const amount = Math.round(Number(body.amount) * 100);
    const factureId = String(body.factureId || "");
    const invoiceNumber = body.invoiceNumber || "Facture FlowBiz";

    if (!amount || amount <= 0 || !factureId) {
      return NextResponse.json(
        { error: "Montant ou facture invalide." },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      metadata: {
        factureId,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: amount,
            product_data: {
              name: invoiceNumber,
              description: "Paiement facture FlowBiz",
            },
          },
        },
      ],
      success_url: `${appUrl}/factures?success=true`,
      cancel_url: `${appUrl}/factures?cancel=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur Stripe." },
      { status: 500 }
    );
  }
}
