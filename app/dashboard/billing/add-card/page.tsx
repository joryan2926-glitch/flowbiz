"use client";

import "./add-card.css";

import {
  useEffect,
  useState,
} from "react";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import {
  stripePromise,
} from "@/app/lib/stripe-client";

import {
  Loader2,
  CreditCard,
} from "lucide-react";

/* ======================================================
FORM
====================================================== */

function AddCardForm(){

  const stripe =
    useStripe();

  const elements =
    useElements();

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  async function handleSubmit(
    e:any
  ){

    e.preventDefault();

    if(
      !stripe ||
      !elements
    ) return;

    try{

      setLoading(true);

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

      if(result.error){

        alert(
          result.error.message
        );

        return;
      }

      alert(
        "Carte ajoutée"
      );

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  return(

    <form
      onSubmit={handleSubmit}
      className="cardForm"
    >

      <div className="cardElementWrapper">

        <PaymentElement />

      </div>

      <button
        className="cardButton"
        disabled={loading}
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

  const [
    clientSecret,
    setClientSecret,
  ] =
    useState("");

  useEffect(()=>{

    async function init(){

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
                "STRIPE_CUSTOMER_ID",
            }),
          }
        );

      const data =
        await response.json();

      setClientSecret(
        data.clientSecret
      );
    }

    init();

  },[]);

  if(!clientSecret){

    return(

      <div className="addCardLoader">

        <Loader2 className="spin" />

      </div>
    );
  }

  return(

    <div className="addCardPage">

      <div className="addCardGlowOne" />
      <div className="addCardGlowTwo" />

      <div className="addCardContainer">

        <span className="addCardBadge">

          FLOWBIZ BILLING

        </span>

        <h1>

          Ajouter une carte

        </h1>

        <p>

          Paiement sécurisé Stripe.

        </p>

        <Elements

          stripe={stripePromise}

          options={{

            clientSecret,
          }}
        >

          <AddCardForm />

        </Elements>

      </div>

    </div>
  );
}
