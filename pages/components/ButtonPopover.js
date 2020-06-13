import React, { useState, useCallback, useEffect } from 'react';
import { Popover, StepConnector, ButtonGroup } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NotesIcon from '@material-ui/icons/Notes';

const ButtonPopover = ({
    anchorReference,
    anchorPosition,
    anchorEl,
    onClose,
    children,
}) => {
    return (
        <Popover
            open={Boolean(anchorEl || anchorPosition)}
            anchorReference={anchorReference}
            anchorPosition={anchorPosition}
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
                {children}
            </ButtonGroup>
        </Popover>
    );
};
export default ButtonPopover;
