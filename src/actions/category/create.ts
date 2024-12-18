"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { revalidatePath } from "next/cache";
import CategoryDto from "@/app/types/dto/category/CategoryDto";
import { Category } from "@/app/types/models";


export default async function create({
  nombre,
}: CategoryDto): Promise<SuccessReponse<Category> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/categorias`;
    const session = cookies().get("session")?.value;

    const body = {
      nombre,
    };

    const response = await axios.post<Category>(url, body, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    revalidatePath("/category");

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
