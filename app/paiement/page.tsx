"use client";

import {
  CreditCard,
  Sparkles,
  ShieldCheck,
  Wallet,
  Receipt,
  CheckCircle2,
  Lock,
  ArrowRight,
  Landmark,
} from "lucide-react";

const plans = [
  ["Essentiel", "29 €", "Gestion simple pour démarrer"],
  ["Premium", "79 €", "Outils avancés et IA business"],
  ["Business", "149 €", "Pilotage complet entreprise"],
];

const transactions = [
  ["FlowBiz Premium", "79 €", "Payé"],
  ["Formation IA", "490 €", "Payé"],
  ["Abonnement Business", "149 €", "En attente"],
];

export default function PaiementPage() {
  return (
    <main className="min-h-screen bg-[#070B18] p-8 text-white">
      <section className="mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          <Sparkles size={16} />
          Paiement sécurisé
        </span>

        <div className="mt-6 flex items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              Paiement
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
              Gérez les abonnements, factures, paiements clients, moyens de
              paiement et revenus récurrents FlowBiz.
            </p>
          </div>

          <button className="rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-4 font-semibold shadow-[0_0_35px_rgba(139,92,246,0.45)] transition hover:scale-105">
            Nouveau paiement
          </button>
        </div>
      </section>

      <section className="mb-10 grid grid-cols-4 gap-6">
        {[
          ["Revenus encaissés", "12 840 €"],
          ["Paiements en attente", "1 240 €"],
          ["Abonnements actifs", "184"],
          ["Taux de réussite", "97%"],
        ].map(([label, value], index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
          >
            <p className="text-slate-400">{label}</p>
            <h2 className="mt-3 text-4xl font-bold">{value}</h2>
            <span className="text-cyan-300">Mise à jour automatique</span>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-[1.5fr_1fr] gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold">Offres & abonnements</h2>
              <p className="mt-2 text-slate-400">
                Configurez vos formules commerciales.
              </p>
            </div>
            <CreditCard className="text-cyan-300" size={34} />
          </div>

          <div className="grid grid-cols-3 gap-5">
            {plans.map(([name, price, desc], index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-[#0F172A]/70 p-6"
              >
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="mt-4 text-4xl font-bold text-cyan-300">{price}</p>
                <p className="mt-4 leading-7 text-slate-400">{desc}</p>
                <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 py-3 font-semibold">
                  Choisir
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-8 backdrop-blur-xl">
          <Lock className="text-cyan-300" size={34} />
          <h3 className="mt-6 text-3xl font-bold">Paiement sécurisé</h3>
          <p className="mt-5 leading-8 text-slate-300">
            Interface prévue pour Stripe, cartes bancaires, paiements récurrents,
            reçus, factures et suivi automatique.
          </p>

          <div className="mt-8 space-y-4">
            {["Stripe", "Carte bancaire", "Facture automatique", "Suivi paiement"].map(
              (item, index) => (
                <div key={index} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Dernières transactions</h3>
            <p className="mt-2 text-slate-400">Suivi des paiements clients.</p>
          </div>
          <Receipt className="text-cyan-300" size={34} />
        </div>

        <div className="space-y-4">
          {transactions.map(([name, amount, status], index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_140px_140px] items-center rounded-2xl bg-[#0F172A]/70 p-5"
            >
              <strong>{name}</strong>
              <span>{amount}</span>
              <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-center text-sm text-emerald-300">
                {status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
