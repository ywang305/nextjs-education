import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SingleMode({ checked, dispatchSetting }) {
    const handleChange = event => {
        dispatchSetting({ single: event.target.checked });
    };

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        color='secondary'
                    />
                }
                label='单句模式'
            />
        </FormGroup>
    );
}
