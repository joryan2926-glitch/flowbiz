"use client";

import {
  CreditCard,
  Trash2,
  ShieldCheck,
} from "lucide-react";

interface PaymentMethodCardProps{
  brand:string;
  last4:string;
  expMonth:number;
  expYear:number;
  defaultMethod?:boolean;
}

export default function PaymentMethodCard({
  brand,
  last4,
  expMonth,
  expYear,
  defaultMethod = false,
}:PaymentMethodCardProps){

  return(

    <div className="paymentMethodCard">

      <div className="paymentMethodTop">

        <div className="paymentCardIcon">

          <CreditCard />

        </div>

        {
          defaultMethod && (

            <span className="defaultBadge">

              Par défaut

            </span>
          )
        }

      </div>

      <div className="paymentMethodContent">

        <h3>

          {brand}
          {" "}
          ••••
          {" "}
          {last4}

        </h3>

        <span>

          Expire :
          {" "}
          {expMonth}/
          {expYear}

        </span>

      </div>

      <div className="paymentMethodFooter">

        <div>

          <ShieldCheck />

          Sécurisé Stripe

        </div>

        <button>

          <Trash2 />

        </button>

      </div>

    </div>
  );
}
