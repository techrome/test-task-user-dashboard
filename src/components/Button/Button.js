import React, { forwardRef } from 'react';
import { Button as MuiButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles((theme) => ({
  root: (props) =>
    props.color === 'tertiary' && props.variant === 'contained'
      ? {
          color: theme.palette.tertiary.contrastText,
          backgroundColor: theme.palette.tertiary.main,
          '&:hover': {
            backgroundColor: theme.palette.tertiary.dark,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: theme.palette.tertiary.main,
            },
          },
        }
      : props.color === 'error' && props.variant === 'contained'
      ? {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.error.main,
          '&:hover': {
            backgroundColor: theme.palette.error.dark,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: theme.palette.error.main,
            },
          },
        }
      : {},
}))(MuiButton);

const useStyles = makeStyles((theme) => ({}), { index: 1 });

const Button = forwardRef(({ children, ...props }, ref) => {
  const cls = useStyles();
  return (
    <StyledButton ref={ref} {...props}>
      {children}
    </StyledButton>
  );
});

export default Button;
