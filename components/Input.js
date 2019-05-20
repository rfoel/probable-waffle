import styled from 'styled-components';
import { Box } from '@rebasejs/rebase';
import { borderRadius, borderColor } from 'styled-system';
import { darken, lighten } from 'polished';

const Input = styled(Box)(
  {
    border: '1px solid',
    outline: 'none',
  },
  props => ({
    background: props.dark
      ? lighten(0.12, props.theme.colors.dark)
      : props.theme.colors.light,
    color: props.dark ? props.theme.colors.light : props.theme.colors.dark,
    borderColor: props.dark
      ? 'transparent !important'
      : darken(0.12, props.theme.colors.light),
    ':focus': {
      background: 'white',
      color: props.theme.colors.dark,
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

Input.defaultProps = {
  as: 'input',
  color: 'dark',
  fontSize: 'inherit',
  m: 0,
  px: 3,
  py: 2,
  borderColor: 'light',
  borderRadius: 4,
};

export default Input;
