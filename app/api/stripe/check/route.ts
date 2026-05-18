/* =========================================================
FILE
app/api/stripe/check/route.ts
========================================================= */


import { NextResponse }
from "next/server";


export async function GET(){


  try{


    if(
      process.env.STRIPE_SECRET_KEY
    ){


      return NextResponse.json({
        connected:true,
      });
    }


    return NextResponse.json(
      {
        connected:false,
      },
      {
        status:500,
      }
    );


  }catch(error){


    return NextResponse.json(
      {
        connected:false,
      },
      {
        status:500,
      }
    );
  }
}
