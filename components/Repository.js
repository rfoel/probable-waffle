import styled from 'styled-components';
import { Flex, Box, Badge } from '@rebasejs/rebase';
import { darken, lighten, readableColor } from 'polished';
import { distanceInWordsToNow } from 'date-fns';

import Icon from './Icon';

const Repository = styled(Box)(props => ({
  maxWidth: '800px',
  borderRadius: '10px',
  border: `1px solid${darken(0.03, props.theme.colors.light)}`,
}));

export default props => {
  const {
    name,
    description,
    stargazers,
    forkCount,
    primaryLanguage,
    pushedAt,
  } = props;

  const color = (primaryLanguage && primaryLanguage.color) || 'whitesmoke';

  return (
    <Repository width="100%" p={3} my={2} {...props}>
      <Flex justifyContent="space-between" fontSize={3} mb={3}>
        <Box>{name}</Box>
        <Flex>
          {stargazers.totalCount > 0 && (
            <Flex mr={3}>
              <Icon name="star" height={15} mr={1} />
              {stargazers.totalCount}
            </Flex>
          )}
          {forkCount > 0 && (
            <Flex>
              <Icon name="code-branch" height={15} mr={1} />
              {forkCount}
            </Flex>
          )}
        </Flex>
      </Flex>
      {description && (
        <Box color="gray" fontSize={1} my={2}>
          {description}
        </Box>
      )}
      <Flex justifyContent="space-between" mt={3}>
        <Box>
          {primaryLanguage && (
            <Badge
              bg={color}
              color={readableColor(color, '#000', '#fff')}
              mr={1}
            >
              {primaryLanguage.name}
            </Badge>
          )}
        </Box>
        <Box fontSize={1}>updated {distanceInWordsToNow(pushedAt)} ago</Box>
      </Flex>
    </Repository>
  );
};
