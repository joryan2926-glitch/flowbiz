// ======================================================
// app/dashboard/billing/add-card/page.tsx
// ======================================================

"use client";

import "./add-card.css";

import {
  useEffect,
  useState,
} from "react";

import {
  Sparkles,
  Loader2,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import {
  loadStripe,
} from "@stripe/stripe-js";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

/* ======================================================
STRIPE
====================================================== */

const stripePromise =
  loadStripe(
    process.env
      .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

/* ======================================================
FORM
====================================================== */

function CardForm(){

  const stripe =
    useStripe();

  const elements =
    useElements();

  const [loading,setLoading] =
    useState(false);

  const [success,setSuccess] =
    useState(false);

  const [clientSecret,
    setClientSecret] =
    useState("");

  const customerId =
    typeof window !== "undefined"

      ? localStorage.getItem(
          "stripe_customer_id"
        )

      : null;

  /*
  ====================================================
  LOAD SETUP INTENT
  ====================================================
  */

  async function loadIntent(){

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
            customerId,
          }),
        }
      );

    const data =
      await response.json();

    setClientSecret(
      data.clientSecret
    );
  }

  useEffect(()=>{

    if(customerId){

      loadIntent();
    }

  },[]);

  /*
  ====================================================
  SAVE CARD
  ====================================================
  */

  async function handleSaveCard(){

    try{

      if(
        !stripe ||
        !elements
      ){

        return;
      }

      setLoading(true);

      const cardElement =
        elements.getElement(
          CardElement
        );

      if(!cardElement){

        return;
      }

      const result =
        await stripe.confirmCardSetup(

          clientSecret,

          {
            payment_method:{
              card:cardElement,
            },
          }
        );

      if(result.error){

        alert(
          result.error.message
        );

        setLoading(false);

        return;
      }

      setSuccess(true);

      setLoading(false);

    }catch(error){

      console.log(error);

      setLoading(false);
    }
  }

  /*
  ====================================================
  PAGE
  ====================================================
  */

  return(

    <div className="addCardPage">

      <div className="addCardGlowOne" />
      <div className="addCardGlowTwo" />

      <div className="addCardBox">

        <span className="addCardBadge">

          <Sparkles />

          FLOWBIZ BILLING

        </span>

        <h1>

          Ajouter une carte

        </h1>

        <p>

          Ajoutez un moyen
          de paiement sécurisé
          connecté à Stripe.

        </p>

        {
          success ? (

            <div className="successCard">

              <CheckCircle2 />

              Carte ajoutée avec succès

            </div>

          ) : (

            <>
              <div className="cardContainer">

                <CardElement
                  options={{
                    style:{
                      base:{
                        color:"#fff",
                        fontSize:"16px",
                      },
                    },
                  }}
                />

              </div>

              <div className="securityRow">

                <ShieldCheck />

                Paiement sécurisé Stripe

              </div>

              <button
                className="saveCardBtn"
                onClick={
                  handleSaveCard
                }
              >

                {
                  loading ? (

                    <Loader2 className="spin" />

                  ) : (

                    <>
                      <CreditCard />

                      Ajouter la carte
                    </>
                  )
                }

              </button>
            </>
          )
        }

      </div>

    </div>
  );
}

/* ======================================================
PAGE
====================================================== */

export default function AddCardPage(){

  return(

    <Elements stripe={stripePromise}>

      <CardForm />

    </Elements>
  );
}
