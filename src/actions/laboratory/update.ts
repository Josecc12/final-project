"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import LaboratoryDto from "@/app/types/dto/laboratory/LaboratoryDto";
import { Test } from "@/app/types/models";
import { revalidatePath } from "next/cache";

export default async function update({
    id,
    nombre,
    descripcion,
    insumos
}: LaboratoryDto): Promise<SuccessReponse<Test> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/examenes/${id}`;
        const session = cookies().get("session")?.value;

        const body = {
            nombre,
            descripcion,
            insumos: insumos.map(({ id, cantidad }) => ({ insumoId: id, cantidad }))
        };

        const response = await axios.patch<Test>(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/inventory");

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