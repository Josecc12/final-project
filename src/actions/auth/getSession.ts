"use server";

import { decodeJwt } from "jose";
import { cookies } from "next/headers";

type Payload = {
  sub: string;
  name: string;

  iat: number;
  role: string;
  exp: number;
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
