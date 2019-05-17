import { Flex } from '@rebasejs/rebase';

import Icon from './Icon';

export default () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    bg="light"
    color="dark"
    p={3}
    fontSize={1}
  >
    <Icon name="logo" height={20} mr={2} />
    The Waffle Company
  </Flex>
);
