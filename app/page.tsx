"use client";


import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  CreditCard,
  FileText,
  Lock,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Zap,
  Scale,
  Cookie,
  HelpCircle,
  Database,
  Workflow,
  Building2,
  AlertTriangle,
} from "lucide-react";


const modules = [
  {
    title: "CRM intelligent",
    text: "Gestion clients, pipeline commercial, historique, relances et suivi vendeur.",
    icon: Users,
    href: "/dashboard/clients",
  },
  {
    title: "Facturation",
    text: "Création de factures, PDF, téléchargement, Stripe et suivi paiement.",
    icon: FileText,
    href: "/dashboard/factures",
  },
  {
    title: "Finance",
    text: "Pilotage des revenus, paiements en attente, trésorerie et rentabilité.",
    icon: Wallet,
    href: "/dashboard/finance",
  },
  {
    title: "Analytics",
    text: "Tableaux de bord connectés à Supabase, Stripe, CRM et factures.",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Abonnements",
    text: "Gestion des offres, paiements récurrents et abonnements clients.",
    icon: CreditCard,
    href: "/dashboard/abonnements",
  },
  {
    title: "FlowBiz IA",
    text: "Assistant IA pour automatiser, analyser, rédiger et accélérer la gestion.",
    icon: Brain,
    href: "/dashboard/ia",
  },
];


const plans = [
  {
    name: "Free Starter",
    price: "0€",
    text: "Découverte de la plateforme.",
    features: ["CRM limité", "Factures limitées", "Dashboard simple"],
  },
  {
    name: "Essentiel",
    price: "19€/mois",
    text: "Pour indépendants et créateurs.",
    features: ["Clients illimités", "Facturation", "Suivi financier"],
  },
  {
    name: "Premium",
    price: "49€/mois",
    text: "Pour piloter son activité avec IA.",
    features: ["IA business", "Analytics", "Stripe", "Automatisations"],
  },
  {
    name: "Pro",
    price: "99€/mois",
    text: "Pour équipes, PME et gestion avancée.",
    features: ["Multi-utilisateurs", "CRM avancé", "Support prioritaire"],
  },
];


export default function HomePage() {
  return (
    <main className="homePage">
      <header className="siteHeader">
        <Link href="/" className="brand">
          <div className="brandIcon">F</div>
          <div>
            <strong>FlowBiz</strong>
            <span>Business Operating System</span>
          </div>
        </Link>


        <nav className="siteNav">
          <Link href="#modules">Modules</Link>
          <Link href="#parcours">Parcours</Link>
          <Link href="#pricing">Tarifs</Link>
          <Link href="#security">Sécurité</Link>
        </nav>


        <div className="headerActions">
          <Link href="/pricing" className="ghostBtn">
            Voir les offres
          </Link>


          <Link href="/dashboard" className="headerBtn">
            Accéder à FlowBiz
          </Link>
        </div>
      </header>


      <section className="hero">
        <div className="heroBadge">
          <Sparkles size={16} />
          FLOWBIZ BUSINESS OPERATING SYSTEM
        </div>


        <h1>Gérez votre entreprise depuis une seule plateforme intelligente.</h1>


        <p>
          FlowBiz centralise CRM, facturation, paiements Stripe, abonnements,
          finance, analytics et automatisation IA pour les indépendants, TPE et PME.
        </p>


        <div className="heroActions">
          <Link href="/pricing" className="primaryBtn">
            Voir les abonnements
            <ArrowRight size={18} />
          </Link>


          <Link href="/dashboard" className="secondaryBtn">
            Découvrir FlowBiz
          </Link>
        </div>


        <div className="trustBar">
          <span>
            <Database size={16} />
            Supabase connecté
          </span>
          <span>
            <CreditCard size={16} />
            Stripe prêt
          </span>
          <span>
            <ShieldCheck size={16} />
            Sécurité production
          </span>
          <span>
            <Lock size={16} />
            RGPD & conformité
          </span>
        </div>
      </section>


      <section className="problemSolution">
        <div className="sectionIntro">
          <span className="sectionLabel">POURQUOI FLOWBIZ</span>
          <h2>Moins d’outils dispersés. Plus de pilotage.</h2>
        </div>


        <div className="twoGrid">
          <div className="glassCard">
            <AlertTriangle />
            <h3>Le problème</h3>
            <p>
              Les entrepreneurs jonglent entre Excel, outils de facturation, CRM séparés,
              banques, tableaux incomplets et relances manuelles.
            </p>
          </div>


          <div className="glassCard">
            <CheckCircle2 />
            <h3>La solution</h3>
            <p>
              FlowBiz réunit clients, factures, paiements, revenus, abonnements et
              indicateurs dans un seul espace connecté et automatisé.
            </p>
          </div>
        </div>
      </section>


      <section id="parcours" className="sellerJourney">
        <div className="sectionIntro">
          <span className="sectionLabel">PARCOURS CLIENT / VENDEUR</span>
          <h2>Un parcours simple, rapide et automatisé</h2>
        </div>


        <div className="steps">
          <div className="step">
            <span>01</span>
            <h3>Créer un prospect</h3>
            <p>Le vendeur ajoute le client dans le CRM avec ses informations clés.</p>
          </div>


          <div className="step">
            <span>02</span>
            <h3>Transformer en client</h3>
            <p>Le suivi commercial, le statut et l’historique sont centralisés.</p>
          </div>


          <div className="step">
            <span>03</span>
            <h3>Créer une facture</h3>
            <p>La facture est générée avec PDF, montant, échéance et lien Stripe.</p>
          </div>


          <div className="step">
            <span>04</span>
            <h3>Paiement sécurisé</h3>
            <p>Le client paie en ligne et le statut de paiement peut être validé.</p>
          </div>


          <div className="step">
            <span>05</span>
            <h3>Analyse automatique</h3>
            <p>Les revenus remontent dans Finance et Analytics automatiquement.</p>
          </div>


          <div className="step">
            <span>06</span>
            <h3>Suivi & relance</h3>
            <p>Les factures non réglées, retards et actions commerciales sont visibles.</p>
          </div>
        </div>
      </section>


      <section id="modules" className="modules">
        <div className="sectionTop">
          <div>
            <span className="sectionLabel">MODULES CONNECTÉS</span>
            <h2>Tout le pilotage dans une seule plateforme</h2>
          </div>


          <Link href="/dashboard" className="smallBtn">
            Ouvrir FlowBiz
            <Rocket size={16} />
          </Link>
        </div>


        <div className="moduleGrid">
          {modules.map((module) => {
            const Icon = module.icon;


            return (
              <Link href={module.href} key={module.title} className="moduleCard">
                <Icon />
                <h3>{module.title}</h3>
                <p>{module.text}</p>
                <span>
                  Découvrir
                  <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>


      <section id="pricing" className="pricing">
        <div className="sectionIntro">
          <span className="sectionLabel">ABONNEMENTS</span>
          <h2>Des offres adaptées au démarrage puis à la croissance</h2>
        </div>


        <div className="pricingGrid">
          {plans.map((plan) => (
            <div key={plan.name} className="priceCard">
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.text}</p>


              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 size={15} />
                    {feature}
                  </li>
                ))}
              </ul>


              <Link href="/pricing" className="priceBtn">
                Voir l’offre
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>


      <section id="security" className="security">
        <div className="sectionIntro">
          <span className="sectionLabel">SÉCURITÉ & CONFORMITÉ</span>
          <h2>Une base sérieuse pour un SaaS professionnel</h2>
        </div>


        <div className="securityGrid">
          <div className="glassCard">
            <ShieldCheck />
            <h3>Sécurité</h3>
            <p>Accès utilisateur, protection des données et bonnes pratiques production.</p>
          </div>


          <div className="glassCard">
            <CreditCard />
            <h3>Paiements Stripe</h3>
            <p>Paiement en ligne, abonnements, liens de paiement et suivi financier.</p>
          </div>


          <div className="glassCard">
            <Database />
            <h3>Supabase</h3>
            <p>Données clients, factures, revenus et analytics centralisés.</p>
          </div>


          <div className="glassCard">
            <Scale />
            <h3>Cadre légal</h3>
            <p>Mentions légales, CGV, confidentialité, cookies et contact.</p>
          </div>
        </div>
      </section>


      <section className="faq">
        <div className="sectionIntro">
          <span className="sectionLabel">FAQ</span>
          <h2>Questions fréquentes</h2>
        </div>


        <div className="faqGrid">
          <div className="faqItem">
            <HelpCircle />
            <h3>Peut-on se connecter ?</h3>
            <p>Oui, l’accès client sera géré via une page de connexion dédiée.</p>
          </div>


          <div className="faqItem">
            <CreditCard />
            <h3>Peut-on souscrire ?</h3>
            <p>Oui, la page tarifs renvoie vers les offres et Stripe Checkout.</p>
          </div>


          <div className="faqItem">
            <Workflow />
            <h3>Le parcours est-il automatisé ?</h3>
            <p>FlowBiz relie CRM, facturation, finance et analytics.</p>
          </div>


          <div className="faqItem">
            <Building2 />
            <h3>Pour qui ?</h3>
            <p>Indépendants, créateurs, TPE, PME et équipes.</p>
          </div>
        </div>
      </section>


      <section className="finalCta">
        <div>
          <Zap size={34} />
          <h2>Prêt à piloter ton activité avec FlowBiz ?</h2>
          <p>
            Découvre les offres et commence à gérer clients, factures, paiements,
            finance et analytics depuis un seul espace.
          </p>
        </div>


        <div className="ctaActions">
          <Link href="/pricing" className="primaryBtn">
            Voir les offres
            <ArrowRight size={18} />
          </Link>


          <Link href="/dashboard" className="secondaryBtn">
            Découvrir le dashboard
          </Link>
        </div>
      </section>


      <footer className="footer">
        <div>
          <strong>FlowBiz</strong>
          <p>Plateforme intelligente de gestion d’entreprise.</p>
        </div>


        <div className="footerLinks">
          <Link href="/mentions-legales">
            <Scale size={14} />
            Mentions légales
          </Link>
          <Link href="/cgv">CGV</Link>
          <Link href="/confidentialite">
            <Lock size={14} />
            Confidentialité
          </Link>
          <Link href="/cookies">
            <Cookie size={14} />
            Cookies
          </Link>
          <Link href="/contact">
            <Mail size={14} />
            Contact
          </Link>
        </div>
      </footer>


      <style jsx global>{`
        * {
          box-sizing: border-box;
        }


        html,
        body {
          margin: 0;
          padding: 0;
          background: #050711;
          color: white;
          font-family: Inter, system-ui, sans-serif;
          scroll-behavior: smooth;
        }


        .homePage {
          min-height: 100vh;
          padding: 26px 42px 42px;
          background:
            radial-gradient(circle at 18% 12%, rgba(0, 255, 157, 0.22), transparent 30%),
            radial-gradient(circle at 72% 10%, rgba(124, 92, 255, 0.3), transparent 35%),
            linear-gradient(135deg, #040711 0%, #0d1228 52%, #050711 100%);
          overflow-x: hidden;
        }


        .siteHeader,
        .hero,
        .problemSolution,
        .sellerJourney,
        .modules,
        .pricing,
        .security,
        .faq,
        .finalCta,
        .footer {
          width: 100%;
          max-width: 1220px;
          margin-left: auto;
          margin-right: auto;
        }


        .siteHeader {
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(20px);
        }


        .brand {
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
        }


        .brandIcon {
          width: 42px;
          height: 42px;
          border-radius: 15px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #00ff9d, #00d4ff, #7c5cff);
          font-weight: 900;
        }


        .brand strong {
          display: block;
          font-size: 18px;
        }


        .brand span {
          display: block;
          color: #aab0c5;
          font-size: 11px;
          margin-top: 2px;
        }


        .siteNav {
          display: flex;
          align-items: center;
          gap: 18px;
        }


        .siteNav a,
        .footerLinks a {
          color: #cfd4e8;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
        }


        .headerActions {
          display: flex;
          gap: 10px;
        }


        .hero {
          min-height: calc(100vh - 78px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }


        .heroBadge,
        .sectionLabel {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 15px;
          border-radius: 999px;
          background: rgba(124, 92, 255, 0.18);
          border: 1px solid rgba(124, 92, 255, 0.35);
          color: #dcd6ff;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }


        h1 {
          max-width: 1080px;
          margin: 24px 0 16px;
          font-size: clamp(46px, 8vw, 112px);
          line-height: 0.92;
          letter-spacing: -0.09em;
          background: linear-gradient(135deg, #00ff9d, #00d4ff, #7c5cff);
          color: transparent;
          background-clip: text;
        }


        .hero p {
          max-width: 880px;
          margin: 0 auto;
          color: #c5cbe0;
          font-size: clamp(17px, 2vw, 23px);
          line-height: 1.55;
          font-weight: 600;
        }


        .heroActions,
        .trustBar,
        .ctaActions {
          margin-top: 32px;
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }


        .primaryBtn,
        .secondaryBtn,
        .smallBtn,
        .ghostBtn,
        .headerBtn,
        .priceBtn {
          min-height: 50px;
          padding: 0 20px;
          border-radius: 17px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 900;
          transition: 0.18s ease;
        }


        .primaryBtn,
        .headerBtn,
        .priceBtn {
          background: linear-gradient(135deg, #00ff9d, #00d4ff, #7c5cff);
          color: white;
          box-shadow: 0 0 35px rgba(0, 212, 255, 0.22);
        }


        .secondaryBtn,
        .smallBtn,
        .ghostBtn {
          background: rgba(255, 255, 255, 0.09);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: white;
        }


        .primaryBtn:hover,
        .secondaryBtn:hover,
        .smallBtn:hover,
        .ghostBtn:hover,
        .headerBtn:hover,
        .priceBtn:hover,
        .moduleCard:hover {
          transform: translateY(-3px);
        }


        .trustBar span {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.075);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #cfd4e8;
          font-size: 13px;
          font-weight: 800;
        }


        .problemSolution,
        .sellerJourney,
        .modules,
        .pricing,
        .security,
        .faq,
        .finalCta {
          margin-top: 70px;
        }


        .sectionIntro h2,
        .sectionTop h2,
        .finalCta h2 {
          margin: 14px 0 0;
          font-size: clamp(32px, 4vw, 58px);
          line-height: 1;
          letter-spacing: -0.06em;
        }


        .twoGrid,
        .securityGrid,
        .faqGrid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }


        .steps {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }


        .moduleGrid,
        .pricingGrid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }


        .glassCard,
        .step,
        .moduleCard,
        .priceCard,
        .faqItem,
        .finalCta {
          border-radius: 28px;
          background: linear-gradient(145deg, rgba(255,255,255,0.13), rgba(255,255,255,0.055));
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 24px 70px rgba(0,0,0,0.28);
        }


        .glassCard,
        .step,
        .moduleCard,
        .priceCard,
        .faqItem {
          padding: 24px;
        }


        .glassCard svg,
        .moduleCard > svg,
        .faqItem > svg {
          width: 34px;
          height: 34px;
          color: #00d4ff;
          filter: drop-shadow(0 0 14px rgba(0, 212, 255, 0.3));
        }


        .step span {
          color: #00d4ff;
          font-weight: 900;
          font-size: 13px;
        }


        h3 {
          margin: 16px 0 8px;
          font-size: 22px;
        }


        .glassCard p,
        .step p,
        .moduleCard p,
        .priceCard p,
        .faqItem p,
        .finalCta p {
          margin: 0;
          color: #aab0c5;
          line-height: 1.55;
          font-size: 14px;
        }


        .sectionTop {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }


        .moduleCard {
          color: white;
          text-decoration: none;
        }


        .moduleCard span {
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #00ff9d;
          font-weight: 900;
          font-size: 14px;
        }


        .priceCard strong {
          display: block;
          margin: 12px 0;
          font-size: 34px;
          letter-spacing: -0.05em;
          color: #00ff9d;
        }


        .priceCard ul {
          list-style: none;
          padding: 0;
          margin: 18px 0;
          display: grid;
          gap: 10px;
        }


        .priceCard li {
          color: #cfd4e8;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }


        .finalCta {
          margin-bottom: 50px;
          padding: 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
        }


        .footer {
          padding: 28px 0 10px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }


        .footer p {
          color: #aab0c5;
          margin: 5px 0 0;
          font-size: 13px;
        }


        .footerLinks {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }


        .footerLinks a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }


        @media (max-width: 980px) {
          .homePage {
            padding: 20px 16px 40px;
          }


          .siteHeader {
            height: auto;
            flex-direction: column;
            align-items: flex-start;
            position: relative;
            padding-bottom: 20px;
          }


          .siteNav,
          .headerActions {
            width: 100%;
            flex-wrap: wrap;
          }


          .hero {
            min-height: auto;
            padding: 60px 0;
          }


          .steps,
          .moduleGrid,
          .pricingGrid,
          .twoGrid,
          .securityGrid,
          .faqGrid {
            grid-template-columns: 1fr;
          }


          .sectionTop,
          .finalCta,
          .footer {
            flex-direction: column;
            align-items: flex-start;
          }


          .primaryBtn,
          .secondaryBtn,
          .smallBtn,
          .ghostBtn,
          .headerBtn,
          .priceBtn {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
