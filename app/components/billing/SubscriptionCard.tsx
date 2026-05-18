"use client";

import {
  CreditCard,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

interface SubscriptionCardProps{
  client:string;
  plan:string;
  amount:number;
  status:string;
  renewalDate?:string;
}

export default function SubscriptionCard({
  client,
  plan,
  amount,
  status,
  renewalDate,
}:SubscriptionCardProps){

  return(

    <div className="subscriptionCard">

      <div className="subscriptionTop">

        <div className="subscriptionIcon">

          <CreditCard />

        </div>

        <span
          className={`subscriptionStatus ${status}`}
        >

          {status}

        </span>

      </div>

      <div className="subscriptionContent">

        <h3>
          {plan}
        </h3>

        <span>
          {client}
        </span>

        <strong>
          {amount}€
          /mois
        </strong>

      </div>

      {
        renewalDate && (

          <div className="subscriptionFooter">

            <CalendarDays />

            Renouvellement :
            {" "}
            {
              new Date(
                renewalDate
              ).toLocaleDateString()
            }

          </div>
        )
      }

      <div className="subscriptionActive">

        <CheckCircle2 />

        Abonnement actif

      </div>

    </div>
  );
}
