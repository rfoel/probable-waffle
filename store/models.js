import client from '../libs/request';

const FETCH_USER_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl
    }
  }
`;

const FETCH_ORGANIZATION_QUERY = `
  query ($login: String!) {
    organization(login: $login) {
      login
      name
      avatarUrl
    }
  }
`;

const SEARCH_USER_QUERY = `
  query ($query: String!) {
    search(first: 5, type: USER, query: $query) {
      nodes {
        ... on RepositoryOwner {
          login
          avatarUrl
        }
      }
    }
  }
`;

export const user = {
  state: {
    data: {},
    list: [],
  },
  reducers: {
    setUser(state, payload) {
      return { ...state, data: payload };
    },
    setList(state, payload) {
      return { ...state, list: payload };
    },
  },
  effects: {
    async asyncFetchUser(payload, state) {
      const user = await client
        .request(FETCH_USER_QUERY, { login: payload })
        .then(data => data.user)
        .catch(async e => {
          if (Object.is(e.response.errors[0].type, 'NOT_FOUND')) {
            return await client
              .request(FETCH_ORGANIZATION_QUERY, { login: payload })
              .then(data => data.organization);
          } else throw e;
        });
      this.setUser(user);
    },
    async asyncSearch(payload, state) {
      const query = `${payload} in:login`;
      const list = await client
        .request(SEARCH_USER_QUERY, { query })
        .then(data => data.search.nodes);
      this.setList(list);
    },
  },
};

const FETCH_REPOSITORIES_QUERY = `
  query ($query: String!, $after: String) {
    search(first: 10, after: $after, type: REPOSITORY, query: $query) {
      nodes {
        ... on Repository {
          id
          name
          description
          pushedAt
          forkCount
          stargazers {
            totalCount
          }
          primaryLanguage {
            name
            color
          }
          owner {
            login
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const repositories = {
  state: {
    data: [],
    pagination: {},
    sort: 'updated',
    sortDirection: 'desc',
    query: '',
  },
  reducers: {
    setRepositories(state, payload) {
      return { ...state, data: payload };
    },
    setPagination(state, payload) {
      return { ...state, pagination: payload };
    },
    setSort(state, payload) {
      return { ...state, sort: payload };
    },
    setSortDirection(state, payload) {
      return { ...state, sortDirection: payload };
    },
    setQuery(state, payload) {
      return { ...state, query: payload };
    },
  },
  effects: {
    async asyncSort(payload, state) {
      this.setSort(payload);
      this.setRepositories([]);
      this.asyncFetchRepositories({ after: null });
    },
    async asyncSortDirection(payload, state) {
      this.setSortDirection(payload);
      this.setRepositories([]);
      this.asyncFetchRepositories({ after: null });
    },
    async asyncSetQuery(payload, state) {
      this.setQuery(payload);
      this.setRepositories([]);
      this.asyncFetchRepositories({ after: null });
    },
    async asyncFetchRepositories(payload = {}, state) {
      const login = payload.login || state.user.data.login;
      const query = `${
        state.repositories.query
      } user:${login} org:${login} sort:${state.repositories.sort}-${
        state.repositories.sortDirection
      }
        `;
      const { repositories, pagination } = await client
        .request(FETCH_REPOSITORIES_QUERY, {
          query,
          after: payload.after || null,
        })
        .then(data => ({
          repositories: data.search.nodes.map(node => ({
            ...node,
          })),
          pagination: {
            endCursor: data.search.pageInfo.endCursor,
            hasNextPage: data.search.pageInfo.hasNextPage,
          },
        }));

      this.setRepositories([...state.repositories.data, ...repositories]);
      this.setPagination(pagination);
    },
  },
};

const FETCH_REPOSITORY_QUERY = `
  query ($login: String!, $name: String!) {
    repository(owner: $login, name: $name) {
      id
      name
      description
      pushedAt
      forkCount
      stargazers {
        totalCount
      }
      primaryLanguage {
        name
        color
      }
      owner {
        login
      }
    }
  }
`;

const FETCH_COMMITS_QUERY = `
  query ($login: String!, $name: String!, $after: String) {
    repository(owner: $login, name: $name) {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: 20, after: $after) {
              edges {
                node {
                  id
                  messageHeadline
                  messageBody
                  author {
                    user {
                      login
                    }
                    name
                    avatarUrl
                    date
                  }
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
        }
      }
    }
  }
`;

export const repository = {
  state: {
    repository: {},
    commits: [],
    pagination: {},
  },
  reducers: {
    setRepository(state, payload) {
      return { ...state, repository: payload, commits: [] };
    },
    setCommits(state, payload) {
      return { ...state, commits: payload };
    },
    setPagination(state, payload) {
      return { ...state, pagination: payload };
    },
  },
  effects: {
    async asyncFetchRepository(payload = {}, state) {
      const repository = await client
        .request(FETCH_REPOSITORY_QUERY, {
          login: state.user.data.login,
          name: payload.name,
        })
        .then(data => data.repository);

      this.setRepository(repository);
    },
    async asyncFetchCommits(payload = {}, state) {
      const { commits, pagination } = await client
        .request(FETCH_COMMITS_QUERY, {
          login: state.user.data.login,
          name: state.repository.repository.name,
          after: payload.after || null,
        })
        .then(data => ({
          commits: data.repository.ref.target.history.edges.map(edge => ({
            ...edge.node,
          })),
          pagination: {
            endCursor: data.repository.ref.target.history.pageInfo.endCursor,
            hasNextPage:
              data.repository.ref.target.history.pageInfo.hasNextPage,
          },
        }));

      const data = payload.data || state.repository.commits;
      this.setCommits([...data, ...commits]);
      this.setPagination(pagination);
    },
  },
};
