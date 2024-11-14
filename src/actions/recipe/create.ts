"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import PatientDto from "@/app/types/dto/patient/PatientDto";
import { Patient } from "@/app/types/models";
import { revalidatePath } from "next/cache";
import RecipeDto from "@/app/types/dto/recipe/RecipeDto";
import { getSession } from "../auth";
import user from "../user";

export default async function create({

    descripcion,
    pacienteId,
    estado,
    insumos,

}: RecipeDto): Promise<SuccessReponse<Patient> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/recetas`;
        const session = cookies().get("session")?.value;
        const sess = await getSession();

        console.log("session", sess);
        const body = {
            descripcion,
            pacienteId,
            estado,
            insumos,
            userId: sess?.sub,
        };

        console.log("body", body);

        const response = await axios.post<Patient>(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/patients");

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