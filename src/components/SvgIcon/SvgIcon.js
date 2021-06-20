import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReactSVG } from 'react-svg';
import clsx from 'clsx';

import { iconGlobalClassName } from 'src/config';

const useStyles = makeStyles((theme) => ({
  main: {
    '& svg': {
      display: 'block',
    },
  },
}));

const Loading = (props) => <div className={iconGlobalClassName} />;

const SvgIcon = ({ name, customSrc, className, ...props }) => {
  const cls = useStyles();

  // wrapped in useCallbacks
  // to avoid remounting the react-svg on rerender
  const afterInjection = useCallback((error, svg) => {
    if (error) {
      console.error(error);
      return;
    }
  }, []);
  const beforeInjection = useCallback((svg) => {
    svg.classList.add(iconGlobalClassName);
  }, []);

  return (
    <div className={clsx(cls.main, className)}>
      <ReactSVG
        afterInjection={afterInjection}
        beforeInjection={beforeInjection}
        src={customSrc || `/assets/img/icons/${name}.svg`}
        loading={Loading}
        {...props}
      />
    </div>
  );
};

export default SvgIcon;
