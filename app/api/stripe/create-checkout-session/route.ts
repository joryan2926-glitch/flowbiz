import Stripe from "stripe";
import { NextResponse } from "next/server";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY manquante");
}

const stripe = new Stripe(secretKey);

export async function POST(req: Request) {
  try {
    } catch (error) {
    return NextResponse.json(
      { error: "Erreur Stripe" },
      { status: 500 }
    );
  }
}