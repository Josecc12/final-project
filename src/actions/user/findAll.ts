"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { cookies } from "next/headers";
import { parsedEnv } from "@/app/env";
import { User } from "@/app/types/models";
import parsePaginationParams from "@/utils/functions/parsePaginationParams";
type Props = {
  searchParams?: URLSearchParams;
};

export default async function findAll(
  props: Props = {}
): Promise<SuccessReponse<User[]> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/users`;
    const session = cookies().get("session")?.value;
    const parsedParams = parsePaginationParams(props.searchParams);
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
      data: response.data.data,
      status: 200,
      statusText: response.statusText,
      meta: {
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
        page: response.data.page,
      },
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
