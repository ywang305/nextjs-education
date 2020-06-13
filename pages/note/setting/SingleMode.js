import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SingleMode({ singleMode, setSingleMode }) {
    const handleChange = event => {
        setSingleMode(event.target.checked);
    };

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch
                        checked={singleMode}
                        onChange={handleChange}
                        color='secondary'
                    />
                }
                label='单句模式'
            />
        </FormGroup>
    );
}
