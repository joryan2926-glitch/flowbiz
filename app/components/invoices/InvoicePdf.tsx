// ======================================================
// components/invoices/InvoicePdf.tsx
// FLOWBIZ PDF GENERATOR
// ======================================================


"use client";


import jsPDF from "jspdf";


import autoTable
from "jspdf-autotable";


export async function generateInvoicePdf(
  invoice:any
){


  const doc =
    new jsPDF();


  /* ======================================================
  HEADER
  ====================================================== */


  doc.setFontSize(22);


  doc.text(
    "FLOWBIZ",
    14,
    20
  );


  doc.setFontSize(12);


  doc.text(
    "Facture",
    14,
    30
  );


  /* ======================================================
  CLIENT
  ====================================================== */


  doc.text(
    `Client : ${
      invoice.customer_name ||
      "Client"
    }`,
    14,
    45
  );


  doc.text(
    `Facture : ${
      invoice.invoice_number ||
      invoice.id
    }`,
    14,
    55
  );


  /* ======================================================
  TABLE
  ====================================================== */


  autoTable(doc,{


    startY:70,


    head:[[
      "Description",
      "Montant",
    ]],


    body:[[
      invoice.description ||
      "Service FlowBiz",


      `${
        Number(
          invoice.total
        ).toFixed(2)
      } €`,
    ]],
  });


  /* ======================================================
  TOTAL
  ====================================================== */


  doc.setFontSize(16);


  doc.text(


    `TOTAL : ${
      Number(
        invoice.total
      ).toFixed(2)
    } €`,


    14,


    130
  );


  /* ======================================================
  SAVE
  ====================================================== */


  doc.save(


    `facture-${
      invoice.invoice_number ||
      invoice.id
    }.pdf`
  );
}
