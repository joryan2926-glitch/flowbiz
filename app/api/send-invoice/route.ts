import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";


export async function POST(req: NextRequest) {


  try {


    const body = await req.json();


    const {
      to,
      subject,
      html,
    } = body;


    if (!to || !subject || !html) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing fields",
        },
        { status: 400 }
      );
    }


    const apiKey = process.env.RESEND_API_KEY;


    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY missing",
        },
        { status: 500 }
      );
    }


    const resend = new Resend(apiKey);


    const data = await resend.emails.send({
      from: "FlowBiz <onboarding@resend.dev>",
      to,
      subject,
      html,
    });


    return NextResponse.json({
      success: true,
      data,
    });


  } catch (error) {


    console.error(error);


    return NextResponse.json(
      {
        success: false,
        error: "Server error",
      },
      { status: 500 }
    );
  }
}
