// ======================================================
// components/team/TeamMembers.tsx
// FLOWBIZ TEAM MEMBERS
// ======================================================


"use client";


import {
  Mail,
  Shield,
  CircleDot,
} from "lucide-react";


interface Props{


  members:any[];
}


export default function TeamMembers({
  members,
}:Props){


  return(


    <div className="teamMembersCard">


      <div className="teamHeader">


        <h3>
          Membres équipe
        </h3>


      </div>


      <div className="teamMembersList">


        {
          members.map(
            (member)=>{


              return(


                <div
                  key={member.id}
                  className="teamMemberRow"
                >


                  <div className="teamMemberLeft">


                    <div className="teamAvatar">


                      {
                        member.firstname?.[0]
                      }


                    </div>


                    <div>


                      <strong>


                        {
                          member.firstname
                        }{" "}


                        {
                          member.lastname
                        }


                      </strong>


                      <span>


                        <Mail size={14} />


                        {member.email}


                      </span>


                    </div>


                  </div>


                  <div className="teamMemberRight">


                    <span className="roleBadge">


                      <Shield size={14} />


                      {member.role}


                    </span>


                    <span className="statusOnline">


                      <CircleDot size={14} />


                      En ligne


                    </span>


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
