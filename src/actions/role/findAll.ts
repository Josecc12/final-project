"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../types/api";
import { User } from "../types/models";
import { cookies } from "next/headers";
import { parsedEnv } from "@/app/env";
import Role from "../types/models/Role";

export default async function findAll(): Promise<
  SuccessReponse<Role[]> | ErrorResponse
> {
  try {
    const url = `${parsedEnv.API_URL}/roles`;
    const session = cookies().get("session")?.value;
    const response = await axios.get<Role[]>(url, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return {
      data: response.data,
      status: 200,
      statusText: response.statusText,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        message: error.message,
        code: error.code,
        status: error.response?.status,
      };
    } else {
      return {
        message: "An unexpected error occurred.",
      };
    }
  }
}
