"use server";

import { parsedEnv } from "@/app/env";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import InventoryDto from '../../app/types/dto/inventory/InventoryDto';

import { revalidatePath } from "next/cache";
import Inventory from '@/app/types/models/Inventario'

export default async function create({
    codigo,
    nombre,
    categoriaId,
    trazador
}: InventoryDto): Promise<SuccessReponse<Inventory> | ErrorResponse>{
    try {
        const url = `${parsedEnv.API_URL}/insumos`;
        const session = cookies().get("session")?.value;

        const body = {
            codigo,
            nombre,
            categoriaId,
            trazador
        };

        const response = await axios.post<Inventory>(url,body, {
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