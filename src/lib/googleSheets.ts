export interface SheetTransaction {
  "T/F": string;
  "no": number | string;
  "거래일자": string;
  "거래시간": string;
  "은행": string;
  "계좌번호": string;
  "계좌별칭": string;
  "적요1": string;
  "입금": number;
  "출금": number;
  "잔액": number;
  "비고": string;
  "수기": string;
  "취급지점": string;
  "상대계좌": string;
  "상대계좌예금주명": string;
  "적요2": string;
}

export interface SalesData {
  "작성일자": string;
  "승인번호": string;
  "공급받는자상호": string;
  "합계금액": number;
  "공급가액": number;
  "세액": number;
  "전자세금계산서종류": string;
  "품목명": string;
  "비고"?: string;
  [key: string]: any; // Allow other columns
}

export type PurchaseData = SalesData; // Same structure

export interface CardUsageData {
  "카드사": string;
  "본부명": string;
  "부서명": string;
  "카드번호": string;
  "카드구분": string;
  "카드소지자": string;
  "거래은행": string;
  "사용구분": string;
  "매출종류": string;
  "접수일자/(승인일자)": string;
  "청구일자": string;
  "승인번호": string;
  "가맹점명/국가명(도시명)": string;
  "이용금액": number;
  "(US $)": string;
  "비고"?: string;
}

export async function getDashboardDataFromGAS(): Promise<SheetTransaction[] | null> {
  const GAS_URL = process.env.GOOGLE_SHEETS_GAS_URL;

  if (!GAS_URL) {
    console.error("GAS_URL is not defined in environment variables");
    return null;
  }

  try {
    const response = await fetch(GAS_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from GAS:", error);
    return null;
  }
}

export async function getSalesDataFromGAS(): Promise<SalesData[] | null> {
  const GAS_URL = process.env.GOOGLE_SHEETS_SALES_GAS_URL;

  if (!GAS_URL) {
    console.error("GOOGLE_SHEETS_SALES_GAS_URL is not defined in environment variables");
    return null;
  }

  try {
    const response = await fetch(GAS_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sales: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sales data from GAS:", error);
    return null;
  }
}

export async function getPurchaseDataFromGAS(): Promise<PurchaseData[] | null> {
  const GAS_URL = process.env.GOOGLE_SHEETS_PURCHASE_GAS_URL;

  if (!GAS_URL) {
    console.error("GOOGLE_SHEETS_PURCHASE_GAS_URL is not defined in environment variables");
    return null;
  }

  try {
    const response = await fetch(GAS_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch purchase: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching purchase data from GAS:", error);
    return null;
  }
}

export async function getCardDataFromGAS(): Promise<CardUsageData[] | null> {
  const GAS_URL = process.env.GOOGLE_SHEETS_CARD_GAS_URL;

  if (!GAS_URL) {
    console.error("GOOGLE_SHEETS_CARD_GAS_URL is not defined in environment variables");
    return null;
  }

  try {
    const response = await fetch(GAS_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch card data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching card data from GAS:", error);
    return null;
  }
}
