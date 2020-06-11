import React, { useState, useEffect, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

const AlertIOS = ({ open, closeHandler, cancelBtnText = null, children }) => {
    return (
        <Modal
            disableAutoFocus
            open={open}
            onClose={closeHandler}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
        >
            <Slide direction='up' in={open} mountOnEnter unmountOnExit>
                <Box width='100%' m={2} maxWidth={650}>
                    <Box
                        boxShadow={1}
                        bgcolor='background.paper'
                        borderRadius={8}
                    >
                        {children}
                    </Box>
                    <Box
                        boxShadow={1}
                        bgcolor='background.paper'
                        borderRadius={8}
                        mt={1}
                        pl={1}
                    >
                        <Button onClick={closeHandler} variant='text' fullWidth>
                            {cancelBtnText ?? 'Cancel'}
                        </Button>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    );
};

export default AlertIOS;
