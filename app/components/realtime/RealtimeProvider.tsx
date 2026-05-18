// ======================================================
// components/realtime/RealtimeProvider.tsx
// FLOWBIZ REALTIME ENGINE
// FINAL PRODUCTION VERSION
// ======================================================


"use client";


import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


import { supabase }
from "@/app/lib/supabase";


/* ======================================================
TYPES
====================================================== */


interface RealtimeContextType{


  connected:boolean;


  lastEvent:string | null;


  refreshKey:number;
}


/* ======================================================
CONTEXT
====================================================== */


const RealtimeContext =
  createContext<
    RealtimeContextType
  >({


    connected:false,


    lastEvent:null,


    refreshKey:0,
  });


/* ======================================================
HOOK
====================================================== */


export function useRealtime(){


  return useContext(
    RealtimeContext
  );
}


/* ======================================================
PROVIDER
====================================================== */


interface Props{


  children:ReactNode;
}


export default function RealtimeProvider({
  children,
}:Props){


  /* ======================================================
  STATES
  ====================================================== */


  const [
    connected,
    setConnected,
  ] = useState(false);


  const [
    lastEvent,
    setLastEvent,
  ] = useState<string | null>(
    null
  );


  const [
    refreshKey,
    setRefreshKey,
  ] = useState(0);


  /* ======================================================
  REALTIME
  ====================================================== */


  useEffect(()=>{


    /* ==================================================
    CHANNEL
    ================================================== */


    const channel =


      supabase


        .channel(
          "flowbiz-realtime-global"
        )


        /* ==================================================
        INVOICES
        ================================================== */


        .on(
          "postgres_changes",


          {
            event:"*",
            schema:"public",
            table:"invoices",
          },


          (payload)=>{


            console.log(
              "INVOICE EVENT:",
              payload
            );


            setLastEvent(
              "invoice_updated"
            );


            setRefreshKey(
              (prev)=>
                prev + 1
            );
          }
        )


        /* ==================================================
        CLIENTS
        ================================================== */


        .on(
          "postgres_changes",


          {
            event:"*",
            schema:"public",
            table:"clients",
          },


          (payload)=>{


            console.log(
              "CLIENT EVENT:",
              payload
            );


            setLastEvent(
              "client_updated"
            );


            setRefreshKey(
              (prev)=>
                prev + 1
            );
          }
        )


        /* ==================================================
        EXPENSES
        ================================================== */


        .on(
          "postgres_changes",


          {
            event:"*",
            schema:"public",
            table:"expenses",
          },


          (payload)=>{


            console.log(
              "EXPENSE EVENT:",
              payload
            );


            setLastEvent(
              "expense_updated"
            );


            setRefreshKey(
              (prev)=>
                prev + 1
            );
          }
        )


        /* ==================================================
        SUBSCRIPTIONS
        ================================================== */


        .on(
          "postgres_changes",


          {
            event:"*",
            schema:"public",
            table:"subscriptions",
          },


          (payload)=>{


            console.log(
              "SUBSCRIPTION EVENT:",
              payload
            );


            setLastEvent(
              "subscription_updated"
            );


            setRefreshKey(
              (prev)=>
                prev + 1
            );
          }
        )


        /* ==================================================
        NOTIFICATIONS
        ================================================== */


        .on(
          "postgres_changes",


          {
            event:"*",
            schema:"public",
            table:"notifications",
          },


          (payload)=>{


            console.log(
              "NOTIFICATION EVENT:",
              payload
            );


            setLastEvent(
              "notification_updated"
            );


            setRefreshKey(
              (prev)=>
                prev + 1
            );
          }
        )


        /* ==================================================
        ACTIVITY
        ================================================== */


        .on(
          "postgres_changes",


          {
            event:"*",
            schema:"public",
            table:"activity",
          },


          (payload)=>{


            console.log(
              "ACTIVITY EVENT:",
              payload
            );


            setLastEvent(
              "activity_updated"
            );


            setRefreshKey(
              (prev)=>
                prev + 1
            );
          }
        )


        /* ==================================================
        FAILED PAYMENTS
        ================================================== */


        .on(
          "postgres_changes",


          {
            event:"*",
            schema:"public",
            table:"failed_payments",
          },


          (payload)=>{


            console.log(
              "FAILED PAYMENT EVENT:",
              payload
            );


            setLastEvent(
              "failed_payment_updated"
            );


            setRefreshKey(
              (prev)=>
                prev + 1
            );
          }
        )


        /* ==================================================
        SUBSCRIBE
        ================================================== */


        .subscribe(
          (status)=>{


            console.log(
              "REALTIME STATUS:",
              status
            );


            if(
              status ===
              "SUBSCRIBED"
            ){


              setConnected(
                true
              );


            }else{


              setConnected(
                false
              );
            }
          }
        );


    /* ==================================================
    CLEANUP
    ================================================== */


    return ()=>{


      supabase.removeChannel(
        channel
      );
    };


  },[]);


  /* ======================================================
  PROVIDER
  ====================================================== */


  return(


    <RealtimeContext.Provider
      value={{


        connected,


        lastEvent,


        refreshKey,
      }}
    >


      {children}


    </RealtimeContext.Provider>
  );
}
