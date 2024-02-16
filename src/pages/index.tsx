import styled from '@emotion/styled';
import React, { useState } from 'react';

const Button = styled.button`
  color: turquoise;
`;

const Header = styled.h1`
  color: red;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CsvEditorPage = () => {
  const [getApiRes, setGetApiRes] = useState<string>('');
  const [postApiRes, setPostApiRes] = useState<string>('');
  const callGetApi = () => {
    fetch('http://localhost:8080/v1/api/test')
      .then((response) => response.json())
      .then((data) => {
        setGetApiRes(data.value);
      });
  };

  const callPostApi = () => {
    fetch('http://localhost:8080/v1/api/add', { method: 'POST' })
      .then((response) => response.text())
      .then((data) => {
        setPostApiRes(data);
      });
  };
  return (
    <Container>
      <Header>CSV Editor</Header>
      <Button onClick={callGetApi}>List</Button>
      <div>API Res: {getApiRes}</div>

      <Button onClick={callPostApi}>Upload</Button>
      <div>API Res: {postApiRes}</div>
      {/* Content can be added here */}
    </Container>
  );
};

export default CsvEditorPage;
