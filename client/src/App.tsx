import { createGlobalStyle } from 'styled-components';
import { Footer } from './component/layouts/Footer';
import { Outlet } from 'react-router-dom';
import { Header } from './component/layouts/Header';
import styled from 'styled-components';
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  &:root{
    --black: hsl(0, 0%, 0%);
    --white: hsl(0, 0%, 100%);
    --blue-100 : rgba(134, 190, 255, 1);
    --blue-200 : rgba(96, 140, 191, 1);
    --red :rgb(255, 17, 17); 
    --gray-100 : hsl(0, 0%, 85%);
    --gray-200 : #808080;
  } 
}
`;

const App = () => {
  return (
    <AppWrapper>
      <GlobalStyle />
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer />
    </AppWrapper>
  );
};

export default App;
