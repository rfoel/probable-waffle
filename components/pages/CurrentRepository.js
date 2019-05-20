import { Flex, Box } from '@rebasejs/rebase';
import { connect } from 'react-redux';

import routes from '../../routes';

import Navbar from '../Navbar';
import User from '../User';
import Repository from '../Repository';
import Commits from '../Commits';

const { Link } = routes;

const CurrentRepository = props => {
  const { repository } = props;

  return (
    <>
      <Navbar />
      <Flex justifyContent="center" alignItems="flex-start" flexWrap="wrap">
        <Box width={[1, 'auto']}>
          <Link route="user" params={{ user: repository.owner.login }}>
            <User mr={4} style={{ cursor: 'pointer' }} />
          </Link>
        </Box>
        <Box width={[1, 1 / 2]}>
          <Repository {...repository} style={{ border: '0' }} />
          <Commits />
        </Box>
      </Flex>
    </>
  );
};

const mapState = ({ repository: { repository } }) => ({
  repository,
});

export default connect(mapState)(CurrentRepository);
