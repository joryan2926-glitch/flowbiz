// ======================================================
// components/crm/ClientCard.tsx
// FLOWBIZ CLIENT CARD
// ======================================================


"use client";


import {
  Mail,
  Phone,
  Building2,
  CircleDollarSign,
} from "lucide-react";


interface Props{


  client:any;
}


export default function ClientCard({
  client,
}:Props){


  return(


    <div className="clientCard">


      <div className="clientCardTop">


        <div>


          <h3>


            {
              client.firstname
            }{" "}


            {
              client.lastname
            }


          </h3>


          <span>


            {
              client.pipeline_stage ||
              "Lead"
            }


          </span>


        </div>


      </div>


      <div className="clientCardContent">


        <div>


          <Mail size={16} />


          <span>
            {client.email}
          </span>


        </div>


        <div>


          <Phone size={16} />


          <span>
            {client.phone}
          </span>


        </div>


        <div>


          <Building2 size={16} />


          <span>
            {client.company}
          </span>


        </div>


        <div>


          <CircleDollarSign
            size={16}
          />


          <span>


            {
              client.total_revenue || 0
            }€


          </span>


        </div>


      </div>


    </div>
  );
}
