// ======================================================
// app/api/ai/generate-document/route.ts
// FLOWBIZ AI DOCUMENT GENERATOR
// FINAL VERSION
// ======================================================

import {
  NextResponse,
} from "next/server";

import OpenAI
from "openai";

import {
  createClient,
} from "@supabase/supabase-js";

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
SUPABASE
====================================================== */

const supabase =
  createClient(

    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .SUPABASE_SERVICE_ROLE_KEY!
  );

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

      type,
      subject,

    } = body;

    /*
    ====================================================
    AI
    ====================================================
    */

    const completion =

      await openai.chat.completions.create({

        model:"gpt-4.1-mini",

        messages:[

          {
            role:"system",

            content:`

              Tu es FlowBiz AI.

              Génère des documents
              business premium :

              - emails
              - devis
              - propositions
              - stratégies
              - documents commerciaux
              - contrats simples

              Style moderne,
              professionnel,
              premium.

            `,
          },

          {
            role:"user",

            content:`

              Génère un document :

              Type : ${type}

              Sujet :
              ${subject}

            `,
          },
        ],

        temperature:0.7,
      });

    /*
    ====================================================
    CONTENT
    ====================================================
    */

    const content =

      completion
        .choices?.[0]
        ?.message
        ?.content || "";

    /*
    ====================================================
    SAVE
    ====================================================
    */

    const {

      data,

      error,

    } =

      await supabase

        .from(
          "ai_documents"
        )

        .insert({

          title:
            subject,

          type,

          content,
        })

        .select()

        .single();

    if(error){

      throw error;
    }

    /*
    ====================================================
    RESPONSE
    ====================================================
    */

    return NextResponse.json({

      success:true,

      document:data,
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
