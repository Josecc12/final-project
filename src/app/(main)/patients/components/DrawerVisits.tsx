import React, { forwardRef, useRef } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import VisitsOption from "./VisitisOption";

const DrawerVisits = forwardRef((props, ref) => (
  <Drawer>
    <DrawerTrigger ref={ref}>Open</DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Historial de visitas medicas</DrawerTitle>
        <DrawerDescription>
          Encuentra todas las visitas medicas de Sample patient
        </DrawerDescription>
      </DrawerHeader>
      <div className="w-full flex flex-col gap-3 max-h-[300px] overflow-y-scroll pb-3 scrollbar-hide">
      {[1, 2, 3, 4, 5 , 6 ,7, 8].map((visit) => (
        <VisitsOption key={visit} />
      ))}
      </div>
    </DrawerContent>
  </Drawer>
));

export default DrawerVisits;
