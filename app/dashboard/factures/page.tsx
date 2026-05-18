"use client";


import "./factures.css";


import { useCallback, useEffect, useMemo, useState } from "react";


import {
  Plus,
  Search,
  Bell,
  Sparkles,
  DollarSign,
  AlertTriangle,
  Users,
  Download,
  Mail,
  Eye,
  Trash2,
  Edit3,
  Loader2,
  CheckCircle2,
  Save,
  X,
  RefreshCw,
  Clock3,
  FileText,
  CreditCard,
} from "lucide-react";


import { supabase } from "@/app/lib/supabase";
import { generateInvoicePdf } from "@/app/lib/generateInvoicePdf";
import { uploadInvoicePdf } from "@/app/lib/uploadInvoicePdf";


interface InvoiceItem {
  title: string;
  quantity: number;
  price: number;
}


interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  email: string;
  company: string;
  status: string;
  total: number;
  subtotal: number;
  tax: number;
  payment_status: string;
  created_at: string;
  due_date: string;
  notes: string;
  stripe_invoice_id?: string | null;
  stripe_payment_link?: string | null;
  stripe_customer_id?: string | null;
  pdf_url?: string | null;
  items: InvoiceItem[];
}


export default function FacturesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);


  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clientsCount, setClientsCount] = useState(0);
  const [stripeConnected, setStripeConnected] = useState(false);


  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("En attente");
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { title: "", quantity: 1, price: 0 },
  ]);


  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
}, []);


  const subtotal = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + Number(item.quantity || 0) * Number(item.price || 0),
      0
    );
  }, [items]);


  const tax = subtotal * 0.2;
  const total = subtotal + tax;


  const totalRevenue = useMemo(() => {
    return invoices.reduce((acc, invoice) => acc + Number(invoice.total || 0), 0);
  }, [invoices]);


  const paidInvoices = useMemo(() => {
    return invoices.filter((invoice) => invoice.payment_status === "paid").length;
  }, [invoices]);


  const lateInvoices = useMemo(() => {
    const today = new Date();


    return invoices.filter((invoice) => {
      if (!invoice.due_date) return false;


      return invoice.payment_status !== "paid" && new Date(invoice.due_date) < today;
    }).length;
  }, [invoices]);


  const filteredInvoices = useMemo(() => {
    const value = search.toLowerCase().trim();


    if (!value) return invoices;


    return invoices.filter((invoice) =>
      `${invoice.client_name || ""} ${invoice.email || ""} ${invoice.company || ""} ${invoice.invoice_number || ""}`
        .toLowerCase()
        .includes(value)
    );
  }, [invoices, search]);


  const loadInvoices = useCallback(async () => {
    try {
      setRefreshing(true);
      setErrorMessage("");


      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });


      if (error) throw error;


      setInvoices((data || []) as Invoice[]);


      const { count } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true });


      setClientsCount(count || 0);


      try {
        const response = await fetch("/api/stripe/check", {
          cache: "no-store",
        });


        setStripeConnected(response.ok);
      } catch {
        setStripeConnected(false);
      }
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message || "Erreur de chargement des factures");
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
      .channel("flowbiz-invoices-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "invoices",
        },
        () => {
          loadInvoices();
        }
      )
      .subscribe();


    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadInvoices]);


  function resetForm() {
    setClientName("");
    setEmail("");
    setCompany("");
    setStatus("En attente");
    setPaymentStatus("unpaid");
    setNotes("");
    setDueDate("");
    setItems([{ title: "", quantity: 1, price: 0 }]);
    setEditingInvoice(null);
  }


  function openCreateModal() {
    resetForm();
    setShowModal(true);
  }


  function openEdit(invoice: Invoice) {
    setEditingInvoice(invoice);
    setClientName(invoice.client_name || "");
    setEmail(invoice.email || "");
    setCompany(invoice.company || "");
    setStatus(invoice.status || "En attente");
    setPaymentStatus(invoice.payment_status || "unpaid");
    setNotes(invoice.notes || "");
    setDueDate(invoice.due_date || "");
    setItems(
      invoice.items?.length
        ? invoice.items
        : [{ title: "", quantity: 1, price: 0 }]
    );
    setShowModal(true);
  }


  function updateItem(index: number, field: keyof InvoiceItem, value: string | number) {
    setItems((current) => {
      const updated = [...current];


      updated[index] = {
        ...updated[index],
        [field]: field === "title" ? String(value) : Number(value || 0),
      };


      return updated;
    });
  }


  function addItem() {
    setItems((current) => [...current, { title: "", quantity: 1, price: 0 }]);
  }


  function removeItem(index: number) {
    setItems((current) => {
      if (current.length === 1) return current;
      return current.filter((_, itemIndex) => itemIndex !== index);
    });
  }


  async function createOrUploadPdf(invoiceId: string, invoiceNumber: string) {
    const pdfBlob = await generateInvoicePdf({
      invoiceNumber,
      clientName,
      company,
      email,
      dueDate,
      items,
      subtotal,
      tax,
      total,
      notes,
    });


    const pdfUrl = await uploadInvoicePdf(pdfBlob, invoiceId);


    return {
      pdfBlob,
      pdfUrl,
    };
  }


  async function handleSaveInvoice() {
    try {
      if (!clientName.trim()) {
        setErrorMessage("Le nom du client est obligatoire.");
        return;
      }


      if (!email.trim()) {
        setErrorMessage("L’email du client est obligatoire.");
        return;
      }


      const validItems = items.filter(
        (item) => item.title.trim() && Number(item.quantity) > 0 && Number(item.price) >= 0
      );


      if (validItems.length === 0) {
        setErrorMessage("Ajoute au moins une ligne de facture valide.");
        return;
      }


      setSaving(true);
      setErrorMessage("");


      const invoiceNumber =
        editingInvoice?.invoice_number || `FAC-${new Date().getFullYear()}-${Date.now()}`;


      const payload = {
        invoice_number: invoiceNumber,
        client_name: clientName,
        email,
        company,
        status,
        payment_status: paymentStatus,
        subtotal,
        tax,
        total,
        notes,
        due_date: dueDate || null,
        items: validItems,
      };


      if (editingInvoice) {
        const { pdfUrl } = await createOrUploadPdf(
          editingInvoice.id,
          editingInvoice.invoice_number
        );


        const { error } = await supabase
          .from("invoices")
          .update({
            ...payload,
            pdf_url: pdfUrl,
          })
          .eq("id", editingInvoice.id);


        if (error) throw error;


        await supabase.from("activity").insert([
          {
            type: "invoice",
            title: "Facture modifiée",
            message: `Facture ${editingInvoice.invoice_number} mise à jour`,
          },
        ]);
      } else {
        const { data: createdInvoice, error } = await supabase
          .from("invoices")
          .insert([payload])
          .select()
          .single();


        if (error) throw error;


        let stripeData: any = null;


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
              items: validItems,
              subtotal,
              tax,
              total,
              due_date: dueDate,
            }),
          });


          if (stripeResponse.ok) {
            stripeData = await stripeResponse.json();
          }
        } catch (stripeError) {
          console.log("Stripe non bloquant :", stripeError);
        }


        const { pdfUrl } = await createOrUploadPdf(
          createdInvoice.id,
          createdInvoice.invoice_number
        );


        await supabase
          .from("invoices")
          .update({
            stripe_invoice_id: stripeData?.invoiceId || null,
            stripe_payment_link: stripeData?.hostedInvoiceUrl || stripeData?.paymentUrl || null,
            stripe_customer_id: stripeData?.customerId || null,
            pdf_url: pdfUrl,
          })
          .eq("id", createdInvoice.id);


        try {
          await fetch("/api/email/send-invoice", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              client_name: clientName,
              invoice_number: createdInvoice.invoice_number,
              total,
              pdf_url: pdfUrl,
              payment_url: stripeData?.hostedInvoiceUrl || stripeData?.paymentUrl || null,
            }),
          });
        } catch (emailError) {
          console.log("Email non bloquant :", emailError);
        }


        await supabase.from("activity").insert([
          {
            type: "invoice",
            title: "Facture créée",
            message: `Facture ${createdInvoice.invoice_number}`,
          },
        ]);


        await supabase.from("notifications").insert([
          {
            title: "Nouvelle facture",
            message: `${createdInvoice.invoice_number} créée`,
            type: "success",
          },
        ]);
      }


      await loadInvoices();
      setShowModal(false);
      resetForm();
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.message || "Erreur lors de la sauvegarde");
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
      setErrorMessage(error.message || "Erreur suppression facture");
    }
  }


  async function markAsPaid(invoice: Invoice) {
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


  async function downloadInvoice(invoice: Invoice) {
    try {
      if (invoice.pdf_url) {
        window.open(invoice.pdf_url, "_blank");
        return;
      }


      const pdfBlob = await generateInvoicePdf({
        invoiceNumber: invoice.invoice_number,
        clientName: invoice.client_name,
        company: invoice.company,
        email: invoice.email,
        dueDate: invoice.due_date,
        items: invoice.items || [],
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
      setErrorMessage(error.message || "Erreur téléchargement facture");
    }
  }


  function openInvoice(invoice: Invoice) {
    if (invoice.pdf_url) {
      window.open(invoice.pdf_url, "_blank");
      return;
    }


    if (invoice.stripe_payment_link) {
      window.open(invoice.stripe_payment_link, "_blank");
      return;
    }


    setErrorMessage("Aucun PDF ou lien Stripe disponible pour cette facture.");
  }


  function openPaymentLink(invoice: Invoice) {
    if (!invoice.stripe_payment_link) {
      setErrorMessage("Aucun lien de paiement Stripe disponible.");
      return;
    }


    window.open(invoice.stripe_payment_link, "_blank");
  }


  async function sendInvoice(invoice: Invoice) {
    try {
      const response = await fetch("/api/email/send-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: invoice.email,
          client_name: invoice.client_name,
          invoice_number: invoice.invoice_number,
          total: invoice.total,
          pdf_url: invoice.pdf_url,
          payment_url: invoice.stripe_payment_link,
        }),
      });


      if (!response.ok) {
        throw new Error("Email non envoyé");
      }


      await supabase.from("notifications").insert([
        {
          title: "Facture envoyée",
          message: `${invoice.invoice_number} envoyée à ${invoice.email}`,
          type: "success",
        },
      ]);
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur envoi email");
    }
  }


  if (loading) {
    return (
      <div className="facturesLoader">
        <Loader2 className="spin" />
      </div>
    );
  }


  return (
    <div className="facturesPage">
      <div className="facturesGlowOne" />
      <div className="facturesGlowTwo" />


      <header className="facturesTopbar">
        <div>
          <span className="facturesBadge">
            <Sparkles />
            FLOWBIZ BILLING OS
          </span>


          <h1>Facturation</h1>
        </div>


        <div className="facturesActions">
          <button type="button">
            <Bell />
          </button>


          <button type="button" className="refreshBtn" onClick={loadInvoices}>
            {refreshing ? <Loader2 className="spin" /> : <RefreshCw />}
          </button>


          <button type="button" onClick={openCreateModal}>
            <Plus />
            Nouvelle facture
          </button>
        </div>
      </header>


      {errorMessage && (
        <div className="factureError">
          <AlertTriangle />
          <span>{errorMessage}</span>
          <button type="button" onClick={() => setErrorMessage("")}>
            <X />
          </button>
        </div>
      )}


      <section className="facturesStats">
        <div className="factureStatCard">
          <DollarSign />
          <div>
            <h2>{totalRevenue.toLocaleString()}€</h2>
            <span>Revenus</span>
          </div>
        </div>


        <div className="factureStatCard">
          <CheckCircle2 />
          <div>
            <h2>{paidInvoices}</h2>
            <span>Payées</span>
          </div>
        </div>


        <div className="factureStatCard">
          <Clock3 />
          <div>
            <h2>{lateInvoices}</h2>
            <span>Retards</span>
          </div>
        </div>


        <div className="factureStatCard">
          <Users />
          <div>
            <h2>{clientsCount}</h2>
            <span>Clients</span>
          </div>
        </div>
      </section>


      <section className="facturesToolbar">
        <div className="facturesSearch">
          <Search />
          <input
            type="text"
            placeholder="Recherche facture..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <div className={`stripeStatus ${stripeConnected ? "connected" : "offline"}`}>
          <CreditCard />
          {stripeConnected ? "Stripe connecté" : "Stripe non connecté"}
        </div>
      </section>


      <section className="invoiceStatusGrid">
        <div>
          <strong>{invoices.length}</strong>
          <span>Total factures</span>
        </div>


        <div>
          <strong>{paidInvoices}</strong>
          <span>Factures payées</span>
        </div>


        <div>
          <strong>{lateInvoices}</strong>
          <span>Factures en retard</span>
        </div>


        <div>
          <strong>{filteredInvoices.length}</strong>
          <span>Résultats affichés</span>
        </div>
      </section>


      <section className="invoiceTable">
        {filteredInvoices.length === 0 ? (
          <div className="emptyInvoices">Aucune facture trouvée</div>
        ) : (
          filteredInvoices.map((invoice) => (
            <article key={invoice.id} className="invoiceRow">
              <div className="invoiceMain">
                <div className="invoiceIcon">
                  <FileText />
                </div>


                <div>
                  <strong>{invoice.invoice_number}</strong>
                  <span>{invoice.client_name}</span>
                  <span>{invoice.company || "Aucune entreprise"}</span>
                </div>
              </div>


              <div className="invoiceMeta">
                <span>{invoice.email}</span>
                <span>Échéance : {invoice.due_date || "Non définie"}</span>
              </div>


              <div className="invoiceAmount">
                <strong>{Number(invoice.total || 0).toLocaleString()}€</strong>
                <span>{invoice.payment_status === "paid" ? "Payée" : "Non payée"}</span>
              </div>


              <div className="invoiceActions">
                <button type="button" title="Voir" onClick={() => openInvoice(invoice)}>
                  <Eye />
                </button>


                <button type="button" title="Modifier" onClick={() => openEdit(invoice)}>
                  <Edit3 />
                </button>


                <button type="button" title="Télécharger" onClick={() => downloadInvoice(invoice)}>
                  <Download />
                </button>


                <button type="button" title="Envoyer" onClick={() => sendInvoice(invoice)}>
                  <Mail />
                </button>


                <button type="button" title="Paiement Stripe" onClick={() => openPaymentLink(invoice)}>
                  <CreditCard />
                </button>


                <button type="button" title="Valider payée" onClick={() => markAsPaid(invoice)}>
                  <CheckCircle2 />
                </button>


                <button type="button" title="Supprimer" onClick={() => deleteInvoice(invoice.id)}>
                  <Trash2 />
                </button>
              </div>
            </article>
          ))
        )}
      </section>


      {showModal && (
        <div className="invoiceModalOverlay">
          <div className="invoiceModal">
            <div className="invoiceModalTop">
              <h2>{editingInvoice ? "Modifier facture" : "Nouvelle facture"}</h2>


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


            <div className="invoiceForm">
              <div className="doubleGrid">
                <input
                  type="text"
                  placeholder="Nom client"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />


                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>


              <div className="doubleGrid">
                <input
                  type="text"
                  placeholder="Entreprise"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />


                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>


              <div className="doubleGrid">
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>En attente</option>
                  <option>Envoyée</option>
                  <option>Payée</option>
                  <option>En retard</option>
                  <option>Annulée</option>
                </select>


                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="unpaid">Non payée</option>
                  <option value="paid">Payée</option>
                  <option value="late">En retard</option>
                  <option value="cancelled">Annulée</option>
                </select>
              </div>


              <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />


              <button type="button" className="addItemBtn" onClick={addItem}>
                <Plus />
                Ajouter une ligne
              </button>


              {items.map((item, index) => (
                <div key={index} className="invoiceItemRow">
                  <input
                    type="text"
                    placeholder="Service"
                    value={item.title}
                    onChange={(e) => updateItem(index, "title", e.target.value)}
                  />


                  <input
                    type="number"
                    placeholder="Qté"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", e.target.value)}
                  />


                  <input
                    type="number"
                    placeholder="Prix"
                    value={item.price}
                    onChange={(e) => updateItem(index, "price", e.target.value)}
                  />


                  <button type="button" onClick={() => removeItem(index)}>
                    <Trash2 />
                  </button>
                </div>
              ))}


              <div className="invoiceTotals">
                <div>Sous-total : {subtotal.toFixed(2)}€</div>
                <div>TVA : {tax.toFixed(2)}€</div>
                <div className="invoiceGrandTotal">TOTAL : {total.toFixed(2)}€</div>
              </div>


              <button type="button" className="saveInvoiceBtn" onClick={handleSaveInvoice}>
                {saving ? (
                  <Loader2 className="spin" />
                ) : (
                  <>
                    <Save />
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
