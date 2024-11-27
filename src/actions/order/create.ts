"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { revalidatePath } from "next/cache";
import { getSession } from "../auth";

interface CreateLaboratoryOrderDto {
    descripcion: string;
    pacienteId: string;
    examenId: string;
}

export default async function create(orderData: CreateLaboratoryOrderDto): Promise<SuccessReponse<any> | ErrorResponse> {
    try {
        const session = cookies().get("session")?.value;
        if (!session) {
            return {
                message: "No hay sesión activa",
                status: 401
            };
        }

        const sess = await getSession();
        if (!sess?.sub) {
            return {
                message: "No se pudo obtener el ID del usuario",
                status: 401
            };
        }

        const url = `${parsedEnv.API_URL}/orden-laboratorio`;
        
        const completeOrderData = {
            ...orderData,
            usuarioId: sess.sub
        };

        const response = await axios.post(url, completeOrderData, {
            headers: {
                Authorization: `Bearer ${session}`,
                'Content-Type': 'application/json'
            },
        });
        revalidatePath("/laboratory");
        revalidatePath(`/patients/${orderData.pacienteId}`);

        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        };
    } catch (error) {
        console.error("Error creating laboratory order:", error);
        
        if (isAxiosError(error)) {
            return {
                message: error.response?.data?.message || error.message,
                code: error.code,
                status: error.response?.status,
            };
        }
        
        return {
            message: "Error inesperado al crear la orden.",
            status: 500
        };
    }
}