import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';

// Theme configuration
const getDesignTokens = mode => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#3f51b5',
            light: '#757de8',
            dark: '#002984',
          },
          secondary: {
            main: '#f50057',
            light: '#ff4081',
            dark: '#c51162',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#212121',
            secondary: '#757575',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
          },
          secondary: {
            main: '#f48fb1',
            light: '#fce4ec',
            dark: '#f06292',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
          },
        }),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'light' ? '#6b6b6b #e0e0e0' : '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: mode === 'light' ? '#e0e0e0' : '#2b2b2b',
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: mode === 'light' ? '#6b6b6b' : '#6b6b6b',
            minHeight: 24,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          '&:hover': {
            // Ensure text is always visible on hover
            color:
              mode === 'light'
                ? 'rgba(0, 0, 0, 0.87)' // Dark text on light background
                : '#ffffff', // White text on dark background
          },
        },
        // Specific variants styling
        contained: {
          '&:hover': {
            color: '#ffffff', // Always white text for contained buttons on hover
          },
        },
        outlined: {
          '&:hover': {
            color: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
            backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
          },
        },
        text: {
          '&:hover': {
            color: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
            backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' ? '0 4px 6px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.3)',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Custom hook to create theme based on current mode
export const useTheme = () => {
  const { mode } = useAppContext();

  return useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
};

// Default theme for initial render
export const theme = createTheme(getDesignTokens('light'));
