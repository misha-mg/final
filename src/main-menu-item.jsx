import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';

export default function MainMenuItem(props) {


    const handleClose = (t) => {
        props.handleCloseMenu(props.menu);
    }

    return (
        <MenuItem onClick={handleClose}>{props.menu.name}</MenuItem>
    );
}