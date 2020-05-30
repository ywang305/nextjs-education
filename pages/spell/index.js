import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Box from '@material-ui/core/Box';
import InputWords from './InputWords';
import ShowWords from './ShowWords';

const Spell = () => {
  const [value, setValue] = useState('');
  const changeHandler = useCallback(e => {
    const { value } = e.target;
    setValue(value);
  }, []);

  return (
    <div>
      <Box>
        <InputWords />
      </Box>
      <ShowWords />
    </div>
  );
};

export default Spell;
