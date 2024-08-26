"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../types/api";
import { LoginDto } from "../types/dto/auth";
import { cookies } from "next/headers";

type LoginResponse = {
  access_token: string;
};

export default async function Login({
  username,
  password,
}: LoginDto): Promise<SuccessReponse<string> | ErrorResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      "https://hospital-backend-production.up.railway.app/auth/login",
      {
        username,
        password,
      }
    );

    const token = response.data.access_token;

    // Establecer la cookie
    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    return {
      data: "Logged in",
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
