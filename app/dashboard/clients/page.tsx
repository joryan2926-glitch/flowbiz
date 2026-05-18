"use client";


import "./clients.css";


import { useCallback, useEffect, useMemo, useState } from "react";


import {
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Edit3,
  Eye,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Receipt,
  RefreshCw,
  Save,
  Search,
  Sparkles,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";


import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


import { supabase } from "@/app/lib/supabase";


interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  city: string;
  status: string;
  revenue: number;
  notes: string;
  stripe_customer_id: string | null;
  created_at: string;
}


interface Invoice {
  id: string;
  client_id: string;
  total: number;
  payment_status: string;
  status: string;
  created_at: string;
}


interface Subscription {
  id: string;
  client_id: string;
  plan: string;
  status: string;
  amount: number;
  created_at: string;
}


interface ClientActivity {
  id: string;
  client_id: string;
  action: string;
  created_at: string;
}


export default function ClientsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);


  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);


  const [stats, setStats] = useState<any>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [activities, setActivities] = useState<ClientActivity[]>([]);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("Actif");
  const [revenue, setRevenue] = useState("");
  const [notes, setNotes] = useState("");


  const loadData = useCallback(async () => {
    try {
      setRefreshing(true);
      setErrorMessage("");


      try {
        const response = await fetch("/api/dashboard/stats", {
          cache: "no-store",
        });


        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          setStats(null);
        }
      } catch {
        setStats(null);
      }


      const [clientsRes, invoicesRes, subscriptionsRes, activitiesRes] =
        await Promise.all([
          supabase
            .from("clients")
            .select("*")
            .order("created_at", { ascending: false }),


          supabase
            .from("invoices")
            .select("*")
            .order("created_at", { ascending: false }),


          supabase.from("subscriptions").select("*"),


          supabase
            .from("client_activities")
            .select("*")
            .order("created_at", { ascending: false }),
        ]);


      if (clientsRes.error) throw clientsRes.error;
      if (invoicesRes.error) throw invoicesRes.error;
      if (subscriptionsRes.error) throw subscriptionsRes.error;
      if (activitiesRes.error) throw activitiesRes.error;


      setClients(clientsRes.data || []);
      setInvoices(invoicesRes.data || []);
      setSubscriptions(subscriptionsRes.data || []);
      setActivities(activitiesRes.data || []);
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur CRM");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);


  useEffect(() => {
    loadData();
  }, [loadData]);


  useEffect(() => {
    const channel = supabase
      .channel("clients-page-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clients" },
        loadData
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "invoices" },
        loadData
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subscriptions" },
        loadData
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "client_activities" },
        loadData
      )
      .subscribe();


    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadData]);


  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setCountry("");
    setCity("");
    setStatus("Actif");
    setRevenue("");
    setNotes("");
    setEditingClient(null);
  }


  function openCreateClient() {
    resetForm();
    setShowModal(true);
  }


  function openEditClient(client: Client) {
    setEditingClient(client);
    setName(client.name || "");
    setEmail(client.email || "");
    setPhone(client.phone || "");
    setCompany(client.company || "");
    setCountry(client.country || "");
    setCity(client.city || "");
    setStatus(client.status || "Actif");
    setRevenue(String(client.revenue || ""));
    setNotes(client.notes || "");
    setShowModal(true);
  }


  function openViewClient(client: Client) {
    setSelectedClient(client);
    setShowViewModal(true);
  }


  async function handleSaveClient() {
    try {
      setSaving(true);
      setErrorMessage("");


      if (!name.trim()) {
        setErrorMessage("Le nom du client est obligatoire.");
        return;
      }


      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        country: country.trim(),
        city: city.trim(),
        status,
        revenue: Number(revenue || 0),
        notes: notes.trim(),
      };


      if (editingClient) {
        const { error } = await supabase
          .from("clients")
          .update(payload)
          .eq("id", editingClient.id);


        if (error) throw error;


        await supabase.from("client_activities").insert([
          {
            client_id: editingClient.id,
            action: "Client modifié",
          },
        ]);
      } else {
        const { data, error } = await supabase
          .from("clients")
          .insert([payload])
          .select()
          .single();


        if (error) throw error;


        if (data?.id) {
          await supabase.from("client_activities").insert([
            {
              client_id: data.id,
              action: "Client créé",
            },
          ]);
        }


        await supabase.from("notifications").insert([
          {
            title: "Nouveau client",
            message: `${payload.name} ajouté au CRM`,
            type: "success",
          },
        ]);
      }


      await loadData();
      resetForm();
      setShowModal(false);
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur sauvegarde client");
    } finally {
      setSaving(false);
    }
  }


  async function deleteClient(client: Client) {
    const ok = window.confirm(`Supprimer ${client.name || "ce client"} ?`);
    if (!ok) return;


    try {
      setErrorMessage("");


      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", client.id);


      if (error) throw error;


      await supabase.from("client_activities").insert([
        {
          client_id: client.id,
          action: "Client supprimé",
        },
      ]);


      await loadData();
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur suppression client");
    }
  }


  function getClientRevenue(clientId: string) {
    return invoices
      .filter((invoice) => invoice.client_id === clientId)
      .reduce((acc, invoice) => acc + Number(invoice.total || 0), 0);
  }


  function getClientInvoices(clientId: string) {
    return invoices.filter((invoice) => invoice.client_id === clientId).length;
  }


  function getClientSubscription(clientId: string) {
    return subscriptions.find((sub) => sub.client_id === clientId);
  }


  const totalClients = clients.length;


  const activeClients = clients.filter(
    (client) => client.status === "Actif"
  ).length;


  const totalRevenue = invoices.reduce(
    (acc, invoice) => acc + Number(invoice.total || 0),
    0
  );


  const paidInvoices = invoices.filter(
    (invoice) => invoice.payment_status === "paid"
  ).length;


  const filteredClients = useMemo(() => {
    if (!search.trim()) return clients;


    const value = search.toLowerCase();


    return clients.filter((client) =>
      `${client.name || ""} ${client.email || ""} ${client.company || ""} ${
        client.phone || ""
      }`
        .toLowerCase()
        .includes(value)
    );
  }, [clients, search]);


  const pipeline = useMemo(() => {
    return {
      lead: clients.filter(
        (client) => client.status === "Lead" || client.status === "Prospect"
      ).length,
      qualified: clients.filter(
        (client) =>
          client.status === "Qualified" || client.status === "Qualifié"
      ).length,
      proposal: clients.filter(
        (client) =>
          client.status === "Proposal" || client.status === "Proposition"
      ).length,
      negotiation: clients.filter(
        (client) =>
          client.status === "Negotiation" || client.status === "Négociation"
      ).length,
      won: clients.filter(
        (client) =>
          client.status === "Won" ||
          client.status === "Gagné" ||
          client.status === "Actif"
      ).length,
    };
  }, [clients]);


  const recentActivities = activities.slice(0, 8);


  const revenueChart = stats?.charts?.monthlyRevenue || [];


  const statusChart = [
    { name: "Actifs", value: activeClients },
    { name: "Autres", value: Math.max(totalClients - activeClients, 0) },
  ];


  if (loading) {
    return (
      <div className="clientsLoader">
        <Loader2 className="spin" />
      </div>
    );
  }


  return (
    <div className="clientsPage">
      <header className="clientsTopbar">
        <div>
          <span className="clientsBadge">
            <Sparkles />
            FLOWBIZ CRM OS
          </span>


          <h1>Dashboard CRM</h1>
        </div>


        <div className="clientsActions">
          <button type="button" title="Notifications">
            <Bell />
          </button>


          <button type="button" onClick={loadData} title="Actualiser">
            {refreshing ? <Loader2 className="spin" /> : <RefreshCw />}
          </button>


          <button type="button" onClick={openCreateClient}>
            <Plus />
            Nouveau client
          </button>
        </div>
      </header>


      {errorMessage && (
        <div className="crmError">
          <AlertTriangle />
          {errorMessage}
        </div>
      )}


      <section className="clientsStats">
        <div className="clientStatCard">
          <Users />
          <div>
            <h2>{totalClients}</h2>
            <span>Clients</span>
          </div>
        </div>


        <div className="clientStatCard">
          <CheckCircle2 />
          <div>
            <h2>{activeClients}</h2>
            <span>Clients actifs</span>
          </div>
        </div>


        <div className="clientStatCard">
          <Receipt />
          <div>
            <h2>{paidInvoices}</h2>
            <span>Factures payées</span>
          </div>
        </div>


        <div className="clientStatCard revenue">
          <CircleDollarSign />
          <div>
            <h2>{totalRevenue.toLocaleString()}€</h2>
            <span>Revenus CRM</span>
          </div>
        </div>
      </section>


      <section className="clientsToolbar">
        <div className="clientsSearch">
          <Search />
          <input
            type="text"
            placeholder="Recherche client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>


      <section className="crmChartsGrid">
        <div className="crmChartCard large">
          <div className="chartTop">
            <BarChart3 />
            <h3>Revenus CRM</h3>
          </div>


          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueChart}>
              <defs>
                <linearGradient id="crmRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c5cff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7c5cff" stopOpacity={0} />
                </linearGradient>
              </defs>


              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />


              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#7c5cff"
                fillOpacity={1}
                fill="url(#crmRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>


        <div className="crmChartCard">
          <div className="chartTop">
            <TrendingUp />
            <h3>Statuts CRM</h3>
          </div>


          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={statusChart}
                dataKey="value"
                nameKey="name"
                outerRadius={88}
              >
                {statusChart.map((_, index) => (
                  <Cell key={index} fill={["#00ff9d", "#7c5cff"][index]} />
                ))}
              </Pie>


              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>


      <section className="crmClientTable">
        <div className="crmClientTableHeader">
          <h3>Clients CRM</h3>
          <span>{filteredClients.length} client(s)</span>
        </div>


        {filteredClients.length === 0 ? (
          <div className="emptyClients">Aucun client trouvé</div>
        ) : (
          filteredClients.map((client) => {
            const subscription = getClientSubscription(client.id);


            return (
              <article key={client.id} className="crmClientRow">
                <div className="clientAvatar">
                  {(client.name || "?").charAt(0).toUpperCase()}
                </div>


                <div className="clientIdentity">
                  <strong>{client.name || "Client sans nom"}</strong>
                  <span>
                    <Building2 />
                    {client.company || "Aucune entreprise"}
                  </span>
                </div>


                <div className="clientContact">
                  <span>
                    <Mail />
                    {client.email || "Aucun email"}
                  </span>


                  <span>
                    <Phone />
                    {client.phone || "Aucun téléphone"}
                  </span>


                  <span>
                    <MapPin />
                    {client.city || "Ville inconnue"} ·{" "}
                    {client.country || "Pays inconnu"}
                  </span>
                </div>


                <div className="clientFinance">
                  <strong>{getClientRevenue(client.id).toLocaleString()}€</strong>
                  <span>{getClientInvoices(client.id)} facture(s)</span>
                </div>


                <div className="clientPlan">
                  <strong>{subscription?.plan || "Aucun plan"}</strong>
                  <span>{subscription?.status || client.status || "Sans statut"}</span>
                </div>


                <div className="clientActions">
                  <button type="button" onClick={() => openViewClient(client)}>
                    <Eye />
                  </button>


                  <button type="button" onClick={() => openEditClient(client)}>
                    <Edit3 />
                  </button>


                  <button type="button" onClick={() => deleteClient(client)}>
                    <Trash2 />
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>


      <div className="crmBottomGrid">
        <div className="pipelineCard">
          <h3>Pipeline CRM</h3>


          <div className="pipelineStage">
            <strong>Lead</strong>
            <span>{pipeline.lead}</span>
          </div>


          <div className="pipelineStage">
            <strong>Qualified</strong>
            <span>{pipeline.qualified}</span>
          </div>


          <div className="pipelineStage">
            <strong>Proposal</strong>
            <span>{pipeline.proposal}</span>
          </div>


          <div className="pipelineStage">
            <strong>Negotiation</strong>
            <span>{pipeline.negotiation}</span>
          </div>


          <div className="pipelineStage">
            <strong>Won</strong>
            <span>{pipeline.won}</span>
          </div>
        </div>


        <div className="historyCard">
          <h3>Historique CRM</h3>


          {activities.length === 0 ? (
            <p>Aucune activité</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="activityItem">
                {activity.action}
              </div>
            ))
          )}
        </div>


        <div className="documentsCard">
          <h3>Documents clients</h3>
          <button type="button" className="uploadBtn">
            Upload
          </button>
          <p>Aucun client sélectionné</p>
        </div>


        <div className="activityCard">
          <h3>Activité récente</h3>


          {recentActivities.length === 0 ? (
            <p>Aucune activité</p>
          ) : (
            recentActivities.map((activity) => (
              <div key={activity.id} className="activityItem">
                {activity.action}
              </div>
            ))
          )}
        </div>
      </div>


      {showViewModal && selectedClient && (
        <div className="clientModalOverlay">
          <div className="clientModal">
            <div className="clientModalTop">
              <h2>{selectedClient.name}</h2>


              <button type="button" onClick={() => setShowViewModal(false)}>
                <X />
              </button>
            </div>


            <div className="clientForm">
              <p>Email : {selectedClient.email || "Non renseigné"}</p>
              <p>Téléphone : {selectedClient.phone || "Non renseigné"}</p>
              <p>Entreprise : {selectedClient.company || "Non renseigné"}</p>
              <p>
                Localisation : {selectedClient.city || "Ville inconnue"} ·{" "}
                {selectedClient.country || "Pays inconnu"}
              </p>
              <p>Statut : {selectedClient.status}</p>
              <p>Notes : {selectedClient.notes || "Aucune note"}</p>
            </div>
          </div>
        </div>
      )}


      {showModal && (
        <div className="clientModalOverlay">
          <div className="clientModal">
            <div className="clientModalTop">
              <h2>{editingClient ? "Modifier client" : "Nouveau client"}</h2>


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


            <div className="clientForm">
              <div className="doubleGrid">
                <input
                  type="text"
                  placeholder="Nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />


                <input
                  type="text"
                  placeholder="Entreprise"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>


              <div className="doubleGrid">
                <input
                  type="text"
                  placeholder="Ville"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />


                <input
                  type="text"
                  placeholder="Pays"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>


              <div className="doubleGrid">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Actif</option>
                  <option>Prospect</option>
                  <option>Lead</option>
                  <option>Qualified</option>
                  <option>Proposal</option>
                  <option>Negotiation</option>
                  <option>Won</option>
                  <option>Inactif</option>
                </select>


                <input
                  type="number"
                  placeholder="Revenu"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>


              <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />


              <button
                type="button"
                className="saveClientBtn"
                onClick={handleSaveClient}
                disabled={saving}
              >
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
