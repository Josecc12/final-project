"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import { cookies } from "next/headers";
import { parsedEnv } from "@/app/env";
import { Insumo } from "@/app/types/models";

export default async function findOne(
  id: string
): Promise<SuccessReponse<Insumo> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/insumos/${id}`;
    const session = cookies().get("session")?.value;
    const response = await axios.get<Insumo>(url, {
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
