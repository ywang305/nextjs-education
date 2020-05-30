import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';

const InputWords = () => {
  const [value, setValue] = useState('');
  const changeHandler = useCallback(e => {
    const { value } = e.target;
    setValue(value);
  }, []);

  return (
    <TextField
      fullWidth
      label='Input Words'
      multiline
      rows={4}
      value={value}
      onChange={changeHandler}
      variant='outlined'
    />
  );
};

export default InputWords;
