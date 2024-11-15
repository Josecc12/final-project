"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import { revalidatePath } from "next/cache";
import LaboratorioDto from "@/app/types/dto/order/LaboratoryOrderDto";

export default async function create({
    descripcion,
    estado,
    usuarioId,
    pacienteId,
    examenId,
}: LaboratorioDto): Promise<SuccessReponse<any> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/orden-laboratorio`;
        const session = cookies().get("session")?.value;


        const body = {
            descripcion,
            estado,
            usuarioId,
            pacienteId,
            examenId,
        };

        console.log("body", body);

        const response = await axios.post(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/orden-laboratorio");

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