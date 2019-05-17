import { Box, Button } from '@rebasejs/rebase';

import Input from './Input';

export default ({ dark }) => (
  <Box>
    <Input
      mr={2}
      placeholder="Search for an user or organization"
      width={300}
      dark={dark}
    />
  </Box>
);
