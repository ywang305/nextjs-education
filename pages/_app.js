import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ButtonAppBar from './components/ButtonAppBar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from '../lib/store/store';

const CYAN = '#00f0ff';
const MAGENTA = '#ff2d7b';
const BG_DEFAULT = '#0a0a0f';
const BG_PAPER = '#12121a';
const TEXT_PRIMARY = '#e0e0ff';
const TEXT_SECONDARY = '#8a8aad';
const FONT_BODY = '"Share Tech Mono", "Roboto Mono", monospace';
const FONT_HEADING = '"Orbitron", "Share Tech Mono", monospace';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: CYAN,
      contrastText: '#0a0a0f',
    },
    secondary: {
      main: MAGENTA,
      contrastText: '#ffffff',
    },
    background: {
      default: BG_DEFAULT,
      paper: BG_PAPER,
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
    divider: 'rgba(0, 240, 255, 0.12)',
    info: {
      main: CYAN,
    },
    error: {
      main: '#ff4444',
    },
    success: {
      main: '#00ff88',
    },
    warning: {
      main: '#ffaa00',
    },
  },
  typography: {
    fontFamily: FONT_BODY,
    fontSize: 14,
    h1: { fontFamily: FONT_HEADING, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' },
    h2: { fontFamily: FONT_HEADING, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' },
    h3: { fontFamily: FONT_HEADING, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' },
    h4: { fontFamily: FONT_HEADING, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' },
    h5: { fontFamily: FONT_HEADING, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' },
    h6: { fontFamily: FONT_HEADING, fontWeight: 500, letterSpacing: '0.03em', textTransform: 'uppercase' },
    subtitle1: { fontFamily: FONT_HEADING, fontWeight: 500, letterSpacing: '0.02em' },
    subtitle2: { fontFamily: FONT_HEADING, fontWeight: 400, letterSpacing: '0.02em' },
    button: { fontWeight: 700, letterSpacing: '0.08em' },
  },
  shape: {
    borderRadius: 2,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: BG_DEFAULT,
          color: TEXT_PRIMARY,
        },
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: '#0d0d14 !important',
        borderBottom: `1px solid ${CYAN}`,
        boxShadow: `0 2px 20px rgba(0, 240, 255, 0.15), 0 1px 0 ${CYAN}`,
      },
    },
    MuiToolbar: {
      root: {
        minHeight: 56,
      },
    },
    MuiButton: {
      root: {
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        transition: 'all 0.3s ease',
      },
      contained: {
        background: `linear-gradient(135deg, ${CYAN} 0%, #0088aa 100%)`,
        color: '#0a0a0f',
        fontWeight: 700,
        '&:hover': {
          background: `linear-gradient(135deg, #33f5ff 0%, ${CYAN} 100%)`,
          boxShadow: `0 0 20px rgba(0, 240, 255, 0.4)`,
        },
      },
      containedSecondary: {
        background: `linear-gradient(135deg, ${MAGENTA} 0%, #cc1155 100%)`,
        color: '#ffffff',
        '&:hover': {
          background: `linear-gradient(135deg, #ff5599 0%, ${MAGENTA} 100%)`,
          boxShadow: `0 0 20px rgba(255, 45, 123, 0.4)`,
        },
      },
      outlined: {
        borderColor: 'rgba(0, 240, 255, 0.4)',
        color: CYAN,
        '&:hover': {
          borderColor: CYAN,
          boxShadow: `0 0 15px rgba(0, 240, 255, 0.3), inset 0 0 15px rgba(0, 240, 255, 0.05)`,
          backgroundColor: 'rgba(0, 240, 255, 0.05)',
        },
      },
      outlinedPrimary: {
        borderColor: 'rgba(0, 240, 255, 0.4)',
        '&:hover': {
          borderColor: CYAN,
          backgroundColor: 'rgba(0, 240, 255, 0.08)',
        },
      },
      text: {
        color: TEXT_PRIMARY,
        '&:hover': {
          backgroundColor: 'rgba(0, 240, 255, 0.08)',
        },
      },
      textPrimary: {
        color: CYAN,
      },
    },
    MuiIconButton: {
      root: {
        color: TEXT_PRIMARY,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(0, 240, 255, 0.08)',
          color: CYAN,
        },
      },
      colorPrimary: {
        color: CYAN,
        '&:hover': {
          backgroundColor: 'rgba(0, 240, 255, 0.12)',
        },
      },
      colorSecondary: {
        color: MAGENTA,
        '&:hover': {
          backgroundColor: 'rgba(255, 45, 123, 0.12)',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(0, 240, 255, 0.25)',
          transition: 'all 0.3s ease',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(0, 240, 255, 0.5)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: CYAN,
          boxShadow: `0 0 10px rgba(0, 240, 255, 0.2), inset 0 0 10px rgba(0, 240, 255, 0.05)`,
        },
      },
      input: {
        color: TEXT_PRIMARY,
      },
    },
    MuiInputLabel: {
      root: {
        color: TEXT_SECONDARY,
        '&.Mui-focused': {
          color: CYAN,
        },
      },
    },
    MuiInputBase: {
      root: {
        color: TEXT_PRIMARY,
      },
    },
    MuiCard: {
      root: {
        backgroundColor: BG_PAPER,
        border: '1px solid rgba(0, 240, 255, 0.15)',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'rgba(0, 240, 255, 0.4)',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)',
        },
      },
    },
    MuiCardHeader: {
      title: {
        fontFamily: FONT_HEADING,
        letterSpacing: '0.03em',
      },
      subheader: {
        color: TEXT_SECONDARY,
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: '#0d0d14',
        borderRight: `1px solid ${CYAN}`,
        boxShadow: `2px 0 20px rgba(0, 240, 255, 0.15)`,
      },
    },
    MuiList: {
      root: {
        backgroundColor: 'transparent',
      },
    },
    MuiListItem: {
      root: {
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(0, 240, 255, 0.06)',
        },
      },
      button: {
        '&:hover': {
          backgroundColor: 'rgba(0, 240, 255, 0.08)',
        },
      },
    },
    MuiListItemIcon: {
      root: {
        color: CYAN,
      },
    },
    MuiListSubheader: {
      root: {
        color: CYAN,
        fontFamily: FONT_HEADING,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontSize: '0.75rem',
        backgroundColor: 'transparent',
      },
    },
    MuiListItemText: {
      primary: {
        color: TEXT_PRIMARY,
      },
      secondary: {
        color: TEXT_SECONDARY,
      },
    },
    MuiFab: {
      root: {
        transition: 'all 0.3s ease',
      },
      secondary: {
        background: `linear-gradient(135deg, ${MAGENTA} 0%, #cc1155 100%)`,
        boxShadow: `0 0 15px rgba(255, 45, 123, 0.3)`,
        '&:hover': {
          background: `linear-gradient(135deg, #ff5599 0%, ${MAGENTA} 100%)`,
          boxShadow: `0 0 25px rgba(255, 45, 123, 0.5)`,
        },
      },
    },
    MuiAvatar: {
      root: {
        border: `2px solid ${CYAN}`,
        boxShadow: `0 0 8px rgba(0, 240, 255, 0.3)`,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(0, 240, 255, 0.12)',
      },
    },
    MuiPopover: {
      paper: {
        backgroundColor: BG_PAPER,
        border: '1px solid rgba(0, 240, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 240, 255, 0.1)',
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#1a1a2e',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        color: TEXT_PRIMARY,
        fontFamily: FONT_BODY,
        fontSize: '0.75rem',
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: BG_PAPER,
        border: '1px solid rgba(0, 240, 255, 0.2)',
      },
    },
    MuiSwitch: {
      colorPrimary: {
        '&.Mui-checked': {
          color: CYAN,
        },
        '&.Mui-checked + .MuiSwitch-track': {
          backgroundColor: CYAN,
        },
      },
      colorSecondary: {
        '&.Mui-checked': {
          color: MAGENTA,
        },
        '&.Mui-checked + .MuiSwitch-track': {
          backgroundColor: MAGENTA,
        },
      },
    },
    MuiSlider: {
      root: {
        color: CYAN,
      },
      thumb: {
        boxShadow: `0 0 8px rgba(0, 240, 255, 0.4)`,
        '&:hover': {
          boxShadow: `0 0 12px rgba(0, 240, 255, 0.6)`,
        },
      },
      track: {
        boxShadow: `0 0 4px rgba(0, 240, 255, 0.3)`,
      },
    },
    MuiTextField: {
      root: {
        '& label': {
          color: TEXT_SECONDARY,
        },
        '& label.Mui-focused': {
          color: CYAN,
        },
      },
    },
    MuiFormControlLabel: {
      label: {
        color: TEXT_PRIMARY,
      },
    },
    MuiSelect: {
      icon: {
        color: TEXT_SECONDARY,
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: BG_PAPER,
        border: '1px solid rgba(0, 240, 255, 0.2)',
      },
    },
    MuiMenuItem: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(0, 240, 255, 0.08)',
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ButtonAppBar />
            <Component {...pageProps} />
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
