import * as React from 'react';
import styles from './app-bar.module.css'
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MainMenuItems from './main-menu-items';
import StorageIcon from '@mui/icons-material/Storage';
import { Badge, IconButton } from '@mui/material';
import { OrderModal } from './modals/order/modal';
import { useSelector } from 'react-redux';


export default function ButtonAppBar(props) {

    const [anchorCurrency, setAnchorCurrency] = useState(null);

    const openCurrency = Boolean(anchorCurrency);

    const handleClickCurrency = (event) => {
        setAnchorCurrency(event.currentTarget);
    };
    const handleCloseCurrecy = (event) => {
        setAnchorCurrency(null);
    };

    const factoryHandleCloseCurrecy = (id) => {
        return (event) => {
            setAnchorCurrency(null);
            const find = currency.find((el) => el.id === id);
            if (find) {
                props.context.setCurrentCurrency(find);
            }
        };
    }

    const [currency, setCurrency] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios.get("http://localhost:3010/currency");
            setCurrency(result.data.items);
            props.context.setCurrentCurrency(result.data.items[0]);
            // console.log(result.data.items[0]);

        }

        fetch();

    }, []);

    const handleBacketClick = () => {
        handleOpenOrder();
    }

    const [openOrder, setOpenOrder] = useState(false);
    const handleOpenOrder = () => setOpenOrder(true);
    const handleCloseOrder = () => setOpenOrder(false);


    const products = useSelector((state) => {
        return state.order.products;
    });




    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    < MainMenuItems />

                    < AttachMoneyIcon
                        onClick={handleClickCurrency}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }} />

                    <div>
                        {props.context?.currentCurrency?.symbol || ""} {' '}
                        {props.context?.currentCurrency?.name || ""}
                    </div>

                    <Menu
                        id="basic-men"
                        anchorEl={anchorCurrency}
                        open={openCurrency}
                        onClose={handleCloseCurrecy}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {currency.map((el) => {
                            return (
                                <MenuItem key={el.id} onClick={factoryHandleCloseCurrecy(el.id)}>
                                    {el.name}
                                </MenuItem>
                            )
                        })}
                    </Menu>
                    <div className={styles.space}></div>
                    <IconButton onClick={handleBacketClick}>
                    <Badge badgeContent={products.length ? products.length : undefined} color="success">
                        < StorageIcon />
                    </Badge>
                        
                    </IconButton>
                    <OrderModal open={openOrder} handleClose={handleCloseOrder} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}