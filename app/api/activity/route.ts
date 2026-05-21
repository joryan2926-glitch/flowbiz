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


export async function GET() {
  try {
    const { data, error } = await supabase
      .from("activity")
      .select("*")
      .order("created_at", { ascending: false });


    if (error) {
      console.error("Supabase error:", error);


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
    console.error("API Activity Error:", err);


    return NextResponse.json(
      {
        success: false,
        error: err.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
