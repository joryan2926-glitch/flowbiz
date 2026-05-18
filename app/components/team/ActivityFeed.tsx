// ======================================================
// components/team/ActivityFeed.tsx
// ======================================================


"use client";


import {
  Activity,
  Clock3,
} from "lucide-react";


interface Props{


  activities:any[];
}


export default function ActivityFeed({
  activities,
}:Props){


  return(


    <div className="teamActivityCard">


      <h3>
        Activité équipe
      </h3>


      <div className="activityList">


        {
          activities.map(
            (activity,index)=>{


              return(


                <div
                  key={index}
                  className="activityRow"
                >


                  <Activity size={18} />


                  <div>


                    <strong>
                      {
                        activity.title
                      }
                    </strong>


                    <span>
                      {
                        activity.message
                      }
                    </span>


                  </div>


                  <div className="activityDate">


                    <Clock3 size={14} />


                    {
                      new Date(
                        activity.created_at
                      ).toLocaleString()
                    }


                  </div>


                </div>
              );
            }
          )
        }


      </div>


    </div>
  );
}
