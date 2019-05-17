import { Box } from '@rebasejs/rebase';

import Input from './Input';

export default ({ placeholder }) => (
  <Box>
    <Input mr={2} placeholder={placeholder} width={300} />
  </Box>
);
