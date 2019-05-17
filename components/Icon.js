import { Box } from '@rebasejs/rebase';

import icons from './icons';

const Logo = props => {
  const { name, height } = props;

  const icon = icons.find(icon => icon.name === name);

  return (
    <Box height={height} {...props}>
      <svg
        viewBox={icon.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '100%' }}
      >
        {icon.children}
      </svg>
    </Box>
  );
};

export default Logo;
