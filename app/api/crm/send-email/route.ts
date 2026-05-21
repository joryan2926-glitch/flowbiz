import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();


    const {
      to,
      subject,
      message,
    } = body;


    if (!to || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Champs manquants",
        },
        { status: 400 }
      );
    }


    console.log("EMAIL CRM");
    console.log("To:", to);
    console.log("Subject:", subject);


    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès",
    });


  } catch (error) {


    console.error(error);


    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}
