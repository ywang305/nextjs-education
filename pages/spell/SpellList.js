import React, { useState, useCallback, useEffect } from 'react';
import fetchAsync from '../../lib/fetchAsync';
import SpellItem from './SpellItem';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const SpellList = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const tid = setTimeout(async function getAll() {
            const spellList = await fetchAsync('/api/spell');
            setList(spellList);
        }, 5000);
        return () => clearTimeout(tid);
    }, [list]);

    const [activeItem, setActiveItem] = useState(list.length);

    return (
        <div>
            {list.map((spellItem, i) => {
                return (
                    <Box
                        p={1}
                        fontSize='h6.fontSize'
                        fontFamily='Comic Sans MS'
                        style={{ cursor: 'pointer' }}
                        key={spellItem._id}
                        onClick={() => setActiveItem(i)}
                    >
                        {activeItem === i ? (
                            <SpellItem words={spellItem.words} />
                        ) : (
                            spellItem.words
                        )}
                        <Divider />
                    </Box>
                );
            })}
        </div>
    );
};

export default SpellList;
