"use server";

import {parsedEnv} from '@/app/env';
import axios, {isAxiosError} from 'axios';
import {cookies} from 'next/headers';
import {ErrorResponse, SuccessReponse} from '../../app/types/api';
import CategoryDto from '../../app/types/dto/category/CategoryDto';

import {revalidatePath} from 'next/cache';
import {Category} from '@/app/types/models';

export default async function udpate({
    id,
    nombre,
}: CategoryDto): Promise<SuccessReponse<Category> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/categorias/${id}`
        const session = cookies().get("session")?.value;

        const body = {
            nombre,
        };

        const response = await axios.patch<Category>(url, body, {
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