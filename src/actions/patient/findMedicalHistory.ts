"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import { parsedEnv } from "@/app/env";
import parsePaginationParams from "@/utils/functions/parsePaginationParams";
import { cookies } from "next/headers";
import { PatientMedicalHistory } from "@/app/types/models";

interface Props {
  id: string; // Definimos el id como parte de las props en TypeScript
  searchParams?: URLSearchParams;
}

export default async function findMedicalHistory({
  id, 
  searchParams
}:Props ): Promise<SuccessReponse<PatientMedicalHistory> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/pacientes/${id}/historialmedico`;
    const session = cookies().get("session")?.value;
    const parsedParams = parsePaginationParams(searchParams);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      params: {
        ...parsedParams,
        query: undefined,
        q: parsedParams.query,
      }
    });
    return {
      data: response.data,
      status: 200,
      statusText: response.statusText,
    };
  } catch (error) {
    console.log(error);
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
