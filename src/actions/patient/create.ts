"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";

import PatientDto from "@/app/types/dto/patient/PatientDto";
import { Patient } from "@/app/types/models";
import { revalidatePath } from "next/cache";

export default async function create({
    nombre,
    sexo,
    cui,
    nacimiento,
    familiares,
    medicos,
    quirurgicos,
    traumaticos,
    alergias,
    vicios,
    antecedentes,


}: any): Promise<SuccessReponse<Patient> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/pacientes`;
        const session = cookies().get("session")?.value;

        const date = new Date(nacimiento);
        const formattedDate = date.toISOString().split('T')[0];
        var body={}
        if(sexo === "Masculino"){
            body = {
                nombre,
                sexo,
                cui,
                nacimiento: formattedDate,
                familiares,
                medicos,
                quirurgicos,
                traumaticos,
                alergias,
                vicios,
            };
        }else{
            body = {
                nombre,
                sexo,
                cui,
                nacimiento: formattedDate,
                familiares,
                medicos,
                quirurgicos,
                traumaticos,
                alergias,
                vicios,
                antecedente: antecedentes[0],
            };

        }
        console.log(body);
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