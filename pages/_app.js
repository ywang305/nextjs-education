import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    blue,
    pink,
    green,
    teal,
    indigo,
    red,
    purple,
    lightGreen,
    lime,
    yellow,
    amber,
    deepPurple,
    deepOrange,
} from '@material-ui/core/colors';
import ButtonAppBar from './components/ButtonAppBar';

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: deepOrange,
    },
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 16,
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <ButtonAppBar />
                <Component {...pageProps} />
            </MuiThemeProvider>
        </div>
    );
}

export default MyApp;
