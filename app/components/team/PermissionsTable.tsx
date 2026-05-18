// ======================================================
// components/team/PermissionsTable.tsx
// ======================================================


"use client";


import {
  CheckCircle2,
  XCircle,
} from "lucide-react";


interface Props{


  permissions:any[];
}


export default function PermissionsTable({
  permissions,
}:Props){


  return(


    <div className="permissionsCard">


      <h3>
        Permissions
      </h3>


      <div className="permissionsTable">


        {
          permissions.map(
            (permission,index)=>{


              return(


                <div
                  key={index}
                  className="permissionRow"
                >


                  <strong>
                    {
                      permission.name
                    }
                  </strong>


                  <div>


                    {
                      permission.allowed


                      ? (
                        <span className="allowed">


                          <CheckCircle2
                            size={16}
                          />


                          Autorisé


                        </span>
                      )


                      : (
                        <span className="denied">


                          <XCircle
                            size={16}
                          />


                          Refusé


                        </span>
                      )
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
