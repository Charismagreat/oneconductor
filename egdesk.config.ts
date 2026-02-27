/**
 * EGDesk User Data Configuration
 * Generated at: 2026-02-27T00:25:10.765Z
 *
 * This file contains type-safe definitions for your EGDesk tables.
 */

export const EGDESK_CONFIG = {
  apiUrl: 'http://localhost:8080',
  apiKey: '6f524b4c-5133-4ba8-ad2a-52d907621577',
} as const;

export interface TableDefinition {
  name: string;
  displayName: string;
  description?: string;
  rowCount: number;
  columnCount: number;
  columns: string[];
}

export const TABLES = {
  table1: {
    name: 'sales_data',
    displayName: 'sales_data',
    description: undefined,
    rowCount: 7006,
    columnCount: 26,
    columns: ['id', '판매일자', '부서명', '사업자등록번호', '거래처코드', '담당자명', '판매처명', '품목코드', '품목명_규격_', '단위', '규격명', '수량', '중량', '단가', '공급가액', '합_계', '품목그룹1코드', '품목그룹2명', '품목그룹3코드', '창고명', '거래처그룹2명', '신규일', '적요', '적요2', '코드변경', '실납업체']
  } as TableDefinition
} as const;


// Main table (first table by default)
export const MAIN_TABLE = TABLES.table1;


// Helper to get table by name
export function getTableByName(tableName: string): TableDefinition | undefined {
  return Object.values(TABLES).find(t => t.name === tableName);
}

// Export table names for easy access
export const TABLE_NAMES = {
  table1: 'sales_data'
} as const;
