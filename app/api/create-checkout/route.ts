import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

export async function POST(req:Request){

  const body =
    await req.json();

  const session =
    await stripe.checkout.sessions.create({

      payment_method_types:["card"],

      line_items:[
        {
          price_data:{
            currency:"eur",

            product_data:{
              name:
                body.invoice_number,
            },

            unit_amount:
              Math.round(
                body.total * 100
              ),
          },

          quantity:1,
        },
      ],

      mode:"payment",

      success_url:
        "http://localhost:3000/success",

      cancel_url:
        "http://localhost:3000/cancel",
    });

  return Response.json({
    url:session.url,
  });
}
