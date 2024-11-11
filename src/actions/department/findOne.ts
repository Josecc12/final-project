"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { cookies } from "next/headers";
import { parsedEnv } from "@/app/env";
import { Department } from "@/app/types/models";

export default async function findOne(
  id: string
): Promise<SuccessReponse<Department> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/departamentos/${id}`;
    const session = cookies().get("session")?.value;
    
    const response = await axios.get<Department>(url, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return {
      data: response.data, // data debe coincidir con la estructura esperada de Department
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
