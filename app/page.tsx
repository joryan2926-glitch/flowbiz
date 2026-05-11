"use client";

import {
  ArrowRight,
  BarChart3,
  Brain,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const cards = [
  {
    icon: <Users size={32} />,
    title: "CRM Intelligent",
    text: "Gestion clients, pipeline commercial et automatisations avancées.",
  },
  {
    icon: <CreditCard size={32} />,
    title: "Facturation Premium",
    text: "Devis, factures, abonnements et paiements Stripe intégrés.",
  },
  {
    icon: <Brain size={32} />,
    title: "IA Business",
    text: "Assistant IA FlowBiz pour piloter et optimiser ton activité.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Analytics",
    text: "Suivi des performances, revenus et croissance en temps réel.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Sécurité",
    text: "Protection des données et infrastructure moderne sécurisée.",
  },
  {
    icon: <Sparkles size={32} />,
    title: "Automatisation",
    text: "Workflows intelligents et automatisations premium.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_40%)]" />

      {/* HEADER */}
      <header className="relative z-20 w-full border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-2xl shadow-blue-500/40" />

            <div>
              <h1 className="text-2xl font-black tracking-tight">
                FLOWBIZ
              </h1>
              <p className="text-sm text-white/60">
                Smart Business Platform
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-white/70">
            <a href="#">Fonctionnalités</a>
            <a href="#">Abonnements</a>
            <a href="#">IA Business</a>
            <a href="#">FlowBiz Academy</a>
          </nav>

          <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:scale-105 transition-all duration-300 shadow-xl shadow-cyan-500/30">
            Commencer
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm mb-8">
              <Sparkles size={16} />
              Nouvelle génération business
            </div>

            <h2 className="text-5xl lg:text-7xl font-black leading-tight mb-8">
              Gérez votre business
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                {" "}
                avec l’IA
              </span>
            </h2>

            <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
              CRM, facturation, automatisation, IA, analytics,
              paiements Stripe et gestion d’entreprise dans une plateforme
              futuriste premium.
            </p>

            <div className="flex flex-wrap gap-5 mb-14">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/30 flex items-center gap-3">
                Démarrer maintenant
                <ArrowRight size={20} />
              </button>

              <button className="px-8 py-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                Voir la démo
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h3 className="text-3xl font-black text-cyan-400">
                  48 920€
                </h3>
                <p className="text-white/60 mt-2">
                  Revenus mensuels
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h3 className="text-3xl font-black text-cyan-400">
                  +94%
                </h3>
                <p className="text-white/60 mt-2">
                  Automatisation IA
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h3 className="text-3xl font-black text-cyan-400">
                  +78%
                </h3>
                <p className="text-white/60 mt-2">
                  Croissance business
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[120px]" />

            <div className="relative rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl shadow-cyan-500/10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-white/50 text-sm">
                    Dashboard Premium
                  </p>

                  <h3 className="text-2xl font-bold mt-1">
                    FlowBiz Control Center
                  </h3>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Brain />
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl bg-[#0f172a] p-5 border border-white/5">
                  <div className="flex justify-between mb-3">
                    <span className="text-white/60">
                      Revenus
                    </span>

                    <span className="text-cyan-400 font-bold">
                      +24%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" />
                  </div>
                </div>

                <div className="rounded-2xl bg-[#0f172a] p-5 border border-white/5">
                  <div className="flex justify-between mb-3">
                    <span className="text-white/60">
                      Automatisation
                    </span>

                    <span className="text-violet-400 font-bold">
                      IA Active
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                  </div>
                </div>

                <div className="rounded-2xl bg-[#0f172a] p-5 border border-white/5">
                  <div className="flex justify-between mb-3">
                    <span className="text-white/60">
                      Productivité
                    </span>

                    <span className="text-green-400 font-bold">
                      Optimisée
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-cyan-400 font-semibold mb-4">
              ÉCOSYSTÈME FLOWBIZ
            </p>

            <h2 className="text-5xl font-black mb-6">
              Une plateforme pensée pour les entrepreneurs modernes
            </h2>

            <p className="text-white/60 text-xl max-w-3xl mx-auto">
              Tous les outils essentiels centralisés dans une expérience
              premium futuriste.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/20">
                  {card.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {card.title}
                </h3>

                <p className="text-white/60 leading-relaxed text-lg">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}