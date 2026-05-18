import { Resend } from "resend";

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

export async function POST(
  req:Request
){

  const body =
    await req.json();

  await resend.emails.send({

    from:
      "FlowBiz <onboarding@resend.dev>",

    to:body.email,

    subject:
      `Facture ${body.invoice_number}`,

    html:`
      <h1>Votre facture</h1>

      <p>
        Montant :
        ${body.total}€
      </p>
    `,
  });

  return Response.json({
    success:true,
  });
}
