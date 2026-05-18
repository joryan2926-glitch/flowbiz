// ======================================================
// lib/security.ts
// SANITIZATION
// ======================================================

export function sanitizeInput(
  value:string
){

  return value

    .replace(
      /<script.*?>.*?<\/script>/gi,
      ""
    )

    .replace(
      /<.*?>/g,
      ""
    )

    .trim();
}
