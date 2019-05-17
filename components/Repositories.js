import Link from 'next/link';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { Flex, Box, Badge } from '@rebasejs/rebase';

import Filter from './Filter';
import OrderBy from './OrderBy';
import Icon from './Icon';

const Repository = styled(Box)(
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
      <Filter placeholder="Search for a repository" />
      <OrderBy />
    </Flex>

    <Link href="/rfoel/bulma-toast">
      <Repository
        width="100%"
        p={3}
        style={{ maxWidth: '800px', borderRadius: '10px' }}
      >
        <Flex justifyContent="space-between" fontSize={3}>
          <Box>bulma-toast</Box>
          <Flex>
            <Flex mr={3}>
              <Icon name="star" height={15} mr={1} />3
            </Flex>
            <Flex>
              <Icon name="code-branch" height={15} mr={1} />
              14
            </Flex>
          </Flex>
        </Flex>
        <Box color="gray" fontSize={1} mt={2}>
          Bulma's pure JavaScript extension to display toasts
        </Box>
        <Box mt={2}>
          <Badge variant="light" mr={1}>
            bulma
          </Badge>
          <Badge variant="light" m={1}>
            toast
          </Badge>
        </Box>
      </Repository>
    </Link>
  </Flex>
);
