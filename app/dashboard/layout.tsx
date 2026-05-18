"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Crown,
  BarChart3,
  Users,
  UserRound,
  Receipt,
  Wallet,
  FileText,
  CreditCard,
  Brain,
  Settings,
  Bell,
  CalendarDays,
  CheckSquare,
  Zap,
} from "lucide-react";


import "./dashboard-layout.css";


const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "CEO", href: "/dashboard/ceo", icon: Crown },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "CRM", href: "/dashboard/crm", icon: Users },
  { label: "Clients", href: "/dashboard/clients", icon: UserRound },
  { label: "Factures", href: "/dashboard/factures", icon: Receipt },
  { label: "Finance", href: "/dashboard/finance", icon: Wallet },
  { label: "Comptabilité", href: "/dashboard/comptabilite", icon: FileText },
  { label: "Abonnements", href: "/dashboard/abonnements", icon: CreditCard },
  { label: "FlowBiz IA", href: "/dashboard/ia", icon: Brain },
  { label: "Agenda", href: "/dashboard/agenda", icon: CalendarDays },
  { label: "Tâches", href: "/dashboard/tasks", icon: CheckSquare },
  { label: "Automations", href: "/dashboard/automations", icon: Zap },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
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
        <div className="dashboardLogo">
          <h2>FlowBiz</h2>
          <span>Business OS</span>
        </div>


        <nav className="dashboardNav">
          {navItems.map((item) => {
            const Icon = item.icon;


            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);


            return (
              <Link
                key={item.href}
                href={item.href}
                className={`dashboardNavItem ${active ? "active" : ""}`}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>


      <main className="dashboardMain">{children}</main>
    </div>
  );
}
