"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import PatientDto from "@/app/types/dto/patient/PatientDto";
import { Patient } from "@/app/types/models";
import { revalidatePath } from "next/cache";

export default async function update({
    id,
    nombre,
    sexo,
    cui,
    telefono,
    comunidad,
    municipio,
    nacimiento,
    familiares,
    quirurgicos,
    traumaticos,
    alergias,
    vicios,
    antecedentes,
}: PatientDto): Promise<SuccessReponse<Patient> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/pacientes/${id}`;
        const session = cookies().get("session")?.value;

        const date = new Date(nacimiento);
        const formattedDate = date.toISOString().split('T')[0];

        // Preparar el body según el sexo del paciente
        var body = {};
        if (sexo === "Masculino") {
            body = {
                nombre,
                sexo,
                cui,
                telefono,
                comunidad,
                municipio,
                nacimiento: formattedDate,
                familiares,
                quirurgicos,
                traumaticos,
                alergias,
                vicios,
            };
        } else {
            // Si hay antecedentes y hay una fecha de última regla, formatearla
            const formattedAntecedente = antecedentes?.[0] ? {
                ...antecedentes[0],
                ultima_regla: antecedentes[0].ultima_regla 
                    ? new Date(antecedentes[0].ultima_regla).toISOString().split('T')[0]
                    : null
            } : undefined;

            body = {
                nombre,
                sexo,
                cui,
                telefono,
                comunidad,
                municipio,
                nacimiento: formattedDate,
                familiares,
                quirurgicos,
                traumaticos,
                alergias,
                vicios,
                antecedente: formattedAntecedente,
            };
        }
        
        console.log('Updating patient with:', body);
        
        const response = await axios.patch<Patient>(url, body, {
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