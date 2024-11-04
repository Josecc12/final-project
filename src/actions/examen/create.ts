"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import ExamenDto from "@/app/types/dto/Examen/ExamenDto";
import { revalidatePath } from "next/cache";
import Examen from "@/app/types/models/Examen";

export default async function create({
    nombre,
    descripcion,
    insumos,
    departamento,
}: ExamenDto): Promise<SuccessReponse<Examen> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/examenes`;
        const session = cookies().get("session")?.value;

        const body = {
            nombre,
            descripcion,
            insumos: insumos.map(({ id, cantidad }) => ({ insumoId: id, cantidad })),
            departamento
            
        };

        const response = await axios.post<Examen>(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/examenes");

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