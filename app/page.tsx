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
    text: "Création de factures, PDF, téléchargement, paiement Stripe et suivi des statuts.",
    icon: FileText,
    href: "/dashboard/factures",
  },
  {
    title: "Finance",
    text: "Pilotage des revenus encaissés, paiements en attente, trésorerie et rentabilité.",
    icon: Wallet,
    href: "/dashboard/finance",
  },
  {
    title: "Analytics",
    text: "Tableaux de bord connectés à Supabase, Stripe, CRM, factures et agenda.",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Abonnements",
    text: "Gestion des formules, paiements récurrents, offres SaaS et suivi client.",
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
    href: "/pricing",
    features: ["CRM limité", "Factures limitées", "Dashboard simple"],
  },
  {
    name: "Essentiel",
    price: "19€/mois",
    text: "Pour indépendants et créateurs.",
    href: "/pricing",
    features: ["Clients illimités", "Facturation", "Suivi financier"],
  },
  {
    name: "Premium",
    price: "49€/mois",
    text: "Pour piloter son activité avec IA.",
    href: "/pricing",
    features: ["IA business", "Analytics", "Stripe", "Automatisations"],
  },
  {
    name: "Pro",
    price: "99€/mois",
    text: "Pour équipes, PME et gestion avancée.",
    href: "/pricing",
    features: ["Multi-utilisateurs", "CRM avancé", "Automations", "Support prioritaire"],
  },
];


export default function HomePage() {
  return (
    <main className="homePage">
      <header className="siteHeader">
        <Link href="/" className="brand">
          <img src="/logo-flowbiz.png" alt="Logo FlowBiz" className="brandLogo" />
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
          <Link href="/login" className="ghostBtn">
            Se connecter
          </Link>


          <Link href="/register" className="headerBtn">
            Créer un compte
          </Link>
        </div>
      </header>


      <section className="hero">
        <img src="/logo-flowbiz.png" alt="Logo FlowBiz" className="heroLogo" />


        <div className="heroBadge">
          <Sparkles size={16} />
          FLOWBIZ BUSINESS OPERATING SYSTEM
        </div>


        <h1>Gérez votre entreprise depuis une seule plateforme intelligente.</h1>


        <p>
          CRM, facturation, paiements Stripe, abonnements, finance, analytics et
          automatisation IA pour indépendants, TPE et PME.
        </p>


        <div className="heroActions">
          <Link href="/register" className="primaryBtn">
            Essayer gratuitement
            <ArrowRight size={18} />
          </Link>


          <Link href="/pricing" className="secondaryBtn">
            Voir les abonnements
          </Link>


          <Link href="/login" className="secondaryBtn">
            Se connecter
          </Link>
        </div>


        <div className="trustBar">
          <span>
            <Database size={16} />
            Supabase
          </span>
          <span>
            <CreditCard size={16} />
            Stripe
          </span>
          <span>
            <ShieldCheck size={16} />
            Sécurité
          </span>
          <span>
            <Lock size={16} />
            RGPD
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
              indicateurs dans un seul espace connecté.
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
          {[
            ["01", "Créer un prospect", "Le vendeur ajoute le client dans le CRM."],
            ["02", "Transformer en client", "Le suivi commercial et l’historique sont centralisés."],
            ["03", "Créer une facture", "PDF, montant, échéance et lien Stripe."],
            ["04", "Paiement sécurisé", "Le client paie en ligne."],
            ["05", "Analyse automatique", "Les revenus remontent dans Finance et Analytics."],
            ["06", "Suivi & relance", "Les factures non réglées restent visibles."],
          ].map(([num, title, text]) => (
            <div className="step" key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>


      <section id="modules" className="modules">
        <div className="sectionTop">
          <div>
            <span className="sectionLabel">MODULES CONNECTÉS</span>
            <h2>Tout le pilotage dans une seule plateforme</h2>
          </div>


          <Link href="/register" className="smallBtn">
            Démarrer
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


              <Link href={plan.href} className="priceBtn">
                Souscrire
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
            <p>Accès utilisateur, protection des données et espace dashboard.</p>
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
            <p>Oui, la page utilise les routes existantes `/login` et `/register`.</p>
          </div>


          <div className="faqItem">
            <CreditCard />
            <h3>Peut-on souscrire ?</h3>
            <p>Oui, la souscription passe par `/pricing`, à connecter à Stripe Checkout.</p>
          </div>


          <div className="faqItem">
            <Workflow />
            <h3>Le parcours est-il automatisé ?</h3>
            <p>Le site oriente vers CRM, facturation, finance et analytics.</p>
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
            Crée un compte, choisis une offre et commence à gérer clients, factures,
            paiements, finance et analytics.
          </p>
        </div>


        <div className="ctaActions">
          <Link href="/register" className="primaryBtn">
            Créer un compte
            <ArrowRight size={18} />
          </Link>


          <Link href="/pricing" className="secondaryBtn">
            Voir les offres
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
          background: #040711;
          color: #ffffff;
          font-family: Inter, system-ui, sans-serif;
          scroll-behavior: smooth;
        }


        .homePage {
          min-height: 100vh;
          padding: 26px 42px 42px;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 14% 10%, rgba(0, 255, 157, 0.24), transparent 30%),
            radial-gradient(circle at 78% 12%, rgba(124, 92, 255, 0.34), transparent 34%),
            radial-gradient(circle at 50% 74%, rgba(0, 212, 255, 0.1), transparent 38%),
            linear-gradient(135deg, #040711 0%, #0d1228 52%, #050711 100%);
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
          max-width: 1240px;
          margin-left: auto;
          margin-right: auto;
        }


        .siteHeader {
          height: 82px;
          padding: 0 18px;
          border-radius: 26px;
          position: sticky;
          top: 16px;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
          background: rgba(8, 12, 28, 0.74);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(22px);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
        }


        .brand {
          color: #ffffff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
        }


        .brandLogo {
          width: 46px;
          height: 46px;
          object-fit: contain;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.94);
          padding: 5px;
        }


        .brand strong {
          display: block;
          font-size: 19px;
          letter-spacing: -0.04em;
        }


        .brand span {
          display: block;
          margin-top: 2px;
          color: #aab0c5;
          font-size: 11px;
          font-weight: 700;
        }


        .siteNav,
        .headerActions,
        .heroActions,
        .trustBar,
        .ctaActions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }


        .siteNav a,
        .footerLinks a {
          color: #cfd4e8;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
        }


        .hero {
          min-height: calc(100vh - 110px);
          padding: 72px 0 42px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
        }


        .hero::before {
          content: "";
          position: absolute;
          width: 680px;
          height: 680px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.12), transparent 65%);
          animation: flowGlow 7s ease-in-out infinite;
          pointer-events: none;
        }


        .heroLogo {
          width: 136px;
          height: 136px;
          object-fit: contain;
          border-radius: 30px;
          padding: 12px;
          margin-bottom: 22px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow:
            0 0 42px rgba(0, 212, 255, 0.28),
            0 24px 76px rgba(0, 0, 0, 0.36);
          animation: logoFloat 4.5s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }


        .heroBadge,
        .sectionLabel {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(124, 92, 255, 0.28), rgba(0, 212, 255, 0.12));
          border: 1px solid rgba(124, 92, 255, 0.38);
          color: #dcd6ff;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          position: relative;
          z-index: 1;
        }


        h1 {
          max-width: 1120px;
          margin: 26px 0 18px;
          font-size: clamp(52px, 8vw, 118px);
          line-height: 0.9;
          letter-spacing: -0.095em;
          background: linear-gradient(135deg, #00ff9d, #00d4ff, #7c5cff);
          color: transparent;
          background-clip: text;
          position: relative;
          z-index: 1;
        }


        .hero p {
          max-width: 900px;
          margin: 0 auto;
          color: #d4d8ea;
          font-size: clamp(18px, 2vw, 24px);
          line-height: 1.6;
          font-weight: 650;
          position: relative;
          z-index: 1;
        }


        .heroActions,
        .trustBar,
        .ctaActions {
          margin-top: 34px;
          justify-content: center;
          position: relative;
          z-index: 1;
        }


        .primaryBtn,
        .secondaryBtn,
        .smallBtn,
        .ghostBtn,
        .headerBtn,
        .priceBtn {
          min-height: 52px;
          padding: 0 22px;
          border-radius: 18px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 950;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }


        .primaryBtn,
        .headerBtn,
        .priceBtn {
          background: linear-gradient(135deg, #00ff9d, #00d4ff, #7c5cff);
          color: #ffffff;
          box-shadow: 0 0 38px rgba(0, 212, 255, 0.24);
        }


        .secondaryBtn,
        .smallBtn,
        .ghostBtn {
          background: rgba(255, 255, 255, 0.09);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #ffffff;
        }


        .primaryBtn:hover,
        .secondaryBtn:hover,
        .smallBtn:hover,
        .ghostBtn:hover,
        .headerBtn:hover,
        .priceBtn:hover,
        .moduleCard:hover,
        .step:hover,
        .glassCard:hover,
        .priceCard:hover,
        .faqItem:hover {
          transform: translateY(-4px);
        }


        .trustBar span {
          padding: 11px 15px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.075);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #cfd4e8;
          font-size: 13px;
          font-weight: 850;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }


        .problemSolution,
        .sellerJourney,
        .modules,
        .pricing,
        .security,
        .faq,
        .finalCta {
          margin-top: 84px;
        }


        .sectionIntro h2,
        .sectionTop h2,
        .finalCta h2 {
          margin: 16px 0 0;
          font-size: clamp(34px, 4vw, 60px);
          line-height: 0.98;
          letter-spacing: -0.065em;
        }


        .twoGrid,
        .securityGrid,
        .faqGrid,
        .moduleGrid,
        .pricingGrid,
        .steps {
          margin-top: 26px;
          display: grid;
          gap: 18px;
        }


        .twoGrid,
        .securityGrid,
        .faqGrid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }


        .steps,
        .moduleGrid,
        .pricingGrid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }


        .glassCard,
        .step,
        .moduleCard,
        .priceCard,
        .faqItem,
        .finalCta {
          border-radius: 32px;
          background: linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.052));
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 26px 78px rgba(0,0,0,0.3);
        }


        .glassCard,
        .step,
        .moduleCard,
        .priceCard,
        .faqItem {
          padding: 26px;
        }


        .moduleCard {
          color: #ffffff;
          text-decoration: none;
        }


        .glassCard svg,
        .moduleCard > svg,
        .faqItem > svg {
          width: 36px;
          height: 36px;
          color: #00d4ff;
        }


        .step span {
          color: #00d4ff;
          font-weight: 950;
          font-size: 13px;
        }


        h3 {
          margin: 18px 0 10px;
          font-size: 23px;
          letter-spacing: -0.03em;
        }


        .glassCard p,
        .step p,
        .moduleCard p,
        .priceCard p,
        .faqItem p,
        .finalCta p {
          margin: 0;
          color: #aab0c5;
          line-height: 1.58;
          font-size: 14px;
        }


        .sectionTop {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }


        .moduleCard span {
          margin-top: 20px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #00ff9d;
          font-weight: 950;
          font-size: 14px;
        }


        .priceCard strong {
          display: block;
          margin: 14px 0;
          font-size: 38px;
          letter-spacing: -0.055em;
          color: #00ff9d;
        }


        .priceCard ul {
          list-style: none;
          padding: 0;
          margin: 20px 0;
          display: grid;
          gap: 11px;
        }


        .priceCard li {
          color: #cfd4e8;
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 14px;
        }


        .finalCta {
          margin-bottom: 55px;
          padding: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }


        .footer {
          padding: 30px 0 10px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
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


        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.025);
          }
        }


        @keyframes flowGlow {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.75;
          }
          50% {
            transform: translateY(-24px) translateX(18px);
            opacity: 1;
          }
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
            top: 0;
            padding: 18px;
          }


          .siteNav,
          .headerActions {
            width: 100%;
          }


          .hero {
            min-height: auto;
            padding: 60px 0;
          }


          .heroLogo {
            width: 110px;
            height: 110px;
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


