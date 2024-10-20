"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import DeparmentDto from "@/app/types/dto/deparment/DeparmentDto";
import { revalidatePath } from "next/cache";
import { Department } from "@/app/types/models";

export default async function update({
    id,
    name

}: DeparmentDto): Promise<SuccessReponse<Department> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/departamentos/${id}`;
        const session = cookies().get("session")?.value;

        const body = {
            nombre: name
        };

        const response = await axios.patch<Department>(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/department");

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