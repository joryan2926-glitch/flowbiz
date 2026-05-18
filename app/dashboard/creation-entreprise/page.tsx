// =========================================================
// app/dashboard/creation-entreprise/page.tsx
// FLOWBIZ CREATION ENTREPRISE
// FINAL CONNECTED PREMIUM VERSION
// =========================================================


"use client";


import "./creation-entreprise.css";


import {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";


import {
  Sparkles,
  Building2,
  Briefcase,
  CheckCircle2,
  BrainCircuit,
  Rocket,
  Target,
  Clock3,
  Search,
  TrendingUp,
  BarChart3,
  Layers3,
  Loader2,
  RefreshCw,
  AlertTriangle,
  Save,
  CircleDollarSign,
} from "lucide-react";


import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


import { supabase }
from "@/app/lib/supabase";


/* =========================================================
INTERFACES
========================================================= */


interface Project{
  id:string;
  company_name:string;
  founder_name:string;
  email:string;
  phone:string;
  legal_form:string;
  status:string;
  capital:number;
  funding_needed:number;
  business_sector:string;
  city:string;
  progress:number;
  created_at:string;
}


interface Activity{
  id:string;
  action:string;
  created_at:string;
}


interface Notification{
  id:string;
  title:string;
  message:string;
  type:string;
}


interface Step{
  label:string;
  completed:boolean;
}


/* =========================================================
PAGE
========================================================= */


export default function CreationEntreprisePage(){


  /* =========================================================
  STATES
  ========================================================= */


  const [loading,setLoading] =
    useState(true);


  const [saving,setSaving] =
    useState(false);


  const [refreshing,setRefreshing] =
    useState(false);


  const [errorMessage,setErrorMessage] =
    useState("");


  const [projects,setProjects] =
    useState<Project[]>([]);


  const [activities,setActivities] =
    useState<Activity[]>([]);


  const [notifications,setNotifications] =
    useState<Notification[]>([]);


  const [selectedForm,setSelectedForm] =
    useState("SASU");


  const [showModal,setShowModal] =
    useState(false);


  const [search,setSearch] =
    useState("");


  const [editingProject,
    setEditingProject] =
    useState<Project | null>(null);


  /* =========================================================
  FORM STATES
  ========================================================= */


  const [companyName,setCompanyName] =
    useState("");


  const [founderName,setFounderName] =
    useState("");


  const [email,setEmail] =
    useState("");


  const [phone,setPhone] =
    useState("");


  const [city,setCity] =
    useState("");


  const [sector,setSector] =
    useState("");


  const [capital,setCapital] =
    useState("");


  const [funding,setFunding] =
    useState("");


  const [status,setStatus] =
    useState("Analyse");


  /* =========================================================
  FORMS
  ========================================================= */


  const forms = [


    {
      name:"SASU",
      desc:"Structure premium flexible",
      tax:"IS",
      capital:"Libre",
      color:"purple",
    },


    {
      name:"EURL",
      desc:"Structure sécurisée",
      tax:"IR / IS",
      capital:"Libre",
      color:"blue",
    },


    {
      name:"SAS",
      desc:"Projet associé",
      tax:"IS",
      capital:"Libre",
      color:"pink",
    },


    {
      name:"SARL",
      desc:"Cadre classique",
      tax:"IR / IS",
      capital:"Libre",
      color:"green",
    },
  ];


  /* =========================================================
  LOAD DATA
  ========================================================= */


  const loadData =
    useCallback(async()=>{


      try{


        setRefreshing(true);


        const [
          projectsRes,
          activitiesRes,
          notificationsRes,
        ] = await Promise.all([


          supabase


            .from(
              "creation_projects"
            )


            .select("*")


            .order(
              "created_at",
              {
                ascending:false,
              }
            ),


          supabase


            .from(
              "activity"
            )


            .select("*")


            .order(
              "created_at",
              {
                ascending:false,
              }
            )
            .limit(10),


          supabase


            .from(
              "notifications"
            )


            .select("*")


            .order(
              "created_at",
              {
                ascending:false,
              }
            )
            .limit(6),
        ]);


        setProjects(
          projectsRes.data || []
        );


        setActivities(
          activitiesRes.data || []
        );


        setNotifications(
          notificationsRes.data || []
        );


      }catch(error:any){


        console.log(error);


        setErrorMessage(
          error.message ||
          "Erreur chargement"
        );


      }finally{


        setLoading(false);


        setRefreshing(false);
      }


    },[]);


  /* =========================================================
  INIT
  ========================================================= */


  useEffect(()=>{


    loadData();


  },[
    loadData,
  ]);


  /* =========================================================
  REALTIME
  ========================================================= */


  useEffect(()=>{


    const channel =


      supabase


        .channel(
          "creation-live"
        )


        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"creation_projects",
          },


          ()=>{
            loadData();
          }
        )


        .subscribe();


    return ()=>{


      supabase.removeChannel(
        channel
      );
    };


  },[
    loadData,
  ]);


  /* =========================================================
  RESET
  ========================================================= */


  function resetForm(){


    setCompanyName("");
    setFounderName("");
    setEmail("");
    setPhone("");
    setCity("");
    setSector("");
    setCapital("");
    setFunding("");
    setStatus("Analyse");


    setEditingProject(null);
  }


  /* =========================================================
  SAVE PROJECT
  ========================================================= */


  async function saveProject(){


    try{


      if(
        !companyName ||
        !founderName
      ){
        return;
      }


      setSaving(true);


      const payload = {


        company_name:
          companyName,


        founder_name:
          founderName,


        email,


        phone,


        city,


        business_sector:
          sector,


        legal_form:
          selectedForm,


        capital:Number(
          capital || 0
        ),


        funding_needed:
          Number(
            funding || 0
          ),


        status,


        progress:25,
      };


      if(editingProject){


        await supabase


          .from(
            "creation_projects"
          )


          .update(payload)


          .eq(
            "id",
            editingProject.id
          );


      }else{


        await supabase


          .from(
            "creation_projects"
          )


          .insert([
            payload,
          ]);


        await supabase


          .from(
            "notifications"
          )


          .insert([


            {
              title:
                "Nouveau projet",


              message:
                `${companyName} ajouté`,


              type:"success",
            },
          ]);


        await supabase


          .from(
            "activity"
          )


          .insert([


            {
              action:
                `${companyName} lancé`,
            },
          ]);
      }


      await loadData();


      setShowModal(false);


      resetForm();


    }catch(error){


      console.log(error);


    }finally{


      setSaving(false);
    }
  }


  /* =========================================================
  KPI
  ========================================================= */


  const totalProjects =
    projects.length;


  const totalFunding =


    projects.reduce(
      (
        acc,
        project
      )=>


        acc +
        Number(
          project.funding_needed || 0
        ),


      0
    );


  const avgProgress =


    projects.length > 0


    ? Math.round(


      projects.reduce(
        (
          acc,
          project
        )=>


          acc +
          Number(
            project.progress || 0
          ),


        0
      ) / projects.length
    )


    : 0;


  /* =========================================================
  FILTER
  ========================================================= */


  const filteredProjects =
    useMemo(()=>{


      return projects.filter(
        (project)=>


          project.company_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )


          ||


          project.founder_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )


          ||


          project.legal_form
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );


    },[
      projects,
      search,
    ]);


  /* =========================================================
  CHART DATA
  ========================================================= */


  const chartData =


    projects.map(
      (project,index)=>({


        month:`P${index + 1}`,


        funding:
          project.funding_needed,


        capital:
          project.capital,
      })
    );


  /* =========================================================
  STEPS
  ========================================================= */


  const steps:Step[] = [


    {
      label:"Analyse projet",
      completed:true,
    },


    {
      label:"Choix juridique",
      completed:true,
    },


    {
      label:"Prévisionnel",
      completed:true,
    },


    {
      label:"Dépôt capital",
      completed:false,
    },


    {
      label:"Statuts",
      completed:false,
    },


    {
      label:"Immatriculation",
      completed:false,
    },
  ];


  /* =========================================================
  LOADER
  ========================================================= */


  if(loading){


    return(


      <div className="creationLoader">


        <Loader2 className="spin" />


      </div>
    );
  }


  return(


    <div className="creationMain">


      <div className="creationGlowOne" />
      <div className="creationGlowTwo" />


      <header className="creationTopbar">


        <div>


          <span className="creationBadge">


            <Sparkles />


            FLOWBIZ STARTUP OS


          </span>


          <h1>


            Création
            <span>
              d’entreprise
            </span>


          </h1>


          <p>


            Automatisation juridique,
            financière et stratégique.


          </p>


        </div>


        <div className="topbarActions">


          <div className="searchBox">


            <Search size={16} />


            <input
              type="text"
              placeholder="Recherche..."
              value={search}
              onChange={(e)=>
                setSearch(
                  e.target.value
                )
              }
            />


          </div>


          <button
            className="refreshBtn"
            onClick={loadData}
          >


            {
              refreshing


              ? (
                <Loader2 className="spin" />
              )


              : (
                <RefreshCw />
              )
            }


          </button>


          <button
            className="iaButton"
            onClick={()=>{
              resetForm();
              setShowModal(true);
            }}
          >


            <Rocket size={16} />


            Nouveau projet


          </button>


        </div>


      </header>


      {
        errorMessage && (


          <div className="creationError">


            <AlertTriangle />


            {errorMessage}


          </div>
        )
      }


      <section className="creationHero">


        <div className="heroLeft">


          <span className="heroMini">


            CEO Automation Experience


          </span>


          <h2>


            Créez votre
            <span>
              entreprise
            </span>


            <br />


            avec FlowBiz IA


          </h2>


          <p>


            Juridique, branding,
            financement, automatisation,
            prévisionnel financier,
            statuts et pilotage intelligent.


          </p>


          <div className="heroButtons">


            <button className="primaryBtn">


              <Rocket size={18} />


              Démarrer


            </button>


            <button className="secondaryBtn">


              <BrainCircuit size={18} />


              IA stratégique


            </button>


          </div>


        </div>


        <div className="heroRight">


          <div className="flowCube">


            <div className="cubeGlow"></div>


            <Building2 size={64} />


          </div>


        </div>


      </section>


    </div>
  );
}
