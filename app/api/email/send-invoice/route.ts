/* =========================================================
FILE
app/api/email/send-invoice/route.ts
VERSION CORRIGÉE
========================================================= */


import { NextResponse }
from "next/server";


import nodemailer
from "nodemailer";


export async function POST(
  request:Request
){


  try{


    const body =
      await request.json();


    const {
      email,
      client_name,
      invoice_number,
      total,
      pdf_url,
      payment_url,
    } = body;


    if(!email){


      return NextResponse.json(
        {
          error:"Email requis",
        },
        {
          status:400,
        }
      );
    }


    /*
    ========================================================
    TRANSPORTER
    ========================================================
    */


    const transporter =
      nodemailer.createTransport({


        host:
          process.env.SMTP_HOST,


        port:Number(
          process.env.SMTP_PORT
        ),


        secure:false,


        auth:{
          user:
            process.env.SMTP_USER,


          pass:
            process.env.SMTP_PASS,
        },
      });


    /*
    ========================================================
    SEND
    ========================================================
    */


    await transporter.sendMail({


      from:
        process.env.SMTP_USER,


      to:email,


      subject:
        `Facture ${invoice_number}`,


      html:`
      <div
        style="
          font-family:Arial;
          background:#0f172a;
          color:white;
          padding:40px;
        "
      >


        <h1>
          FLOWBIZ
        </h1>


        <p>
          Bonjour ${client_name},
        </p>


        <p>
          Votre facture
          <strong>
            ${invoice_number}
          </strong>
          est disponible.
        </p>


        <p>
          Montant :
          <strong>
            ${total}€
          </strong>
        </p>


        <br/>


        <a
          href="${payment_url}"
          style="
            background:#6366f1;
            color:white;
            padding:14px 22px;
            border-radius:10px;
            text-decoration:none;
            margin-right:10px;
          "
        >
          Payer
        </a>


        <a
          href="${pdf_url}"
          style="
            background:#111827;
            color:white;
            padding:14px 22px;
            border-radius:10px;
            text-decoration:none;
          "
        >
          Télécharger PDF
        </a>


      </div>
      `,
    });


    return NextResponse.json({


      success:true,
    });


  }catch(error){


    console.log(error);


    return NextResponse.json(
      {
        error:"Erreur email",
      },
      {
        status:500,
      }
    );
  }
}
