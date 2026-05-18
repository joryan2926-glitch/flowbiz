/* =========================================================
AUTH HELPERS
FLOWBIZ SaaS
FINAL CLEAN VERSION
========================================================= */


"use server";


import { supabase } from "./supabase";


/* =========================================================
TYPES
========================================================= */


export interface Organization {


  id:string;


  name:string;


  slug:string;


  created_at:string;
}


export interface Workspace {


  id:string;


  organization_id:string;


  name:string;


  created_at:string;
}


export interface UserRole {


  id:string;


  user_id:string;


  organization_id:string;


  workspace_id:string;


  role:
    | "admin"
    | "manager"
    | "commercial";


  created_at:string;
}


/* =========================================================
GET CURRENT USER
========================================================= */


export async function getCurrentUser(){


  try{


    const {


      data:{ user },


      error,


    } =


      await supabase.auth.getUser();


    if(error){


      console.log(error);


      return null;
    }


    return user;


  }catch(error){


    console.log(error);


    return null;
  }
}


/* =========================================================
GET ORGANIZATION
========================================================= */


export async function getOrganization(){


  try{


    const user =
      await getCurrentUser();


    if(!user){


      return null;
    }


    const {


      data,


      error,


    } =


      await supabase


        .from(
          "organizations_members"
        )


        .select(`
          organization_id,
          organizations(
            id,
            name,
            slug,
            created_at
          )
        `)


        .eq(
          "user_id",
          user.id
        )


        .single();


    if(error){


      console.log(error);


      return null;
    }


    return data;


  } catch (error) {


    console.log(error);


    return null;
  }
}


/* =========================================================
GET WORKSPACES
========================================================= */


export async function getWorkspaces(){


  try{


    const organization =
      await getOrganization();


    if(
      !organization?.organization_id
    ){


      return [];
    }


    const {


      data,


      error,


    } =


      await supabase


        .from(
          "workspaces"
        )


        .select("*")


        .eq(
          "organization_id",
          organization.organization_id
        )


        .order(
          "created_at",
          {
            ascending:true,
          }
        );


    if(error){


      console.log(error);


      return [];
    }


    return data || [];


  } catch (error) {


    console.log(error);


    return [];
  }
}


/* =========================================================
GET USER ROLE
========================================================= */


export async function getUserRole(


  workspaceId?:string


){


  try{


    const user =
      await getCurrentUser();


    if(!user){


      return null;
    }


    let query =


      supabase


        .from(
          "organization_roles"
        )


        .select("*")


        .eq(
          "user_id",
          user.id
        );


    if(workspaceId){


      query =
        query.eq(
          "workspace_id",
          workspaceId
        );
    }


    const {


      data,


      error,


    } =


      await query.single();


    if(error){


      console.log(error);


      return null;
    }


    return data;


  } catch (error) {


    console.log(error);


    return null;
  }
}


/* =========================================================
IS ADMIN
========================================================= */


export async function isAdmin(


  workspaceId?:string


){


  const role =
    await getUserRole(
      workspaceId
    );


  return (
    role?.role === "admin"
  );
}


/* =========================================================
IS MANAGER
========================================================= */


export async function isManager(


  workspaceId?:string


){


  const role =
    await getUserRole(
      workspaceId
    );


  return (


    role?.role === "manager"


    ||


    role?.role === "admin"
  );
}


/* =========================================================
CAN EDIT CRM
========================================================= */


export async function canEditCRM(


  workspaceId?:string


){


  const role =
    await getUserRole(
      workspaceId
    );


  return (


    role?.role === "commercial"


    ||


    role?.role === "manager"


    ||


    role?.role === "admin"
  );
}


/* =========================================================
LOGOUT
========================================================= */


export async function logout(){


  try{


    const { error } =


      await supabase.auth.signOut();


    if(error){


      console.log(error);


      return false;
    }


    return true;


  }catch(error){


    console.log(error);


    return false;
  }
}
