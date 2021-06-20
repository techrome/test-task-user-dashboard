import React from 'react';
import {
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    titleWrapper: {
      padding: theme.spacing(9, 3, 5, 6),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(9, 12, 5, 15),
      },
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    content: {
      padding: theme.spacing(0, 3, 7, 6),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 12, 7, 15),
      },
      overflowY: 'auto',
    },
  }),
  { index: 1 },
);

const Modal = ({ title, children, onClose, ...props }) => {
  const cls = useStyles();

  return (
    <>
      <DialogTitle disableTypography className={cls.titleWrapper}>
        <Typography variant="h4">{title}</Typography>
        <IconButton
          aria-label="close"
          className={cls.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={cls.content}>{children}</DialogContent>
    </>
  );
};

export default Modal;
