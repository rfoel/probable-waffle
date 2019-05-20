import User from '../../components/pages/User';

import checkServer from '../../libs/checkServer';

const Page = () => <User />;

Page.getInitialProps = async ctx => {
  const { reduxStore: store, query } = ctx;
  const state = store.getState();
  if (
    checkServer() ||
    state.user.data.login !== query.user ||
    Object.keys(state.repositories.data).length === 0
  ) {
    await store.dispatch.user.asyncFetchUser(query.user);
    await store.dispatch.repositories.setRepositories([]);
    await store.dispatch.repositories.asyncFetchRepositories({
      login: query.user,
      after: null,
    });
  }
  return {};
};

export default Page;
