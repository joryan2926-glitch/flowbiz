// ======================================================
// app/dashboard/billing/payment-methods/page.tsx
// FLOWBIZ PAYMENT METHODS
// FINAL VERSION
// ======================================================

"use client";

import "./payment-methods.css";

import {
  useEffect,
  useState,
} from "react";

import {
  createClient,
} from "@supabase/supabase-js";

import {
  CreditCard,
  Loader2,
  Trash2,
  Sparkles,
} from "lucide-react";

/* ======================================================
SUPABASE
====================================================== */

const supabase =
  createClient(

    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

/* ======================================================
INTERFACE
====================================================== */

interface PaymentMethod{

  id:string;

  card:{
    brand:string;

    last4:string;

    exp_month:number;

    exp_year:number;
  };
}

/* ======================================================
PAGE
====================================================== */

export default function PaymentMethodsPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    methods,
    setMethods,
  ] =
    useState<PaymentMethod[]>([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  /*
  ====================================================
  LOAD METHODS
  ====================================================
  */

  useEffect(()=>{

    async function loadMethods(){

      try{

        /*
        ================================================
        GET USER
        ================================================
        */

        const {

          data:{
            user,
          },

        } =

          await supabase
            .auth
            .getUser();

        if(!user){

          setLoading(false);

          return;
        }

        /*
        ================================================
        GET PROFILE
        ================================================
        */

        const {

          data:profile,

        } =

          await supabase

            .from(
              "profiles"
            )

            .select("*")

            .eq(
              "id",
              user.id
            )

            .single();

        /*
        ================================================
        GET METHODS
        ================================================
        */

        const response =
          await fetch(

            `/api/stripe/get-payment-methods?customerId=${profile.stripe_customer_id}`
          );

        const data =
          await response.json();

        setMethods(
          data.methods || []
        );

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);
      }
    }

    loadMethods();

  },[]);

  /*
  ====================================================
  DELETE METHOD
  ====================================================
  */

  async function deleteMethod(
    id:string
  ){

    try{

      await fetch(

        "/api/stripe/delete-payment-method",

        {

          method:"POST",

          headers:{
            "Content-Type":
              "application/json",
          },

          body:JSON.stringify({

            paymentMethodId:id,
          }),
        }
      );

      setMethods(

        prev=>

          prev.filter(

            item=>

              item.id !== id
          )
      );

    }catch(error){

      console.log(error);
    }
  }

  /*
  ====================================================
  LOADER
  ====================================================
  */

  if(loading){

    return(

      <div className="methodsLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="methodsPage">

      <div className="methodsGlowOne" />
      <div className="methodsGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="methodsTopbar">

        <span className="methodsBadge">

          <Sparkles />

          FLOWBIZ BILLING

        </span>

        <h1>

          Payment Methods

        </h1>

        <p>

          Gestion des cartes
          bancaires Stripe.

        </p>

      </header>

      {/* ==================================================
      LIST
      ================================================== */}

      <section className="methodsList">

        {
          methods.map(

            method=>(

              <div
                key={method.id}
                className="methodCard"
              >

                {/* ICON */}

                <div className="methodIcon">

                  <CreditCard />

                </div>

                {/* CONTENT */}

                <div className="methodContent">

                  <strong>

                    {
                      method.card.brand
                    }

                    {" •••• "}

                    {
                      method.card.last4
                    }

                  </strong>

                  <span>

                    Exp :

                    {
                      method.card.exp_month
                    }

                    /

                    {
                      method.card.exp_year
                    }

                  </span>

                </div>

                {/* DELETE */}

                <button

                  className="deleteMethodButton"

                  onClick={()=>

                    deleteMethod(
                      method.id
                    )
                  }
                >

                  <Trash2 />

                </button>

              </div>
            )
          )
        }

      </section>

    </div>
  );
}
