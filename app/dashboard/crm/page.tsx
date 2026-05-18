"use client";


/* ======================================================
FLOWBIZ CRM
FINAL MULTI TENANT SaaS VERSION
NEXT 15 + SUPABASE
====================================================== */


import "./crm.css";


import {
  useEffect,
  useState,
} from "react";


import {
  supabase,
} from "../../lib/supabase";


import {
  getOrganization,
} from "../../lib/auth";


import {


  Users,
  Plus,
  Loader2,
  Building2,
  Mail,
  Phone,
  DollarSign,
  Search,
  Filter,
  TrendingUp,
  Activity,
  Brain,
  CalendarDays,


} from "lucide-react";


/* ======================================================
INTERFACE
====================================================== */


interface Client{


  id:string;


  full_name:string;


  email:string;


  phone:string;


  company:string;


  value:number;


  pipeline_stage:string;


  status:string;


  created_at:string;
}


/* ======================================================
PAGE
====================================================== */


export default function CRMPage(){


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


    clients,
    setClients,


  ] =
    useState<Client[]>([]);


  const [


    search,
    setSearch,


  ] =
    useState("");


  const [


    activeWorkspace,
    setActiveWorkspace,


  ] =
    useState("");


  const [


    form,
    setForm,


  ] =
    useState({


      full_name:"",
      email:"",
      phone:"",
      company:"",
      value:"",
    });


  /*
  ====================================================
  INIT
  ====================================================
  */


  useEffect(()=>{


    initializeCRM();


  },[]);


  async function initializeCRM(){


    await loadWorkspace();


    await loadClients();
  }


  /*
  ====================================================
  LOAD WORKSPACE
  ====================================================
  */


  async function loadWorkspace(){


    try{


      const organization =
        await getOrganization();


      if(
        !organization ||
        !organization.organizations?.id
      ){


        return;
      }


      const {


        data,
        error,


      } =


        await supabase


          .from("workspaces")


          .select("*")


          .eq(
            "organization_id",
            organization.organizations.id
          )


          .limit(1)


          .single();


      if(error){


        console.log(error);


        return;
      }


      if(data){


        setActiveWorkspace(
          data.id
        );
      }


    }catch(error){


      console.log(error);
    }
  }


  /*
  ====================================================
  LOAD CLIENTS
  ====================================================
  */


  async function loadClients(){


    try{


      const organization =
        await getOrganization();


      if(
        !organization ||
        !organization.organizations?.id
      ){


        return;
      }


      const {


        data,
        error,


      } =


        await supabase


          .from("crm_clients")


          .select("*")


          .eq(
            "organization_id",
            organization.organizations.id
          )


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


      setClients(
        data || []
      );


    }catch(error){


      console.log(error);


    }finally{


      setLoading(false);
    }
  }


  /*
  ====================================================
  CREATE CLIENT
  ====================================================
  */


  async function createClient(){


    try{


      /*
      ================================================
      VALIDATION
      ================================================
      */


      if(


        !form.full_name ||


        !form.email ||


        !form.company


      ){


        alert(
          "Veuillez remplir les champs."
        );


        return;
      }


      /*
      ================================================
      USER
      ================================================
      */


      const {


        data:{ user },


      } =


        await supabase.auth.getUser();


      if(!user){


        console.log(
          "No user"
        );


        return;
      }


      /*
      ================================================
      ORGANIZATION
      ================================================
      */


      const organization =
        await getOrganization();


      if(
        !organization ||
        !organization.organizations?.id
      ){


        console.log(
          "No organization"
        );


        return;
      }


      /*
      ================================================
      API
      ================================================
      */


      const response =


        await fetch(


          "/api/crm/create",


          {


            method:"POST",


            headers:{


              "Content-Type":
                "application/json",
            },


            body:JSON.stringify({


              full_name:
                form.full_name,


              email:
                form.email,


              phone:
                form.phone,


              company:
                form.company,


              value:
                Number(form.value),


              organization_id:
                organization
                  .organizations
                  .id,


              workspace_id:
                activeWorkspace,


              created_by:
                user.id,
            }),
          }
        );


      const result =
        await response.json();


      /*
      ================================================
      ERROR
      ================================================
      */


      if(!response.ok){


        console.log(
          result.error
        );


        return;
      }


      /*
      ================================================
      RESET
      ================================================
      */


      setForm({


        full_name:"",
        email:"",
        phone:"",
        company:"",
        value:"",
      });


      /*
      ================================================
      RELOAD
      ================================================
      */


      await loadClients();


    }catch(error){


      console.log(error);
    }
  }


  /*
  ====================================================
  FILTERED CLIENTS
  ====================================================
  */


  const filteredClients =


    clients.filter(


      (client)=>


        client.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )


        ||


        client.company
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );


  /*
  ====================================================
  METRICS
  ====================================================
  */


  const totalRevenue =


    clients.reduce(


      (acc,client)=>


        acc +
        Number(
          client.value || 0
        ),


      0
    );


  /*
  ====================================================
  LOADER
  ====================================================
  */


  if(loading){


    return(


      <div className="crmLoader">


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


    <div className="crmPage">


      {/* ==================================================
      TOPBAR
      ================================================== */}


      <header className="crmTopbar">


        <div>


          <div className="crmBadge">


            <Brain size={16} />


            FLOWBIZ CRM


          </div>


          <h1>


            Smart CRM Dashboard


          </h1>


          <p>


            Gestion intelligente
            des clients,
            pipeline commercial
            et analytics.


          </p>


        </div>


      </header>


      {/* ==================================================
      STATS
      ================================================== */}


      <section className="crmStats">


        <div className="crmStatCard">


          <div className="crmStatIcon">


            <Users />


          </div>


          <div>


            <span>


              Clients


            </span>


            <strong>


              {clients.length}


            </strong>


          </div>


        </div>


        {/* ============================================== */}


        <div className="crmStatCard">


          <div className="crmStatIcon purple">


            <DollarSign />


          </div>


          <div>


            <span>


              Revenue


            </span>


            <strong>


              {


                totalRevenue
                  .toLocaleString()


              } €


            </strong>


          </div>


        </div>


        {/* ============================================== */}


        <div className="crmStatCard">


          <div className="crmStatIcon green">


            <TrendingUp />


          </div>


          <div>


            <span>


              Conversion


            </span>


            <strong>


              +28%


            </strong>


          </div>


        </div>


        {/* ============================================== */}


        <div className="crmStatCard">


          <div className="crmStatIcon orange">


            <Activity />


          </div>


          <div>


            <span>


              Activité


            </span>


            <strong>


              Live


            </strong>


          </div>


        </div>


      </section>


      {/* ==================================================
      ACTIONS
      ================================================== */}


      <section className="crmActions">


        <div className="crmSearch">


          <Search size={18} />


          <input


            type="text"


            placeholder="
            Rechercher un client...
            "


            value={search}


            onChange={(e)=>


              setSearch(
                e.target.value
              )
            }
          />


        </div>


        <button className="crmFilterButton">


          <Filter size={18} />


          Filtrer


        </button>


      </section>


      {/* ==================================================
      CREATE
      ================================================== */}


      <section className="crmCreate">


        <input


          type="text"


          placeholder="Nom complet"


          value={form.full_name}


          onChange={(e)=>


            setForm({


              ...form,


              full_name:
                e.target.value,
            })
          }
        />


        <input


          type="email"


          placeholder="Email"


          value={form.email}


          onChange={(e)=>


            setForm({


              ...form,


              email:
                e.target.value,
            })
          }
        />


        <input


          type="text"


          placeholder="Téléphone"


          value={form.phone}


          onChange={(e)=>


            setForm({


              ...form,


              phone:
                e.target.value,
            })
          }
        />


        <input


          type="text"


          placeholder="Entreprise"


          value={form.company}


          onChange={(e)=>


            setForm({


              ...form,


              company:
                e.target.value,
            })
          }
        />


        <input


          type="number"


          placeholder="Valeur €"


          value={form.value}


          onChange={(e)=>


            setForm({


              ...form,


              value:
                e.target.value,
            })
          }
        />


        <button
          onClick={createClient}
        >


          <Plus size={18} />


          Ajouter


        </button>


      </section>


      {/* ==================================================
      GRID
      ================================================== */}


      <section className="crmGrid">


        {


          filteredClients.map(


            (client)=>(


              <div


                key={client.id}


                className="crmCard"
              >


                <div className="crmCardHeader">


                  <div className="crmAvatar">


                    {


                      client.full_name
                        ?.charAt(0)
                    }


                  </div>


                  <div>


                    <strong>


                      {
                        client.full_name
                      }


                    </strong>


                    <span>


                      {
                        client.company
                      }


                    </span>


                  </div>


                </div>


                {/* ========================== */}


                <div className="crmInfos">


                  <div>


                    <Mail size={16} />


                    {
                      client.email
                    }


                  </div>


                  <div>


                    <Phone size={16} />


                    {
                      client.phone
                    }


                  </div>


                  <div>


                    <Building2 size={16} />


                    {
                      client.company
                    }


                  </div>


                  <div>


                    <DollarSign size={16} />


                    {
                      client.value
                    } €


                  </div>


                  <div>


                    <CalendarDays
                      size={16}
                    />


                    {


                      new Date(
                        client.created_at
                      )


                      .toLocaleDateString()
                    }


                  </div>


                </div>


                {/* ========================== */}


                <div className="crmFooter">


                  <div className="crmStage">


                    {
                      client.pipeline_stage
                    }


                  </div>


                  <div className="crmStatus">


                    {
                      client.status
                    }


                  </div>


                </div>


              </div>
            )
          )
        }


      </section>


    </div>
  );
}
