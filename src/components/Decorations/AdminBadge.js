import React from 'react';
import { VpnKey as VpnKeyIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    padding: (props) =>
      props.size === 'large' ? theme.spacing(1, 2) : theme.spacing(0.5, 1),
    backgroundColor: (props) =>
      props.disabled ? 'transparent' : theme.palette.tertiary.main,
    display: 'flex',
    borderRadius: '30px',
    '& .MuiSvgIcon-root': {
      color: (props) =>
        props.disabled
          ? theme.palette.action.disabled
          : theme.palette.tertiary.contrastText,
    },
  },
}));

const AdminBadge = ({ disabled, size, ...props }) => {
  const cls = useStyles({ disabled, size });

  return (
    <div className={cls.main}>
      <VpnKeyIcon />
    </div>
  );
};

export default AdminBadge;
