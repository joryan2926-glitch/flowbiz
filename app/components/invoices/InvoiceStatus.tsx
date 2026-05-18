// =========================================================
// components/invoices/InvoiceStatus.tsx
// =========================================================


"use client";


import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
  CreditCard,
} from "lucide-react";


interface Invoice{
  id:string;
  payment_status?:string;
  total?:number;
}


interface Props{
  invoices:Invoice[];
}


export default function InvoiceStatus({
  invoices,
}:Props){


  const paid =
    invoices.filter(
      (invoice)=>
        invoice.payment_status ===
        "paid"
    ).length;


  const pending =
    invoices.filter(
      (invoice)=>
        invoice.payment_status !==
        "paid"
    ).length;


  const revenue =
    invoices.reduce(
      (
        acc,
        invoice
      )=>


        acc +
        Number(
          invoice.total || 0
        ),


      0
    );


  return(


    <section className="invoiceStatusGrid">


      <div className="invoiceStatusCard paid">


        <CheckCircle2 />


        <div>


          <h3>
            {paid}
          </h3>


          <span>
            Factures payées
          </span>


        </div>


      </div>


      <div className="invoiceStatusCard pending">


        <Clock3 />


        <div>


          <h3>
            {pending}
          </h3>


          <span>
            En attente
          </span>


        </div>


      </div>


      <div className="invoiceStatusCard revenue">


        <CreditCard />


        <div>


          <h3>
            {revenue.toLocaleString()}€
          </h3>


          <span>
            Revenus
          </span>


        </div>


      </div>


    </section>
  );
}
