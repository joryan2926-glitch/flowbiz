// ======================================================
// app/api/crm/create/route.ts
// FLOWBIZ CRM API
// FINAL SECURE MULTI-TENANT VERSION
// ======================================================

import {

  NextResponse,

} from "next/server";

import {

  z,

} from "zod";

import {

  supabaseAdmin,

} from "../../../lib/supabaseAdmin";

import {

  ratelimit,

} from "../../../lib/ratelimit";

import {

  sanitizeInput,

} from "../../../lib/security";

/* ======================================================
VALIDATION
====================================================== */

const crmSchema =

  z.object({

    full_name:

      z.string()
      .min(2)
      .max(100),

    email:

      z.string()
      .email(),

    phone:

      z.string()
      .min(5)
      .max(30),

    company:

      z.string()
      .min(2)
      .max(100),

    value:

      z.number()
      .min(0),

    organization_id:

      z.string()
      .uuid(),

    workspace_id:

      z.string()
      .uuid(),

    created_by:

      z.string()
      .uuid(),
  });

/* ======================================================
POST
====================================================== */

export async function POST(
  request:Request
){

  try{

    /*
    ====================================================
    IP
    ====================================================
    */

    const ip =

      request.headers.get(
        "x-forwarded-for"
      ) || "anonymous";

    /*
    ====================================================
    RATE LIMIT
    ====================================================
    */

    const {

      success,

    } =

      await ratelimit.limit(ip);

    if(!success){

      return NextResponse.json(

        {

          error:
            "Too many requests",
        },

        {

          status:429,
        }
      );
    }

    /*
    ====================================================
    BODY
    ====================================================
    */

    const body =
      await request.json();

    /*
    ====================================================
    VALIDATION
    ====================================================
    */

    const validated =

      crmSchema.parse({

        full_name:

          sanitizeInput(
            body.full_name
          ),

        email:

          sanitizeInput(
            body.email
          ),

        phone:

          sanitizeInput(
            body.phone
          ),

        company:

          sanitizeInput(
            body.company
          ),

        value:Number(
          body.value
        ),

        organization_id:
          body.organization_id,

        workspace_id:
          body.workspace_id,

        created_by:
          body.created_by,
      });

    /*
    ====================================================
    CHECK MEMBER ACCESS
    ====================================================
    */

    const {

      data:member,
      error:memberError,

    } =

      await supabaseAdmin

        .from(
          "organization_members"
        )

        .select("*")

        .eq(
          "organization_id",
          validated.organization_id
        )

        .eq(
          "user_id",
          validated.created_by
        )

        .single();

    /*
    ====================================================
    MEMBER ERROR
    ====================================================
    */

    if(memberError || !member){

      return NextResponse.json(

        {

          error:
            "Unauthorized organization access",
        },

        {

          status:403,
        }
      );
    }

    /*
    ====================================================
    INSERT CLIENT
    ====================================================
    */

    const {

      data,
      error,

    } =

      await supabaseAdmin

        .from(
          "crm_clients"
        )

        .insert({

          full_name:
            validated.full_name,

          email:
            validated.email,

          phone:
            validated.phone,

          company:
            validated.company,

          value:
            validated.value,

          organization_id:
            validated.organization_id,

          workspace_id:
            validated.workspace_id,

          created_by:
            validated.created_by,

          pipeline_stage:
            "lead",

          status:
            "active",
        })

        .select()

        .single();

    /*
    ====================================================
    INSERT ERROR
    ====================================================
    */

    if(error){

      return NextResponse.json(

        {

          error:error.message,
        },

        {

          status:500,
        }
      );
    }

    /*
    ====================================================
    SUCCESS
    ====================================================
    */

    return NextResponse.json({

      success:true,

      client:data,
    });

  }catch(error:any){

    /*
    ====================================================
    ZOD ERROR
    ====================================================
    */

    if(error?.errors){

      return NextResponse.json(

        {

          error:error.errors,
        },

        {

          status:400,
        }
      );
    }

    /*
    ====================================================
    SERVER ERROR
    ====================================================
    */

    return NextResponse.json(

      {

        error:
          "Internal server error",
      },

      {

        status:500,
      }
    );
  }
}