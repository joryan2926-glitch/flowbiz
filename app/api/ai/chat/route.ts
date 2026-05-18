// ======================================================
// app/api/ai/chat/route.ts
// FLOWBIZ AI CHAT
// FINAL VERSION
// ======================================================

import {
  NextResponse,
} from "next/server";

import OpenAI
from "openai";

/* ======================================================
OPENAI
====================================================== */

const openai =
  new OpenAI({

    apiKey:
      process.env
        .OPENAI_API_KEY,
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

    const {
      message,
    } = body;

    /*
    ====================================================
    VALIDATION
    ====================================================
    */

    if(!message){

      return NextResponse.json(

        {
          error:
            "Message requis",
        },

        {
          status:400,
        }
      );
    }

    /*
    ====================================================
    OPENAI
    ====================================================
    */

    const completion =

      await openai.chat.completions.create({

        model:"gpt-4.1-mini",

        messages:[

          {
            role:"system",

            content:`

              Tu es FlowBiz AI,
              assistant business premium.

              Tu aides les entreprises
              sur :

              - CRM
              - ventes
              - marketing
              - automatisation
              - stratégie
              - finance
              - relation client
              - croissance business

              Réponses professionnelles,
              modernes,
              claires,
              premium.

            `,
          },

          {
            role:"user",

            content:message,
          },
        ],

        temperature:0.7,
      });

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      success:true,

      response:

        completion
          .choices?.[0]
          ?.message
          ?.content || "",
    });

  }catch(error:any){

    return NextResponse.json(

      {
        error:error.message,
      },

      {
        status:500,
      }
    );
  }
}
