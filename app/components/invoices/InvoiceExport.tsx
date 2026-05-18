"use client";


import {
  Download,
} from "lucide-react";


interface Props{
  invoices:any[];
}


export default function InvoiceExport({
  invoices,
}:Props){


  function exportInvoices(){


    const data =
      JSON.stringify(
        invoices,
        null,
        2
      );


    const blob =
      new Blob(
        [data],
        {
          type:"application/json",
        }
      );


    const url =
      URL.createObjectURL(blob);


    const a =
      document.createElement("a");


    a.href = url;


    a.download =
      "flowbiz-invoices.json";


    a.click();
  }


  return(


    <div className="invoiceExportBox">


      <button
        onClick={exportInvoices}
      >


        <Download />


        Export JSON


      </button>


    </div>
  );
}
