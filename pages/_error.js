import { Flex, Box, Heading } from '@rebasejs/rebase';

import routes from '../routes';

import Icon from '../components/Icon';

const { Link } = routes;

export default () => (
  <Flex
    height="100%"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <Box mb={4}>
      <Icon name="logo" height={100} />
    </Box>
    <Heading mb={3}>What you were looking for was not found.</Heading>
    <Link route="index">
      <Box as="a" color="info">
        Go home
      </Box>
    </Link>
  </Flex>
);
