"use client";

import "./ClientTable.css";

import {
  Mail,
  Phone,
  Building2,
  BadgeEuro,
  Receipt,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react";


import Link from "next/link";


/* =========================================================
INTERFACES
========================================================= */


interface Client {


  id: string;


  name: string;


  email: string;


  phone: string;


  company: string;


  city: string;


  country: string;


  status: string;


  revenue: number;
}


interface Invoice {


  id: string;


  client_id: string;


  total: number;
}


interface Subscription {


  id: string;


  client_id: string;


  plan: string;


  amount: number;
}


interface Props {


  clients: Client[];


  invoices: Invoice[];


  subscriptions: Subscription[];


  onEdit?: (
    client: Client
  ) => void;


  onDelete?: (
    id: string
  ) => void;
}


/* =========================================================
COMPONENT
========================================================= */


export default function ClientTable({


  clients,


  invoices,


  subscriptions,


  onEdit,


  onDelete,


}: Props){


  function getRevenue(
    clientId: string
  ){


    return invoices


      ?.filter(
        (invoice)=>


          invoice.client_id ===
          clientId
      )


      ?.reduce(
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
  }


  function getInvoices(
    clientId: string
  ){


    return invoices?.filter(
      (invoice)=>


        invoice.client_id ===
        clientId
    ).length;
  }


  function getSubscription(
    clientId: string
  ){


    return subscriptions?.find(
      (subscription)=>


        subscription.client_id ===
        clientId
    );
  }


  return(


    <section className="clientsGrid">


      {
        clients?.map(
          (client)=>{


            const subscription =
              getSubscription(
                client.id
              );


            return(


              <div
                key={client.id}
                className="clientCard"
              >


                <div className="clientCardTop">


                  <div className="clientAvatar">


                    {
                      client.name
                        ?.charAt(0)
                    }


                  </div>


                  <div>


                    <h3>
                      {client.name}
                    </h3>


                    <span>
                      {client.company}
                    </span>


                  </div>


                </div>


                <div className="clientInfos">


                  <div>


                    <Mail size={16} />


                    {client.email}


                  </div>


                  <div>


                    <Phone size={16} />


                    {client.phone}


                  </div>


                  <div>


                    <Building2 size={16} />


                    {client.city}
                    {" • "}
                    {client.country}


                  </div>


                  <div>


                    <BadgeEuro size={16} />


                    {
                      getRevenue(
                        client.id
                      )?.toLocaleString()
                    }€


                  </div>


                  <div>


                    <Receipt size={16} />


                    {
                      getInvoices(
                        client.id
                      )
                    }


                    {" "}
                    factures


                  </div>


                </div>


                {
                  subscription && (


                    <div className="subscriptionBox">


                      <strong>


                        {
                          subscription.plan
                        }


                      </strong>


                      <span>


                        {
                          subscription.amount
                        }€


                      </span>


                    </div>
                  )
                }


                <div className="clientActions">


                  <Link
                    href={`/dashboard/clients/${client.id}`}
                  >


                    <button>


                      <Eye size={16} />


                    </button>


                  </Link>


                  <button
                    onClick={()=>
                      onEdit?.(client)
                    }
                  >


                    <Edit3 size={16} />


                  </button>


                  <button
                    onClick={()=>
                      onDelete?.(
                        client.id
                      )
                    }
                  >


                    <Trash2 size={16} />


                  </button>


                </div>


              </div>
            );
          }
        )
      }


    </section>
  );
}
