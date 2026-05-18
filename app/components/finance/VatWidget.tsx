// ======================================================
// components/finance/VatWidget.tsx
// FLOWBIZ VAT WIDGET
// ======================================================


"use client";


import {
  Receipt,
  TrendingUp,
  TrendingDown,
} from "lucide-react";


interface Props{


  vatCollected:number;


  vatDeductible:number;


  vatToPay:number;
}


export default function VatWidget({
  vatCollected,
  vatDeductible,
  vatToPay,
}:Props){


  return(


    <div className="vatWidget">


      <div className="vatHeader">


        <Receipt />


        <h3>
          TVA
        </h3>


      </div>


      <div className="vatGrid">


        <div className="vatCard">


          <TrendingUp />


          <span>
            TVA collectée
          </span>


          <strong>


            {
              vatCollected.toFixed(2)
            }€


          </strong>


        </div>


        <div className="vatCard">


          <TrendingDown />


          <span>
            TVA déductible
          </span>


          <strong>


            {
              vatDeductible.toFixed(2)
            }€


          </strong>


        </div>


      </div>


      <div className="vatTotal">


        <span>
          TVA nette
        </span>


        <h2>


          {
            vatToPay.toFixed(2)
          }€


        </h2>


      </div>


    </div>
  );
}
