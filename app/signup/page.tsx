"use client";

import "./signup.css";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { createClient } from
  "@supabase/supabase-js";

const supabase = createClient(
  process.env
    .NEXT_PUBLIC_SUPABASE_URL!,
  process.env
    .NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState({
      fullName: "",
      company: "",
      email: "",
      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    try {

      setLoading(true);

      const {
        data,
        error,
      } = await supabase.auth.signUp({
        email:
          formData.email,

        password:
          formData.password,

        options: {

          data: {
            full_name:
              formData.fullName,

            company:
              formData.company,

            role:
              "starter",
          },

          emailRedirectTo:
            `${window.location.origin}/login`,
        },
      });

      if (error) {

        setError(error.message);

        return;
      }

      if (data.user) {

        setSuccess(
          "Compte créé avec succès. Vérifiez votre email."
        );

        setTimeout(() => {

          router.push(
            "/onboarding"
          );

        }, 2000);
      }

    } catch (err) {

      console.log(err);

      setError(
        "Erreur lors de l’inscription"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="signupPage">

      {/* BACKGROUND */}

      <div className="bgGlow glow1" />
      <div className="bgGlow glow2" />

      {/* LEFT SIDE */}

      <div className="signupLeft">

        <Link
          href="/"
          className="logo"
        >
          FLOWBIZ
        </Link>

        <div className="leftContent">

          <span className="badge">
            SaaS IA • CRM • Finance
          </span>

          <h1>
            Lancez votre entreprise
            avec FlowBiz
          </h1>

          <p>

            Une plateforme SaaS
            moderne pour gérer
            votre activité,
            automatiser vos tâches
            et accélérer votre
            croissance grâce à
            l’intelligence artificielle.

          </p>

          <div className="featuresList">

            <div className="featureItem">

              <CheckCircle2 />

              CRM intelligent

            </div>

            <div className="featureItem">

              <CheckCircle2 />

              Facturation automatisée

            </div>

            <div className="featureItem">

              <CheckCircle2 />

              Analytics business

            </div>

            <div className="featureItem">

              <CheckCircle2 />

              Gestion SaaS complète

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="signupRight">

        <div className="signupCard">

          <div className="cardHeader">

            <div className="iconBox">
              <Sparkles />
            </div>

            <h2>
              Créer un compte
            </h2>

            <p>

              Commencez gratuitement
              avec FlowBiz Starter.

            </p>

          </div>

          <form
            onSubmit={handleSignup}
            className="signupForm"
          >

            {/* FULL NAME */}

            <div className="inputGroup">

              <label>
                Nom complet
              </label>

              <div className="inputWrapper">

                <User />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Jordan Lambeau"
                  required
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>

            {/* COMPANY */}

            <div className="inputGroup">

              <label>
                Entreprise
              </label>

              <div className="inputWrapper">

                <Building2 />

                <input
                  type="text"
                  name="company"
                  placeholder="FlowBiz"
                  value={
                    formData.company
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="inputGroup">

              <label>
                Adresse email
              </label>

              <div className="inputWrapper">

                <Mail />

                <input
                  type="email"
                  name="email"
                  placeholder="contact@flowbiz.fr"
                  required
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="inputGroup">

              <label>
                Mot de passe
              </label>

              <div className="inputWrapper">

                <Lock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  name="password"

                  placeholder="••••••••"

                  required

                  minLength={6}

                  value={
                    formData.password
                  }

                  onChange={
                    handleChange
                  }
                />

                <button
                  type="button"
                  className="showBtn"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword ? (
                    <EyeOff />
                  ) : (
                    <Eye />
                  )}

                </button>

              </div>

            </div>

            {/* SECURITY */}

            <div className="securityBox">

              <ShieldCheck />

              <span>

                Vos données sont
                sécurisées avec
                Supabase & SSL.

              </span>

            </div>

            {/* ERROR */}

            {error && (

              <div className="errorBox">
                {error}
              </div>

            )}

            {/* SUCCESS */}

            {success && (

              <div className="successBox">
                {success}
              </div>

            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="signupBtn"
              disabled={loading}
            >

              {loading ? (

                <Loader2 className="spin" />

              ) : (

                <>

                  Créer mon compte

                  <ArrowRight />

                </>

              )}

            </button>

          </form>

          {/* FOOTER */}

          <div className="cardFooter">

            <span>
              Déjà un compte ?
            </span>

            <Link href="/login">
              Se connecter
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}
