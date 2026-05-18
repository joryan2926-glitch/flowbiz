// ======================================================
// components/activity/ActivityTimeline.tsx
// FLOWBIZ ACTIVITY TIMELINE
// ======================================================


"use client";


import ActivityCard
from "./ActivityCard";


interface Props{


  activities:any[];
}


export default function ActivityTimeline({
  activities,
}:Props){


  return(


    <section className="activityTimeline">


      <div className="activityTimelineTop">


        <h3>
          Timeline activité
        </h3>


      </div>


      <div className="activityTimelineList">


        {
          activities.map(
            (activity,index)=>{


              return(


                <div
                  key={index}
                  className="timelineRow"
                >


                  <div className="timelineLine" />


                  <ActivityCard
                    activity={activity}
                  />


                </div>
              );
            }
          )
        }


      </div>


    </section>
  );
}
