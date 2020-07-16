import React, { useState, useCallback, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import fetchAsync from '../../lib/fetchAsync';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const AZ_URL = 'https://nyc-function.azurewebsites.net/api/message';

const InputWords = () => {
  const [value, setValue] = useState('');

  const changeHandler = useCallback((e) => {
    const { value } = e.target;
    setValue(value);
  }, []);
  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (value) {
        // const url = '/api/spell';
        // const fromUserId = undefined;
        // const toUserId = undefined;
        // const res = await fetchAsync(url, {
        //     method: 'POST',
        //     body: { fromUserId, toUserId, words },
        // });
        const words = value;
        fetchAsync(AZ_URL, { method: 'POST', body: { words } });
        setValue('');
      }
    },
    [value]
  );

  return (
    <form onSubmit={submitHandler}>
      <TextField
        name='textfield'
        fullWidth
        label='Input Words to Spell'
        multiline
        rows={3}
        value={value}
        onChange={changeHandler}
        variant='outlined'
      />
      <Box py={1}>
        <Button type='submit' variant='contained' color='primary'>
          Send
        </Button>
      </Box>
    </form>
  );
};

export default InputWords;
