import { supabase } from "./supabase";

export async function getFactures() {

  const { data, error } =
    await supabase
      .from("factures")
      .select("*");

  if(error){
    throw error;
  }

  return data;
}
