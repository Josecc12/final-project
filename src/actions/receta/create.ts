"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";


import { revalidatePath } from "next/cache";
import RecetaDto from "@/app/types/dto/receta/RecetaDto";
import Receta from "@/app/types/models/receta";


export default async function create({
  nombre,
}: RecetaDto): Promise<SuccessReponse<Receta> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/recetas`;
    const session = cookies().get("session")?.value;

    const body = {
      nombre,
    };

    const response = await axios.post<Receta>(url, body, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    revalidatePath("/recetas");

    return {
      data: response.data,
      status: response.status,
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
