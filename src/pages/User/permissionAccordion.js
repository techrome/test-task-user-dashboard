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
    accordion: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&:before': {
        display: 'none',
      },
      '&.Mui-expanded': {
        margin: 0,
      },
    },
    accordionSummary: {
      flexDirection: 'row-reverse',
      '& .MuiAccordionSummary-expandIcon': {
        marginRight: 0,
        marginLeft: theme.spacing(-1.5),
        opacity: (props) => (props.showExpandIcon ? '1' : '0'),
      },
    },
    summaryWrapper: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summaryTitle: {
      marginRight: theme.spacing(2),
    },
    details: {
      flexDirection: 'column',
      paddingRight: '27px',
      paddingLeft: theme.spacing(5),
      '& .MuiFormControlLabel-labelPlacementStart': {
        justifyContent: 'space-between',
      },
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
  expandable = true,
  ...props
}) => {
  const cls = useStyles({ showExpandIcon: expandable });

  return (
    <Accordion
      {...(expandable ? {} : { expanded: false })}
      className={cls.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={cls.accordionSummary}
      >
        <div className={cls.summaryWrapper}>
          <Typography variant="body1" className={cls.summaryTitle}>
            {title}
          </Typography>
          <Switch
            checked={switchChecked}
            onChange={onSwitch}
            color="primary"
            onClick={stopPropagation}
            onFocus={stopPropagation}
          />
        </div>
      </AccordionSummary>
      <AccordionDetails className={cls.details}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default PermissionAccordion;
