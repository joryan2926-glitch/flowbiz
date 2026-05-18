"use client";


import {
  Activity,
  Clock3,
} from "lucide-react";


interface ActivityItem{
  id?:string;
  title?:string;
  message?:string;
  created_at?:string;
}


interface ActivityFeedProps{
  activities?:ActivityItem[];
}


export default function ActivityFeed({
  activities = [],
}:ActivityFeedProps){


  return(


    <section className="activityFeedCard">


      <div className="activityFeedTop">


        <div className="activityFeedTitle">


          <Activity />


          <h3>
            Activité récente
          </h3>


        </div>


      </div>


      <div className="activityFeedList">


        {
          activities.length === 0 && (


            <div className="activityEmpty">


              Aucune activité


            </div>
          )
        }


        {
          activities.map((activity,index)=>(


            <div
              key={
                activity.id || index
              }
              className="activityItem"
            >


              <div className="activityDot" />


              <div className="activityContent">


                <strong>


                  {
                    activity.title ||
                    "Activité"
                  }


                </strong>


                <p>


                  {
                    activity.message ||
                    "-"
                  }


                </p>


                <span>


                  <Clock3 size={14} />


                  {
                    activity.created_at


                    ? new Date(
                        activity.created_at
                      ).toLocaleString()


                    : ""
                  }


                </span>


              </div>


            </div>
          ))
        }


      </div>


    </section>
  );
}
