import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const AlertSnackbar = ({ message, setMessage, severity = 'info' }) => {
    const onClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage('');
    };

    const theme = useTheme();
    return (
        <Snackbar
            open={Boolean(message)}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                elevation={6}
                variant='filled'
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertSnackbar;
