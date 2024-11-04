"use server";

import {parsedEnv} from '@/app/env';
import axios, {isAxiosError} from 'axios';
import {cookies} from 'next/headers';
import {ErrorResponse, SuccessReponse} from '../../app/types/api';
import RecetaDto from '@/app/types/dto/receta/RecetaDto';

import {revalidatePath} from 'next/cache';
import Receta from '@/app/types/models/receta';

export default async function udpate({
    id,
    nombre,
    precio,
}: RecetaDto): Promise<SuccessReponse<Receta> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/recetas/${id}`
        const session = cookies().get("session")?.value;

        const body = {
            nombre,
            precio,
        };

        const response = await axios.patch<Receta>(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/category");

        return {
            data: response.data,
            status: 200,
            statusText: response.statusText,
        };

    } catch (error) {
        if(isAxiosError(error)){
            return {
                message: error.message,
                code: error.code,
                status: error.response?.status,
            }
        } else {
            return {
                message: "An unexpected error accurred.",
            };
        }
    }
};