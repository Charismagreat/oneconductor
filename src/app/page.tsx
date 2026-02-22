import { getDashboardDataFromGAS, getSalesDataFromGAS, getPurchaseDataFromGAS, getCardDataFromGAS } from "@/lib/googleSheets";
import DashboardClient from "@/components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getDashboardDataFromGAS();
  const salesData = await getSalesDataFromGAS();
  const purchaseData = await getPurchaseDataFromGAS();
  const cardData = await getCardDataFromGAS();

  return (
    <DashboardClient
      initialData={data}
      initialSalesData={salesData}
      initialPurchaseData={purchaseData}
      initialCardData={cardData}
    />
  );
}
