// ======================================================
// app/api/notifications/route.ts
// FLOWBIZ NOTIFICATION ENGINE
// FINAL PRODUCTION VERSION
// ======================================================


import { NextResponse }
from "next/server";


import { createClient }
from "@supabase/supabase-js";


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
GET
====================================================== */


export async function GET(){


  try{


    /* ==================================================
    NOTIFICATIONS
    ================================================== */


    const {
      data:notifications,
      error,
    } = await supabase


      .from("notifications")


      .select("*")


      .order(
        "created_at",
        {
          ascending:false,
        }
      )


      .limit(50);


    if(error){


      return NextResponse.json(


        {
          success:false,
          error:error.message,
        },


        {
          status:400,
        }
      );
    }


    /* ==================================================
    UNREAD COUNT
    ================================================== */


    const unreadCount =


      notifications?.filter(
        (notification)=>


          notification.read === false
      ).length || 0;


    /* ==================================================
    SUCCESS COUNT
    ================================================== */


    const successCount =


      notifications?.filter(
        (notification)=>


          notification.type ===
          "success"
      ).length || 0;


    /* ==================================================
    WARNING COUNT
    ================================================== */


    const warningCount =


      notifications?.filter(
        (notification)=>


          notification.type ===
          "warning"
      ).length || 0;


    /* ==================================================
    ERROR COUNT
    ================================================== */


    const errorCount =


      notifications?.filter(
        (notification)=>


          notification.type ===
          "error"
      ).length || 0;


    /* ==================================================
    PAYMENT COUNT
    ================================================== */


    const paymentCount =


      notifications?.filter(
        (notification)=>


          notification.type ===
          "payment"
      ).length || 0;


    /* ==================================================
    SUBSCRIPTION COUNT
    ================================================== */


    const subscriptionCount =


      notifications?.filter(
        (notification)=>


          notification.type ===
          "subscription"
      ).length || 0;


    /* ==================================================
    CRITICAL ALERTS
    ================================================== */


    const criticalAlerts =


      notifications?.filter(
        (notification)=>


          notification.status ===
          "critical"
      ) || [];


    /* ==================================================
    RETURN
    ================================================== */


    return NextResponse.json({


      success:true,


      stats:{


        total:
          notifications?.length || 0,


        unread:
          unreadCount,


        success:
          successCount,


        warning:
          warningCount,


        error:
          errorCount,


        payment:
          paymentCount,


        subscription:
          subscriptionCount,


        critical:
          criticalAlerts.length,
      },


      notifications,


      criticalAlerts,
    });


  }catch(error:any){


    console.log(
      "NOTIFICATION API ERROR:",
      error
    );


    return NextResponse.json(


      {
        success:false,
        error:error.message,
      },


      {
        status:500,
      }
    );
  }
}


/* ======================================================
POST
CREATE NOTIFICATION
====================================================== */


export async function POST(
  request:Request
){


  try{


    const body =
      await request.json();


    const {
      title,
      message,
      type,
      status,
    } = body;


    /* ==================================================
    INSERT
    ================================================== */


    const {
      data,
      error,
    } = await supabase


      .from("notifications")


      .insert([{


        title,


        message,


        type:
          type || "info",


        status:
          status || "normal",


        read:false,
      }])


      .select()


      .single();


    if(error){


      return NextResponse.json(


        {
          success:false,
          error:error.message,
        },


        {
          status:400,
        }
      );
    }


    /* ==================================================
    RETURN
    ================================================== */


    return NextResponse.json({


      success:true,


      notification:data,
    });


  }catch(error:any){


    return NextResponse.json(


      {
        success:false,
        error:error.message,
      },


      {
        status:500,
      }
    );
  }
}


/* ======================================================
PATCH
MARK AS READ
====================================================== */


export async function PATCH(
  request:Request
){


  try{


    const body =
      await request.json();


    const {
      id,
    } = body;


    /* ==================================================
    UPDATE
    ================================================== */


    const {
      data,
      error,
    } = await supabase


      .from("notifications")


      .update({


        read:true,
      })


      .eq(
        "id",
        id
      )


      .select()


      .single();


    if(error){


      return NextResponse.json(


        {
          success:false,
          error:error.message,
        },


        {
          status:400,
        }
      );
    }


    return NextResponse.json({


      success:true,


      notification:data,
    });


  }catch(error:any){


    return NextResponse.json(


      {
        success:false,
        error:error.message,
      },


      {
        status:500,
      }
    );
  }
}


/* ======================================================
DELETE
DELETE NOTIFICATION
====================================================== */


export async function DELETE(
  request:Request
){


  try{


    const {
      searchParams,
    } = new URL(
      request.url
    );


    const id =
      searchParams.get("id");


    if(!id){


      return NextResponse.json(


        {
          success:false,
          error:"Missing id",
        },


        {
          status:400,
        }
      );
    }


    /* ==================================================
    DELETE
    ================================================== */


    const {
      error,
    } = await supabase


      .from("notifications")


      .delete()


      .eq(
        "id",
        id
      );


    if(error){


      return NextResponse.json(


        {
          success:false,
          error:error.message,
        },


        {
          status:400,
        }
      );
    }


    return NextResponse.json({


      success:true,
    });


  }catch(error:any){


    return NextResponse.json(


      {
        success:false,
        error:error.message,
      },


      {
        status:500,
      }
    );
  }
}
