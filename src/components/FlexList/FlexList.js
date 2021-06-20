import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: (props) =>
      props.horizontalAlign === 'left' ? 'flex-start' : 'flex-end',
    margin: (props) =>
      props.horizontalAlign === 'left'
        ? theme.spacing(0, -props.horizontal, -props.vertical, 0)
        : theme.spacing(0, 0, -props.vertical, -props.horizontal),
    '& > *': {
      margin: (props) =>
        props.horizontalAlign === 'left'
          ? theme.spacing(0, props.horizontal, props.vertical, 0)
          : theme.spacing(0, 0, props.vertical, props.horizontal),
    },
  },
}));

const FlexList = ({
  v,
  h,
  spacing,
  className,
  horizontalAlign = 'left',
  ...props
}) => {
  const cls = useStyles({
    horizontal: spacing || h,
    vertical: spacing || v,
    horizontalAlign,
  });

  return (
    <div className={clsx(cls.list, className)} {...props}>
      {props.children}
    </div>
  );
};

export default FlexList;
