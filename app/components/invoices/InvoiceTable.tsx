// =========================================================
// components/invoices/InvoiceTable.tsx
// FLOWBIZ INVOICE TABLE
// FINAL CONNECTED VERSION
// =========================================================


"use client";


import {
  Eye,
  Edit3,
  Trash2,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";


/* =========================================================
INTERFACES
========================================================= */


interface InvoiceItem{
  title:string;
  quantity:number;
  price:number;
}


interface Invoice{


  id:string;


  invoice_number:string;


  client_name:string;


  email:string;


  company:string;


  status:string;


  total:number;


  subtotal:number;


  tax:number;


  payment_status:string;


  created_at:string;


  due_date:string;


  notes:string;


  stripe_invoice_id:string;


  stripe_payment_link:string;


  stripe_customer_id:string;


  pdf_url:string;


  items:InvoiceItem[];
}


interface InvoiceTableProps{


  invoices:Invoice[];


  onEdit:(invoice:Invoice)=>void;


  onDelete:(id:string)=>void;
}


/* =========================================================
COMPONENT
========================================================= */


export default function InvoiceTable({


  invoices,


  onEdit,


  onDelete,


}:InvoiceTableProps){


  /* =========================================================
  HELPERS
  ========================================================= */


  function getStatusClass(status:string){


    switch(status){


      case "Payée":
        return "paid";


      case "En attente":
        return "pending";


      case "En retard":
        return "late";


      default:
        return "draft";
    }
  }


  function isLate(invoice:Invoice){


    if(
      invoice.payment_status === "paid"
    ){
      return false;
    }


    return new Date(
      invoice.due_date
    ) < new Date();
  }


  /* =========================================================
  EMPTY
  ========================================================= */


  if(!invoices?.length){


    return(


      <div className="invoiceTableEmpty">


        <AlertTriangle />


        <h3>
          Aucune facture
        </h3>


        <p>
          Les factures apparaîtront ici.
        </p>


      </div>
    );
  }


  /* =========================================================
  TABLE
  ========================================================= */


  return(


    <div className="invoiceTableWrapper">


      <table className="invoiceTable">


        <thead>


          <tr>


            <th>
              Facture
            </th>


            <th>
              Client
            </th>


            <th>
              Société
            </th>


            <th>
              Statut
            </th>


            <th>
              Paiement
            </th>


            <th>
              Échéance
            </th>


            <th>
              Total
            </th>


            <th>
              Actions
            </th>


          </tr>


        </thead>


        <tbody>


          {
            invoices.map((invoice)=>{


              const late =
                isLate(invoice);


              return(


                <tr
                  key={invoice.id}
                >


                  {/* =========================================================
                  NUMBER
                  ========================================================= */}


                  <td>


                    <div className="invoiceNumber">


                      <strong>


                        {
                          invoice.invoice_number
                        }


                      </strong>


                      <span>


                        {
                          new Date(
                            invoice.created_at
                          ).toLocaleDateString()
                        }


                      </span>


                    </div>


                  </td>


                  {/* =========================================================
                  CLIENT
                  ========================================================= */}


                  <td>


                    <div className="invoiceClient">


                      <strong>


                        {
                          invoice.client_name
                        }


                      </strong>


                      <span>


                        {
                          invoice.email
                        }


                      </span>


                    </div>


                  </td>


                  {/* =========================================================
                  COMPANY
                  ========================================================= */}


                  <td>


                    {
                      invoice.company || "-"
                    }


                  </td>


                  {/* =========================================================
                  STATUS
                  ========================================================= */}


                  <td>


                    <span
                      className={`invoiceStatus ${getStatusClass(invoice.status)}`}
                    >


                      {
                        invoice.status
                      }


                    </span>


                  </td>


                  {/* =========================================================
                  PAYMENT
                  ========================================================= */}


                  <td>


                    {
                      invoice.payment_status === "paid"


                      ? (


                        <span className="paymentPaid">


                          <CheckCircle2 size={16} />


                          Payé


                        </span>
                      )


                      : late


                      ? (


                        <span className="paymentLate">


                          <AlertTriangle size={16} />


                          Retard


                        </span>
                      )


                      : (


                        <span className="paymentPending">


                          <Clock3 size={16} />


                          En attente


                        </span>
                      )
                    }


                  </td>


                  {/* =========================================================
                  DUE DATE
                  ========================================================= */}


                  <td>


                    {
                      invoice.due_date


                      ? new Date(
                          invoice.due_date
                        ).toLocaleDateString()


                      : "-"
                    }


                  </td>


                  {/* =========================================================
                  TOTAL
                  ========================================================= */}


                  <td>


                    <strong className="invoiceAmount">


                      {
                        Number(
                          invoice.total || 0
                        ).toLocaleString()
                      }€


                    </strong>


                  </td>


                  {/* =========================================================
                  ACTIONS
                  ========================================================= */}


                  <td>


                    <div className="invoiceActions">


                      {/* PDF */}


                      {
                        invoice.pdf_url && (


                          <button
                            onClick={()=>
                              window.open(
                                invoice.pdf_url,
                                "_blank"
                              )
                            }
                            title="Télécharger PDF"
                          >


                            <Download size={16} />


                          </button>
                        )
                      }


                      {/* STRIPE */}


                      {
                        invoice.stripe_payment_link && (


                          <button
                            onClick={()=>
                              window.open(
                                invoice.stripe_payment_link,
                                "_blank"
                              )
                            }
                            title="Paiement Stripe"
                          >


                            <ExternalLink size={16} />


                          </button>
                        )
                      }


                      {/* VIEW */}


                      <button
                        onClick={()=>
                          alert(
                            JSON.stringify(
                              invoice,
                              null,
                              2
                            )
                          )
                        }
                        title="Voir"
                      >


                        <Eye size={16} />


                      </button>


                      {/* EDIT */}


                      <button
                        onClick={()=>
                          onEdit(invoice)
                        }
                        title="Modifier"
                      >


                        <Edit3 size={16} />


                      </button>


                      {/* DELETE */}


                      <button
                        onClick={()=>
                          onDelete(
                            invoice.id
                          )
                        }
                        title="Supprimer"
                        className="danger"
                      >


                        <Trash2 size={16} />


                      </button>


                    </div>


                  </td>


                </tr>
              );
            })
          }


        </tbody>


      </table>


    </div>
  );
}
