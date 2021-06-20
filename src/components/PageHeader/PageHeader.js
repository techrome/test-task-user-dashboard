import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

import { FlexList } from 'src/components/FlexList';

const useStyles = makeStyles(
  (theme) => ({
    main: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
    },
    container: {
      position: 'relative',
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(8),
    },
    flexList: {
      justifyContent: 'space-between',
    },
    title: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(10),
      },
    },
    mainActionComponent: {
      position: 'absolute',
      bottom: theme.spacing(-3),
      left: theme.spacing(3),
    },
  }),
  { index: 1 },
);

const PageHeader = ({ title, MainActionComponent, children, ...props }) => {
  const cls = useStyles();

  return (
    <section className={cls.main}>
      <Container className={cls.container}>
        <FlexList spacing={2} className={cls.flexList}>
          <Typography variant="h4" className={cls.title}>
            {title}
          </Typography>
          {children}
        </FlexList>
        {!!MainActionComponent && (
          <div className={cls.mainActionComponent}>{MainActionComponent}</div>
        )}
      </Container>
    </section>
  );
};

export default PageHeader;
