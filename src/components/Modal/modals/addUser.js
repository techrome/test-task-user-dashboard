import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import {
  Face as FaceIcon,
  AlternateEmail as AlternateEmailIcon,
  VpnKey as VpnKeyIcon,
} from '@material-ui/icons';
import uniqueId from 'lodash/uniqueId';

import Modal from './_base';
import { Button } from 'src/components/Button';
import { FlexList } from 'src/components/FlexList';
import { Input, Select } from 'src/components/Fields';
import * as c from 'src/constants';
import { roles } from 'src/config';
import { validateUser, convertValidations } from 'src/helpers/validate';
import { usersActions } from 'src/redux/stores/users';

const useStyles = makeStyles(
  (theme) => ({
    iconWrapper: {
      position: 'relative',
    },
    icon: {
      position: 'absolute',
      left: theme.spacing(-3),
      top: theme.spacing(4),
      [theme.breakpoints.up('md')]: {
        left: theme.spacing(-6),
      },
    },
    actionsWrapper: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    errorText: {
      color: theme.palette.error.main,
    },
    successText: {
      color: theme.palette.success.main,
    },
  }),
  { index: 1 },
);

const AddUserModal = ({
  addUser,

  onClose,
  user,
  ...props
}) => {
  const cls = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: null,
  });
  const [errors, setErrors] = useState({ ...values });

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

  const onAdd = () => {
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

    addUser({
      ...payload,
      id: uniqueId(),
      isActive: true,
      permissions: [],
    });

    enqueueSnackbar('User successfully invited', { variant: 'success' });
    onClose();
  };

  const allFieldsFilled = useMemo(() => {
    for (let key in values) {
      if (!values[key]) {
        // we won't have numeric values so no problem with 0
        return false;
      }
    }
    return true;
  }, [values]);

  return (
    <Modal title="Invite New User" onClose={onClose}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className={cls.iconWrapper}>
          <div className={cls.icon}>
            <FaceIcon />
          </div>
          <Input
            placeholder="* First Name"
            value={values.firstName}
            onChange={(val) => onFieldChange('firstName', val)}
            error={errors.firstName}
            name="firstName"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            placeholder="* Last Name"
            value={values.lastName}
            onChange={(val) => onFieldChange('lastName', val)}
            error={errors.lastName}
            name="lastName"
          />
        </Grid>
        <Grid item xs={12} className={cls.iconWrapper}>
          <div className={cls.icon}>
            <AlternateEmailIcon />
          </div>
          <Input
            placeholder="* Email"
            value={values.email}
            onChange={(val) => onFieldChange('email', val)}
            error={errors.email}
            name="email"
          />
        </Grid>
        <Grid item xs={12} sm={6} className={cls.iconWrapper}>
          <div className={cls.icon}>
            <VpnKeyIcon />
          </div>
          <Select
            placeholder="* Role"
            options={roles}
            value={values.role}
            onChange={(val) => onFieldChange('role', val)}
            error={errors.role}
            name="role"
          />
        </Grid>
        <Grid item xs={12}>
          <FlexList spacing={2} className={cls.actionsWrapper}>
            <Button
              color="primary"
              variant="contained"
              disabled={!allFieldsFilled}
              onClick={onAdd}
            >
              Send Invitation
            </Button>
            <Typography
              variant="body2"
              className={allFieldsFilled ? cls.successText : cls.errorText}
            >
              {allFieldsFilled ? 'Good to go' : 'Fill in all the fields'}
            </Typography>
          </FlexList>
        </Grid>
      </Grid>
    </Modal>
  );
};

const mapState = (state) => ({});

const mapDispatch = {
  addUser: usersActions.addUser,
};

export default connect(mapState, mapDispatch)(AddUserModal);
