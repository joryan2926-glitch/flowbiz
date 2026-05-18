"use client";

/* ======================================================
FLOWBIZ CRM PIPELINE
REALTIME DRAG & DROP
====================================================== */

import "./crm-pipeline.css";

import {

  useEffect,
  useState,

} from "react";

import {

  supabase,

} from "../../../lib/supabase";

import {

  BrainCircuit,
  DollarSign,
  Mail,
  Building2,
  Loader2,

} from "lucide-react";

import {

  DragDropContext,
  Droppable,
  Draggable,

} from "@hello-pangea/dnd";

/* ======================================================
INTERFACE
====================================================== */

interface Deal{

  id:string;

  full_name:string;

  company:string;

  email:string;

  value:number;

  stage:string;
}

/* ======================================================
STAGES
====================================================== */

const stages = [

  {
    id:"lead",
    title:"Leads",
  },

  {
    id:"qualified",
    title:"Qualifiés",
  },

  {
    id:"proposal",
    title:"Propositions",
  },

  {
    id:"won",
    title:"Gagnés",
  },
];

/* ======================================================
PAGE
====================================================== */

export default function PipelinePage(){

  /*
  ====================================================
  STATES
  ====================================================
  */

  const [

    loading,
    setLoading,

  ] =
    useState(true);

  const [

    deals,
    setDeals,

  ] =
    useState<Deal[]>([]);

  /*
  ====================================================
  LOAD
  ====================================================
  */

  useEffect(()=>{

    loadDeals();

    realtime();

  },[]);

  async function loadDeals(){

    try{

      const {

        data,
        error,

      } =

        await supabase

          .from("crm_pipeline")

          .select("*")

          .order(
            "created_at",
            {
              ascending:false,
            }
          );

      if(error){

        console.log(error);

        return;
      }

      setDeals(data || []);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);
    }
  }

  /*
  ====================================================
  REALTIME
  ====================================================
  */

  function realtime(){

    supabase

      .channel(
        "crm-pipeline-live"
      )

      .on(

        "postgres_changes",

        {

          event:"*",

          schema:"public",

          table:"crm_pipeline",
        },

        ()=>{

          loadDeals();
        }
      )

      .subscribe();
  }

  /*
  ====================================================
  DRAG END
  ====================================================
  */

  async function onDragEnd(
    result:any
  ){

    if(
      !result.destination
    ) return;

    const dealId =
      result.draggableId;

    const newStage =
      result.destination
        .droppableId;

    /*
    ================================================
    UPDATE SUPABASE
    ================================================
    */

    await supabase

      .from("crm_pipeline")

      .update({

        stage:newStage,
      })

      .eq(
        "id",
        dealId
      );

    /*
    ================================================
    LOCAL UPDATE
    ================================================
    */

    setDeals(

      prev =>

        prev.map(

          deal =>

            deal.id === dealId

            ? {

                ...deal,

                stage:newStage,
              }

            : deal
        )
    );
  }

  /*
  ====================================================
  GET DEALS
  ====================================================
  */

  function getDeals(
    stage:string
  ){

    return deals.filter(

      deal =>

        deal.stage === stage
    );
  }

  /*
  ====================================================
  TOTAL
  ====================================================
  */

  function getStageValue(
    stage:string
  ){

    return getDeals(stage)

      .reduce(

        (acc,deal)=>

          acc + (
            Number(deal.value)
            || 0
          ),

        0
      );
  }

  /*
  ====================================================
  LOADING
  ====================================================
  */

  if(loading){

    return(

      <div className="pipelineLoader">

        <Loader2
          className="spin"
        />

      </div>
    );
  }

  /*
  ====================================================
  UI
  ====================================================
  */

  return(

    <div className="pipelinePage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="pipelineHeader">

        <div>

          <div className="pipelineBadge">

            <BrainCircuit
              size={16}
            />

            FLOWBIZ PIPELINE

          </div>

          <h1>

            Smart Sales Pipeline

          </h1>

          <p>

            Pipeline commercial
            drag & drop
            connecté temps réel.

          </p>

        </div>

      </header>

      {/* ==================================================
      BOARD
      ================================================== */}

      <DragDropContext
        onDragEnd={onDragEnd}
      >

        <section className="pipelineBoard">

          {
            stages.map(

              stage => (

                <Droppable

                  droppableId={
                    stage.id
                  }

                  key={stage.id}
                >

                  {(provided)=>(

                    <div

                      className="pipelineColumn"

                      ref={
                        provided.innerRef
                      }

                      {

                        ...provided
                          .droppableProps
                      }
                    >

                      {/* ======================
                      TOP
                      ====================== */}

                      <div className="pipelineColumnTop">

                        <div>

                          <h3>

                            {
                              stage.title
                            }

                          </h3>

                          <span>

                            {
                              getDeals(
                                stage.id
                              ).length
                            }

                          </span>

                        </div>

                        <strong>

                          {

                            getStageValue(
                              stage.id
                            )

                            .toLocaleString()

                          } €

                        </strong>

                      </div>

                      {/* ======================
                      DEALS
                      ====================== */}

                      <div className="pipelineDeals">

                        {

                          getDeals(stage.id)

                          .map(

                            (
                              deal,
                              index
                            ) => (

                              <Draggable

                                key={deal.id}

                                draggableId={
                                  deal.id
                                }

                                index={index}
                              >

                                {(provided)=>(

                                  <div

                                    className="dealCard"

                                    ref={
                                      provided.innerRef
                                    }

                                    {

                                      ...provided
                                        .draggableProps
                                    }

                                    {

                                      ...provided
                                        .dragHandleProps
                                    }
                                  >

                                    {/* ==========
                                    NAME
                                    ========== */}

                                    <h4>

                                      {
                                        deal.full_name
                                      }

                                    </h4>

                                    {/* ==========
                                    COMPANY
                                    ========== */}

                                    <div className="dealInfo">

                                      <Building2
                                        size={14}
                                      />

                                      {
                                        deal.company
                                      }

                                    </div>

                                    {/* ==========
                                    EMAIL
                                    ========== */}

                                    <div className="dealInfo">

                                      <Mail
                                        size={14}
                                      />

                                      {
                                        deal.email
                                      }

                                    </div>

                                    {/* ==========
                                    VALUE
                                    ========== */}

                                    <div className="dealValue">

                                      <DollarSign
                                        size={16}
                                      />

                                      {

                                        Number(
                                          deal.value
                                        )

                                        .toLocaleString()

                                      } €

                                    </div>

                                  </div>
                                )}

                              </Draggable>
                            )
                          )
                        }

                        {
                          provided.placeholder
                        }

                      </div>

                    </div>
                  )}

                </Droppable>
              )
            )
          }

        </section>

      </DragDropContext>

    </div>
  );
}
