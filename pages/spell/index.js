import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import InputWords from './InputWords';
import SpellList from './SpellList';
import ButtonAppBar from '../components/ButtonAppBar';

const Spell = () => {
    return (
        <div>
            <ButtonAppBar />
            <Box py={2}>
                <InputWords />
            </Box>
            <SpellList />
        </div>
    );
};

export default Spell;
