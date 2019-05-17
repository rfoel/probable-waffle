import Link from 'next/link';
import { Flex, Badge } from '@rebasejs/rebase';

import SearchBar from '../Search';
import { Box } from '@rebasejs/rebase/dist/Box';

export default () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    height="100%"
  >
    <Box>
      <SearchBar />
    </Box>
    <Box my={4}>
      or try one of these
      <Link href="/user?user=reactjs" as="/reactjs">
        <Badge variant="info" ml={1} style={{ cursor: 'pointer' }}>
          reactjs
        </Badge>
      </Link>
      ,
      <Link href="/user?user=gympass" as="/gympass">
        <Badge variant="danger" ml={1} style={{ cursor: 'pointer' }}>
          gympass
        </Badge>
      </Link>
      , or
      <Link href="/user?user=rfoel" as="/rfoel">
        <Badge variant="success" ml={1} style={{ cursor: 'pointer' }}>
          rfoel
        </Badge>
      </Link>
      .
    </Box>
  </Flex>
);
