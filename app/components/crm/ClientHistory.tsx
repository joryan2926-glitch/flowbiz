"use client";


import {
  Activity,
  Clock3,
} from "lucide-react";


/* =========================================================
INTERFACE
========================================================= */


interface ClientActivity {


  id: string;


  client_id?: string;


  action: string;


  created_at: string;
}


interface Props {


  activities: ClientActivity[];
}


/* =========================================================
COMPONENT
========================================================= */


export default function ClientHistory({
  activities,
}: Props){


  return(


    <div className="crmModuleCard">


      <div className="crmModuleTop">


        <Activity />


        <h3>
          Historique CRM
        </h3>


      </div>


      <div className="crmHistoryList">


        {
          activities?.length > 0


          ? (


            activities.map(
              (activity)=>(
                <div
                  key={activity.id}
                  className="crmHistoryItem"
                >


                  <div className="crmHistoryIcon">


                    <Clock3 size={16} />


                  </div>


                  <div>


                    <strong>
                      {activity.action}
                    </strong>


                    <span>


                      {
                        new Date(
                          activity.created_at
                        ).toLocaleString()
                      }


                    </span>


                  </div>


                </div>
              )
            )


          ) : (


            <div className="crmEmptyState">


              Aucune activité


            </div>
          )
        }


      </div>


    </div>
  );
}
