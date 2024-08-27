"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../types/api";
import { UserDto } from "../types/dto/user";
import { User } from "../types/models";
import { revalidatePath } from "next/cache";

export default async function create({
  name,
  lastname,
  username,
  email,
  password,
  roleId,
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
