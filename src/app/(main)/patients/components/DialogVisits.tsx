import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { forwardRef } from "react";
import VisitsOption from "./VisitisOption";

const DialogVisits = forwardRef((props, ref) => (
  <Dialog>
    <DialogTrigger ref={ref as React.RefObject<HTMLButtonElement>}>
      Open
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Historial de visitas medicas</DialogTitle>
        <DialogDescription>
          Encuentra todas las visitas medicas de Sample patient
        </DialogDescription>
      </DialogHeader>
      <div className="w-full flex flex-col gap-3 max-h-[300px] overflow-y-scroll pb-3 scrollbar-hide">
        {[1, 2, 3, 4, 5 , 6 ,7 ,8, 9 ,10].map((visit) => (
          <VisitsOption key={visit} />
        ))}
      </div>
    </DialogContent>
  </Dialog>
));

export default DialogVisits;
