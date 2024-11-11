'use client'

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import create from "@/actions/laboratory/create";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/app/types/api";
import TestForm from "./UpdateForm";
import PageClient from "./page.client";
import findOne from "@/actions/laboratory/findOne";

type Props = {
    params: {
        id: string;
    }
}

export default async function Page({params}: Props) {

    const response = await findOne(params.id);

    if(response.status !== 200 || !("data" in response)){
        throw new Error('Failed to fetch laboratory data'); 
    }

    return (
        <PageClient laboratory = {response.data}/>  
    )
}