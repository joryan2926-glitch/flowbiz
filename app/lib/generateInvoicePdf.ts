import jsPDF from "jspdf";


/* =========================================================
TYPES
========================================================= */


interface InvoiceItem{
  title:string;
  quantity:number;
  price:number;
}


interface GenerateInvoicePdfProps{
  invoiceNumber:string;
  clientName:string;
  company:string;
  email:string;
  dueDate:string;
  items:InvoiceItem[];
  subtotal:number;
  tax:number;
  total:number;
  notes?:string;
}


/* =========================================================
HELPERS
========================================================= */


function formatCurrency(value:number){


  return new Intl.NumberFormat(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR",
    }
  ).format(value);
}


function drawLine(
  doc:jsPDF,
  y:number
){


  doc.setDrawColor(
    90,
    90,
    120
  );


  doc.line(
    15,
    y,
    195,
    y
  );
}


/* =========================================================
PDF GENERATOR
========================================================= */


export async function generateInvoicePdf({
  invoiceNumber,
  clientName,
  company,
  email,
  dueDate,
  items,
  subtotal,
  tax,
  total,
  notes,
}:GenerateInvoicePdfProps):Promise<Blob>{


  const doc =
    new jsPDF({
      orientation:"portrait",
      unit:"mm",
      format:"a4",
    });


  /* =========================================================
  COLORS
  ========================================================= */


  const primary =
    [80,70,255];


  const dark =
    [25,25,40];


  const gray =
    [120,120,140];


  /* =========================================================
  HEADER
  ========================================================= */


  doc.setFillColor(
    primary[0],
    primary[1],
    primary[2]
  );


  doc.rect(
    0,
    0,
    210,
    38,
    "F"
  );


  doc.setTextColor(255);


  doc.setFont(
    "helvetica",
    "bold"
  );


  doc.setFontSize(24);


  doc.text(
    "FLOWBIZ",
    20,
    18
  );


  doc.setFontSize(11);


  doc.setFont(
    "helvetica",
    "normal"
  );


  doc.text(
    "Business OS • Facturation Premium",
    20,
    26
  );


  /* =========================================================
  TITLE
  ========================================================= */


  doc.setTextColor(
    dark[0],
    dark[1],
    dark[2]
  );


  doc.setFontSize(20);


  doc.setFont(
    "helvetica",
    "bold"
  );


  doc.text(
    "FACTURE",
    20,
    55
  );


  /* =========================================================
  INFOS
  ========================================================= */


  doc.setFontSize(11);


  doc.setFont(
    "helvetica",
    "normal"
  );


  doc.setTextColor(
    gray[0],
    gray[1],
    gray[2]
  );


  doc.text(
    `Facture : ${invoiceNumber}`,
    20,
    68
  );


  doc.text(
    `Échéance : ${dueDate || "-"}`,
    20,
    76
  );


  doc.text(
    `Date : ${new Date().toLocaleDateString("fr-FR")}`,
    20,
    84
  );


  /* =========================================================
  CLIENT CARD
  ========================================================= */


  doc.setFillColor(
    245,
    247,
    255
  );


  doc.roundedRect(
    20,
    95,
    170,
    38,
    4,
    4,
    "F"
  );


  doc.setTextColor(
    dark[0],
    dark[1],
    dark[2]
  );


  doc.setFont(
    "helvetica",
    "bold"
  );


  doc.text(
    "CLIENT",
    28,
    108
  );


  doc.setFont(
    "helvetica",
    "normal"
  );


  doc.text(
    clientName,
    28,
    118
  );


  doc.text(
    company || "-",
    28,
    126
  );


  doc.text(
    email,
    28,
    134
  );


  /* =========================================================
  TABLE HEADER
  ========================================================= */


  let y = 155;


  doc.setFillColor(
    primary[0],
    primary[1],
    primary[2]
  );


  doc.roundedRect(
    20,
    y,
    170,
    10,
    2,
    2,
    "F"
  );


  doc.setTextColor(255);


  doc.setFont(
    "helvetica",
    "bold"
  );


  doc.setFontSize(10);


  doc.text(
    "SERVICE",
    25,
    y + 6.5
  );


  doc.text(
    "QTÉ",
    115,
    y + 6.5
  );


  doc.text(
    "PRIX",
    140,
    y + 6.5
  );


  doc.text(
    "TOTAL",
    170,
    y + 6.5
  );


  y += 16;


  /* =========================================================
  ITEMS
  ========================================================= */


  doc.setTextColor(
    dark[0],
    dark[1],
    dark[2]
  );


  doc.setFont(
    "helvetica",
    "normal"
  );


  items.forEach((item)=>{


    const lineTotal =
      item.quantity *
      item.price;


    doc.text(
      item.title || "-",
      25,
      y
    );


    doc.text(
      String(item.quantity),
      118,
      y
    );


    doc.text(
      formatCurrency(item.price),
      140,
      y
    );


    doc.text(
      formatCurrency(lineTotal),
      170,
      y
    );


    y += 10;


    drawLine(
      doc,
      y - 4
    );
  });


  /* =========================================================
  TOTALS
  ========================================================= */


  y += 10;


  doc.setFont(
    "helvetica",
    "bold"
  );


  doc.text(
    "Sous-total",
    130,
    y
  );


  doc.text(
    formatCurrency(subtotal),
    170,
    y
  );


  y += 10;


  doc.text(
    "TVA",
    130,
    y
  );


  doc.text(
    formatCurrency(tax),
    170,
    y
  );


  y += 10;


  doc.setFontSize(14);


  doc.setTextColor(
    primary[0],
    primary[1],
    primary[2]
  );


  doc.text(
    "TOTAL",
    130,
    y
  );


  doc.text(
    formatCurrency(total),
    170,
    y
  );


  /* =========================================================
  NOTES
  ========================================================= */


  if(notes){


    y += 25;


    doc.setFontSize(12);


    doc.setTextColor(
      dark[0],
      dark[1],
      dark[2]
    );


    doc.setFont(
      "helvetica",
      "bold"
    );


    doc.text(
      "NOTES",
      20,
      y
    );


    y += 10;


    doc.setFont(
      "helvetica",
      "normal"
    );


    doc.setFontSize(10);


    const splitNotes =
      doc.splitTextToSize(
        notes,
        165
      );


    doc.text(
      splitNotes,
      20,
      y
    );
  }


  /* =========================================================
  FOOTER
  ========================================================= */


  doc.setFontSize(9);


  doc.setTextColor(
    gray[0],
    gray[1],
    gray[2]
  );


  doc.text(
    "Facture générée automatiquement par FlowBiz",
    20,
    285
  );


  doc.text(
    "https://flowbiz.fr",
    150,
    285
  );


  /* =========================================================
  RETURN BLOB
  ========================================================= */


  return doc.output(
    "blob"
  );
}
