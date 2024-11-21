"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { cookies } from "next/headers";
import { parsedEnv } from "@/app/env";
import { Department } from "@/app/types/models";
import parsePaginationParams from "@/utils/functions/parsePaginationParams";

type Props = {
  searchParams?: URLSearchParams;
  q?: string; // Add optional search query parameter
};

export default async function findOne(
  id: string,
  props: Props = {}
): Promise<SuccessReponse<Department> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/departamentos/${id}`;
    const session = cookies().get("session")?.value;
    const parsedParams = parsePaginationParams(props.searchParams);
    
    const response = await axios.get<Department>(url, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      params: {
        ...parsedParams,
        query: undefined,
        q: props.q || parsedParams.query, // Use the passed q parameter or existing query
      }
    });

    return {
      data: response.data,
      status: 200,
      statusText: response.statusText,
      meta: {
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
        page: response.data.page,
      },
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