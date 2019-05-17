import Home from '../components/pages/Home';

import redirect from '../libs/redirect';

const Page = () => <Home />;

Page.getInitialProps = ctx => {
  const { res, query } = ctx;
  //   if (res && query.user) redirect(`/user/?user=${query.user}`, ctx);
};

export default Page;
