import { Flex, Box } from '@rebasejs/rebase';

export default ({ name, value, onChange, checked, children }) => (
  <Flex as="label" mx={2}>
    <Box
      as="input"
      type="radio"
      name={name}
      value={value}
      mr={2}
      onChange={onChange}
      checked={checked}
    />
    {children}
  </Flex>
);
