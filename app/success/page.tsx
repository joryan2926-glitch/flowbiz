import Link from "next/link";
import "./success.css";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="successPage">
      <div className="successCard">

        <CheckCircle2 />

        <h1>
          Paiement réussi 🎉
        </h1>

        <p>
          Votre abonnement FlowBiz est
          maintenant actif.
        </p>

        <Link href="/">
          Accéder au dashboard
        </Link>
      </div>
    </div>
  );
}
