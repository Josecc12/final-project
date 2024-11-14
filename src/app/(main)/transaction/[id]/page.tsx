// page.tsx
import findOne from "@/actions/transaction/findOne";
import LayoutSection from "@/components/LayoutSection";
import TransactionDetail from "../components/TransactionDetail";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const response = await findOne(params.id);

  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch transaction data");
  }

  return (
    <LayoutSection
      title="Detalle de Transacción"
      description="Información detallada de la transacción"
    >
      <TransactionDetail transaction={response.data} />
    </LayoutSection>
  );
}