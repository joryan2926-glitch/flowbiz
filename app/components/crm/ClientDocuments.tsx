"use client";


import {
  FolderOpen,
  Upload,
  FileText,
} from "lucide-react";


/* =========================================================
PROPS
========================================================= */


interface Props {


  clientId?: string;
}


/* =========================================================
COMPONENT
========================================================= */


export default function ClientDocuments({
  clientId,
}: Props){


  return(


    <section className="crmDocumentsCard">


      <div className="crmDocumentsTop">


        <div className="crmDocumentsTitle">


          <FolderOpen />


          <h3>
            Documents clients
          </h3>


        </div>


        <button className="uploadDocumentBtn">


          <Upload size={16} />


          Upload


        </button>


      </div>


      <div className="crmDocumentsBody">


        {
          clientId


          ? (


            <div className="crmDocumentItem">


              <FileText size={18} />


              <div>


                <strong>
                  Documents liés
                </strong>


                <span>
                  Client ID : {clientId}
                </span>


              </div>


            </div>


          )


          : (


            <div className="crmEmptyDocuments">


              Aucun client sélectionné


            </div>
          )
        }


      </div>


    </section>
  );
}
