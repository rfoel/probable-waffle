import styled from 'styled-components';
import { Box } from '@rebasejs/rebase';
import { borderRadius, borderColor } from 'styled-system';
import { darken, lighten } from 'polished';

import Icon from './Icon';

const SelectWrapper = styled(Box)`
  position: relative;

  .select-icon {
    position: absolute;
    top: 4px;
    right: 10px;
  }
`;

const StyledSelect = styled(Box)(
  {
    border: '1px solid',
    outline: 'none',
    appearance: 'none',
  },
  props => ({
    background: props.dark
      ? lighten(0.12, props.theme.colors.dark)
      : props.theme.colors.light,
    borderColor: props.dark
      ? 'transparent !important'
      : darken(0.12, props.theme.colors.light),
    ':focus': {
      background: 'white',
      borderColor: props.dark
        ? lighten(0.12, props.theme.colors.dark)
        : darken(0.12, props.theme.colors.light),
      boxShadow: `0 0 0 0.2rem ${
        props.dark ? props.theme.colors.dark : props.theme.colors.light
      }`,
      '::placeholder': {
        color: darken(0.12, props.theme.colors.light),
      },
    },
    '::placeholder': {
      color: props.dark
        ? lighten(0.32, props.theme.colors.dark)
        : darken(0.12, props.theme.colors.light),
    },
  }),
  borderColor,
  borderRadius,
);

const Select = props => (
  <SelectWrapper>
    <StyledSelect {...props} />
    <Icon className="select-icon" name="sort-down" height={20} />
  </SelectWrapper>
);

Select.defaultProps = {
  as: 'select',
  color: 'dark',
  fontSize: 'inherit',
  m: 0,
  pl: 3,
  py: 2,
  pr: 5,
  borderColor: 'light',
  borderRadius: 4,
};

export default Select;
