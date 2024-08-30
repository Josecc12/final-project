import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";

export default function VisitsOption() {
  return (
    <div className="w-full flex  border-[2px] border-muted  rounded-md p-3 justify-center hover:bg-accent group  ">
      <Link href="/patients/asda">
        <Typography
          variant="muted"
          className="text-pretty group-hover:text-primary"
        >
          17/12/3 - Doctor Sample
        </Typography>
      </Link>
    </div>
  );
}
