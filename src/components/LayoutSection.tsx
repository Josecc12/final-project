import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

export default function LayoutSection({ children, title, description }: Props) {
  return (
    <div className="w-full p-4 md:px-8 xl:px-16 flex flex-col md:py-6 xl:py-12 gap-7 xl:gap-10 justify-center items-center">
      <div className="w-full flex flex-col gap-1 xl:gap-2 max-w-[1408px]">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {title}
        </h3>
        <div>
          <small className="text-sm font-medium leading-none">
            {description}
          </small>
        </div>
      </div>
      <div className="w-full  max-w-[1408px]">{children}</div>
    </div>
  );
}
