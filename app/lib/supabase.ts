import {
  createClient,
} from "@supabase/supabase-js";

/* ======================================================
ENV
====================================================== */

const supabaseUrl =
  process.env
    .NEXT_PUBLIC_SUPABASE_URL!;

const supabaseAnonKey =
  process.env
    .NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/* ======================================================
SUPABASE CLIENT
====================================================== */

export const supabase =
  createClient(

    supabaseUrl,

    supabaseAnonKey,

    {

      auth:{

        /*
        ================================================
        SESSION
        ================================================
        */

        persistSession:true,

        autoRefreshToken:true,

        detectSessionInUrl:true,

        storage:

          typeof window !==
          "undefined"

            ? window.localStorage

            : undefined,
      },

      /*
      ==================================================
      GLOBAL HEADERS
      ==================================================
      */

      global:{

        headers:{

          "x-application-name":
            "flowbiz-os",
        },
      },

      /*
      ==================================================
      REALTIME
      ==================================================
      */

      realtime:{

        params:{
          eventsPerSecond:10,
        },
      },
    }
  );

/* ======================================================
GET CURRENT USER
====================================================== */

export async function getCurrentUser(){

  try{

    const {

      data:{ user },

      error,

    } =

      await supabase.auth
        .getUser();

    if(error){

      console.error(
        "Erreur utilisateur:",
        error.message
      );

      return null;
    }

    return user;

  }catch(error){

    console.error(error);

    return null;
  }
}

/* ======================================================
GET SESSION
====================================================== */

export async function getSession(){

  try{

    const {

      data:{ session },

      error,

    } =

      await supabase.auth
        .getSession();

    if(error){

      console.error(
        "Erreur session:",
        error.message
      );

      return null;
    }

    return session;

  }catch(error){

    console.error(error);

    return null;
  }
}

/* ======================================================
SIGN OUT
====================================================== */

export async function logout(){

  try{

    const { error } =

      await supabase.auth
        .signOut();

    if(error){

      console.error(
        "Erreur déconnexion:",
        error.message
      );

      return false;
    }

    /*
    ================================================
    REDIRECT
    ================================================
    */

    if(
      typeof window !==
      "undefined"
    ){

      window.location.href =
        "/login";
    }

    return true;

  }catch(error){

    console.error(error);

    return false;
  }
}

/* ======================================================
GET PROFILE
====================================================== */

export async function getProfile(){

  try{

    const user =
      await getCurrentUser();

    if(!user){

      return null;
    }

    const {

      data,
      error,

    } =

      await supabase

        .from("profiles")

        .select("*")

        .eq(
          "id",
          user.id
        )

        .single();

    if(error){

      console.error(
        "Erreur profil:",
        error.message
      );

      return null;
    }

    return data;

  }catch(error){

    console.error(error);

    return null;
  }
}

/* ======================================================
GET CLIENTS
====================================================== */

export async function getClients(){

  try{

    const user =
      await getCurrentUser();

    if(!user){

      return [];
    }

    const {

      data,
      error,

    } =

      await supabase

        .from("crm_clients")

        .select("*")

        .eq(
          "user_id",
          user.id
        )

        .order(
          "created_at",
          {
            ascending:false,
          }
        );

    if(error){

      console.error(
        "Erreur clients:",
        error.message
      );

      return [];
    }

    return data || [];

  }catch(error){

    console.error(error);

    return [];
  }
}

/* ======================================================
GET INVOICES
====================================================== */

export async function getInvoices(){

  try{

    const user =
      await getCurrentUser();

    if(!user){

      return [];
    }

    const {

      data,
      error,

    } =

      await supabase

        .from("invoices")

        .select("*")

        .eq(
          "user_id",
          user.id
        )

        .order(
          "created_at",
          {
            ascending:false,
          }
        );

    if(error){

      console.error(
        "Erreur factures:",
        error.message
      );

      return [];
    }

    return data || [];

  }catch(error){

    console.error(error);

    return [];
  }
}

/* ======================================================
REALTIME CLIENTS
====================================================== */

export function subscribeToClients(

  callback:
    (payload:any)=>void
){

  const channel =

    supabase

      .channel(
        "realtime-clients"
      )

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"crm_clients",
        },

        (payload)=>{

          callback(payload);
        }
      )

      .subscribe();

  return channel;
}

/* ======================================================
REALTIME INVOICES
====================================================== */

export function subscribeToInvoices(

  callback:
    (payload:any)=>void
){

  const channel =

    supabase

      .channel(
        "realtime-invoices"
      )

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"invoices",
        },

        (payload)=>{

          callback(payload);
        }
      )

      .subscribe();

  return channel;
}
