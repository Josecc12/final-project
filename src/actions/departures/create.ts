"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { revalidatePath } from "next/cache";
import { getSession } from "../auth";

interface WithdrawalDto {
    descripcion: string;
    detalles: {
        insumoId: string;
        cantidad: number;
    }[];
}

export default async function create({
    descripcion,
    detalles,
}: WithdrawalDto): Promise<SuccessReponse<any> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/retiros`;
        const session = cookies().get("session")?.value;
        const sess = await getSession();
        
        const body = {
            usuarioId: sess?.sub,
            descripcion,
            detalles,
        };
        const response = await axios.post(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/departures");

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