import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function AnnoToggle({ annoOpen, setAnnoOpen }) {
    const handleChange = event => {
        setAnnoOpen(event.target.checked);
    };

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch
                        checked={annoOpen}
                        onChange={handleChange}
                        color='secondary'
                    />
                }
                label='显示注解'
            />
        </FormGroup>
    );
}
