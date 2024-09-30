"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";


import { revalidatePath } from "next/cache";
import { DepartmentDto } from "@/app/types/dto/department";
import { Department } from "@/app/types/models";


export default async function create({
  nombre,
  is_active,
}: DepartmentDto): Promise<SuccessReponse<Department> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/departamentos`;
    const session = cookies().get("session")?.value;

    const body = {
        nombre,
        is_active,
    };

    const response = await axios.post<Department>(url, body, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    revalidatePath("/user");
    
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
