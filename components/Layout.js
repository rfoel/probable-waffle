import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Footer from './Footer';

const theme = {
  colors: {
    primary: '#6A5ACD',
    success: '#00FA9A',
    danger: '#FA8072',
    warning: '#FFD700',
    info: '#87CEFA',
    light: '#F5F5F5',
    dark: '#333333',
    gray: '#888888',
  },
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
    font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
  }
  html, body, #__next {
    height: 100%;
    color: ${theme.colors.dark}
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
  #__next {
    display: flex;
    flex-direction: column;
  }
  main {
    display: flex;
    flex-direction: column;
    flex-grow: 1
  }
`;

export default ({ children, title = 'Probable Waffle' }) => (
  <ThemeProvider theme={theme}>
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" sizes="192x192" href="../static/favicon.png" />
      </Head>
      <GlobalStyle />
      <main>{children}</main>
      <Footer />
    </>
  </ThemeProvider>
);
