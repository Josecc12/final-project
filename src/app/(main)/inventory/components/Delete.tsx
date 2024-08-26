"use client"

import * as React from "react"
import { Delete, Minus, Plus } from "lucide-react"
// import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

type MedicalSupply = {
    id: number;
    quantity: number;
    description: string;
    category: string;
    inStock: boolean;
  };

export function DeleteModal({id, quantity,description, category, inStock}: MedicalSupply) {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="bg-red-400 text-white">Eliminar</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex flex-col items-center justify-center">
            <DrawerTitle>¿Estas segura/o de hacer esto?</DrawerTitle>
            <DrawerDescription>Se eliminina este registro.</DrawerDescription>
          </DrawerHeader>
  
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center space-x-2">
                    <h1 className="font font-bold">{description}</h1>
                    <p>{quantity}</p>   
                </div>
                <p>{category}</p>
            </div>
          <DrawerFooter>
            <Button className="bg-red-500 text-white">Eliminar</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default DeleteModal;
