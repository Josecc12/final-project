"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth";

export default async function confirm(id: string): Promise<SuccessReponse<string> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/recetas/${id}/retiro`;
        const session = cookies().get("session")?.value;
        const sess = await getSession();

        console.log("session", sess);
        const body = {

            userId: sess?.sub,
        };

        console.log("body", body);

        const response = await axios.post(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/patients");

        return {
            data: 'Success',
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