"use client";


import {
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  MapPin,
  Receipt,
  BadgeEuro,
  CreditCard,
} from "lucide-react";


import "./ClientTable.css";


export default function ClientTable({
  clients = [],
  invoices = [],
  subscriptions = [],
  onEdit,
  onDelete,
}: any) {
  function getClientRevenue(clientId: string) {
    return invoices
      .filter((invoice: any) => invoice.client_id === clientId)
      .reduce(
        (acc: number, invoice: any) =>
          acc + Number(invoice.total || invoice.amount || 0),
        0
      );
  }


  function getClientInvoices(clientId: string) {
    return invoices.filter((invoice: any) => invoice.client_id === clientId).length;
  }


  function getClientSubscription(clientId: string) {
    return subscriptions.find((sub: any) => sub.client_id === clientId);
  }


  if (!clients.length) {
    return (
      <section className="crmClientTable">
        <div className="emptyClients">Aucun client trouvé</div>
      </section>
    );
  }


  return (
    <section className="crmClientTable">
      <div className="crmClientTableHeader">
        <h3>Clients CRM</h3>
        <span>{clients.length} client(s)</span>
      </div>


      {clients.map((client: any) => {
        const subscription = getClientSubscription(client.id);


        return (
          <article key={client.id} className="crmClientRow">
            <div className="clientAvatar">
              {(client.name || "?").charAt(0).toUpperCase()}
            </div>


            <div className="clientIdentity">
              <strong>{client.name || "Client sans nom"}</strong>
              <span>
                <Building2 /> {client.company || "Aucune entreprise"}
              </span>
            </div>


            <div className="clientContact">
              <span>
                <Mail /> {client.email || "Aucun email"}
              </span>
              <span>
                <Phone /> {client.phone || "Aucun téléphone"}
              </span>
              <span>
                <MapPin /> {client.city || "Ville inconnue"} · {client.country || "Pays inconnu"}
              </span>
            </div>


            <div className="clientFinance">
              <strong>
                <BadgeEuro /> {getClientRevenue(client.id).toLocaleString()}€
              </strong>
              <span>
                <Receipt /> {getClientInvoices(client.id)} facture(s)
              </span>
            </div>


            <div className="clientPlan">
              <strong>
                <CreditCard /> {subscription?.plan || "Aucun plan"}
              </strong>
              <span>{subscription?.status || client.status || "Sans statut"}</span>
            </div>


            <div className="clientActions">
              <button type="button" title="Voir">
                <Eye />
              </button>


              <button
                type="button"
                title="Modifier"
                onClick={() => onEdit?.(client)}
              >
                <Pencil />
              </button>


              <button
                type="button"
                title="Supprimer"
                onClick={() => {
                  const confirmDelete = window.confirm(
                    `Supprimer ${client.name || "ce client"} ?`
                  );


                  if (confirmDelete) {
                    onDelete?.(client.id);
                  }
                }}
              >
                <Trash2 />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
