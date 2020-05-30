import React, { useState, useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Typography } from '@material-ui/core';

const data = 'Rabit loves carrots.';
const dataArr = data.split(' ').map(w => {
  const word = w.trim();
  return word.split('');
});

const ShowWords = () => {
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const tId = setTimeout(
      () => setWordIndex(i => (i + 1) % dataArr.length),
      2000
    );
    return () => clearTimeout(tId);
  }, [wordIndex]);

  return (
    <div>
      <Box color='info.main' letterSpacing={10} fontSize='h2.fontSize'>
        {data}
      </Box>
      <Box color='error.main' letterSpacing={10} fontSize='h2.fontSize'>
        {dataArr[wordIndex]}
      </Box>
    </div>
  );
};

export default ShowWords;
