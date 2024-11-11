"use client";

import DropdownSearch from "@/components/DropdownSearch";
import Test from "./Test";

export default function Home() {
  return (
    <main className="min-h-[1000px] flex items-center justify-center">
      <div className="max-w-[600px] w-full">
        {/* Logo centrado y responsive */}
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="mx-auto w-full sm:w-[200%] md:w-[200%] lg:w-[200%] h-auto" 
        />
      </div>
    </main>
  );
}
