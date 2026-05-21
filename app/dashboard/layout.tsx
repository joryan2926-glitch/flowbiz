"use client";


import "./dashboard-layout.css";


import Link from "next/link";
import { usePathname } from "next/navigation";


import {
  LayoutDashboard,
  Users,
  FileText,
  Wallet,
  BarChart3,
  CreditCard,
  GraduationCap,
  CalendarDays,
  Brain,
  Bot,
  Building2,
  ClipboardList,
  Bell,
  Settings,
  Activity,
  BriefcaseBusiness,
  ReceiptText,
  FolderOpen,
  Megaphone,
  ShieldCheck,
  LogOut,
} from "lucide-react";


const pages = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "CRM", href: "/dashboard/crm", icon: Users },
  { label: "Factures", href: "/dashboard/factures", icon: FileText },
  { label: "Finance", href: "/dashboard/finance", icon: Wallet },
  { label: "Comptabilité", href: "/dashboard/comptabilite", icon: ReceiptText },
  { label: "Abonnements", href: "/dashboard/abonnements", icon: CreditCard },
  { label: "Academy", href: "/dashboard/academy", icon: GraduationCap },
  { label: "Agenda", href: "/dashboard/agenda", icon: CalendarDays },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "FlowBiz IA", href: "/dashboard/flowbiz-ia", icon: Brain },
  { label: "Automations", href: "/dashboard/automations", icon: Bot },
  { label: "Tâches", href: "/dashboard/tasks", icon: ClipboardList },
  { label: "Activité", href: "/dashboard/activity", icon: Activity },
  { label: "Création entreprise", href: "/dashboard/creation-entreprise", icon: Building2 },
  { label: "Business plan", href: "/dashboard/business-plan", icon: BriefcaseBusiness },
  { label: "Marketing réseaux", href: "/dashboard/marketing-reseaux", icon: Megaphone },
  { label: "Investors", href: "/dashboard/investors", icon: FolderOpen },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Sécurité", href: "/dashboard/security", icon: ShieldCheck },
  { label: "Paramètres", href: "/dashboard/settings", icon: Settings },
];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();


  return (
    <div className="dashboardShell">
      <aside className="dashboardSidebar">
        <Link href="/" className="dashboardBrand">
          <div className="dashboardBrandIcon">F</div>


          <div>
            <strong>FlowBiz</strong>
            <span>Business OS</span>
          </div>
        </Link>


        <nav className="dashboardNav">
          {pages.map((page) => {
            const Icon = page.icon;
            const active =
              pathname === page.href || pathname.startsWith(`${page.href}/`);


            return (
              <Link
                key={page.href}
                href={page.href}
                className={`dashboardNavItem ${active ? "active" : ""}`}
              >
                <Icon size={17} />
                <span>{page.label}</span>
              </Link>
            );
          })}
        </nav>


        <div className="dashboardSidebarFooter">
          <Link href="/" className="dashboardLogout">
            <LogOut size={17} />
            Retour site
          </Link>
        </div>
      </aside>


      <main className="dashboardMain">{children}</main>
    </div>
  );
}
