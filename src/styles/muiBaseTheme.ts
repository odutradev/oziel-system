import { createTheme } from '@mui/material/styles';

import type { ThemeOptions, Components, Theme } from '@mui/material/styles';

const COMPONENT_HEIGHT = '56px';

const getCommonComponents = (theme: Theme): Components => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: { backgroundColor: theme.palette.mode === 'dark' ? '#262626' : '#fafafa' }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundColor: `${theme.palette.mode === 'dark' ? '#363636' : '#ffffff'} !important` }
    }
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        height: COMPONENT_HEIGHT,
        '& input:-webkit-autofill': {
          WebkitBoxShadow: `0 0 0 100px ${theme.palette.mode === 'dark' ? '#363636' : '#ffffff'} inset`,
          WebkitTextFillColor: theme.palette.mode === 'dark' ? '#ffffff' : '#1A1A1A',
          caretColor: theme.palette.mode === 'dark' ? '#ffffff' : '#1A1A1A',
          borderRadius: 'inherit'
        },
        '& input:-webkit-autofill:hover': {
          WebkitBoxShadow: `0 0 0 100px ${theme.palette.mode === 'dark' ? '#363636' : '#ffffff'} inset`,
          WebkitTextFillColor: theme.palette.mode === 'dark' ? '#ffffff' : '#1A1A1A'
        },
        '& input:-webkit-autofill:focus': {
          WebkitBoxShadow: `0 0 0 100px ${theme.palette.mode === 'dark' ? '#363636' : '#ffffff'} inset`,
          WebkitTextFillColor: theme.palette.mode === 'dark' ? '#ffffff' : '#1A1A1A'
        },
        '& input:-webkit-autofill:active': {
          WebkitBoxShadow: `0 0 0 100px ${theme.palette.mode === 'dark' ? '#363636' : '#ffffff'} inset`,
          WebkitTextFillColor: theme.palette.mode === 'dark' ? '#ffffff' : '#1A1A1A'
        }
      }
    }
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: {
        height: COMPONENT_HEIGHT,
        width: '100%',
        display: 'flex'
      }
    }
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        height: '100%',
        flex: 1,
        textTransform: 'none'
      }
    }
  }
});

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#0499C8' },
    secondary: { main: '#024FF0' },
    background: { default: '#262626', paper: '#363636' }
  }
};

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#0499C8' },
    secondary: { main: '#024FF0' },
    background: { default: '#fafafa', paper: '#ffffff' }
  }
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);

lightTheme.components = getCommonComponents(lightTheme);
darkTheme.components = getCommonComponents(darkTheme);