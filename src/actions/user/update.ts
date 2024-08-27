"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../types/api";
import { UserDto } from "../types/dto/user";
import { User } from "../types/models";
import { revalidatePath } from "next/cache";

export default async function update({
  id,
  name,
  lastname,
  username,
  email,
  password,
  roleId,
}: UserDto): Promise<SuccessReponse<User> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/users/${id}`;
    const session = cookies().get("session")?.value;

    console.log('password',password)
    const body = {
      name,
      lastname,
      username,
      email,
      password: password || undefined,
      roleId,
    };

    const response = await axios.patch<User>(url, body, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    revalidatePath("/user");

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
