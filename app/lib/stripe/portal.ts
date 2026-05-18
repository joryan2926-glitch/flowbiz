export async function openCustomerPortal(
  customerId:string
){

  try{

    const response =
      await fetch(
        "/api/stripe/create-portal-session",
        {
          method:"POST",

          headers:{
            "Content-Type":
              "application/json",
          },

          body:JSON.stringify({
            customerId,
          }),
        }
      );

    const data =
      await response.json();

    if(data.url){

      window.location.href =
        data.url;
    }

  }catch(error){

    console.log(error);
  }
}
