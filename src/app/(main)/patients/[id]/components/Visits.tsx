import { Typography } from "@/components/ui/Typography";

export default function Visits() {
  return (
    <div className="w-full flex  border-[2px] border-muted  rounded-md p-3 justify-center hover:bg-accent group  ">
      <Typography
        variant="muted"
        className="text-pretty group-hover:text-primary"
      >
        17/12/3 - Doctor Sample
      </Typography>
    </div>
  );
}
