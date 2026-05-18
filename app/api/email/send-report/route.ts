// ======================================================
// app/api/email/send-report/route.ts
// ======================================================


import nodemailer from "nodemailer";


import {
  NextResponse,
} from "next/server";


/* ======================================================
TRANSPORTER
====================================================== */


const transporter =
  nodemailer.createTransport({


    host:
      process.env.EMAIL_HOST,


    port:Number(
      process.env.EMAIL_PORT
    ),


    secure:false,


    auth:{
      user:
        process.env.EMAIL_USER,


      pass:
        process.env.EMAIL_PASSWORD,
    },
  });


/* ======================================================
POST
====================================================== */


export async function POST(
  request:Request
){


  try{


    const body =
      await request.json();


    await transporter.sendMail({


      from:
        `"FlowBiz" <${process.env.EMAIL_USER}>`,


      to:
        process.env.EMAIL_USER,


      subject:
        "Nouveau rapport FlowBiz",


      html:`


        <h2>Nouvelle activité</h2>


        <p>
          Dépense :
          ${body.title}
        </p>


        <p>
          Montant :
          ${body.amount}€
        </p>


        <p>
          Fournisseur :
          ${body.supplier}
        </p>
      `,
    });


    return NextResponse.json({


      success:true,
    });


  }catch(error:any){


    console.log(error);


    return NextResponse.json({


      error:error.message,
    },{
      status:500,
    });
  }
}
