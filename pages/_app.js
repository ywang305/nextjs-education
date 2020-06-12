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

// const PersistGateWithRouter = withRouter(PersistGate);

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <MuiThemeProvider theme={theme}>
                        <ButtonAppBar />
                        <Component {...pageProps} />
                    </MuiThemeProvider>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default MyApp;
