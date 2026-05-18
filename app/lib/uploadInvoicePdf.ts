// ======================================================
// app/lib/uploadInvoicePdf.ts
// FLOWBIZ PDF UPLOAD FINAL
// ======================================================


import { supabase }
from "@/app/lib/supabase";


export async function uploadInvoicePdf(


  file:Blob,


  invoiceId:string


){


  try{


    const fileName =
      `invoice-${invoiceId}.pdf`;


    const { error } =
      await supabase.storage


        .from("invoices")


        .upload(


          fileName,


          file,


          {
            upsert:true,


            contentType:
              "application/pdf",
          }
        );


    if(error){


      console.log(
        "UPLOAD ERROR:",
        error
      );


      return null;
    }


    const {
      data
    } = supabase.storage


      .from("invoices")


      .getPublicUrl(fileName);


    return data.publicUrl;


  }catch(error){


    console.log(error);


    return null;
  }
}
