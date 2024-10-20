"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { UserDto } from "../../app/types/dto/user";

import { revalidatePath } from "next/cache";
import { User } from "@/app/types/models";

export default async function create({
  name,
  lastname,
  username,
  email,
  password,
  roleId,
  departamentoId,
}: UserDto): Promise<SuccessReponse<User> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/users`;
    const session = cookies().get("session")?.value;

    const body = {
      name,
      lastname,
      username,
      email,
      password,
      roleId,
      departamentoId,
    };

    const response = await axios.post<User>(url, body, {
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
