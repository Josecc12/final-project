import { MedicineTable } from "@/components/medicine-table";
import { ProductsTable } from "@/components/products-table";
import { Test } from "@/components/test";

export default function Home() {
  return <main className="min-h-[1000px]">
    <ProductsTable/>
    <MedicineTable/>
  
    
  </main>;
}
