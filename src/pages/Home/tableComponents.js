import React from 'react';
import { Typography, IconButton, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Settings as SettingsIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { SvgIcon } from 'src/components/SvgIcon';
import { AdminBadge } from 'src/components/Decorations';
import * as c from 'src/constants';
import { iconGlobalClassName, roles, modalNames } from 'src/config';
import { usersActions } from 'src/redux/stores/users';
import { modalActions } from 'src/redux/stores/modal';

const useStyles = makeStyles((theme) => ({
  userCell: {
    display: 'flex',
    alignItems: 'center',
  },
  disabledText: {
    '& .MuiTypography-root': {
      color: theme.palette.action.disabled,
    },
  },
  userCellIconWrapper: {
    marginRight: theme.spacing(6),
    [`& .${iconGlobalClassName}`]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      fill: (props) =>
        props.cellDisabled
          ? theme.palette.action.disabled
          : theme.palette.grey[700],
    },
  },
  roleCell: {
    display: 'flex',
    alignItems: 'center',
  },
  adminBadgeWrapper: {
    marginRight: theme.spacing(3),
  },
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
}));

const UserCell = ({ data, disabled, ...props }) => {
  const cls = useStyles({ cellDisabled: disabled });

  return (
    <div className={clsx(cls.userCell, disabled && cls.disabledText)}>
      <div className={cls.userCellIconWrapper}>
        <SvgIcon name="user" />
      </div>
      <div>
        <Typography variant="body1">
          {data.firstName} {data.lastName}
        </Typography>
        <Typography variant="body2">{data.email}</Typography>
      </div>
    </div>
  );
};

const RoleCell = ({ isAdmin, text, disabled, ...props }) => {
  const cls = useStyles({ cellDisabled: disabled });

  return (
    <div className={clsx(cls.roleCell, disabled && cls.disabledText)}>
      {isAdmin && (
        <div className={cls.adminBadgeWrapper}>
          <AdminBadge disabled={disabled} />
        </div>
      )}
      <Typography variant="body1">{text}</Typography>
    </div>
  );
};

const _StatusCell = ({ editUser, user, ...props }) => {
  return (
    <Switch
      checked={user.isActive}
      onChange={(e) =>
        editUser(user.id, { ...user, isActive: e.target.checked })
      }
      color="primary"
    />
  );
};

const mapStateStatusCell = (state) => ({});
const mapDispatchStatusCell = {
  editUser: usersActions.editUser,
};

const StatusCell = connect(
  mapStateStatusCell,
  mapDispatchStatusCell,
)(_StatusCell);

const _UserActions = ({ setModalInfo, resetModal, user, ...props }) => {
  const cls = useStyles();

  return (
    <div className={cls.actionsWrapper}>
      <Link to={`/user/${user.id}`}>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Link>
      <IconButton
        onClick={() => {
          setModalInfo({
            type: modalNames.DELETE_USER,
            isOpen: true,
            props: {
              onClose: resetModal,
              user,
            },
          });
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

const mapStateUserActions = (state) => ({});
const mapDispatchUserActions = {
  setModalInfo: modalActions.setInfo,
  resetModal: modalActions.reset,
};

const UserActions = connect(
  mapStateUserActions,
  mapDispatchUserActions,
)(_UserActions);

export const columns = [
  {
    id: 'user',
    value: 'User',
  },
  {
    id: 'role',
    value: 'Role',
  },
  {
    id: 'status',
    value: 'Status',
  },
  {
    id: 'actions',
    value: 'Actions',
    alignRight: true,
    notSortable: true,
  },
];

export const createRow = (user) => {
  const { id, firstName, lastName, email, role, isActive } = user;

  return {
    user: {
      value: `${firstName} ${lastName} ${email}`,
      render: ({ ...props }, cell) => {
        return (
          <UserCell
            data={{ firstName, lastName, email }}
            disabled={!isActive}
          />
        );
      },
    },
    role: {
      value: role,
      render: ({ ...props }, cell) => {
        return (
          <RoleCell
            isAdmin={role === c.admin}
            text={roles.find((el) => el.value === role)?.title}
            disabled={!isActive}
          />
        );
      },
    },
    status: {
      value: isActive,
      render: ({ ...props }, cell) => {
        return <StatusCell user={user} />;
      },
    },
    actions: {
      value: '',
      render: ({ ...props }, cell) => {
        return <UserActions user={user} />;
      },
    },
    id,
    originalUser: user,
  };
};
