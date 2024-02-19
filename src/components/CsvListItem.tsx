import styled from '@emotion/styled';

import { Csv } from '@/type';

interface Props {
  csv: Csv;
  onClick: () => void;
}

const CsvListItem = ({ csv, onClick }: Props) => {
  return (
    <Container>
      <FileName>{csv.filename}</FileName>
      <button onClick={onClick}>Edit</button>
    </Container>
  );
};

const Container = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid grey;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const FileName = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default CsvListItem;
