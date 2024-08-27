import { ReactNode } from "react";
import { Button } from "./ui/button";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  actions?: ReactNode;
};

export default function LayoutSection({
  children,
  title,
  description,
  actions,
}: Props) {
  return (
    <div className="w-full p-4 md:px-8 lg:px-16  flex flex-col md:py-8 xl:py-12 gap-7 xl:gap-10 justify-center items-center">
      <div className="w-full flex flex-col gap-5 xl:gap-7 md:flex-row md:justify-between max-w-[1408px]">
        <div className="flex flex-col gap-1 xl:gap-2">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {title}
          </h3>
          <div className="flex  w-full justify-between">
            <small className="text-sm font-medium leading-none">
              {description}
            </small>
          </div>
        </div>

        {actions}
      </div>
      <div className="w-full  max-w-[1408px]">{children}</div>
    </div>
  );
}
