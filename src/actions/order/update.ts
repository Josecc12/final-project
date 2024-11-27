"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";;
import { getSession } from "../auth";

interface UpdateLaboratoryOrderDto {
    descripcion?: string;
    pacienteId?: string;
    examenId?: string;
}

export default async function update(orderId: string, orderData: UpdateLaboratoryOrderDto): Promise<SuccessReponse<any> | ErrorResponse> {
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

        const url = `${parsedEnv.API_URL}/orden-laboratorio/${orderId}`;
        
        const completeOrderData = {
            ...orderData,
            usuarioId: sess.sub
        };

        const response = await axios.patch(url, completeOrderData, {
            headers: {
                Authorization: `Bearer ${session}`,
                'Content-Type': 'application/json'
            },
        });

        return {
            message: "Orden de laboratorio actualizada con éxito",
            status: 200,
            data: response.data
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                message: error.response?.data?.message || "Error de la API",
                status: error.response?.status || 500
            };
        } else {
            return {
                message: "Error desconocido",
                status: 500
            };
        }
    }
}
