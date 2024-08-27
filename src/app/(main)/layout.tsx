import MainNav from "@/components/navigation/MainNav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { getSession } from "../../actions/auth";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default async function Dashboard({ children }: Props) {


  const session =  await getSession()
  if(!session) {
    return redirect('/login')
  }

  console.log(session, "session")
  
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:bg-gray-50/40 dark:lg:bg-gray-800 max-h-screen sticky top-0">
        <div className="flex h-full flex-col justify-between py-6 px-4">
          <div className="space-y-6 h-full flex flex-col justify-between ">
            <MainNav />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <div className="flex items-center justify-between">
            <Link
              href="#"
              className="flex items-center gap-2 font-bold"
              prefetch={false}
            >
              <span className="text-lg">Centro de Salud</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <AlignJustify className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex h-full flex-col justify-between pt-5">
                  <MainNav />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
