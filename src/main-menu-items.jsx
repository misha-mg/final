import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import MainMenuItem from './main-menu-item';
import { useNavigate } from 'react-router';

const pages = [
    { name: 'Main', path: '/' },
    { name: 'Products', path: '/products' }, 
    { name: 'Categories', path: '/categories' }, 
    { name: 'Currency', path: '/currency' }
]


export default function MainMenuItems(props) {

    const [anchorMenu, setAnchorMenu] = useState(null);

    const openMenu = Boolean(anchorMenu);

    const navigate = useNavigate();

    const handleClickMenu = (event) => {
        setAnchorMenu(event.currentTarget);
    };
    const handleCloseMenu = (menuItem) => {
        navigate(menuItem.path)
        setAnchorMenu(null);
    };


    return (
        <>
            <MenuIcon
                onClick={handleClickMenu}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorMenu}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

                {pages.map((item) => {
                    return <MainMenuItem key={item.name} menu={item} handleCloseMenu={handleCloseMenu} />
                })}
            </Menu>
        </>
    );
}