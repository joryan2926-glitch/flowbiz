"use client";

import Link from "next/link";

import {
  Receipt,
  Eye,
  Send,
  Download,
} from "lucide-react";

interface InvoiceRowProps{
  id:string;
  client:string;
  amount:number;
  status:string;
  createdAt:string;
}

export default function InvoiceRow({
  id,
  client,
  amount,
  status,
  createdAt,
}:InvoiceRowProps){

  function getStatusClass(){

    switch(status){

      case "Payée":
        return "paid";

      case "En attente":
        return "pending";

      case "Échoué":
        return "failed";

      default:
        return "";
    }
  }

  return(

    <div className="invoiceRow">

      <div className="invoiceLeft">

        <div className="invoiceIcon">

          <Receipt />

        </div>

        <div>

          <h4>
            {client}
          </h4>

          <span>
            {
              new Date(
                createdAt
              ).toLocaleDateString()
            }
          </span>

        </div>

      </div>

      <div className="invoiceCenter">

        <strong>
          {amount.toLocaleString()}€
        </strong>

      </div>

      <div className="invoiceRight">

        <span
          className={`invoiceStatus ${getStatusClass()}`}
        >

          {status}

        </span>

        <div className="invoiceActions">

          <Link
            href={`/dashboard/billing/invoices/${id}`}
          >

            <button>

              <Eye />

            </button>

          </Link>

          <button>

            <Send />

          </button>

          <button>

            <Download />

          </button>

        </div>

      </div>

    </div>
  );
}
