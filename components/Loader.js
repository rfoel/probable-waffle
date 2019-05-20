import styled, { keyframes } from 'styled-components';
import { Flex } from '@rebasejs/rebase';

import Icon from './Icon';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const RotatingIcon = styled(Icon)`
  animation: ${rotate} 1s linear infinite;
`;

export default ({ height = 50 }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    my={4}
    style={{ opacity: '0.3' }}
  >
    <RotatingIcon name="spinner-third" height={height} />
  </Flex>
);
