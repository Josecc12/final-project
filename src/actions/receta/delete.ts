"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { cookies } from "next/headers";
import { parsedEnv } from "@/app/env";
import Receta from "@/app/types/models/receta";

type DeleteRecetaRequest = {
  id: string;
};

export default async function deleteReceta({
    id
}: DeleteRecetaRequest ): Promise<SuccessReponse<Receta> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/recetas/${id}/retiro`;
    const session = cookies().get("session")?.value;

    const response = await axios.delete(url, {
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
