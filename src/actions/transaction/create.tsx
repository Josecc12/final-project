"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";


import { revalidatePath } from "next/cache";
import TransactionDto from "@/app/types/dto/transaction/TransactionDto";
import { Transaction } from "@/app/types/models";
import { getSession } from "../auth";


export default async function create({
    departamentoRetiroId,
    departamentoAdquisicionId,
    insumos,

}: TransactionDto): Promise<SuccessReponse<Transaction> | ErrorResponse> {
  try {
    const url = `${parsedEnv.API_URL}/retiros/transaccion`;
    const session = cookies().get("session")?.value;
    const sess = await getSession();
    const body = {
        usuarioId:sess?.sub,
        departamentoRetiroId,
        departamentoAdquisicionId,
        insumos,
    };
    console.log(body);

    const response = await axios.post<Transaction>(url, body, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    console.log(response.data);
    revalidatePath("/transaction");

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
