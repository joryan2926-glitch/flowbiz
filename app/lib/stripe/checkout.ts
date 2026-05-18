export async function createCheckoutSession({

  customerId,

  priceId,

  mode = "subscription",

}:{

  customerId:string;

  priceId:string;

  mode?:"payment" | "subscription";

}){

  try{

    const response =
      await fetch(
        "/api/stripe/create-checkout-session",
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json",
          },

          body:JSON.stringify({

            customerId,

            mode,

            lineItems:[
              {
                price:priceId,
                quantity:1,
              },
            ],
          }),
        }
      );

    const data =
      await response.json();

    if(data.url){

      window.location.href =
        data.url;
    }

    return data;

  }catch(error){

    console.log(error);
  }
}
