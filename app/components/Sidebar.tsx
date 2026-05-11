"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  FileText,
  Wallet,
  BarChart3,
  BrainCircuit,
  Building2,
  Briefcase,
  Bot,
  Settings,
  Sparkles,
} from "lucide-react";

type SidebarProps = {
  onOpenAI?: () => void;
};

const menu = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "CRM / Clients",
    href: "/clients",
    icon: Users,
  },
  {
    label: "Devis & Factures",
    href: "/factures",
    icon: FileText,
  },
  {
    label: "Finance & Banque",
    href: "/finance",
    icon: Wallet,
  },
  {
    label: "Comptabilité",
    href: "/comptabilite",
    icon: BarChart3,
  },
  {
    label: "IA Conseil",
    href: "/ia-conseil",
    icon: BrainCircuit,
  },
  {
    label: "Création entreprise",
    href: "/creation-entreprise",
    icon: Building2,
  },
  {
    label: "Business Plan",
    href: "/business-plan",
    icon: Briefcase,
  },
  {
    label: "Étude de marché",
    href: "/etude-marche",
    icon: Bot,
  },
  {
    label: "Paramètres",
    href: "/parametres",
    icon: Settings,
  },
];

export default function Sidebar({
  onOpenAI,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebarTop">

        <Link href="/" className="sidebarLogo">
          <img
            src="/flowbiz-logo.png"
            alt="FlowBiz"
            className="logoImage"
          />

          <div>
            <h2>FlowBiz</h2>
            <p>Business OS</p>
          </div>
        </Link>

        <div className="sidebarGlow" />

      </div>

      <nav className="sidebarMenu">
        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebarItem ${
                active ? "active" : ""
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebarBottom">

        <button
          className="sidebarAiButton"
          onClick={onOpenAI}
        >
          <Sparkles size={18} />
          FlowBiz IA
        </button>

        <div className="sidebarCard">

          <img
            src="/flowbiz-logo.png"
            alt="FlowBiz"
            className="sidebarCardLogo"
          />

          <h4>Mode CEO activé</h4>

          <p>
            Analyse business,
            automatisation
            intelligente et
            pilotage IA.
          </p>

        </div>

      </div>
    </aside>
  );
}
