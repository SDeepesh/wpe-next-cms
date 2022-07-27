import { createTheme } from '@mui/material/styles';

const theme = {
  colors: {
    black: '#3c434a',
    white: '#ffffff',
    primary: '#7e5cef',
    success: '#35872f',
    danger: '#d21b46',
    tiffany: '#0ecad4',
  },

  fonts: {
    sizes: {
      large: '18px',
      medium: '13px',
      small: '10px',
    },
  },
};

const materialTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.primary,
    },
    success: {
      main: theme.colors.success,
    },
    error: {
      main: theme.colors.danger,
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
  wpColors: {
    tiffany: theme.colors.tiffany,
  },
});

export type Theme = typeof theme;

export default theme;

export { materialTheme };
