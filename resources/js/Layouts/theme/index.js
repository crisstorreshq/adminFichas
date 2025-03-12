import { createTheme } from "@mui/material";
import { esES } from '@mui/material/locale';

let theme = createTheme()

theme = createTheme(theme, {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#00a29b',
    },
    verde: {
      main: '#00CC00'
    },
    original: {
      main:'#1976D2',
      contrastText: '#fff'
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f4f4f7',
    },
  },
  typography: {
    h1: {
      fontSize: 20,
      fontWeight: 'bold',
      [theme.breakpoints.up('md')]: {
        fontSize: 22,
      },
    },
    h2: {
      fontSize: 18,
      fontWeight: 'bold',
      [theme.breakpoints.up('md')]: {
        fontSize: 20,
      },
    },
    h3: {
      fontSize: 16,
      fontWeight: 'bold',
      [theme.breakpoints.up('md')]: {
        fontSize: 18,
      },
    },
    h4: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 14,
      fontWeight: 400,
    },
    h6: {
      fontSize: 14,
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: 0.15,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 'bold',
      letterSpacing: 0.1,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: 0.5,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 0.25,
    },
  },
},
esES,
);

export default theme;