import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function TransToggle({ checked, dispatchSetting }) {
    const handleChange = event => {
        dispatchSetting({ transOpen: event.target.checked });
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
                label='显示翻译'
            />
        </FormGroup>
    );
}
