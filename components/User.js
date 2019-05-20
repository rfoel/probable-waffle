import { connect } from 'react-redux';
import { Flex, Box, Image } from '@rebasejs/rebase';

const User = props => {
  const {
    data: { avatarUrl, name, login },
  } = props.user;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      my={4}
      {...props}
    >
      <Image src={avatarUrl} width="100px" height="100px" borderRadius={999} />
      <Box fontSize={3} mt={3}>
        {name}
      </Box>
      <Box color="gray" mt={1}>
        {login}
      </Box>
    </Flex>
  );
};

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(User);
