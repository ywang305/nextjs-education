import React, { useState, useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Typography, Divider } from '@material-ui/core';
import { useKey } from 'react-use/lib';

const SpellItem = ({ words = '' }) => {
    const wordArr = words.split(' ');

    const [wordIndex, setWordIndex] = useState(wordArr.length);
    const [charIndex, setCharIndex] = useState(100);

    useKey('ArrowRight', () => {
        setWordIndex(i => (i + 1) % wordArr.length);
        setCharIndex(0);
    });
    useKey('ArrowLeft', () => {
        setWordIndex(i => Math.max(0, i - 1));
        setCharIndex(0);
    });

    useEffect(
        function autoSpell() {
            const tId = setTimeout(
                () =>
                    setCharIndex(pos =>
                        Math.min(pos + 1, wordArr[wordIndex]?.length)
                    ),
                2000
            );
            return () => clearTimeout(tId);
        },
        [charIndex]
    );

    const clickHanlder = index => () => {
        setWordIndex(index);
        setCharIndex(0);
    };

    return (
        <div>
            {wordArr?.map((w, i) => {
                const isIndexWord = i === wordIndex;
                return (
                    <Box
                        onClick={clickHanlder(i)}
                        component='span'
                        letterSpacing={10}
                        bgcolor={isIndexWord && 'grey.100'}
                        mr={3}
                    >
                        {w.split('').map((c, j) => {
                            const isIndexChar = isIndexWord && j === charIndex;
                            return (
                                <Box
                                    component='span'
                                    color={
                                        isIndexChar
                                            ? 'info.main'
                                            : 'text.primary'
                                    }
                                    fontSize={`${
                                        isIndexChar ? 'h3' : 'h6'
                                    }.fontSize`}
                                >
                                    {c}
                                </Box>
                            );
                        })}
                    </Box>
                );
            })}
        </div>
    );
};

export default SpellItem;
