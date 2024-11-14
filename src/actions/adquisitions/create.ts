"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import { revalidatePath } from "next/cache";
import AdquisitionDto from "@/app/types/dto/adquisition/adquisitionDto";
import adquisition from "@/app/types/models/adquisicion";
import { getSession } from "../auth";

export default async function create({
    usuarioId,
    descripcion,
    lotes
    
}: AdquisitionDto): Promise<SuccessReponse<adquisition> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/adquisiciones/lotes`;
        const session = cookies().get("session")?.value;
        const sess = await getSession();

        const body = {
            usuarioId: sess?.sub,
            descripcion,
            lotes: lotes.map(({ numeroLote, fechaCaducidad, cantidadInical, insumoId }) => ({
                numeroLote,
                fechaCaducidad,
                cantidadInical,
                insumoId
            }))
        };

        const response = await axios.post<adquisition>(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/acquisitions");

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