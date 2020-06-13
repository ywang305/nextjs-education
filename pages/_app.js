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
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from '../lib/store/store';
import { withRouter } from 'next/router';

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

const PersistGateWithRouter = withRouter(PersistGate);

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Provider store={store}>
                <PersistGateWithRouter persistor={persistor} loading={null}>
                    <MuiThemeProvider theme={theme}>
                        <ButtonAppBar />
                        <Component {...pageProps} />
                    </MuiThemeProvider>
                </PersistGateWithRouter>
            </Provider>
        </div>
    );
}

export default MyApp;
