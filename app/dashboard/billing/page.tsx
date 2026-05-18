"use client";

/* ======================================================
FLOWBIZ BILLING
FINAL PAYMENT CENTER
====================================================== */

import "./billing.css";

import {

  CreditCard,
  BrainCircuit,
  Crown,
  Check,
  Receipt,
  CalendarDays,
  ArrowUpRight,
  Wallet,
  Sparkles,
  Download,
  Plus,

} from "lucide-react";

/* ======================================================
INVOICES
====================================================== */

const invoices = [

  {
    id:1,

    name:
      "Facture Avril 2026",

    amount:"49 €",

    date:"2026-04-01",
  },

  {
    id:2,

    name:
      "Facture Mars 2026",

    amount:"49 €",

    date:"2026-03-01",
  },

  {
    id:3,

    name:
      "Facture Février 2026",

    amount:"49 €",

    date:"2026-02-01",
  },
];

/* ======================================================
PAGE
====================================================== */

export default function BillingPage(){

  return(

    <div className="billingPage">

      {/* ==================================================
      HEADER
      ================================================== */}

      <header className="billingHeader">

        <div>

          <div className="billingBadge">

            <BrainCircuit size={16} />

            FLOWBIZ BILLING

          </div>

          <h1>

            Workspace Billing

          </h1>

          <p>

            Gérez les abonnements,
            paiements et facturation
            FlowBiz.

          </p>

        </div>

        {/* ============================================== */}

        <button className="billingUpgradeButton">

          <Sparkles size={18} />

          Upgrade Pro

        </button>

      </header>

      {/* ==================================================
      GRID
      ================================================== */}

      <section className="billingGrid">

        {/* ==============================================
        PLAN
        ============================================== */}

        <div className="billingCard">

          <div className="billingCardTitle">

            <Crown size={18} />

            Abonnement actuel

          </div>

          {/* ========================================== */}

          <div className="billingPlan">

            <div>

              <h2>

                FlowBiz Premium

              </h2>

              <span>

                49€/mois

              </span>

            </div>

            <div className="billingPlanBadge">

              Actif

            </div>

          </div>

          {/* ========================================== */}

          <div className="billingFeatures">

            <div>

              <Check size={16} />

              CRM illimité

            </div>

            <div>

              <Check size={16} />

              IA FlowBiz

            </div>

            <div>

              <Check size={16} />

              Analytics avancés

            </div>

            <div>

              <Check size={16} />

              Multi utilisateurs

            </div>

          </div>

        </div>

        {/* ==============================================
        PAYMENT
        ============================================== */}

        <div className="billingCard">

          <div className="billingCardTitle">

            <CreditCard size={18} />

            Moyen de paiement

          </div>

          {/* ========================================== */}

          <div className="billingPaymentCard">

            <div className="billingPaymentTop">

              <Wallet size={24} />

              VISA

            </div>

            <h3>

              **** **** **** 2048

            </h3>

            <span>

              Expire 08/28

            </span>

          </div>

          {/* ========================================== */}

          <button className="billingAddCard">

            <Plus size={18} />

            Ajouter une carte

          </button>

        </div>

      </section>

      {/* ==================================================
      USAGE
      ================================================== */}

      <section className="billingUsage">

        <div className="billingCardTitle">

          <ArrowUpRight size={18} />

          Utilisation du workspace

        </div>

        {/* ============================================== */}

        <div className="billingUsageGrid">

          <div className="billingUsageCard">

            <strong>

              78%

            </strong>

            <span>

              Stockage utilisé

            </span>

          </div>

          {/* ========================================== */}

          <div className="billingUsageCard">

            <strong>

              12 400

            </strong>

            <span>

              Requêtes IA

            </span>

          </div>

          {/* ========================================== */}

          <div className="billingUsageCard">

            <strong>

              24

            </strong>

            <span>

              Membres actifs

            </span>

          </div>

        </div>

      </section>

      {/* ==================================================
      INVOICES
      ================================================== */}

      <section className="billingInvoices">

        <div className="billingCardTitle">

          <Receipt size={18} />

          Historique factures

        </div>

        {/* ============================================== */}

        <div className="billingInvoicesList">

          {
            invoices.map(

              invoice => (

                <div

                  key={invoice.id}

                  className="billingInvoiceCard"
                >

                  <div className="billingInvoiceLeft">

                    <div className="billingInvoiceIcon">

                      <CalendarDays
                        size={20}
                      />

                    </div>

                    <div>

                      <h3>

                        {
                          invoice.name
                        }

                      </h3>

                      <span>

                        {
                          invoice.date
                        }

                      </span>

                    </div>

                  </div>

                  {/* ============================== */}

                  <div className="billingInvoiceRight">

                    <strong>

                      {
                        invoice.amount
                      }

                    </strong>

                    <button>

                      <Download
                        size={18}
                      />

                    </button>

                  </div>

                </div>
              )
            )
          }

        </div>

      </section>

    </div>
  );
}
