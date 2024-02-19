import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Waypoint } from 'react-waypoint';

import TableCell from '@/components/TableCell';
import Layout from '@/Layout';
import { getCsvRowsByParent, updateCsvRowByParentId } from '@/service';
import { CsvRow } from '@/type';

import type { NextPageWithLayout } from '@/pages/_app';

const CsvEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [filename, setFilename] = useState('');
  const [csvRows, setCsvRows] = useState<CsvRow[]>([]);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(100);
  const [hasMore, setHasMore] = useState(false);
  const updatedRows = useRef<Map<string, CsvRow>>(new Map());

  const fetchCsvRows = useCallback(
    async (_parentId: string | string[] | undefined, _limit: number, _offset: number) => {
      try {
        setIsLoading(true);
        if (typeof _parentId !== 'string' || !_parentId) {
          return;
        }

        const csvRowList = await getCsvRowsByParent({ parentId: _parentId, offset: _offset, limit: _limit });

        if (csvRowList.rows.first) {
          setCsvRows(csvRowList.rows.content);
        } else {
          setCsvRows((prevState) => [...prevState, ...csvRowList.rows.content]);
        }

        setOffset(_offset);
        setLimit(_limit);
        setFilename(csvRowList.csv.filename);
        setHasMore(!csvRowList.rows.last);
        setIsLoading(false);
      } catch (e) {
        alert('someting went wrong during fetching csv rows');
      }
    },
    []
  );

  const updateCsvRows = useCallback(async () => {
    try {
      const rows: CsvRow[] = [];
      updatedRows.current.forEach((value) => {
        rows.push(value);
      });

      await updateCsvRowByParentId({
        parentId: router.query.fileId as string,
        csvRows: rows,
      });

      router.push('/');
      alert('saved successfully!');
    } catch (e) {
      alert('something went wrong during updating csv rows');
    }
  }, [updatedRows, router.query.fileId]);

  const handleCellUpdate = useCallback(
    (rowId: string, column: number, data: string) => {
      const existingRow = csvRows.find((row) => row.id === rowId);

      if (!existingRow) {
        return;
      }

      setCsvRows((prevState) =>
        prevState.map((row) => (row.id === rowId ? { ...row, [`column${column}`]: data } : row))
      );

      updatedRows.current.set(rowId, { ...existingRow, [`column${column}`]: data });
    },
    [csvRows]
  );

  useEffect(() => {
    fetchCsvRows(router.query.fileId, limit, offset);
  }, [fetchCsvRows, limit, offset, router.query.fileId]);

  return (
    <Container>
      <Filename>{filename}</Filename>
      <TableContainer>
        <Table>
          <TableBody>
            {csvRows.map((row) => (
              <tr key={row.id}>
                <TableCell rowId={row.id} column={0} data={row.column0} onUpdate={handleCellUpdate} />
                <TableCell rowId={row.id} column={1} data={row.column1} onUpdate={handleCellUpdate} />
                <TableCell rowId={row.id} column={2} data={row.column2} onUpdate={handleCellUpdate} />
                <TableCell rowId={row.id} column={3} data={row.column3} onUpdate={handleCellUpdate} />
                <TableCell rowId={row.id} column={4} data={row.column4} onUpdate={handleCellUpdate} />
              </tr>
            ))}
          </TableBody>
        </Table>
        {!isLoading && hasMore && <Waypoint onEnter={() => setOffset((prevState) => prevState + 1)} />}
      </TableContainer>
      <ButtonContainer>
        <button onClick={() => router.push('/')}>Cancel</button>
        <button onClick={updateCsvRows}>Save and go back</button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 24px;
  border: 1px solid lightgrey;
`;

const TableContainer = styled.div`
  height: calc(100vh - 200px);
  overflow: scroll;
`;

const Filename = styled.div`
  font-style: italic;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0px;
`;

const TableBody = styled.tbody`
  padding: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
`;

CsvEditPage.getLayout = (page: React.ReactElement) => {
  return <Layout header={'Edit CSV'}>{page}</Layout>;
};

export default CsvEditPage;
