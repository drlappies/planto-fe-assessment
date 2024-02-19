import styled from '@emotion/styled';
import { Roboto } from 'next/font/google';

interface Props {
  children?: React.ReactElement;
  header?: string;
}

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const Layout = ({ children, header }: Props) => {
  return (
    <Screen className={roboto.className}>
      <Container>
        <Header>{header}</Header>
        {children}
      </Container>
    </Screen>
  );
};

const Screen = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-item: center;
  background-color: #fff;
`;

const Container = styled.div`
  width: 1024px;
  height: 100%;
  background-color: #fff;
  border: 1px solid lightgrey;
  border-top: none;
  border-bottom: none;
  padding: 24px;
  box-sizing: border-box;
`;

const Header = styled.div`
  font-weight: 500;
  font-size: 18px;
  font-family: var(--font-roboto);
`;

export default Layout;
