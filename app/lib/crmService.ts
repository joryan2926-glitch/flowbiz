import { supabase } from "./supabase";

export async function getClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function addClient(client: any) {
  const { error } = await supabase
    .from("clients")
    .insert([client]);

  if (error) {
    console.error(error);
  }
}

export async function deleteClient(id: number) {
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}

export async function updateClient(
  id: number,
  updates: any
) {
  const { error } = await supabase
    .from("clients")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}
