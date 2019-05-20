import { connect } from 'react-redux';
import { Flex, Box } from '@rebasejs/rebase';

import routes from '../routes';

import Icon from './Icon';
import Search from './Search';

const { Link, Router } = routes;

const Navbar = props => {
  const {
    data: { login },
  } = props.user;

  const {
    repository: { name },
  } = props.repository;

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="dark"
      color="light"
      p={4}
    >
      <Flex justifyContent="center" alignItems="center">
        <Link route="index">
          <Icon name="logo" height={30} mr={4} style={{ cursor: 'pointer' }} />
        </Link>
        <Link route="user" params={{ user: login }}>
          <Box as="a">{login}</Box>
        </Link>
        {name && Router.router !== null && Router.router.query.repository && (
          <>
            <Box mx={2}>/</Box>
            <Link route="repository" params={{ user: login, repository: name }}>
              <Box as="a">{name}</Box>
            </Link>
          </>
        )}
      </Flex>
      <Search dark />
    </Flex>
  );
};

const mapState = state => ({
  user: state.user,
  repository: state.repository,
});

export default connect(mapState)(Navbar);
