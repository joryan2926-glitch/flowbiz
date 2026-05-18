"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/app/lib/supabase";

export function useBilling(){

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    invoices,
    setInvoices,
  ] = useState([]);

  const [
    subscriptions,
    setSubscriptions,
  ] = useState([]);

  const [
    payments,
    setPayments,
  ] = useState([]);

  async function loadBilling(){

    const [

      invoicesRes,

      subscriptionsRes,

      paymentsRes,

    ] = await Promise.all([

      supabase
        .from("invoices")
        .select("*"),

      supabase
        .from("subscriptions")
        .select("*"),

      supabase
        .from("payments")
        .select("*"),
    ]);

    setInvoices(
      invoicesRes.data || []
    );

    setSubscriptions(
      subscriptionsRes.data || []
    );

    setPayments(
      paymentsRes.data || []
    );

    setLoading(false);
  }

  useEffect(()=>{

    loadBilling();

  },[]);

  return{

    loading,

    invoices,

    subscriptions,

    payments,
  };
}
