"use client";


import "./comptabilite.css";


import {
  useEffect,
  useMemo,
  useState,
} from "react";


import {
  DollarSign,
  TrendingUp,
  Wallet,
  Receipt,
  Plus,
  Upload,
  Download,
  Loader2,
  Search,
  RefreshCw,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Mail,
  BarChart3,
  CalendarDays,
} from "lucide-react";


import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";


import * as XLSX from "xlsx";


import jsPDF from "jspdf";


import autoTable from "jspdf-autotable";


import { supabase }
from "@/app/lib/supabase";


/* =====================================================
INTERFACES
===================================================== */


interface Expense{


  id:string;


  title:string;


  amount:number;


  vat:number;


  category:string;


  supplier:string;


  payment_method:string;


  expense_date:string;


  receipt_url:string;


  notes:string;


  created_at:string;
}


interface Invoice{


  id:string;


  total:number;


  tax:number;


  payment_status:string;


  created_at:string;
}


interface StripeFinance{


  monthlyRevenue:number;


  mrr:number;


  activeSubscriptions:number;


  failedPayments:number;


  totalPayments:number;


  churnRate:number;
}


/* =====================================================
PAGE
===================================================== */


export default function ComptabilitePage(){


  /* =====================================================
  STATES
  ===================================================== */


  const [loading,setLoading] =
    useState(true);


  const [saving,setSaving] =
    useState(false);


  const [expenses,setExpenses] =
    useState<Expense[]>([]);


  const [invoices,setInvoices] =
    useState<Invoice[]>([]);


  const [search,setSearch] =
    useState("");


  const [finance,setFinance] =
    useState<StripeFinance>({
      monthlyRevenue:0,
      mrr:0,
      activeSubscriptions:0,
      failedPayments:0,
      totalPayments:0,
      churnRate:0,
    });


  /* =====================================================
  FORM
  ===================================================== */


  const [title,setTitle] =
    useState("");


  const [amount,setAmount] =
    useState(0);


  const [vat,setVat] =
    useState(0);


  const [category,setCategory] =
    useState("");


  const [supplier,setSupplier] =
    useState("");


  const [paymentMethod,
    setPaymentMethod] =
    useState("");


  const [expenseDate,
    setExpenseDate] =
    useState("");


  const [notes,setNotes] =
    useState("");


  const [receiptFile,
    setReceiptFile] =
    useState<File | null>(null);


  /* =====================================================
  LOAD
  ===================================================== */


  async function loadData(){


    try{


      setLoading(true);


      /*
      =====================================================
      EXPENSES
      =====================================================
      */


      const {
        data:expensesData,
      } = await supabase


        .from("expenses")


        .select("*")


        .order(
          "created_at",
          {
            ascending:false,
          }
        );


      /*
      =====================================================
      INVOICES
      =====================================================
      */


      const {
        data:invoiceData,
      } = await supabase


        .from("invoices")


        .select("*");


      /*
      =====================================================
      STRIPE FINANCE
      =====================================================
      */


      const financeResponse =
        await fetch(
          "/api/stripe/finance"
        );


      const financeData =
        await financeResponse.json();


      setFinance(financeData);


      setExpenses(
        expensesData || []
      );


      setInvoices(
        invoiceData || []
      );


      setLoading(false);


    }catch(error){


      console.log(error);


      setLoading(false);
    }
  }


  /* =====================================================
  INIT
  ===================================================== */


  useEffect(()=>{


    loadData();


  },[]);


  /* =====================================================
  REALTIME
  ===================================================== */


  useEffect(()=>{


    const expenseChannel =


      supabase


      .channel(
        "expenses-realtime"
      )


      .on(
        "postgres_changes",
        {
          event:"*",
          schema:"public",
          table:"expenses",
        },


        async ()=>{


          await loadData();
        }
      )


      .subscribe();


    const invoiceChannel =


      supabase


      .channel(
        "invoice-realtime"
      )


      .on(
        "postgres_changes",
        {
          event:"*",
          schema:"public",
          table:"invoices",
        },


        async ()=>{


          await loadData();
        }
      )


      .subscribe();


    return ()=>{


      supabase.removeChannel(
        expenseChannel
      );


      supabase.removeChannel(
        invoiceChannel
      );
    };


  },[]);


  /* =====================================================
  TOTALS
  ===================================================== */


  const revenue =


    invoices


      .filter(
        (invoice)=>


          invoice.payment_status ===
          "paid"
      )


      .reduce(
        (acc,invoice)=>


          acc +
          Number(invoice.total),


        0
      );


  const totalExpenses =


    expenses.reduce(
      (acc,expense)=>


        acc +
        Number(expense.amount),


      0
    );


  const collectedVat =


    invoices.reduce(
      (acc,invoice)=>


        acc +
        Number(invoice.tax),


      0
    );


  const deductibleVat =


    expenses.reduce(
      (acc,expense)=>


        acc +
        Number(expense.vat),


      0
    );


  const vatToPay =
    collectedVat - deductibleVat;


  const cashflow =
    revenue - totalExpenses;


  const netProfit =
    cashflow - vatToPay;


  /* =====================================================
  FILTER
  ===================================================== */


  const filteredExpenses =


    useMemo(()=>{


      return expenses.filter(
        (expense)=>{


          return(


            expense.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )


            ||


            expense.category
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )


            ||


            expense.supplier
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
        }
      );


    },[
      expenses,
      search,
    ]);


  /* =====================================================
  CHARTS
  ===================================================== */


  const categoryChart =


    useMemo(()=>{


      const grouped:{[key:string]:number} = {};


      expenses.forEach((expense)=>{


        if(!grouped[expense.category]){


          grouped[expense.category] = 0;
        }


        grouped[expense.category] +=
          Number(expense.amount);
      });


      return Object.entries(grouped)
        .map(([name,value])=>({


          name,
          value,
        }));


    },[expenses]);


  const monthlyRevenueChart =


    useMemo(()=>{


      const grouped:{[key:string]:number} = {};


      invoices.forEach((invoice)=>{


        if(
          invoice.payment_status !==
          "paid"
        ) return;


        const date =
          new Date(
            invoice.created_at
          );


        const month =
          `${date.getMonth()+1}/${date.getFullYear()}`;


        if(!grouped[month]){


          grouped[month] = 0;
        }


        grouped[month] +=
          Number(invoice.total);
      });


      return Object.entries(grouped)
        .map(([month,total])=>({


          month,
          total,
        }));


    },[invoices]);


  /* =====================================================
  UPLOAD
  ===================================================== */


  async function uploadReceipt(){


    if(!receiptFile)
      return "";


    const fileName =


      `${Date.now()}-${receiptFile.name}`;


    const {
      error,
    } = await supabase.storage


      .from("client-files")


      .upload(
        fileName,
        receiptFile
      );


    if(error){


      console.log(error);


      return "";
    }


    const { data } =


      supabase.storage


        .from("client-files")


        .getPublicUrl(
          fileName
        );


    return data.publicUrl;
  }


  /* =====================================================
  SAVE
  ===================================================== */


  async function saveExpense(){


    try{


      setSaving(true);


      const receiptUrl =
        await uploadReceipt();


      await supabase


        .from("expenses")


        .insert([{


          title,


          amount,


          vat,


          category,


          supplier,


          payment_method:
            paymentMethod,


          expense_date:
            expenseDate,


          notes,


          receipt_url:
            receiptUrl,
        }]);


      /*
      =====================================================
      NOTIFICATIONS
      =====================================================
      */


      await supabase


        .from("notifications")


        .insert([{


          title:
            "Nouvelle dépense",


          message:
            `${title} ajoutée`,


          type:"finance",
        }]);


      /*
      =====================================================
      EMAIL REPORT
      =====================================================
      */


      await fetch(
        "/api/email/send-report",
        {
          method:"POST",


          headers:{
            "Content-Type":
              "application/json",
          },


          body:JSON.stringify({


            title,
            amount,
            supplier,
          }),
        }
      );


      /*
      =====================================================
      RESET
      =====================================================
      */


      setTitle("");
      setAmount(0);
      setVat(0);
      setCategory("");
      setSupplier("");
      setPaymentMethod("");
      setExpenseDate("");
      setNotes("");
      setReceiptFile(null);


      await loadData();


      setSaving(false);


    }catch(error){


      console.log(error);


      setSaving(false);
    }
  }


  /* =====================================================
  EXPORT EXCEL
  ===================================================== */


  function exportExcel(){


    const worksheet =
      XLSX.utils.json_to_sheet(
        expenses
      );


    const workbook =
      XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(


      workbook,


      worksheet,


      "Expenses"
    );


    XLSX.writeFile(
      workbook,
      "flowbiz-comptabilite.xlsx"
    );
  }


  /* =====================================================
  EXPORT PDF
  ===================================================== */


  function exportPdf(){


    const doc =
      new jsPDF();


    doc.setFontSize(20);


    doc.text(
      "FLOWBIZ COMPTABILITE",
      14,
      20
    );


    doc.setFontSize(12);


    doc.text(
      `Revenus: ${revenue}€`,
      14,
      35
    );


    doc.text(
      `Dépenses: ${totalExpenses}€`,
      14,
      43
    );


    doc.text(
      `Cashflow: ${cashflow}€`,
      14,
      51
    );


    autoTable(doc,{
      startY:65,


      head:[[
        "Titre",
        "Montant",
        "TVA",
        "Catégorie",
        "Fournisseur",
      ]],


      body:


        expenses.map(
          (expense)=>([
            expense.title,
            `${expense.amount}€`,
            `${expense.vat}€`,
            expense.category,
            expense.supplier,
          ])
        ),
    });


    doc.save(
      "flowbiz-finance.pdf"
    );
  }


  /* =====================================================
  LOADING
  ===================================================== */


  if(loading){


    return(


      <div className="comptaLoader">


        <Loader2 className="spin" />


      </div>
    );
  }


  /* =====================================================
  PAGE
  ===================================================== */


  return(


    <div className="comptaPage">


      {/* =====================================================
      HEADER
      ===================================================== */}


      <header className="comptaHeader">


        <div>


          <span className="financeBadge">


            <BarChart3 />


            FLOWBIZ FINANCE


          </span>


          <h1>
            Centre Financier IA
          </h1>


          <p>
            Comptabilité intelligente connectée Stripe + Supabase
          </p>


        </div>


        <div className="headerActions">


          <button
            onClick={loadData}
          >


            <RefreshCw />


            Actualiser


          </button>


          <button
            onClick={exportExcel}
          >


            <Download />


            Excel


          </button>


          <button
            onClick={exportPdf}
          >


            <Download />


            PDF


          </button>


        </div>


      </header>


      {/* =====================================================
      KPI
      ===================================================== */}


      <section className="comptaStats">


        <div className="comptaCard">


          <DollarSign />


          <h2>
            {revenue.toFixed(2)}€
          </h2>


          <span>
            Revenus
          </span>


        </div>


        <div className="comptaCard">


          <Receipt />


          <h2>
            {totalExpenses.toFixed(2)}€
          </h2>


          <span>
            Dépenses
          </span>


        </div>


        <div className="comptaCard">


          <Wallet />


          <h2>
            {cashflow.toFixed(2)}€
          </h2>


          <span>
            Cashflow
          </span>


        </div>


        <div className="comptaCard">


          <TrendingUp />


          <h2>
            {vatToPay.toFixed(2)}€
          </h2>


          <span>
            TVA nette
          </span>


        </div>


        <div className="comptaCard">


          <CreditCard />


          <h2>
            {finance.mrr}€
          </h2>


          <span>
            MRR Stripe
          </span>


        </div>


        <div className="comptaCard">


          <CheckCircle2 />


          <h2>
            {finance.activeSubscriptions}
          </h2>


          <span>
            Abonnements actifs
          </span>


        </div>


        <div className="comptaCard">


          <AlertTriangle />


          <h2>
            {finance.failedPayments}
          </h2>


          <span>
            Paiements échoués
          </span>


        </div>


        <div className="comptaCard">


          <FileText />


          <h2>
            {netProfit.toFixed(2)}€
          </h2>


          <span>
            Résultat net
          </span>


        </div>


      </section>


      {/* =====================================================
      CHARTS
      ===================================================== */}


      <section className="chartsGrid">


        {/* REVENUE */}


        <div className="chartCard">


          <div className="chartTop">


            <div>


              <span>
                Analytics
              </span>


              <h3>
                Revenus mensuels
              </h3>


            </div>


            <CalendarDays />


          </div>


          <ResponsiveContainer
            width="100%"
            height={320}
          >


            <AreaChart
              data={monthlyRevenueChart}
            >


              <defs>


                <linearGradient
                  id="colorRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >


                  <stop
                    offset="5%"
                    stopColor="#7c5cff"
                    stopOpacity={0.8}
                  />


                  <stop
                    offset="95%"
                    stopColor="#7c5cff"
                    stopOpacity={0}
                  />


                </linearGradient>


              </defs>


              <CartesianGrid strokeDasharray="3 3" />


              <XAxis dataKey="month" />


              <YAxis />


              <Tooltip />


              <Area
                type="monotone"
                dataKey="total"
                stroke="#7c5cff"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />


            </AreaChart>


          </ResponsiveContainer>


        </div>


        {/* CATEGORY */}


        <div className="chartCard">


          <div className="chartTop">


            <div>


              <span>
                Dépenses
              </span>


              <h3>
                Répartition catégories
              </h3>


            </div>


            <Receipt />


          </div>


          <ResponsiveContainer
            width="100%"
            height={320}
          >


            <PieChart>


              <Pie
                data={categoryChart}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
              >


                {
                  categoryChart.map(
                    (_,index)=>(


                      <Cell
                        key={index}
                        fill={
                          [
                            "#7c5cff",
                            "#00c2ff",
                            "#22c55e",
                            "#f59e0b",
                            "#ef4444",
                          ][index % 5]
                        }
                      />
                    )
                  )
                }


              </Pie>


              <Tooltip />


              <Legend />


            </PieChart>


          </ResponsiveContainer>


        </div>


      </section>


      {/* =====================================================
      FORM
      ===================================================== */}


      <section className="expenseForm">


        <div className="formTop">


          <h3>
            Nouvelle dépense
          </h3>


        </div>


        <div className="formGrid">


          <input
            placeholder="Titre"
            value={title}
            onChange={(e)=>
              setTitle(
                e.target.value
              )
            }
          />


          <input
            type="number"
            placeholder="Montant"
            value={amount}
            onChange={(e)=>
              setAmount(
                Number(e.target.value)
              )
            }
          />


          <input
            type="number"
            placeholder="TVA"
            value={vat}
            onChange={(e)=>
              setVat(
                Number(e.target.value)
              )
            }
          />


          <input
            placeholder="Catégorie"
            value={category}
            onChange={(e)=>
              setCategory(
                e.target.value
              )
            }
          />


          <input
            placeholder="Fournisseur"
            value={supplier}
            onChange={(e)=>
              setSupplier(
                e.target.value
              )
            }
          />


          <input
            placeholder="Paiement"
            value={paymentMethod}
            onChange={(e)=>
              setPaymentMethod(
                e.target.value
              )
            }
          />


          <input
            type="date"
            value={expenseDate}
            onChange={(e)=>
              setExpenseDate(
                e.target.value
              )
            }
          />


          <label className="uploadBox">


            <Upload />


            Import justificatif


            <input
              type="file"
              hidden
              onChange={(e)=>{


                if(e.target.files){


                  setReceiptFile(
                    e.target.files[0]
                  );
                }
              }}
            />


          </label>


        </div>


        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e)=>
            setNotes(
              e.target.value
            )
          }
        />


        <button
          className="saveExpenseBtn"
          onClick={saveExpense}
        >


          {
            saving ? (


              <Loader2 className="spin" />


            ) : (


              <>
                <Plus />
                Ajouter dépense
              </>
            )
          }


        </button>


      </section>


      {/* =====================================================
      SEARCH
      ===================================================== */}


      <div className="searchBar">


        <Search />


        <input
          placeholder="Recherche..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
        />


      </div>


      {/* =====================================================
      TABLE
      ===================================================== */}


      <section className="expensesTable">


        {
          filteredExpenses.map(
            (expense)=>(


              <div
                key={expense.id}
                className="expenseRow"
              >


                <div className="expenseLeft">


                  <div>


                    <strong>
                      {expense.title}
                    </strong>


                    <span>
                      {expense.category}
                    </span>


                  </div>


                  <small>
                    {expense.supplier}
                  </small>


                </div>


                <div className="expenseCenter">


                  <span>
                    TVA :
                    {expense.vat}€
                  </span>


                  <span>
                    {expense.payment_method}
                  </span>


                </div>


                <div className="expenseRight">


                  <strong>
                    {expense.amount}€
                  </strong>


                  {
                    expense.receipt_url && (


                      <a
                        href={
                          expense.receipt_url
                        }
                        target="_blank"
                      >


                        Voir justificatif


                      </a>
                    )
                  }


                </div>


              </div>
            )
          )
        }


      </section>


    </div>
  );
}
