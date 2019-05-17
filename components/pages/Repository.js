import { Flex } from '@rebasejs/rebase/dist/Flex';

import Navbar from '../Navbar';
import User from '../User';
import Commits from '../Commits';

export default () => (
  <>
    <Navbar />
    <Flex
      justifyContent="center"
      alignItems="center"
    >
      <User mr={4} />
      <Commits />
    </Flex>
  </>
);
