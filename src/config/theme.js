import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#305ECA',
    },
    secondary: {
      main: '#FF0000',
      contrastText: '#fff',
    },
    background: {
      default: '#F3F3F3',
    },
    action: {
      disabledBackground: '#C6C6C6',
    },
  },
});

theme.palette.tertiary = theme.palette.augmentColor({
  main: '#7E7EF1',
});

theme.overrides.MuiDialog = {
  paper: {
    width: '100%',
    maxWidth: '650px',
  },
};
theme.overrides.MuiTableCell = {
  head: {
    fontWeight: 600,
    textTransform: 'uppercase',
  },
};
theme.overrides.MuiButton = {
  root: {
    borderRadius: '30px',
  },
  sizeLarge: {
    padding: theme.spacing(1.5, 6),
    borderRadius: '100px',
  },
};

theme.typography.body1 = {
  fontWeight: 600,
};

export default theme;
