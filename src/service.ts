import { httpClient } from './httpClient';
import {
  Csv,
  CsvList,
  CsvRow,
  CsvRowList,
  GetCsvFiles,
  GetCsvRowsByParent,
  UpdateCsvRowByParentId,
  UploadCsvFile,
} from './type';

export const getCsvFiles = async ({ limit, offset }: GetCsvFiles): Promise<CsvList> => {
  const response = await httpClient.get('/api/csv', { params: { limit, offset } });
  return response.data;
};

export const getCsvRowsByParent = async ({ limit, offset, parentId }: GetCsvRowsByParent): Promise<CsvRowList> => {
  const response = await httpClient.get(`/api/csv/${parentId}`, { params: { limit, offset } });
  return response.data;
};

export const uploadCsvFile = async ({ file }: UploadCsvFile): Promise<Csv> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await httpClient.post('/api/csv/upload', formData);
  return response.data;
};

export const updateCsvRowByParentId = async ({ parentId, csvRows }: UpdateCsvRowByParentId): Promise<CsvRow[]> => {
  const response = await httpClient.post(`/api/csv/${parentId}`, csvRows);
  return response.data;
};
