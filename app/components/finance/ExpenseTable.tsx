// ======================================================
// components/finance/ExpenseTable.tsx
// FLOWBIZ EXPENSE TABLE
// FINAL VERSION
// ======================================================


"use client";


import {
  useMemo,
  useState,
} from "react";


import {
  Search,
  Receipt,
  CalendarDays,
} from "lucide-react";


interface Expense{


  id:string;


  title:string;


  amount:number;


  vat:number;


  category:string;


  supplier:string;


  payment_method:string;


  created_at:string;
}


interface Props{


  expenses:Expense[];
}


export default function ExpenseTable({
  expenses,
}:Props){


  const [search,setSearch] =
    useState("");


  const filteredExpenses =
    useMemo(()=>{


      return expenses.filter(
        (expense)=>{


          const value = `
            ${expense.title}
            ${expense.category}
            ${expense.supplier}
          `
          .toLowerCase();


          return value.includes(
            search.toLowerCase()
          );
        }
      );


    },[
      expenses,
      search,
    ]);


  return(


    <div className="expenseTableCard">


      <div className="expenseTableTop">


        <h3>
          Dépenses
        </h3>


        <div className="expenseSearch">


          <Search size={16} />


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


      </div>


      <div className="expenseTable">


        {
          filteredExpenses.map(
            (expense)=>{


              return(


                <div
                  key={expense.id}
                  className="expenseRow"
                >


                  <div className="expenseMain">


                    <Receipt
                      size={18}
                    />


                    <div>


                      <strong>
                        {expense.title}
                      </strong>


                      <span>
                        {expense.category}
                      </span>


                    </div>


                  </div>


                  <div className="expenseSupplier">


                    {expense.supplier}


                  </div>


                  <div className="expenseAmount">


                    <strong>


                      {
                        Number(
                          expense.amount
                        ).toFixed(2)
                      }€


                    </strong>


                  </div>


                  <div className="expenseDate">


                    <CalendarDays
                      size={14}
                    />


                    {
                      new Date(
                        expense.created_at
                      ).toLocaleDateString()
                    }


                  </div>


                </div>
              );
            }
          )
        }


      </div>


    </div>
  );
}
