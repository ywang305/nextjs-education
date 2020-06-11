import React, { useState, useCallback, useEffect } from 'react';
import { Popover, StepConnector, ButtonGroup } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NotesIcon from '@material-ui/icons/Notes';

const ButtonPopover = ({ anchorEl, onClose, children }) => {
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            style={{ opacity: 0.9 }}
        >
            <ButtonGroup
                color='secondary'
                aria-label='outlined secondary button group'
            >
                {/* <IconButton
                    size='small'
                    color='secondary'
                    onClick={clickSpeechHandler}
                >
                    <PlayArrowIcon />
                </IconButton>
                <IconButton
                    size='small'
                    color='secondary'
                    onClick={clickToggleDlg}
                >
                    <NotesIcon />
                </IconButton> */}
                {children}
            </ButtonGroup>
        </Popover>
    );
};
export default ButtonPopover;
