import App, { Container } from 'next/app';
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
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRematch(ProbableWaffle);
