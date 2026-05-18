"use client";


import "./register.css";


import Link from "next/link";
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


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    setError("");
    setSuccess("");


    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }


    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }


    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }


    try {
      setLoading(true);


      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });


      if (signUpError) {
        setError(signUpError.message);
        return;
      }


      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName.trim(),
          email: email.trim(),
          plan: "free",
          role: "user",
          created_at: new Date().toISOString(),
        });


        if (profileError) {
          console.warn("Profil non créé :", profileError.message);
        }
      }


      setSuccess("Compte créé avec succès. Redirection...");


      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue pendant la création du compte.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="registerPage">
      <div className="registerGlowOne" />
      <div className="registerGlowTwo" />


      <section className="registerCard">
        <Link href="/" className="registerLogoBox">
          <img
            src="/logo-flowbiz.png"
            alt="FlowBiz"
            className="registerLogo"
          />
        </Link>


        <span className="registerBadge">
          <ShieldCheck />
          FLOWBIZ AUTH
        </span>


        <h1>Créer un compte</h1>


        <p className="registerDescription">
          Accédez à votre espace business intelligent : CRM, IA,
          facturation, automatisations et analytics.
        </p>


        {error && <div className="errorBox">{error}</div>}
        {success && <div className="successBox">{success}</div>}


        <form onSubmit={handleRegister} className="registerForm">
          <div className="inputBox">
            <User />
            <input
              type="text"
              placeholder="Nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
          </div>


          <div className="inputBox">
            <Mail />
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>


          <div className="inputBox">
            <Lock />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />


            <button
              type="button"
              className="eyeBtn"
              onClick={() => setShowPassword((value) => !value)}
              aria-label="Afficher ou masquer le mot de passe"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>


          <div className="inputBox">
            <Lock />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />


            <button
              type="button"
              className="eyeBtn"
              onClick={() => setShowConfirmPassword((value) => !value)}
              aria-label="Afficher ou masquer la confirmation"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>


          <button type="submit" className="registerBtn" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="spin" />
                Création...
              </>
            ) : (
              <>
                Créer mon compte
                <ArrowRight />
              </>
            )}
          </button>
        </form>


        <div className="registerFooter">
          Déjà un compte ?
          <Link href="/login">Se connecter</Link>
        </div>
      </section>
    </main>
  );
}
