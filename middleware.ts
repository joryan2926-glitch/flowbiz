// ======================================================
// middleware.ts
// FLOWBIZ SECURITY
// ======================================================

import {

  NextResponse,

} from "next/server";

import type {

  NextRequest,

} from "next/server";

/* ======================================================
MIDDLEWARE
====================================================== */

export function middleware(
  request:NextRequest
){

  /*
  ====================================================
  BLOCK BAD METHODS
  ====================================================
  */

  if(

    request.nextUrl.pathname
      .startsWith("/api")
  ){

    /*
    ================================================
    HEADERS
    ================================================
    */

    const response =
      NextResponse.next();

    /*
    ================================================
    SECURITY HEADERS
    ================================================
    */

    response.headers.set(

      "X-Frame-Options",
      "DENY"
    );

    response.headers.set(

      "X-Content-Type-Options",
      "nosniff"
    );

    response.headers.set(

      "Referrer-Policy",
      "strict-origin"
    );

    response.headers.set(

      "Permissions-Policy",
      "camera=(), microphone=()"
    );

    return response;
  }

  return NextResponse.next();
}

/* ======================================================
MATCHER
====================================================== */

export const config = {

  matcher:[

    "/api/:path*",
  ],
};
