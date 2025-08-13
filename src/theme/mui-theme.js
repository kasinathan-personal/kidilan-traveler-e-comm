import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#bfa27a',
      contrastText: '#0b1d2a',
    },
    secondary: {
      main: '#d9c6aa',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    text: {
      primary: '#27323d',
      secondary: '#475569',
    }
  },
  typography: {
    fontFamily: 'Onest, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontFamily: 'Onest, sans-serif', letterSpacing: '-0.02em' },
    h2: { fontFamily: 'Onest, sans-serif', letterSpacing: '-0.02em' },
    h3: { fontFamily: 'Onest, sans-serif' },
    button: { textTransform: 'none', letterSpacing: 0.2 }
  },
  shape: {
    borderRadius: 20
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          backgroundImage: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px'
        }
      }
    }
  }
});

export default theme; 