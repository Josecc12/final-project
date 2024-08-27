"use server";

import { decodeJwt } from "jose";
import { cookies } from "next/headers";

type Payload = {
  cusId: string;
  exp: number;
  firstname: string;
  groups: string[];
  iat: number;
  iss: string;
  jti: string;
  lastname: string;
  upn: string;
  usr: number;
};

function decrypt(input: string) {
  const claims = decodeJwt<Payload>(input);
  return claims;
}

export default async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;

  return decrypt(session);
}
