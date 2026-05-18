// ======================================================
// app/dashboard/billing/payment-methods/add-card/page.tsx
// FLOWBIZ ADD PAYMENT METHOD
// STRIPE ELEMENTS FINAL VERSION
// ======================================================

"use client";

import "./add-card.css";

import {
  useEffect,
  useState,
} from "react";

import {
  createClient,
} from "@supabase/supabase-js";

import {
  loadStripe,
} from "@stripe/stripe-js";

import {

  Elements,

  PaymentElement,

  useStripe,

  useElements,

} from "@stripe/react-stripe-js";

import {

  CreditCard,
  Loader2,
  Sparkles,
  CheckCircle2,

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
STRIPE
====================================================== */

const stripePromise =
  loadStripe(

    process.env
      .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

/* ======================================================
CHECKOUT FORM
====================================================== */

function CheckoutForm(){

  /*
  ====================================================
  STRIPE
  ====================================================
  */

  const stripe =
    useStripe();

  const elements =
    useElements();

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    success,
    setSuccess,
  ] =
    useState(false);

  /*
  ====================================================
  SUBMIT
  ====================================================
  */

  async function handleSubmit(
    event:
      React.FormEvent
  ){

    event.preventDefault();

    if(
      !stripe
      ||
      !elements
    ){

      return;
    }

    try{

      setLoading(true);

      /*
      ================================================
      CONFIRM SETUP
      ================================================
      */

      const result =

        await stripe
          .confirmSetup({

            elements,

            confirmParams:{

              return_url:

                `${window.location.origin}/dashboard/billing/payment-methods`,
            },

            redirect:"if_required",
          });

      /*
      ================================================
      ERROR
      ================================================
      */

      if(result.error){

        alert(
          result.error.message
        );

        return;
      }

      /*
      ================================================
      SUCCESS
      ================================================
      */

      setSuccess(true);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <form

      className="addCardForm"

      onSubmit={handleSubmit}
    >

      {/* ==================================================
      HEADER
      ================================================== */}

      <div className="addCardHeader">

        <div className="addCardIcon">

          <CreditCard />

        </div>

        <div>

          <strong>

            Ajouter une carte

          </strong>

          <span>

            Paiement sécurisé Stripe

          </span>

        </div>

      </div>

      {/* ==================================================
      ELEMENT
      ================================================== */}

      <div className="paymentElementWrapper">

        <PaymentElement />

      </div>

      {/* ==================================================
      SUCCESS
      ================================================== */}

      {
        success && (

          <div className="successBox">

            <CheckCircle2 />

            Carte ajoutée avec succès

          </div>
        )
      }

      {/* ==================================================
      BUTTON
      ================================================== */}

      <button

        type="submit"

        disabled={
          !stripe
          ||
          loading
        }

        className="addCardButton"
      >

        {
          loading

          ? <Loader2 className="spin" />

          : <CreditCard />
        }

        Ajouter la carte

      </button>

    </form>
  );
}

/* ======================================================
PAGE
====================================================== */

export default function AddCardPage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [
    clientSecret,
    setClientSecret,
  ] =
    useState("");

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  /*
  ====================================================
  LOAD SETUP INTENT
  ====================================================
  */

  useEffect(()=>{

    async function loadSetupIntent(){

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
        CREATE SETUP INTENT
        ================================================
        */

        const response =
          await fetch(

            "/api/stripe/create-setup-intent",

            {

              method:"POST",

              headers:{
                "Content-Type":
                  "application/json",
              },

              body:JSON.stringify({

                customerId:

                  profile
                    .stripe_customer_id,
              }),
            }
          );

        const data =
          await response.json();

        setClientSecret(
          data.clientSecret
        );

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);
      }
    }

    loadSetupIntent();

  },[]);

  /*
  ====================================================
  LOADER
  ====================================================
  */

  if(loading){

    return(

      <div className="addCardLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  /*
  ====================================================
  OPTIONS
  ====================================================
  */

  const options = {

    clientSecret,

    appearance:{

      theme:"night" as const,

      variables:{

        colorPrimary:
          "#6366f1",

        colorBackground:
          "#0b1020",

        colorText:
          "#ffffff",

        borderRadius:
          "16px",
      },
    },
  };

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="addCardPage">

      <div className="addCardGlowOne" />
      <div className="addCardGlowTwo" />

      {/* ==================================================
      TOPBAR
      ================================================== */}

      <header className="addCardTopbar">

        <span className="addCardBadge">

          <Sparkles />

          FLOWBIZ BILLING

        </span>

        <h1>

          Ajouter une carte

        </h1>

        <p>

          Ajoute une méthode
          de paiement sécurisée
          avec Stripe Elements.

        </p>

      </header>

      {/* ==================================================
      STRIPE ELEMENTS
      ================================================== */}

      {
        clientSecret && (

          <Elements

            stripe={
              stripePromise
            }

            options={options}
          >

            <CheckoutForm />

          </Elements>
        )
      }

    </div>
  );
}
