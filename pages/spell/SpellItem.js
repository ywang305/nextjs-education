import React, { useState, useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Typography, Divider } from '@material-ui/core';
import fetchAsync from '../../lib/fetchAsync';

const data = 'Rabit loves carrots.';

const SpellItem = ({ spellItem }) => {
    const charArr = spellItem?.words?.split('');

    const [trackPos, setTrackPos] = useState(0);

    useEffect(
        function autoSpell() {
            const tId = setTimeout(
                () => setTrackPos(pos => Math.min(pos + 1, charArr.length - 1)),
                1000
            );
            return () => clearTimeout(tId);
        },
        [trackPos]
    );

    return (
        <Box p={2}>
            {charArr.map((c, i) => {
                return i === trackPos ? (
                    <Box
                        component='span'
                        color='info.main'
                        letterSpacing={10}
                        fontSize='h2.fontSize'
                    >
                        {c}
                    </Box>
                ) : (
                    <Box
                        component='span'
                        color='text.primary'
                        letterSpacing={10}
                        fontSize='h6.fontSize'
                    >
                        {c}
                    </Box>
                );
            })}
            <Divider />
        </Box>
    );
};

export default SpellItem;
