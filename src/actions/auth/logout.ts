"use server";

import axios, { isAxiosError } from "axios";
import { ErrorResponse, SuccessReponse } from "../../app/types/api";
import { LoginDto } from "../../app/types/dto/auth";
import { cookies } from "next/headers";
import { parsedEnv } from "@/app/env";
import { redirect } from "next/navigation";


export default async function Logout(){

    cookies().delete("session");
    redirect('/login');
    return null;
  
}
