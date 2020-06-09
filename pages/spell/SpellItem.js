import React, { useState, useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Typography, Divider } from '@material-ui/core';
import { useKey } from 'react-use/lib';
import speak from '../../lib/html5/speak';

const SpellItem = ({ words = '' }) => {
    const wordArr = words.split(' ');

    const [speech, setSpeech] = useState({
        wordIndex: -1,
        charIndex: -1,
    });

    useKey('ArrowRight', () => {
        setSpeech(({ wordIndex, charIndex }) => {
            if (charIndex < wordArr[wordIndex]?.length) {
                return { wordIndex, charIndex: charIndex + 1 };
            } else {
                return {
                    wordIndex: Math.min(wordIndex + 1, wordArr?.length ?? 0),
                    charIndex: 0,
                };
            }
        });
    });
    useKey('ArrowLeft', () => {
        setSpeech(({ wordIndex, charIndex }) => {
            if (charIndex > 0) {
                return { wordIndex, charIndex: charIndex - 1 };
            } else {
                return {
                    wordIndex: Math.max(wordIndex - 1, 0),
                    charIndex: 0,
                };
            }
        });
    });

    useEffect(
        function autoSpell() {
            const tId = setTimeout(() => {
                if (speech.charIndex < wordArr[speech.wordIndex]?.length) {
                    setSpeech(obj => ({
                        ...obj,
                        charIndex: obj.charIndex + 1,
                    }));
                }
            }, 2000);
            return () => clearTimeout(tId);
        },
        [speech]
    );
    useEffect(
        function utter() {
            const { wordIndex, charIndex } = speech;
            const spokenMsg =
                charIndex >= wordArr[wordIndex]?.length
                    ? wordArr[wordIndex] ?? ''
                    : wordArr[wordIndex]?.[charIndex];
            speak(spokenMsg);
        },
        [speech]
    );

    const clickHanlder = wordIndex => () => {
        setSpeech({ wordIndex, charIndex: 0 });
    };

    return (
        <div>
            {wordArr?.map((w, i) => {
                const isIndexWord = i === speech.wordIndex;
                return (
                    <Box
                        onClick={clickHanlder(i)}
                        component='span'
                        letterSpacing={10}
                        bgcolor={isIndexWord && 'grey.100'}
                        mr={3}
                        style={{ cursor: 'pointer' }}
                    >
                        {w.split('').map((c, j) => {
                            const isIndexChar =
                                isIndexWord && j === speech.charIndex;
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
