// ======================================================
// components/invoices/InvoiceActions.tsx
// FLOWBIZ INVOICE ACTIONS
// ======================================================


"use client";


import {
  Download,
  Send,
  Trash2,
  Eye,
} from "lucide-react";


interface Props{


  invoice:any;


  onView?:()=>void;


  onDelete?:()=>void;


  onDownload?:()=>void;


  onSend?:()=>void;
}


export default function InvoiceActions({
  onView,
  onDelete,
  onDownload,
  onSend,
}:Props){


  return(


    <div className="invoiceActions">


      <button
        onClick={onView}
      >


        <Eye size={16} />


      </button>


      <button
        onClick={onDownload}
      >


        <Download size={16} />


      </button>


      <button
        onClick={onSend}
      >


        <Send size={16} />


      </button>


      <button
        onClick={onDelete}
      >


        <Trash2 size={16} />


      </button>


    </div>
  );
}
