import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {


    const body = await req.json();


    const message = body.message;


    if (!message) {
      return NextResponse.json(
        {
          error: "Message requis"
        },
        {
          status: 400
        }
      );
    }


    const OPENAI_API_KEY =
      process.env.OPENAI_API_KEY;


    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OPENAI_API_KEY manquante"
        },
        {
          status: 500
        }
      );
    }


    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",


        headers: {
          "Content-Type": "application/json",


          Authorization:
            `Bearer ${OPENAI_API_KEY}`,
        },


        body: JSON.stringify({
          model: "gpt-4o-mini",


          messages: [
            {
              role: "system",


              content:
                "Tu es FlowBiz AI, assistant intelligent professionnel."
            },


            {
              role: "user",


              content: message
            }
          ],


          temperature: 0.7,
        }),
      }
    );


    const data = await response.json();


    return NextResponse.json(data);


  } catch (error) {


    console.error(error);


    return NextResponse.json(
      {
        error: "Erreur serveur IA"
      },
      {
        status: 500
      }
    );
  }
}
