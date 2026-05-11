"use client";

import {
  Sparkles,
  Megaphone,
  Image,
  CalendarDays,
  BarChart3,
  Users,
  Send,
  TrendingUp,
  CheckCircle2,
  ImagePlus,
} from "lucide-react";

const stats = [
  ["Publications prévues", "24", "Ce mois"],
  ["Portée estimée", "48K", "+22%"],
  ["Leads générés", "316", "Objectif"],
  ["Engagement", "7.8%", "Très bon"],
];

const posts = [
  ["Instagram", "Annonce lancement FlowBiz", "Planifié"],
  ["LinkedIn", "Post expert création entreprise", "Brouillon"],
  ["TikTok", "Vidéo courte SaaS business", "À valider"],
  ["Facebook", "Campagne entrepreneurs locaux", "Publié"],
];

export default function MarketingReseauxPage() {
  return (
    <main className="min-h-screen bg-[#070B18] p-8 text-white">
      <section className="mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          <Sparkles size={16} />
          Marketing intelligent
        </span>

        <div className="mt-6 flex items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              Marketing & Réseaux
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
              Planifiez vos campagnes, générez du contenu, suivez vos réseaux
              sociaux et analysez vos performances depuis un seul espace.
            </p>
          </div>

          <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-4 font-semibold shadow-[0_0_35px_rgba(6,182,212,0.35)] transition hover:scale-105">
            Créer une campagne
          </button>
        </div>
      </section>

      <section className="mb-10 grid grid-cols-4 gap-6">
        {stats.map(([label, value, detail], index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
          >
            <p className="text-slate-400">{label}</p>
            <h2 className="mt-3 text-4xl font-bold">{value}</h2>
            <span className="mt-2 inline-block text-cyan-300">{detail}</span>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-[1.5fr_1fr] gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold">Planning éditorial</h2>
              <p className="mt-2 text-slate-400">
                Centralisez vos contenus et publications.
              </p>
            </div>
            <CalendarDays className="text-cyan-300" size={34} />
          </div>

          <div className="space-y-4">
            {posts.map(([network, title, status], index) => (
              <div
                key={index}
                className="grid grid-cols-[140px_1fr_120px] items-center rounded-2xl bg-[#0F172A]/70 p-5"
              >
                <span className="text-cyan-300">{network}</span>
                <strong>{title}</strong>
                <span className="rounded-full bg-violet-500/10 px-4 py-2 text-center text-sm text-violet-300">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-violet-500/10 p-8 backdrop-blur-xl">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-cyan-200">
            IA Marketing
          </span>

          <h3 className="mt-6 text-3xl font-bold">Assistant contenu</h3>
          <p className="mt-5 leading-8 text-slate-300">
            Générez des posts, captions, scripts vidéo, emails commerciaux et
            campagnes adaptées à votre cible.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Générer un post Instagram",
              "Créer une campagne LinkedIn",
              "Préparer un calendrier éditorial",
              "Analyser les performances",
            ].map((item, index) => (
              <div key={index} className="rounded-2xl bg-white/[0.06] p-4">
                ✓ {item}
              </div>
            ))}
          </div>

          <button className="mt-8 w-full rounded-2xl bg-white px-6 py-4 font-semibold text-[#070B18]">
            Générer du contenu
          </button>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-3 gap-6">
        {[
          [Megaphone, "Campagnes", "Pilotez vos offres, audiences et messages."],
          [Image, "Réseaux sociaux", "Planifiez Instagram, LinkedIn, TikTok et Facebook."],
          [BarChart3, "Analyse", "Mesurez portée, engagement, leads et conversion."],
          [Users, "Audience", "Segmentez vos clients et prospects."],
          [ImagePlus, "Créatifs", "Préparez visuels, scripts et publications."],
          [TrendingUp, "Croissance", "Suivez l’impact marketing sur les ventes."],
        ].map(([Icon, title, text]: any, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
          >
            <Icon className="text-cyan-300" size={28} />
            <h3 className="mt-5 text-xl font-bold">{title}</h3>
            <p className="mt-3 leading-7 text-slate-400">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
