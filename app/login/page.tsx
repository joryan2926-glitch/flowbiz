"use client";

import "./auth.css";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/app/lib/supabase";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Brain,
  BarChart3,
  Users,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  /*
  ========================================
  STATES
  ========================================
  */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
  ========================================
  AUTO SESSION
  ========================================
  */

  useEffect(() => {

    async function checkSession(){

      const {
        data:{ session },
      } = await supabase
        .auth
        .getSession();

      if(session){

        router.push("/dashboard");
      }
    }

    checkSession();

  },[router]);

  /*
  ========================================
  LOGIN
  ========================================
  */

  async function handleLogin(
    e:React.FormEvent
  ){

    e.preventDefault();

    setError("");

    if(!email || !password){

      setError(
        "Veuillez remplir tous les champs."
      );

      return;
    }

    try{

      setLoading(true);

      const {
        error,
      } = await supabase
        .auth
        .signInWithPassword({

          email,

          password,

        });

      /*
      ========================================
      ERROR
      ========================================
      */

      if(error){

        setError(error.message);

        setLoading(false);

        return;
      }

      /*
      ========================================
      SUCCESS
      ========================================
      */

      router.push("/dashboard");

      router.refresh();

    }catch(err:any){

      setError(
        "Une erreur est survenue."
      );

    }finally{

      setLoading(false);
    }
  }

  return (

    <div className="loginPage">

      {/* BG */}

      <div className="loginGlowOne" />
      <div className="loginGlowTwo" />

      {/* LEFT */}

      <div className="loginLeft">

        <span className="loginBadge">

          <Sparkles />

          FLOWBIZ OS

        </span>

        <h1>

          Gérez votre business
          avec l’IA

        </h1>

        <p>

          CRM, facturation,
          analytics, automatisations,
          gestion clients et
          intelligence artificielle
          réunis dans une seule
          plateforme SaaS.

        </p>

        {/* FEATURES */}

        <div className="featureList">

          <div className="featureItem">

            <CheckCircle2 />

            <span>
              CRM connecté
            </span>

          </div>

          <div className="featureItem">

            <Brain />

            <span>
              Assistant IA intégré
            </span>

          </div>

          <div className="featureItem">

            <BarChart3 />

            <span>
              Analytics business
            </span>

          </div>

          <div className="featureItem">

            <Users />

            <span>
              Gestion équipes
            </span>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="loginRight">

        <div className="loginCard">

          {/* LOGO */}

          <div className="loginLogoBox">

            <img
              src="/flowbiz-logo.png"
              alt="FlowBiz"
              className="loginLogo"
            />

          </div>

          {/* TITLE */}

          <h2>
            Connexion
          </h2>

          <p className="cardDesc">

            Accédez à votre dashboard
            sécurisé FlowBiz.

          </p>

          {/* ERROR */}

          {
            error && (

              <div className="errorBox">

                {error}

              </div>
            )
          }

          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="loginForm"
          >

            {/* EMAIL */}

            <div className="inputBox">

              <Mail />

              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e)=>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </div>

            {/* PASSWORD */}

            <div className="inputBox">

              <Lock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Mot de passe"
                value={password}
                onChange={(e)=>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="eyeBtn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {
                  showPassword
                  ? <EyeOff />
                  : <Eye />
                }

              </button>

            </div>

            {/* OPTIONS */}

            <div className="loginOptions">

              <label>

                <input type="checkbox" />

                Se souvenir de moi

              </label>

              <button
                type="button"
                className="forgotBtn"
                onClick={() =>
                  router.push(
                    "/forgot-password"
                  )
                }
              >

                Mot de passe oublié ?

              </button>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="loginBtn"
              disabled={loading}
            >

              {
                loading ? (

                  <>
                    <Loader2 className="spin" />
                    Connexion...
                  </>

                ) : (

                  <>
                    Connexion
                    <ArrowRight />
                  </>

                )
              }

            </button>

          </form>

          {/* FOOTER */}

          <div className="loginFooter">

            <p>

              Nouveau sur FlowBiz ?

              <button
                type="button"
                className="registerLink"
                onClick={() => {
                  router.push("/register");
                }}
              >
                Créer un compte
              </button>

            </p>

          </div>

          {/* SECURITY */}

          <div className="securityBox">

            <ShieldCheck />

            <span>

              Connexion sécurisée
              par Supabase Auth

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
