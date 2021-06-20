import React from 'react';
import {
  Typography,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

const useStyles = makeStyles(
  (theme) => ({
    summaryWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summaryTitle: {
      marginRight: theme.spacing(2),
    },
    details: {
      flexDirection: 'column',
    },
  }),
  { index: 1 },
);

const stopPropagation = (e) => {
  e.stopPropagation();
};

const PermissionAccordion = ({
  title,
  children,
  onSwitch,
  switchChecked,
  ...props
}) => {
  const cls = useStyles();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div
          className={cls.summaryWrapper}
          onClick={stopPropagation}
          onFocus={stopPropagation}
        >
          <Typography variant="body1" className={cls.summaryTitle}>
            {title}
          </Typography>
          <Switch checked={switchChecked} onChange={onSwitch} color="primary" />
        </div>
      </AccordionSummary>
      <AccordionDetails className={cls.details}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default PermissionAccordion;
