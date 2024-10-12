"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import { parsedEnv } from "@/app/env";
import { Patient } from "@/app/types/models";

import { cookies } from "next/headers";

export default async function findOne(
  id: string
): Promise<SuccessReponse<Patient> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/pacientes/${id}`;
    const session = cookies().get("session")?.value;
    const response = await axios.get<Patient>(url, {
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
