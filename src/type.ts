export interface Csv {
  id: string;
  filename: string;
  createdAt: string;
  updatedAt: string;
}

export interface CsvRow {
  id: string;
  parent: string;
  column0: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sort {
  sorted: false;
  unsorted: true;
  empty: true;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: 0;
  paged: true;
  unpaged: false;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
}

export interface Pagination {
  limit: number;
  offset: number;
}

export interface CsvList extends Page<Csv> {}

export interface CsvRowList {
  csv: Csv;
  rows: Page<CsvRow>;
}

export interface GetCsvFiles extends Pagination {}

export interface GetCsvRowsByParent extends Pagination {
  parentId: string;
}

export interface UploadCsvFile {
  file: File;
}

export interface UpdateCsvRowByParentId {
  parentId: string;
  csvRows: Partial<CsvRow>[];
}
