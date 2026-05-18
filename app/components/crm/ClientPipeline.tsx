// ======================================================
// components/crm/ClientPipeline.tsx
// FLOWBIZ CRM PIPELINE
// ======================================================


"use client";


interface Props{


  clients:any[];
}


export default function ClientPipeline({
  clients,
}:Props){


  const stages = [


    "lead",
    "qualified",
    "proposal",
    "negotiation",
    "won",
  ];


  return(


    <div className="pipelineCard">


      <h3>
        Pipeline CRM
      </h3>


      <div className="pipelineGrid">


        {
          stages.map(
            (stage)=>{


              const stageClients =
                clients.filter(
                  (client)=>


                    client.pipeline_stage ===
                    stage
                );


              return(


                <div
                  key={stage}
                  className="pipelineColumn"
                >


                  <div className="pipelineTop">


                    <strong>
                      {stage}
                    </strong>


                    <span>
                      {
                        stageClients.length
                      }
                    </span>


                  </div>


                  <div className="pipelineClients">


                    {
                      stageClients.map(
                        (client)=>{


                          return(


                            <div
                              key={client.id}
                              className="pipelineClient"
                            >


                              <strong>


                                {
                                  client.firstname
                                }{" "}


                                {
                                  client.lastname
                                }


                              </strong>


                              <span>
                                {
                                  client.company
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
          )
        }


      </div>


    </div>
  );
}
