// ======================================================
// components/activity/ActivityCard.tsx
// FLOWBIZ ACTIVITY CARD
// FINAL VERSION
// ======================================================


"use client";


import {
  Activity,
  Receipt,
  CreditCard,
  Users,
  Bell,
  Wallet,
} from "lucide-react";


interface Props{


  activity:any;
}


export default function ActivityCard({
  activity,
}:Props){


  function renderIcon(){


    switch(activity.type){


      case "invoice":
        return <Receipt size={18} />;


      case "payment":
        return <CreditCard size={18} />;


      case "client":
        return <Users size={18} />;


      case "notification":
        return <Bell size={18} />;


      case "expense":
        return <Wallet size={18} />;


      default:
        return <Activity size={18} />;
    }
  }


  return(


    <div className="activityCard">


      <div className="activityIcon">


        {renderIcon()}


      </div>


      <div className="activityContent">


        <strong>


          {
            activity.title ||
            "Activité"
          }


        </strong>


        <span>


          {
            activity.message ||
            "Mise à jour FlowBiz"
          }


        </span>


      </div>


      <div className="activityDate">


        {
          activity.created_at
          ? new Date(
              activity.created_at
            ).toLocaleString()
          : "-"
        }


      </div>


    </div>
  );
}
