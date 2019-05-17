import Link from 'next/link';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { Flex, Box, Image } from '@rebasejs/rebase';

import Filter from './Filter';
import Icon from './Icon';

const Commit = styled(Box)(
  {
    cursor: 'pointer',
  },
  props => ({
    border: `1px solid${darken(0.03, props.theme.colors.light)}`,
    ':hover': {
      background: lighten(0.03, props.theme.colors.light),
    },
  }),
);

export default () => (
  <Flex
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    p={3}
  >
    <Flex
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      style={{ maxWidth: '800px' }}
      mb={3}
    >
      <Filter placeholder="Search for a commit" />
    </Flex>

    <Commit
      width="100%"
      p={3}
      style={{ maxWidth: '800px', borderRadius: '10px' }}
    >
      <Box fontSize={2} my={1}>
        test: update tests to test theming
      </Box>
      <Flex fontSize={2} alignItems="center">
        <Link href="/user?user=rfoel" as="/rfoel">
          <Flex alignItems="center" fontSize={1}>
            <Image
              src="https://avatars1.githubusercontent.com/u/19496473"
              width="20px"
              height="20px"
              borderRadius={999}
              mr={1}
            />
            rfoel
          </Flex>
        </Link>
        <Box ml={1} fontSize={1}>
          committed 6 days ago
        </Box>
      </Flex>
      <Box color="gray" fontSize={1} mt={2}>
        Now it checks if theming is being applied. It still not covering 100%,
        but I will do this later.
      </Box>
    </Commit>
  </Flex>
);
