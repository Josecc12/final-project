"use server";

import {parsedEnv} from '@/app/env';
import axios, {isAxiosError} from 'axios';
import {cookies} from 'next/headers';
import {ErrorResponse, SuccessReponse} from '../../app/types/api';

import AcquisitionDto from '@/app/types/dto/acquisition/AcquisitionDto';

import {revalidatePath} from 'next/cache';
import Acquisition from '@/app/types/models/Acquisicion';

export default async function udpate({
    id,
    nombre,
}: AcquisitionDto): Promise<SuccessReponse<Acquisition> | ErrorResponse> {
    try {
        const url = `${parsedEnv.API_URL}/adquisiciones/${id}`
        const session = cookies().get("session")?.value;

        const body = {
            nombre,
        };

        const response = await axios.patch<Acquisition>(url, body, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        });

        revalidatePath("/adquisiciones");

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