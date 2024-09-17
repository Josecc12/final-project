import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { forwardRef } from "react";
import VisitsOption from "./VisitisOption";

const DrawerVisits = forwardRef<HTMLElement>((props, ref) => (
  <Drawer>
    <DrawerTrigger ref={ref as React.LegacyRef<HTMLButtonElement>}>Open</DrawerTrigger>
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
