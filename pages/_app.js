import App, { Container } from 'next/app';
import Error from './_error';
import { Provider } from 'react-redux';

import withRematch from '../store/withRematch';

import Layout from '../components/Layout';

class ProbableWaffle extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <Layout>
            {pageProps.statusCode ? (
              <Error statusCode={pageProps.statusCode} />
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRematch(ProbableWaffle);
