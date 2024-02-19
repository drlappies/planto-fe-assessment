import styled from '@emotion/styled';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head />
      <Body>
        <Main />
        <NextScript />
      </Body>
    </Html>
  );
};

const Body = styled.body`
  margin: 0;
  padding: 0;
`;

export default Document;
