import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;


if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
}


if (!supabaseKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required");
}


const supabase = createClient(supabaseUrl, supabaseKey);


export async function POST(req: Request) {
  try {
    const body = await req.json();


    const { name, role, prompt } = body;


    const { data, error } = await supabase
      .from("agents")
      .insert([
        {
          name,
          role,
          prompt,
          created_at: new Date().toISOString(),
        },
      ])
      .select();


    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }


    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
