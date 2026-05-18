"use client";

import "./register.css";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/app/lib/supabase";

import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export default function RegisterPage() {

  const router = useRouter();

  /*
  =========================================
  STATES
  =========================================
  */

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /*
  =========================================
  REGISTER
  =========================================
  */

  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setError("");

    setSuccess("");

    /*
    =========================================
    VALIDATION
    =========================================
    */

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      setError(
        "Veuillez remplir tous les champs."
      );

      return;
    }

    if (password.length < 6) {

      setError(
        "Le mot de passe doit contenir au moins 6 caractères."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {

      setError(
        "Les mots de passe ne correspondent pas."
      );

      return;
    }

    try {

      setLoading(true);

      /*
      =========================================
      SUPABASE SIGNUP
      =========================================
      */

      const {
        data,
        error,
      } = await supabase.auth.signUp({

        email,

        password,

        options: {

          data: {

            full_name: fullName,

          },

        },

      });

      /*
      =========================================
      ERROR
      =========================================
      */

      if (error) {

        setError(error.message);

        setLoading(false);

        return;
      }

      /*
      =========================================
      PROFILE INSERT
      =========================================
      */

      if (data.user) {

        await supabase
          .from("profiles")
          .upsert({

            id: data.user.id,

            full_name: fullName,

            email: email,

            plan: "free",

            role: "user",

            created_at:
              new Date().toISOString(),

          });

      }

      /*
      =========================================
      SUCCESS
      =========================================
      */

      setSuccess(
        "Compte créé avec succès."
      );

      /*
      =========================================
      AUTO LOGIN REDIRECT
      =========================================
      */

      setTimeout(() => {

        router.push("/dashboard");

      }, 1500);

    } catch (err:any) {

      setError(
        "Une erreur est survenue."
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="registerPage">

      {/* BG */}

      <div className="registerGlowOne" />
      <div className="registerGlowTwo" />

      {/* CARD */}

      <div className="registerCard">

        {/* LOGO */}

        <div className="registerLogoBox">

          <img
            src="/flowbiz-logo.png"
            alt="FlowBiz"
            className="registerLogo"
          />

        </div>

        {/* TITLE */}

        <span className="registerBadge">

          <ShieldCheck />

          FLOWBIZ AUTH

        </span>

        <h1>
          Créer un compte
        </h1>

        <p className="registerDescription">

          Accédez à votre espace
          business intelligent,
          CRM, IA, facturation,
          automatisations et analytics.

        </p>

        {/* ERROR */}

        {
          error && (

            <div className="errorBox">

              {error}

            </div>
          )
        }

        {/* SUCCESS */}

        {
          success && (

            <div className="successBox">

              {success}

            </div>
          )
        }

        {/* FORM */}

        <form
          onSubmit={handleRegister}
          className="registerForm"
        >

          {/* NAME */}

          <div className="inputBox">

            <User />

            <input
              type="text"
              placeholder="Nom complet"
              value={fullName}
              onChange={(e)=>
                setFullName(
                  e.target.value
                )
              }
            />

          </div>

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

          {/* CONFIRM */}

          <div className="inputBox">

            <Lock />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirmer mot de passe"
              value={confirmPassword}
              onChange={(e)=>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              className="eyeBtn"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >

              {
                showConfirmPassword
                ? <EyeOff />
                : <Eye />
              }

            </button>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="registerBtn"
            disabled={loading}
          >

            {
              loading ? (

                <>
                  <Loader2 className="spin" />
                  Création...
                </>

              ) : (

                <>
                  Créer mon compte
                  <ArrowRight />
                </>

              )
            }

          </button>

        </form>

        {/* FOOTER */}

        <div className="registerFooter">

          Déjà un compte ?

          <span
            onClick={() =>
              router.push("/login")
            }
          >
            Se connecter
          </span>

        </div>

      </div>

    </div>
  );
}
