import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import './index.css';
import Routing from './router';
import store from 'src/redux';
import { ErrorBoundaryFallback } from 'src/components/ErrorBoundaryFallback';
import { GlobalModal } from 'src/components/Modal';
import theme from 'src/config/theme';

const App = ({ ...props }) => {
  const notistackRef = useRef();

  const closeSnackbar = (key) => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <Provider store={store}>
            <SnackbarProvider
              ref={notistackRef}
              action={(key) => (
                <IconButton onClick={() => closeSnackbar(key)}>
                  <CloseIcon fontSize="small" style={{ color: '#fff' }} />
                </IconButton>
              )}
              anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
              }}
              maxSnack={4}
            >
              <CssBaseline />
              <GlobalModal />
              <Routing />
            </SnackbarProvider>
          </Provider>
        </ErrorBoundary>
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
