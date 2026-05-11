"use client";

import {
  Sparkles,
  Brain,
  Rocket,
  Target,
  BarChart3,
  Wallet,
  ShieldCheck,
  MessageSquareText,
  CheckCircle2,
  ArrowRight,
  Compass,
} from "lucide-react";

const priorities = [
  ["Priorité 1", "Sécuriser la trésorerie", "Urgent"],
  ["Priorité 2", "Relancer les prospects chauds", "Cette semaine"],
  ["Priorité 3", "Clarifier l’offre Premium", "À faire"],
  ["Priorité 4", "Préparer le dossier financeur", "En cours"],
];

export default function CoPiloteBusinessPage() {
  return (
    <main className="min-h-screen bg-[#070B18] p-8 text-white">
      <section className="mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          <Sparkles size={16} />
          Co-pilote business IA
        </span>

        <div className="mt-6 flex items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              Co-pilote Business
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
              Un copilote stratégique pour piloter l’entreprise, décider plus
              vite, prioriser les actions et transformer les données en plan
              d’action concret.
            </p>
          </div>

          <button className="rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-4 font-semibold shadow-[0_0_35px_rgba(139,92,246,0.45)] transition hover:scale-105">
            Lancer le copilote
          </button>
        </div>
      </section>

      <section className="mb-10 grid grid-cols-4 gap-6">
        {[
          [Target, "Objectifs actifs", "7"],
          [Wallet, "Trésorerie suivie", "12 840 €"],
          [BarChart3, "Score business", "84%"],
          [Rocket, "Actions IA", "23"],
        ].map(([Icon, label, value]: any, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
          >
            <Icon className="text-cyan-300" size={28} />
            <p className="mt-5 text-slate-400">{label}</p>
            <h2 className="mt-3 text-4xl font-bold">{value}</h2>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-[1.5fr_1fr] gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold">Plan d’action prioritaire</h2>
              <p className="mt-2 text-slate-400">
                Les actions recommandées par le copilote.
              </p>
            </div>
            <Compass className="text-cyan-300" size={34} />
          </div>

          <div className="space-y-4">
            {priorities.map(([label, action, status], index) => (
              <div
                key={index}
                className="grid grid-cols-[130px_1fr_140px] items-center rounded-2xl bg-[#0F172A]/70 p-5"
              >
                <span className="text-cyan-300">{label}</span>
                <strong>{action}</strong>
                <span className="rounded-full bg-violet-500/10 px-4 py-2 text-center text-sm text-violet-300">
                  {status}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-8 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-4 font-semibold">
            Générer un nouveau plan
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-8 backdrop-blur-xl">
          <Brain className="text-cyan-300" size={40} />
          <h3 className="mt-6 text-3xl font-bold">Analyse IA globale</h3>
          <p className="mt-5 leading-8 text-slate-300">
            Le copilote croise vos données clients, financières, commerciales,
            RH et marketing pour recommander les meilleures décisions.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Décisions prioritaires",
              "Risques business détectés",
              "Actions de croissance",
              "Prévisions financières",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4">
                <CheckCircle2 className="text-emerald-400" size={20} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-3 gap-6">
        {[
          [MessageSquareText, "Conseil stratégique", "Réponses rapides pour décisions business."],
          [ShieldCheck, "Gestion des risques", "Détection des points faibles et alertes."],
          [Rocket, "Croissance", "Actions concrètes pour vendre et scaler."],
        ].map(([Icon, title, text]: any, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl"
          >
            <Icon className="text-cyan-300" size={32} />
            <h3 className="mt-5 text-2xl font-bold">{title}</h3>
            <p className="mt-3 leading-7 text-slate-400">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
