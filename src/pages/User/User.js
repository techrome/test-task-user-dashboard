import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Fab,
  Grid,
  CircularProgress,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Settings as SettingsIcon } from '@material-ui/icons';
import union from 'lodash/union';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { PageHeader } from 'src/components/PageHeader';
import { Button } from 'src/components/Button';
import { FlexList } from 'src/components/FlexList';
import { Input, Select } from 'src/components/Fields';
import { SvgIcon } from 'src/components/SvgIcon';
import { AdminBadge } from 'src/components/Decorations';
import * as c from 'src/constants';
import { usersActions, usersSelectors } from 'src/redux/stores/users';
import { modalActions } from 'src/redux/stores/modal';
import { iconGlobalClassName, roles, permissionGroups } from 'src/config';
import { validateUser, convertValidations } from 'src/helpers/validate';
import PermissionAccordion from './permissionAccordion';

const useStyles = makeStyles(
  (theme) => ({
    main: {
      padding: theme.spacing(7, 0),
    },
    loading: {
      textAlign: 'center',
    },
    mainInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatarWrapper: {
      position: 'relative',
      marginBottom: theme.spacing(2),
      [`& .${iconGlobalClassName}`]: {
        width: '230px',
        height: '230px',
        fill: theme.palette.grey[700],
      },
    },
    adminBadgeWrapper: {
      position: 'absolute',
      right: 0,
      bottom: theme.spacing(2),
    },
    name: {
      margin: theme.spacing(3, 0),
    },
    sectionHeader: {
      marginBottom: theme.spacing(5),
    },
    statusWrapper: {
      marginBottom: theme.spacing(5),
    },
    fieldsWrapper: {
      marginBottom: theme.spacing(3),
    },
    permissionsSectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    permissionsAccordions: {},
    permissionDecoration: {
      width: theme.spacing(1),
      height: theme.spacing(1),
      borderRadius: '50%',
      margin: '0 12px 1px 0',
      display: 'inline-block',
    },
    disabledSection: {
      opacity: '0.3',
      pointerEvents: 'none',
    },
  }),
  { index: 1 },
);

const UserPage = ({ users, editUser, resetModal, setModalInfo, ...props }) => {
  const cls = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const userId = props.match.params.id;

  const [loading, setLoading] = useState(true);
  const [originalUser, setOriginalUser] = useState(null);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: null,
  });
  const [errors, setErrors] = useState({ ...values });

  const userActive = !!originalUser?.isActive;

  const onFieldChange = (field, value) => {
    setValues({
      ...values,
      [field]: value,
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handleSaveChanges = () => {
    const payload = {
      ...values,
    };

    const validations = validateUser(payload);
    if (validations) {
      setErrors({
        ...errors,
        ...convertValidations(validations),
      });
      return;
    }

    editUser(userId, {
      ...originalUser,
      ...payload,
    });

    enqueueSnackbar('Changes were successfully saved', { variant: 'success' });
  };

  const handleInviteResend = () => {
    enqueueSnackbar('Invitation was successfully resent', {
      variant: 'success',
    });
  };

  const handleStatusChange = (e) => {
    editUser(userId, { ...originalUser, isActive: e.target.checked });
  };

  // suitable for both single perm and group change
  const handlePermissionsChange = (incomingPerms, shouldMerge) => {
    let updatedPerms = [...originalUser.permissions];

    if (shouldMerge) {
      updatedPerms = union(updatedPerms, incomingPerms);
    } else {
      // then we need to remove them
      updatedPerms = updatedPerms.filter((el) => !incomingPerms.includes(el));
    }
    editUser(userId, { ...originalUser, permissions: updatedPerms });
  };

  useEffect(() => {
    const foundUser = users.find((user) => user.id === userId);

    if (foundUser) {
      setValues({
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        role: foundUser.role,
      });
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const foundUser = users.find((user) => user.id === userId);

    if (foundUser) {
      setOriginalUser(foundUser);
    }
  }, [users]);

  return (
    <div className={cls.bg}>
      <PageHeader
        title="User Setup"
        MainActionComponent={
          <Fab color="primary" disabled>
            <SettingsIcon style={{ color: '#fff' }} fontSize="large" />
          </Fab>
        }
      />
      <main className={cls.main}>
        <Container>
          {loading ? (
            <div className={cls.loading}>
              <CircularProgress />
            </div>
          ) : !originalUser ? (
            <div>
              <Typography variant="h4" align="center">
                User not found
              </Typography>
            </div>
          ) : (
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} lg={4}>
                <div className={cls.mainInfo}>
                  <div className={cls.avatarWrapper}>
                    <SvgIcon name="user" />
                    {originalUser.role === c.admin && (
                      <div className={cls.adminBadgeWrapper}>
                        <AdminBadge size="large" />
                      </div>
                    )}
                  </div>
                  {userActive && <Button>Upload a photo</Button>}
                  <div
                    className={clsx(
                      cls.name,
                      !userActive && cls.disabledSection,
                    )}
                  >
                    <Typography variant="h3" align="center" gutterBottom>
                      {originalUser.firstName} {originalUser.lastName}
                    </Typography>
                    <Typography variant="body2" align="center">
                      {originalUser.email}
                    </Typography>
                  </div>
                  {userActive && (
                    <Button
                      color="tertiary"
                      variant="contained"
                      onClick={handleInviteResend}
                      size="large"
                    >
                      Resend the invite
                    </Button>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Typography variant="h4" className={cls.sectionHeader}>
                  Details
                </Typography>
                <FormControlLabel
                  className={cls.statusWrapper}
                  control={
                    <Switch
                      checked={userActive}
                      onChange={handleStatusChange}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      The user is{' '}
                      <strong>{userActive ? 'Active' : 'Inactive'}</strong>{' '}
                    </Typography>
                  }
                />
                <Grid
                  container
                  spacing={3}
                  className={clsx(
                    cls.fieldsWrapper,
                    !userActive && cls.disabledSection,
                  )}
                >
                  <Grid item xs={12}>
                    <Input
                      placeholder="* First Name"
                      value={values.firstName}
                      onChange={(val) => onFieldChange('firstName', val)}
                      error={errors.firstName}
                      name="firstName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      placeholder="* Last Name"
                      value={values.lastName}
                      onChange={(val) => onFieldChange('lastName', val)}
                      error={errors.lastName}
                      name="lastName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      placeholder="* Email"
                      value={values.email}
                      onChange={(val) => onFieldChange('email', val)}
                      error={errors.email}
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      placeholder="* Role"
                      options={roles}
                      value={values.role}
                      onChange={(val) => onFieldChange('role', val)}
                      error={errors.role}
                      name="role"
                    />
                  </Grid>
                </Grid>
                {userActive && (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSaveChanges}
                    size="large"
                  >
                    Save changes
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} lg={4}>
                <FlexList
                  spacing={2}
                  className={clsx(
                    cls.sectionHeader,
                    cls.permissionsSectionHeader,
                  )}
                >
                  <Typography variant="h4">Permissions</Typography>
                  <Typography variant="body2">
                    {roles.find((el) => el.value === originalUser.role)?.title}
                  </Typography>
                </FlexList>
                <div
                  className={clsx(
                    cls.permissionsAccordions,
                    !userActive && cls.disabledSection,
                  )}
                >
                  {permissionGroups.map((el, index) => (
                    <PermissionAccordion
                      key={index}
                      title={el.title}
                      onSwitch={(e) => {
                        handlePermissionsChange(
                          el.perms.map((el2) => el2.value),
                          e.target.checked,
                        );
                      }}
                      switchChecked={el.perms.every((el2) =>
                        originalUser.permissions.includes(el2.value),
                      )}
                      expandable={el.perms.length > 1}
                    >
                      {el.perms.length > 1 &&
                        el.perms.map((el2, index2) => {
                          const permissionEnabled =
                            originalUser.permissions.includes(el2.value);

                          return (
                            <FormControlLabel
                              key={index2}
                              control={
                                <Switch
                                  checked={permissionEnabled}
                                  onChange={(e) => {
                                    handlePermissionsChange(
                                      [el2.value],
                                      e.target.checked,
                                    );
                                  }}
                                  color="primary"
                                />
                              }
                              label={
                                <Typography
                                  variant={
                                    permissionEnabled ? 'body1' : 'body2'
                                  }
                                >
                                  <span
                                    className={cls.permissionDecoration}
                                    style={{
                                      backgroundColor: permissionEnabled
                                        ? theme.palette.primary.main
                                        : theme.palette.error.main,
                                    }}
                                  />{' '}
                                  {el2.title}
                                </Typography>
                              }
                              labelPlacement="start"
                            />
                          );
                        })}
                    </PermissionAccordion>
                  ))}
                </div>
              </Grid>
            </Grid>
          )}
        </Container>
      </main>
    </div>
  );
};

const mapState = (state) => ({
  users: usersSelectors.users(state),
});
const mapDispatch = {
  addUser: usersActions.addUser,
  editUser: usersActions.editUser,
  deleteUser: usersActions.deleteUser,

  setModalInfo: modalActions.setInfo,
  resetModal: modalActions.reset,
};

export default connect(mapState, mapDispatch)(UserPage);
