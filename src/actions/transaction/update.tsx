"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { getSession } from "../auth";
import TransactionDto from "@/app/types/dto/transaction/TransactionDto";
import { Patient } from "@/app/types/models";
import { revalidatePath } from "next/cache";

export default async function update({
    id,
    departamentoRetiroId,
    departamentoAdquisicionId,
    insumos,


}: TransactionDto): Promise<SuccessReponse<Patient> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/pacientes/${id}`;
        const session = cookies().get("session")?.value;
        const sess = await getSession();

        const body = {
            usuarioId:sess?.sub,
            departamentoRetiroId,
            departamentoAdquisicionId,
            insumos,
        };

        const response = await axios.patch<Patient>(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/transaction");

        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
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