import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface Props {
  rowId: string;
  data: string;
  column: number;
  onUpdate: (rowId: string, column: number, data: string) => void;
}

const TableCell = ({ rowId, column, data, onUpdate }: Props) => {
  const [hasRendered, setHasRendered] = useState(false);
  const [input, setInput] = useState(data);

  useEffect(() => {
    if (hasRendered) {
      onUpdate(rowId, column, input);
    } else {
      setHasRendered(true);
    }
  }, [input]);

  return (
    <StyledTableCell>
      <StyledInput value={input} onChange={(e) => setInput(e.target.value)} />
    </StyledTableCell>
  );
};

const StyledTableCell = styled.td`
  border: 1px solid lightgrey;
  padding: 12px;
`;

const StyledInput = styled.input`
  all: unset;
`;

export default TableCell;
