'use server'

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../types/api";
import { User } from "../types/models";


export default async function findAll(): Promise<SuccessReponse<User> | ErrorResponse> {

    try {
        const url = 'https://hospital-backend-production.up.railway.app/users'
        const response =  await axios.get<User>(url)

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
