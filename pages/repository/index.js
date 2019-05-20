import CurrentRepository from '../../components/pages/CurrentRepository';

import checkServer from '../../libs/checkServer';

const Page = () => <CurrentRepository />;

Page.getInitialProps = async ctx => {
  const { reduxStore: store, query } = ctx;
  const state = store.getState();
  if (
    checkServer() ||
    state.user.data.login !== query.user ||
    state.repository.repository.name !== query.repository
  ) {
    await store.dispatch.user.asyncFetchUser(query.user);
    await store.dispatch.repository.asyncFetchRepository({
      name: query.repository,
    });
    await store.dispatch.repository.asyncFetchCommits({
      name: query.repository,
      after: null,
    });
  }
  return {};
};

export default Page;
