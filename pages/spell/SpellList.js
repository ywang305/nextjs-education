import React, { useState, useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Typography, Divider } from '@material-ui/core';
import fetchAsync from '../../lib/fetchAsync';
import SpellItem from './SpellItem';

const data = 'Rabit loves carrots.';

const SpellList = () => {
    const [list, setList] = useState([]);
    const [len, setLen] = useState(0);
    useEffect(() => {
        const tid = setTimeout(async function getAll() {
            const spellList = await fetchAsync('/api/spell');
            setList(spellList);
        }, 5000);
        return () => clearTimeout(tid);
    }, [list]);

    useEffect(() => {
        const tId = setTimeout(
            () => setLen(len => Math.min(len + 1, data.length)),
            1000
        );
        return () => clearTimeout(tId);
    }, [len]);

    return (
        <div>
            {list.map(spellItem => {
                return <SpellItem key={spellItem._id} spellItem={spellItem} />;
            })}
        </div>
    );
};

export default SpellList;
