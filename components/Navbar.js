import { Flex, Box } from '@rebasejs/rebase';

import Icon from './Icon';
import Search from './Search';

export default () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="dark"
      color="light"
      p={4}
    >
      <Flex justifyContent="center" alignItems="center">
        <Icon name="logo" height={30} mr={4} />
        <Box>reactjs</Box>
      </Flex>
      <Search dark />
    </Flex>
  );
};
