import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const MaterialTheme = ({ children }: { children: React.ReactElement }) => {
  const theme = React.useMemo(() => {
    return createMuiTheme({
      typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
      overrides: {
        MuiBadge: {
          colorPrimary: {
            color: '#fff',
          },
        },
        MuiButton: {
          root: {
            textTransform: 'none',
          },
        },
        MuiFab: {
          root: {
            textTransform: 'none',
          },
        },
        MuiChip: {
          root: {
            height: 'fit-content',
            width: 'fit-content',
          },
        },
        MuiTooltip: {
          tooltip: { fontSize: '14px' },
        },
      },
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default MaterialTheme;
