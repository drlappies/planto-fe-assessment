import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import CsvListItem from '@/components/CsvListItem';
import Layout from '@/Layout';
import { getCsvFiles, uploadCsvFile } from '@/service';
import { Csv } from '@/type';

import type { NextPageWithLayout } from '@/pages/_app';

const CsvManagePage: NextPageWithLayout = () => {
  const router = useRouter();
  const [csvList, setCsvList] = useState<Csv[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const fetchCsvList = useCallback(async (_limit: number, _offset: number): Promise<void> => {
    try {
      const csvList = await getCsvFiles({ limit: _limit, offset: _offset });
      setCsvList(csvList.content);
      setOffset(csvList.pageable.offset);
      setLimit(csvList.pageable.pageSize);
    } catch (e) {
      alert('Something went wrong during fetching CSV list');
    }
  }, []);

  const uploadCsv = useCallback(async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    try {
      if (!e.target.files) {
        alert('Something went wrong during uploading CSV file');
        return;
      }

      const csv = await uploadCsvFile({ file: e.target.files[0] });

      setCsvList((prevState) => [...prevState, csv]);
    } catch (e) {
      alert('Something went wrong during uploading CSV file');
    }
  }, []);

  useEffect(() => {
    fetchCsvList(limit, offset);
  }, [fetchCsvList, limit, offset]);

  return (
    <Container>
      {csvList.length > 0 ? (
        <Header>Click the edit button to edit a CSV</Header>
      ) : (
        <Header>Start by uploading a file</Header>
      )}
      <Filename>Filename</Filename>
      <CsvList>
        {csvList.map((csv) => (
          <CsvListItem key={csv.id} csv={csv} onClick={() => router.push(`/edit/${csv.id}`)} />
        ))}
      </CsvList>
      <input id={'upload_csv'} name={'csv'} type={'file'} accept={'.csv'} onChange={uploadCsv} />
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid grey;
  margin-top: 24px;
  padding: 24px;
`;

const Header = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
`;

const Filename = styled.div`
  flex: 1;
  margin-top: 4px;
  margin-bottom: 4px;
  overflow: hidden;
`;

const CsvList = styled.div`
  height: calc(100vh - 250px);
  overflow: scroll;
  margin-bottom: 12px;
`;

CsvManagePage.getLayout = function (page: React.ReactElement) {
  return <Layout header={'Manage CSV'}>{page}</Layout>;
};

export default CsvManagePage;
