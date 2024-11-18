"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import { cookies } from "next/headers";
import { parsedEnv } from "@/app/env";
import {  departure } from "@/app/types/models";
import parsePaginationParams from "@/utils/functions/parsePaginationParams";

type Props = {
  searchParams?: URLSearchParams;
};

export default async function findAllDepartures(
  props: Props = {}
): Promise<SuccessReponse<departure[]> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/retiros/depto/list`;
    const session = cookies().get("session")?.value;
    const parsedParams = parsePaginationParams(props.searchParams);
    
    const queryParams = {
      ...parsedParams,
      query: undefined,
      q: parsedParams.query,
      filterDepartamento: props.searchParams?.get('filterDepartamento') || undefined,
      startDate: props.searchParams?.get('startDate') || undefined,
      endDate: props.searchParams?.get('endDate') || undefined
    };

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      params: queryParams
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