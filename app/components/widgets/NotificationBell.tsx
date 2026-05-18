// ======================================================
// components/widgets/NotificationBell.tsx
// ======================================================


"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  Bell,
} from "lucide-react";


import { supabase }
from "@/app/lib/supabase";


export default function NotificationBell(){


  const [
    count,
    setCount,
  ] = useState(0);


  async function loadNotifications(){


    const {
      data,
    } = await supabase


      .from("notifications")


      .select("*")


      .eq(
        "read",
        false
      );


    setCount(
      data?.length || 0
    );
  }


  useEffect(()=>{


    loadNotifications();


    const channel =


      supabase


        .channel(
          "notifications-live"
        )


        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"notifications",
          },
          ()=>{
            loadNotifications();
          }
        )


        .subscribe();


    return ()=>{


      supabase.removeChannel(
        channel
      );
    };


  },[]);


  return(


    <button className="notificationBell">


      <Bell />


      {
        count > 0 && (


          <span className="notificationCount">


            {count}


          </span>
        )
      }


    </button>
  );
}
