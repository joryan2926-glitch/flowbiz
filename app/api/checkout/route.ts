import { NextResponse } from "next/server";
import { stripe } from "../../lib/stripe";

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();

    let priceId = "";

    switch (plan) {
      case "essentiel":
        priceId = process.env.STRIPE_PRICE_ESSENTIEL!;
        break;

      case "premium":
        priceId = process.env.STRIPE_PRICE_PREMIUM!;
        break;

      case "pro":
        priceId = process.env.STRIPE_PRICE_PRO!;
        break;

      default:
        return NextResponse.json(
          { error: "Plan invalide" },
          { status: 400 }
        );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      payment_method_types: ["card"],

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Erreur Stripe" },
      { status: 500 }
    );
  }
}
