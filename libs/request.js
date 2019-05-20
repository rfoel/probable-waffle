import getConfig from 'next/config';
import { GraphQLClient } from 'graphql-request';

const { publicRuntimeConfig } = getConfig();

export default new GraphQLClient('https://api.github.com/graphql', {
  headers: { Authorization: `bearer ${publicRuntimeConfig.GITHUB_TOKEN}` },
});
