// ======================================================
// components/team/RolesManager.tsx
// ======================================================


"use client";


import {
  Shield,
  UserCog,
} from "lucide-react";


interface Props{


  roles:any[];
}


export default function RolesManager({
  roles,
}:Props){


  return(


    <div className="rolesManagerCard">


      <div className="rolesHeader">


        <h3>
          Gestion rôles
        </h3>


      </div>


      <div className="rolesGrid">


        {
          roles.map(
            (role,index)=>{


              return(


                <div
                  key={index}
                  className="roleCard"
                >


                  <Shield />


                  <strong>
                    {role.name}
                  </strong>


                  <span>
                    {
                      role.description
                    }
                  </span>


                </div>
              );
            }
          )
        }


      </div>


    </div>
  );
}
