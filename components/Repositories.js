import { Flex, Box } from '@rebasejs/rebase';
import { connect } from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';

import routes from '../routes';

import Repository from './Repository';
import FilterRepositories from './FilterRepositories';
import Sort from './Sort';
import Loader from './Loader';

const { Link } = routes;

const Repositories = props => {
  const {
    repositories: { data: repositories, pagination, query },
    loading,
    asyncFetchRepositories,
  } = props;

  const handleOnScroll = () => {
    if (pagination.hasNextPage) {
      asyncFetchRepositories({
        after: pagination.endCursor,
      });
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={3}
      mb={4}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        style={{ maxWidth: '800px' }}
        mb={3}
      >
        <FilterRepositories />
        <Sort />
      </Flex>
      {!repositories.length && !loading && (
        <Box my={3}>This user has no repositories.</Box>
      )}
      {repositories.length > 0 && (
        <BottomScrollListener onBottom={handleOnScroll} offset={500}>
          {!repositories.length && !loading && (
            <Box my={4}>
              No repositories found with the search term "{query}"
            </Box>
          )}
          {repositories.map(repository => (
            <Link
              key={repository.id}
              route="repository"
              params={{
                user: repository.owner.login,
                repository: repository.name,
              }}
            >
              <Repository {...repository} style={{ cursor: 'pointer' }} />
            </Link>
          ))}
        </BottomScrollListener>
      )}
      {loading && <Loader />}
    </Flex>
  );
};

const mapState = state => ({
  repositories: state.repositories,
  loading: state.loading.effects.repositories.asyncFetchRepositories,
});

const mapDispatch = ({ repositories: { asyncFetchRepositories } }) => ({
  asyncFetchRepositories,
});

export default connect(
  mapState,
  mapDispatch,
)(Repositories);
