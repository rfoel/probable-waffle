import { GraphQLClient } from 'graphql-request';

export default new GraphQLClient('https://api.github.com/graphql', {
  headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}` },
});
