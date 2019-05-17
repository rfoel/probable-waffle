import { Flex, Box, Image } from '@rebasejs/rebase';

export default props => (
  <Flex
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    my={4}
    {...props}
  >
    <Image
      src="https://avatars1.githubusercontent.com/u/19496473"
      width="100px"
      height="100px"
      borderRadius={999}
    />
    <Box fontSize={3} mt={3}>
      Rafael Franco
    </Box>
    <Box color="gray" mt={1}>
      rfoel
    </Box>
  </Flex>
);
