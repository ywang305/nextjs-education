import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import InputWords from './InputWords';
import SpellList from './SpellList';

const Spell = () => {
    return (
        <div>
            <Box py={2}>
                <InputWords />
            </Box>
            <SpellList />
        </div>
    );
};

export default Spell;
