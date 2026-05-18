"use client";


import "./finance.css";


import { useCallback, useEffect, useMemo, useState } from "react";


import {
  Wallet,
  TrendingDown,
  Receipt,
  RefreshCcw,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit3,
  Download,
  Eye,
  CreditCard,
  Loader2,
  Save,
  X,
} from "lucide-react";


import { supabase } from "@/app/lib/supabase";
import { generateInvoicePdf } from "@/app/lib/generateInvoicePdf";


interface InvoiceItem {
  title: string;
  quantity: number;
  price: number;
}


interface FinanceInvoice {
  id: string;
  invoice_number: string;
  client_name: string;
  email?: string;
  company?: string;
  total: number;
  subtotal?: number;
  tax?: number;
  status: string;
  payment_status: string;
  due_date?: string;
  notes?: string;
  pdf_url?: string | null;
  stripe_payment_link?: string | null;
  created_at?: string;
  items?: InvoiceItem[];
}


export default function FinancePage() {
  const [invoices, setInvoices] = useState<FinanceInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");


  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<FinanceInvoice | null>(null);


  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("En attente");
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");


  const loadInvoices = useCallback(async () => {
    try {
      setRefreshing(true);
      setErrorMessage("");


      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });


      if (error) throw error;


      setInvoices((data || []) as FinanceInvoice[]);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message || "Erreur de chargement finance");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);


  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);


  useEffect(() => {
    const channel = supabase
      .channel("finance-invoices-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "invoices",
        },
        () => loadInvoices()
      )
      .subscribe();


    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadInvoices]);


  const filteredInvoices = useMemo(() => {
    const value = search.toLowerCase().trim();


    return invoices.filter((invoice) => {
      const matchSearch =
        !value ||
        `${invoice.client_name || ""} ${invoice.company || ""} ${invoice.email || ""} ${
          invoice.invoice_number || ""
        }`
          .toLowerCase()
          .includes(value);


      const matchFilter =
        filter === "all" ||
        invoice.payment_status === filter ||
        invoice.status === filter;


      return matchSearch && matchFilter;
    });
  }, [invoices, search, filter]);


  const totalRevenue = useMemo(() => {
    return invoices
      .filter((invoice) => invoice.payment_status === "paid")
      .reduce((acc, invoice) => acc + Number(invoice.total || 0), 0);
  }, [invoices]);


  const totalPending = useMemo(() => {
    return invoices
      .filter((invoice) => invoice.payment_status !== "paid")
      .reduce((acc, invoice) => acc + Number(invoice.total || 0), 0);
  }, [invoices]);


  const paidCount = invoices.filter((invoice) => invoice.payment_status === "paid").length;
  const pendingCount = invoices.filter((invoice) => invoice.payment_status !== "paid").length;


  function resetForm() {
    setEditingInvoice(null);
    setClientName("");
    setEmail("");
    setCompany("");
    setAmount("");
    setStatus("En attente");
    setPaymentStatus("unpaid");
    setDueDate("");
    setNotes("");
  }


  function openCreate() {
    resetForm();
    setShowModal(true);
  }


  function openEdit(invoice: FinanceInvoice) {
    setEditingInvoice(invoice);
    setClientName(invoice.client_name || "");
    setEmail(invoice.email || "");
    setCompany(invoice.company || "");
    setAmount(String(invoice.total || ""));
    setStatus(invoice.status || "En attente");
    setPaymentStatus(invoice.payment_status || "unpaid");
    setDueDate(invoice.due_date || "");
    setNotes(invoice.notes || "");
    setShowModal(true);
  }


  async function saveInvoice() {
    try {
      if (!clientName.trim()) {
        setErrorMessage("Le client est obligatoire.");
        return;
      }


      if (!amount || Number(amount) <= 0) {
        setErrorMessage("Le montant doit être supérieur à 0.");
        return;
      }


      setSaving(true);
      setErrorMessage("");


      const total = Number(amount);
      const subtotal = total / 1.2;
      const tax = total - subtotal;


      const payload = {
        invoice_number:
          editingInvoice?.invoice_number || `FAC-${new Date().getFullYear()}-${Date.now()}`,
        client_name: clientName,
        email,
        company,
        status,
        payment_status: paymentStatus,
        subtotal,
        tax,
        total,
        due_date: dueDate || null,
        notes,
        items: [
          {
            title: "Prestation",
            quantity: 1,
            price: total,
          },
        ],
      };


      if (editingInvoice) {
        const { error } = await supabase
          .from("invoices")
          .update(payload)
          .eq("id", editingInvoice.id);


        if (error) throw error;
      } else {
        const { data: createdInvoice, error } = await supabase
          .from("invoices")
          .insert([payload])
          .select()
          .single();


        if (error) throw error;


        try {
          const stripeResponse = await fetch("/api/stripe/create-invoice", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              invoice_id: createdInvoice.id,
              invoice_number: createdInvoice.invoice_number,
              client_name: clientName,
              email,
              company,
              total,
              items: payload.items,
            }),
          });


          if (stripeResponse.ok) {
            const stripeData = await stripeResponse.json();


            await supabase
              .from("invoices")
              .update({
                stripe_invoice_id: stripeData.invoiceId || null,
                stripe_payment_link: stripeData.hostedInvoiceUrl || stripeData.paymentUrl || null,
                stripe_customer_id: stripeData.customerId || null,
              })
              .eq("id", createdInvoice.id);
          }
        } catch (stripeError) {
          console.log("Stripe non bloquant :", stripeError);
        }


        await supabase.from("activity").insert([
          {
            type: "finance",
            title: "Facture finance créée",
            message: `Facture ${createdInvoice.invoice_number}`,
          },
        ]);
      }


      await loadInvoices();
      setShowModal(false);
      resetForm();
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message || "Erreur sauvegarde finance");
    } finally {
      setSaving(false);
    }
  }


  async function deleteInvoice(id: string) {
    const confirmDelete = window.confirm("Supprimer cette facture ?");
    if (!confirmDelete) return;


    try {
      const { error } = await supabase.from("invoices").delete().eq("id", id);
      if (error) throw error;
      await loadInvoices();
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur suppression");
    }
  }


  async function markAsPaid(invoice: FinanceInvoice) {
    try {
      const { error } = await supabase
        .from("invoices")
        .update({
          payment_status: "paid",
          status: "Payée",
        })
        .eq("id", invoice.id);


      if (error) throw error;


      await loadInvoices();
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur validation paiement");
    }
  }


  function openStripe(invoice: FinanceInvoice) {
    if (!invoice.stripe_payment_link) {
      setErrorMessage("Aucun lien Stripe disponible pour cette facture.");
      return;
    }


    window.open(invoice.stripe_payment_link, "_blank");
  }


  async function downloadInvoice(invoice: FinanceInvoice) {
    try {
      if (invoice.pdf_url) {
        window.open(invoice.pdf_url, "_blank");
        return;
      }


      const pdfBlob = await generateInvoicePdf({
        invoiceNumber: invoice.invoice_number,
        clientName: invoice.client_name,
        company: invoice.company || "",
        email: invoice.email || "",
        dueDate: invoice.due_date || "",
        items: invoice.items || [
          {
            title: "Prestation",
            quantity: 1,
            price: Number(invoice.total || 0),
          },
        ],
        subtotal: Number(invoice.subtotal || 0),
        tax: Number(invoice.tax || 0),
        total: Number(invoice.total || 0),
        notes: invoice.notes || "",
      });


      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");


      link.href = url;
      link.download = `${invoice.invoice_number || "facture"}.pdf`;
      link.click();


      URL.revokeObjectURL(url);
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur téléchargement");
    }
  }


  return (
    <div className="financePage">
      <section className="financeHero">
        <div className="financeHeroTop">
          <div>
            <span className="financeBadge">
              <Sparkles size={14} />
              FLOWBIZ FINANCE AI
            </span>


            <h1>Pilotage Financier Nouvelle Génération</h1>


            <p>
              Gérez trésorerie, facturation, analytics, rentabilité et prévisionnel depuis
              une seule plateforme intelligente.
            </p>
          </div>


          <button className="refreshButton" type="button" onClick={loadInvoices}>
            {refreshing ? <Loader2 size={18} className="spin" /> : <RefreshCcw size={18} />}
            Actualiser
          </button>
        </div>


        {errorMessage && (
          <div className="financeError">
            <AlertTriangle size={18} />
            {errorMessage}
            <button type="button" onClick={() => setErrorMessage("")}>
              <X size={16} />
            </button>
          </div>
        )}


        <div className="financeActions">
          <div className="searchBox">
            <Search size={18} />
            <input
              type="text"
              placeholder="Rechercher client, facture, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>


          <div className="filterBox">
            <Filter size={16} />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Tous</option>
              <option value="paid">Payées</option>
              <option value="unpaid">Non payées</option>
              <option value="late">Retard</option>
              <option value="Payée">Statut payée</option>
              <option value="En attente">Statut attente</option>
            </select>
          </div>


          <button className="addFinanceBtn" type="button" onClick={openCreate}>
            <Plus size={16} />
            Ajouter
          </button>
        </div>
      </section>


      <section className="financeStats">
        <div className="financeStatCard">
          <div className="statIcon green">
            <Wallet size={22} />
          </div>


          <div>
            <span>Trésorerie encaissée</span>
            <h2>{totalRevenue.toLocaleString()} €</h2>
            <p className="positive">
              <ArrowUpRight size={15} />
              Revenus validés
            </p>
          </div>
        </div>


        <div className="financeStatCard">
          <div className="statIcon yellow">
            <Clock3 size={22} />
          </div>


          <div>
            <span>Paiements en attente</span>
            <h2>{totalPending.toLocaleString()} €</h2>
            <p className="warning">
              <AlertTriangle size={15} />À surveiller
            </p>
          </div>
        </div>


        <div className="financeStatCard">
          <div className="statIcon blue">
            <Receipt size={22} />
          </div>


          <div>
            <span>Factures payées</span>
            <h2>{paidCount}</h2>
            <p className="positive">
              <CheckCircle2 size={15} />
              Transactions validées
            </p>
          </div>
        </div>


        <div className="financeStatCard">
          <div className="statIcon red">
            <TrendingDown size={22} />
          </div>


          <div>
            <span>Factures non réglées</span>
            <h2>{pendingCount}</h2>
            <p className="negative">
              <ArrowDownRight size={15} />
              Relances nécessaires
            </p>
          </div>
        </div>
      </section>


      <section className="financeInvoices">
        <div className="sectionTitle">
          <h2>Factures connectées Supabase / Stripe</h2>
          <span>{filteredInvoices.length} résultat(s)</span>
        </div>


        {loading ? (
          <div className="loadingState">
            <Loader2 className="spin" />
            Chargement...
          </div>
        ) : (
          <div className="financeGrid">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="financeCard">
                <div className="financeCardTop">
                  <div className="clientInfos">
                    <div className="clientAvatar">
                      {invoice.client_name?.charAt(0)?.toUpperCase() || "?"}
                    </div>


                    <div>
                      <h3>{invoice.client_name || "Client inconnu"}</h3>
                      <span>{invoice.invoice_number}</span>
                      <span>{invoice.company || "Aucune entreprise"}</span>
                    </div>
                  </div>


                  <div className={`statusBadge ${invoice.payment_status}`}>
                    {invoice.payment_status === "paid" ? "payé" : "en attente"}
                  </div>
                </div>


                <div className="financeAmount">
                  {Number(invoice.total || 0).toLocaleString()} €
                </div>


                <div className="financeBottom">
                  <span>{invoice.stripe_payment_link ? "Stripe connecté" : "Stripe non lié"}</span>


                  <div className="financeCardActions">
                    <button type="button" title="Voir Stripe/PDF" onClick={() => openStripe(invoice)}>
                      <Eye size={15} />
                    </button>


                    <button type="button" title="Modifier" onClick={() => openEdit(invoice)}>
                      <Edit3 size={15} />
                    </button>


                    <button type="button" title="Télécharger" onClick={() => downloadInvoice(invoice)}>
                      <Download size={15} />
                    </button>


                    <button type="button" title="Valider payé" onClick={() => markAsPaid(invoice)}>
                      <CheckCircle2 size={15} />
                    </button>


                    <button type="button" title="Supprimer" onClick={() => deleteInvoice(invoice.id)}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      {showModal && (
        <div className="financeModalOverlay">
          <div className="financeModal">
            <div className="financeModalTop">
              <h2>{editingInvoice ? "Modifier facture" : "Nouvelle facture finance"}</h2>


              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                <X />
              </button>
            </div>


            <div className="financeForm">
              <input
                type="text"
                placeholder="Client"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />


              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />


              <input
                type="text"
                placeholder="Entreprise"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />


              <input
                type="number"
                placeholder="Montant TTC"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />


              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />


              <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                <option value="unpaid">Non payé</option>
                <option value="paid">Payé</option>
                <option value="late">Retard</option>
              </select>


              <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />


              <button type="button" className="saveFinanceBtn" onClick={saveInvoice}>
                {saving ? (
                  <Loader2 className="spin" />
                ) : (
                  <>
                    <Save size={16} />
                    Sauvegarder
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
