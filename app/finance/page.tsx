"use client";

import "./finance.css";

import Link from "next/link";
import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import FloatingAI from "../components/FloatingAI";

import {
  AlertTriangle,
  BadgeEuro,
  Banknote,
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  Eye,
  FileText,
  Filter,
  Landmark,
  LineChart,
  PieChart,
  Plus,
  Receipt,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

type BankStatus = "Connecté" | "À vérifier" | "Erreur" | "Synchronisé";
type TransactionStatus = "À rapprocher" | "Rapproché" | "Suspect" | "Validé";
type FinanceView = "CEO" | "Trésorerie" | "Banque" | "Prévision";

const views: FinanceView[] = ["CEO", "Trésorerie", "Banque", "Prévision"];

const financialPath = [
  "Prospect",
  "Devis",
  "Facture",
  "Paiement",
  "Rapprochement",
  "Comptabilité",
  "Rentabilité",
];

const bankAccounts = [
  {
    name: "Compte Principal",
    balance: 12850,
    evolution: "+9.2%",
    status: "Connecté" as BankStatus,
    icon: Landmark,
  },
  {
    name: "Compte Épargne",
    balance: 25430,
    evolution: "+3.4%",
    status: "Synchronisé" as BankStatus,
    icon: Wallet,
  },
  {
    name: "Compte Stripe",
    balance: 4320,
    evolution: "+11.1%",
    status: "Connecté" as BankStatus,
    icon: CreditCard,
  },
  {
    name: "PayPal Business",
    balance: 1280,
    evolution: "+6.7%",
    status: "À vérifier" as BankStatus,
    icon: BadgeEuro,
  },
];

const transactions = [
  {
    id: "TR-001",
    label: "Virement client Acme Corp",
    amount: 1850,
    date: "05/05/2026",
    source: "Compte Principal",
    status: "À rapprocher" as TransactionStatus,
    linked: "Facture FAC-2026-0142",
  },
  {
    id: "TR-002",
    label: "Paiement Stripe Innovatech",
    amount: 1200,
    date: "05/05/2026",
    source: "Stripe",
    status: "À rapprocher" as TransactionStatus,
    linked: "Invoice #FAC-0124",
  },
  {
    id: "TR-003",
    label: "CB Vente Shopify",
    amount: 89,
    date: "04/05/2026",
    source: "Compte Principal",
    status: "Validé" as TransactionStatus,
    linked: "Vente boutique",
  },
  {
    id: "TR-004",
    label: "Prélèvement OVH",
    amount: -127,
    date: "03/05/2026",
    source: "Compte Principal",
    status: "À rapprocher" as TransactionStatus,
    linked: "Dépense logiciel",
  },
  {
    id: "TR-005",
    label: "Virement salaire",
    amount: -2850,
    date: "02/05/2026",
    source: "Compte Principal",
    status: "Suspect" as TransactionStatus,
    linked: "RH / paie",
  },
];

const expenses = [
  { label: "Logiciels & SaaS", amount: 3301, percent: 34, color: "blue" },
  { label: "Marketing", amount: 2621, percent: 27, color: "purple" },
  { label: "Services externes", amount: 1748, percent: 18, color: "pink" },
  { label: "Salaires", amount: 1456, percent: 15, color: "orange" },
  { label: "Autres", amount: 584, percent: 6, color: "green" },
];

const bills = [
  {
    vendor: "OVH Cloud",
    label: "Hébergement",
    amount: 127,
    date: "08/05/2026",
    urgency: "Urgent",
  },
  {
    vendor: "Canva Pro",
    label: "Abonnement",
    amount: 89,
    date: "10/05/2026",
    urgency: "Bientôt",
  },
  {
    vendor: "Adobe CC",
    label: "Licence",
    amount: 79,
    date: "12/05/2026",
    urgency: "Bientôt",
  },
];

const recommendations = [
  {
    title: "Négocier 2 abonnements",
    text: "Économie potentielle : 450 €",
    icon: TrendingUp,
  },
  {
    title: "Relancer 3 factures",
    text: "À encaisser : 2 450 €",
    icon: Receipt,
  },
  {
    title: "Optimiser trésorerie",
    text: "Excédent prévu : 18 560 €",
    icon: Sparkles,
  },
];

const alerts = [
  {
    title: "Sortie importante dans 5 jours",
    text: "3 200 € · Loyer bureaux",
    level: "Critique",
  },
  {
    title: "3 factures en retard",
    text: "Total : 2 450 €",
    level: "Attention",
  },
  {
    title: "Rapprochement bancaire",
    text: "5 opérations à rapprocher",
    level: "À traiter",
  },
];

export default function FinancePage() {
  const [view, setView] = useState<FinanceView>("CEO");
  const [selectedStep, setSelectedStep] = useState("Paiement");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [aiOpen, setAiOpen] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState(transactions[0]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchSearch =
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.source.toLowerCase().includes(query.toLowerCase()) ||
        item.status.toLowerCase().includes(query.toLowerCase()) ||
        item.linked.toLowerCase().includes(query.toLowerCase());

      const matchFilter = filter === "Tous" || item.status === filter;

      return matchSearch && matchFilter;
    });
  }, [query, filter]);

  const totalBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const incoming = 24950;
  const outgoing = 9710;
  const forecast = 18560;
  const netCash = incoming - outgoing;

  return (
    <div className="financeLayout">
      <Sidebar onOpenAI={() => setAiOpen(true)} />

      <main className="mainContent">
        <header className="topbar financeTopbar">
          <div>
            <h2>Finance & Banque</h2>
            <p>Pilotage financier en temps réel, banque, trésorerie, prévisions et IA.</p>
          </div>

          <div className="topActions">
            <div className="financeViewSwitch">
              {views.map((item) => (
                <button
                  key={item}
                  onClick={() => setView(item)}
                  className={view === item ? "activeFinanceView" : ""}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="searchBar">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher banque, facture, transaction..."
              />
            </div>

            <button className="notifBtn">
              <Bell size={18} />
              <span>6</span>
            </button>

            <button className="iaTopBtn" onClick={() => setAiOpen(true)}>
              <Sparkles size={18} />
              IA Finance
            </button>
          </div>
        </header>

        <section className="financeHero">
          <div className="heroGlow" />

          <div className="flowbizOrb" />
          <div className="flowbizRing one" />
          <div className="flowbizRing two" />

          <img src="/flowbiz-logo.png" alt="FlowBiz" className="flowbizLogoFloat hero" />
          <img src="/flowbiz-logo.png" alt="" className="flowbizWatermark" />

          <div className="flowbizParticles">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="financeHeroContent">
            <span>FlowBiz Finance Command Center</span>
            <h1>
              Votre cockpit financier intelligent
            </h1>
            <p>
              Suivez trésorerie, encaissements, dépenses, banque, factures,
              rapprochements, rentabilité et prévisions IA depuis un seul espace.
            </p>

            <div className="heroButtons">
              <button className="primaryBtn" onClick={() => setModal("transaction")}>
                <Plus size={18} />
                Ajouter transaction
              </button>

              <button className="secondaryBtn" onClick={() => setModal("rapprochement")}>
                <Landmark size={18} />
                Rapprocher banque
              </button>

              <button className="greenBtn" onClick={() => setAiOpen(true)}>
                <BrainCircuit size={18} />
                Optimiser trésorerie
              </button>
            </div>
          </div>

          <div className="financeHeroVisual">
            <div className="euroCube">
              <BadgeEuro size={72} />
            </div>
            <div className="financeOrbit one" />
            <div className="financeOrbit two" />
          </div>

          <aside className="financeHeroPanel">
            <h3>Préconisations IA</h3>

            {recommendations.map((item) => {
              const Icon = item.icon;

              return (
                <button key={item.title} onClick={() => setAiOpen(true)}>
                  <span>
                    <Icon size={18} />
                  </span>

                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </button>
              );
            })}
          </aside>
        </section>

        <section className="statsGrid financeStats">
          <Stat title="Trésorerie disponible" value={`${totalBalance.toLocaleString("fr-FR")} €`} text="+8.2% ce mois" icon={<Wallet />} color="blue" />
          <Stat title="Encaissements ce mois" value={`${incoming.toLocaleString("fr-FR")} €`} text="+12.4% ce mois" icon={<Landmark />} color="green" />
          <Stat title="Dépenses ce mois" value={`${outgoing.toLocaleString("fr-FR")} €`} text="-3.1% ce mois" icon={<TrendingDown />} color="orange" />
          <Stat title="Prévision 30 jours" value={`${forecast.toLocaleString("fr-FR")} €`} text="+14.7% prévision" icon={<LineChart />} color="pink" />
        </section>

        <section className="financeMainGrid">
          <div className="financeLeft">
            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Parcours financier client</h3>
                  <p>{selectedStep} sélectionné · du devis à la rentabilité.</p>
                </div>
                <Target size={24} />
              </div>

              <div className="financeJourney">
                {financialPath.map((step, index) => (
                  <button
                    key={step}
                    onClick={() => setSelectedStep(step)}
                    className={selectedStep === step ? "financeStep activeFinanceStep" : "financeStep"}
                  >
                    <strong>{index + 1}</strong>
                    <span>{step}</span>
                  </button>
                ))}
              </div>

              <div className="financeJourneyDetails">
                <div>
                  <span>Étape actuelle</span>
                  <strong>{selectedStep}</strong>
                  <div className="progressBar">
                    <i style={{ width: `${selectedStep === "Paiement" ? 72 : 48}%` }} />
                  </div>
                </div>

                <div>
                  <span>Prochaine action</span>
                  <strong>
                    {selectedStep === "Paiement"
                      ? "Rapprochement bancaire"
                      : "Validation automatique"}
                  </strong>
                  <p>2 opérations à traiter.</p>
                </div>
              </div>
            </section>
<section className="cashflowCard">

  <div className="cashflowHeader">
    <div className="cashflowTitle">
      <h3>Flux de trésorerie</h3>
      <p>Encaissements / décaissements des 30 derniers jours.</p>
    </div>

    <div className="cashflowBadge">
      📊
    </div>
  </div>

  <div className="cashflowChart">

    {[35,45,55,70,82,40,52,64,75,88,42,50,60,76,84,92,45,58,69,83,48,62,74,89].map((height, index) => (
      <div
        key={index}
        className={`cashBar ${index % 4 === 0 ? "orange" : "green"}`}
        style={{
          height: `${height}%`,
          animationDelay: `${index * 0.05}s`
        }}
      />
    ))}

  </div>

  <div className="cashLegend">

    <div className="cashLegendItem">
      <span className="cashDot green"></span>
      Encaissements : 24 950 €
    </div>

    <div className="cashLegendItem">
      <span className="cashDot orange"></span>
      Décaissements : 9 710 €
    </div>

    <div className="cashTotal">
      Net : +15 240 €
    </div>

  </div>

</section>


            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Rapprochement bancaire</h3>
                  <p>{filteredTransactions.length} opération(s) à analyser, relier ou valider.</p>
                </div>

                <div className="filterMini">
                  {["Tous", "À rapprocher", "Validé", "Suspect"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={filter === item ? "activeFilterMini" : ""}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="transactionGrid">
                {filteredTransactions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTransaction(item)}
                    className={
                      selectedTransaction.id === item.id
                        ? "transactionCard activeTransaction"
                        : "transactionCard"
                    }
                  >
                    <div className="transactionTop">
                      <span className={item.amount >= 0 ? "transactionIcon in" : "transactionIcon out"}>
                        {item.amount >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      </span>

                      <div>
                        <strong>{item.label}</strong>
                        <p>{item.source}</p>
                      </div>
                    </div>

                    <div className="transactionBottom">
                      <strong className={item.amount >= 0 ? "amountIn" : "amountOut"}>
                        {item.amount > 0 ? "+" : ""}
                        {item.amount.toLocaleString("fr-FR")} €
                      </strong>
                      <span>{item.date}</span>
                    </div>

                    <em>{item.status}</em>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="financeRight">
            <section className="card bankPanel">
              <div className="sectionHeader">
                <div>
                  <h3>Comptes bancaires</h3>
                  <p>Soldes synchronisés.</p>
                </div>
                <Link href="/parametres">Connecter</Link>
              </div>

              <div className="bankList">
                {bankAccounts.map((account) => {
                  const Icon = account.icon;

                  return (
                    <div className="bankRow" key={account.name}>
                      <div className="bankIcon">
                        <Icon size={20} />
                      </div>

                      <div>
                        <strong>{account.name}</strong>
                        <p>{account.status}</p>
                      </div>

                      <div>
                        <strong>{account.balance.toLocaleString("fr-FR")} €</strong>
                        <span>{account.evolution}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Répartition dépenses</h3>
                  <p>Ce mois-ci : {totalExpenses.toLocaleString("fr-FR")} €.</p>
                </div>
                <PieChart size={24} />
              </div>

              <div className="expenseBlock">
                <div className="donutChart">
                  <strong>{totalExpenses.toLocaleString("fr-FR")} €</strong>
                  <span>Total</span>
                </div>

                <div className="expenseLegend">
                  {expenses.map((expense) => (
                    <div key={expense.label}>
                      <span className={`legendDot ${expense.color}`} />
                      <p>{expense.label}</p>
                      <strong>{expense.percent}%</strong>
                      <em>{expense.amount.toLocaleString("fr-FR")} €</em>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="card">
              <div className="sectionHeader">
                <div>
                  <h3>Factures à payer</h3>
                  <p>{bills.length} échéance(s) à surveiller.</p>
                </div>
                <Receipt size={24} />
              </div>

              <div className="billList">
                {bills.map((bill) => (
                  <div className="billRow" key={bill.vendor}>
                    <div>
                      <strong>{bill.vendor}</strong>
                      <p>{bill.label}</p>
                    </div>

                    <div>
                      <strong>{bill.amount} €</strong>
                      <span>{bill.date}</span>
                    </div>

                    <em className={bill.urgency === "Urgent" ? "urgent" : ""}>
                      {bill.urgency}
                    </em>
                  </div>
                ))}
              </div>
            </section>

            <section className="card indicatorPanel">
              <div className="sectionHeader">
                <div>
                  <h3>Indicateurs financiers</h3>
                  <p>Lecture CEO immédiate.</p>
                </div>
                <ShieldCheck size={24} />
              </div>

              <div className="indicatorGrid">
                <Indicator title="Marge brute" value="68%" text="+5%" />
                <Indicator title="Ratio santé" value="2.8" text="+0.4" />
                <Indicator title="Besoin BFR" value="12j" text="-3j" />
                <Indicator title="Tréso nette" value="15 240 €" text="+8.2%" />
              </div>
            </section>

            <section className="card alertPanel">
              <div className="sectionHeader">
                <div>
                  <h3>Alertes financières</h3>
                  <p>Risques et urgences.</p>
                </div>
                <AlertTriangle size={24} />
              </div>

              <div className="alertList">
                {alerts.map((alert) => (
                  <div className="alertRow" key={alert.title}>
                    <span>
                      <AlertTriangle size={16} />
                    </span>

                    <div>
                      <strong>{alert.title}</strong>
                      <p>{alert.text}</p>
                    </div>

                    <em>{alert.level}</em>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>

        <section className="card financeMission">
          <div>
            <strong>Mission du jour</strong>
            <p>Sécuriser 12 850 € d’ici la fin de la semaine.</p>
          </div>

          <div className="missionProgress">
            <span>68%</span>
            <div>
              <i />
            </div>
          </div>

          <button onClick={() => setAiOpen(true)}>
            <Sparkles size={18} />
            Demander le plan IA
          </button>
        </section>
      </main>

      <FloatingAI onClick={() => setAiOpen(true)} />

      {modal && (
        <div className="modalOverlay">
          <div className="actionModal">
            <button className="closeAi" onClick={() => setModal(null)}>
              <X size={18} />
            </button>

            <div className="modalIcon">
              {modal === "rapprochement" ? <Landmark /> : modal === "export" ? <Download /> : <Wallet />}
            </div>

            <h3>
              {modal === "transaction" && "Ajouter une transaction"}
              {modal === "rapprochement" && "Rapprochement bancaire"}
              {modal === "export" && "Exporter les données finance"}
            </h3>

            <p>
              Action prête à connecter : banque, Stripe, factures, comptabilité,
              automatisations, prévisionnel et IA financière.
            </p>

            <div className="modalFields">
              <input placeholder="Compte / source" />
              <input placeholder="Montant" />
              <input placeholder="Facture ou client lié" />
            </div>

            <div className="modalActions">
              <button onClick={() => setModal(null)}>Annuler</button>
              <Link href="/finance">Continuer</Link>
            </div>
          </div>
        </div>
      )}

      {aiOpen && (
        <aside className="aiDrawer">
          <button className="closeAi" onClick={() => setAiOpen(false)}>
            <X size={18} />
          </button>

          <div className="drawerHead">
            <img src="/flowbiz-logo.png" alt="FlowBiz" />
            <div>
              <h3>Copilote Finance FlowBiz</h3>
              <p>Analyse bancaire, trésorerie, prévision et rentabilité.</p>
            </div>
          </div>

          <div className="drawerList">
            <div>
              <strong>1. Sécuriser 12 850 €</strong>
              <p>Priorité : relancer 3 factures et envoyer 2 liens de paiement.</p>
              <Link href="/factures">Voir factures</Link>
            </div>

            <div>
              <strong>2. Réduire les dépenses SaaS</strong>
              <p>Deux abonnements peuvent être renégociés. Économie : 450 €.</p>
              <button onClick={() => setModal("export")}>Préparer audit</button>
            </div>

            <div>
              <strong>3. Rapprocher 5 opérations</strong>
              <p>La comptabilité pourra être mise à jour automatiquement après validation.</p>
              <button onClick={() => setModal("rapprochement")}>Lancer rapprochement</button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function Stat({ title, value, text, icon, color }: any) {
  return (
    <div className="statCard">
      <div className="statTop">
        <div>
          <p>{title}</p>
          <h2>{value}</h2>
          <span>{text}</span>
        </div>

        <div className={`statIcon ${color}`}>
          {icon}
        </div>
      </div>

      <div className={`miniLine ${color}`} />
    </div>
  );
}

function Indicator({ title, value, text }: any) {
  return (
    <div className="indicatorCard">
      <div className="indicatorCircle">
        <strong>{value}</strong>
      </div>
      <span>{title}</span>
      <p>{text}</p>
    </div>
  );
}
