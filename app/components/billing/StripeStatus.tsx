"use client";

import {
  ShieldCheck,
  AlertTriangle,
  Wifi,
  WifiOff,
} from "lucide-react";

interface StripeStatusProps{
  connected:boolean;
  liveMode:boolean;
  payoutsEnabled:boolean;
}

export default function StripeStatus({
  connected,
  liveMode,
  payoutsEnabled,
}:StripeStatusProps){

  return(

    <div className="billingCard stripeStatus">

      <div className="stripeHeader">

        <div className="stripeLogo">

          <ShieldCheck />

        </div>

        <div>

          <h3>
            Stripe
          </h3>

          <span>
            Connexion API
          </span>

        </div>

      </div>

      <div className="stripeBody">

        <div className="stripeRow">

          <span>
            Statut
          </span>

          <b
            className={
              connected
                ? "successText"
                : "dangerText"
            }
          >

            {
              connected
                ? "Connecté"
                : "Déconnecté"
            }

          </b>

        </div>

        <div className="stripeRow">

          <span>
            Mode
          </span>

          <b>

            {
              liveMode
                ? "Production"
                : "Test"
            }

          </b>

        </div>

        <div className="stripeRow">

          <span>
            Payouts
          </span>

          <b
            className={
              payoutsEnabled
                ? "successText"
                : "warningText"
            }
          >

            {
              payoutsEnabled
                ? "Activés"
                : "En attente"
            }

          </b>

        </div>

      </div>

      <div className="stripeFooter">

        {
          connected

            ? <Wifi />

            : <WifiOff />
        }

        Synchronisation temps réel

      </div>

    </div>
  );
}
