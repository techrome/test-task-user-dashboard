import React from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import { Face as FaceIcon } from '@material-ui/icons';

import Modal from './_base';
import { Button } from 'src/components/Button';
import { usersActions } from 'src/redux/stores/users';

const useStyles = makeStyles(
  (theme) => ({
    infoWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
    },
    icon: {
      position: 'absolute',
      left: theme.spacing(-4),
      top: '-2px',
      [theme.breakpoints.up('md')]: {
        left: theme.spacing(-6),
      },
    },
    divider: {
      margin: theme.spacing(4, 0, 5),
    },
  }),
  { index: 1 },
);

const DeleteUserModal = ({
  deleteUser,

  onClose,
  user,
  ...props
}) => {
  const cls = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Modal title="Delete user" onClose={onClose}>
      <div className={cls.infoWrapper}>
        <Typography variant="body2">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" color={user.isActive ? 'primary' : 'error'}>
          {user.isActive ? 'Active' : 'Inactive'} User
        </Typography>
        <div className={cls.icon}>
          <FaceIcon />
        </div>
      </div>
      <Divider className={cls.divider} />
      <Button
        color="error"
        variant="contained"
        onClick={() => {
          deleteUser(user.id);
          enqueueSnackbar('User successfully deleted', { variant: 'success' });
          onClose();
        }}
      >
        Delete User
      </Button>
    </Modal>
  );
};

const mapState = (state) => ({});

const mapDispatch = {
  deleteUser: usersActions.deleteUser,
};

export default connect(mapState, mapDispatch)(DeleteUserModal);
