import { GraphQLClient } from 'graphql-request';

export default new GraphQLClient('https://api.github.com/graphql', {
  headers: { Authorization: 'bearer 8364567da655502620a9e598eb8517f9f5e23b28' },
});
