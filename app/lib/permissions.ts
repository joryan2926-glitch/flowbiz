// ======================================================
// lib/permissions.ts
// FLOWBIZ ROLES
// ======================================================

export const permissions = {

  manager:[

    "crm",
    "team",
    "analytics",
    "automations",
  ],

  sales:[

    "crm",
  ],
};

export function canAccess(

  role:string,
  permission:string
){

  return permissions[
    role as keyof typeof permissions
  ]?.includes(permission);
}
