"use client";

import Image from "next/image";
import {
  Rocket,
  CreditCard,
  Brain,
  BarChart3,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const cards = [
    {
      title: "CRM Intelligent",
      icon: <Users size={28} />,
      text: "Gestion clients, pipeline et automatisation.",
    },
    {
      title: "Facturation",
      icon: <CreditCard size={28} />,
      text: "Devis, factures et paiements Stripe intégrés.",
    },
    {
      title: "IA Business",
      icon: <Brain size={28} />,
      text: "Assistant IA FlowBiz pour piloter ton activité.",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={28} />,
      text: "Statistiques, revenus et performance en temps réel.",
    },
    {
      title: "Sécurité",
      icon: <ShieldCheck size={28} />,
      text: "Infrastructure moderne et sécurisée.",
    },
    {
      title: "Croissance",
      icon: <Rocket size={28} />,
      text: "Développe ton entreprise avec un seul outil.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#13203f,transparent_50%)] opacity-70" />

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Image
            src="/flowbiz-logo.png"
            alt="FlowBiz"
            width={55}
            height={55}
          />

          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
              FLOWBIZ
            </h1>

            <p className="text-sm text-white/60">
              Smart Business Platform
            </p>
          </div>
        </div>

        <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:scale-105 transition-all font-semibold shadow-2xl">
          Connexion
        </button>
      </header>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-6">
            <Rocket size={16} />
            Nouvelle génération business
          </div>

          <h2 className="text-6xl font-black leading-tight mb-6">
            Gérez votre
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
              {" "}
              business
            </span>
            <br />
            avec l’IA
          </h2>

          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
            CRM, facturation, automatisation, IA, analytics,
            paiements Stripe et gestion d’entreprise dans une
            plateforme futuriste premium.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 font-bold hover:scale-105 transition-all shadow-2xl">
              Commencer
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all">
              Découvrir
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-cyan-500/20 rounded-full" />

          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-white/50 text-sm">
                  Revenus mensuels
                </p>

                <h3 className="text-4xl font-black mt-2">
                  48 920€
                </h3>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 flex items-center justify-center">
                <BarChart3 size={30} />
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#0b1225] rounded-2xl p-5 border border-white/5">
                <div className="flex justify-between mb-2">
                  <span className="text-white/60">
                    Automatisations IA
                  </span>

                  <span className="text-cyan-400 font-bold">
                    +94%
                  </span>
                </div>

                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />
                </div>
              </div>

              <div className="bg-[#0b1225] rounded-2xl p-5 border border-white/5">
                <div className="flex justify-between mb-2">
                  <span className="text-white/60">
                    Croissance business
                  </span>

                  <span className="text-violet-400 font-bold">
                    +78%
                  </span>
                </div>

                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-to-r from-violet-400 to-cyan-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:scale-[1.02] transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 flex items-center justify-center mb-6">
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {card.title}
              </h3>

              <p className="text-white/60 leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}