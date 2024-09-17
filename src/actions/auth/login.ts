"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { LoginDto } from "../../app/types/dto/auth";
import { cookies } from "next/headers";
import { parsedEnv } from "@/app/env";

type LoginResponse = {
  access_token: string;
};

export default async function Login({
  username,
  password,
}: LoginDto): Promise<SuccessReponse<string> | ErrorResponse> {
  try {
    const url = parsedEnv.API_URL + "/auth/login";
    const response = await axios.post<LoginResponse>(url, {
      username,
      password,
    });

    const token = response.data.access_token;

    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    return {
      data: "Logged in",
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
