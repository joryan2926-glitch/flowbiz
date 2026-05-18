"use client";


import "./crm.css";


import { useEffect, useMemo, useState } from "react";
import Link from "next/link";


import {
  Users,
  Search,
  Plus,
  RefreshCw,
  Loader2,
  Mail,
  Phone,
  Building2,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  TrendingUp,
  Bell,
  Settings,
} from "lucide-react";


import { supabase } from "@/app/lib/supabase";


type Client = {
  id: string;
  name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: string;
  pipeline?: string;
  revenue?: number;
  created_at?: string;
};


export default function CrmDashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Prospect");


  async function loadClients() {
    try {
      setRefreshing(true);


      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });


      if (error) {
        console.error(error);
        setClients([]);
        return;
      }


      setClients((data || []) as Client[]);
    } catch (error) {
      console.error(error);
      setClients([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }


  useEffect(() => {
    loadClients();


    const channel = supabase
      .channel("crm-clients-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "clients",
        },
        () => {
          loadClients();
        }
      )
      .subscribe();


    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


  const filteredClients = useMemo(() => {
    const value = search.toLowerCase();


    return clients.filter((client) => {
      const clientName = client.name || client.full_name || "";
      const clientEmail = client.email || "";
      const clientCompany = client.company || "";


      return (
        clientName.toLowerCase().includes(value) ||
        clientEmail.toLowerCase().includes(value) ||
        clientCompany.toLowerCase().includes(value)
      );
    });
  }, [clients, search]);


  const totalClients = clients.length;


  const activeClients = clients.filter((client) =>
    ["Actif", "Client", "Payé", "active"].includes(client.status || "")
  ).length;


  const prospects = clients.filter((client) =>
    ["Prospect", "Lead", "prospect", "lead"].includes(client.status || "")
  ).length;


  const totalRevenue = clients.reduce(
    (acc, client) => acc + Number(client.revenue || 0),
    0
  );


  async function createClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    if (!name.trim()) {
      alert("Le nom du client est obligatoire.");
      return;
    }


    try {
      setSaving(true);


      const { error } = await supabase.from("clients").insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          status,
          pipeline: status,
          revenue: 0,
        },
      ]);


      if (error) {
        console.error(error);
        alert(error.message);
        return;
      }


      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setStatus("Prospect");
      setShowForm(false);


      await loadClients();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du client.");
    } finally {
      setSaving(false);
    }
  }


  async function deleteClient(id: string) {
    const confirmDelete = confirm("Supprimer ce client ?");


    if (!confirmDelete) return;


    const { error } = await supabase.from("clients").delete().eq("id", id);


    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }


    await loadClients();
  }


  if (loading) {
    return (
      <main className="crmLoader">
        <Loader2 className="spin" />
      </main>
    );
  }


  return (
    <main className="crmPage">
      <header className="crmHeader">
        <div>
          <span className="crmBadge">
            <Users size={15} />
            FLOWBIZ CRM
          </span>


          <h1>CRM Dashboard</h1>


          <p>
            Pilote tes prospects, clients, suivis commerciaux, relances et
            revenus depuis un seul espace connecté.
          </p>
        </div>


        <div className="crmHeaderActions">
          <Link href="/dashboard/crm/notifications" className="crmIconBtn">
            <Bell size={18} />
          </Link>


          <Link href="/dashboard/crm/settings" className="crmIconBtn">
            <Settings size={18} />
          </Link>


          <button className="crmIconBtn" onClick={loadClients}>
            {refreshing ? <Loader2 className="spin" /> : <RefreshCw size={18} />}
          </button>


          <button className="crmPrimaryBtn" onClick={() => setShowForm(true)}>
            <Plus size={18} />
            Nouveau client
          </button>
        </div>
      </header>


      <section className="crmStats">
        <div className="crmStatCard">
          <Users />
          <div>
            <strong>{totalClients}</strong>
            <span>Clients</span>
          </div>
        </div>


        <div className="crmStatCard">
          <CheckCircle2 />
          <div>
            <strong>{activeClients}</strong>
            <span>Actifs</span>
          </div>
        </div>


        <div className="crmStatCard">
          <Clock3 />
          <div>
            <strong>{prospects}</strong>
            <span>Prospects</span>
          </div>
        </div>


        <div className="crmStatCard">
          <TrendingUp />
          <div>
            <strong>{totalRevenue.toLocaleString("fr-FR")}€</strong>
            <span>Revenus CRM</span>
          </div>
        </div>
      </section>


      <section className="crmToolbar">
        <div className="crmSearch">
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher client, email, entreprise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>


      {showForm && (
        <section className="crmFormCard">
          <div className="crmFormTop">
            <h2>Nouveau client</h2>


            <button onClick={() => setShowForm(false)}>Fermer</button>
          </div>


          <form onSubmit={createClient} className="crmForm">
            <input
              type="text"
              placeholder="Nom du client"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />


            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


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


            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Prospect">Prospect</option>
              <option value="Lead">Lead</option>
              <option value="Client">Client</option>
              <option value="Actif">Actif</option>
            </select>


            <button type="submit" disabled={saving}>
              {saving ? <Loader2 className="spin" /> : <Plus size={17} />}
              Ajouter
            </button>
          </form>
        </section>
      )}


      <section className="crmContent">
        {filteredClients.length === 0 ? (
          <div className="crmEmpty">
            <AlertTriangle />
            <h3>Aucun client trouvé</h3>
            <p>Ajoute un client ou modifie ta recherche.</p>
          </div>
        ) : (
          <div className="crmClientList">
            {filteredClients.map((client) => {
              const clientName =
                client.name || client.full_name || "Client sans nom";


              return (
                <article key={client.id} className="crmClientCard">
                  <div className="crmClientAvatar">
                    {clientName.charAt(0).toUpperCase()}
                  </div>


                  <div className="crmClientMain">
                    <h3>{clientName}</h3>


                    <p>
                      <Building2 size={14} />
                      {client.company || "Aucune entreprise"}
                    </p>


                    <p>
                      <Mail size={14} />
                      {client.email || "Aucun email"}
                    </p>


                    <p>
                      <Phone size={14} />
                      {client.phone || "Aucun téléphone"}
                    </p>
                  </div>


                  <div className="crmClientStatus">
                    <span>{client.status || "Prospect"}</span>


                    <strong>
                      {Number(client.revenue || 0).toLocaleString("fr-FR")}€
                    </strong>
                  </div>


                  <div className="crmClientActions">
                    <Link href={`/dashboard/clients`} className="crmActionBtn">
                      <Eye size={16} />
                    </Link>


                    <button className="crmActionBtn">
                      <Edit3 size={16} />
                    </button>


                    <button
                      className="crmActionBtn danger"
                      onClick={() => deleteClient(client.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
